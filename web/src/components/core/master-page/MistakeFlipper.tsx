"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { XCircle, CheckCircle, ChevronDown, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MistakeFlipperProps {
    mistake: string;
    correction: string;
    explanation: string;
}

export const MistakeFlipper: React.FC<MistakeFlipperProps> = ({
    mistake,
    correction,
    explanation
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300",
                isOpen
                    ? "bg-slate-900/80 border-red-500/30 shadow-lg shadow-red-900/20"
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
            )}
        >
            {/* Header / Teaser */}
            <div className="flex items-start gap-4 p-5">
                <div className={cn(
                    "mt-1 shrink-0 rounded-full p-2 transition-colors",
                    isOpen ? "bg-red-500/20 text-red-400" : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
                )}>
                    {isOpen ? <AlertTriangle size={20} /> : <XCircle size={20} />}
                </div>

                <div className="flex-1">
                    <h4 className={cn(
                        "font-medium leading-snug transition-colors",
                        isOpen ? "text-red-200" : "text-slate-300"
                    )}>
                        {mistake}
                    </h4>
                </div>

                <div className="mt-1 text-slate-500">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>
            </div>

            {/* Revealed Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-white/5 bg-white/5 p-5">
                            {/* Correction */}
                            <div className="flex gap-3 mb-4">
                                <div className="mt-0.5 text-emerald-400 shrink-0">
                                    <CheckCircle size={18} />
                                </div>
                                <p className="text-emerald-100 font-medium text-sm">
                                    {correction}
                                </p>
                            </div>

                            {/* Why / Explanation */}
                            <p className="text-slate-400 text-sm leading-relaxed pl-8 border-l-2 border-slate-700 ml-2">
                                {explanation}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
