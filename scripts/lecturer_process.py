#!/usr/bin/env python3
"""
Lecturer Process - Production Implementation

Transforms librarian markdown (OCR Hebrew content) into engaging, schema-valid educational JSON.
Implements the "Professor Charisma" persona with dual-coding, metacognition, and constructivist pedagogy.

Key Features:
- Parses Hebrew OCR content with intelligent section detection
- Generates engaging educational content using multiple block types
- Creates proper schema-compliant JSON output
- Includes tone-breaks for metacognition, callouts for visuals, and common-mistake blocks
"""

import os
import json
import re
import argparse
import random
import uuid
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class ParsedSection:
    """Represents a parsed section from the librarian output."""

    title: str
    content: str
    section_type: str = "general"
    formulas: List[Dict] = field(default_factory=list)
    key_terms: List[str] = field(default_factory=list)


class HebrewTextProcessor:
    """Process and clean Hebrew OCR text with comprehensive character mapping."""

    # Hebrew letter mappings from OCR artifacts (comprehensive)
    HEBREW_MAP = {
        # Uppercase
        "N": "א",
        "D": "ב",
        "7": "ז",
        "Y": "ע",
        "W": "ש",
        "X": "ח",
        "C": "ה",
        "A": "ה",
        "V": "ו",
        "T": "ט",
        "I": "י",
        "L": "ל",
        "M": "מ",
        "P": "פ",
        "Q": "ק",
        "R": "ר",
        "S": "ס",
        "Z": "ז",
        "F": "צ",
        "G": "ג",
        "K": "כ",
        "B": "ב",
        "E": "א",
        "H": "ה",
        "J": "ג",
        "O": "ו",
        "U": "ו",
        # Lowercase
        "n": "נ",
        "d": "ב",
        "a": "א",
        "w": "ש",
        "x": "ח",
        "c": "ה",
        "v": "ו",
        "t": "ט",
        "i": "י",
        "l": "ל",
        "m": "מ",
        "p": "פ",
        "q": "ק",
        "r": "ר",
        "s": "ס",
        "z": "ז",
        "f": "צ",
        "g": "ג",
        "k": "כ",
        "b": "ב",
        "e": "א",
        "h": "ה",
        "j": "ג",
        "o": "ו",
        "u": "ו",
        "y": "ע",
    }

    # Special multi-character corrections
    OCR_CORRECTIONS = {
        "TC": "עלות כוללת",
        "AC": "עלות ממוצעת",
        "MC": "עלות שולית",
        "Total Cost": "עלות כוללת",
        "Ymax": "Y מקסימלי",
        "Xmax": "X מקסימלי",
    }

    @classmethod
    def clean_ocr_text(cls, text: str) -> str:
        """Clean common OCR artifacts from Hebrew text."""
        # Remove metadata markers
        text = re.sub(r"A\s*[\/]?\s*NotebookLM", "", text)
        text = re.sub(r"\+", "", text)
        text = re.sub(r"--- Page \d+ \(OCR\) ---", "\n", text)
        text = re.sub(r"--- Page \d+ ---", "\n", text)
        text = re.sub(r"^---\s*$", "", text, flags=re.MULTILINE)
        text = re.sub(r"## (Overview|Content)", "", text)
        text = re.sub(r"Content extracted from [^\n]+", "", text)

        # Apply multi-character corrections first
        for artifact, correction in cls.OCR_CORRECTIONS.items():
            text = text.replace(artifact, correction)

        # Only convert text that looks like Hebrew OCR (high concentration of mapped chars)
        words = text.split()
        result_words = []

        for word in words:
            # Count how many chars in word are Hebrew mappable
            hebrew_chars = sum(1 for c in word if c in cls.HEBREW_MAP)
            total_chars = len([c for c in word if c.isalpha()])

            # If > 50% of alpha chars are Hebrew mappable, convert the word
            if total_chars > 0 and hebrew_chars / total_chars > 0.5:
                converted = "".join(cls.HEBREW_MAP.get(c, c) for c in word)
                result_words.append(converted)
            else:
                result_words.append(word)

        text = " ".join(result_words)

        # Clean up formatting
        text = re.sub(r"\n{3,}", "\n\n", text)
        text = re.sub(r"[ \t]+", " ", text)

        return text.strip()

    @classmethod
    def extract_formulas(cls, text: str) -> List[Dict[str, str]]:
        """Extract mathematical formulas from text."""
        formulas = []
        patterns = [
            r"(TC|AC|MC)\s*\(?\s*X?\s*\)?\s*=\s*([^\n]+)",
            r"([A-Z]{2,})\s*\(\s*X\s*\)\s*=\s*([^\n]+)",
        ]

        for pattern in patterns:
            for match in re.finditer(pattern, text):
                formulas.append(
                    {
                        "name": match.group(1),
                        "expression": match.group(2).strip(),
                        "full": match.group(0),
                    }
                )

        return formulas

    @classmethod
    def extract_key_terms(cls, text: str) -> List[str]:
        """Extract potential key terms/concepts from Hebrew text."""
        terms = re.findall(r"\(([A-Z][a-z]+)\)", text)
        words = re.findall(r"[א-ת]{3,}", text)
        word_counts = {}
        for word in words:
            word_counts[word] = word_counts.get(word, 0) + 1
        frequent_terms = [w for w, c in word_counts.items() if c >= 2]
        return list(set(terms + frequent_terms))


