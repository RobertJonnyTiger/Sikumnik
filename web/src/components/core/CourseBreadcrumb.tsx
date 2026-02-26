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
        <div className="w-full bg-card/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-30">
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

                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-default">
                        {chapterTitle}
                    </span>

                    {currentTabTitle && (
                        <>
                            <ChevronLeft size={10} className="text-foreground" />
                            <span className="text-secondary-foreground font-bold truncate max-w-[150px] md:max-w-xs">
                                {currentTabTitle}
                            </span>
                        </>
                    )}
                </div>

                {/* Step Counter */}
                {(currentTabIndex !== undefined && totalTabs !== undefined) && (
                    <div className="hidden sm:flex items-center gap-2 pl-4 shrink-0 border-r border-white/5 mr-4">
                        <span className="text-[10px] tracking-wider uppercase opacity-50">התקדמות</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-secondary-foreground font-bold">{currentTabIndex}</span>
                            <span className="text-muted-foreground text-[10px]">/</span>
                            <span className="text-muted-foreground">{totalTabs}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
