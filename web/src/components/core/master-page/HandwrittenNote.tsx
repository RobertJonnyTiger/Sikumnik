"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PenTool } from "lucide-react";

interface HandwrittenNoteProps {
    content: string;
    rotation?: number;
    color?: "yellow" | "blue" | "pink";
    className?: string;
}

export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
    content,
    rotation = -2,
    color = "yellow",
    className
}) => {
    const colorStyles = {
        yellow: "bg-[#fef9c3] text-slate-800 border-[#fde047]", // Yellow sticky
        blue: "bg-[#dbeafe] text-slate-800 border-[#93c5fd]",   // Blue sticky
        pink: "bg-[#fce7f3] text-slate-800 border-[#f9a8d4]"    // Pink sticky
    };

    return (
        <div
            className={cn(
                "relative p-4 rounded-sm shadow-md border-b-2 font-handwriting text-lg leading-relaxed transform transition-transform hover:scale-105 duration-300",
                colorStyles[color],
                className
            )}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/30 backdrop-blur-sm rotate-1 shadow-sm" />

            <div className="flex gap-3">
                <PenTool size={16} className="mt-1 opacity-50 shrink-0" />
                <p>{content}</p>
            </div>
        </div>
    );
};
