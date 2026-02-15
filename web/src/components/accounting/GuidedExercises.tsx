"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Calculator, Lightbulb, Target, Trophy, CheckCircle2, HelpCircle } from "lucide-react";

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
        // Truth 2.1: Proactive splitting on transition keywords to ensure new lines
        const transitionKeywords = ['קדימה', 'ערוך', 'ערכי', 'חשבו', 'חשב', 'דרישה', 'נדרש'];
        let processedQuestion = question.replace(/;/g, '\n');

        transitionKeywords.forEach(kw => {
            const regex = new RegExp(`(${kw})`, 'g');
            processedQuestion = processedQuestion.replace(regex, '\n$1');
        });

        const lines = processedQuestion.split('\n').filter(l => l.trim());

        return lines.map((line, i) => {
            const trimmedLine = line.trim();
            // Data Table Detection Pattern: "Label Amount" (e.g., "מזומן 40,000")
            const isDataRow = /^[\u0590-\u05FF\s\-]+ [\d,]+$/.test(trimmedLine);
            const isDemand = trimmedLine.includes('דרישה') || trimmedLine.includes('חשבו') || trimmedLine.includes('ערכו') || trimmedLine.includes('כמה') || trimmedLine.includes('באיזה') || trimmedLine.includes('ערוך') || trimmedLine.includes('קדימה');

            if (isDataRow) {
                const parts = trimmedLine.split(/\s+([\d,]+)$/);
                return (
                    <div key={i} className="flex justify-between items-center py-3 px-8 border-b border-border/10 bg-background/20 font-main text-lg md:text-xl group-hover:bg-background/40 transition-colors">
                        <span className="text-foreground/90 font-medium">{parts[0]}</span>
                        <span className="font-black text-white">{parts[1]}</span>
                    </div>
                );
            }

            if (isDemand) {
                return (
                    <div key={i} className="mt-10 bg-primary/10 border-r-8 border-primary p-10 rounded-l-4xl shadow-2xl group/demand relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-primary p-3 rounded-2xl text-black shadow-premium">
                                <HelpCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">הדרישה של המקצוענים</span>
                                <div className="h-1 w-12 bg-primary/30 mt-1" />
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-white leading-relaxed">
                            {trimmedLine.split(' ').map((word, wordIdx) => {
                                const isHigh = wordIdx % 6 === 0 || word.includes('ש\"ח');
                                return <span key={wordIdx} className={isHigh ? "text-primary font-black" : ""}>{word}{' '}</span>;
                            })}
                        </p>
                    </div>
                );
            }

            return (
                <p key={i} className="text-xl md:text-2xl text-foreground/90 leading-relaxed py-3 px-4 mb-2">
                    {trimmedLine.split(' ').map((word, wordIdx) => {
                        const isHigh = wordIdx % 10 === 0 || word.includes('יתר');
                        return <span key={wordIdx} className={isHigh ? "text-primary font-bold" : ""}>{word}{' '}</span>;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="w-full my-24 space-y-20">
            <div className="text-right mb-12 border-r-8 border-primary pr-8 py-4">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4">תרגילים מודרכים</h2>
                <p className="text-2xl text-muted-foreground font-medium">צעד-אחר-צעד עד הניצחון על החומר</p>
            </div>

            {data.map((exercise, idx) => (
                <div key={idx} className="bg-card/30 backdrop-blur-xl border-l-4 border-primary rounded-3xl shadow-2xl overflow-hidden group hover:bg-card/50 transition-all duration-500">
                    {/* Header */}
                    <div className="p-8 md:p-12 border-b border-border/40">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-3xl font-black text-white flex items-center gap-4">
                                <span className="bg-primary text-black w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-premium">
                                    {idx + 1}
                                </span>
                                תרגול מודרך
                            </h3>
                            <div className="flex gap-2 bg-background/50 p-2 rounded-xl border border-border/20">
                                {Array.from({ length: exercise.difficulty }).map((_, i) => (
                                    <span key={i} className="text-2xl drop-shadow-neon">⭐</span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            {formatQuestion(exercise.question)}
                        </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-10">
                        {/* Thinking Direction - Truth 2.1 Refinement */}
                        <div className="bg-indigo-950/40 border-2 border-indigo-500/30 p-10 rounded-4xl flex gap-8 text-indigo-50 items-center shadow-2xl relative overflow-hidden group/hint">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10" />
                            <div className="shrink-0 p-5 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 group-hover/hint:scale-110 transition-transform shadow-premium">
                                <Lightbulb className="w-10 h-10 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-2xl md:text-4xl font-black leading-tight text-white italic">
                                    {(exercise.thinkingDirection || "").split(' ').map((word, i) => {
                                        const isHigh = i % 7 === 0 || word.includes('חשב') || word.includes('ערך');
                                        return <span key={i} className={isHigh ? "text-indigo-400 font-black underline decoration-indigo-500/30 underline-offset-8" : ""}>{word} </span>;
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Steps Accordion */}
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {exercise.steps.map((step, stepIdx) => (
                                <AccordionItem key={stepIdx} value={`step-${stepIdx}`} className="border border-border/40 rounded-2xl overflow-hidden">
                                    <AccordionTrigger className="hover:no-underline hover:bg-primary/5 px-8 py-8 font-black text-3xl text-foreground/90 transition-all border-b border-border/10">
                                        <div className="flex items-center gap-6">
                                            <span className="text-primary font-black text-xl bg-primary/10 px-4 py-1 rounded-xl">צעד {stepIdx + 1}</span>
                                            {step.title}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-10 px-8 pb-10 bg-background/20 space-y-10 border-t border-border/10">
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="bg-primary/5 p-8 rounded-3xl border-2 border-primary/20 shadow-inner group/step">
                                                <div className="font-black text-primary text-[10px] uppercase tracking-[0.4em] mb-4">הפעולה הנדרשת</div>
                                                <p className="font-black text-2xl md:text-3xl text-white leading-relaxed">{step.action}</p>
                                            </div>
                                            <div className="bg-accent/5 p-8 rounded-3xl border-2 border-accent/20 shadow-inner group/step">
                                                <div className="font-black text-accent text-[10px] uppercase tracking-[0.4em] mb-4">ההיגיון המקצועי</div>
                                                <p className="font-black text-2xl md:text-3xl text-white leading-relaxed">{step.reasoning}</p>
                                            </div>
                                        </div>
                                        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-4 text-white font-black bg-primary/20 p-4 px-6 rounded-2xl border-2 border-primary/30 text-2xl shadow-premium">
                                                <Calculator className="w-6 h-6 text-primary" />
                                                {step.calculation}
                                            </div>
                                            <div className="text-success font-black flex items-center gap-3 text-2xl bg-success/5 p-4 px-6 rounded-2xl border-2 border-success/20">
                                                <CheckCircle2 className="w-6 h-6" />
                                                {step.result}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}

                            {/* Final Answer Reveal */}
                            <AccordionItem value="final-answer" className="border-none mt-8">
                                <AccordionTrigger className="bg-primary hover:bg-primary/90 text-black px-10 py-6 rounded-4xl font-black text-3xl justify-center no-underline hover:no-underline shadow-premium group transition-all">
                                    <span className="flex items-center gap-4">
                                        <Trophy className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                                        בדוק אם יצא לך בול
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pt-10 pb-4 text-center">
                                    <div className="inline-block p-10 bg-success/5 border-4 border-success/30 rounded-[3rem] shadow-premium">
                                        <div className="flex items-center justify-center gap-4 text-4xl font-black text-success mb-4">
                                            <Target className="w-10 h-10" />
                                            התוצאה הסופית
                                        </div>
                                        <p className="text-3xl font-black text-white px-8">{exercise.finalAnswer}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            ))}
        </div>
    );
};
