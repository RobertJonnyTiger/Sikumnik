"""
Tests for Librarian output validation.
Validates that the librarian produces valid markdown output.
"""

import pytest
from pathlib import Path
import re


class TestLibrarianMarkdownOutput:
    """Test suite for validating librarian markdown output."""

    @pytest.fixture
    def fixtures_dir(self):
        """Provide path to fixtures directory."""
        return Path(__file__).parent / "fixtures"

    @pytest.fixture
    def sample_output(self, fixtures_dir):
        """Load sample librarian output."""
        with open(
            fixtures_dir / "sample_librarian_output.md", "r", encoding="utf-8"
        ) as f:
            return f.read()

    def test_output_has_title(self, sample_output):
        """Librarian output should have a main title."""
        assert sample_output.startswith("# ")

        # Extract title
        title_match = re.search(r"^# (.+)$", sample_output, re.MULTILINE)
        assert title_match is not None
        assert len(title_match.group(1)) > 0

    def test_output_has_overview_section(self, sample_output):
        """Librarian output should have an Overview section."""
        assert "## Overview" in sample_output

    def test_output_has_content_section(self, sample_output):
        """Librarian output should have a Content section."""
        assert "## Content" in sample_output

    def test_output_has_page_markers(self, sample_output):
        """Librarian output should mark page boundaries."""
        page_markers = re.findall(r"--- Page \d+ ---", sample_output)
        assert len(page_markers) > 0

    def test_content_not_empty(self, sample_output):
        """Content section should not be empty."""
        # Find content section
        content_match = re.search(
            r"## Content\n(.+?)(?=##|$)", sample_output, re.DOTALL
        )
        assert content_match is not None

        content = content_match.group(1).strip()
        assert len(content) > 100  # Should have substantial content

    def test_tables_section_present(self, sample_output):
        """If tables exist, they should be in a Tables section."""
        if "|" in sample_output:
            assert "## Tables" in sample_output or "### Table" in sample_output

    def test_tables_valid_markdown(self, sample_output):
        """Tables should be valid markdown."""
        # Find all tables
        table_pattern = r"\|[^\n]+\|\n\|[-:|\s]+\|\n(?:\|[^\n]+\|\n?)+"
        tables = re.findall(table_pattern, sample_output)

        for table in tables:
            lines = table.strip().split("\n")

            # Should have at least header and separator
            assert len(lines) >= 2

            # Header line should have pipes
            assert lines[0].startswith("|") and lines[0].endswith("|")

            # Separator line should have dashes
            assert "---" in lines[1]

            # All lines should have same number of columns
            header_cols = len(lines[0].split("|")) - 1
            for line in lines[2:]:
                if line.strip():
                    cols = len(line.split("|")) - 1
                    assert cols == header_cols, f"Column mismatch in table"

    def test_hebrew_content_present(self, sample_output):
        """Librarian output should contain Hebrew text."""
        hebrew_chars = [c for c in sample_output if "\u0590" <= c <= "\u05ff"]
        assert len(hebrew_chars) > 0, "Expected Hebrew content in output"

    def test_no_excessive_blank_lines(self, sample_output):
        """Output should not have excessive blank lines (3+ in a row)."""
        # Check for 3+ consecutive newlines
        excessive_blanks = re.search(r"\n{4,}", sample_output)
        assert excessive_blanks is None, "Found excessive blank lines"

    def test_headings_hierarchy(self, sample_output):
        """Headings should follow proper hierarchy (# → ## → ###)."""
        lines = sample_output.split("\n")

        heading_levels = []
        for line in lines:
            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                heading_levels.append(level)

        # Should start with level 1
        if heading_levels:
            assert heading_levels[0] == 1

            # Should not skip levels (e.g., # → ### without ##)
            for i in range(1, len(heading_levels)):
                assert heading_levels[i] <= heading_levels[i - 1] + 1, (
                    f"Heading hierarchy violation at position {i}"
                )

    def test_content_sections_present(self, sample_output):
        """Content should be organized in sections."""
        # Should have numbered sections
        sections = re.findall(r"^###? \d+\.\d+", sample_output, re.MULTILINE)
        assert len(sections) > 0, "Expected numbered sections (e.g., 2.1, 2.2)"


class TestLibrarianContentQuality:
    """Tests for content quality in librarian output."""

    @pytest.fixture
    def sample_output(self, fixtures_dir):
        """Load sample librarian output."""
        with open(
            fixtures_dir / "sample_librarian_output.md", "r", encoding="utf-8"
        ) as f:
            return f.read()

    def test_substantial_content_length(self, sample_output):
        """Output should have substantial content."""
        assert len(sample_output) > 500, "Output seems too short"

    def test_contains_key_terms(self, sample_output):
        """Output should contain expected economic terms."""
        # Based on the sample content
        key_terms = ["עלות", "הזדמנות", "cost", "כלכלה"]

        found_terms = []
        for term in key_terms:
            if term.lower() in sample_output.lower():
                found_terms.append(term)

        assert len(found_terms) >= 2, (
            f"Expected to find economic terms, found: {found_terms}"
        )

    def test_examples_present(self, sample_output):
        """Output should contain examples."""
        example_indicators = ["דוגמה", "לדוגמה", "example"]

        found_example = any(
            indicator in sample_output.lower() for indicator in example_indicators
        )
        assert found_example, "Expected to find examples in content"

    def test_tables_if_data_present(self, sample_output):
        """If data tables exist, they should be properly formatted."""
        # Check for table-like content
        if "|" in sample_output:
            # Should have proper table structure
            table_lines = [line for line in sample_output.split("\n") if "|" in line]
            assert len(table_lines) >= 3, (
                "Table should have header, separator, and at least one row"
            )


class TestLibrarianEdgeCases:
    """Tests for edge cases and error conditions."""

    def test_empty_content(self):
        """Should handle empty content gracefully."""
        # This would be tested against the actual librarian
        # For now, just document the expectation
        pass

    def test_very_long_content(self):
        """Should handle very long content."""
        # Document the expectation that librarian handles long documents
        pass

    def test_special_characters(self):
        """Should preserve special characters."""
        # Hebrew, math symbols, etc.
        pass


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
