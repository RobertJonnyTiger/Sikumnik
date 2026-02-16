import pdfplumber
import pandas as pd
import re
import os

def extract_text(pdf_path):
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Debug: Found {len(pdf.pages)} pages")
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text(x_tolerance=2, y_tolerance=2)
            if not text:
                # Fallback to pypdf
                try:
                    from pypdf import PdfReader
                    reader = PdfReader(pdf_path)
                    text = reader.pages[page_num-1].extract_text()
                    if text:
                        print(f"Debug: pypdf extracted {len(text)} chars from page {page_num}")
                except Exception as e:
                    print(f"Debug: pypdf failed: {e}")
            
            if text:
                full_text += f"\n\n--- Page {page_num} ---\n\n"
                full_text += text
            else:
                print(f"Debug: No text on page {page_num}")
    return full_text

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

def table_to_markdown(df):
    if df.empty: return ""
    # Handle None/NaN
    df = df.fillna('')
    columns = [str(c) if c is not None else '' for c in df.columns]
    
    header = "| " + " | ".join(columns) + " |"
    separator = "| " + " | ".join(["---"] * len(columns)) + " |"
    
    rows = []
    for _, row in df.iterrows():
        clean_row = [str(v).replace('\n', ' ') if v is not None else '' for v in row.values]
        rows.append("| " + " | ".join(clean_row) + " |")
    
    return "\n".join([header, separator] + rows)

def clean_text(text):
    # Remove page numbers
    text = re.sub(r'^Page \d+$', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\s*$', '', text, flags=re.MULTILINE)
    # Fix hyphenation
    text = re.sub(r'-\n(\w)', r'\1', text)
    # Fix multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def process_lecture_pdf(pdf_path, subject, topic):
    print(f"Processing {pdf_path}...")
    
    # Extract
    text = extract_text(pdf_path)
    tables = extract_tables(pdf_path)
    
    # Clean
    text = clean_text(text)
    
    # Organize
    markdown = f"# {topic}\n\n"
    markdown += "## Overview\n"
    markdown += f"Extracted content from {os.path.basename(pdf_path)}\n\n"
    
    markdown += "## Content\n"
    markdown += text + "\n\n"
    
    if tables:
        markdown += "## Tables\n"
        for i, tbl in enumerate(tables):
            markdown += f"\n### Table {i+1} (Page {tbl['page']})\n"
            markdown += table_to_markdown(tbl['data']) + "\n"
            
    # Save
    output_dir = f"courses/{subject}/topics"
    os.makedirs(output_dir, exist_ok=True)
    output_path = f"{output_dir}/{topic}.md"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(markdown)
        
    print(f"Saved to {output_path}")
    return output_path

if __name__ == "__main__":
    pdf_path = "input_materials/micro-economics/chapter-01/01-homework-solution-1-ppc.pdf"
    subject = "micro-economics"
    topic = "introduction-to-microeconomics"
    
    if os.path.exists(pdf_path):
        process_lecture_pdf(pdf_path, subject, topic)
    else:
        print(f"Error: File not found at {pdf_path}")
