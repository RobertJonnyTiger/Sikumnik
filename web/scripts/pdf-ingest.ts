import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createWorker } from 'tesseract.js';

const RAW_DIR = path.join(process.cwd(), 'src/data/microeconomics/exams/raw');
const PROCESSED_DIR = path.join(process.cwd(), 'src/data/microeconomics/exams/processed');

interface ExtractionResult {
  filename: string;
  method: 'pdftotext' | 'tesseract';
  success: boolean;
  text: string;
  error?: string;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function cleanText(text: string): string {
  return text
    .replace(/[\u202A-\u202E]/g, '')
    .replace(/[\u200E-\u200F]/g, '')
    .trim();
}

function isHebrewGarbled(text: string): boolean {
  const sample = text.slice(0, 500);
  const garbagePatterns = [
    /~20L\//,
    /\/\d+-\d+/,
    /[¬¬¬]+/,
    /[A-Za-z0-9]{20,}/,
  ];
  
  const hebrewChars = /[\u0590-\u05FF]/;
  const hasHebrew = hebrewChars.test(sample);
  const hasGarbage = garbagePatterns.some(p => p.test(sample));
  
  return !hasHebrew && hasGarbage && sample.length > 100;
}

async function extractWithPdftotext(pdfPath: string): Promise<string | null> {
  const encodings = ['UTF-8', 'ISO-8859-8'];
  
  for (const encoding of encodings) {
    try {
      const result = execSync(`pdftotext -enc ${encoding} "${pdfPath}" -`, { 
        encoding: 'utf-8',
        timeout: 30000,
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      
      if (result && result.length > 100 && !isHebrewGarbled(result)) {
        return result;
      }
    } catch (e) {
      continue;
    }
  }
  
  return null;
}

async function extractWithTesseract(pdfPath: string): Promise<string> {
  console.log('  Using Tesseract OCR (this may take a while...)');
  console.log('  First run will download Hebrew language pack (~20MB)...');
  
  const worker = await createWorker('heb', 1, {
    logger: m => {
      if (m.status === 'recognizing text') {
        process.stdout.write(`\r  OCR Progress: ${Math.round(m.progress * 100)}%`);
      }
    }
  });
  
  const { data: { text } } = await worker.recognize(pdfPath);
  
  await worker.terminate();
  console.log('\r  OCR complete!');
  
  return text;
}

async function extractPdf(pdfPath: string): Promise<ExtractionResult> {
  const filename = path.basename(pdfPath, '.pdf');
  const outputPath = path.join(PROCESSED_DIR, `${filename}.txt`);
  
  console.log(`\n📄 Processing: ${filename}.pdf`);
  
  try {
    console.log('  Trying pdftotext (fast method)...');
    let text = await extractWithPdftotext(pdfPath);
    
    if (!text || isHebrewGarbled(text)) {
      console.log('  pdftotext returned garbled text, falling back to OCR...');
      text = await extractWithTesseract(pdfPath);
      text = cleanText(text);
      
      fs.writeFileSync(outputPath, text, 'utf-8');
      console.log(`  ✅ Saved OCR output to: ${filename}.txt`);
      
      return {
        filename,
        method: 'tesseract',
        success: true,
        text,
      };
    }
    
    text = cleanText(text);
    fs.writeFileSync(outputPath, text, 'utf-8');
    console.log(`  ✅ Saved to: ${filename}.txt`);
    
    return {
      filename,
      method: 'pdftotext',
      success: true,
      text,
    };
    
  } catch (error: any) {
    console.error(`  ❌ Error: ${error.message}`);
    return {
      filename,
      method: 'pdftotext',
      success: false,
      text: '',
      error: error.message,
    };
  }
}

async function main() {
  ensureDir(PROCESSED_DIR);
  
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    const input = args[0];
    const pdfPath = input.endsWith('.pdf') 
      ? path.join(RAW_DIR, input)
      : path.join(RAW_DIR, `${input}.pdf`);
    
    if (!fs.existsSync(pdfPath)) {
      console.error(`❌ File not found: ${pdfPath}`);
      process.exit(1);
    }
    
    await extractPdf(pdfPath);
  } else {
    if (!fs.existsSync(RAW_DIR)) {
      console.error(`❌ Raw directory not found: ${RAW_DIR}`);
      process.exit(1);
    }
    
    const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.pdf'));
    
    if (files.length === 0) {
      console.log('No PDF files found in raw folder.');
      process.exit(0);
    }
    
    console.log(`Found ${files.length} PDF file(s) to process.\n`);
    
    const results: ExtractionResult[] = [];
    for (const file of files) {
      const result = await extractPdf(path.join(RAW_DIR, file));
      results.push(result);
    }
    
    console.log('\n--- Summary ---');
    results.forEach(r => {
      console.log(`${r.success ? '✅' : '❌'} ${r.filename}.pdf -> ${r.method} ${r.success ? '✓' : `(${r.error})`}`);
    });
  }
}

main().catch(console.error);
