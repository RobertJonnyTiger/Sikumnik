import sys
import os
# Add current directory to path so we can import local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pdf_extract import extract_text_from_pdf

# Hardcoded paths to bypass shell encoding issues
PDF_PATH = r"c:\Users\rober\AI Projects\Sikumnik\Accounting Course Material\01 - מבוא\‏‏‏‏חוברת עבודה חשבונאות א כלכלה וניהול - תשפו.pdf"
OUTPUT_PATH = r"c:\Users\rober\AI Projects\Sikumnik\output\extracted_text.txt"

print(f"Starting extraction for: {PDF_PATH}")
text = extract_text_from_pdf(PDF_PATH)

if text:
    print(f"Extraction successful. Writing {len(text)} chars to {OUTPUT_PATH}")
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done.")
else:
    print("Extraction failed (no text returned).")
