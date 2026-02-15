import zipfile
import re
import sys
from pathlib import Path

def get_docx_text(path):
    try:
        with zipfile.ZipFile(path) as document:
            xml_content = document.read('word/document.xml').decode('utf-8')
            # Very basic XML parsing to get text
            text = re.sub('<[^<]+?>', '', xml_content)
            return text
    except Exception as e:
        return f"Error reading DOCX: {e}"

if __name__ == "__main__":
    path = "input_materials/accounting/03 - דוח רווח והפסד/‏‏תרגיל 2 - דוח רווח והפסד.docx"
    print(get_docx_text(path))
