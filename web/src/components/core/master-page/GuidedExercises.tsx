"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Calculator, Lightbulb, Target, Trophy, CheckCircle2, HelpCircle, BrainCircuit, ArrowLeft } from "lucide-react";
import { formatText } from "@/lib/text-formatting";

interface Step {
    title: string;
    action: string;
    reasoning: string;
    calculation: string;
    result: string;
}

interface Exercise {
    difficulty: number;
    question: string;
    thinkingDirection: string;
    steps: Step[];
    finalAnswer: string;
}

interface GuidedExercisesProps {
    data: Exercise[];
}

export const GuidedExercises: React.FC<GuidedExercisesProps> = ({ data }) => {
    // Helper to split question into Data vs. Demand
    const formatQuestion = (question: string) => {
        // 1. Basic formatting (newlines, etc.)
        const formatted = formatText(question);

        // 2. Split by newlines to process segments
        const lines = formatted.split('\n').filter(l => l.trim());

        return lines.map((line, i) => {
            const trimmedLine = line.trim();
            // Data Table Detection Pattern: "Label Amount" (e.g., "מזומן 40,000")
            // DISABLED: Caused false positives with sentences ending in numbers (e.g. "Total 100")
            const isDataRow = false; // /^[\u0590-\u05FF\s\-]+ [\d,]+$/.test(trimmedLine);
            // Enhanced keyword detection
            const isDemand = ['דרישה', 'חשבו', 'ערכו', 'כמה', 'באיזה', 'ערוך', 'קדימה', 'נדרש'].some(kw => trimmedLine.includes(kw));

            if (isDataRow) {
                const parts = trimmedLine.split(/\s+([\d,]+)$/);
                return (
                    <div key={i} className="flex justify-between items-center py-2 px-6 border-b border-border/10 bg-background/20 font-main text-base group-hover:bg-background/40 transition-colors">
                        <span className="text-foreground/90 font-medium">{parts[0]}</span>
                        <span className="font-bold text-white">{parts[1]}</span>
                    </div>
                );
            }

            if (isDemand) {
                return (
                    <div key={i} className="mt-6 bg-primary/10 border-r-4 border-primary p-6 rounded-l-2xl shadow-xl group/demand relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 blur-2xl -z-10" />
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary p-2 rounded-xl text-black shadow-sm">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">הדרישה של המקצוענים</span>
                                <div className="h-0.5 w-8 bg-primary/30 mt-1" />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-black text-white leading-relaxed">
                            {trimmedLine}
                        </p>
                    </div>
                );
            }

            return (
                <p key={i} className="text-base md:text-lg text-foreground/90 leading-relaxed py-2 px-3 mb-1">
                    {trimmedLine.split(' ').map((word, wordIdx) => {
                        const isHigh = wordIdx % 10 === 0 || word.includes('יתר');
                        return <span key={wordIdx} className={isHigh ? "text-primary font-bold" : ""}>{word}{' '}</span>;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="w-full my-16 space-y-12 font-main">
            <div className="text-right mb-8 border-r-4 border-primary pr-6 py-2">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">תרגילים מודרכים</h2>
                <p className="text-lg text-muted-foreground font-medium">צעד-אחר-צעד עד הניצחון על החומר</p>
            </div>

            {data.map((exercise, idx) => (
                <div key={idx} className="bg-card/30 backdrop-blur-xl border-l-4 border-primary rounded-2xl shadow-2xl overflow-hidden group hover:bg-card/50 transition-all duration-500">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-border/40">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                <span className="bg-primary text-black w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-premium">
                                    {idx + 1}
                                </span>
                                תרגול מודרך
                            </h3>
                            <div className="flex gap-1 bg-background/50 p-1.5 rounded-lg border border-border/20">
                                {Array.from({ length: exercise.difficulty }).map((_, i) => (
                                    <span key={i} className="text-lg drop-shadow-neon">⭐</span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            {formatQuestion(exercise.question)}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Thinking Direction - Truth 2.1 Refinement */}
                        <div className="bg-indigo-950/40 border border-indigo-500/30 p-6 rounded-3xl flex gap-6 text-indigo-50 items-center shadow-2xl relative overflow-hidden group/hint">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10" />
                            <div className="shrink-0 p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                <BrainCircuit className="w-8 h-8 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-indigo-300 text-sm uppercase tracking-[0.2em] mb-2">איך לגשת לשאלה?</h4>
                                <p className="text-lg md:text-xl font-bold leading-relaxed">
                                    {exercise.thinkingDirection}
                                </p>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-4">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {exercise.steps.map((step, stepIdx) => (
                                    <AccordionItem
                                        key={stepIdx}
                                        value={`item-${stepIdx}`}
                                        className="border border-border/40 rounded-2xl bg-card/20 overflow-hidden transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:bg-card/40 data-[state=open]:shadow-lg hover:border-primary/30"
                                    >
                                        <AccordionTrigger className="px-6 py-4 hover:no-underline group/trigger">
                                            <div className="flex gap-4 items-center w-full text-right">
                                                <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border border-primary/20 group-data-[state=open]/trigger:bg-primary group-data-[state=open]/trigger:text-black transition-all duration-300">
                                                    {stepIdx + 1}
                                                </div>
                                                <span className="text-lg md:text-xl font-bold text-foreground/80 group-data-[state=open]/trigger:text-white transition-colors">
                                                    {step.title}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-black/20">
                                            <div className="p-6 space-y-6 border-t border-border/20">
                                                <div className="flex gap-4 bg-primary/5 p-4 rounded-xl border-r-2 border-primary/20">
                                                    <div className="mt-1">
                                                        <Calculator className="w-5 h-5 text-primary/70" />
                                                    </div>
                                                    <div className="font-mono text-lg md:text-xl text-primary font-bold tracking-wide break-all" dir="ltr">
                                                        {step.calculation}
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                                                        {step.reasoning}
                                                    </p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}

                                {/* Final Answer Section - Truth 2.1 Refinement */}
                                <AccordionItem
                                    value="final-answer"
                                    className="border border-success/30 rounded-2xl bg-success/5 overflow-hidden transition-all duration-300 data-[state=open]:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]"
                                >
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline group/trigger">
                                        <div className="flex gap-4 items-center w-full text-right">
                                            <div className="bg-success/10 text-success w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border border-success/20 group-data-[state=open]/trigger:bg-success group-data-[state=open]/trigger:text-black transition-all duration-300">
                                                🏁
                                            </div>
                                            <span className="text-lg md:text-xl font-bold text-foreground/80 group-data-[state=open]/trigger:text-white transition-colors">
                                                בדוק אם יצא לך בול
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-8 pb-3 text-center bg-black/20">
                                        <div className="inline-block p-8 bg-success/5 border-2 border-success/30 rounded-[2.5rem] shadow-xl">
                                            <div className="flex items-center justify-center gap-3 text-2xl font-black text-success mb-3">
                                                <Target className="w-6 h-6" />
                                                התוצאה הסופית
                                            </div>
                                            <p className="text-xl font-black text-white px-6">{exercise.finalAnswer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div >
                    </div >
                </div>
            ))}
        </div >
    );
};
