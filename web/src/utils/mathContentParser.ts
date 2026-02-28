import fs from 'fs';
import path from 'path';
import { Chapter, Lesson } from '@/types/math-course';

/**
 * MathContentParser
 * 
 * A strict, deterministic TypeScript utility.
 * It reads markdown input files, structures them by heading (`##`), 
 * and maps them into a strict `Chapter` scaffold ready for the AI Lecturer.
 * 
 * It DOES NOT generate content or use AI. It is strictly a skeletal builder.
 */
export class MathContentParser {

    /**
     * Parses a raw markdown string into a structured Chapter object with empty concept blocks.
     * 
     * @param chapterId - The unique ID for the chapter (e.g., "chapter-1")
     * @param chapterTitle - The display title of the chapter
     * @param rawMarkdown - The raw text content of the markdown file
     */
    public parseMarkdownToScaffold(chapterId: string, chapterTitle: string, rawMarkdown: string): Chapter {
        const lines = rawMarkdown.split('\n');
        const lessons: Lesson[] = [];

        let currentLesson: Lesson | null = null;
        let lessonCounter = 1;
        let preambleText = "";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('## ')) {
                // Save previous lesson if exists
                if (currentLesson) {
                    lessons.push(currentLesson);
                }

                // Start new lesson
                const lessonTitle = line.replace(/^##\s+/, '').trim();
                currentLesson = {
                    id: `${chapterId}-lesson-${lessonCounter++}`,
                    title: lessonTitle,
                    blocks: [] // Empty array for the Lecturer agent to fill
                };
            } else if (line.startsWith('# ')) {
                // Ignore H1 as it's usually the document title, handled by chapterTitle
                continue;
            } else if (line.length > 0 && currentLesson === null) {
                // Found content before any ## heading
                console.warn(`[WARNING] Content found before any '##' heading in ${chapterId}. Capturing as description: "${line.substring(0, 30)}..."`);
                preambleText += (preambleText ? "\n" : "") + line;
            }
        }

        // Push the final lesson
        if (currentLesson) {
            lessons.push(currentLesson);
        }

        return {
            id: chapterId,
            title: chapterTitle,
            description: preambleText, // Extracted from the preamble
            lessons: lessons
        };
    }

    /**
     * Convenience method to parse a physical markdown file from disk.
     */
    public parseFileToScaffold(filePath: string, chapterId: string, chapterTitle: string): Chapter {
        if (!fs.existsSync(filePath)) {
            throw new Error(`[MathContentParser] File not found: ${filePath}`);
        }

        const rawMarkdown = fs.readFileSync(filePath, 'utf-8');
        return this.parseMarkdownToScaffold(chapterId, chapterTitle, rawMarkdown);
    }
}
