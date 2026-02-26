"use client";

import React from "react";
import { BookOpen, Clock, Target } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ChapterHeaderProps {
    title: string;
    course: string;
    chapterNumber: number;
    totalChapters: number;
    pageMap?: {
        learningObjectives: string[];
        prerequisites?: { chapterId: string; title: string }[];
        estimatedTime: string;
    };
    introduction?: {
        content: string;
        whyItMatters?: string;
        hook?: string;
    };
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
    title,
    course,
    chapterNumber,
    totalChapters,
    pageMap,
    introduction,
}) => {
    return (
        <header className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-900 to-slate-950">


            <div className="relative max-w-4xl mx-auto px-4 pt-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <span className="font-medium">{course}</span>
                    <span className="text-border">·</span>
                    <span>פרק {chapterNumber} מתוך {totalChapters}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-4">
                    {title}
                </h1>

                {/* Hook */}
                {introduction?.hook && (
                    <div className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mb-8 markdown-content">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{introduction.hook}</ReactMarkdown>
                    </div>
                )}

                {/* Meta Bar */}
                {pageMap && (
                    <div className="flex flex-wrap gap-4 mb-8">
                        {pageMap.estimatedTime && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg">
                                <Clock className="w-4 h-4" />
                                <span>{pageMap.estimatedTime}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg">
                            <BookOpen className="w-4 h-4" />
                            <span>{pageMap.learningObjectives.length} יעדי למידה</span>
                        </div>
                    </div>
                )}

                {/* Learning Objectives */}
                {pageMap?.learningObjectives && pageMap.learningObjectives.length > 0 && (
                    <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-sky-800 uppercase tracking-wider mb-4">
                            <Target className="w-4 h-4" />
                            מה תלמדו בפרק הזה
                        </h3>
                        <ul className="space-y-2">
                            {pageMap.learningObjectives.map((obj, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-foreground">
                                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-sky-800 text-xs font-bold flex items-center justify-center mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <div className="leading-relaxed markdown-content">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{obj}</ReactMarkdown>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Introduction Content */}
                {introduction?.content && (
                    <div className="mt-8 text-lg text-foreground leading-relaxed markdown-content">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{introduction.content}</ReactMarkdown>
                    </div>
                )}

                {introduction?.whyItMatters && (
                    <div className="mt-4 bg-primary/5 border-r-4 border-primary p-4 rounded-l-xl">
                        <p className="font-bold text-sky-800 text-sm mb-1">למה זה חשוב?</p>
                        <div className="text-foreground leading-relaxed markdown-content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{introduction.whyItMatters}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
