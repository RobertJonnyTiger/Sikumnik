"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string; // The ID for anchor linking
    className?: string;
    sectionNumber?: number; // Optional visual indicator "Section 01"
    title?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    id,
    className,
    sectionNumber,
    title,
}) => {
    return (
        <section
            id={id}
            className={cn(
                "relative py-8 md:py-12 border-b border-slate-800/50 last:border-0 scroll-mt-24",
                className
            )}
        >
            {/* Visual Section Number (Optional Watermark style) */}
            {sectionNumber && (
                <div className="absolute top-4 right-0 text-[10px] font-bold text-slate-700/50 select-none">
                    SECTION {sectionNumber.toString().padStart(2, "0")}
                </div>
            )}

            {/* Section Header */}
            {title && (
                <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-teal-500 mb-2">
                        {title}
                    </h3>
                    <div className="h-1 w-12 bg-teal-500/30 rounded-full" />
                </div>
            )}

            {children}
        </section>
    );
};