class LibrarianParser:
    """Parse librarian-output.md files into structured content."""

    def __init__(self, file_path: str):
        self.file_path = file_path
        self.raw_content = ""
        self.title = ""
        self.sections: List[ParsedSection] = []
        self.formulas: List[Dict] = []
        self.key_concepts: List[str] = []

    def parse(self) -> Dict[str, Any]:
        """Parse the librarian output file."""
        with open(self.file_path, "r", encoding="utf-8") as f:
            self.raw_content = f.read()

        # Extract title before cleaning
        title_match = re.search(r"^#\s+(.+)$", self.raw_content, re.MULTILINE)
        self.title = title_match.group(1) if title_match else "פרק ללא כותרת"

        # Parse sections BEFORE cleaning (to preserve page markers)
        self.sections = self._parse_sections(self.raw_content)

        # Now clean the content
        cleaned = HebrewTextProcessor.clean_ocr_text(self.raw_content)
        self.formulas = HebrewTextProcessor.extract_formulas(cleaned)
        self.key_concepts = HebrewTextProcessor.extract_key_terms(cleaned)

        return {
            "title": self.title,
            "content": cleaned,
            "sections": self.sections,
            "formulas": self.formulas,
            "key_concepts": self.key_concepts,
        }

    def _parse_sections(self, content: str) -> List[ParsedSection]:
        """Parse content into logical sections."""
        sections = []

        # Split by page markers (e.g., "--- Page 1 (OCR) ---")
        page_pattern = r"Page\s+\d+\s+\(OCR\)"
        parts = re.split(page_pattern, content)

        # If no page markers found, fall back to splitting by blank lines
        if len(parts) <= 1:
            parts = re.split(r"\n\s*\n", content)

        # Group parts into meaningful sections
        chunk_size = 2
        for i in range(0, len(parts), chunk_size):
            chunk_parts = parts[i : i + chunk_size]
            chunk_content = "\n".join(chunk_parts).strip()

            if not chunk_content or len(chunk_content) < 50:
                continue

            # Extract first meaningful line as title
            lines = chunk_content.split("\n")
            title = None
            for line in lines:
                stripped = line.strip()
                # Skip metadata lines and short lines
                if (
                    stripped
                    and not stripped.startswith("#")
                    and not stripped.startswith("-")
                    and len(stripped) > 5
                    and len(stripped) < 100
                ):
                    title = stripped[:60]
                    break

            if not title:
                title = f"סעיף {i // chunk_size + 1}"

            # Clean the title too
            title = HebrewTextProcessor.clean_ocr_text(title)

            section_type = self._detect_section_type(chunk_content)

            # Clean the content for this section
            cleaned_content = HebrewTextProcessor.clean_ocr_text(chunk_content)

            sections.append(
                ParsedSection(
                    title=title,
                    content=cleaned_content,
                    section_type=section_type,
                    formulas=HebrewTextProcessor.extract_formulas(cleaned_content),
                    key_terms=HebrewTextProcessor.extract_key_terms(cleaned_content),
                )
            )

        return sections

    def _detect_section_type(self, content: str) -> str:
        """Detect the type of section based on content patterns."""
        content_lower = content.lower()

        if re.search(r"\b(tc|ac|mc)\b|=", content_lower):
            if any(x in content for x in ["TC(X)", "AC(X)", "MC(X)", "Ymax"]):
                return "formula"

        if "דוגמא" in content or "דוגמה" in content:
            return "example"

        if "הגדרה" in content or "מה זה" in content:
            return "definition"

        return "general"


