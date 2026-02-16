import pdfplumber
import pandas as pd
import re
import os
import pytesseract
import pypdfium2 as pdfium
from PIL import Image

# Configure Tesseract path if needed (Windows example)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_with_ocr(pdf_path):
    """Extract text using OCR with optimized settings for Hebrew."""
    print("Standard extraction failed. Attempting OCR with Tesseract...")
    full_text = ""

    try:
        pdf = pdfium.PdfDocument(pdf_path)
        for i, page in enumerate(pdf):
            # Render to image (scale=3 for better clarity - higher is better for Hebrew)
            bitmap = page.render(scale=3)
            pil_image = bitmap.to_pil()

            # Extract Hebrew + English with optimized config
            # --psm 6 = Assume a single uniform block of text
            # --oem 3 = Use LSTM neural net mode (best for Hebrew)
            custom_config = r"--psm 6 --oem 3"

            # Try Hebrew+English first
            text = pytesseract.image_to_string(
                pil_image, lang="heb+eng", config=custom_config
            )

            # If we get empty or very short text, try Hebrew alone
            if len(text.strip()) < 10:
                text = pytesseract.image_to_string(
                    pil_image, lang="heb", config=custom_config
                )

            full_text += f"\n\n--- Page {i + 1} (OCR) ---\n\n"
            full_text += text
    except Exception as e:
        print(f"OCR Failed: {e}")
        full_text += f"\n\n[OCR Failed: {e}]\n\n"

    return full_text


def extract_text(pdf_path):
    """Extract text from PDF, with OCR fallback for image-based PDFs."""
    print(f"Extracting text from {pdf_path}...")
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text(x_tolerance=2, y_tolerance=2)
            if text:
                full_text += f"\n\n--- Page {page_num} ---\n\n"
                full_text += text

    # Heuristic: If text is too short (< 100 chars for a whole file), try OCR
    clean_extracted_text = full_text.strip()
    if len(clean_extracted_text) < 100:
        print(
            f"Extracted content length: {len(clean_extracted_text)}. Likely image-based PDF."
        )
        return extract_text_with_ocr(pdf_path)

    return full_text


def extract_tables(pdf_path):
    """Extract tables from PDF using pdfplumber."""
    print("Extracting tables...")
    all_tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            tables = page.extract_tables()
            for table_idx, table in enumerate(tables):
                if table and len(table) > 1:
                    df = pd.DataFrame(table[1:], columns=table[0])
                    all_tables.append(
                        {"page": page_num, "table_idx": table_idx, "data": df}
                    )
    return all_tables


def table_to_markdown(df):
    """Convert DataFrame to Markdown table."""
    if df.empty:
        return ""

    df = df.fillna("")
    columns = [str(c) if c is not None else "" for c in df.columns]

    header = "| " + " | ".join(columns) + " |"
    separator = "| " + " | ".join(["---"] * len(columns)) + " |"

    rows = []
    for _, row in df.iterrows():
        values = [str(v) if v is not None else "" for v in row.values]
        rows.append("| " + " | ".join(values) + " |")

    return "\n".join([header, separator] + rows)


