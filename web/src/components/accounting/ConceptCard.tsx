"use client";

import { memo } from "react";
import { AnalogyBlock } from "./AnalogyBlock";
import { TermTooltip } from "@/components/ui/term-tooltip";

const NUMBERED_LINE_REGEX = /^(\d+\.)\s*(.*)/;
const BOLD_TAG_REGEX = /(<b>.*?<\/b>)/g;

interface ConceptCardProps {
    title: string;
    academicText: string;
    analogyText: string;
    index: number;
}

export const ConceptCard = memo(function ConceptCard({ title, academicText, analogyText, index }: ConceptCardProps) {

    // Custom Parser to provide modern styling for terms and lists
    const renderAcademicText = () => {
        const lines = academicText.split("\n");

        return lines.map((line, lineIdx) => {
            const numberedMatch = line.match(NUMBERED_LINE_REGEX);
            const content = line.split(BOLD_TAG_REGEX).map((part, i) => {
                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                    const term = part.replace(/<\/?b>/g, "");
                    return (
                        <TermTooltip key={i} term={term} definition="מושג חשבונאי מרכזי.">
                            <span className="border-b-4 border-[#fbbf24]/40 font-black text-white hover:text-[#fbbf24] transition-all cursor-help px-2 bg-[#fbbf24]/10 rounded-lg">
                                {term}
                            </span>
                        </TermTooltip>
                    );
                }
                return <span key={i}>{part}</span>;
            });

            if (numberedMatch) {
                return (
                    <div key={lineIdx} className="flex gap-4 items-start mb-6 group/list hover:translate-x-[-4px] transition-transform duration-500">
                        <span className="text-[#fbbf24] font-black italic bg-[#fbbf24]/20 px-3 py-0.5 rounded-lg text-xl min-w-[40px] text-center shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                            {numberedMatch[1]}
                        </span>
                        <div className="flex-1 text-lg md:text-xl leading-relaxed font-sans">
                            {line.substring(numberedMatch[1].length).split(BOLD_TAG_REGEX).map((part, i) => {
                                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                                    const term = part.replace(/<\/?b>/g, "");
                                    return <span key={i} className="text-white font-black underline decoration-[#fbbf24]/30 decoration-2 underline-offset-4">{term}</span>;
                                }
                                return <span key={i}>{part}</span>;
                            })}
                        </div>
                    </div>
                );
            }

            return <div key={lineIdx} className="mb-6">{content}</div>;
        });
    };

    return (
        <section className="space-y-6 group scroll-mt-32">
            <header className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-[#fbbf24] font-black text-6xl md:text-8xl opacity-[0.05] leading-none select-none group-hover:opacity-15 group-hover:scale-105 transition-all duration-1000 font-sans">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#fbbf24] to-transparent opacity-20 rounded-full" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight font-sans -mt-10 relative z-10">
                    {title}
                </h3>
            </header>

            <div className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed max-w-4xl border-r-4 border-[#3b82f6]/30 pr-8 py-4 font-sans text-justify">
                {renderAcademicText()}
            </div>

            <AnalogyBlock text={analogyText} />
        </section>
    );
});
