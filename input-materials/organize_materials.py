#!/usr/bin/env python3
"""
Course Materials Organizer
=========================
Automatically organizes course materials following the naming conventions.

Usage:
    python organize_materials.py <folder_path>

The script will:
1. Analyze the folder structure
2. Detect content type
3. Apply naming conventions
4. Ask for guidance when uncertain
"""

import os
import sys
import re
import shutil
from pathlib import Path
from typing import Optional

# Course codes
COURSE_CODES = {
    "math": "Mathematics",
    "micro": "Micro-economics",
    "acct": "Accounting",
    "orgbh": "Organizational Behaviour",
}

# Content type keywords
CONTENT_PATTERNS = {
    "lecture-slides": ["lecture", "slides", "presentation"],
    "ai-slides": ["ai", "notebook", "lm", "generated"],
    "exercises": ["exercise", "practice", "drills", "תרגיל"],
    "exams": ["exam", "בחינה", "test", "quiz"],
    "other": [],
}


def detect_content_type(filename: str, folder_name: str = "") -> str:
    """Detect content type based on filename and folder name."""
    combined = f"{folder_name} {filename}".lower()

    for content_type, keywords in CONTENT_PATTERNS.items():
        if not keywords:
            continue
        for keyword in keywords:
            if keyword in combined:
                return content_type

    # Check for year patterns (exams)
    if re.search(r"(20\d{2}|exam|בחינה)", combined):
        return "exams"

    return "other"


