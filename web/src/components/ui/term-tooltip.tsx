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
        <span
            className="relative group cursor-help inline-block mx-1"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <span className="border-b-2 border-indigo-500/50 text-indigo-200 font-bold transition-colors group-hover:bg-indigo-500/10 group-hover:border-indigo-400">
                {children}
            </span>

            {/* Tooltip Popup */}
            <div className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-lg bg-slate-900 border border-indigo-500/50 shadow-xl z-50 transition-all duration-200 pointer-events-none",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-slate-900 pointer-events-none" />

                <h4 className="text-indigo-400 font-bold text-sm mb-1">{term}</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{definition}</p>
            </div>
        </span>
    );
}
