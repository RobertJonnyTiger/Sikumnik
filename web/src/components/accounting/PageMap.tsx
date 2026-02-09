"use client";

import React from "react";
import { ArrowLeft, Clock, Map } from "lucide-react";

interface Prerequisite {
    chapterId: string;
    title: string;
    description: string;
}

interface PageMapProps {
    title: string;
    data: {
        learningObjectives: string[];
        prerequisites: Prerequisite[];
        estimatedTime: string;
    };
    currentChapter: number;
    totalChapters: number;
}

export const PageMap: React.FC<PageMapProps> = ({ title, data, currentChapter, totalChapters }) => {
    return (
        <div className="w-full mb-16">
            {/* Major H1 Title - Truth 2.0 Requirement */}
            <div className="mb-10 text-center md:text-right">
                <div className="flex items-center gap-4 mb-2 opacity-80">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest">
                        חשבונאות פיננסית • פרק {currentChapter}
                    </span>
                    <div className="h-px flex-1 bg-linear-to-l from-primary/30 to-transparent" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight transition-all duration-300 hover:tracking-tight">
                    {title}
                </h1>
            </div>

            <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-border/40 p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                {/* Subtle Glow Background */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 via-accent/50 to-primary/50 opacity-50" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-border/40">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <Map className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">מיקום נוכחי</div>
                            <div className="text-foreground font-semibold">חשבונאות &gt; יסודות &gt; פרק {currentChapter}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-background/40 p-3 rounded-xl border border-border/20">
                        <div className="text-right">
                            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">התקדמות בקורס</div>
                            <div className="text-sm font-bold text-foreground">
                                {currentChapter} / {totalChapters}
                            </div>
                        </div>
                        <div className="flex gap-1.5 px-1">
                            {Array.from({ length: totalChapters }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-3 w-1.5 rounded-full transition-all duration-500 ${i + 1 <= currentChapter
                                        ? "bg-primary shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                                        : "bg-muted/30"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Objectives */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 bg-primary rounded-full" />
                            <h3 className="text-xl font-black text-foreground">בפרק הזה נפצח:</h3>
                        </div>
                        <ul className="space-y-4 pr-2">
                            {data.learningObjectives.map((objective, idx) => (
                                <li key={idx} className="flex items-start gap-4 group/item">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors shrink-0 shadow-sm" />
                                    <span className="text-lg text-foreground/90 font-medium leading-relaxed group-hover/item:text-foreground transition-colors">
                                        {objective}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-8">
                        {data.prerequisites.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-1 bg-accent rounded-full" />
                                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">דרישות קדם</h3>
                                </div>
                                <div className="space-y-3">
                                    {data.prerequisites.map((req, idx) => (
                                        <div key={idx} className="bg-muted/20 hover:bg-muted/30 transition-colors border border-border/20 rounded-xl p-4 group/req">
                                            <div className="font-bold text-foreground group-hover/req:text-primary transition-colors">{req.title}</div>
                                            <div className="text-sm text-muted-foreground mt-1">{req.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">זמן למידה</div>
                                    <div className="text-lg font-black text-foreground">{data.estimatedTime}</div>
                                </div>
                            </div>
                            <div className="text-xs font-bold text-primary/60 border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
                                רמת קושי: בינונית
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
