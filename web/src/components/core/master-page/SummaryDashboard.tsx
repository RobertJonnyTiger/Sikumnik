"use client";

import React from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Legacy: will be removed during chapter migration
type ChapterData = any;
import { StreetLevelSummary } from "./StreetLevelSummary";
import { FormulaCard } from "./FormulaCard";
import { MistakeFlipper } from "./MistakeFlipper";
import { ReferenceCard } from "./ReferenceCard"; // Keeping for backup/legacy or specific uses
import { TriviaCard } from "./TriviaCard";
import { ChapterBridge } from "./ChapterBridge";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, AlertOctagon } from "lucide-react";

interface SummaryDashboardProps {
    data: ChapterData;
    courseId: string;
}

export const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ data, courseId }) => {
    // Animation variants for staggered entry
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8 pb-12"
        >
            {/* 1. Header & Street Summary (The Hook) */}
            <motion.div variants={item}>
                <StreetLevelSummary
                    points={[{ title: "השורה התחתונה", content: data.streetSummary.content }]}
                />
            </motion.div>

            {/* 2. The Bento Grid (Smart Cheat Sheet) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Column A: Formulas & Rules (Utility) - Spans 7 cols */}
                <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={item} className="flex items-center gap-3 mb-2">
                        <BrainCircuit className="text-teal-400" size={24} />
                        <h3 className="text-xl font-bold text-white">נוסחאות וכללי אצבע</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- Legacy component, will be removed */}
                        {data.quickReference.formulas.map((formula: any, idx: number) => (
                            <motion.div key={idx} variants={item}>
                                <FormulaCard
                                    label={formula.label || "נוסחה"} // Fallback or correct mapping
                                    formula={formula.formula}
                                    subtext={formula.subtext || "הסבר נוסף"} // Fallback or correct mapping
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Fallback for definitions if no formulas */}
                    {data.quickReference.formulas.length === 0 && (
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 italic">
                            אין נוסחאות בפרק זה. התמקדו בהבנת המושגים!
                        </div>
                    )}
                </div>

                {/* Column B: Common Mistakes (The Trap) - Spans 5 cols */}
                <div className="lg:col-span-5 space-y-6">
                    <motion.div variants={item} className="flex items-center gap-3 mb-2">
                        <AlertOctagon className="text-red-400" size={24} />
                        <h3 className="text-xl font-bold text-white">מוקשים נפוצים (Do's & Don'ts)</h3>
                    </motion.div>

                    <div className="space-y-3">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- Legacy component, will be removed */}
                        {data.commonMistakes.map((mistake: any, idx: number) => (
                            <motion.div key={idx} variants={item}>
                                <MistakeFlipper
                                    mistake={mistake.mistake}
                                    correction={mistake.correct}
                                    explanation={mistake.why}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Trivia & Fun Facts (The Break) */}
            {
                data.trivia && data.trivia.length > 0 && (
                    <motion.div variants={item} className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-purple-400" size={20} />
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Trivia Byte</span>
                        </div>
                        <TriviaCard fact={data.trivia[0].fact} source={data.trivia[0].source} />
                    </motion.div>
                )
            }

            {/* 4. The Bridge (Next Step) */}
            <motion.div variants={item} className="pt-8 mt-8 border-t border-white/5">
                <ChapterBridge
                    nextChapter={{
                        id: typeof data.bridge.nextChapter === 'string'
                            ? data.bridge.nextChapter
                            : (data.bridge.nextChapter as any).id,
                        title: data.bridge.nextChapterTitle || (data.bridge.nextChapter as any)?.title,
                        description: data.bridge.content
                    }}
                    courseId={courseId}
                />
            </motion.div>
        </motion.div >
    );
};
