"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Lightbulb, Quote, MessageSquare, HelpCircle, Info, Sparkles } from "lucide-react";

interface TriviaCardProps {
    fact: string;
    source?: string;
    className?: string;
}

export const TriviaCard: React.FC<TriviaCardProps> = ({ fact, source, className }) => {
    return (
        <div className={cn("relative group", className)}>
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">

                {/* Trivia Watermarks Wallpaper */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                    <MessageSquare size={140} className="absolute -top-10 -left-10 rotate-[-15deg]" />
                    <HelpCircle size={120} className="absolute bottom-1/3 -right-10 rotate-20" />
                    <Info size={100} className="absolute top-1/3 left-1/4 rotate-[-10deg]" />
                    <Sparkles size={160} className="absolute -bottom-20 -left-20" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center text-right">
                    <div className="shrink-0 p-5 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                        <Sparkles size={32} className="text-indigo-400" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 opacity-70">
                                הידעת? (DID YOU KNOW?)
                            </h4>
                        </div>
                        <p className="text-xl md:text-2xl font-medium text-slate-100 leading-relaxed font-handwriting">
                            "{fact}"
                        </p>
                        {source && (
                            <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                — {source}
                            </p>
                        )}
                    </div>
                </div>


                {/* Ambient logic */}
                <Quote
                    size={120}
                    className="absolute -bottom-10 -right-10 text-indigo-500/5 rotate-[-15deg] pointer-events-none"
                />
            </div>
        </div>
    );
};
