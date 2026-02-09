"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { BrainCircuit, Eye, HelpCircle } from "lucide-react";

interface IndependentExercise {
    difficulty: number;
    question: string;
    hint: string;
    answer: string;
    isExamStyle?: boolean;
}

interface IndependentExercisesProps {
    data: IndependentExercise[];
}

export const IndependentExercises: React.FC<IndependentExercisesProps> = ({ data }) => {
    const formatQuestion = (question: string) => {
        // Truth 2.1: Proactive splitting on transition keywords to ensure new lines
        const transitionKeywords = ['קדימה', 'ערוך', 'ערכי', 'חשבו', 'חשב', 'דרישה', 'נדרש', 'אורך'];
        let processedQuestion = question.replace(/;/g, '\n');

        transitionKeywords.forEach(kw => {
            const regex = new RegExp(`(${kw})`, 'g');
            processedQuestion = processedQuestion.replace(regex, '\n$1');
        });

        const lines = processedQuestion.split('\n').filter(l => l.trim());

        return lines.map((line, i) => {
            const trimmedLine = line.trim();
            const isDataRow = /^[\u0590-\u05FF\s\-]+ [\d,]+$/.test(trimmedLine);
            const isDemand = trimmedLine.includes('דרישה') || trimmedLine.includes('חשבו') || trimmedLine.includes('מצופה') || trimmedLine.includes('ציינו') || trimmedLine.includes('חשב') || trimmedLine.includes('ערוך') || trimmedLine.includes('כמה') || trimmedLine.includes('קדימה') || trimmedLine.includes('אורך');

            if (isDataRow) {
                const parts = trimmedLine.split(/\s+([\d,]+)$/);
                return (
                    <div key={i} className="flex justify-between items-center py-3 px-8 border-b border-border/10 bg-background/20 font-main text-lg md:text-xl transition-colors">
                        <span className="text-foreground font-medium">{parts[0]}</span>
                        <span className="font-black text-white">{parts[1]}</span>
                    </div>
                );
            }

            if (isDemand) {
                return (
                    <div key={i} className="mt-10 bg-accent/10 border-r-8 border-accent p-10 rounded-l-4xl shadow-2xl group/demand relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 blur-3xl -z-10" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-accent p-3 rounded-2xl text-black shadow-premium">
                                <HelpCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="text-lg font-black text-accent uppercase tracking-[0.2em]">הדרישה לשלב הזה</span>
                                <div className="h-1.5 w-16 bg-accent/40 mt-1" />
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-white leading-relaxed">
                            {trimmedLine.split(' ').map((word, wordIdx) => {
                                const isHigh = wordIdx % 6 === 0 || word.includes('ש\"ח');
                                return <span key={wordIdx} className={isHigh ? "text-accent font-black" : ""}>{word}{' '}</span>;
                            })}
                        </p>
                    </div>
                );
            }

            return (
                <p key={i} className="text-xl md:text-2xl text-foreground font-medium leading-relaxed py-3 px-4 mb-2">
                    {trimmedLine.split(' ').map((word, wordIdx) => {
                        const isHigh = wordIdx % 10 === 0 || word.includes('נתון');
                        return <span key={wordIdx} className={isHigh ? "text-primary font-bold" : ""}>{word}{' '}</span>;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="w-full my-24 space-y-12">
            <div className="flex items-center gap-6 border-b-2 border-border/40 pb-8">
                <div className="p-4 bg-accent/10 rounded-2xl text-accent shadow-premium border border-accent/20">
                    <BrainCircuit className="w-10 h-10" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">עכשיו תורך</h2>
                    <div className="text-secondary font-bold text-sm uppercase tracking-[0.2em] mt-1 opacity-70">תרגול עצמאי לווינרים</div>
                </div>
            </div>

            <div className="grid gap-10">
                {data.map((ex, idx) => (
                    <div key={idx} className={`
                        relative bg-card/40 backdrop-blur-md border rounded-4xl p-8 md:p-12 shadow-2xl overflow-hidden transition-all duration-500 hover:bg-card/60
                        ${ex.isExamStyle ? "border-accent/40 bg-accent/5" : "border-border/40"}
                    `}>
                        {ex.isExamStyle && (
                            <div className="absolute top-0 left-0 bg-accent text-black text-xs font-black px-6 py-2 rounded-br-2xl shadow-premium uppercase tracking-widest">
                                שאלת מבחן פופולרית 🎓
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-10">
                            <span className="text-primary font-black text-2xl bg-primary/10 px-6 py-2 rounded-2xl border border-primary/20 shadow-premium">תרגיל {idx + 1}</span>
                            <div className="flex gap-1.5 bg-background/50 p-2 rounded-xl border border-border/20">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <span key={i} className={`text-xl ${i < ex.difficulty ? "text-primary drop-shadow-neon" : "text-muted/20"
                                        }`}>★</span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10">
                            {formatQuestion(ex.question)}
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="hint" className="border-2 border-accent/20 rounded-3xl overflow-hidden bg-accent/5 transition-all hover:bg-accent/10">
                                <AccordionTrigger className="px-8 py-6 hover:no-underline text-xl font-black text-accent/80 transition-all border-b border-accent/10">
                                    <span className="flex items-center gap-4">
                                        <HelpCircle className="w-7 h-7" />
                                        צריך רמז של אלופים?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="p-8 text-2xl md:text-3xl text-white font-black leading-relaxed">
                                    {ex.hint}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="answer" className="border-2 border-primary/20 rounded-3xl overflow-hidden bg-primary/5 transition-all hover:bg-primary/10">
                                <AccordionTrigger className="px-8 py-6 hover:no-underline text-xl font-black text-primary transition-all border-b border-primary/10">
                                    <span className="flex items-center gap-4">
                                        <Eye className="w-7 h-7" />
                                        מה התשובה הסופית?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="p-8">
                                    <div className="p-10 bg-primary/20 rounded-4xl border-4 border-primary/40 text-4xl md:text-5xl font-black text-center text-white shadow-premium animate-in fade-in zoom-in duration-500">
                                        {ex.answer}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};