def clean_text(text):
    """Basic text cleanup."""
    print("Cleaning text...")
    # 1. Remove page numbers
    text = re.sub(r"^Page \d+$", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\s*$", "", text, flags=re.MULTILINE)

    # 2. Fix hyphenation
    text = re.sub(r"-(\n)(\w)", r"\1\2", text)

    # 3. Fix multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # 4. Strip whitespace
    lines = [line.strip() for line in text.split("\n")]
    text = "\n".join(lines)

    return text.strip()


def save_markdown(content, output_path):
    """Save content to markdown file."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path


# ============================================
# HEBREW TEXT PROCESSING
# ============================================


def is_hebrew_unicode(text):
    """Check if text contains Hebrew Unicode characters."""
    return any("\u0590" <= c <= "\u05ff" for c in text)


def is_latin_hebrew(text):
    """
    Detect if text is 'Latin Hebrew' - OCR output where Hebrew letters
    were mapped to Latin look-alikes (e.g., 'YD' instead of 'די').
    """
    # Look for patterns common in garbled Hebrew OCR
    # High frequency of: N, Y, A, D, T, I, W, 7, 9
    hebrew_indicators = set("NYADIWna")
    text_chars = set(c for c in text if c.isalpha())

    # If most characters are in our indicator set, it might be Latin Hebrew
    if not text_chars:
        return False

    indicator_ratio = len(text_chars & hebrew_indicators) / len(text_chars)

    # Also check for patterns like single uppercase letters followed by lowercase or numbers
    # Common in Hebrew OCR: N'7, D'9, etc.
    hebrew_pattern = re.search(r"[NYADIWnyadiw]'[0-9]", text)

    return indicator_ratio > 0.4 or hebrew_pattern is not None


def latin_to_hebrew_char(c):
    """
    Map Latin look-alike characters to Hebrew Unicode.
    This is based on common OCR misrecognition patterns.
    """
    mapping = {
        # Uppercase mappings
        "A": "א",  # Alef
        "B": "ב",  # Bet
        "C": "ס",  # Samekh (or כ)
        "D": "ד",  # Dalet
        "E": "ע",  # Ayin
        "F": "פ",  # Pe
        "G": "ג",  # Gimel
        "H": "ה",  # He
        "I": "י",  # Yod
        "J": "י",  # Yod
        "K": "כ",  # Kaf
        "L": "ל",  # Lamed
        "M": "מ",  # Mem
        "N": "נ",  # Nun
        "O": "ו",  # Vav (sometimes)
        "P": "פ",  # Pe
        "Q": "ק",  # Qof
        "R": "ר",  # Resh
        "S": "ס",  # Samekh
        "T": "ת",  # Tav
        "U": "ו",  # Vav
        "V": "ו",  # Vav
        "W": "ו",  # Vav
        "X": "צ",  # Tsadi
        "Y": "י",  # Yod
        "Z": "ז",  # Zayin
        # Lowercase mappings
        "a": "א",
        "b": "ב",
        "c": "ס",
        "d": "ד",
        "e": "ע",
        "f": "פ",
        "g": "ג",
        "h": "ה",
        "i": "י",
        "j": "י",
        "k": "כ",
        "l": "ל",
        "m": "מ",
        "n": "נ",
        "o": "ו",
        "p": "פ",
        "q": "ק",
        "r": "ר",
        "s": "ס",
        "t": "ת",
        "u": "ו",
        "v": "ו",
        "w": "ו",
        "x": "צ",
        "y": "י",
        "z": "ז",
        # Number mappings (visual similarity)
        "2": "ב",
        "3": "ג",
        "7": "ז",
        "9": "ט",
        "0": "ע",
        "1": "י",
        "4": "ד",
        "5": "ה",
        "6": "ו",
        "8": "ח",
        # Punctuation
        "'": "'",  # Keep apostrophe (could be geresh)
        '"': '"',  # Keep quotes
    }

    return mapping.get(c, c)


def convert_latin_hebrew(text):
    """
    Convert Latin-lookalike Hebrew to proper Hebrew Unicode.
    Preserves English words and numbers that should stay Latin.
    """
    # First, identify and protect English words (3+ consecutive Latin letters)
    # We'll use placeholders
    english_words = []

    def protect_english(match):
        english_words.append(match.group(0))
        return f"<<ENG{len(english_words) - 1}>>"

    # Protect sequences that look like real English words (mixed case, common patterns)
    # Pattern: word characters that include lowercase (likely English)
    protected = re.sub(r"\b[a-zA-Z]{2,}[a-z][a-zA-Z]*\b", protect_english, text)
    protected = re.sub(r"\b[a-z]{2,}\b", protect_english, protected)

    # Also protect obvious English terms and acronyms
    protected = re.sub(r"\b(TC|AC|MC|ENG|USD|EUR)\b", protect_english, protected)

    # Now convert the rest (assumed to be Hebrew look-alikes)
    converted = "".join(str(latin_to_hebrew_char(c)) for c in protected)

    # Restore English words
    for i, word in enumerate(english_words):
        converted = converted.replace(f"<<ENG{i}>>", word)

    return converted


def is_visual_hebrew(text):
    """
    Detect if Hebrew text is in visual order (reversed).
    Visual Hebrew has punctuation at the "wrong" end.
    """
    if not is_hebrew_unicode(text):
        return False

    # Count Hebrew characters
    hebrew_chars = [c for c in text if "\u0590" <= c <= "\u05ff"]
    if len(hebrew_chars) < 3:
        return False

    # Check for patterns that suggest visual ordering
    # In visual Hebrew, lines often end with Hebrew letters that should be at the start
    lines = text.split("\n")

    for line in lines:
        line = line.strip()
        if len(line) < 3:
            continue

        # Get first and last characters (ignoring whitespace)
        first_char = None
        last_char = None

        for c in line:
            if not c.isspace():
                if first_char is None:
                    first_char = c
                last_char = c

        if first_char and last_char:
            # If line ends with Hebrew but starts with punctuation, might be visual
            first_is_hebrew = "\u0590" <= first_char <= "\u05ff"
            last_is_hebrew = "\u0590" <= last_char <= "\u05ff"
            first_is_punct = first_char in ".,;:!?()[]{}\"'"

            # Visual Hebrew: starts with punctuation (which visually appears at end in RTL)
            if first_is_punct and last_is_hebrew:
                return True

    return False


def reverse_visual_hebrew(text):
    """
    Reverse visual Hebrew to logical order.
    Visual Hebrew = characters stored in reverse order for LTR display.
    Strategy: Reverse entire string, then un-reverse English words.
    """
    lines = text.split("\n")
    processed_lines = []

    for line in lines:
        if not line.strip():
            processed_lines.append(line)
            continue

        # Check if this line contains Hebrew
        if not is_hebrew_unicode(line):
            processed_lines.append(line)
            continue

        # Step 1: Reverse the entire line
        # This puts Hebrew in logical order but reverses English words
        reversed_line = line[::-1]

        # Step 2: Fix English words that got reversed
        # English words should be readable left-to-right
        def fix_english_word(match):
            word = match.group(0)
            # Reverse the word back to normal
            return word[::-1]

        # Match alphanumeric sequences and fix them
        fixed_line = re.sub(r"[A-Za-z0-9]+", fix_english_word, reversed_line)

        processed_lines.append(fixed_line)

    return "\n".join(processed_lines)


def fix_hebrew_text(text):
    """
    Main function to fix Hebrew text issues.
    Handles both Latin-lookalike OCR and visual Hebrew ordering.
    """
    print("Processing Hebrew text...")

    # Step 1: Check if this is Latin-lookalike Hebrew
    if is_latin_hebrew(text):
        print("  Detected Latin-lookalike Hebrew, converting to Unicode...")
        text = convert_latin_hebrew(text)

    # Step 2: Check if we now have Hebrew that needs visual reversal
    if is_hebrew_unicode(text) and is_visual_hebrew(text):
        print("  Detected visual Hebrew ordering, reversing to logical...")
        text = reverse_visual_hebrew(text)

    return text


def validate_quality(text):
    """Validate extracted text quality."""
    if not text or len(text.strip()) < 50:
        return False, "Text too short"

    # Check for excessive non-readable characters
    total_chars = len(text)
    readable_chars = sum(
        1 for c in text if c.isalnum() or c.isspace() or c in ".,;:!?()-"
    )

    if total_chars > 0 and readable_chars / total_chars < 0.5:
        return False, "Too many unreadable characters"

    return True, "OK"


def process_lecture_pdf(pdf_path, output_path, topic):
    """Main processing function for lecture PDFs."""
    print(f"\n{'=' * 60}")
    print(f"Processing: {pdf_path}")
    print(f"Output: {output_path}")
    print(f"Topic: {topic}")
    print(f"{'=' * 60}\n")

    # Step 1: Extract text (with OCR fallback)
    text = extract_text(pdf_path)

    # Step 2: Hebrew Fixes
    # Apply Hebrew fixes if text contains Hebrew (Unicode or Latin-lookalike)
    if is_hebrew_unicode(text) or is_latin_hebrew(text):
        text = fix_hebrew_text(text)

    # Step 3: Extract tables
    tables = extract_tables(pdf_path)

    # Step 4: Clean
    text = clean_text(text)

    # Step 5: Validate
    is_valid, message = validate_quality(text)
    if not is_valid:
        print(f"WARNING: Text quality check failed: {message}")

    # Step 6: Organize
    markdown = f"# {topic}\n\n"
    markdown += "## Overview\n"
    markdown += f"Content extracted from {os.path.basename(pdf_path)}\n\n"
    markdown += "## Content\n"
    markdown += text + "\n\n"

    if tables:
        markdown += "## Tables\n\n"
        for i, tbl in enumerate(tables):
            markdown += f"### Table {i + 1} (Page {tbl['page']})\n\n"
            # Also fix Hebrew in tables
            table_md = table_to_markdown(tbl["data"])
            if is_hebrew_unicode(table_md) or is_latin_hebrew(table_md):
                table_md = fix_hebrew_text(table_md)
            markdown += table_md + "\n\n"

    # Step 7: Save
    saved_path = save_markdown(markdown, output_path)
    print(f"\n{'=' * 60}")
    print(f"Saved to: {saved_path}")
    print(f"{'=' * 60}\n")

    return saved_path


def classify_pdf_type(filename):
    """
    Classify PDF as either 'lecture' (theory/presentation) or 'homework' (exercises).

    Returns:
        'homework' if filename contains homework-related keywords
        'lecture' otherwise
    """
    filename_lower = filename.lower()

    # Homework/exercise indicators
    homework_keywords = [
        "homework",
        "hw",
        "exercise",
        "exercises",
        "solution",
        "solutions",
        "תרגיל",
        "תרגילים",
        "פתרון",
        "פתרונות",
        "shitot",
        "בית",
        "assignment",
        "assignments",
        "practice",
        "drill",
        "drills",
    ]

    for keyword in homework_keywords:
        if keyword in filename_lower:
            return "homework"

    return "lecture"


def process_chapter_directory(input_dir, output_dir=None, chapter_topic=None):
    """
    Process all PDFs in a chapter directory.
    Separates content into theory (lectures) and implementation (homework).

    Args:
        input_dir: Directory containing PDF files for a chapter
        output_dir: Output directory (defaults to input_dir with 'input_materials' -> 'courses' replacement)
        chapter_topic: Topic name for the chapter

    Returns:
        dict with paths to generated files
    """
    if not os.path.isdir(input_dir):
        print(f"Error: Directory not found: {input_dir}")
        return None

    # Set output directory
    if output_dir is None:
        if "input_materials" in input_dir:
            output_dir = input_dir.replace("input_materials", "courses")
        else:
            output_dir = input_dir

    os.makedirs(output_dir, exist_ok=True)

    # Get chapter name from directory
    if chapter_topic is None:
        chapter_topic = (
            os.path.basename(input_dir).replace("-", " ").replace("_", " ").title()
        )

    print(f"\n{'=' * 70}")
    print(f"LIBRARIAN: Processing Chapter Directory")
    print(f"{'=' * 70}")
    print(f"Input: {input_dir}")
    print(f"Output: {output_dir}")
    print(f"Chapter: {chapter_topic}")
    print(f"{'=' * 70}\n")

    # Find all PDF files
    pdf_files = sorted([f for f in os.listdir(input_dir) if f.endswith(".pdf")])

    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        return None

    print(f"Found {len(pdf_files)} PDF files:")
    lecture_files = []
    homework_files = []

    for pdf_file in pdf_files:
        file_type = classify_pdf_type(pdf_file)
        if file_type == "homework":
            homework_files.append(pdf_file)
            print(f"  [HOMEWORK] {pdf_file}")
        else:
            lecture_files.append(pdf_file)
            print(f"  [LECTURE]  {pdf_file}")
    print()

    results = {
        "lecture_output": None,
        "homework_output": None,
        "lecture_count": len(lecture_files),
        "homework_count": len(homework_files),
    }

    # Process lecture files (theory)
    if lecture_files:
        print(f"Processing {len(lecture_files)} lecture files...")
        lecture_content = []

        for pdf_file in lecture_files:
            pdf_path = os.path.join(input_dir, pdf_file)
            print(f"  Extracting: {pdf_file}")

            # Extract text
            text = extract_text(pdf_path)

            # Hebrew fixes
            if is_hebrew_unicode(text) or is_latin_hebrew(text):
                text = fix_hebrew_text(text)

            # Extract tables
            tables = extract_tables(pdf_path)

            # Clean
            text = clean_text(text)

            # Add to collection
            file_topic = (
                os.path.splitext(pdf_file)[0]
                .replace("-", " ")
                .replace("_", " ")
                .title()
            )
            lecture_content.append(
                {
                    "filename": pdf_file,
                    "topic": file_topic,
                    "text": text,
                    "tables": tables,
                }
            )

        # Generate combined lecture output
        lecture_output_path = os.path.join(output_dir, "librarian-output.md")

        markdown = f"# {chapter_topic} - Theory & Presentations\n\n"
        markdown += f"## Overview\n"
        markdown += (
            f"This document contains class presentations and theoretical content.\n"
        )
        markdown += f"Source files: {', '.join(lecture_files)}\n\n"
        markdown += f"## Content\n\n"

        for content in lecture_content:
            markdown += f"### {content['topic']}\n\n"
            markdown += f"*Source: {content['filename']}*\n\n"
            markdown += content["text"] + "\n\n"

            if content["tables"]:
                markdown += "#### Tables\n\n"
                for i, tbl in enumerate(content["tables"]):
                    markdown += f"**Table {i + 1} (Page {tbl['page']})**\n\n"
                    table_md = table_to_markdown(tbl["data"])
                    if is_hebrew_unicode(table_md) or is_latin_hebrew(table_md):
                        table_md = fix_hebrew_text(table_md)
                    markdown += table_md + "\n\n"

        save_markdown(markdown, lecture_output_path)
        results["lecture_output"] = lecture_output_path
        print(f"  Saved theory content to: {lecture_output_path}")
        print()

    # Process homework files (implementation/exercises)
    if homework_files:
        print(f"Processing {len(homework_files)} homework files...")
        homework_content = []

        for pdf_file in homework_files:
            pdf_path = os.path.join(input_dir, pdf_file)
            print(f"  Extracting: {pdf_file}")

            # Extract text
            text = extract_text(pdf_path)

            # Hebrew fixes
            if is_hebrew_unicode(text) or is_latin_hebrew(text):
                text = fix_hebrew_text(text)

            # Extract tables
            tables = extract_tables(pdf_path)

            # Clean
            text = clean_text(text)

            # Add to collection
            file_topic = (
                os.path.splitext(pdf_file)[0]
                .replace("-", " ")
                .replace("_", " ")
                .title()
            )
            homework_content.append(
                {
                    "filename": pdf_file,
                    "topic": file_topic,
                    "text": text,
                    "tables": tables,
                }
            )

        # Generate combined homework output
        homework_output_path = os.path.join(output_dir, "librarian-output-homework.md")

        markdown = f"# {chapter_topic} - Exercises & Solutions\n\n"
        markdown += f"## Overview\n"
        markdown += f"This document contains homework exercises and solutions.\n"
        markdown += f"Source files: {', '.join(homework_files)}\n\n"
        markdown += f"## Content\n\n"

        for content in homework_content:
            markdown += f"### {content['topic']}\n\n"
            markdown += f"*Source: {content['filename']}*\n\n"
            markdown += content["text"] + "\n\n"

            if content["tables"]:
                markdown += "#### Tables\n\n"
                for i, tbl in enumerate(content["tables"]):
                    markdown += f"**Table {i + 1} (Page {tbl['page']})**\n\n"
                    table_md = table_to_markdown(tbl["data"])
                    if is_hebrew_unicode(table_md) or is_latin_hebrew(table_md):
                        table_md = fix_hebrew_text(table_md)
                    markdown += table_md + "\n\n"

        save_markdown(markdown, homework_output_path)
        results["homework_output"] = homework_output_path
        print(f"  Saved homework content to: {homework_output_path}")
        print()

    # Final summary
    print(f"{'=' * 70}")
    print(f"PROCESSING COMPLETE")
    print(f"{'=' * 70}")
    print(f"Files processed: {len(pdf_files)}")
    print(f"  - Lecture files: {results['lecture_count']}")
    print(f"  - Homework files: {results['homework_count']}")
    print()
    if results["lecture_output"]:
        print(f"Theory output: {results['lecture_output']}")
    if results["homework_output"]:
        print(f"Homework output: {results['homework_output']}")
    print(f"{'=' * 70}\n")

    return results


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Librarian Skill: Extract content from PDF(s)"
    )
    parser.add_argument("input_path", help="Path to input PDF file or directory")
    parser.add_argument("--output", help="Path to output directory (optional)")
    parser.add_argument("--topic", help="Topic title (optional)")
    parser.add_argument(
        "--single", action="store_true", help="Process single file (legacy mode)"
    )

    args = parser.parse_args()

    input_path = args.input_path

    if args.single or os.path.isfile(input_path):
        # Legacy single-file mode
        pdf_path = input_path

        # Determine output path if not provided
        if args.output:
            output_path = args.output
        else:
            dir_name = os.path.dirname(pdf_path)
            base_name = os.path.basename(pdf_path)

            if "input_materials" in dir_name:
                output_dir = dir_name.replace("input_materials", "courses")
            else:
                output_dir = os.path.dirname(pdf_path)

            output_path = os.path.join(output_dir, "librarian-output.md")

        # Determine topic if not provided
        if args.topic:
            topic = args.topic
        else:
            topic = (
                os.path.splitext(os.path.basename(pdf_path))[0]
                .replace("-", " ")
                .title()
            )

        if os.path.exists(pdf_path):
            process_lecture_pdf(pdf_path, output_path, topic)
        else:
            print(f"Error: PDF not found at {pdf_path}")

    else:
        # New directory mode - process all files
        input_dir = input_path
        output_dir = args.output
        topic = args.topic

        process_chapter_directory(input_dir, output_dir, topic)
