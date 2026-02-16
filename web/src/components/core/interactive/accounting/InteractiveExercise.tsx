"use client";

import { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, ChevronLeft, Sparkles } from "lucide-react";

const TABLE_LINE_REGEX = /^([┌│├└])/;
const ROW_CELL_REGEX = /│/g;
const BOLD_FORMAT_REGEX = /(\*\*.*?\*\*|_.*?_|💡.*)/g;

interface InteractiveExerciseProps {
    question: string;
    answer?: string;
    solution?: string;
    hint?: string;
    tip?: string;
}

export const InteractiveExercise = memo(function InteractiveExercise({ question, answer, solution, hint, tip }: InteractiveExerciseProps) {
    const finalAnswer = answer || solution || "";
    const finalHint = hint || tip;
    const [showSolution, setShowSolution] = useState(false);

    // Advanced Parser to detect ASCII tables and render them as HTML
    const renderContent = (text: string) => {
        if (!text) return null;

        // Detect ASCII table patterns
        const tableLines = text.split("\n").filter(l => TABLE_LINE_REGEX.test(l.trim()));

        if (tableLines.length > 5) {
            // It's an ASCII table. Let's find the rows.
            const rows = text.split("\n")
                .filter(l => l.trim().startsWith("│"))
                .map(l => l.split(ROW_CELL_REGEX).filter(cell => cell.trim().length > 0 || l.includes("││")).map(c => c.trim()));

            if (rows.length > 0) {
                const header = rows[0];
                const dataRows = rows.slice(1);

                return (
                    <div className="my-8 overflow-x-auto rounded-3xl border border-white/10 bg-black/40 shadow-inner">
                        <table className="w-full text-base md:text-lg border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 font-black text-[#93c5fd] uppercase text-xs md:text-sm tracking-[0.2em]">
                                    {header.map((h, i) => <th key={i} className="py-6 px-6 text-right font-black">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {dataRows.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors group">
                                        {row.map((cell, j) => (
                                            <td key={j} className={cn(
                                                "py-6 px-6 text-slate-100 font-medium",
                                                cell.includes("**") && "font-black text-[#fbbf24]"
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
        }

        // Standard rich text formatting
        return text.split("\n").map((line, i) => {
            if (line.trim().length === 0) return <div key={i} className="h-4" />;

            const formattedLine = line.split(BOLD_FORMAT_REGEX).map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={j} className="text-white font-black underline decoration-[#fbbf24]/50 decoration-2 underline-offset-8">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith("_") && part.endsWith("_")) {
                    return <span key={j} className="text-[#fbbf24] italic font-medium px-2 py-0.5 bg-[#fbbf24]/5 rounded">{part.slice(1, -1)}</span>;
                }
                if (part.startsWith("💡")) {
                    return <span key={j} className="text-[#93c5fd] font-bold block mt-4 border-r-4 border-[#93c5fd] pr-4">{part}</span>;
                }
                return part;
            });

            return (
                <p key={i} className={cn(
                    "mb-4 leading-relaxed text-xl md:text-2xl font-sans",
                    line.includes(":") ? "text-white font-bold text-2xl mb-6" : "text-slate-200 font-light"
                )}>
                    {formattedLine}
                </p>
            );
        });
    };

    return (
        <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6] via-[#fbbf24] to-[#3b82f6] rounded-[3rem] blur-xl opacity-0 group-hover:opacity-10 transition duration-700" />

            <div className={cn(
                "relative bg-[#1e293b]/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl transition-all duration-500 hover:bg-[#1e293b]/60",
                showSolution ? "overflow-visible" : "overflow-hidden" // Removed overflow-hidden when expanded to fix cutting
            )}>
                {/* Visual Header Strip */}
                <div className="h-3 w-full bg-gradient-to-r from-[#3b82f6] via-[#fbbf24] to-[#3b82f6]" />

                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-8">
                        <div className="bg-[#3b82f6] p-5 rounded-3xl shadow-xl shadow-[#3b82f6]/30 flex-shrink-0 animate-pulse">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black text-[#93c5fd] uppercase tracking-widest font-sans">שאלה</span>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            <div className="min-h-[100px]">
                                {renderContent(question)}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 pt-6">
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className={cn(
                                        "flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl active:scale-95 group/btn",
                                        showSolution
                                            ? "bg-white/10 text-white border border-white/20"
                                            : "bg-[#3b82f6] text-white shadow-[#3b82f6]/40 border border-[#3b82f6]/50 hover:bg-[#3b82f6]/80 hover:translate-y-[-2px]"
                                    )}
                                >
                                    <span>{showSolution ? "הסתר פתרון" : "חשוף את האמת הדיגיטלית"}</span>
                                    <ChevronLeft className={cn("w-6 h-6 transition-transform duration-500", showSolution && "rotate-[-90deg]", !showSolution && "group-hover/btn:translate-x-[-4px]")} />
                                </button>

                                {finalHint && !showSolution && (
                                    <div className="flex items-center gap-4 text-slate-400 hover:text-[#fbbf24] transition-all cursor-help group/hint px-6 py-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-[#fbbf24]/20">
                                        <Sparkles className="w-5 h-5 text-[#93c5fd] animate-pulse" />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] font-sans underline underline-offset-4">לחש רמז קדום</span>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-80 p-6 bg-[#0f172a] border border-white/10 rounded-[2rem] text-sm text-slate-100 font-sans font-light hidden group-hover/hint:block animate-in fade-in zoom-in-95 duration-300 shadow-3xl z-50">
                                            <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                                                <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#fbbf24]">Wisdom Drop</span>
                                            </div>
                                            {finalHint}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {showSolution && (
                                <div className="mt-14 p-10 md:p-14 bg-black/50 rounded-[3rem] border-r-8 border-[#fbbf24] animate-in fade-in slide-in-from-top-10 duration-1000 shadow-inner relative">
                                    <div className="absolute top-0 right-0 p-8">
                                        <div className="bg-[#fbbf24]/10 p-2 rounded-lg">
                                            <Sparkles className="w-5 h-5 text-[#fbbf24]" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mb-10">
                                        <h4 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.5em] font-sans leading-none">הפתרון הנגלה</h4>
                                        <div className="h-[1px] w-12 bg-[#fbbf24]/20" />
                                    </div>
                                    <div className="space-y-6">
                                        {renderContent(finalAnswer)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
