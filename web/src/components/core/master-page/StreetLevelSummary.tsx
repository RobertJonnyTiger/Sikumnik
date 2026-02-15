"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Lightbulb, Bike, Waves, Heart, Trophy, Palmtree, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

interface SummaryPoint {
    title: string;
    content: string;
}

interface StreetLevelSummaryProps {
    title?: string;
    intro?: string;
    points: SummaryPoint[];
    closing?: string;
    className?: string;
}

/**
 * [10] STREET-LEVEL SUMMARY
 * Tone: Casual Tel Aviv Student (29-year-old style)
 * Purpose: A personal recap of the chapter's "vibe" and core logic.
 */
export const StreetLevelSummary: React.FC<StreetLevelSummaryProps> = ({
    title = "אז מה היה לנו כאן? (תכל'ס)",
    intro,
    points,
    closing,
    className
}) => {
    return (
        <div className={cn("relative group", className)}>
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-slate-950/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden">

                {/* Tel Aviv Lifestyle Watermarks - The "Wallpaper" */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                    <Trophy size={140} className="absolute -top-10 -left-10 rotate-[-15deg]" />
                    <Bike size={100} className="absolute bottom-10 right-1/4 rotate-[10deg]" />
                    <Palmtree size={120} className="absolute top-1/2 -right-10 rotate-[-20deg]" />
                    <Waves size={160} className="absolute -bottom-20 -left-20" />
                    <UtensilsCrossed size={80} className="absolute top-1/4 left-1/3 rotate-[45deg]" />
                    <Heart size={60} className="absolute bottom-1/4 right-10 rotate-[-10deg] fill-current" />
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                            <MessageCircle size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            {title}
                        </h3>
                    </div>

                    {/* Intro - The personal "hook" */}
                    {intro && (
                        <p className="text-lg text-slate-300 leading-relaxed mb-10 font-medium">
                            {intro}
                        </p>
                    )}

                    {/* Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {points.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <Lightbulb size={18} className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">
                                            {point.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {point.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Closing - The "click" moment */}
                    {closing && (
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-teal-400 font-handwriting text-2xl leading-relaxed italic drop-shadow-sm">
                                "{closing}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
