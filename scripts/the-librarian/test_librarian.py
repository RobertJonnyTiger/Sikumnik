import pytest
import re


def clean_text(text):
    """Clean extracted PDF text - implementation for testing."""
    # 1. Remove page numbers (standalone numbers or "Page X" patterns)
    text = re.sub(r"^Page \d+$", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\s*$", "", text, flags=re.MULTILINE)

    # 2. Fix hyphenation at line breaks
    text = re.sub(r"-\n(\w)", r"\1", text)

    # 3. Fix multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # 4. Strip leading/trailing whitespace per line
    lines = [line.strip() for line in text.split("\n")]
    text = "\n".join(lines)

    # 5. Remove empty lines at start/end
    text = text.strip()

    return text


def table_to_markdown(headers, rows):
    """Convert table data to markdown - implementation for testing."""
    if not headers or not rows:
        return ""

    header = "| " + " | ".join(str(h) for h in headers) + " |"
    separator = "| " + " | ".join(["---"] * len(headers)) + " |"

    markdown_rows = []
    for row in rows:
        markdown_rows.append("| " + " | ".join(str(v) for v in row) + " |")

    return "\n".join([header, separator] + markdown_rows)


# === TDD TESTS ===


class TestCleanText:
    """Tests for PDF text cleanup."""

    def test_removes_standalone_page_numbers(self):
        """Should remove lines that are just page numbers."""
        text = "Some content\n\n5\n\nMore content"
        result = clean_text(text)
        assert "5" not in result
        assert "Some content" in result
        assert "More content" in result

    def test_removes_page_x_pattern(self):
        """Should remove 'Page X' style page numbers."""
        text = "Content here\nPage 1\nMore content"
        result = clean_text(text)
        assert "Page 1" not in result
        assert "Content here" in result

    def test_fixes_hyphenation(self):
        """Should join hyphenated words across lines."""
        text = "This is a con-\ntinuous word here"
        result = clean_text(text)
        assert "continuous" in result
        assert "con-\n" not in result

    def test_compresses_multiple_blank_lines(self):
        """Should reduce 3+ blank lines to 2."""
        text = "Line 1\n\n\n\nLine 2"
        result = clean_text(text)
        assert "\n\n\n" not in result
        assert "Line 1" in result
        assert "Line 2" in result

    def test_strips_whitespace_per_line(self):
        """Should remove leading/trailing whitespace from each line."""
        text = "  Content here  \n  More content  "
        result = clean_text(text)
        for line in result.split("\n"):
            assert line == line.strip()

    def test_removes_empty_lines_at_boundaries(self):
        """Should remove empty lines at start and end."""
        text = "\n\nContent\n\n"
        result = clean_text(text)
        assert result.startswith("Content")

    def test_preserves_hebrew_text(self):
        """Should preserve Hebrew characters."""
        text = "תוכן בעברית\nעוד תוכן"
        result = clean_text(text)
        assert "תוכן בעברית" in result
        assert "עוד תוכן" in result


class TestTableToMarkdown:
    """Tests for table conversion."""

    def test_creates_valid_markdown_table(self):
        """Should create valid markdown table structure."""
        headers = ["Name", "Age"]
        rows = [["Alice", "30"], ["Bob", "25"]]

        result = table_to_markdown(headers, rows)

        assert "| Name | Age |" in result
        assert "| --- | --- |" in result
        assert "| Alice | 30 |" in result
        assert "| Bob | 25 |" in result

    def test_handles_empty_table(self):
        """Should return empty string for empty table."""
        result = table_to_markdown([], [])
        assert result == ""

    def test_handles_single_row(self):
        """Should handle table with just header and one row."""
        headers = ["Value"]
        rows = [["100"]]

        result = table_to_markdown(headers, rows)

        assert "| Value |" in result
        assert "| 100 |" in result


# === RUN TESTS ===
if __name__ == "__main__":
    pytest.main([__file__, "-v"])
