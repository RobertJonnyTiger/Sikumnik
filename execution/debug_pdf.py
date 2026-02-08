import os
import sys
from pypdf import PdfReader

# Hardcoded path to avoid shell argument issues
PDF_PATH = r"c:\Users\rober\AI Projects\Sikumnik\Accounting Course Material\01 - מבוא\‏‏‏‏חוברת עבודה חשבונאות א כלכלה וניהול - תשפו.pdf"

print(f"Checking path: {PDF_PATH}")
if not os.path.exists(PDF_PATH):
    print("ERROR: File does not exist!")
    sys.exit(1)

print("File exists. Attempting to read...")

try:
    reader = PdfReader(PDF_PATH)
    print(f"Number of pages: {len(reader.pages)}")
    
    first_page = reader.pages[0]
    text = first_page.extract_text()
    
    print("--- FIRST PAGE TEXT ---")
    print(text.encode('utf-8', errors='replace').decode('utf-8')) # Handle encoding for console
    print("-----------------------")
    
except Exception as e:
    print(f"EXCEPTION: {e}")
