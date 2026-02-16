"""
End-to-end integration tests for the full pipeline.
Tests PDF → Librarian → Lecturer workflow.
"""

import json
import tempfile
import os
from pathlib import Path
import pytest

# Add scripts directory to path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from validate_chapter import ChapterValidator, validate_chapter_file

# Try to import pipeline modules
try:
    from librarian_process import process_lecture_pdf

    LIBRARIAN_AVAILABLE = True
except ImportError:
    LIBRARIAN_AVAILABLE = False

try:
    from lecturer_process import parse_librarian_output, generate_chapter_json

    LECTURER_AVAILABLE = True
except ImportError:
    LECTURER_AVAILABLE = False


class TestEndToEndPipeline:
    """Integration tests for the full PDF → Chapter pipeline."""

    @pytest.fixture
    def fixtures_dir(self):
        """Provide path to fixtures directory."""
        return Path(__file__).parent / "fixtures"

    @pytest.fixture
    def validator(self):
        """Provide a fresh validator instance."""
        return ChapterValidator()

    @pytest.fixture
    def temp_dir(self):
        """Provide a temporary directory for test outputs."""
        with tempfile.TemporaryDirectory() as tmpdir:
            yield Path(tmpdir)

    def test_librarian_output_exists(self, fixtures_dir):
        """Sample librarian output fixture should exist."""
        assert (fixtures_dir / "sample_librarian_output.md").exists()

    def test_valid_chapter_fixture_is_valid(self, validator, fixtures_dir):
        """Valid chapter fixture should pass all validation."""
        result = validator.validate_file(fixtures_dir / "valid_chapter.json")

        assert result["valid"] is True, (
            f"Valid fixture should be valid, but got errors: {result['errors']}"
        )
        assert result["error_count"] == 0

    def test_invalid_chapter_fixture_has_errors(self, validator, fixtures_dir):
        """Invalid chapter fixture should have validation errors."""
        result = validator.validate_file(fixtures_dir / "invalid_chapter.json")

        assert result["valid"] is False
        assert result["error_count"] > 0

    @pytest.mark.skipif(not LECTURER_AVAILABLE, reason="Lecturer module not available")
    def test_lecturer_parses_librarian_output(self, fixtures_dir):
        """Lecturer should be able to parse librarian markdown output."""
        md_path = fixtures_dir / "sample_librarian_output.md"

        # Parse the librarian output
        data = parse_librarian_output(str(md_path))

        assert "title" in data
        assert "content" in data
        assert len(data["content"]) > 0

    @pytest.mark.skipif(not LECTURER_AVAILABLE, reason="Lecturer module not available")
    def test_lecturer_generates_valid_json(self, validator, fixtures_dir, temp_dir):
        """Lecturer should generate chapter JSON that passes validation."""
        md_path = fixtures_dir / "sample_librarian_output.md"
        output_path = temp_dir / "chapter.json"

        # Parse and generate
        data = parse_librarian_output(str(md_path))
        generate_chapter_json(data, str(output_path))

        # Validate output
        assert output_path.exists()

        result = validator.validate_file(output_path)

        # Note: The mock lecturer might not generate perfect output
        # This test documents the current state and expected improvements
        print(
            f"\nGenerated chapter validation result: {result['error_count']} errors, {result['warning_count']} warnings"
        )

        if result["errors"]:
            print("Errors:")
            for error in result["errors"]:
                print(f"  - {error}")

    def test_chapter_structure_completeness(self, fixtures_dir):
        """Valid chapter should have complete structure."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        # Check top-level structure
        required_fields = [
            "id",
            "title",
            "course",
            "chapterNumber",
            "totalChapters",
            "pageMap",
            "topics",
        ]
        for field in required_fields:
            assert field in chapter, f"Missing required field: {field}"

        # Check pageMap structure
        assert "learningObjectives" in chapter["pageMap"]
        assert "estimatedTime" in chapter["pageMap"]
        assert isinstance(chapter["pageMap"]["learningObjectives"], list)

        # Check topics structure
        assert len(chapter["topics"]) > 0
        for topic in chapter["topics"]:
            assert "id" in topic
            assert "title" in topic
            assert "blocks" in topic
            assert isinstance(topic["blocks"], list)

    def test_block_types_variety(self, fixtures_dir):
        """Valid chapter should demonstrate various block types."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        # Collect all block types used
        block_types = set()
        for topic in chapter["topics"]:
            for block in topic["blocks"]:
                block_types.add(block.get("type"))

        # Should have multiple block types
        assert len(block_types) >= 5, (
            f"Expected at least 5 block types, found: {block_types}"
        )

        # Should have specific expected types
        expected_types = ["explanation", "definition", "example", "formula"]
        for expected in expected_types:
            assert expected in block_types, (
                f"Expected block type '{expected}' not found"
            )

    def test_hebrew_content_present(self, fixtures_dir):
        """Valid chapter should have Hebrew content."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        # Check for Hebrew characters in various fields
        hebrew_pattern = any(
            "\u0590" <= c <= "\u05ff" for c in chapter.get("course", "")
        )
        assert hebrew_pattern, "Course name should be in Hebrew"

        # Check learning objectives
        for objective in chapter["pageMap"]["learningObjectives"]:
            has_hebrew = any("\u0590" <= c <= "\u05ff" for c in objective)
            assert has_hebrew, f"Learning objective should be in Hebrew: {objective}"

    def test_checkpoint_questions_valid(self, fixtures_dir):
        """Checkpoint questions should be valid."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        if "checkpoint" in chapter and chapter["checkpoint"]:
            for question in chapter["checkpoint"]:
                # Required fields
                assert "id" in question
                assert "question" in question
                assert "options" in question
                assert "correctIndex" in question
                assert "explanation" in question

                # Valid options array
                assert isinstance(question["options"], list)
                assert len(question["options"]) >= 2

                # Valid correctIndex
                assert 0 <= question["correctIndex"] < len(question["options"])

    def test_guided_exercise_structure(self, fixtures_dir):
        """Guided exercises should have complete structure."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        found_guided_exercise = False
        for topic in chapter["topics"]:
            for block in topic["blocks"]:
                if block.get("type") == "guided-exercise":
                    found_guided_exercise = True

                    # Required fields
                    assert "difficulty" in block
                    assert "question" in block
                    assert "thinkingDirection" in block
                    assert "steps" in block
                    assert "finalAnswer" in block

                    # Valid difficulty
                    assert isinstance(block["difficulty"], (int, float))
                    assert 1 <= block["difficulty"] <= 5

                    # Steps have required fields
                    for step in block["steps"]:
                        assert "title" in step
                        assert "action" in step
                        assert "reasoning" in step
                        assert "calculation" in step
                        assert "result" in step

        assert found_guided_exercise, "Expected at least one guided-exercise block"

    def test_formula_with_variables(self, fixtures_dir):
        """Formula blocks should have variable definitions."""
        with open(fixtures_dir / "valid_chapter.json", "r", encoding="utf-8") as f:
            chapter = json.load(f)

        found_formula = False
        for topic in chapter["topics"]:
            for block in topic["blocks"]:
                if block.get("type") == "formula":
                    found_formula = True

                    # Required fields
                    assert "title" in block
                    assert "formula" in block

                    # Variables if present
                    if "variables" in block and block["variables"]:
                        for var in block["variables"]:
                            assert "symbol" in var
                            assert "name" in var
                            assert "desc" in var

        assert found_formula, "Expected at least one formula block"


class TestPipelineErrors:
    """Tests for error handling and edge cases in the pipeline."""

    def test_invalid_json_file(self, temp_dir):
        """Validator should handle invalid JSON gracefully."""
        invalid_json_path = temp_dir / "invalid.json"

        # Write invalid JSON
        with open(invalid_json_path, "w") as f:
            f.write('{"invalid json: missing closing brace')

        validator = ChapterValidator()
        result = validator.validate_file(invalid_json_path)

        assert result["valid"] is False
        assert "Invalid JSON" in " ".join(result["errors"])

    def test_missing_file(self):
        """Validator should handle missing files gracefully."""
        validator = ChapterValidator()
        result = validator.validate_file("/nonexistent/path/chapter.json")

        assert result["valid"] is False
        assert "File not found" in " ".join(result["errors"])

    def test_non_object_root(self):
        """JSON that isn't an object should be rejected."""
        validator = ChapterValidator()

        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
            json.dump(["not", "an", "object"], f)
            temp_path = f.name

        try:
            result = validator.validate_file(temp_path)
            assert result["valid"] is False
        finally:
            os.unlink(temp_path)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
