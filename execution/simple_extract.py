import os
from pypdf import PdfReader

pdf_path = r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-presentations\1 - מבוא מיקרו.pdf"
output_path = r"c:\Users\rober\AI Projects\Sikumnik\execution\micro_intro_text.txt"

print(f"Processing {pdf_path}...")

try:
    reader = PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        print(f"Extracting page {i+1}...")
        text += f"--- PAGE {i+1} ---\n"
        text += page.extract_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    
    print(f"Done! Text saved to {output_path}")

except Exception as e:
    print(f"Error: {e}")
