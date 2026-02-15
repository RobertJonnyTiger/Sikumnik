import sys
import os
from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file using pypdf.
    """
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return None

    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        
        # Validation: Check if text is too short (likely scanned)
        if len(text.strip()) < 100:
             print("Warning: Extracted text is very short. PDF might be scanned or image-based.")
        
        return text

    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pdf_extract.py <path_to_pdf> [output_file]")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)
    
    if text:
        if len(sys.argv) >= 3:
            output_file = sys.argv[2]
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"Success: Extracted text saved to {output_file}")
        else:
            print(text)
    else:
        sys.exit(1)
