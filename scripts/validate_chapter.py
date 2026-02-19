"""
Sikumnik Chapter JSON Schema Validator
Validates chapter JSON files against the TypeScript schema definition.
"""

import json
import sys
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional, Union
from dataclasses import dataclass


@dataclass
class ValidationError:
    """Represents a single validation error."""

    path: str
    message: str
    severity: str = "error"  # error, warning

    def __str__(self):
        prefix = "[ERROR]" if self.severity == "error" else "[WARN]"
        return f"{prefix} [{self.path}] {self.message}"


class ChapterValidator:
    """Validates chapter JSON against the Sikumnik schema."""

    # Required fields at the chapter level
    REQUIRED_CHAPTER_FIELDS = [
        "id",
        "title",
        "course",
        "chapterNumber",
        "totalChapters",
        "pageMap",
        "topics",
    ]

    # Optional but recommended fields
    RECOMMENDED_CHAPTER_FIELDS = [
        "introduction",
        "navigation",
        "checkpoint",
        "independentExercises",
        "quickReference",
        "trivia",
        "bridge",
    ]

    # Valid block types from the schema
    VALID_BLOCK_TYPES = [
        "explanation",
        "analogy",
        "definition",
        "formula",
        "example",
        "deep-dive",
        "tone-break",
        "common-mistake",
        "guided-exercise",
        "interactive",
        "callout",
        "image",
        "checkpoint",
        "summary",
        "hook",
        "prerequisite",
    ]

    # Required fields for each block type
    BLOCK_REQUIRED_FIELDS = {
        "explanation": ["type", "content"],
        "analogy": ["type", "content"],
        "definition": ["type", "term", "content"],
        "formula": ["type", "title", "formula"],
        "example": ["type", "title", "scenario", "solution"],
        "deep-dive": ["type", "title", "sections"],
        "tone-break": ["type", "opener", "content"],
        "common-mistake": ["type", "mistake", "correct", "why"],
        "guided-exercise": [
            "type",
            "difficulty",
            "question",
            "thinkingDirection",
            "steps",
            "finalAnswer",
        ],
        "interactive": ["type", "componentId"],
        "callout": ["type", "variant", "content"],
        "image": ["type", "src", "alt"],
        "checkpoint": ["type", "questions"],
        "summary": ["type", "content"],
        "hook": ["type", "opener"],
        "prerequisite": ["type", "concept", "briefReview", "whyNeeded"],
    }

    # Valid callout variants
    VALID_CALLOUT_VARIANTS = ["tip", "warning", "note"]

    # Valid guided exercise phase types
    VALID_PHASE_TYPES = ["i-do", "we-do", "you-do"]

    def __init__(self, strict_hebrew: bool = False):
        """
        Initialize validator.

        Args:
            strict_hebrew: If True, enforces Hebrew content validation
        """
        self.errors: List[ValidationError] = []
        self.warnings: List[ValidationError] = []
        self.strict_hebrew = strict_hebrew

    def validate_file(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """
        Validate a chapter JSON file.

        Args:
            file_path: Path to the JSON file

        Returns:
            Dictionary with validation results
        """
        self.errors = []
        self.warnings = []

        file_path = Path(file_path)

        if not file_path.exists():
            self.errors.append(
                ValidationError(
                    path="file",
                    message=f"File not found: {file_path}",
                    severity="error",
                )
            )
            return self._build_result(file_path)

        # Try to parse JSON
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError as e:
            self.errors.append(
                ValidationError(
                    path="json", message=f"Invalid JSON: {e}", severity="error"
                )
            )
            return self._build_result(file_path)
        except Exception as e:
            self.errors.append(
                ValidationError(
                    path="file", message=f"Error reading file: {e}", severity="error"
                )
            )
            return self._build_result(file_path)

        # Validate the chapter data
        self.validate_chapter(data)

        return self._build_result(file_path)

    def validate_chapter(self, data: Dict[str, Any], path: str = "") -> None:
        """Validate chapter-level structure."""
        if not isinstance(data, dict):
            self.errors.append(
                ValidationError(
                    path=path or "root",
                    message=f"Chapter must be an object, got {type(data).__name__}",
                    severity="error",
                )
            )
            return

        # Check required fields
        for field in self.REQUIRED_CHAPTER_FIELDS:
            if field not in data:
                self.errors.append(
                    ValidationError(
                        path=f"{path}.{field}" if path else field,
                        message=f"Required field '{field}' is missing",
                        severity="error",
                    )
                )

        # Check for unknown fields (warning)
        known_fields = set(
            self.REQUIRED_CHAPTER_FIELDS + self.RECOMMENDED_CHAPTER_FIELDS
        )
        unknown_fields = set(data.keys()) - known_fields
        if unknown_fields:
            self.warnings.append(
                ValidationError(
                    path=path or "root",
                    message=f"Unknown fields: {', '.join(unknown_fields)}",
                    severity="warning",
                )
            )

        # Validate field types and content
        if "id" in data and not isinstance(data["id"], str):
            self.errors.append(
                ValidationError(
                    path=f"{path}.id" if path else "id",
                    message=f"'id' must be a string, got {type(data['id']).__name__}",
                    severity="error",
                )
            )

        if "title" in data:
            if not isinstance(data["title"], str):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.title" if path else "title",
                        message=f"'title' must be a string, got {type(data['title']).__name__}",
                        severity="error",
                    )
                )
            elif self.strict_hebrew:
                self._validate_hebrew_content(
                    data["title"], f"{path}.title" if path else "title", "title"
                )

        if "course" in data:
            if not isinstance(data["course"], str):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.course" if path else "course",
                        message=f"'course' must be a string, got {type(data['course']).__name__}",
                        severity="error",
                    )
                )
            elif self.strict_hebrew:
                self._validate_hebrew_content(
                    data["course"], f"{path}.course" if path else "course", "course"
                )

        if "chapterNumber" in data:
            if not isinstance(data["chapterNumber"], int) or isinstance(
                data["chapterNumber"], bool
            ):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.chapterNumber" if path else "chapterNumber",
                        message=f"'chapterNumber' must be an integer, got {type(data['chapterNumber']).__name__}",
                        severity="error",
                    )
                )
            elif data["chapterNumber"] < 1:
                self.warnings.append(
                    ValidationError(
                        path=f"{path}.chapterNumber" if path else "chapterNumber",
                        message=f"'chapterNumber' should be >= 1, got {data['chapterNumber']}",
                        severity="warning",
                    )
                )

        if "totalChapters" in data:
            if not isinstance(data["totalChapters"], int) or isinstance(
                data["totalChapters"], bool
            ):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.totalChapters" if path else "totalChapters",
                        message=f"'totalChapters' must be an integer, got {type(data['totalChapters']).__name__}",
                        severity="error",
                    )
                )
            elif data["totalChapters"] < 1:
                self.warnings.append(
                    ValidationError(
                        path=f"{path}.totalChapters" if path else "totalChapters",
                        message=f"'totalChapters' should be >= 1, got {data['totalChapters']}",
                        severity="warning",
                    )
                )

        # Validate pageMap
        if "pageMap" in data:
            self._validate_page_map(
                data["pageMap"], f"{path}.pageMap" if path else "pageMap"
            )

        # Validate introduction
        if "introduction" in data:
            self._validate_introduction(
                data["introduction"], f"{path}.introduction" if path else "introduction"
            )

        # Validate topics
        if "topics" in data:
            self._validate_topics(
                data["topics"], f"{path}.topics" if path else "topics"
            )

        # Validate checkpoint
        if "checkpoint" in data and data["checkpoint"]:
            self._validate_checkpoint_questions(
                data["checkpoint"], f"{path}.checkpoint" if path else "checkpoint"
            )

        # Validate independentExercises
        if "independentExercises" in data and data["independentExercises"]:
            self._validate_exercises(
                data["independentExercises"],
                f"{path}.independentExercises" if path else "independentExercises",
            )

        # Validate navigation
        if "navigation" in data:
            self._validate_navigation(
                data["navigation"], f"{path}.navigation" if path else "navigation"
            )

        # Validate quickReference
        if "quickReference" in data:
            self._validate_quick_reference(
                data["quickReference"],
                f"{path}.quickReference" if path else "quickReference",
            )

        # Validate bridge
        if "bridge" in data:
            self._validate_bridge(
                data["bridge"], f"{path}.bridge" if path else "bridge"
            )

    def _validate_page_map(self, page_map: Any, path: str) -> None:
        """Validate pageMap structure."""
        if not isinstance(page_map, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"pageMap must be an object, got {type(page_map).__name__}",
                    severity="error",
                )
            )
            return

        # Required fields in pageMap
        if "learningObjectives" not in page_map:
            self.errors.append(
                ValidationError(
                    path=path,
                    message="pageMap must have 'learningObjectives' field",
                    severity="error",
                )
            )
        elif not isinstance(page_map["learningObjectives"], list):
            self.errors.append(
                ValidationError(
                    path=f"{path}.learningObjectives",
                    message=f"learningObjectives must be an array, got {type(page_map['learningObjectives']).__name__}",
                    severity="error",
                )
            )
        else:
            for i, obj in enumerate(page_map["learningObjectives"]):
                if not isinstance(obj, str):
                    self.errors.append(
                        ValidationError(
                            path=f"{path}.learningObjectives[{i}]",
                            message=f"Learning objective must be a string, got {type(obj).__name__}",
                            severity="error",
                        )
                    )

        if "estimatedTime" not in page_map:
            self.warnings.append(
                ValidationError(
                    path=path,
                    message="pageMap should have 'estimatedTime' field",
                    severity="warning",
                )
            )
        elif not isinstance(page_map.get("estimatedTime"), str):
            self.errors.append(
                ValidationError(
                    path=f"{path}.estimatedTime",
                    message=f"estimatedTime must be a string, got {type(page_map.get('estimatedTime')).__name__}",
                    severity="error",
                )
            )

    def _validate_introduction(self, intro: Any, path: str) -> None:
        """Validate introduction structure."""
        if not isinstance(intro, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"introduction must be an object, got {type(intro).__name__}",
                    severity="error",
                )
            )
            return

        if "content" not in intro:
            self.errors.append(
                ValidationError(
                    path=path,
                    message="introduction must have 'content' field",
                    severity="error",
                )
            )
        elif not isinstance(intro["content"], str):
            self.errors.append(
                ValidationError(
                    path=f"{path}.content",
                    message=f"introduction.content must be a string, got {type(intro['content']).__name__}",
                    severity="error",
                )
            )

    def _validate_topics(self, topics: Any, path: str) -> None:
        """Validate topics array."""
        if not isinstance(topics, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"topics must be an array, got {type(topics).__name__}",
                    severity="error",
                )
            )
            return

        if len(topics) == 0:
            self.warnings.append(
                ValidationError(
                    path=path,
                    message="topics array is empty - chapter should have at least one topic",
                    severity="warning",
                )
            )

        for i, topic in enumerate(topics):
            self._validate_topic(topic, f"{path}[{i}]")

    def _validate_topic(self, topic: Any, path: str) -> None:
        """Validate a single topic."""
        if not isinstance(topic, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"topic must be an object, got {type(topic).__name__}",
                    severity="error",
                )
            )
            return

        # Required fields
        for field in ["id", "title", "blocks"]:
            if field not in topic:
                self.errors.append(
                    ValidationError(
                        path=f"{path}.{field}",
                        message=f"topic must have '{field}' field",
                        severity="error",
                    )
                )

        # Validate blocks
        if "blocks" in topic:
            self._validate_blocks(topic["blocks"], f"{path}.blocks")

    def _validate_blocks(self, blocks: Any, path: str) -> None:
        """Validate content blocks array."""
        if not isinstance(blocks, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"blocks must be an array, got {type(blocks).__name__}",
                    severity="error",
                )
            )
            return

        for i, block in enumerate(blocks):
            self._validate_block(block, f"{path}[{i}]")

    def _validate_block(self, block: Any, path: str) -> None:
        """Validate a single content block."""
        if not isinstance(block, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"block must be an object, got {type(block).__name__}",
                    severity="error",
                )
            )
            return

        if "type" not in block:
            self.errors.append(
                ValidationError(
                    path=path, message="block must have 'type' field", severity="error"
                )
            )
            return

        block_type = block["type"]

        if block_type not in self.VALID_BLOCK_TYPES:
            self.errors.append(
                ValidationError(
                    path=f"{path}.type",
                    message=f"Invalid block type '{block_type}'. Valid types: {', '.join(self.VALID_BLOCK_TYPES)}",
                    severity="error",
                )
            )
            return

        # Check required fields for this block type
        required_fields = self.BLOCK_REQUIRED_FIELDS.get(block_type, [])
        for field in required_fields:
            if field not in block:
                self.errors.append(
                    ValidationError(
                        path=f"{path}.{field}",
                        message=f"{block_type} block must have '{field}' field",
                        severity="error",
                    )
                )

        # Type-specific validations
        if block_type == "callout":
            if (
                "variant" in block
                and block["variant"] not in self.VALID_CALLOUT_VARIANTS
            ):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.variant",
                        message=f"Invalid callout variant '{block['variant']}'. Valid: {', '.join(self.VALID_CALLOUT_VARIANTS)}",
                        severity="error",
                    )
                )

        elif block_type == "guided-exercise":
            if "difficulty" in block:
                if not isinstance(block["difficulty"], (int, float)):
                    self.errors.append(
                        ValidationError(
                            path=f"{path}.difficulty",
                            message=f"difficulty must be a number, got {type(block['difficulty']).__name__}",
                            severity="error",
                        )
                    )
                elif not 1 <= block["difficulty"] <= 5:
                    self.warnings.append(
                        ValidationError(
                            path=f"{path}.difficulty",
                            message=f"difficulty should be between 1-5, got {block['difficulty']}",
                            severity="warning",
                        )
                    )

            if "steps" in block:
                self._validate_steps(block["steps"], f"{path}.steps")

            if "phases" in block:
                self._validate_phases(block["phases"], f"{path}.phases")

        elif block_type == "formula":
            if "variables" in block and block["variables"]:
                self._validate_variables(block["variables"], f"{path}.variables")

        elif block_type == "checkpoint":
            if "questions" in block:
                self._validate_checkpoint_questions(
                    block["questions"], f"{path}.questions"
                )

        elif block_type == "deep-dive":
            if "sections" in block:
                self._validate_deep_dive_sections(block["sections"], f"{path}.sections")

    def _validate_steps(self, steps: Any, path: str) -> None:
        """Validate guided exercise steps."""
        if not isinstance(steps, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"steps must be an array, got {type(steps).__name__}",
                    severity="error",
                )
            )
            return

        for i, step in enumerate(steps):
            step_path = f"{path}[{i}]"
            if not isinstance(step, dict):
                self.errors.append(
                    ValidationError(
                        path=step_path,
                        message=f"step must be an object, got {type(step).__name__}",
                        severity="error",
                    )
                )
                continue

            for field in ["title", "action", "reasoning", "calculation", "result"]:
                if field not in step:
                    self.errors.append(
                        ValidationError(
                            path=f"{step_path}.{field}",
                            message=f"step must have '{field}' field",
                            severity="error",
                        )
                    )

    def _validate_phases(self, phases: Any, path: str) -> None:
        """Validate guided exercise phases."""
        if not isinstance(phases, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"phases must be an array, got {type(phases).__name__}",
                    severity="error",
                )
            )
            return

        for i, phase in enumerate(phases):
            phase_path = f"{path}[{i}]"
            if not isinstance(phase, dict):
                self.errors.append(
                    ValidationError(
                        path=phase_path,
                        message=f"phase must be an object, got {type(phase).__name__}",
                        severity="error",
                    )
                )
                continue

            if "type" not in phase:
                self.errors.append(
                    ValidationError(
                        path=f"{phase_path}.type",
                        message="phase must have 'type' field",
                        severity="error",
                    )
                )
            elif phase["type"] not in self.VALID_PHASE_TYPES:
                self.errors.append(
                    ValidationError(
                        path=f"{phase_path}.type",
                        message=f"Invalid phase type '{phase['type']}'. Valid: {', '.join(self.VALID_PHASE_TYPES)}",
                        severity="error",
                    )
                )

            if "content" not in phase:
                self.errors.append(
                    ValidationError(
                        path=f"{phase_path}.content",
                        message="phase must have 'content' field",
                        severity="error",
                    )
                )

    def _validate_variables(self, variables: Any, path: str) -> None:
        """Validate formula variables."""
        if not isinstance(variables, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"variables must be an array, got {type(variables).__name__}",
                    severity="error",
                )
            )
            return

        for i, var in enumerate(variables):
            var_path = f"{path}[{i}]"
            if not isinstance(var, dict):
                self.errors.append(
                    ValidationError(
                        path=var_path,
                        message=f"variable must be an object, got {type(var).__name__}",
                        severity="error",
                    )
                )
                continue

            for field in ["symbol", "name", "desc"]:
                if field not in var:
                    self.errors.append(
                        ValidationError(
                            path=f"{var_path}.{field}",
                            message=f"variable must have '{field}' field",
                            severity="error",
                        )
                    )

    def _validate_checkpoint_questions(self, questions: Any, path: str) -> None:
        """Validate checkpoint quiz questions."""
        if not isinstance(questions, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"questions must be an array, got {type(questions).__name__}",
                    severity="error",
                )
            )
            return

        for i, question in enumerate(questions):
            q_path = f"{path}[{i}]"
            if not isinstance(question, dict):
                self.errors.append(
                    ValidationError(
                        path=q_path,
                        message=f"question must be an object, got {type(question).__name__}",
                        severity="error",
                    )
                )
                continue

            for field in ["id", "question", "options", "correctIndex", "explanation"]:
                if field not in question:
                    self.errors.append(
                        ValidationError(
                            path=f"{q_path}.{field}",
                            message=f"quiz question must have '{field}' field",
                            severity="error",
                        )
                    )

            if "options" in question:
                if not isinstance(question["options"], list):
                    self.errors.append(
                        ValidationError(
                            path=f"{q_path}.options",
                            message=f"options must be an array, got {type(question['options']).__name__}",
                            severity="error",
                        )
                    )
                elif len(question["options"]) < 2:
                    self.warnings.append(
                        ValidationError(
                            path=f"{q_path}.options",
                            message=f"quiz should have at least 2 options, got {len(question['options'])}",
                            severity="warning",
                        )
                    )

            if "correctIndex" in question and "options" in question:
                if isinstance(question["correctIndex"], int) and isinstance(
                    question["options"], list
                ):
                    if not 0 <= question["correctIndex"] < len(question["options"]):
                        self.errors.append(
                            ValidationError(
                                path=f"{q_path}.correctIndex",
                                message=f"correctIndex {question['correctIndex']} is out of range (0-{len(question['options']) - 1})",
                                severity="error",
                            )
                        )

    def _validate_deep_dive_sections(self, sections: Any, path: str) -> None:
        """Validate deep-dive sections."""
        if not isinstance(sections, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"sections must be an array, got {type(sections).__name__}",
                    severity="error",
                )
            )
            return

        if len(sections) == 0:
            self.warnings.append(
                ValidationError(
                    path=path,
                    message="deep-dive sections array is empty",
                    severity="warning",
                )
            )

        for i, section in enumerate(sections):
            s_path = f"{path}[{i}]"
            if not isinstance(section, dict):
                self.errors.append(
                    ValidationError(
                        path=s_path,
                        message=f"section must be an object, got {type(section).__name__}",
                        severity="error",
                    )
                )
                continue

            for field in ["title", "content"]:
                if field not in section:
                    self.errors.append(
                        ValidationError(
                            path=f"{s_path}.{field}",
                            message=f"section must have '{field}' field",
                            severity="error",
                        )
                    )

    def _validate_exercises(self, exercises: Any, path: str) -> None:
        """Validate independent exercises."""
        if not isinstance(exercises, list):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"independentExercises must be an array, got {type(exercises).__name__}",
                    severity="error",
                )
            )
            return

        for i, exercise in enumerate(exercises):
            e_path = f"{path}[{i}]"
            if not isinstance(exercise, dict):
                self.errors.append(
                    ValidationError(
                        path=e_path,
                        message=f"exercise must be an object, got {type(exercise).__name__}",
                        severity="error",
                    )
                )
                continue

            for field in ["difficulty", "question", "hint", "answer"]:
                if field not in exercise:
                    self.errors.append(
                        ValidationError(
                            path=f"{e_path}.{field}",
                            message=f"exercise must have '{field}' field",
                            severity="error",
                        )
                    )

    def _validate_navigation(self, navigation: Any, path: str) -> None:
        """Validate navigation structure."""
        if not isinstance(navigation, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"navigation must be an object, got {type(navigation).__name__}",
                    severity="error",
                )
            )
            return

        for key in ["previous", "next"]:
            if key in navigation and navigation[key]:
                nav_item = navigation[key]
                if not isinstance(nav_item, dict):
                    self.errors.append(
                        ValidationError(
                            path=f"{path}.{key}",
                            message=f"navigation {key} must be an object, got {type(nav_item).__name__}",
                            severity="error",
                        )
                    )
                    continue

                for field in ["id", "title"]:
                    if field not in nav_item:
                        self.errors.append(
                            ValidationError(
                                path=f"{path}.{key}.{field}",
                                message=f"navigation {key} must have '{field}' field",
                                severity="error",
                            )
                        )

    def _validate_quick_reference(self, quick_ref: Any, path: str) -> None:
        """Validate quickReference structure."""
        if not isinstance(quick_ref, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"quickReference must be an object, got {type(quick_ref).__name__}",
                    severity="error",
                )
            )
            return

        if "formulas" in quick_ref and quick_ref["formulas"]:
            if not isinstance(quick_ref["formulas"], list):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.formulas",
                        message=f"formulas must be an array, got {type(quick_ref['formulas']).__name__}",
                        severity="error",
                    )
                )
            else:
                for i, formula in enumerate(quick_ref["formulas"]):
                    if not isinstance(formula, dict):
                        self.errors.append(
                            ValidationError(
                                path=f"{path}.formulas[{i}]",
                                message=f"formula entry must be an object, got {type(formula).__name__}",
                                severity="error",
                            )
                        )
                    else:
                        for field in ["name", "formula"]:
                            if field not in formula:
                                self.errors.append(
                                    ValidationError(
                                        path=f"{path}.formulas[{i}].{field}",
                                        message=f"formula entry must have '{field}' field",
                                        severity="error",
                                    )
                                )

        if "definitions" in quick_ref and quick_ref["definitions"]:
            if not isinstance(quick_ref["definitions"], list):
                self.errors.append(
                    ValidationError(
                        path=f"{path}.definitions",
                        message=f"definitions must be an array, got {type(quick_ref['definitions']).__name__}",
                        severity="error",
                    )
                )
            else:
                for i, definition in enumerate(quick_ref["definitions"]):
                    if not isinstance(definition, dict):
                        self.errors.append(
                            ValidationError(
                                path=f"{path}.definitions[{i}]",
                                message=f"definition entry must be an object, got {type(definition).__name__}",
                                severity="error",
                            )
                        )
                    else:
                        for field in ["term", "definition"]:
                            if field not in definition:
                                self.errors.append(
                                    ValidationError(
                                        path=f"{path}.definitions[{i}].{field}",
                                        message=f"definition entry must have '{field}' field",
                                        severity="error",
                                    )
                                )

    def _validate_bridge(self, bridge: Any, path: str) -> None:
        """Validate bridge structure."""
        if not isinstance(bridge, dict):
            self.errors.append(
                ValidationError(
                    path=path,
                    message=f"bridge must be an object, got {type(bridge).__name__}",
                    severity="error",
                )
            )
            return

        for field in ["nextChapterTitle", "content", "nextChapter"]:
            if field not in bridge:
                self.errors.append(
                    ValidationError(
                        path=f"{path}.{field}",
                        message=f"bridge must have '{field}' field",
                        severity="error",
                    )
                )

    def _validate_hebrew_content(self, content: str, path: str, context: str) -> None:
        """Validate that content is in Hebrew (when strict mode enabled)."""
        if not isinstance(content, str):
            return

        # Check for Hebrew characters
        hebrew_pattern = any("\u0590" <= c <= "\u05ff" for c in content)

        if not hebrew_pattern:
            self.warnings.append(
                ValidationError(
                    path=path,
                    message=f"{context} should be in Hebrew, but no Hebrew characters found",
                    severity="warning",
                )
            )

    def _build_result(self, file_path: Path) -> Dict[str, Any]:
        """Build validation result dictionary."""
        return {
            "valid": len(self.errors) == 0,
            "file": str(file_path),
            "errors": [str(e) for e in self.errors],
            "warnings": [str(e) for e in self.warnings],
            "error_count": len(self.errors),
            "warning_count": len(self.warnings),
            "all_issues": [str(e) for e in self.errors + self.warnings],
        }

    def print_report(self, result: Dict[str, Any]) -> None:
        """Print a formatted validation report."""
        print("\n" + "=" * 70)
        print(f"VALIDATION REPORT: {result['file']}")
        print("=" * 70)

        if result["valid"] and result["warning_count"] == 0:
            print("[VALID] Chapter is valid! No errors or warnings found.")
        elif result["valid"]:
            print(
                f"[VALID] Chapter is valid with {result['warning_count']} warning(s):"
            )
            for warning in result["warnings"]:
                print(f"   {warning}")
        else:
            print(
                f"[INVALID] Chapter has {result['error_count']} error(s) and {result['warning_count']} warning(s):"
            )
            for issue in result["all_issues"]:
                print(f"   {issue}")

        print("=" * 70 + "\n")


