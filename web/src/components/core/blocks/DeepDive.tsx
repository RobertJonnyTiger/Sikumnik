"use client";

import React, { useState } from "react";
import { ChevronDown, Microscope } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface DeepDiveProps {
    title: string;
    sections: { title: string; content: string; example?: string }[];
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, sections }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl overflow-hidden my-4">
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
                        <Microscope className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-black text-indigo-400 uppercase tracking-wider">{title}</h4>
                </div>
            </div>

            <div className="px-6 pb-6 space-y-2">
                {sections.map((section, idx) => (
                    <div key={idx} className="border border-indigo-500/10 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-indigo-500/5 transition-colors"
                        >
                            <span className="font-bold text-foreground/80">{section.title}</span>
                            <ChevronDown
                                className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openIdx === idx && (
                            <div className="px-4 pb-4 space-y-3 animate-in fade-in-0 duration-300">
                                <div className="text-foreground/70 leading-relaxed markdown-content">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                </div>
                                {section.example && (
                                    <div className="bg-indigo-500/5 border-r-2 border-indigo-500/30 px-4 py-3 rounded-l-lg">
                                        <p className="text-xs font-bold text-indigo-400 mb-1">דוגמה</p>
                                        <div className="text-foreground/70 text-sm markdown-content">
                                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.example}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
