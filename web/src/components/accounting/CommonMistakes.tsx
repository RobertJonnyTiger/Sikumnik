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
        <div className="w-full my-24 space-y-12">
            <div className="flex items-center gap-6 border-b-4 border-error/30 pb-8">
                <div className="p-4 bg-error/10 rounded-2xl text-error shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-error/20">
                    <AlertCircle className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">טעויות נפוצות במבחן</h2>
            </div>

            <div className="grid gap-10">
                {data.map((item, idx) => (
                    <div key={idx} className="bg-card/40 backdrop-blur-md border-r-8 border-error rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:bg-card/60 transition-all duration-500">
                        {/* Background Warning Glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-error/5 blur-[100px] pointer-events-none group-hover:bg-error/10 transition-all duration-1000" />

                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            {/* The Mistake */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 font-black text-error text-2xl uppercase tracking-widest">
                                    <XCircle className="w-8 h-8" />
                                    הטעות הקלאסית
                                </div>
                                <p className="text-2xl md:text-3xl font-black text-white leading-tight">
                                    {item.mistake.split(' ').map((word, i) => (
                                        <span key={i} className={i % 5 === 0 ? "text-error" : ""}>{word} </span>
                                    ))}
                                </p>
                            </div>

                            {/* The Corrections */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 font-black text-success text-2xl uppercase tracking-widest">
                                    <CheckCircle2 className="w-8 h-8" />
                                    הדרך של המקצוען
                                </div>
                                <p className="text-2xl md:text-3xl font-black text-white leading-tight">
                                    {item.correct.split(' ').map((word, i) => (
                                        <span key={i} className={i % 5 === 0 ? "text-success" : ""}>{word} </span>
                                    ))}
                                </p>
                            </div>
                        </div>

                        {/* The Reason - Truth 2.0: No italics, increased size */}
                        <div className="mt-12 bg-error/5 border-2 border-error/20 p-8 rounded-2xl relative">
                            <div className="text-sm md:text-base font-black text-error uppercase tracking-[0.3em] mb-4">למה סטודנטים נופלים פה?</div>
                            <p className="text-xl md:text-2xl font-main text-foreground/90 font-medium leading-relaxed">
                                {item.why.split(' ').map((word, i) => {
                                    const isHint = word.includes('בלבול') || word.includes('שימו לב') || i % 8 === 0;
                                    return <span key={i} className={isHint ? "text-error font-black underline decoration-error/30 decoration-2 underline-offset-8" : ""}>{word} </span>;
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
