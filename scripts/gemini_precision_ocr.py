import os
import io
import time
import re
import argparse
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pypdf import PdfReader, PdfWriter
from pathlib import Path

load_dotenv(override=True)

PROJECT_ROOT = Path(__file__).parent.parent

# 1. Configuration
MODEL_NAME = "gemini-2.5-flash"
MAX_RETRIES = 5

def clean_content(text):
    # Remove excessive dashes (more than 10 in a row) which represent a loop or error
    text = re.sub(r'-{10,}', '---', text)
    return text

def extract_page_with_retry(client, page_data, page_num):
    prompt = f"""
    Perform high-precision OCR and extraction for PAGE {page_num} of this academic document.
    1. LANGUAGE: Hebrew (RTL).
    2. MATH: LaTeX ($...$) for formulas.
    3. TABLES: Reconstruct in simple Markdown. Do NOT use decorative dividers or excessive symbols.
    4. OUTPUT: Return only the core content.
    """
    
    for attempt in range(MAX_RETRIES):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=[
                    types.Part.from_bytes(data=page_data, mime_type="application/pdf"),
                    prompt
                ],
                config=types.GenerateContentConfig(
                    temperature=0.0,
                    max_output_tokens=4096,
                )
            )
            return clean_content(response.text)
        except Exception as e:
            error_msg = str(e).lower()
            if "429" in error_msg or "quota" in error_msg or "rate" in error_msg:
                wait_time = (2 ** attempt) * 3
                print(f"  ⚠️ Rate limit hit on page {page_num}, waiting {wait_time}s...")
            else:
                wait_time = (2 ** attempt) + 1
                print(f"  [Attempt {attempt+1}] Error on Page {page_num}: {e}")
                
            if attempt < MAX_RETRIES - 1:
                time.sleep(wait_time)
            else:
                print(f"  ❌ Page {page_num} failed after {MAX_RETRIES} attempts")
                return None

def run_pipeline():
    parser = argparse.ArgumentParser(description="Extract math curriculum PDFs using Gemini Precision OCR")
    parser.add_argument("--pdf", required=True, help="Path to the input PDF file")
    parser.add_argument("--course", required=True, choices=['math', 'micro', 'acct', 'orgbh'], help="Course name")
    parser.add_argument("--topic", required=True, help="Topic number (e.g., 03)")
    parser.add_argument("--key", help="Optional override for API key")
    
    args = parser.parse_args()
    
    api_key = args.key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ ERROR: Gemini API key not found. Set GEMINI_API_KEY in .env or pass --key.")
        sys.exit(1)
        
    pdf_path = args.pdf
    if not os.path.exists(pdf_path):
        print(f"❌ ERROR: PDF file not found at {pdf_path}")
        sys.exit(1)
        
    output_dir = PROJECT_ROOT / "input-materials" / args.course / "extracted"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f"topic-{args.topic}-extracted.md"

    client = genai.Client(api_key=api_key)
    reader = PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"--- Starting Cleaned Pipeline for {total_pages} pages ---")

    results = {}
    failed_pages = []
    success_count = 0

    for i in range(total_pages):
        page_num = i + 1
        percent = int((page_num / total_pages) * 100)
        print(f"📄 Processing page {page_num}/{total_pages} ({percent}%)...")
        writer = PdfWriter()
        writer.add_page(reader.pages[i])
        page_buffer = io.BytesIO()
        writer.write(page_buffer)
        
        content = extract_page_with_retry(client, page_buffer.getvalue(), page_num)
        
        if content:
            results[page_num] = content
            success_count += 1
            print(f"  ✅ Page {page_num} extracted successfully")
        else:
            failed_pages.append(page_num)

    print(f"💾 Writing output to {output_file}...")
    file_exists = output_file.exists()
    with open(output_file, "a" if file_exists else "w", encoding="utf-8") as f:
        if not file_exists:
            f.write(f"# Extracted Content: {args.course} Topic {args.topic}\n\n")
        else:
            f.write(f"\n\n---\n## Additional Source: {Path(pdf_path).name}\n\n")
        f.write(f"Source: {pdf_path}\nCourse: {args.course} | Topic: {args.topic}\n\n")
        for p in range(1, total_pages + 1):
            f.write(f"\n\n--- PAGE {p} ---\n\n")
            if p in results:
                f.write(results[p])
            else:
                f.write(f"\n>[PAGE {p} EXTRACTION FAILED]\n")
                
    print(f"🎉 Done! {success_count}/{total_pages} pages extracted successfully")
    
    if failed_pages:
        print(f"⚠️ Summary: The following pages failed to extract: {failed_pages}")
        fail_ratio = len(failed_pages) / total_pages
        if fail_ratio > 0.2:
            print(f"❌ ERROR: More than 20% of pages failed ({len(failed_pages)}/{total_pages}). Exiting with code 1.")
            sys.exit(1)

if __name__ == "__main__":
    run_pipeline()
