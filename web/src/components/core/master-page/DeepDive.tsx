"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeepDiveProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn(
            "bg-slate-950 border border-slate-800 rounded-lg overflow-hidden transition-colors hover:border-indigo-500/30",
            className
        )}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 px-5 bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-500/10 rounded-md">
                        <GraduationCap size={18} className="text-indigo-400" />
                    </div>
                    <span className="font-bold text-indigo-300 text-sm md:text-base">
                        {title}
                    </span>
                    <span className="text-xs bg-indigo-900/30 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                        העמקה (Advanced)
                    </span>
                </div>
                <ChevronDown
                    className={cn("text-slate-500 transition-transform duration-300", isOpen && "rotate-180")}
                    size={20}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-5 border-t border-slate-800/50 text-slate-300 leading-relaxed text-sm md:text-base bg-slate-950/50">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
