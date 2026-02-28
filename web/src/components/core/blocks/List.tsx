"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ListProps {
    items: string[];
}

export const List: React.FC<ListProps> = ({ items }) => {
    return (
        <div className="group my-4 space-y-2 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};
