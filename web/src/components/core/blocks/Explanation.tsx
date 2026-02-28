"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ExplanationProps {
    content: string;
    highlight?: string;
}

export const Explanation: React.FC<ExplanationProps> = ({ content, highlight }) => {
    return (
        <div className="group py-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20" dir="rtl">
            {highlight && (
                <div className="bg-blue-50 border-r-4 border-blue-600 px-4 py-3 rounded-l-lg mb-5 shadow-sm">
                    <p className="text-blue-800 font-bold italic text-sm">{highlight}</p>
                </div>
            )}
            <div className="text-lg text-slate-800 leading-[1.9] whitespace-pre-line markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            </div>
        </div>
    );
};
