---
name: the-librarian
description: Process lecture PDFs - extract text/tables, clean artifacts, organize into course Markdown
---

# The Librarian - PDF Knowledge Ingestion

## When to Use This Skill

Use this skill when:
- User asks to process a PDF lecture, handout, or course material
- User wants to convert PDF content to Markdown
- User mentions "ingest", "extract", or "process" with PDF files

## The Metaphor

You are **The Librarian**. Your job:
1. **Hammer** (pdfplumber) - Extract text and tables from the PDF
2. **Saw** (regex/cleaning) - Cut out bad headers, page numbers, footers
3. **Organize** - Arrange into structured Markdown for the course

## Required Tools

Install dependencies:
```bash
pip install pdfplumber pypdf pandas pytesseract pypdfium2
```

## Baseline Failures This Skill Addresses

**Without this skill, AI produces:**
- Raw text dump with no structure
- No heading hierarchy (# Title, ## Sections)
- No standard sections (Overview, Key Concepts, Exercises)
- Tables as jumbled text
- Page numbers and artifacts not removed
- No markdown formatting

**This skill ensures:**
- ✅ Proper heading structure
- ✅ Standard sections
- ✅ Table handling
- ✅ Artifact cleanup
- ✅ Markdown formatting

---

## Step 1: Analyze the PDF

Before extracting, understand the PDF structure:

```python
import pdfplumber

def analyze_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        # Check first few pages for structure
        for i, page in enumerate(pdf.pages[:3]):
            text = page.extract_text()
            print(f"\n--- Page {i+1} preview ---")
            print(text[:500] if text else "No text")
            
            # Check for tables
            tables = page.extract_tables()
            if tables:
                print(f"Found {len(tables)} table(s)")
```

## Step 2.5: OCR Fallback (For Scanned PDFs)

If standard extraction yields empty text (common in older Hebrew PDFs), use OCR with `pytesseract` and `pypdfium2`:

```python
import pytesseract
import pypdfium2 as pdfium
from PIL import Image

# Configure Tesseract path if needed (Windows example)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_with_ocr(pdf_path):
    print("Standard extraction failed. Attempting OCR...")
    full_text = ""
    
    pdf = pdfium.PdfDocument(pdf_path)
    for i, page in enumerate(pdf):
        # Render to image (scale=2 for better clarity)
        bitmap = page.render(scale=2)
        pil_image = bitmap.to_pil()
        
        # Extract Hebrew + English
        text = pytesseract.image_to_string(pil_image, lang='heb+eng')
        
        full_text += f"\n\n--- Page {i+1} (OCR) ---\n\n"
        full_text += text
        
    return full_text
```

Then integrate into `extract_text`:
```python
def extract_text(pdf_path):
    text = ""
    # Try pdfplumber first...
    # ...
    
    # Heuristic: If text is too short, try OCR
    if len(text) < 50:
        return extract_text_with_ocr(pdf_path)
        
    return text
```

## Step 2: Extract Text (FIXES: raw text dump)

Use pdfplumber - it's superior for Hebrew and complex layouts:

```python
import pdfplumber

def extract_text(pdf_path):
    full_text = ""
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            # Extract with layout tolerance for better Hebrew support
            text = page.extract_text(x_tolerance=2, y_tolerance=2)
            
            if text:
                full_text += f"\n\n--- Page {page_num} ---\n\n"
                full_text += text
    
    return full_text
```

## Step 3: Extract Tables (FIXES: tables as jumbled text)

Tables are crucial for economics lectures:

```python
import pdfplumber
import pandas as pd

def extract_tables(pdf_path):
    all_tables = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            tables = page.extract_tables()
            
            for table_idx, table in enumerate(tables):
                if table and len(table) > 1:
                    df = pd.DataFrame(table[1:], columns=table[0])
                    all_tables.append({
                        'page': page_num,
                        'table_idx': table_idx,
                        'data': df
                    })
    
    return all_tables
```

Convert tables to Markdown:
```python
def table_to_markdown(df):
    if df.empty:
        return ""
    
    header = "| " + " | ".join(str(c) for c in df.columns) + " |"
    separator = "| " + " | ".join(["---"] * len(df.columns)) + " |"
    
    rows = []
    for _, row in df.iterrows():
        rows.append("| " + " | ".join(str(v) for v in row.values) + " |")
    
    return "\n".join([header, separator] + rows)
```

## Step 4: Clean Artifacts (FIXES: page numbers, artifacts)

Apply these cleanup functions in order:

```python
import re

def clean_text(text):
    # 1. Remove page numbers (standalone numbers or "Page X" patterns)
    text = re.sub(r'^Page \d+$', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\s*$', '', text, flags=re.MULTILINE)
    
    # 2. Fix hyphenation at line breaks
    text = re.sub(r'-\n(\w)', r'\1', text)
    
    # 3. Fix multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # 4. Strip leading/trailing whitespace per line
    lines = [line.strip() for line in text.split('\n')]
    text = '\n'.join(lines)
    
    # 5. Remove empty lines at start/end
    text = text.strip()
    
    return text
```

## Step 5: Organize into Markdown (FIXES: no structure, no sections)

Output MUST have this structure:

```markdown
# {Topic Title}

## Overview
{Brief description of what this topic covers}

## Content
{Extracted and cleaned content}

## Key Concepts
- {Concept 1}
- {Concept 2}

## Tables

{Table 1 - if found}
| Col A | Col B |
|-------|-------|
| ...   | ...   |

## Exercises
1. {Exercise question from the material}
```

## Step 6: Save Output

Save to the appropriate course directory:

```python
def save_markdown(content, subject, topic):
    import os
    
    # Path: courses/<subject>/topics/<topic>.md
    output_dir = f"courses/{subject}/topics"
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = f"{output_dir}/{topic}.md"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return output_path
```

## Complete Workflow

```python
def process_lecture_pdf(pdf_path, subject, topic):
    # Step 1: Analyze
    print(f"Analyzing {pdf_path}...")
    
    # Step 2: Extract text
    text = extract_text(pdf_path)
    
    # Step 3: Extract tables
    tables = extract_tables(pdf_path)
    
    # Step 4: Clean
    text = clean_text(text)
    
    # Step 5: Organize with proper structure
    markdown = f"# {topic}\n\n"
    markdown += "## Overview\n"
    markdown += f"Content from {topic}\n\n"
    markdown += "## Content\n"
    markdown += text + "\n\n"
    
    # Add tables if found
    if tables:
        markdown += "## Tables\n\n"
        for i, tbl in enumerate(tables):
            markdown += f"### Table {i+1} (Page {tbl['page']})\n\n"
            markdown += table_to_markdown(tbl['data']) + "\n\n"
    
    # Step 6: Save
    output_path = save_markdown(markdown, subject, topic)
    print(f"Saved to {output_path}")
    
    return output_path
```

## Example Usage

```python
# Process a micro-economics lecture
process_lecture_pdf(
    pdf_path="input_materials/micro-economics/home-exercises/02_פתרון תרגיל בית 2- בניית עקומת התמורה.pdf",
    subject="micro-economics",
    topic="building-production-possibility-curve"
)
```

## Input/Output Convention

- **Input**: `input_materials/<subject>/<type>/<file>.pdf`
- **Output**: `courses/<subject>/topics/<topic>.md`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Hebrew not extracting | Use pdfplumber, not pypdf. If scanned/image, use OCR (Step 2.5). |
| Tables jumbled | Try `page.extract_tables(table_settings={})` |
| Headers not removed | Add custom regex pattern for that PDF's headers |
| Text runs together | Check for missing newlines in extraction |
| Encoding issues | Ensure UTF-8 when reading/writing files |

## Known Limitations

### Hebrew Table Extraction
pdfplumber's table extraction is imperfect with Hebrew/RTL text. Tables may appear jumbled. In such cases:
- Extract tables as raw text and format manually
- Or note in output "Table extraction requires manual review"

## Key Principles

1. **Structure first** - Always output proper markdown hierarchy
2. **Sections required** - Include Overview, Content, Tables, Exercises
3. **Clean before output** - Remove artifacts before saving
4. **Handle Hebrew** - Use pdfplumber with x_tolerance
5. **Preserve tables** - Convert to proper Markdown tables when possible
6. **Never skip tables** - Even if messy, attempt extraction and note limitations. Economics lectures depend on tables.

## Anti-Patterns - DON'T DO THESE

- ❌ "Just dump the text" - Always add structure
- ❌ "Skip tables, they're too hard" - Always attempt, note limitations
- ❌ "User can format it themselves" - Your job is to make it ready
- ❌ "Good enough" - If it doesn't have sections, it's not done
