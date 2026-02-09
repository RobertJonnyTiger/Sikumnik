"use client";

import React from "react";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreetSummaryProps {
    data: {
        content: string;
    };
}

export const StreetSummary: React.FC<StreetSummaryProps> = ({ data }) => {
    const renderContent = (content: string) => {
        const sentences = content.split('\n').filter(s => s.trim());
        return sentences.map((sentence, i) => {
            const isBullet = sentence.trim().startsWith('•') || sentence.trim().startsWith('-');
            const text = isBullet ? sentence.trim().substring(1).trim() : sentence.trim();

            return (
                <div key={i} className={cn(
                    "relative py-3 px-4 transition-all duration-300 hover:translate-x-[-4px]",
                    isBullet ? "flex items-start gap-4 mr-4" : "mb-2"
                )}>
                    {isBullet && <span className="text-amber-500 font-black text-2xl mt-[-4px] animate-pulse">☕</span>}
                    <p className={cn(
                        "text-lg md:text-xl font-medium leading-relaxed text-amber-950 dark:text-amber-100/90",
                        isBullet && "font-black"
                    )}>
                        {text.split(/(\*\*.*?\*\*)/).map((part, idx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <span key={idx} className="text-amber-600 dark:text-amber-400 font-black border-b-2 border-amber-500/30">{part.slice(2, -2)}</span>;
                            }
                            return part;
                        })}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="w-full my-16 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-900 rounded-4xl p-8 md:p-12 shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -z-10" />
            <div className="flex items-center gap-6 mb-10">
                <div className="p-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl text-amber-700 dark:text-amber-300 border border-amber-200/50 shadow-sm group-hover:scale-110 transition-transform">
                    <Coffee className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-amber-900 dark:text-amber-100 uppercase tracking-widest">
                        סיכום בגובה העיניים
                    </h2>
                    <div className="text-[10px] font-black text-amber-600/60 uppercase tracking-[0.4em] mt-1">THE STREET VIEW</div>
                </div>
            </div>

            <div className="space-y-2">
                {renderContent(data.content)}
            </div>
        </div>
    );
};
