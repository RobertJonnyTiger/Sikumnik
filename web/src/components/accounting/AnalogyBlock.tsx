"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AnalogyBlockProps {
    text: string;
    className?: string;
}

export const AnalogyBlock = memo(function AnalogyBlock({ text, className }: AnalogyBlockProps) {
    return (
        <div className={cn("relative group my-16", className)}>
            {/* Massive Shadow Glow */}
            <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />

            <div className="relative bg-card/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border-2 border-accent/20 shadow-premium overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -z-10 animate-pulse" />

                <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
                    <div className="bg-accent p-5 rounded-3xl shrink-0 shadow-premium group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>

                    <div className="space-y-8 w-full">
                        <div className="flex items-center gap-6">
                            <h4 className="text-xl md:text-2xl font-black text-accent uppercase tracking-[0.4em] font-main leading-none">תמונה מהחיים</h4>
                            <div className="h-0.5 w-full bg-accent/20 rounded-full" />
                        </div>

                        <div className="text-foreground/90 text-2xl md:text-3xl leading-relaxed font-black font-main opacity-100 pr-10 border-r-4 border-accent/40 whitespace-pre-wrap">
                            {text.split(' ').map((word, i) => {
                                const isHigh = i % 6 === 0 || word.includes('כמו') || word.includes('דמיינו');
                                return <span key={i} className={isHigh ? "text-accent" : ""}>{word} </span>;
                            })}
                        </div>
                    </div>
                </div>

                {/* Micro-interaction Indicator */}
                <div className="absolute left-10 bottom-10">
                    <div className="w-3 h-3 bg-accent rounded-full animate-ping shadow-[0_0_20px_var(--color-accent)]" />
                </div>
            </div>
        </div>
    );
});
