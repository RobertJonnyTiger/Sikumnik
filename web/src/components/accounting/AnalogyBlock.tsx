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
        <div className={cn("relative group mt-10", className)}>
            {/* Multi-layered glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6] via-[#fbbf24] to-[#3b82f6] rounded-3xl blur-lg opacity-10 group-hover:opacity-20 transition duration-700" />

            <div className="relative bg-[#1e293b]/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/10 blur-3xl -z-10" />

                <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-[#3b82f6] to-[#fbbf24] p-2.5 rounded-xl shrink-0 shadow-lg shadow-[#3b82f6]/30 group-hover:scale-105 transition-transform duration-500">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h4 className="text-[10px] md:text-xs font-black text-[#fbbf24] uppercase tracking-[0.2em] font-sans leading-none">תובנה מהשטח</h4>
                            <div className="h-[1px] w-12 bg-gradient-to-r from-[#fbbf24] to-transparent opacity-30" />
                        </div>
                        <div
                            className="text-white text-lg md:text-xl leading-relaxed font-handwriting font-light italic opacity-95 pr-3 border-r border-[#fbbf24]/20"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>
                </div>

                {/* Knowledge Pulse Indicator - scaled down */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-[#fbbf24]/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-ping" />
                    </div>
                </div>
            </div>
        </div>
    );
});
