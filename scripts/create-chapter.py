import os
import sys
import argparse
import subprocess
from pathlib import Path
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).parent.parent

# Add scripts directory to sys.path so we can import generate_lesson
sys.path.append(str(PROJECT_ROOT / "scripts"))
from generate_lesson import generate_lesson

def get_target_files(course: str, topic: str):
    base_dir = PROJECT_ROOT / "input-materials" / course
    target_files = []
    
    # Check all subdirectories: lecture-slides, ai-slides, exercises
    subdirs = ["lecture-slides", "ai-slides", "exercises"]
    
    for subdir in subdirs:
        dir_path = base_dir / subdir
        if dir_path.exists() and dir_path.is_dir():
            for file in dir_path.glob("*.pdf"):
                # We expect the filename to contain the topic number padded, e.g., '05'
                # A simple check is if f"{topic}" is in the filename. 
                # Better check: searching exactly for the topic structure.
                # Assuming the rules defined: "lecture-{topic}-", "{topic}-", "exercise-{topic}-"
                if file.name.startswith(f"{topic}-") or f"-{topic}-" in file.name or f"lecture-{topic}-" in file.name:
                    target_files.append(file)
                    
    return target_files

def main():
    parser = argparse.ArgumentParser(description="Orchestrate Sikumnik chapter creation")
    parser.add_argument("--course", required=True, choices=['math', 'micro', 'acct', 'orgbh'], help="Course name")
    parser.add_argument("--topic", required=True, help="Topic number (e.g., 05)")
    
    args = parser.parse_args()
    course = args.course
    topic = args.topic
    
    load_dotenv(PROJECT_ROOT / ".env", override=True)
    
    api_key = os.getenv("GEMINI_API_KEY")
    api_key_2 = os.getenv("GEMINI_API_KEY_2")
    
    if not api_key and not api_key_2:
        print("❌ ERROR: Neither GEMINI_API_KEY nor GEMINI_API_KEY_2 found in .env")
        sys.exit(1)
        
    target_files = get_target_files(course, topic)
    
    if not target_files:
        print(f"❌ ERROR: No PDF files found for topic {topic} in {course} input-materials")
        sys.exit(1)
        
    print(f"📂 Found {len(target_files)} files for topic {topic}:")
    for f in target_files:
        print(f"   - {f.name}")
        
    ocr_script = PROJECT_ROOT / "scripts" / "gemini_precision_ocr.py"
    
    for pdf_file in target_files:
        print(f"\n🚀 Running OCR on {pdf_file.name}...")
        cmd = [
            sys.executable, str(ocr_script),
            "--pdf", str(pdf_file),
            "--course", course,
            "--topic", topic
        ]
        
        if api_key:
            cmd.extend(["--key", api_key])
            
        result = subprocess.run(cmd)
        if result.returncode != 0:
            print(f"⚠️ OCR failed for {pdf_file.name}, continuing...")
            
    extracted_md_path = PROJECT_ROOT / "input-materials" / course / "extracted" / f"topic-{topic}-extracted.md"
    
    if not extracted_md_path.exists():
        print(f"❌ ERROR: Extracted markdown not found at {extracted_md_path}. OCR must have produced no output.")
        sys.exit(1)
        
    print("\n🧠 Generating Lesson JSON...")
    
    try:
        output_json_path = generate_lesson(
            course=course,
            topic=topic,
            extracted_md_path=extracted_md_path,
            api_key=api_key,
            api_key_2=api_key_2
        )
    except Exception as e:
        print(f"\n❌ ERROR during lesson generation: {e}")
        sys.exit(1)
        
    source_filenames = ", ".join([f.name for f in target_files])
    
    print(f"\n🎉 Chapter {topic} created successfully!")
    print(f"📄 Source files: {source_filenames}")
    print(f"💾 Output: {output_json_path}")

if __name__ == "__main__":
    main()
