"use client";

import React from "react";
import { ClipboardList, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface TopicSummaryProps {
    content: string;
    keyPoints?: string[];
}

export const TopicSummary: React.FC<TopicSummaryProps> = ({ content, keyPoints }) => {
    return (
        <div className="group bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 my-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-500/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                    <ClipboardList className="w-4 h-4 text-sky-800" />
                </div>
                <h4 className="text-sm font-black text-sky-800 uppercase tracking-wider">סיכום</h4>
            </div>

            <div className="text-foreground leading-relaxed mb-4 markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            </div>

            {keyPoints && keyPoints.length > 0 && (
                <div className="space-y-2">
                    {keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                <Check className="w-3 h-3 text-sky-800" />
                            </div>
                            <p className="text-foreground text-sm leading-relaxed markdown-content">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{point}</ReactMarkdown>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
