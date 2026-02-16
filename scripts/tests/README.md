# Sikumnik Schema Validation & Testing

Comprehensive validation and testing system for the Sikumnik chapter pipeline.

## Quick Start

### Validate a Single Chapter

```bash
# From project root
python scripts/validate_chapter.py scripts/tests/fixtures/valid_chapter.json

# Or from scripts directory
cd scripts
python validate_chapter.py tests/fixtures/valid_chapter.json
```

### Validate All Chapters in a Directory

```bash
# Validate all JSON files in a directory
python scripts/validate_chapter.py courses/ --directory

# With specific pattern
python scripts/validate_chapter.py courses/ --directory --pattern "chapter*.json"
```

### Run All Tests

```bash
# Install pytest first
pip install pytest

# Run all tests
python -m pytest scripts/tests/ -v

# Run specific test files
python -m pytest scripts/tests/test_lecturer_output.py -v
python -m pytest scripts/tests/test_librarian_output.py -v
python -m pytest scripts/tests/test_end_to_end.py -v
```

## Files Overview

### `validate_chapter.py`
**Purpose:** CLI tool and Python module for validating chapter JSON against the schema.

**Features:**
- Validates required fields: `id`, `title`, `course`, `chapterNumber`, `totalChapters`, `pageMap`, `topics`
- Validates all 16 block types with their specific required fields
- Detects common errors: invalid block types, missing fields, wrong types
- Validates quiz questions (correctIndex bounds checking)
- Validates guided exercises (difficulty range 1-5)
- Hebrew content validation (optional strict mode)
- Can be used as CLI tool or imported as Python module

**CLI Options:**
```bash
python validate_chapter.py <file>                    # Validate single file
python validate_chapter.py <dir> --directory         # Validate all files in directory
python validate_chapter.py <file> --strict-hebrew    # Enable Hebrew validation
python validate_chapter.py <file> --json             # Output results as JSON
python validate_chapter.py <file> --quiet            # Only show errors
```

**Python API:**
```python
from scripts.validate_chapter import ChapterValidator, validate_chapter_file

# Quick validation
result = validate_chapter_file("chapter.json")
print(f"Valid: {result['valid']}")
print(f"Errors: {result['errors']}")

# Detailed validation
validator = ChapterValidator(strict_hebrew=True)
result = validator.validate_file("chapter.json")
validator.print_report(result)
```

### Test Files

#### `test_lecturer_output.py`
Tests for validating lecturer-generated chapter JSON.

**Key Tests:**
- `test_valid_chapter_passes_validation` - Valid chapters pass
- `test_invalid_chapter_fails_validation` - Invalid chapters fail with specific errors
- `test_missing_required_chapter_fields` - Detects missing fields
- `test_invalid_block_type_detected` - Catches unknown block types
- `test_invalid_callout_variant` - Validates callout variants
- `test_invalid_quiz_correct_index` - Detects out-of-range correct answers
- `test_guided_exercise_difficulty_range` - Warns about difficulty outside 1-5

#### `test_librarian_output.py`
Tests for validating librarian markdown output.

**Key Tests:**
- `test_output_has_title` - Has main title
- `test_output_has_page_markers` - Marks page boundaries
- `test_tables_valid_markdown` - Tables are valid markdown
- `test_hebrew_content_present` - Contains Hebrew text
- `test_headings_hierarchy` - Proper heading hierarchy
- `test_substantial_content_length` - Not empty/short

#### `test_end_to_end.py`
Integration tests for the full PDF → Librarian → Lecturer pipeline.

**Key Tests:**
- `test_librarian_output_exists` - Fixtures available
- `test_chapter_structure_completeness` - All required fields present
- `test_block_types_variety` - Multiple block types demonstrated
- `test_hebrew_content_present` - Hebrew content validated
- `test_checkpoint_questions_valid` - Quiz questions valid
- `test_guided_exercise_structure` - Exercises complete
- `test_formula_with_variables` - Formulas properly defined

### Fixture Files

#### `valid_chapter.json`
A complete, valid chapter demonstrating all block types and features:
- 3 topics with multiple content blocks
- All major block types: definition, example, explanation, formula, guided-exercise, common-mistake, checkpoint, callout
- Complete guided exercise with steps and phases
- Quiz questions with valid structure
- Quick reference section
- Bridge to next chapter
- Navigation links

#### `invalid_chapter.json`
A deliberately broken chapter for testing error detection:
- Missing required fields (`introduction.content`, `bridge.nextChapter`)
- Invalid block type (`invalid-block-type`)
- Missing block fields (`definition` missing `term`)
- Invalid callout variant (`invalid-variant`)
- Wrong types (string instead of int for chapterNumber)
- Out-of-range values (difficulty: 8)
- Unknown fields (`unknownField`)