def validate_chapter_file(
    file_path: Union[str, Path], strict_hebrew: bool = False, verbose: bool = True
) -> Dict[str, Any]:
    """
    Convenience function to validate a single chapter file.

    Args:
        file_path: Path to the JSON file
        strict_hebrew: Enable strict Hebrew content validation
        verbose: Print detailed report

    Returns:
        Validation result dictionary
    """
    validator = ChapterValidator(strict_hebrew=strict_hebrew)
    result = validator.validate_file(file_path)

    if verbose:
        validator.print_report(result)

    return result


def validate_chapter_directory(
    directory: Union[str, Path], pattern: str = "*.json", strict_hebrew: bool = False
) -> List[Dict[str, Any]]:
    """
    Validate all chapter files in a directory.

    Args:
        directory: Directory to search for chapter files
        pattern: Glob pattern to match files
        strict_hebrew: Enable strict Hebrew content validation

    Returns:
        List of validation results
    """
    directory = Path(directory)
    results = []

    print(f"\nSCANNING: Validating all {pattern} files in {directory}\n")

    for file_path in directory.rglob(pattern):
        result = validate_chapter_file(
            file_path, strict_hebrew=strict_hebrew, verbose=False
        )
        results.append(result)

        status = "✅" if result["valid"] else "❌"
        warnings = (
            f" ({result['warning_count']} warnings)"
            if result["warning_count"] > 0
            else ""
        )
        print(f"{status} {file_path.relative_to(directory)}{warnings}")

    # Summary
    total = len(results)
    valid = sum(1 for r in results if r["valid"])
    invalid = total - valid
    total_warnings = sum(r["warning_count"] for r in results)

    print("\n" + "=" * 70)
    print(
        f"📊 SUMMARY: {valid}/{total} files valid, {invalid} invalid, {total_warnings} total warnings"
    )
    print("=" * 70 + "\n")

    return results


