"use client";

import React from 'react';
import { BookOpen, Quote, GraduationCap } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface DefinitionProps {
    variant?: 'academic' | 'simple';
    term: string;
    definition: string;
    source?: string;
    subject?: string;
    className?: string;
}

export const Definition: React.FC<DefinitionProps> = ({
    variant = 'simple',
    term,
    definition,
    source,
    subject,
    className = ''
}) => {
    if (variant === 'academic') {
        return (
            <div className={`w-full max-w-4xl mx-auto p-2 my-6 ${className}`} dir="rtl">
                <div className="border-2 border-blue-900 shadow-md bg-background rounded-xl overflow-hidden">
                    <div className="p-4 space-y-3 pb-3 border-b border-blue-50 bg-blue-50/20">
                        <h3 className="text-2xl font-bold text-blue-900 leading-relaxed font-serif">
                            {term}
                        </h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="relative">
                            <div className="absolute top-0 right-0 opacity-10">
                                <Quote className="w-12 h-12 text-blue-900" />
                            </div>
                            <div className="relative bg-linear-to-br from-blue-600/5 to-transparent rounded-lg p-6 border-l-4 border-l-blue-800 border-y border-r border-blue-200 shadow-sm">
                                <div className="text-xl leading-relaxed text-foreground font-medium markdown-content">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{definition}</ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {(source || subject) && (
                            <div className="flex items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-100">
                                {source && (
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-8 bg-blue-800 rounded-full"></div>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {source}
                                        </p>
                                    </div>
                                )}
                                {subject && (
                                    <div className="flex items-center gap-2 mr-auto">
                                        <span className="px-3 py-1 rounded-full bg-blue-900 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5">
                                            <GraduationCap className="w-3.5 h-3.5" />
                                            {subject}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Simple variant
    return (
        <div className={`bg-white border focus:outline-none border-slate-200 border-r-2 border-r-cyan-500 rounded-lg p-4 my-4 shadow-sm flex flex-col sm:flex-row items-start gap-4 ${className}`} dir="rtl">
            <div className="bg-cyan-50 p-2.5 rounded-lg shrink-0 mt-0.5 border border-cyan-100 shadow-sm">
                <BookOpen className="w-5 h-5 text-cyan-700" />
            </div>
            <div className="flex-1 w-full relative">
                <h4 className="text-lg font-bold text-foreground mb-1.5">{term}</h4>
                <div className="text-foreground text-[15px] leading-relaxed markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{definition}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
