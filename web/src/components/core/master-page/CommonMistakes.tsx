"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, XCircle, CheckCircle2, Skull, ShieldAlert } from "lucide-react";

interface MistakePair {
    mistake: string;
    correction: string;
    reason?: string;
}

interface CommonMistakesProps {
    mistakes: MistakePair[];
    introText?: string;
    className?: string;
}

export const CommonMistakes: React.FC<CommonMistakesProps> = ({ mistakes, introText, className }) => {
    return (
        <div className={cn("relative group", className)}>
            <div className="absolute -inset-1 bg-linear-to-r from-rose-500/10 to-orange-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-slate-950/40 backdrop-blur-xl border border-rose-500/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">

                {/* Mistakes Watermarks Wallpaper */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden text-rose-500">
                    <XCircle size={140} className="absolute -top-10 -left-10 rotate-[-15deg]" />
                    <AlertTriangle size={120} className="absolute bottom-1/3 -right-10 rotate-20" />
                    <Skull size={100} className="absolute top-1/3 left-1/4 rotate-[-10deg]" />
                    <ShieldAlert size={160} className="absolute -bottom-20 -left-20" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                            <AlertTriangle size={28} className="text-rose-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">נפילות נפוצות</h3>
                            <p className="text-xs font-bold text-rose-400/70 uppercase tracking-[0.2em] mt-1">Common Mistakes</p>
                        </div>
                    </div>

                    {introText && (
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl">
                            {introText}
                        </p>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {mistakes.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-4 p-6 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/4 transition-all">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <XCircle size={18} className="text-rose-500 mt-1 shrink-0" />
                                        <div className="text-slate-300">
                                            <span className="text-xs font-bold text-rose-500/70 block uppercase tracking-wider mb-1">הטעות האופיינית:</span>
                                            {item.mistake}
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/5 w-full" />

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                                        <div className="text-slate-200 font-medium">
                                            <span className="text-xs font-bold text-emerald-500/70 block uppercase tracking-wider mb-1">איך לעשות את זה נכון:</span>
                                            {item.correction}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
