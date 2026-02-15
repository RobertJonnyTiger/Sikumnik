"use client";

import React from "react";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface Mistake {
    mistake: string;
    correct: string;
    why: string;
}

interface CommonMistakesProps {
    data: Mistake[];
}

export const CommonMistakes: React.FC<CommonMistakesProps> = ({ data }) => {
    return (
        <div className="w-full my-16 space-y-8 font-main">
            <div className="flex items-center gap-4 border-b-2 border-error/30 pb-4">
                <div className="p-3 bg-error/10 rounded-xl text-error shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-error/20">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">טעויות נפוצות במבחן</h2>
            </div>

            <div className="grid gap-6">
                {data.map((item, idx) => (
                    <div key={idx} className="bg-card/40 backdrop-blur-md border-r-4 border-error rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:bg-card/60 transition-all duration-500">
                        {/* Background Warning Glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-error/5 blur-[100px] pointer-events-none group-hover:bg-error/10 transition-all duration-1000" />

                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            {/* The Mistake */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 font-black text-error text-lg uppercase tracking-widest">
                                    <XCircle className="w-6 h-6" />
                                    הטעות הקלאסית
                                </div>
                                <p className="text-xl md:text-2xl font-black text-white leading-tight">
                                    {item.mistake.split(' ').map((word, i) => (
                                        <span key={i} className={i % 5 === 0 ? "text-error" : ""}>{word} </span>
                                    ))}
                                </p>
                            </div>

                            {/* The Corrections */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 font-black text-success text-lg uppercase tracking-widest">
                                    <CheckCircle2 className="w-6 h-6" />
                                    הדרך של המקצוען
                                </div>
                                <p className="text-xl md:text-2xl font-black text-white leading-tight">
                                    {item.correct.split(' ').map((word, i) => (
                                        <span key={i} className={i % 5 === 0 ? "text-success" : ""}>{word} </span>
                                    ))}
                                </p>
                            </div>
                        </div>

                        {/* The Reason - Truth 2.0: No italics, increased size */}
                        <div className="mt-8 bg-error/5 border border-error/20 p-6 rounded-xl relative">
                            <div className="text-xs md:text-sm font-black text-error uppercase tracking-[0.2em] mb-2">למה סטודנטים נופלים פה?</div>
                            <p className="text-base md:text-lg font-main text-foreground/90 font-medium leading-relaxed">
                                {item.why.split(' ').map((word, i) => {
                                    const isHint = word.includes('בלבול') || word.includes('שימו לב') || i % 8 === 0;
                                    return <span key={i} className={isHint ? "text-error font-black underline decoration-error/30 decoration-2 underline-offset-4" : ""}>{word} </span>;
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
