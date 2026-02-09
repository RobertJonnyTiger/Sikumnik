"use client";

import React, { useState } from "react";
import Link from "next/link";
import chapterData from "@/data/chapters/chapter-12.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
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
                    <span className="text-[#fbbf24] font-black text-2xl italic bg-[#fbbf24]/10 px-3 py-1 rounded-xl min-w-[50px] text-center shadow-[0_0_15px_rgba(251,191,36,0.1)]">{numberedMatch[1]}</span>
                    <span className="text-slate-100 font-sans font-medium text-2xl leading-relaxed flex-1">
                        {renderRichText(numberedMatch[2])}
                    </span>
                </div>
            );
        }

        // Handle bullet points
        if (text.startsWith("•") || text.startsWith("-") || text.startsWith("📌")) {
            return (
                <div className="flex gap-6 items-start py-3">
                    <span className="text-[#3b82f6] mt-2.5 shrink-0">
                        {text.startsWith("📌") ? <Sparkles className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#fbbf24]" />}
                    </span>
                    <span className="text-slate-100 font-sans font-bold text-2xl leading-relaxed">
                        {renderRichText(text.replace(/^[•\-📌]\s*/, ""))}
                    </span>
                </div>
            );
        }

        return <p className="text-slate-300 font-sans font-light text-2xl leading-relaxed py-3 pr-10">{renderRichText(text)}</p>;
    };

    const renderRichText = (text: string) => {
        // Simple formatting for bold/underline
        return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-white font-black underline decoration-[#fbbf24]/40 decoration-4 underline-offset-8">{part.slice(2, -2)}</strong>;
            }
            // Underline: _text_
            return part.split(/(_.*?_)/g).map((subPart, j) => {
                if (subPart.startsWith("_") && subPart.endsWith("_")) {
                    return <u key={j} className="text-[#fbbf24] decoration-[#fbbf24]/20 decoration-2 underline-offset-8 px-1 bg-[#fbbf24]/5 rounded-lg no-underline">{subPart.slice(1, -1)}</u>;
                }
                return subPart;
            });
        });
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-[#3b82f6]/40 selection:text-[#fbbf24]" dir="rtl">

            {/* Top Navigation Bar - Compact and Modern */}
            <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#0f172a]/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="bg-[#3b82f6] p-2 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-sans font-black text-xl tracking-tighter text-white">SIKUMNIK</span>
                    </Link>
                </div>

                <nav className="flex-1 px-8 hidden md:block">
                    <p className="text-[10px] md:text-xs uppercase font-black tracking-[0.2em] text-[#3b82f6] font-sans opacity-70">
                        <span className="opacity-40">בית &gt; חשבונאות &gt; </span>
                        {chapterData.title}
                    </p>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                        <Search className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="w-10 h-10 rounded-full border border-[#3b82f6]/30 overflow-hidden bg-gradient-to-tr from-[#3b82f6] to-[#fbbf24] p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-[10px] font-black italic">SA</div>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Increased Top Padding */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-8 pt-24 pb-32 relative">

                {/* Visual Ambient - Subtle Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[700px] bg-gradient-to-b from-[#3b82f6]/5 via-[#fbbf24]/2 to-transparent blur-[120px] -z-10 pointer-events-none opacity-40" />

                <article className="space-y-32">

                    {/* Chapter Header - Refined Size */}
                    <header className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-[#3b82f6]/20 text-[#fbbf24] font-black text-[10px] px-4 py-1.5 rounded-full border border-[#fbbf24]/20 tracking-[0.2em] uppercase font-sans">
                                PERAK 12
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight font-sans">
                            {chapterData.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-sans font-light leading-relaxed max-w-2xl">
                            {chapterData.summary}
                        </p>
                    </header>

                    {/* Central Logic Card - Scaled Down with Animation */}
                    <section className="relative max-w-3xl animate-entry" style={{ animationDelay: '200ms' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6] via-[#fbbf24] to-[#3b82f6] rounded-[2rem] blur-xl opacity-10" />
                        <div className="relative bg-[#1e293b]/60 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 shadow-2xl hover-lift">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#3b82f6] p-2.5 rounded-xl">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-white tracking-widest uppercase font-sans">שיטת העבודה</h3>
                            </div>
                            <div className="text-center space-y-6">
                                <p className="text-2xl md:text-3xl text-slate-100 font-sans font-light leading-snug">
                                    ככל שהחוב <span className="font-black text-[#fbbf24] underline decoration-[#fbbf24]/20 underline-offset-8">ישן יותר</span>
                                    <span className="text-2xl opacity-20 mx-4">→</span>
                                    ההפרשה <span className="font-black text-[#fbbf24] underline decoration-[#fbbf24]/20 underline-offset-8">גבוהה יותר</span>
                                </p>
                                <div className="flex flex-wrap justify-center items-center gap-4">
                                    <div className="px-6 py-3 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20 text-sm font-black font-sans shadow-lg hover:bg-green-500/20 transition-colors">שוטף: 1-2%</div>
                                    <div className="px-6 py-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20 text-sm font-black font-sans shadow-lg hover:bg-orange-500/20 transition-colors">פיגור: 15-30%</div>
                                    <div className="px-6 py-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 text-sm font-black font-sans shadow-lg hover:bg-red-500/20 transition-colors">אבוד: 60-80%</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content Sections - 2 Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                        {(chapterData.sections as any[]).map((section: any, index: number) => {
                            if (section.type === "concept") {
                                const currentConceptIndex = conceptIndex++;
                                return (
                                    <div key={index} className="lg:odd:col-span-1 lg:even:col-span-1 animate-entry" style={{ animationDelay: `${400 + index * 100}ms` }}>
                                        <ConceptCard
                                            index={currentConceptIndex}
                                            title={section.title}
                                            academicText={section.academic_text || ""}
                                            analogyText={section.analogy_text || ""}
                                        />
                                    </div>
                                );
                            }
                            if (section.type === "calculation") {
                                return (
                                    <section key={index} className="scroll-mt-32 lg:col-span-2">
                                        <CalculationBlock data={section as any} />
                                    </section>
                                );
                            }
                            if (section.type === "table") {
                                return (
                                    <div key={index} className="space-y-6 lg:col-span-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-8 bg-gradient-to-b from-[#3b82f6] to-[#fbbf24] rounded-full" />
                                            <h3 className="text-2xl font-black text-white tracking-tight font-sans">{section.title}</h3>
                                        </div>
                                        <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-[#1e293b]/50 backdrop-blur-3xl shadow-xl">
                                            <table className="w-full text-base md:text-lg border-collapse">
                                                <thead>
                                                    <tr className="bg-white/[0.03]">
                                                        {section.headers?.map((h: string, i: number) => (
                                                            <th key={i} className="text-right py-5 px-6 temple-table-header text-xs font-black bg-[#3b82f6]/10">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {section.rows?.map((row: string[], i: number) => (
                                                        <tr key={i} className="temple-table-row group">
                                                            {row.map((cell: string, j: number) => (
                                                                <td key={j} className={cn(
                                                                    "temple-table-cell py-5 px-6 font-sans",
                                                                    i === section.rows.length - 1 && "font-black text-xl text-white bg-[#fbbf24]/5"
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
                            <div className="bg-[#1e293b]/40 border border-white/10 rounded-[4rem] overflow-hidden transition-all duration-700 hover:bg-[#1e293b]/70 group relative shadow-3xl">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3b82f6] via-[#fbbf24] to-[#3b82f6] opacity-60" />

                                <button
                                    onClick={() => setShowWorkedExample(!showWorkedExample)}
                                    className="w-full flex items-center justify-between p-14 text-right group-hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-center gap-12">
                                        <div className="bg-[#3b82f6] p-6 rounded-[2rem] shadow-2xl shadow-[#3b82f6]/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                            <Sparkles className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <span className="block text-[#fbbf24] font-black text-xs md:text-sm uppercase tracking-[0.5em] mb-3 opacity-70 font-sans">The Master Sanctuary Guide</span>
                                            <span className="block text-white font-black text-4xl md:text-5xl tracking-tight font-sans">{chapterData.worked_example.title}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-full border border-white/10 group-hover:bg-[#3b82f6] group-hover:scale-110 transition-all duration-700">
                                        {showWorkedExample ? <ChevronUp className="w-8 h-8 text-white" /> : <ChevronDown className="w-8 h-8 text-white" />}
                                    </div>
                                </button>

                                {showWorkedExample && (
                                    <div className="p-14 pt-0 space-y-16 animate-in fade-in slide-in-from-top-12 duration-1000">
                                        <div className="text-2xl md:text-3xl text-slate-200 font-handwriting font-light leading-relaxed border-t border-white/5 pt-16 border-dashed">
                                            <p className="border-r-8 border-[#3b82f6]/40 pr-8 italic bg-white/[0.02] py-8 rounded-l-3xl">"{chapterData.worked_example.scenario}"</p>
                                        </div>

                                        {/* Company Context Data */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {chapterData.worked_example.data.map((item: any, i: number) => (
                                                <div key={i} className="bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/10 hover:border-[#3b82f6]/50 transition-all hover:translate-y-[-8px] group/data">
                                                    <span className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover/data:text-[#fbbf24] transition-colors font-sans">{item.item}</span>
                                                    <span className="block text-3xl text-white font-black font-sans">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Deep Solution Steps */}
                                        <div className="space-y-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-[2px] bg-gradient-to-l from-[#3b82f6] to-transparent" />
                                                <h4 className="text-white font-black text-2xl font-sans tracking-tight">נתיב הפתרון</h4>
                                            </div>
                                            <div className="space-y-6">
                                                {(chapterData.worked_example.solution_steps as any[]).map((step, i) => {
                                                    if (typeof step === "string" && step.trim().length > 0) {
                                                        return <div key={i} className="px-4">{formatStepText(step)}</div>;
                                                    }
                                                    if (step.type === "table") {
                                                        return (
                                                            <div key={i} className="my-8 overflow-x-auto rounded-[2rem] border border-white/10 bg-black/60 shadow-inner group/table">
                                                                <table className="w-full text-lg md:text-xl">
                                                                    <thead>
                                                                        <tr className="border-b border-white/10 bg-[#3b82f6]/20 font-black text-[#93c5fd] uppercase text-[10px] tracking-[0.2em] font-sans">
                                                                            {step.headers.map((h: string, j: number) => <th key={j} className="py-6 px-6 text-right whitespace-nowrap">{h}</th>)}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {step.rows.map((row: string[], j: number) => (
                                                                            <tr key={j} className="border-b border-white/5 last:border-0 hover:bg-white/[0.05] transition-all">
                                                                                {row.map((cell: string, k: number) => (
                                                                                    <td key={k} className={cn(
                                                                                        "py-6 px-6 text-slate-100 font-medium whitespace-nowrap font-sans",
                                                                                        cell.includes("**") && "text-[#fbbf24] font-black text-xl"
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
                                        <div className="p-14 bg-gradient-to-br from-[#3b82f6]/30 via-[#0f172a]/80 to-[#fbbf24]/20 border border-[#3b82f6]/50 rounded-[4rem] relative overflow-hidden group/insight shadow-2xl">
                                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#fbbf24]/10 blur-[120px] opacity-0 group-hover/insight:opacity-100 transition-opacity duration-1000" />
                                            <div className="flex items-start gap-12 relative z-10">
                                                <div className="bg-white p-5 rounded-[2rem] shadow-3xl animate-bounce">
                                                    <Lightbulb className="w-10 h-10 text-[#3b82f6]" />
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-white font-black text-3xl md:text-4xl leading-snug font-sans">
                                                        {chapterData.worked_example.key_insight}
                                                    </p>
                                                    <p className="text-[#93c5fd] text-sm font-black uppercase tracking-[0.6em] opacity-40 font-sans">Priesthood Wisdom</p>
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
                        <section className="pt-24 space-y-16">
                            <div className="flex flex-col items-center text-center space-y-8">
                                <div className="w-2 h-12 bg-gradient-to-b from-[#3b82f6] to-[#fbbf24] rounded-full animate-pulse" />
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-sans">
                                    קרב מוחות
                                </h2>
                                <p className="text-slate-500 font-sans font-light text-xl md:text-2xl max-w-xl">
                                    הוכח את שליטתך בנבכי ההפרשה לחומ"ס
                                </p>
                            </div>
                            <div className="space-y-12">
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

            {/* Fixed Navigation: Journey Controls - Compact Footprint */}
            <nav className="fixed bottom-0 left-0 w-full backdrop-blur-[40px] bg-[#0f172a]/80 border-t border-white/5 p-4 z-50">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
                    <Link href="/courses/accounting/chapter-11" className="flex-1">
                        <button className="w-full flex items-center justify-center gap-4 py-3 rounded-[1.5rem] bg-white/5 hover:bg-white/10 text-slate-300 font-sans font-black transition-all border border-white/5 group shadow-xl">
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            <span className="text-lg">פרק 11</span>
                        </button>
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-4 py-3 rounded-[1.5rem] bg-[#3b82f6] text-white font-sans font-black text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 border border-[#3b82f6]/50 group">
                        <span>סגור פרק</span>
                        <ArrowLeft className="w-6 h-6 group-hover:translate-x-[-4px] transition-transform" />
                    </button>
                </div>
            </nav>
        </div>
    );
}
