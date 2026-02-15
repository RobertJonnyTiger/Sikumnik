"use client";

import React from "react";
import { GraduationCap, Microscope, HelpCircle } from "lucide-react";

interface DeepDiveProps {
    title?: string;
    data: any; // Flexible data structure
    domain?: "accounting" | "microeconomics" | "general";
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, data, domain = "general" }) => {
    if (!data) return null;

    // Domain-specific styling configuration (can be expanded)
    const activeTitle = title || data.title || "מבט לעומק";

    return (
        <div className="w-full my-16 space-y-8 font-main">
            <div className={`flex items-center gap-4 border-b-2 border-primary/40 pb-4`}>
                <div className={`p-3 bg-primary/10 rounded-xl text-primary shadow-premium border border-primary/20`}>
                    <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
                    {activeTitle}
                </h2>
            </div>


            {/* General Content Section */}
            {(data.content || data.determinants) && (
                <div className="bg-card/20 p-6 md:p-8 rounded-3xl border border-border/10 text-base md:text-lg font-medium leading-relaxed text-foreground/90 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl" />
                    {/* Handle simple string content */}
                    {typeof data.content === 'string' && data.content.split(' ').map((word: string, i: number) => {
                        const isHigh = i % 7 === 0;
                        return <span key={i} className={isHigh ? "text-primary font-black underline decoration-primary/20 underline-offset-4" : ""}>{word} </span>;
                    })}

                    {/* Handle determinants array (Microeconomics style) */}
                    {Array.isArray(data.determinants) && data.determinants.map((det: any, idx: number) => (
                        <div key={idx} className="mb-4 last:mb-0">
                            <h3 className="text-xl font-black text-white mb-2">{det.title}</h3>
                            <p>{det.content}</p>
                            {det.subItems && (
                                <ul className="list-disc pr-6 mt-2 space-y-1">
                                    {det.subItems.map((sub: any, sIdx: number) => (
                                        <li key={sIdx}>
                                            <span className="font-bold text-primary">{sub.label}: </span>
                                            {sub.value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Exam Appearance Section - Truth 2.0 Premium */}
            {data.examAppearance && (
                <div className="bg-amber-950/20 md:bg-amber-950/10 backdrop-blur-3xl border border-amber-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full animate-pulse" />

                    <h3 className="flex items-center gap-4 text-2xl md:text-3xl font-black text-amber-400 mb-8 uppercase tracking-[0.2em]">
                        <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        איך זה מופיע במבחן?
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10 overflow-hidden">
                        <div className="space-y-6 min-w-0">
                            <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.2em] border-r-4 border-amber-500/40 pr-4">שאלות נפוצות</h4>
                            {data.examAppearance.commonFormats && (
                                <ul className="space-y-4">
                                    {data.examAppearance.commonFormats.map((fmt: string, idx: number) => (
                                        <li key={idx} className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 text-base md:text-lg text-amber-100/90 flex gap-3 transition-all hover:bg-amber-500/10 min-w-0 break-words">
                                            <span className="text-amber-500 font-black">•</span>
                                            <div className="flex-1 min-w-0 break-words">
                                                {fmt.split(' ').map((word, i) => (
                                                    <span key={i} className={i % 6 === 0 ? "text-amber-400 font-black" : ""}>{word} </span>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="space-y-8 min-w-0">
                            {data.examAppearance.keyPhrases && (
                                <div>
                                    <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.2em] border-r-4 border-amber-500/40 pr-4 mb-4">ביטויי מפתח קריטיים</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {data.examAppearance.keyPhrases.map((phrase: string, idx: number) => (
                                            <span key={idx} className="bg-amber-500/10 border border-amber-500/20 text-amber-300 font-black px-4 py-2 rounded-xl text-base md:text-lg hover:bg-amber-500/20 hover:scale-105 transition-all shadow-lg break-words max-w-full text-center">
                                                "{phrase}"
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.examAppearance.tips && (
                                <div>
                                    <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.2em] border-r-4 border-amber-500/40 pr-4 mb-4">טיפ של מקצוענים</h4>
                                    <ul className="space-y-4">
                                        {data.examAppearance.tips.map((tip: string, idx: number) => (
                                            <li key={idx} className="text-base md:text-lg text-amber-100/80 font-medium leading-relaxed bg-black/20 p-5 rounded-2xl border border-amber-500/5 min-w-0 break-words">
                                                <span className="text-xl mr-2 underline decoration-amber-500/20 underline-offset-4">💡</span>
                                                {tip.split(' ').map((word, i) => (
                                                    <span key={i} className={i % 7 === 0 ? "text-amber-400 font-black" : ""}>{word} </span>
                                                ))}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
