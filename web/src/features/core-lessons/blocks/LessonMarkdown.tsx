"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

interface LessonMarkdownProps {
    children: string;
    className?: string;
}

/**
 * Enhanced Markdown renderer that handles RTL/LTR switching for math.
 * Standardizes KaTeX rendering across the platform.
 */
export const LessonMarkdown: React.FC<LessonMarkdownProps> = ({ children, className }) => {
    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
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
                {children}
            </ReactMarkdown>
        </div>
    );
};