# CLI Interface
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Validate Sikumnik chapter JSON files against the schema",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python validate_chapter.py chapter.json
  python validate_chapter.py chapter.json --strict-hebrew
  python validate_chapter.py ./courses/ --directory
  python validate_chapter.py ./courses/ --directory --pattern "chapter*.json"
        """,
    )

    parser.add_argument("path", help="Path to chapter JSON file or directory")
    parser.add_argument(
        "--directory", "-d", action="store_true", help="Validate all files in directory"
    )
    parser.add_argument(
        "--pattern",
        "-p",
        default="*.json",
        help="File pattern when validating directory (default: *.json)",
    )
    parser.add_argument(
        "--strict-hebrew",
        "-H",
        action="store_true",
        help="Enable strict Hebrew content validation",
    )
    parser.add_argument(
        "--quiet",
        "-q",
        action="store_true",
        help="Only output errors (no success messages)",
    )
    parser.add_argument(
        "--json", "-j", action="store_true", help="Output results as JSON"
    )

    args = parser.parse_args()

    if args.directory:
        results = validate_chapter_directory(
            args.path, args.pattern, args.strict_hebrew
        )

        if args.json:
            print(json.dumps(results, ensure_ascii=False, indent=2))

        # Exit with error code if any files failed
        exit_code = 1 if any(not r["valid"] for r in results) else 0
        sys.exit(exit_code)
    else:
        result = validate_chapter_file(
            args.path, args.strict_hebrew, verbose=not args.quiet
        )

        if args.json:
            print(json.dumps(result, ensure_ascii=False, indent=2))

        sys.exit(0 if result["valid"] else 1)
