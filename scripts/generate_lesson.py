import json
import argparse
import sys
from pathlib import Path
from google import genai
from google.genai import types

PROJECT_ROOT = Path(__file__).parent.parent

def generate_lesson(course: str, topic: str, extracted_md_path: Path, api_key: str, api_key_2: str = None) -> Path:
    print("📖 Reading extracted content...")
    
    if not extracted_md_path.exists():
        print(f"❌ ERROR: Extracted markdown file not found: {extracted_md_path}")
        sys.exit(1)
        
    extracted_md = extracted_md_path.read_text(encoding="utf-8")
    
    prompt_path = PROJECT_ROOT / "web" / "src" / "prompts" / "lecturer-agent.md"
    if not prompt_path.exists():
        print(f"❌ ERROR: System prompt not found: {prompt_path}")
        sys.exit(1)
        
    system_instruction = prompt_path.read_text(encoding="utf-8")
    user_message = f"{extracted_md}\n\nGenerate a complete lesson for topic {topic}. Output only a valid JSON array of ConceptBlocks as specified in your instructions."
    
    print("🤖 Calling Gemini API...")
    
    def try_api_call(key):
        client = genai.Client(api_key=key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2, # Low temperature for more deterministic outputs
                response_mime_type="application/json", 
            )
        )
        return response.text
        
    try:
        response_text = try_api_call(api_key)
    except Exception as e:
        error_msg = str(e).lower()
        if ("429" in error_msg or "quota" in error_msg or "rate" in error_msg) and api_key_2:
            print("⚠️ Primary key rate limited, switching to fallback key...")
            try:
                response_text = try_api_call(api_key_2)
            except Exception as e2:
                raise Exception(f"API generation failed on fallback key: {e2}")
        else:
            raise Exception(f"API generation failed: {e}")
            
    # Validate JSON shape
    try:
        data = json.loads(response_text)
        if not isinstance(data, list):
            raise ValueError("Parsed JSON is not an array")
        for i, page in enumerate(data):
            if not isinstance(page, dict):
                raise ValueError(f"Page {i} is not an object")
            if "pageTitle" not in page or not isinstance(page["pageTitle"], str):
                raise ValueError(f"Page {i} missing pageTitle string")
            if "blocks" not in page or not isinstance(page["blocks"], list):
                raise ValueError(f"Page {i} missing blocks array")
            if len(page["blocks"]) == 0:
                raise ValueError(f"Page {i} has empty blocks array")
                
        print("✅ Valid JSON shape received")
    except Exception as e:
        first_chars = response_text[:200].replace('\n', '\\n')
        raise Exception(f"Invalid JSON returned from Gemini: {e}\n--- First 200 chars: {first_chars}")

    print(f"💾 Writing chapter-{topic}.json...")
    
    output_dir = PROJECT_ROOT / "web" / "src" / "data" / "chapters" / course
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / f"chapter-{topic}.json"
    output_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    
    return output_file

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate lessons strictly from extracted markdown")
    parser.add_argument("--course", required=True, choices=['math', 'micro', 'acct', 'orgbh'], help="Course name")
    parser.add_argument("--topic", required=True, help="Topic number (e.g., 03)")
    parser.add_argument("--extracted", required=True, help="Path to extracted markdown file")
    parser.add_argument("--key", required=True, help="Gemini API Key")
    parser.add_argument("--key2", help="Optional fallback Gemini API Key")
    
    args = parser.parse_args()
    
    output_path = generate_lesson(
        course=args.course, 
        topic=args.topic, 
        extracted_md_path=Path(args.extracted), 
        api_key=args.key, 
        api_key_2=args.key2
    )
    
    print(f"🎉 Successfully generated: {output_path}")
