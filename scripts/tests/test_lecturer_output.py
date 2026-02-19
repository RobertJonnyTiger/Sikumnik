"""
Tests for Lecturer output validation.
Validates that the lecturer process generates valid chapter JSON.
"""

import json
import pytest
import tempfile
import os
from pathlib import Path

# Import the validator
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from validate_chapter import ChapterValidator, validate_chapter_file


class TestLecturerOutputValidation:
    """Test suite for validating lecturer-generated chapter JSON."""

    @pytest.fixture
    def validator(self):
        """Provide a fresh validator instance."""
        return ChapterValidator()

    @pytest.fixture
    def fixtures_dir(self):
        """Provide path to fixtures directory."""
        return Path(__file__).parent / "fixtures"

    def test_valid_chapter_passes_validation(self, validator, fixtures_dir):
        """A valid chapter JSON should pass validation with no errors."""
        result = validator.validate_file(fixtures_dir / "valid_chapter.json")

        assert result["valid"] is True
        assert result["error_count"] == 0

    def test_invalid_chapter_fails_validation(self, validator, fixtures_dir):
        """An invalid chapter JSON should fail validation with specific errors."""
        result = validator.validate_file(fixtures_dir / "invalid_chapter.json")

        assert result["valid"] is False
        assert result["error_count"] > 0

        # Check for specific expected errors
        error_messages = " ".join(result["errors"])

        # Missing required fields
        assert "introduction" in error_messages or "content" in error_messages

        # Invalid block type
        assert "invalid-block-type" in error_messages

        # Invalid callout variant
        assert (
            "callout" in error_messages.lower() or "variant" in error_messages.lower()
        )

    def test_missing_required_chapter_fields(self, validator):
        """Chapter missing required fields should be rejected."""
        invalid_chapter = {
            "id": "test-chapter",
            "title": "Test Chapter",
            # Missing: course, chapterNumber, totalChapters, pageMap, topics
        }

        validator.validate_chapter(invalid_chapter)

        assert len(validator.errors) > 0

        required_fields = [
            "course",
            "chapterNumber",
            "totalChapters",
            "pageMap",
            "topics",
        ]
        error_paths = [e.path for e in validator.errors]

        for field in required_fields:
            assert any(field in path for path in error_paths), (
                f"Missing error for field: {field}"
            )

    def test_invalid_block_type_detected(self, validator):
        """Invalid block types should be detected and reported."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [{"type": "unknown-block", "content": "Test"}],
                }
            ],
        }

        validator.validate_chapter(chapter)

        assert len(validator.errors) > 0
        assert any("unknown-block" in e.message for e in validator.errors)

    def test_missing_block_required_fields(self, validator):
        """Blocks missing required fields should be flagged."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [
                        {
                            "type": "definition",
                            "content": "Definition content but no term",
                            # Missing: term
                        }
                    ],
                }
            ],
        }

        validator.validate_chapter(chapter)

        assert len(validator.errors) > 0
        assert any("term" in e.message.lower() for e in validator.errors)

    def test_invalid_callout_variant(self, validator):
        """Invalid callout variants should be detected."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [
                        {
                            "type": "callout",
                            "variant": "invalid-variant",
                            "content": "Test content",
                        }
                    ],
                }
            ],
        }

        validator.validate_chapter(chapter)

        assert len(validator.errors) > 0
        assert any("variant" in e.message.lower() for e in validator.errors)

    def test_invalid_quiz_correct_index(self, validator):
        """Quiz questions with out-of-range correctIndex should be flagged."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [
                        {
                            "type": "checkpoint",
                            "questions": [
                                {
                                    "id": "q1",
                                    "question": "Test?",
                                    "options": ["A", "B", "C"],
                                    "correctIndex": 5,  # Out of range!
                                    "explanation": "Test",
                                }
                            ],
                        }
                    ],
                }
            ],
        }

        validator.validate_chapter(chapter)

        assert len(validator.errors) > 0
        assert any("correctIndex" in e.message for e in validator.errors)

    def test_guided_exercise_difficulty_range(self, validator):
        """Guided exercise difficulty outside 1-5 should generate warning."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [
                        {
                            "type": "guided-exercise",
                            "difficulty": 10,  # Out of range
                            "question": "Test question?",
                            "thinkingDirection": "Think about...",
                            "steps": [
                                {
                                    "title": "Step 1",
                                    "action": "Action",
                                    "reasoning": "Reason",
                                    "calculation": "Calc",
                                    "result": "Result",
                                }
                            ],
                            "finalAnswer": "Answer",
                        }
                    ],
                }
            ],
        }

        validator.validate_chapter(chapter)

        # Should have a warning about difficulty range
        assert any("difficulty" in w.message.lower() for w in validator.warnings)

    def test_empty_topics_warning(self, validator):
        """Empty topics array should generate a warning."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [],
        }

        validator.validate_chapter(chapter)

        assert any("empty" in w.message.lower() for w in validator.warnings)

    def test_chapter_number_positive(self, validator):
        """Chapter numbers less than 1 should generate warning."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 0,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {
                "learningObjectives": ["Test objective"],
                "estimatedTime": "30 דקות",
            },
            "topics": [{"id": "t1", "title": "Topic 1", "blocks": []}],
        }

        validator.validate_chapter(chapter)

        assert any("chapterNumber" in w.message.lower() for w in validator.warnings)

    def test_validate_from_json_string(self, validator):
        """Should be able to validate from JSON string."""
        chapter_json = json.dumps(
            {
                "id": "test",
                "course": "מיקרו-כלכלה",
                "chapterNumber": 1,
                "totalChapters": 10,
                "title": "Test",
                "pageMap": {
                    "learningObjectives": ["Test objective"],
                    "estimatedTime": "30 דקות",
                },
                "topics": [],
            },
            ensure_ascii=False,
        )

        # Parse and validate
        chapter = json.loads(chapter_json)
        validator.validate_chapter(chapter)

        # Should have warning about empty topics
        assert any("empty" in w.message.lower() for w in validator.warnings)


class TestRealWorldValidation:
    """Tests with real-world edge cases and common mistakes."""

    @pytest.fixture
    def validator(self):
        return ChapterValidator()

    def test_typo_in_field_name(self, validator):
        """Common typos in field names should be caught."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {"learningObjectives": ["Test"], "estimatedTime": "30 דקות"},
            "topics": [
                {
                    "id": "t1",
                    "title": "Topic 1",
                    "blocks": [
                        {
                            "type": "explanation",
                            "contents": "Typo: should be 'content'",  # Typo!
                        }
                    ],
                }
            ],
        }

        validator.validate_chapter(chapter)

        # Should error about missing required field 'content'
        assert len(validator.errors) > 0

    def test_numeric_string_instead_of_int(self, validator):
        """Strings instead of integers for numeric fields should be flagged."""
        chapter = {
            "id": "test",
            "course": "מיקרו-כלכלה",
            "chapterNumber": "2",  # String instead of int!
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {"learningObjectives": ["Test"], "estimatedTime": "30 דקות"},
            "topics": [],
        }

        validator.validate_chapter(chapter)

        assert any("chapterNumber" in e.message for e in validator.errors)

    def test_null_values_in_required_fields(self, validator):
        """Null values in required fields should be flagged."""
        chapter = {
            "id": "test",
            "course": None,  # Null!
            "chapterNumber": 1,
            "totalChapters": 10,
            "title": "Test",
            "pageMap": {"learningObjectives": ["Test"], "estimatedTime": "30 דקות"},
            "topics": [],
        }

        validator.validate_chapter(chapter)

        # Null is not the expected type (string)
        assert any("course" in e.message for e in validator.errors)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
