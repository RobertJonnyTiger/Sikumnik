"use client";

import React from "react";
import { BookOpen } from "lucide-react";

interface IntroductionProps {
    data: {
        content: string;
        whyItMatters: string;
    };
}

export const Introduction: React.FC<IntroductionProps> = ({ data }) => {
    return (
        <div className="w-full mb-24 space-y-12 font-main">
            <div className="bg-card/40 backdrop-blur-3xl border-r-8 border-primary p-10 md:p-14 rounded-l-[3rem] shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />
                <p className="text-3xl md:text-4xl leading-tight text-white font-black whitespace-pre-wrap">
                    {data.content.split(' ').map((word, i) => {
                        const isHigh = i % 8 === 0 || word.includes('חשבונאות') || word.includes('בסיס');
                        return <span key={i} className={isHigh ? "text-primary" : ""}>{word} </span>;
                    })}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 p-10 bg-card/60 backdrop-blur-md border-2 border-border/20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="shrink-0">
                    <div className="h-20 w-20 rounded-3xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent shadow-premium group-hover:rotate-12 transition-transform">
                        <BookOpen className="w-10 h-10" />
                    </div>
                </div>

                <div className="space-y-6 relative z-10 w-full">
                    <h3 className="font-black text-accent mb-4 text-xl uppercase tracking-[0.4em] border-r-4 border-accent/40 pr-6">למה זה קריטי?</h3>
                    <p className="text-2xl md:text-3xl text-foreground/90 leading-relaxed font-medium">
                        {data.whyItMatters.split(' ').map((word, i) => {
                            const isHigh = i % 7 === 0 || word.includes('מבנה') || word.includes('בסיס');
                            return <span key={i} className={isHigh ? "text-accent font-black" : ""}>{word} </span>;
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
