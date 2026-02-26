"use client";

import * as React from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import DidYouKnow from "./blocks/DidYouKnow";
import type { ContentBlock } from "@/types/chapter";
import { cn } from "@/lib/utils";

interface LessonFooterProps {
    currentTabIndex: number;
    tabs: { id: string; title: string }[];
    onPrevious: () => void;
    onNext?: () => void;
    facts?: Array<{
        icon?: React.ElementType;
        category?: string;
        fact: string;
        source?: string;
    }>;
    topicData?: {
        title: string;
        blocks: ContentBlock[];
    };
    courseName?: string;
    nextChapterTitle?: string;
}

export const LessonFooter: React.FC<LessonFooterProps> = ({
    currentTabIndex,
    tabs,
    onPrevious,
    onNext,
    facts,
    topicData,
    courseName,
    nextChapterTitle
}) => {
    const isFirstTab = currentTabIndex <= -1;
    const isLastTab = currentTabIndex === tabs.length - 1;

    // Ensure all facts have a category (required by DidYouKnow component)
    const normalizedFacts = React.useMemo(() => {
        if (!facts) return undefined;
        return facts.map(f => ({
            ...f,
            category: f.category || "כללי"
        }));
    }, [facts]);

    return (
        <section className="mt-20 mb-32 w-full max-w-4xl mx-auto px-6 pt-12 border-t border-border/50">

            {/* Fact / Trivia Section - Always show at end of page */}
            <div className="mb-12">
                <DidYouKnow
                    facts={normalizedFacts}
                    topicData={topicData}
                    courseName={courseName}
                    className="w-full"
                />
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Previous Button (Right in RTL) */}
                <button
                    onClick={onPrevious}
                    disabled={isFirstTab}
                    className={cn(
                        "group flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 w-full md:w-auto justify-center md:justify-start",
                        isFirstTab
                            ? "border-transparent text-muted-foreground/50 cursor-not-allowed"
                            : "border-border/50 bg-card hover:bg-accent/5 hover:border-accent/20 text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className={cn(
                        "p-2 rounded-full bg-secondary/50 transition-colors group-hover:bg-background shrink-0",
                        isFirstTab && "opacity-0"
                    )}>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                            {isFirstTab ? '' : 'הקודם'}
                        </span>
                        <span className="text-sm font-bold">
                            {isFirstTab ? 'תחילת הפרק' : tabs[currentTabIndex - 1]?.title || 'חזרה'}
                        </span>
                    </div>
                </button>

                {/* Spacer (Desktop) */}
                <div className="hidden md:block flex-1" />

                {/* Next / Complete Button (Left in RTL) */}
                {onNext && (
                    <button
                        onClick={onNext}
                        className="group relative flex items-center gap-4 px-8 py-5 rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 w-full md:w-auto justify-center overflow-hidden"
                    >
                        {/* Background Animation */}
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />

                        <div className="flex flex-col items-end text-left z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1">
                                {isLastTab ? 'סיום הפרק' : 'המשך לשלב הבא'}
                                <Sparkles className="w-3 h-3" />
                            </span>
                            <span className="text-lg font-black leading-none mt-1">
                                {isLastTab && nextChapterTitle
                                    ? `פרק הבא: ${nextChapterTitle}`
                                    : isLastTab
                                        ? 'סיום וסיכום'
                                        : 'הושלם, המשך הלאה'}
                            </span>
                        </div>

                        <div className="p-3 rounded-full bg-white/20 text-foreground backdrop-blur-sm group-hover:scale-110 transition-transform z-10 shrink-0">
                            {isLastTab ? <CheckCircle className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
                        </div>
                    </button>
                )}
            </div>
        </section>
    );
};
