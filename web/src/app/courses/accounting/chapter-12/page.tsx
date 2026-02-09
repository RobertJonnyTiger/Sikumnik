"use client";

import React, { useState } from "react";
import Link from "next/link";
import chapterData from "@/data/chapters/chapter-12.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import {
    Search,
    GraduationCap,
    Lightbulb,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    TrendingUp,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chapter12Page() {
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    let conceptIndex = 0;

    // Helper to format step text with bold, underline, italic
    const formatStepText = (text: string) => {
        if (!text) return null;

        // Handle numbered lists (e.g. "1. Step")
        const numberedMatch = text.match(/^(\d+\.)\s*(.*)/);
        if (numberedMatch) {
            return (
                <div className="flex gap-6 items-start group/step hover:translate-x-[-8px] transition-transform duration-500 py-3">
                    <span className="text-[#00f3ff] font-black text-2xl italic bg-[#00f3ff]/10 px-3 py-1 rounded-xl min-w-[50px] text-center shadow-[0_0_15px_rgba(0,243,255,0.1)]">{numberedMatch[1]}</span>
                    <span className="text-slate-100 font-rubik font-medium text-2xl leading-relaxed flex-1">
                        {renderRichText(numberedMatch[2])}
                    </span>
                </div>
            );
        }

        // Handle bullet points
        if (text.startsWith("•") || text.startsWith("-") || text.startsWith("📌")) {
            return (
                <div className="flex gap-6 items-start py-3">
                    <span className="text-[#3713ec] mt-2.5 shrink-0">
                        {text.startsWith("📌") ? <Sparkles className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#3713ec] to-[#00f3ff]" />}
                    </span>
                    <span className="text-slate-100 font-rubik font-bold text-2xl leading-relaxed">
                        {renderRichText(text.replace(/^[•\-📌]\s*/, ""))}
                    </span>
                </div>
            );
        }

        return <p className="text-slate-300 font-rubik font-light text-2xl leading-relaxed py-3 pr-10">{renderRichText(text)}</p>;
    };

    const renderRichText = (text: string) => {
        // Simple formatting for bold/underline
        return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-white font-black underline decoration-[#00f3ff]/40 decoration-4 underline-offset-8">{part.slice(2, -2)}</strong>;
            }
            // Underline: _text_
            return part.split(/(_.*?_)/g).map((subPart, j) => {
                if (subPart.startsWith("_") && subPart.endsWith("_")) {
                    return <u key={j} className="text-[#00f3ff] decoration-[#00f3ff]/20 decoration-2 underline-offset-8 px-1 bg-[#00f3ff]/5 rounded-lg no-underline">{subPart.slice(1, -1)}</u>;
                }
                return subPart;
            });
        });
    };

    return (
        <div className="min-h-screen bg-[#0a051e] text-slate-100 flex flex-col font-sans selection:bg-[#3713ec]/40 selection:text-[#00f3ff]" dir="rtl">

            {/* Top Navigation Bar - Switched to Rubik */}
            <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#0a051e]/80 border-b border-white/5 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
                        <div className="bg-[#3713ec] p-3 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(55,19,236,0.6)] group-hover:scale-110 transition-transform duration-700">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <span className="font-rubik font-black text-3xl tracking-tighter text-white">SIKUMNIK</span>
                    </Link>
                </div>

                <nav className="flex-1 px-12 hidden md:block">
                    <p className="text-[10px] md:text-sm uppercase font-black tracking-[0.3em] text-[#3713ec] font-rubik">
                        <span className="opacity-30">Home &gt; Accounting &gt; </span>
                        {chapterData.title}
                    </p>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <Search className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" />
                    </button>
                    <div className="w-12 h-12 rounded-full border-2 border-[#3713ec]/30 overflow-hidden bg-gradient-to-tr from-[#3713ec] to-[#00f3ff] p-[2px] cursor-pointer hover:border-[#00f3ff]/50 transition-all">
                        <div className="w-full h-full rounded-full bg-[#0a051e] flex items-center justify-center text-[10px] font-black italic">SA</div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-4xl mx-auto w-full px-8 pt-24 pb-48 relative">

                {/* Visual Ambient - Modern Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-[1000px] bg-gradient-to-b from-[#3713ec]/10 via-[#00f3ff]/5 to-transparent blur-[160px] -z-10 pointer-events-none opacity-40" />

                <article className="space-y-32">

                    {/* Chapter Header - Pure Modern Rubik */}
                    <header className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#3713ec]/20 text-[#00f3ff] font-black text-xs md:text-sm px-6 py-2 rounded-full border border-[#00f3ff]/20 tracking-[0.3em] uppercase font-rubik">
                                PERAK 12
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9] font-rubik">
                            {chapterData.title}
                        </h1>
                        <p className="text-2xl md:text-4xl text-slate-400 font-rubik font-light leading-relaxed max-w-3xl">
                            {chapterData.summary}
                        </p>
                    </header>

                    {/* Central Logic Card */}
                    <section className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#3713ec] via-[#00f3ff] to-[#3713ec] rounded-[3rem] blur-2xl opacity-10 animate-pulse" />
                        <div className="relative bg-[#1e1933]/60 backdrop-blur-3xl p-14 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="bg-[#3713ec] p-4 rounded-3xl shadow-xl shadow-[#3713ec]/40">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-widest uppercase font-rubik">שיטת העבודה</h3>
                            </div>
                            <div className="text-center space-y-12">
                                <p className="text-4xl md:text-6xl text-slate-100 font-rubik font-light leading-snug">
                                    ככל שהחוב <span className="font-black text-[#00f3ff] underline decoration-[#00f3ff]/20 underline-offset-[16px]">ישן יותר</span> <br />
                                    <span className="text-4xl opacity-20 inline-block rotate-90 md:rotate-0 my-4">→</span>
                                    ההפרשה <span className="font-black text-[#00f3ff] underline decoration-[#00f3ff]/20 underline-offset-[16px]">גבוהה יותר</span>
                                </p>
                                <div className="flex flex-wrap justify-center items-center gap-6">
                                    <div className="px-8 py-4 bg-green-500/10 text-green-400 rounded-3xl border border-green-500/20 text-lg font-black font-rubik shadow-2xl">שוטף: 1-2%</div>
                                    <div className="px-8 py-4 bg-orange-500/10 text-orange-400 rounded-3xl border border-orange-500/20 text-lg font-black font-rubik shadow-2xl">פיגור: 15-30%</div>
                                    <div className="px-8 py-4 bg-red-500/10 text-red-400 rounded-3xl border border-red-500/20 text-lg font-black font-rubik shadow-2xl">אבוד: 60-80%</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content Sections */}
                    <div className="space-y-32">
                        {(chapterData.sections as any[]).map((section: any, index: number) => {
                            if (section.type === "concept") {
                                const currentConceptIndex = conceptIndex++;
                                return (
                                    <ConceptCard
                                        key={index}
                                        index={currentConceptIndex}
                                        title={section.title}
                                        academicText={section.academic_text || ""}
                                        analogyText={section.analogy_text || ""}
                                    />
                                );
                            }
                            if (section.type === "calculation") {
                                return (
                                    <section key={index} className="scroll-mt-32">
                                        <CalculationBlock data={section as any} />
                                    </section>
                                );
                            }
                            if (section.type === "table") {
                                return (
                                    <div key={index} className="space-y-12">
                                        <div className="flex items-center gap-6">
                                            <div className="w-2 h-10 bg-gradient-to-b from-[#3713ec] to-[#00f3ff] rounded-full shadow-[0_0_25px_rgba(55,19,236,0.8)]" />
                                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight font-rubik">{section.title}</h3>
                                        </div>
                                        <div className="overflow-x-auto rounded-[3.5rem] border border-white/10 bg-[#1e1933]/50 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                                            <table className="w-full text-xl md:text-2xl border-collapse">
                                                <thead>
                                                    <tr className="bg-white/[0.03]">
                                                        {section.headers?.map((h: string, i: number) => (
                                                            <th key={i} className="text-right py-10 px-10 temple-table-header text-lg font-black bg-[#3713ec]/10">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {section.rows?.map((row: string[], i: number) => (
                                                        <tr key={i} className="temple-table-row group">
                                                            {row.map((cell: string, j: number) => (
                                                                <td key={j} className={cn(
                                                                    "temple-table-cell py-10 px-10 font-rubik",
                                                                    i === section.rows.length - 1 && "font-black text-3xl text-white bg-[#00f3ff]/5"
                                                                )}>
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Worked Example - Large solver */}
                    {chapterData.worked_example && (
                        <section className="pt-32">
                            <div className="bg-[#1e1933]/40 border border-white/10 rounded-[4rem] overflow-hidden transition-all duration-700 hover:bg-[#1e1933]/70 group relative shadow-3xl">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3713ec] via-[#00f3ff] to-[#3713ec] opacity-60" />

                                <button
                                    onClick={() => setShowWorkedExample(!showWorkedExample)}
                                    className="w-full flex items-center justify-between p-14 text-right group-hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-center gap-12">
                                        <div className="bg-[#3713ec] p-6 rounded-[2rem] shadow-2xl shadow-[#3713ec]/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                            <Sparkles className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <span className="block text-[#00f3ff] font-black text-xs md:text-sm uppercase tracking-[0.5em] mb-3 opacity-70 font-rubik">The Master Sanctuary Guide</span>
                                            <span className="block text-white font-black text-4xl md:text-5xl tracking-tight font-rubik">{chapterData.worked_example.title}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-full border border-white/10 group-hover:bg-[#3713ec] group-hover:scale-110 transition-all duration-700">
                                        {showWorkedExample ? <ChevronUp className="w-8 h-8 text-white" /> : <ChevronDown className="w-8 h-8 text-white" />}
                                    </div>
                                </button>

                                {showWorkedExample && (
                                    <div className="p-14 pt-0 space-y-16 animate-in fade-in slide-in-from-top-12 duration-1000">
                                        <div className="text-2xl md:text-3xl text-slate-200 font-rubik font-light leading-relaxed border-t border-white/5 pt-16 border-dashed">
                                            <p className="border-r-8 border-[#3713ec]/40 pr-8 italic bg-white/[0.02] py-8 rounded-l-3xl">"{chapterData.worked_example.scenario}"</p>
                                        </div>

                                        {/* Company Context Data */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {chapterData.worked_example.data.map((item: any, i: number) => (
                                                <div key={i} className="bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/10 hover:border-[#3713ec]/50 transition-all hover:translate-y-[-8px] group/data">
                                                    <span className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover/data:text-[#00f3ff] transition-colors font-rubik">{item.item}</span>
                                                    <span className="block text-3xl text-white font-black font-rubik">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Deep Solution Steps */}
                                        <div className="space-y-14">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-[2px] bg-gradient-to-l from-[#3713ec] to-transparent" />
                                                <h4 className="text-white font-black text-4xl font-rubik tracking-tight">נתיב הפתרון</h4>
                                            </div>
                                            <div className="space-y-10">
                                                {(chapterData.worked_example.solution_steps as any[]).map((step, i) => {
                                                    if (typeof step === "string" && step.trim().length > 0) {
                                                        return <div key={i} className="px-4">{formatStepText(step)}</div>;
                                                    }
                                                    if (step.type === "table") {
                                                        return (
                                                            <div key={i} className="my-14 overflow-x-auto rounded-[3rem] border border-white/10 bg-black/60 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group/table">
                                                                <table className="w-full text-xl md:text-2xl">
                                                                    <thead>
                                                                        <tr className="border-b border-white/10 bg-[#3713ec]/20 font-black text-[#a78bfa] uppercase text-xs md:text-sm tracking-[0.4em] font-rubik">
                                                                            {step.headers.map((h: string, j: number) => <th key={j} className="py-8 px-10 text-right whitespace-nowrap">{h}</th>)}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {step.rows.map((row: string[], j: number) => (
                                                                            <tr key={j} className="border-b border-white/5 last:border-0 hover:bg-white/[0.05] transition-all">
                                                                                {row.map((cell: string, k: number) => (
                                                                                    <td key={k} className={cn(
                                                                                        "py-8 px-10 text-slate-100 font-medium whitespace-nowrap font-rubik",
                                                                                        cell.includes("**") && "text-[#00f3ff] font-black text-3xl"
                                                                                    )}>
                                                                                        {cell.replace(/\*\*/g, "")}
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>

                                        {/* Premium Key Insight */}
                                        <div className="p-14 bg-gradient-to-br from-[#3713ec]/30 via-[#0a051e]/80 to-[#00f3ff]/20 border border-[#3713ec]/50 rounded-[4rem] relative overflow-hidden group/insight shadow-2xl">
                                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#00f3ff]/10 blur-[120px] opacity-0 group-hover/insight:opacity-100 transition-opacity duration-1000" />
                                            <div className="flex items-start gap-12 relative z-10">
                                                <div className="bg-white p-5 rounded-[2rem] shadow-3xl animate-bounce">
                                                    <Lightbulb className="w-10 h-10 text-[#3713ec]" />
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-white font-black text-3xl md:text-4xl leading-snug font-rubik">
                                                        {chapterData.worked_example.key_insight}
                                                    </p>
                                                    <p className="text-[#a78bfa] text-sm font-black uppercase tracking-[0.6em] opacity-40 font-rubik">Priesthood Wisdom</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Exercises Section */}
                    {chapterData.exercises && (
                        <section className="pt-40 space-y-24">
                            <div className="flex flex-col items-center text-center space-y-12">
                                <div className="w-3 h-20 bg-gradient-to-b from-[#3713ec] to-[#00f3ff] rounded-full animate-pulse" />
                                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none font-rubik">
                                    קרב מוחות
                                </h2>
                                <p className="text-slate-500 font-rubik font-light text-2xl md:text-3xl max-w-2xl">
                                    הוכח את שליטתך בנבכי ההפרשה לחומ"ס
                                </p>
                            </div>
                            <div className="space-y-16">
                                {chapterData.exercises.map((exercise: any, idx: number) => (
                                    <InteractiveExercise
                                        key={idx}
                                        question={exercise.question}
                                        answer={exercise.solution}
                                        hint={exercise.tip}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>

            {/* Fixed Navigation: Journey Controls */}
            <nav className="fixed bottom-0 left-0 w-full backdrop-blur-[60px] bg-[#0a051e]/90 border-t border-white/5 p-8 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-10">
                    <Link href="/courses/accounting/chapter-11" className="flex-1">
                        <button className="w-full flex items-center justify-center gap-6 py-8 rounded-[2.5rem] bg-white/5 hover:bg-white/10 text-slate-300 font-rubik font-black transition-all border border-white/10 group shadow-2xl">
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                            <span className="text-2xl">פרק 11</span>
                        </button>
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-6 py-8 rounded-[2.5rem] bg-gradient-to-r from-[#3713ec] to-[#3713ec]/80 text-white font-rubik font-black text-2xl transition-all shadow-[0_20px_50px_rgba(55,19,236,0.6)] active:scale-95 border border-[#3713ec]/50 group">
                        <span>סגור פרק</span>
                        <ArrowLeft className="w-8 h-8 group-hover:translate-x-[-8px] transition-transform duration-500" />
                    </button>
                </div>
            </nav>
        </div>
    );
}