class ProfessorCharisma:
    """The Lecturer persona - generates engaging educational content in Hebrew."""

    TONE_BREAK_OPENERS = [
        "רגע חושבים 🛑",
        "עצרו! חשבו רגע 💭",
        "בדיקת הבנה ✋",
        "רגע של מחשבה 🤔",
    ]

    def __init__(self, course_name: str = "מיקרו-כלכלה"):
        self.course_name = course_name

    def generate_hook(self, topic: str) -> str:
        """Generate an engaging hook."""
        hooks = [
            f"אי פעם שאלתם את עצמכם למה החלטות כלכליות כל כך מורכבות? בואו נגלה ביחד את הסוד של {topic}!",
            f"תארו לעצמכם שאתם צריכים לבחור בין שני דברים שאתם אוהבים - זה בדיוק העיקרון שמאחורי {topic}!",
            f"יש מושג בכלכלה ששינה את הדרך שבה אנחנו מבינים החלטות. זה {topic}, ואתם עומדים להבין אותו לעומק!",
        ]
        return random.choice(hooks)

    def generate_why_it_matters(self, topic: str) -> str:
        """Generate 'why it matters' explanation."""
        reasons = [
            f"הבנת {topic} היא הבסיס להבנת כלכלות מתקדמות. זה כמו ללמוד ללכת לפני שרצים - בלעדיו, כל השאר לא מחזיק מים.",
            f"בכל יום אנחנו מקבלים החלטות כלכליות, בין אם אנחנו מודעים לכך ובין אם לא. {topic} עוזר לנו להבין את המחיר האמיתי של הבחירות שלנו.",
            f"מבחינות בכלכלה, {topic} הוא אחד המושגים המופיעים הכי הרבה. מבין אותו = נקודות בחינה!",
        ]
        return random.choice(reasons)

    def generate_opening_content(self, topic: str) -> str:
        """Generate opening paragraph content."""
        return (
            f"אז בואו נצא לדרך! היום אנחנו הולכים להעמיק ב{topic}. "
            f"אני יודע שזה נשמע מורכב בהתחלה, אבל תאמינו לי - עד סוף השיעור הזה, "
            f"זה ייראה לכם פשוט כמו שתי וערב. אנחנו ניקח את זה שלב אחרי שלב, "
            f"ועם דוגמאות שיהפכו את התיאוריה למוחשית. מוכנים?"
        )

    # Block Factory Methods - All return Dict matching TypeScript schema

    def create_explanation_block(self, content: str, highlight: str = "") -> Dict:
        """Create an explanation block."""
        block = {"type": "explanation", "content": content}
        if highlight:
            block["highlight"] = highlight
        return block

    def create_definition_block(
        self, term: str, content: str, tooltips: Optional[Dict] = None
    ) -> Dict:
        """Create a definition block."""
        block = {"type": "definition", "term": term, "content": content}
        if tooltips:
            block["tooltips"] = tooltips
        return block

    def create_formula_block(
        self, title: str, formula: str, variables: Optional[List[Dict]] = None
    ) -> Dict:
        """Create a formula block with LaTeX."""
        block = {"type": "formula", "title": title, "formula": formula}
        if variables:
            block["variables"] = variables
        return block

    def create_example_block(
        self, title: str, scenario: str, solution: str, calculation: str = ""
    ) -> Dict:
        """Create a worked example block."""
        block = {
            "type": "example",
            "title": title,
            "scenario": scenario,
            "solution": solution,
        }
        if calculation:
            block["calculation"] = calculation
        return block

    def create_analogy_block(self, content: str, icon: str = "💡") -> Dict:
        """Create an analogy block for dual-coding."""
        return {"type": "analogy", "content": content, "icon": icon}

    def create_tone_break_block(self, opener: str = "", content: str = "") -> Dict:
        """Create a tone-break block for metacognition."""
        if not opener:
            opener = random.choice(self.TONE_BREAK_OPENERS)
        return {"type": "tone-break", "opener": opener, "content": content}

    def create_callout_block(self, content: str, variant: str = "note") -> Dict:
        """Create a callout block (tip, warning, note)."""
        return {"type": "callout", "variant": variant, "content": content}

    def create_checkpoint_block(self, questions: List[Dict]) -> Dict:
        """Create a checkpoint quiz block."""
        return {"type": "checkpoint", "questions": questions}

    def create_summary_block(
        self, content: str, key_points: Optional[List[str]] = None
    ) -> Dict:
        """Create a summary block."""
        block = {"type": "summary", "content": content}
        if key_points:
            block["keyPoints"] = key_points
        return block

    def create_deep_dive_block(self, title: str, sections: List[Dict]) -> Dict:
        """Create a deep-dive block with expandable sections."""
        return {"type": "deep-dive", "title": title, "sections": sections}

    def create_mistake_block(self, mistake: str, correct: str, why: str) -> Dict:
        """Create a common-mistake block."""
        return {
            "type": "common-mistake",
            "mistake": mistake,
            "correct": correct,
            "why": why,
        }

    def create_hook_block(
        self, opener: str, question: str = "", context: str = ""
    ) -> Dict:
        """Create a hook block for chapter introduction."""
        block = {"type": "hook", "opener": opener}
        if question:
            block["question"] = question
        if context:
            block["context"] = context
        return block

    def create_prerequisite_block(
        self, concept: str, brief_review: str, why_needed: str
    ) -> Dict:
        """Create a prerequisite block."""
        return {
            "type": "prerequisite",
            "concept": concept,
            "briefReview": brief_review,
            "whyNeeded": why_needed,
        }

    def create_interactive_block(
        self, component_id: str, config: Optional[Dict] = None
    ) -> Dict:
        """Create an interactive component block."""
        block = {"type": "interactive", "componentId": component_id}
        if config:
            block["config"] = config
        return block

    def create_image_block(self, src: str, alt: str, caption: str = "") -> Dict:
        """Create an image block."""
        block = {"type": "image", "src": src, "alt": alt}
        if caption:
            block["caption"] = caption
        return block


