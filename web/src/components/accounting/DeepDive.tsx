"use client";

import React from "react";
import { GraduationCap, Microscope } from "lucide-react";
import { BalanceSheetQuadrant } from "./BalanceSheetQuadrant"; // We might need to import complex components here depending on content

interface DeepDiveProps {
    data: any; // Flexible data structure since Deep Dive can contain varied content
}

export const DeepDive: React.FC<DeepDiveProps> = ({ data }) => {
    return (
        <div className="w-full my-32 space-y-16 font-main">
            <div className="flex items-center gap-6 border-b-4 border-accent/40 pb-8">
                <div className="p-4 bg-accent/10 rounded-2xl text-accent shadow-premium border border-accent/20">
                    <Microscope className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest">מבט לעומק</h2>
            </div>

            {/* Custom handling for Balance Sheet Structure if present */}
            {data.balanceSheetStructure && (
                <div className="space-y-12">
                    <div className="bg-card/40 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border-2 border-border/20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 pr-6 border-r-4 border-accent uppercase tracking-tighter">
                            {data.balanceSheetStructure.title}
                        </h3>
                        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
                            {data.balanceSheetStructure.content.split(' ').map((word: string, i: number) => {
                                const isHigh = i % 8 === 0 || word.includes('מבנה') || word.includes('חשבון');
                                return <span key={i} className={isHigh ? "text-accent font-black" : ""}>{word} </span>;
                            })}
                        </p>
                    </div>

                    {data.balanceSheetStructure.quadrants && (
                        <div className="scale-105 md:scale-100">
                            <BalanceSheetQuadrant
                                topLeft={{
                                    title: data.balanceSheetStructure.quadrants.currentAssets.title,
                                    rows: data.balanceSheetStructure.quadrants.currentAssets.items
                                }}
                                topRight={{
                                    title: data.balanceSheetStructure.quadrants.currentLiabilities.title,
                                    rows: data.balanceSheetStructure.quadrants.currentLiabilities.items
                                }}
                                bottomLeft={{
                                    title: data.balanceSheetStructure.quadrants.nonCurrentAssets.title,
                                    rows: data.balanceSheetStructure.quadrants.nonCurrentAssets.items
                                }}
                                bottomRight={{
                                    title: data.balanceSheetStructure.quadrants.nonCurrentAndEquity.title,
                                    rows: data.balanceSheetStructure.quadrants.nonCurrentAndEquity.items
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* General Content Section */}
            {data.content && (
                <div className="bg-card/20 p-8 md:p-12 rounded-[3rem] border border-border/10 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl" />
                    {data.content.split(' ').map((word: string, i: number) => {
                        const isHigh = i % 7 === 0 || word.includes('משמעות') || word.includes('בדיקה');
                        return <span key={i} className={isHigh ? "text-primary font-black underline decoration-primary/20 underline-offset-8" : ""}>{word} </span>;
                    })}
                </div>
            )}

            {/* Exam Appearance Section - Truth 2.0 Premium */}
            {data.examAppearance && (
                <div className="bg-amber-950/20 md:bg-amber-950/10 backdrop-blur-3xl border-2 border-amber-500/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full animate-pulse" />

                    <h3 className="flex items-center gap-6 text-3xl md:text-4xl font-black text-amber-400 mb-12 uppercase tracking-[0.2em]">
                        <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30">
                            <GraduationCap className="w-10 h-10" />
                        </div>
                        איך זה מופיע במבחן?
                    </h3>

                    <div className="grid md:grid-cols-2 gap-16 overflow-hidden">
                        <div className="space-y-8 min-w-0">
                            <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.3em] border-r-4 border-amber-500/40 pr-6">שאלות נפוצות</h4>
                            <ul className="space-y-6">
                                {data.examAppearance.commonFormats.map((fmt: string, idx: number) => (
                                    <li key={idx} className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 text-xl md:text-2xl text-amber-100/90 flex gap-4 transition-all hover:bg-amber-500/10 min-w-0 break-words">
                                        <span className="text-amber-500 font-black">•</span>
                                        <div className="flex-1 min-w-0 break-words">
                                            {fmt.split(' ').map((word, i) => (
                                                <span key={i} className={i % 6 === 0 ? "text-amber-400 font-black" : ""}>{word} </span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-12 min-w-0">
                            <div>
                                <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.3em] border-r-4 border-amber-500/40 pr-6 mb-8">ביטויי מפתח קריטיים</h4>
                                <div className="flex flex-wrap gap-4">
                                    {data.examAppearance.keyPhrases.map((phrase: string, idx: number) => (
                                        <span key={idx} className="bg-amber-500/10 border-2 border-amber-500/20 text-amber-300 font-black px-6 py-3 rounded-2xl text-xl md:text-2xl hover:bg-amber-500/20 hover:scale-105 transition-all shadow-lg break-words max-w-full text-center">
                                            "{phrase}"
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-black text-amber-200 text-lg uppercase tracking-[0.3em] border-r-4 border-amber-500/40 pr-6 mb-8">טיפ של מקצוענים</h4>
                                <ul className="space-y-6">
                                    {data.examAppearance.tips.map((tip: string, idx: number) => (
                                        <li key={idx} className="text-xl md:text-2xl text-amber-100/80 font-medium leading-relaxed bg-black/20 p-8 rounded-3xl border border-amber-500/5 min-w-0 break-words">
                                            <span className="text-3xl mr-4 underline decoration-amber-500/20 underline-offset-8">💡</span>
                                            {tip.split(' ').map((word, i) => (
                                                <span key={i} className={i % 7 === 0 ? "text-amber-400 font-black" : ""}>{word} </span>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
