"use client";

import React from "react";
import { Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ToneBreakProps {
    opener: string;
    content: string;
}

export const ToneBreak: React.FC<ToneBreakProps> = ({ opener, content }) => {
    return (
        <div className="bg-gradient-to-r from-orange-950/20 to-amber-950/20 border border-orange-500/15 rounded-2xl p-6 my-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                    <Coffee className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-[0.2em]">הפסקה מהפורמליות</p>
            </div>
            <div className="text-lg font-bold text-foreground mb-2 markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{opener}</ReactMarkdown>
            </div>
            <div className="text-foreground leading-relaxed markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            </div>
        </div>
    );
};
