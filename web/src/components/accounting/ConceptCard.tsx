"use client";

import { memo } from "react";
import { AnalogyBlock } from "./AnalogyBlock";
import { TermTooltip } from "@/components/ui/term-tooltip";

const NUMBERED_LINE_REGEX = /^(\d+\.)\s*(.*)/;
const BOLD_TAG_REGEX = /(<b>.*?<\/b>)/g;
// Regex to strip English words and text in parentheses containing English
const ENGLISH_STRIP_REGEX = /\s*\([^a-zA-Z]*[a-zA-Z]+[^a-zA-Z]*\)|[a-zA-Z]+/g;

interface ConceptCardProps {
    title: string;
    academicText: string;
    analogyText?: string;
    index: number;
    showAnalogy?: boolean;
}

export const ConceptCard = memo(function ConceptCard({ title, academicText, analogyText, index, showAnalogy = true }: ConceptCardProps) {

    // Helper to strip English as per Truth 2.0
    const cleanText = (text: string) => text.replace(ENGLISH_STRIP_REGEX, "").trim();

    const cleanTitle = cleanText(title);

    // Custom Parser to provide modern styling for terms and lists
    const renderAcademicText = () => {
        const lines = academicText.split("\n");

        return lines.map((line, lineIdx) => {
            const cleanedLine = cleanText(line);
            if (!cleanedLine) return null;

            const numberedMatch = cleanedLine.match(NUMBERED_LINE_REGEX);
            const content = cleanedLine.split(BOLD_TAG_REGEX).map((part, i) => {
                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                    const term = part.replace(/<\/?b>/g, "");
                    return (
                        <TermTooltip key={i} term={term} definition="מושג חשבונאי מרכזי.">
                            <span className="border-b-4 border-primary/40 font-black text-white hover:text-primary transition-all cursor-help px-2 bg-primary/20 rounded-lg">
                                {term}
                            </span>
                        </TermTooltip>
                    );
                }
                return <span key={i} className="font-medium text-foreground/90">{part}</span>;
            });

            if (numberedMatch) {
                return (
                    <div key={lineIdx} className="flex gap-6 items-start mb-8 group/list hover:translate-x-[-8px] transition-transform duration-500">
                        <span className="text-primary font-black bg-primary/10 border border-primary/30 px-4 py-1 rounded-xl text-2xl min-w-[50px] text-center shadow-premium">
                            {numberedMatch[1]}
                        </span>
                        <div className="flex-1 text-2xl md:text-3xl leading-relaxed font-main text-foreground/90">
                            {cleanedLine.substring(numberedMatch[1].length).split(BOLD_TAG_REGEX).map((part, i) => {
                                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                                    const term = part.replace(/<\/?b>/g, "");
                                    return <span key={i} className="text-white font-black decoration-primary/50 decoration-4 underline-offset-8 underline">{term}</span>;
                                }
                                return <span key={i}>{part}</span>;
                            })}
                        </div>
                    </div>
                );
            }

            return <div key={lineIdx} className="mb-8 text-2xl md:text-3xl leading-relaxed font-main">{content}</div>;
        });
    };

    return (
        <section className="space-y-8 group scroll-mt-32">
            <header className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <span className="text-primary font-black text-7xl md:text-9xl opacity-[0.08] leading-none select-none group-hover:opacity-20 group-hover:scale-105 transition-all duration-1000 font-main">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-2 w-24 bg-linear-to-r from-primary/40 to-transparent rounded-full shadow-premium" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight font-main -mt-12 relative z-10 px-2">
                    {cleanTitle}
                </h3>
            </header>

            <div className="text-2xl md:text-3xl font-medium text-foreground/90 leading-tight pr-10 border-r-8 border-primary/20 py-6 font-main">
                {renderAcademicText()}
            </div>

            {showAnalogy && analogyText && <AnalogyBlock text={analogyText} />}
        </section>
    );
});
