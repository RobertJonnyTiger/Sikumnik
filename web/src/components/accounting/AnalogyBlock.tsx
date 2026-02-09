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
        <div className={cn("relative group mt-6", className)}>
            {/* Soft Shadow Glow */}
            <div className="absolute -inset-2 bg-accent/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="relative bg-card p-6 md:p-8 rounded-[2rem] border border-border shadow-premium overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-3xl -z-10" />

                <div className="flex items-start gap-6">
                    <div className="bg-primary p-3 rounded-2xl shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h4 className="text-sm md:text-base font-black text-accent uppercase tracking-[0.3em] font-sans leading-none">מה בתכל'ס..</h4>
                            <div className="h-[2px] w-16 bg-accent/20 rounded-full" />
                        </div>
                        <div
                            className="text-foreground/90 text-xl md:text-2xl leading-relaxed font-handwriting font-medium italic opacity-95 pr-6 border-r-2 border-accent/30"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>
                </div>

                {/* Micro-interaction Indicator */}
                <div className="absolute left-8 bottom-8">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                </div>
            </div>
        </div>
    );
});
