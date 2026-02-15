"use client";

import React, { useState } from "react";
import { GraduationCap, Zap, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DualPersonaCardProps {
    academicTitle?: string;
    academicContent?: string;
    streetContent: string; // ToneBreak usually is street content
    streetOpener?: string;
}

export const DualPersonaCard: React.FC<DualPersonaCardProps> = ({
    academicTitle = "ההגדרה האקדמית",
    academicContent = "טקסט אקדמי חסר...",
    streetContent,
    streetOpener = "תכל'ס"
}) => {
    const [mode, setMode] = useState<'street' | 'academic'>('street');

    const toggleMode = () => setMode(prev => prev === 'street' ? 'academic' : 'street');

    return (
        <div className="relative font-main my-8 group">
            {/* Toggle Button - Floating or Integrated */}
            <button
                onClick={toggleMode}
                className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md transition-all text-xs font-bold text-white/80 hover:text-white"
            >
                <ArrowLeftRight size={14} />
                {mode === 'street' ? 'Switch to Professor' : 'Switch to Street'}
            </button>

            <AnimatePresence mode="wait">
                {mode === 'street' ? (
                    <motion.div
                        key="street"
                        initial={{ opacity: 0, y: 10, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -10, rotateX: 10 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="relative overflow-hidden bg-[#0a0a0a] border border-pink-500/30 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)]"
                    >
                        {/* Neon Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-pink-500 to-transparent opacity-70" />

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-pink-500/10 rounded-xl border border-pink-500/20 text-pink-500 shadow-lg shadow-pink-500/10">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-l from-pink-500 to-purple-500 tracking-tight">
                                {streetOpener}
                            </h3>
                        </div>

                        <p className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed whitespace-pre-line">
                            {streetContent}
                        </p>

                        <div className="mt-6 flex justify-end">
                            <span className="text-[10px] font-black text-pink-500/50 uppercase tracking-widest border border-pink-500/10 px-2 py-1 rounded">
                                STREET MODE
                            </span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="academic"
                        initial={{ opacity: 0, y: 10, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -10, rotateX: 10 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="relative overflow-hidden bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-400">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-100 tracking-tight">
                                {academicTitle}
                            </h3>
                        </div>

                        <p className="text-lg md:text-xl font-serif text-slate-300 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-slate-700">
                            {academicContent}
                        </p>

                        <div className="mt-6 flex justify-end">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-700 px-2 py-1 rounded">
                                ACADEMIC MODE
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
