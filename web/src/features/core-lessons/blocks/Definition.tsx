"use client";

import React from 'react';
import { BookOpen, Quote, GraduationCap } from 'lucide-react';
import { LessonMarkdown } from "./LessonMarkdown";

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
            <div className={`w-full max-w-4xl mx-auto my-8 ${className}`} dir="rtl">
                <div className="academic-card group p-0 overflow-hidden border border-[--color-border-card]">
                    <div className="p-5 bg-primary/5 border-b border-primary/10">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground shadow-sm">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary leading-tight font-heading">
                                <LessonMarkdown>{term}</LessonMarkdown>
                            </h3>
                        </div>
                    </div>
                    <div className="p-6 relative">
                        <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                            <Quote className="w-16 h-16 text-primary" />
                        </div>
                        <div className="relative text-xl leading-relaxed text-foreground font-medium markdown-content">
                            <LessonMarkdown>{definition}</LessonMarkdown>
                        </div>

                        {(source || subject) && (
                            <div className="flex items-center justify-between gap-4 pt-6 mt-4 border-t border-border/50">
                                {source && (
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-6 bg-primary/40 rounded-full"></div>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {source}
                                        </p>
                                    </div>
                                )}
                                {subject && (
                                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground font-bold text-xs flex items-center gap-1.5 border border-secondary/20">
                                        {subject}
                                    </span>
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
        <div className={`group academic-card border-r-4 border-r-primary border border-l border-y border-token-[--color-border-card] p-5 my-6 flex flex-col sm:flex-row items-start gap-4 ${className}`} dir="rtl">
            <div className="bg-primary/10 p-2.5 rounded-lg shrink-0 border border-primary/10 shadow-sm">
                <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 w-full relative">
                <h4 className="text-lg font-bold text-foreground mb-1.5 font-heading">
                    <LessonMarkdown>{term}</LessonMarkdown>
                </h4>
                <div className="text-foreground/90 leading-relaxed markdown-content">
                    <LessonMarkdown>{definition}</LessonMarkdown>
                </div>
            </div>
        </div>
    );
};