#### `sample_librarian_output.md`
Sample markdown output from the librarian:
- Hebrew and English content
- Page markers (--- Page X ---)
- Tables in markdown format
- Section hierarchy
- Content extracted from PDF structure

## Validation Rules

### Chapter Level (Required)
- `id`: String (unique identifier)
- `title`: String (chapter title, should be Hebrew)
- `course`: String (course name, should be Hebrew)
- `chapterNumber`: Integer >= 1
- `totalChapters`: Integer >= 1
- `pageMap`: Object with `learningObjectives` (array) and optionally `estimatedTime`
- `topics`: Array of topic objects

### Topic Level (Required)
- `id`: String (unique within chapter)
- `title`: String (topic title)
- `blocks`: Array of content blocks

### Block Types (Required fields vary by type)

| Block Type | Required Fields |
|------------|----------------|
| `explanation` | `content` |
| `definition` | `term`, `content` |
| `formula` | `title`, `formula` |
| `example` | `title`, `scenario`, `solution` |
| `guided-exercise` | `difficulty` (1-5), `question`, `thinkingDirection`, `steps`, `finalAnswer` |
| `checkpoint` | `questions` |
| `callout` | `variant` (tip/warning/note), `content` |
| `common-mistake` | `mistake`, `correct`, `why` |
| And 8 more... | See schema for full list |

## Error Severity

### Errors (❌) - Validation Fails
- Missing required fields
- Wrong data types
- Invalid block types
- Invalid enum values (callout variant, phase type)
- Out-of-range array indices (quiz correctIndex)
- Invalid JSON syntax

### Warnings (⚠️) - Validation Passes
- Unknown fields (might be extra fields)
- Empty arrays (topics, blocks, sections)
- Values outside recommended ranges (difficulty > 5)
- chapterNumber < 1
- No Hebrew content (when strict mode enabled)

## Running Tests

### Install Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install pytest
pip install pytest
```

### Run Tests

```bash
# All tests
pytest scripts/tests/ -v

# With coverage
pip install pytest-cov
pytest scripts/tests/ -v --cov=scripts

# Specific test
pytest scripts/tests/test_lecturer_output.py::TestLecturerOutputValidation::test_valid_chapter_passes_validation -v

# Stop on first failure
pytest scripts/tests/ -v -x
```

### Expected Test Results

```
scripts/tests/test_lecturer_output.py ........... [ 50%]
scripts/tests/test_librarian_output.py .........  [ 80%]
scripts/tests/test_end_to_end.py .......         [100%]

========================= 27 passed in 0.5s =========================
```

## Integration with CI/CD

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "Validating chapter JSON files..."

# Find all modified JSON files
files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.json$')

if [ -n "$files" ]; then
    for file in $files; do
        echo "Validating $file..."
        python scripts/validate_chapter.py "$file" --quiet || exit 1
    done
fi

echo "All validations passed!"
```

### GitHub Actions

```yaml
name: Validate Chapters

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: pip install pytest
      
      - name: Validate all chapters
        run: |
          python scripts/validate_chapter.py courses/ --directory
      
      - name: Run tests
        run: |
          pytest scripts/tests/ -v
```

## Common Issues

### "Invalid JSON" Error
```bash
# Check JSON syntax
python -m json.tool chapter.json

# Or use jq if available
jq . chapter.json
```

### "Missing required field" Error
Check that all required fields from the schema are present:
- Chapter level: id, title, course, chapterNumber, totalChapters, pageMap, topics
- Block level: varies by block type (see table above)

### "Unknown field" Warning
The validator warns about fields not in the schema. These might be:
- Typos (e.g., `contents` instead of `content`)
- Extra fields that should be removed
- New fields that need to be added to the schema

### Hebrew Content Not Detected
If you're using Hebrew content but getting warnings:
1. Check that Hebrew characters are actually present (U+0590 to U+05FF)
2. Verify file encoding is UTF-8
3. The validator only checks specific fields (title, course, etc.)

## Adding New Tests

1. Create test file in `scripts/tests/`
2. Import pytest and fixtures
3. Add tests as class methods
4. Run with `pytest scripts/tests/test_new.py -v`

Example:
```python
import pytest
from pathlib import Path

def test_new_feature():
    """Test description."""
    assert True
```

## Contributing

When modifying the schema:
1. Update `validate_chapter.py` with new validation rules
2. Update `valid_chapter.json` fixture with examples
3. Add tests to `test_lecturer_output.py`
4. Run full test suite
5. Update this README

## Schema Reference

See `web/src/types/chapter.ts` for the authoritative TypeScript schema definition.
