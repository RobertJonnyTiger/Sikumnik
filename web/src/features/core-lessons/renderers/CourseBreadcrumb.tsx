"use client";

import * as React from "react";
import { ChevronLeft, BookOpen } from "lucide-react";

interface CourseBreadcrumbProps {
    courseName?: string;
    chapterTitle: string;
    currentTabTitle?: string;
    currentTabIndex?: number; // 1-based index for display, or simple calculation
    totalTabs?: number;
}

export const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({
    courseName,
    chapterTitle,
    currentTabTitle,
    currentTabIndex,
    totalTabs
}) => {
    return (
        <div className="w-full glass border-b sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs text-muted-foreground font-medium overflow-hidden">

                {/* Breadcrumb Path */}
                <div className="flex items-center gap-2 whitespace-nowrap overflow-x-auto no-scrollbar mask-gradient-x">
                    {courseName && (
                        <>
                            <span className="flex items-center gap-1.5 text-muted-foreground hover:text-muted-foreground transition-colors cursor-default">
                                <BookOpen size={12} />
                                {courseName}
                            </span>
                            <ChevronLeft size={10} className="text-foreground" />
                        </>
                    )}

                    <span className="text-muted-foreground/80 hover:text-foreground transition-colors cursor-default">
                        {chapterTitle || "פרק"}
                    </span>

                    {currentTabTitle && (
                        <>
                            <ChevronLeft size={10} className="text-primary/40" />
                            <span className="text-primary font-bold truncate max-w-[150px] md:max-w-xs px-2 py-0.5 bg-primary/5 rounded-md border border-primary/10">
                                {currentTabTitle}
                            </span>
                        </>
                    )}
                </div>

                {/* Step Counter */}
                {(currentTabIndex !== undefined && totalTabs !== undefined) && (
                    <div className="hidden sm:flex items-center gap-3 pl-4 shrink-0 border-r border-border/50 mr-4">
                        <span className="text-[10px] tracking-widest uppercase opacity-40 font-black">PROGRESS</span>
                        <div className="flex items-center gap-1.5 bg-background/50 px-2 py-1 rounded-lg border border-border/50">
                            <span className="text-primary font-bold text-sm">{currentTabIndex}</span>
                            <span className="text-muted-foreground/30 text-xs">/</span>
                            <span className="text-muted-foreground font-medium">{totalTabs}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