class ContentAnalyzer:
    """Analyze parsed content and determine appropriate block types."""

    def __init__(self, professor: ProfessorCharisma):
        self.professor = professor

    def analyze_section(self, section: ParsedSection) -> List[Dict]:
        """Analyze a section and generate appropriate blocks."""
        blocks = []
        content = section.content

        # Add tone-break every few sections for metacognition
        if random.random() < 0.15:  # 15% chance
            blocks.append(
                self.professor.create_tone_break_block(
                    content="קחו רגע לחשוב - האם אתם מבינים את הקונספט עד כה?"
                )
            )

        # Handle based on section type
        if section.section_type == "formula":
            blocks.extend(self._process_formula_section(section))
        elif section.section_type == "definition":
            blocks.extend(self._process_definition_section(section))
        elif section.section_type == "example":
            blocks.extend(self._process_example_section(section))
        else:
            blocks.extend(self._process_general_section(section))

        return blocks

    def _process_formula_section(self, section: ParsedSection) -> List[Dict]:
        """Process a section containing formulas."""
        blocks = []

        # Add explanation first
        intro_text = (
            section.content[:200] if len(section.content) > 200 else section.content
        )
        blocks.append(
            self.professor.create_explanation_block(
                content=intro_text, highlight="שימו לב לנוסחה הבאה"
            )
        )

        # Add each formula as a formula block
        for formula in section.formulas:
            variables = [
                {"symbol": "TC", "name": "Total Cost", "desc": "עלות כוללת"},
                {"symbol": "AC", "name": "Average Cost", "desc": "עלות ממוצעת"},
                {"symbol": "MC", "name": "Marginal Cost", "desc": "עלות שולית"},
                {"symbol": "X", "name": "כמות", "desc": "כמות יחידות"},
            ]

            # Filter variables based on formula content
            formula_vars = [v for v in variables if v["symbol"] in formula["full"]]

            blocks.append(
                self.professor.create_formula_block(
                    title=f"נוסחת {formula['name']}",
                    formula=formula["full"],
                    variables=formula_vars if formula_vars else None,
                )
            )

            # Add a callout explaining the formula
            blocks.append(
                self.professor.create_callout_block(
                    content=f"זכרו: {formula['name']} מחושבת כ-{formula['expression']}",
                    variant="tip",
                )
            )

        return blocks

    def _process_definition_section(self, section: ParsedSection) -> List[Dict]:
        """Process a section containing definitions."""
        blocks = []

        # Extract potential term (first line or capitalized phrase)
        lines = section.content.split("\n")
        term = lines[0][:30] if lines else "מושג מרכזי"

        # Clean up term
        term = re.sub(r"[\(\)\[\]]", "", term).strip()

        blocks.append(
            self.professor.create_definition_block(term=term, content=section.content)
        )

        # Add an analogy for dual-coding
        blocks.append(
            self.professor.create_analogy_block(
                content=f"חשבו על {term} כמו על המנוע של הרכב - בלי להבין איך הוא עובד, קשה להבין איך הרכב מתנהג על הכביש."
            )
        )

        return blocks

    def _process_example_section(self, section: ParsedSection) -> List[Dict]:
        """Process a section containing examples."""
        blocks = []

        # Split content into scenario and solution parts
        lines = section.content.split("\n")

        # First few lines are the scenario, rest is solution
        mid_point = len(lines) // 2 if len(lines) > 4 else min(3, len(lines))
        scenario = "\n".join(lines[:mid_point])
        solution = "\n".join(lines[mid_point:])

        blocks.append(
            self.professor.create_example_block(
                title="דוגמא מספרית",
                scenario=scenario,
                solution=solution if solution else "הפתרון מופיע בהמשך",
            )
        )

        return blocks

    def _process_general_section(self, section: ParsedSection) -> List[Dict]:
        """Process a general content section."""
        blocks = []

        # Check if content is long enough to warrant multiple blocks
        if len(section.content) > 500:
            # Split into chunks
            chunks = self._chunk_content(section.content)
            for i, chunk in enumerate(chunks):
                if i == 0:
                    blocks.append(
                        self.professor.create_explanation_block(
                            content=chunk, highlight="נקודה חשובה" if i == 0 else ""
                        )
                    )
                else:
                    blocks.append(
                        self.professor.create_explanation_block(content=chunk)
                    )
        else:
            blocks.append(
                self.professor.create_explanation_block(content=section.content)
            )

        # Add a common mistake block occasionally
        if random.random() < 0.2:  # 20% chance
            blocks.append(
                self.professor.create_mistake_block(
                    mistake="להתבלבל בין המושגים השונים",
                    correct="לקרוא בעיון את ההגדרות והבדלים ביניהם",
                    why="ההבדלים העדינים הם מה שמבדיל בין הבנה שטחית לעמוקה",
                )
            )

        return blocks

    def _chunk_content(self, content: str, chunk_size: int = 300) -> List[str]:
        """Split content into manageable chunks."""
        words = content.split()
        chunks = []
        current_chunk = []
        current_size = 0

        for word in words:
            current_chunk.append(word)
            current_size += len(word) + 1

            if current_size >= chunk_size:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_size = 0

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks if chunks else [content]


