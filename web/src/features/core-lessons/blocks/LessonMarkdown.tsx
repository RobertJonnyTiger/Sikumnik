"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import "katex/dist/katex.min.css";

interface LessonMarkdownProps {
    children: string;
    className?: string;
}

/**
 * Pre-processor for LessonMarkdown.
 *
 * RULES:
 * 1. Normalize escape sequences  → real newlines.
 * 2. Hebrew list-markers (א. , ב. …) that appear MID-PARAGRAPH get a real
 *    newline prepended — but ONLY when the pattern is "space + letter + period + space"
 *    (i.e. a genuine list item).  We must NOT touch word-endings like
 *    "בשיטה." or "מכאן." — these contain a Hebrew letter+period but NO space after.
 */
const preprocessContent = (content: string): string => {
    if (!content || typeof content !== 'string') return "";

    // Step 1 — normalize escape sequences to real newlines
    let processed = content
        .replace(/\\ /g, '\n')   // LaTeX line-break "\\ " → newline
        .replace(/\\n/g, '\n');  // literal string "\\n"  → newline

    // Step 2 — inject newlines before Hebrew list-markers that are embedded mid-paragraph.
    //
    // A list marker looks like:  "…word  ב. next item…"
    //                                   ^^^^
    //                          preceded by space, followed by space
    //
    // We require:
    //   - A space/tab BEFORE  the letter (so "בשיטה." is not matched — 'ט' is mid-word)
    //   - A space AFTER  "letter." (so a sentence-ending "…בשיטה." is not matched)
    //
    // Regex:  ([ \t])([אבגדהוזחטי]\. )
    //   group 1 = the preceding whitespace (preserved)
    //   group 2 = the list marker + its trailing space (kept on new line)
    const hebrewListMarker = /(?<!\n)([ \t])([אבגדהוזחטי]\. )/g;
    processed = processed.replace(hebrewListMarker, '\n$2');

    return processed.trim();
};

export const LessonMarkdown: React.FC<LessonMarkdownProps> = ({ children, className }) => {
    // Defensive guard: KaTeX and ReactMarkdown expect strings.
    // If children is not a string (e.g. null from AI), provide fallback.
    const safeContent = typeof children === 'string' ? children : "";
    const processed = preprocessContent(safeContent);

    return (
        <div className={`lesson-content ${className || ""}`} dir="rtl">
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkBreaks]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                    // Wrap math spans in dir="ltr" to fix RTL directionality issues (e.g., flipped equations)
                    span: ({ node, ...props }) => {
                        const isMath = props.className?.includes("katex");
                        return <span {...props} dir={isMath ? "ltr" : undefined} />;
                    },
                    div: ({ node, ...props }) => {
                        const isMath = props.className?.includes("katex");
                        return <div {...props} dir={isMath ? "ltr" : undefined} />;
                    },
                    // Ensure paragraphs maintain RTL for Hebrew content
                    p: ({ node, ...props }) => <p {...props} className="mb-4 last:mb-0" />,
                }}
            >
                {processed}
            </ReactMarkdown>
        </div>
    );
};
