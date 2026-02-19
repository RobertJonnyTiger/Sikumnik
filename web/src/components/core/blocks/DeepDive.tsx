"use client";

import React, { useState } from "react";
import { ChevronDown, Box, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface DeepDiveProps {
    title: string;
    sections?: { title: string; content: string; example?: string; icon?: React.ElementType }[];
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, sections }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const accentColors = ["#DC2626", "#D97706", "#059669", "#2563EB", "#7C3AED"];

    return (
        <div className="bg-[#0b0f1a] border border-[#1e293b] rounded-2xl overflow-hidden my-6" dir="rtl">
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                    <div className="border-r-4 border-orange-500 pr-3">
                        <h4 className="text-xl font-bold text-orange-500 uppercase tracking-tight">{title}</h4>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 space-y-3">
                {sections?.map((section, idx) => {
                    const color = accentColors[idx % accentColors.length];
                    const isOpen = openIdx === idx;
                    const Icon = section.icon || Box;

                    // Split examples by comma or newline if they exist
                    const examples = section.example
                        ? section.example.split(/[,\n]/).map(ex => ex.trim()).filter(Boolean)
                        : [];

                    return (
                        <div
                            key={idx}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-orange-500/40 bg-[#16213e]/40 shadow-xl' : 'border-[#1e293b] bg-[#16213e]/20 hover:bg-[#16213e]/30'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIdx(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between p-5 text-right transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                                        style={{
                                            backgroundColor: `${color}15`,
                                            borderColor: `${color}30`,
                                            color: color
                                        }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-lg text-white/90 leading-tight">{section.title}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border"
                                        style={{
                                            backgroundColor: `${color}05`,
                                            borderColor: `${color}20`,
                                            color: color
                                        }}
                                    >
                                        {idx + 1}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-5 pb-6 pt-2 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                                    <div className="pr-14">
                                        <div className="text-base leading-relaxed text-[#cbd5e1] markdown-content">
                                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                        </div>

                                        {examples.length > 0 && (
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <Tag className="w-3 h-3" />
                                                    דוגמאות
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {examples.map((ex, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-[#cbd5e1] hover:bg-white/10 transition-colors"
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
        </div>
    );
};
