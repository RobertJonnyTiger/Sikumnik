"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { getConnotationColor } from "@/lib/financial-utils";

interface TermTooltipProps {
    term: string;
    definition: string;
    className?: string;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({ term, definition, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const connotationClass = getConnotationColor(term);
    const borderClass = connotationClass.replace("text-", "border-");

    return (
        <span className="group relative inline-block">
            <span
                className={cn(
                    "cursor-help border-b-2 border-dotted transition-colors duration-200",
                    borderClass,
                    connotationClass
                )}
            >
                {term}
            </span>
            <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 text-sm animate-in fade-in zoom-in duration-200 block">
                <span className={cn("flex items-center gap-2 mb-1 font-bold border-b border-slate-800 pb-1", connotationClass)}>
                    <Info size={12} />
                    <span>מידע</span>
                </span>
                <span className="text-slate-300 leading-relaxed block">{definition}</span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800 block" />
            </span>
        </span >
    );
};
