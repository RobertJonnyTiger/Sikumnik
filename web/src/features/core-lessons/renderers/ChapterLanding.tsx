"use client";

import React, { useState } from "react";
import { ChapterData } from "@/types/chapter";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    HelpCircle,
    ChevronDown,
    ArrowLeft,
    CheckCircle,
    Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LessonMarkdown } from "@/features/core-lessons/blocks/LessonMarkdown";

interface ChapterLandingProps {
    data: ChapterData;
    onStart: () => void;
}

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } } as const,
};

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface TimelineColProps {
    items: string[];
    startIdx: number;
}

const TimelineCol: React.FC<TimelineColProps> = ({ items, startIdx }) => (
    <div className="relative flex-1">
        <div
            className="absolute top-3 bottom-3 w-0.5 bg-indigo-100"
            style={{ right: "11px" }}
        />
        <ul className="space-y-0">
            {items.map((obj, i) => (
                <motion.li
                    key={i}
                    variants={itemVariant}
                    className="flex items-start gap-3 relative pb-5 last:pb-0"
                >
                    <div className="relative z-10 shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${startIdx + i === 0
                            ? "bg-indigo-500 border-indigo-500"
                            : "bg-white border-indigo-200"
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${startIdx + i === 0 ? "bg-white" : "bg-indigo-300"
                                }`} />
                        </div>
                    </div>
                    <div className="flex-1 text-gray-700 font-medium text-sm leading-relaxed pt-0.5 markdown-content">
                        <LessonMarkdown>{obj}</LessonMarkdown>
                    </div>
                </motion.li>
            ))}
        </ul>
    </div>
);

export const ChapterLanding: React.FC<ChapterLandingProps> = ({ data, onStart }) => {
    const [stage, setStage] = useState(0);

    const objectives = data.pageMap?.learningObjectives ?? [];
    const useDouble = objectives.length > 6;
    const mid = Math.ceil(objectives.length / 2);
    const cols = useDouble
        ? [objectives.slice(0, mid), objectives.slice(mid)]
        : [objectives];

    return (
        <motion.div
            className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 max-w-2xl mx-auto"
            dir="rtl"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Badges */}
            <motion.div variants={itemVariant} className="flex gap-2 mb-7 flex-wrap justify-center">
                <Badge variant="outline" className="text-sm py-1 px-4 border-primary/20 bg-primary/5 text-sky-800">
                    {data.course}
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-4">
                    פרק {data.chapterNumber}
                </Badge>
                {data.pageMap?.estimatedTime && (
                    <Badge variant="outline" className="text-sm py-1 px-4 text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {data.pageMap.estimatedTime}
                    </Badge>
                )}
            </motion.div>

            {/* Chapter title */}
            <motion.h1
                variants={itemVariant}
                className="text-4xl md:text-6xl font-black text-center text-gray-900 leading-tight tracking-tight mb-12"
            >
                {data.title}
            </motion.h1>

            {/* Hook Block */}
            {data.introduction?.hook && (
                <motion.div variants={itemVariant} className="w-full mb-6">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-200/60">

                        <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 pb-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-400/20 rounded-full translate-x-1/4 translate-y-1/4 blur-xl" />

                            {/* Label */}
                            <div className="flex items-center gap-2 mb-5 relative z-10">
                                <HelpCircle className="w-5 h-5 text-[--color-warning]" />
                                <span className="text-[--color-warning] text-xs font-black uppercase tracking-widest">
                                    רגע לפני שמתחילים
                                </span>
                            </div>

                            {/* Question */}
                            <div className="text-2xl md:text-3xl font-black text-white leading-snug relative z-10 mb-6 markdown-content hook-content">
                                <LessonMarkdown>{data.introduction.hook}</LessonMarkdown>
                            </div>

                            {/* Stage 0 — initial CTA */}
                            {stage === 0 && (
                                <motion.button
                                    onClick={() => setStage(1)}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative z-10 flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm px-5 py-2.5 rounded-2xl transition-all duration-200"
                                >
                                    <span>אני תוהה...</span>
                                    <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            )}

                            {/* Stage 1+ — whyItMatters revealed */}
                            <AnimatePresence>
                                {stage >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" as const }}
                                        className="relative z-10"
                                    >
                                        {data.introduction?.whyItMatters && (
                                            <div className="bg-white/15 border border-white/20 rounded-2xl px-5 py-4 mb-4">
                                                <div className="text-white font-bold text-lg markdown-content hook-content">
                                                    <LessonMarkdown>{data.introduction.whyItMatters}</LessonMarkdown>
                                                </div>
                                            </div>
                                        )}

                                        {stage === 1 && (
                                            <button
                                                onClick={() => setStage(2)}
                                                className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold transition-colors mt-3"
                                            >
                                                <span>ספר לי יותר</span>
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Stage 2 — deep reveal slides in below gradient */}
                        <AnimatePresence>
                            {stage >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.45, ease: "easeOut" as const }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-indigo-50 border-t-2 border-indigo-200 px-8 py-6">
                                        {data.introduction?.reveal ? (
                                            <div className="text-indigo-900 text-base leading-relaxed markdown-content hook-reveal-content">
                                                <LessonMarkdown>{data.introduction.reveal}</LessonMarkdown>
                                            </div>
                                        ) : (
                                            <p className="text-indigo-400 text-sm italic">
                                                תוכן נוסף יתווסף בקרוב לפרק זה.
                                            </p>
                                        )}
                                        <p className="text-indigo-400 text-sm font-bold mt-3 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            עכשיו אתה מוכן להתחיל
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            {/* Learning Objectives Timeline */}
            {objectives.length > 0 && (
                <motion.div variants={itemVariant} className="w-full mb-10">
                    <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            מה נלמד בפרק?
                        </h3>
                        <div className={useDouble ? "flex gap-8" : ""}>
                            {cols.map((colItems, ci) => (
                                <TimelineCol key={ci} items={colItems} startIdx={ci * mid} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* CTA */}
            <motion.div variants={itemVariant} className="flex flex-col items-center gap-3">
                <motion.button
                    onClick={onStart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-4 bg-indigo-500 text-white text-lg font-black rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center gap-3"
                >
                    <span>התחל בפרק</span>
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </motion.button>
                <p className="text-xs text-muted-foreground font-medium">לחץ כדי לצלול פנימה</p>
            </motion.div>
        </motion.div>
    );
};
