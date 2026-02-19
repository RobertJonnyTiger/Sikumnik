"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Stethoscope, Brain, Users, Target, Lightbulb, AlertTriangle,
    CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw,
    Sparkles, BookOpen, MessageSquare, Scale, Battery, Crown,
    ChevronUp, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
    Brain: <Brain className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    Scale: <Scale className="w-5 h-5" />,
    Battery: <Battery className="w-5 h-5" />,
    Crown: <Crown className="w-5 h-5" />,
};

interface AnalysisSection {
    id: string;
    title: string;
    icon?: React.ReactNode;
    theory: string;
    analysis: string;
    evidence: string[];
    questions: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
        feedback?: {
            correct: string;
            wrong: Record<number, string>;
        };
    }[];
}

interface DiagnosticCaseStudyProps {
    title: string;
    subtitle: string;
    scenario: string;
    sections: AnalysisSection[];
    conclusion: string;
    keyTakeaways: string[];
}

export const DiagnosticCaseStudy: React.FC<DiagnosticCaseStudyProps> = ({
    title,
    subtitle,
    scenario,
    sections,
    conclusion,
    keyTakeaways
}) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [expandedScenario, setExpandedScenario] = useState(true);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState<Record<string, boolean>>({});
    const [completedSections, setCompletedSections] = useState<string[]>([]);

    const handleAnswer = (sectionId: string, questionIndex: number, optionIndex: number) => {
        const key = `${sectionId}-${questionIndex}`;
        setAnswers({ ...answers, [key]: optionIndex });
    };

    const checkAnswer = (sectionId: string, questionIndex: number) => {
        const key = `${sectionId}-${questionIndex}`;
        setShowResults({ ...showResults, [key]: true });

        // Mark section as completed if all questions answered correctly
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            const allQuestions = section.questions.map((_, idx) => {
                const ansKey = `${sectionId}-${idx}`;
                const userAnswer = answers[ansKey];
                const correctAnswer = section.questions[idx].correctIndex;
                return userAnswer === correctAnswer;
            });

            if (allQuestions.every(Boolean) && !completedSections.includes(sectionId)) {
                setCompletedSections([...completedSections, sectionId]);
            }
        }
    };

    const progress = (completedSections.length / sections.length) * 100;

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-6 shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">{title}</h3>
                            <p className="text-sm text-white/80">{subtitle}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black">{Math.round(progress)}%</div>
                        <div className="text-xs text-white/70">הושלם</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Scenario - Expandable */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <button
                        onClick={() => setExpandedScenario(!expandedScenario)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-100">תיאור המקרה</span>
                        </div>
                        {expandedScenario ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    <AnimatePresence>
                        {expandedScenario && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6">
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                                        {scenario}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Analysis Sections */}
                <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        נקודות מבט אבחנתיות
                    </h4>

                    {sections.map((section, idx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "border-2 rounded-xl overflow-hidden transition-all",
                                activeSection === section.id
                                    ? "border-violet-400 dark:border-violet-500 shadow-lg"
                                    : "border-slate-200 dark:border-slate-700",
                                completedSections.includes(section.id) && "border-emerald-400 dark:border-emerald-500"
                            )}
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                className={cn(
                                    "w-full px-6 py-4 flex items-center justify-between transition-colors",
                                    activeSection === section.id
                                        ? "bg-violet-50 dark:bg-violet-900/20"
                                        : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        completedSections.includes(section.id)
                                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                            : "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                                    )}>
                                        {completedSections.includes(section.id) ? <CheckCircle2 className="w-5 h-5" /> : (iconMap[section.icon as string] || section.icon)}
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-800 dark:text-slate-100">{section.title}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">{section.theory}</div>
                                    </div>
                                </div>
                                {activeSection === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            {/* Section Content */}
                            <AnimatePresence>
                                {activeSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
                                            {/* Analysis */}
                                            <div className="bg-violet-50 dark:bg-violet-900/10 rounded-lg p-4 border-r-4 border-violet-400">
                                                <h5 className="font-bold text-violet-800 dark:text-violet-300 mb-2 flex items-center gap-2">
                                                    <Brain className="w-4 h-4" />
                                                    ניתוח תיאורטי
                                                </h5>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {section.analysis}
                                                </p>
                                            </div>

                                            {/* Evidence */}
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-amber-500" />
                                                    ראיות מהמקרה
                                                </h5>
                                                <ul className="space-y-2">
                                                    {section.evidence.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                                            <span className="text-violet-500 mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Quiz Questions */}
                                            <div className="space-y-4">
                                                <h5 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                                                    בדיקת הבנה
                                                </h5>

                                                {section.questions.map((q, qIdx) => {
                                                    const key = `${section.id}-${qIdx}`;
                                                    const isAnswered = answers[key] !== undefined;
                                                    const isCorrect = answers[key] === q.correctIndex;
                                                    const showResult = showResults[key];
                                                    const userAns = answers[key];

                                                    return (
                                                        <div key={qIdx} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                                            <p className="font-medium text-slate-800 dark:text-slate-100 mb-3">{q.question}</p>

                                                            <div className="space-y-2">
                                                                {q.options.map((option, optIdx) => (
                                                                    <button
                                                                        key={optIdx}
                                                                        onClick={() => !showResult && handleAnswer(section.id, qIdx, optIdx)}
                                                                        disabled={showResult}
                                                                        className={cn(
                                                                            "w-full text-right px-4 py-3 rounded-lg border-2 transition-all",
                                                                            !showResult && answers[key] === optIdx
                                                                                ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20"
                                                                                : "border-slate-200 dark:border-slate-700 hover:border-violet-300",
                                                                            showResult && optIdx === q.correctIndex
                                                                            && "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
                                                                            showResult && answers[key] === optIdx && optIdx !== q.correctIndex
                                                                            && "border-red-400 bg-red-50 dark:bg-red-900/20"
                                                                        )}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="font-bold text-slate-500">{String.fromCharCode(1488 + optIdx)}.</span>
                                                                            <span className={cn(
                                                                                showResult && optIdx === q.correctIndex && "text-emerald-700 dark:text-emerald-300 font-bold",
                                                                                showResult && answers[key] === optIdx && optIdx !== q.correctIndex && "text-red-700 dark:text-red-300"
                                                                            )}>
                                                                                {option}
                                                                            </span>
                                                                            {showResult && optIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-auto" />}
                                                                            {showResult && answers[key] === optIdx && optIdx !== q.correctIndex && <XCircle className="w-4 h-4 text-red-500 mr-auto" />}
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>

                                                            {!showResult && isAnswered && (
                                                                <button
                                                                    onClick={() => checkAnswer(section.id, qIdx)}
                                                                    className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg font-bold hover:bg-violet-700 transition-colors"
                                                                >
                                                                    בדוק תשובה
                                                                </button>
                                                            )}

                                                            {showResult && (
                                                                <div className={cn(
                                                                    "mt-3 p-3 rounded-lg",
                                                                    isCorrect ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-amber-50 dark:bg-amber-900/20"
                                                                )}>
                                                                    <div className={cn(
                                                                        "text-sm whitespace-pre-line",
                                                                        isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                                                                    )}>
                                                                        {(() => {
                                                                            if (q.feedback) {
                                                                                if (isCorrect) {
                                                                                    return q.feedback.correct;
                                                                                } else if (userAns !== undefined) {
                                                                                    const wrongFeedback = q.feedback.wrong[userAns];
                                                                                    return (
                                                                                        <>
                                                                                            {wrongFeedback && <span className="font-bold block mb-2">{wrongFeedback}</span>}
                                                                                            <span className="block border-t border-amber-200 dark:border-amber-800 pt-2 mt-2">
                                                                                                <span className="font-bold">התשובה הנכונה:</span> {q.feedback.correct}
                                                                                            </span>
                                                                                        </>
                                                                                    );
                                                                                }
                                                                            }
                                                                            return q.explanation;
                                                                        })()}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        מסקנות והמלצות
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        {conclusion}
                    </p>

                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-sm">נקודות למידה מרכזיות:</h5>
                        <ul className="space-y-2">
                            {keyTakeaways.map((takeaway, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="text-violet-500 mt-0.5">✓</span>
                                    {takeaway}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
