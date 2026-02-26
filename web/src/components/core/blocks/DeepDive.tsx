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
        <div className="bg-slate-50 border-r-4 border-r-red-600 border-y border-l border-slate-200 rounded-xl my-6 shadow-sm font-sans" dir="rtl">
            <div className="p-5 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Zap className="w-5 h-5 text-red-600" />
                        <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight">{title}</h4>
                    </div>
                </div>
                {difficulty && (
                    <span className="bg-red-100 text-red-700 text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded border border-red-200">
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
                                className={`border rounded-lg overflow-hidden transition-all duration-200 ${isOpen ? 'border-red-200 bg-white shadow-md' : 'border-slate-200 bg-white/60 hover:bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 text-right transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${isOpen ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h3 className={`font-bold text-base leading-none ${isOpen ? 'text-red-700' : 'text-slate-700'}`}>{section.title}</h3>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
                                </button>

                                {isOpen && (
                                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 animate-in slide-in-from-top-1 duration-200">
                                        <div className="pr-11">
                                            <div className="text-sm leading-relaxed text-slate-600 markdown-content">
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                            </div>

                                            {examples.length > 0 && (
                                                <div className="space-y-2 mt-4">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <Tag className="w-3 h-3" />
                                                        דוגמאות
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {examples.map((ex, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 border border-slate-200 text-slate-600"
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
