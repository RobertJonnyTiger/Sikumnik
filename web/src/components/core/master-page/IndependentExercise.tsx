"use client";

import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Collapse } from "./Collapse";
import { Lightbulb, Trophy } from "lucide-react";

interface IndependentExerciseProps {
    title: string;
    question: string;
    options?: string[];
    difficulty: number;
    hint: string;
    answer: string;
    isExamStyle?: boolean;
}

export const IndependentExercise: React.FC<IndependentExerciseProps> = ({
    title,
    question,
    options,
    difficulty,
    hint,
    answer,
    isExamStyle,
}) => {
    return (
        <div className="mx-auto w-full max-w-md bg-slate-900 border-[8px] border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
            {/* Phone Notch/Speaker */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-16 h-1 bg-slate-700/50 rounded-full" />
            </div>

            {/* Status Bar Mockup */}
            <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] text-slate-500 font-medium">
                <span>9:41</span>
                <div className="flex gap-1">
                    <div className="w-4 h-2.5 bg-slate-600 rounded-sm" />
                    <div className="w-4 h-2.5 bg-slate-600 rounded-sm" />
                    <div className="w-3 h-2.5 bg-green-500/80 rounded-full" />
                </div>
            </div>

            <div className="px-6 py-6 pb-12 font-main relative z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    {isExamStyle && (
                        <div className="absolute top-0 left-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br z-10">
                            שאלת מבחן 🎓
                        </div>
                    )}
                    <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider border border-teal-500/30 px-1.5 py-0.5 rounded">
                        רמת קושי: {"⭐".repeat(difficulty)}
                    </span>
                </div>
                {title && (
                    <h3 className="text-xl font-black text-white mb-2 tracking-wide">{title}</h3>
                )}
                <div className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap mb-4">
                    {question.split('?').map((part, i, arr) => (
                        <span key={i}>
                            {part}{i < arr.length - 1 ? '?' : ''}
                            {i < arr.length - 1 && <br />}
                        </span>
                    ))}
                </div>

                {options && options.length > 0 && (
                    <div className="space-y-2 mt-4">
                        {options.map((option, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 text-sm font-bold border border-slate-700">
                                    {idx + 1}
                                </span>
                                <span className="text-slate-300 text-base">{option}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 flex flex-col gap-2">
                <Collapse
                    title={
                        <div className="flex items-center gap-2 text-yellow-500 text-sm">
                            <Lightbulb size={16} />
                            <span>רמז</span>
                        </div>
                    }
                    headerClassName="bg-yellow-950/10 hover:bg-yellow-950/20 border-yellow-900/20 py-1.5 px-3"
                >
                    <p className="text-slate-300 text-sm">{hint}</p>
                </Collapse>

                <Collapse
                    title={
                        <div className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm">
                            <Trophy size={16} />
                            <span>בדיקת תשובה</span>
                        </div>
                    }
                    headerClassName="py-1.5 px-3"
                >
                    <p className="text-base font-bold text-center py-2 text-slate-100">
                        {answer}
                    </p>
                </Collapse>
            </div>
        </div>
    );
};
