"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapseProps {
    title: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string; // Container style
    headerClassName?: string;
    contentClassName?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
    title,
    children,
    defaultOpen = false,
    className,
    headerClassName,
    contentClassName,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={cn("border border-slate-800 rounded-lg overflow-hidden", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors text-right",
                    headerClassName
                )}
            >
                <span className="font-medium text-slate-200">{title}</span>
                <ChevronDown
                    className={cn(
                        "text-slate-500 transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                    size={20}
                />
            </button>

            <div
                className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
            >
                <div className="overflow-hidden">
                    <div className={cn("p-4 border-t border-slate-800 bg-slate-950/30", contentClassName)}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
