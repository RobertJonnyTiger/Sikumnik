"use client";

import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

interface IntroductionProps {
    data: {
        content: string;
        whyItMatters: string;
    };
    className?: string;
}

/**
 * [2] 📖 INTRODUCTION Component
 * Purpose: High-impact opener for the chapter.
 * Design: High-fidelity glassmorphism with neon accents.
 */
export const Introduction: React.FC<IntroductionProps> = ({ data, className }) => {
    return (
        <SectionWrapper id="introduction" sectionNumber={2}>
            <div className={cn("w-full space-y-12 py-8", className)}>
                {/* Main Content Block */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative bg-slate-900/40 backdrop-blur-3xl border-r-8 border-teal-500 p-10 md:p-14 rounded-l-[3rem] shadow-2xl overflow-hidden"
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] -z-10" />

                    <p className="text-3xl md:text-5xl leading-tight text-white font-black tracking-tight whitespace-pre-wrap">
                        {data.content}
                    </p>

                    {/* Decorative Element */}
                    <div className="absolute top-6 left-10 opacity-20 text-teal-400">
                        <Sparkles size={40} />
                    </div>
                </motion.div>

                {/* Why It Matters Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-10 p-10 bg-slate-950/60 backdrop-blur-md border border-white/5 rounded-4xl shadow-2xl relative overflow-hidden group"
                >
                    <div className="shrink-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-[2rem] bg-purple-500/10 border-2 border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:rotate-12 transition-all duration-700">
                            <BookOpen className="w-12 h-12" />
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10 w-full flex flex-col justify-center">
                        <h3 className="font-black text-purple-400 mb-2 text-xl uppercase tracking-[0.4em] border-r-4 border-purple-500/40 pr-6 inline-block">
                            למה זה קריטי?
                        </h3>
                        <p className="text-2xl md:text-4xl text-slate-100 leading-relaxed font-bold tracking-tight">
                            {data.whyItMatters}
                        </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