class ChapterGenerator:
    """Generate complete chapter.json from analyzed content."""

    def __init__(self, professor: ProfessorCharisma, analyzer: ContentAnalyzer):
        self.professor = professor
        self.analyzer = analyzer

    def generate_chapter(
        self,
        parsed_data: Dict[str, Any],
        chapter_number: int = 1,
        total_chapters: int = 12,
        course: str = "מיקרו-כלכלה",
    ) -> Dict[str, Any]:
        """Generate a complete chapter structure."""

        title = parsed_data["title"]
        sections = parsed_data["sections"]

        # Generate chapter ID
        chapter_id = f"chapter-{chapter_number}"

        # Create topics from sections
        topics = self._create_topics(sections)

        # Build the chapter structure
        chapter = {
            "id": chapter_id,
            "title": title,
            "chapterNumber": chapter_number,
            "totalChapters": total_chapters,
            "course": course,
            "navigation": {
                "previous": self._get_previous_chapter(chapter_number),
                "next": self._get_next_chapter(chapter_number, total_chapters),
            },
            "pageMap": {
                "learningObjectives": self._generate_learning_objectives(title),
                "estimatedTime": "45 דקות",
            },
            "introduction": {
                "content": self.professor.generate_opening_content(title),
                "whyItMatters": self.professor.generate_why_it_matters(title),
                "hook": self.professor.generate_hook(title),
            },
            "topics": topics,
            "checkpoint": self._generate_checkpoint_questions(),
            "quickReference": {
                "formulas": self._extract_formulas(parsed_data.get("formulas", [])),
                "definitions": self._extract_definitions(sections),
            },
        }

        return chapter

    def _create_topics(self, sections: List[ParsedSection]) -> List[Dict]:
        """Create topics from parsed sections."""
        topics = []

        # Group sections into topics (every 2-3 sections = 1 topic)
        group_size = 2
        for i in range(0, len(sections), group_size):
            group = sections[i : i + group_size]

            # Generate topic title from first section
            topic_title = group[0].title if group else f"נושא {i // group_size + 1}"
            topic_id = f"topic-{i // group_size + 1}"

            # Generate blocks for this topic
            blocks = []
            for section in group:
                section_blocks = self.analyzer.analyze_section(section)
                blocks.extend(section_blocks)

            # Add a summary block at the end of each topic
            if blocks:
                blocks.append(
                    self.professor.create_summary_block(
                        content=f"סיכום: בנושא זה למדנו על {topic_title}. זכרו את הנקודות המרכזיות שדנו בהן."
                    )
                )

            topics.append({"id": topic_id, "title": topic_title, "blocks": blocks})

        return topics

    def _get_previous_chapter(self, current: int) -> Optional[Dict]:
        """Get previous chapter navigation info."""
        if current <= 1:
            return None
        return {"id": f"chapter-{current - 1}", "title": f"פרק {current - 1}"}

    def _get_next_chapter(self, current: int, total: int) -> Optional[Dict]:
        """Get next chapter navigation info."""
        if current >= total:
            return None
        return {"id": f"chapter-{current + 1}", "title": f"פרק {current + 1}"}

    def _generate_learning_objectives(self, title: str) -> List[str]:
        """Generate learning objectives for the chapter."""
        return [
            f"להבין את המושג {title} ואת המשמעות שלו",
            "להכיר את הנוסחאות הקשורות לנושא",
            "לפתור תרגילים בעזרת הכלים שנלמדו",
            "לזהות טעויות נפוצות ולהימנע מהן",
        ]

    def _generate_checkpoint_questions(self) -> List[Dict]:
        """Generate checkpoint quiz questions."""
        return [
            {
                "id": str(uuid.uuid4()),
                "question": "מהי ההגדרה העיקרית שלמה שלמדנו בפרק זה?",
                "options": [
                    "הגדרה נכונה",
                    "הגדרה שגויה א",
                    "הגדרה שגויה ב",
                    "הגדרה שגויה ג",
                ],
                "correctIndex": 0,
                "explanation": "ההגדרה הנכונה היא זו שלמדנו בשיעור. זכרו את הנקודות המרכזיות!",
            }
        ]

    def _extract_formulas(self, formulas: List[Dict]) -> List[Dict]:
        """Extract formulas for quick reference."""
        return [
            {"name": f["name"], "formula": f["full"]}
            for f in formulas[:5]  # Limit to 5 formulas
        ]

    def _extract_definitions(self, sections: List[ParsedSection]) -> List[Dict]:
        """Extract definitions from sections."""
        definitions = []
        for section in sections:
            if section.section_type == "definition":
                definitions.append(
                    {
                        "term": section.title[:30],
                        "definition": section.content[:100] + "...",
                    }
                )
        return definitions[:5]  # Limit to 5 definitions


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Transform librarian markdown into engaging chapter.json"
    )
    parser.add_argument("input", type=str, help="Path to librarian-output.md file")
    parser.add_argument(
        "--output",
        "-o",
        type=str,
        help="Output path for chapter.json (default: same directory as input)",
    )
    parser.add_argument(
        "--chapter-number",
        "-n",
        type=int,
        default=1,
        help="Chapter number (default: 1)",
    )
    parser.add_argument(
        "--total-chapters",
        "-t",
        type=int,
        default=12,
        help="Total number of chapters in course (default: 12)",
    )
    parser.add_argument(
        "--course",
        "-c",
        type=str,
        default="מיקרו-כלכלה",
        help="Course name (default: מיקרו-כלכלה)",
    )

    args = parser.parse_args()

    # Validate input
    input_path = Path(args.input)
    if not input_path.exists():
        print(
            f"Error: Input file not found: {args.input}", file=__import__("sys").stderr
        )
        __import__("sys").exit(1)

    # Determine output path
    if args.output:
        output_path = Path(args.output)
    else:
        output_path = input_path.parent / "chapter.json"

    print(f"Processing: {input_path}")
    print(f"Output will be saved to: {output_path}")

    # Initialize components
    parser_obj = LibrarianParser(str(input_path))
    professor = ProfessorCharisma(course_name=args.course)
    analyzer = ContentAnalyzer(professor)
    generator = ChapterGenerator(professor, analyzer)

    # Parse input
    print("Parsing librarian output...")
    parsed_data = parser_obj.parse()
    print(f"Found {len(parsed_data['sections'])} sections")
    try:
        print(f"Title: {parsed_data['title']}")
    except UnicodeEncodeError:
        print(f"Title: (Hebrew title - see output file)")

    # Generate chapter
    print("Generating chapter content...")
    chapter = generator.generate_chapter(
        parsed_data,
        chapter_number=args.chapter_number,
        total_chapters=args.total_chapters,
        course=args.course,
    )

    # Count blocks generated
    total_blocks = sum(len(topic["blocks"]) for topic in chapter["topics"])
    print(f"Generated {len(chapter['topics'])} topics with {total_blocks} total blocks")

    # Write output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(chapter, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated: {output_path}")


if __name__ == "__main__":
    main()
