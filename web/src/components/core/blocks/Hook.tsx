"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface HookProps {
    opener: string;
    question?: string;
    context?: string;
}

export const Hook: React.FC<HookProps> = ({ opener, question, context }) => {
    return (
        <div className="bg-gradient-to-r from-violet-950/20 to-indigo-950/20 border border-violet-500/15 rounded-2xl p-6 my-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-violet-500/10 p-2 rounded-lg border border-violet-500/20">
                    <Lightbulb className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-xs font-black text-violet-400 uppercase tracking-[0.2em]">פתיחה</p>
            </div>
            <div className="text-lg font-bold text-foreground/90 mb-2 markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{opener}</ReactMarkdown>
            </div>
            {question && (
                <div className="bg-violet-500/10 rounded-xl p-4 mt-3 border border-violet-500/20 markdown-content">
                    <div className="text-foreground/80 font-medium italic">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{`"${question}"`}</ReactMarkdown>
                    </div>
                </div>
            )}
            {context && (
                <div className="text-sm text-foreground/60 mt-3 markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{context}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};
