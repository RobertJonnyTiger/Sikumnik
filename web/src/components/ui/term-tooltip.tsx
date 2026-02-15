"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TermTooltipProps {
    term: string;
    definition: string;
    children: React.ReactNode;
}

export function TermTooltip({ term, definition, children }: TermTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative group cursor-help inline-block mx-1"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <span className="border-b-2 border-[#fbbf24]/30 text-white font-black hover:text-[#fbbf24] transition-all font-sans">
                {children}
            </span>

            {/* Tooltip Popup */}
            <div className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-5 rounded-2xl bg-[#0f172a] border border-[#3b82f6]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 pointer-events-none font-sans",
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
            )}>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-[#3b82f6]/50 pointer-events-none" />

                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
                    <h4 className="text-[#fbbf24] font-black text-xs uppercase tracking-widest">{term}</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{definition}</p>
            </div>
        </div>
    );
}
