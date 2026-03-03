"use client";

import React, { useState } from "react";
import { ChevronDown, Box, Tag, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface DeepDiveProps {
    title: string;
    sections?: { title: string; content: string; example?: string; icon?: React.ElementType }[];
    difficulty?: 'advanced' | 'graduate';
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, sections, difficulty = 'advanced' }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <div className="group bg-muted border-r-4 border-r-destructive border-y border-l border-border rounded-xl my-6 shadow-sm font-sans hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40" dir="rtl">
            <div className="p-5 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Zap className="w-5 h-5 text-destructive" />
                        <h4 className="text-lg font-bold text-foreground uppercase tracking-tight">{title}</h4>
                    </div>
                </div>
                {difficulty && (
                    <span className="bg-error-bg text-destructive text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded border border-error-border">
                        {difficulty === 'graduate' ? 'מומחה' : 'מתקדם'}
                    </span>
                )}
            </div>

            {sections && sections.length > 0 && (
                <div className="px-5 pb-5 space-y-2">
                    {sections.map((section, idx) => {
                        const isOpen = openIdx === idx;
                        const Icon = section.icon || Box;

                        const examples = section.example
                            ? section.example.split(/[,\n]/).map(ex => ex.trim()).filter(Boolean)
                            : [];

                        return (
                            <div
                                key={idx}
                                className={`border rounded-lg overflow-hidden transition-all duration-200 ${isOpen ? 'border-error-border bg-card shadow-md' : 'border-border bg-card/60 hover:bg-card'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 text-right transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${isOpen ? 'bg-error-bg border-error-border text-destructive' : 'bg-muted border-border text-muted-foreground'}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h3 className={`font-bold text-base leading-none ${isOpen ? 'text-destructive' : 'text-foreground'}`}>{section.title}</h3>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-destructive' : ''}`} />
                                </button>

                                {isOpen && (
                                    <div className="px-4 pb-4 pt-1 border-t border-border animate-in slide-in-from-top-1 duration-200">
                                        <div className="pr-11">
                                            <div className="text-sm leading-relaxed text-foreground markdown-content">
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                            </div>

                                            {examples.length > 0 && (
                                                <div className="space-y-2 mt-4">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                        <Tag className="w-3 h-3" />
                                                        דוגמאות
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {examples.map((ex, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted border border-border text-foreground"
                                                            >
                                                                {ex}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