def extract_number_from_hebrew(filename: str) -> Optional[str]:
    """Extract number from Hebrew file (e.g., 'תרגיל 1', 'קובץ 2')."""
    # Pattern for Hebrew numbers after words like תרגיל, קובץ, פרק
    patterns = [
        r"תרגיל\s*(\d+)",
        r"קובץ\s*(\d+)",
        r"פרק\s*(\d+)",
        r"ch?apter[_-]?(\d+)",
        r"(\d+)[_-]",
        r"^(\d+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, filename, re.IGNORECASE)
        if match:
            num = match.group(1)
            return f"{int(num):02d}"

    return None


def extract_year_from_filename(filename: str) -> Optional[str]:
    """Extract year from filename."""
    # Look for 4-digit years (2015-2030)
    match = re.search(r"(20[1-3]\d)", filename)
    if match:
        return match.group(1)
    return None


def extract_session_from_filename(filename: str) -> Optional[str]:
    """Extract session (a/b) from filename."""
    filename_lower = filename.lower()

    # Look for מועד א or מועד ב, or 'a' / 'b'
    if "מועד ב" in filename or "b" in filename_lower:
        return "b"
    if "מועד א" in filename or "a" in filename_lower:
        return "a"

    return None


def sanitize_filename(filename: str) -> str:
    """Convert filename to kebab-case."""
    # Remove extension
    name, ext = os.path.splitext(filename)

    # Replace Hebrew characters with English equivalents (basic)
    hebrew_to_english = {
        "תרגיל": "exercise",
        "קובץ": "file",
        "פרק": "chapter",
        "מאזן": "balance",
        "רווח": "profit",
        "הפסד": "loss",
        "מלאי": "inventory",
        "רכוש": "assets",
        "קבוע": "fixed",
        "חשבונות": "accounts",
        "חתך": "cut",
        "פקודות": "entries",
        "יומן": "journal",
        "גבולות": "limits",
        "נגזרות": "derivatives",
        "רציפות": "continuity",
        "פונקציה": "function",
        "שחזור": "reconstruction",
    }

    name_lower = name.lower()
    for heb, eng in hebrew_to_english.items():
        name_lower = name_lower.replace(heb, eng)

    # Replace spaces and special chars with hyphens
    name_lower = re.sub(r"[^\w\s-]", "", name_lower)
    name_lower = re.sub(r"[\s_]+", "-", name_lower)
    name_lower = re.sub(r"-+", "-", name_lower)
    name_lower = name_lower.strip("-")

    return f"{name_lower}{ext}"


def suggest_target_folder(content_type: str, course: str = "") -> str:
    """Suggest target folder based on content type."""
    folders = {
        "lecture-slides": "lecture-slides",
        "ai-slides": "ai-slides",
        "exercises": "exercises",
        "drills": "drills",
        "exams": "exams",
        "other": "other",
    }
    return folders.get(content_type, "other")


from typing import Optional


def suggest_filename(
    filename: str, content_type: str, number: Optional[str] = None
) -> str:
    """Suggest new filename based on content type and patterns."""
    ext = os.path.splitext(filename)[1]
    base = os.path.splitext(filename)[0]
    num = number if number else "01"

    if content_type == "lecture-slides":
        if number:
            return f"lecture-{number}-{sanitize_filename(base)}{ext}"
        return f"lecture-{sanitize_filename(base)}{ext}"

    elif content_type == "exams":
        year = extract_year_from_filename(filename) or "YYYY"
        session = extract_session_from_filename(filename) or "a"

        # Check for solution, questions, american
        detail = ""
        if "solution" in base.lower() or "פתרון" in filename:
            detail = "-solution"
        elif "questions" in base.lower() or "שאלות" in filename:
            detail = "-questions"
        elif "american" in base.lower():
            detail = "-american"

        return f"exam-{year}-{session}{detail}{ext}"

    elif content_type in ["exercises", "drills"]:
        # Extract number from Hebrew or use provided
        num = number or extract_number_from_hebrew(filename) or "01"

        # Check for letter suffix (a, b, c)
        letter = ""
        match = re.search(r"[abc]$", base, re.IGNORECASE)
        if match:
            letter = match.group(1).lower()

        topic = sanitize_filename(base)
        # Remove leading numbers from topic
        topic = re.sub(r"^[\d\s-]+", "", topic)

        return f"exercise-{num}{letter}-{topic}{ext}"

    else:
        return sanitize_filename(filename)


def ask_user(prompt: str, options: Optional[list] = None) -> str:
    """Ask user for input with options."""
    if options:
        print(f"\n{prompt}")
        for i, opt in enumerate(options, 1):
            print(f"  {i}. {opt}")
        while True:
            try:
                choice = input("Enter number: ").strip()
                idx = int(choice) - 1
                if 0 <= idx < len(options):
                    return options[idx]
            except (ValueError, IndexError):
                pass
            print("Invalid choice. Try again.")
    else:
        return input(f"\n{prompt}: ").strip()


def analyze_and_organize(folder_path: str, dry_run: bool = True):
    """Main function to analyze and organize materials."""
    path = Path(folder_path)

    if not path.exists():
        print(f"Error: Folder '{folder_path}' does not exist.")
        return

    print(f"\n{'=' * 60}")
    print(f"Organizing: {folder_path}")
    print(f"{'=' * 60}\n")

    # Get all files recursively
    files = list(path.rglob("*"))
    files = [f for f in files if f.is_file()]

    if not files:
        print("No files found.")
        return

    print(f"Found {len(files)} files.\n")

    # Analyze and organize
    changes = []

    for file_path in files:
        # Skip if in root (don't move the file itself)
        if file_path.parent == path:
            continue

        filename = file_path.name
        folder_name = file_path.parent.name

        # Detect content type
        content_type = detect_content_type(filename, folder_name)

        # Extract number if present
        number = extract_number_from_hebrew(filename)

        # Ask for confirmation if uncertain
        if content_type == "other" or not number:
            content_type = ask_user(
                f"What type is '{filename}'?", list(CONTENT_PATTERNS.keys())
            )

        if content_type == "exams":
            # Check if year can be extracted
            year = extract_year_from_filename(filename)
            if not year:
                year = ask_user(
                    f"What year is '{filename}'?",
                    [
                        "2015",
                        "2018",
                        "2019",
                        "2020",
                        "2021",
                        "2022",
                        "2023",
                        "2024",
                        "2025",
                    ],
                )

            session = extract_session_from_filename(filename)
            if not session:
                session = ask_user(f"What session (a/b) is '{filename}'?", ["a", "b"])

            # Build exam filename
            detail = ""
            if "solution" in filename.lower() or "פתרון" in filename:
                detail = "-solution"
            elif "questions" in filename.lower():
                detail = "-questions"

            new_name = f"exam-{year}-{session}{detail}{file_path.suffix}"

        else:
            # Suggest filename
            new_name = suggest_filename(
                filename, content_type, number if number else "01"
            )

        # Determine target folder
        target_folder = file_path.parent
        target_path = target_folder / new_name

        # Check if rename needed
        if file_path.name != new_name:
            changes.append(
                {
                    "from": str(file_path.relative_to(path)),
                    "to": str(target_path.relative_to(path)),
                    "type": content_type,
                }
            )

    # Show changes
    print("\nProposed changes:")
    print("-" * 60)

    for change in changes:
        print(f"  {change['type']:12} | {change['from']}")
        print(f"              -> {change['to']}")
        print()

    # Confirm
    if changes:
        confirm = ask_user(
            f"Apply {len(changes)} changes?", ["Yes", "No", "Preview only"]
        )

        if confirm == "Yes":
            for change in changes:
                from_path = path / change["from"]
                to_path = path / change["to"]

                # Create target folder if needed
                to_path.parent.mkdir(parents=True, exist_ok=True)

                # Move file
                shutil.move(str(from_path), str(to_path))
                print(f"Moved: {change['from']} -> {change['to']}")

            print(f"\n✓ Applied {len(changes)} changes.")

        elif confirm == "Preview only":
            print("\nPreview mode - no changes applied.")
    else:
        print("No changes needed.")


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print(__doc__)
        print("\nExample:")
        print("  python organize_materials.py ./math/lecture-slides")
        sys.exit(1)

    folder_path = sys.argv[1]

    # Check for dry-run flag
    dry_run = "--dry-run" in sys.argv or "-n" in sys.argv

    analyze_and_organize(folder_path, dry_run=dry_run)


if __name__ == "__main__":
    main()
