"use client";

import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Collapse } from "./Collapse";
import { Lightbulb, Trophy } from "lucide-react";

interface IndependentExerciseProps {
    question: string;
    difficulty: 3 | 4;
    hint: string;
    answer: string;
    isExamStyle?: boolean;
}

export const IndependentExercise: React.FC<IndependentExerciseProps> = ({
    question,
    difficulty,
    hint,
    answer,
    isExamStyle,
}) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-6 last:mb-0">
            <div className="p-6 border-b border-slate-800 bg-slate-950 relative">
                {isExamStyle && (
                    <div className="absolute top-0 left-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-br">
                        שאלת מבחן 🎓
                    </div>
                )}
                <div className="flex justify-between items-start mb-2 mt-2">
                    <span className="text-xs font-bold text-teal-500 uppercase tracking-wider border border-teal-500/30 px-2 py-1 rounded">
                        רמת קושי: {"⭐".repeat(difficulty)}
                    </span>
                </div>
                <h4 className="text-lg font-medium text-slate-100">{question}</h4>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <Collapse
                    title={
                        <div className="flex items-center gap-2 text-yellow-500">
                            <Lightbulb size={18} />
                            <span>רמז</span>
                        </div>
                    }
                    headerClassName="bg-yellow-950/10 hover:bg-yellow-950/20 border-yellow-900/20"
                >
                    <p className="text-slate-300">{hint}</p>
                </Collapse>

                <Collapse
                    title={
                        <div className="flex items-center gap-2 text-slate-400 hover:text-slate-200">
                            <Trophy size={18} />
                            <span>בדיקת תשובה</span>
                        </div>
                    }
                >
                    <p className="text-lg font-bold text-center py-2 text-slate-100">
                        {answer}
                    </p>
                </Collapse>
            </div>
        </div>
    );
};
