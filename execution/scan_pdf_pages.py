import os
import time
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

def upload_and_wait(path, mime_type=None):
    print(f"Uploading {path}...")
    file = genai.upload_file(path=path, mime_type=mime_type)
    print(f"Uploaded {file.display_name} ({file.uri})")
    
    while file.state.name == "PROCESSING":
        print(".", end="", flush=True)
        time.sleep(2)
        file = genai.get_file(file.name)
        
    if file.state.name == "FAILED":
        raise ValueError(f"File processing failed: {file.state.name}")
    
    print("Ready.")
    return file

def scan_pages_for_topics():
    pdf_path = Path("input_materials/accounting/semester A notebook.pdf")
    
    if not pdf_path.exists():
        print(f"Error: {pdf_path} not found.")
        return

    print("Uploading PDF for scanning...")
    try:
        pdf_file = upload_and_wait(pdf_path, mime_type="application/pdf")
    except Exception as e:
        print(f"Upload failed: {e}")
        return

    models_to_try = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-pro-vision"
    ]
    
    prompt = """
    This is a handwritten notebook. I need you to identify the PAGE NUMBERS for "Chapter 3: Profit & Loss" (דו"ח רווח והפסד).
    
    Please scan pages 6 through 15.
    Report back:
    1. Which page does "Profit & Loss" (רווח והפסד) START? Look for a big title.
    2. Which page does it END? (Where does the next topic start?)
    3. List the titles found on each page from 6 to 15.
    
    Format:
    Page 6: [Title/Topic]
    Page 7: [Title/Topic]
    ...
    """
    
    for model_name in models_to_try:
        print(f"Trying model: {model_name}...")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content([pdf_file, prompt])
            print("\n--- SCAN RESULTS ---\n")
            print(response.text)
            print("\n--- END RESULTS ---\n")
            return # Success!
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            
    print("All models failed.")

if __name__ == "__main__":
    scan_pages_for_topics()
