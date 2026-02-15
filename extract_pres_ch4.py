
import os
from pypdf import PdfReader

file_path = r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-presentations\4 - מענקים וצמיחה כלכלית.pdf"

print(f"--- Analyzing Presentation: {os.path.basename(file_path)} ---")
try:
    reader = PdfReader(file_path)
    # Print distinct pages to separate topics
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text.strip():
            print(f"\n[Slide {i+1}]")
            print(text[::-1]) # Try reversing for Hebrew legibility if needed, or just print typical
            print("-" * 20)
except Exception as e:
    print(f"Error: {e}")
