"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Brain, Users, Target, Repeat, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStep {
    id: string;
    title: string;
    hebrewTitle: string;
    description: string;
    icon: React.ReactNode;
    position: { x: number; y: number };
}

interface AttributionFlowchartProps {
    mode?: "reference" | "quiz";
    onComplete?: (score: number, total: number) => void;
}

const steps: FlowStep[] = [
    {
        id: "behavior",
        title: "Behavior",
        hebrewTitle: "התנהגות",
        description: "אנו צופים בהתנהגות של מישהו",
        icon: <Users className="w-6 h-6" />,
        position: { x: 400, y: 50 }
    },
    {
        id: "understanding",
        title: "Understanding",
        hebrewTitle: "הבנה",
        description: "המוח מנסה להבין למה",
        icon: <Brain className="w-6 h-6" />,
        position: { x: 400, y: 150 }
    },
    {
        id: "consensus",
        title: "Consensus",
        hebrewTitle: "קונצנזוס",
        description: "האם גם אחרים מתנהגים כך?",
        icon: <Users className="w-5 h-5" />,
        position: { x: 150, y: 280 }
    },
    {
        id: "distinctiveness",
        title: "Distinctiveness",
        hebrewTitle: "ייחודיות",
        description: "האם התנהגות ייחודית למצב זה?",
        icon: <Target className="w-5 h-5" />,
        position: { x: 400, y: 280 }
    },
    {
        id: "consistency",
        title: "Consistency",
        hebrewTitle: "עקביות",
        description: "האם הוא מתנהג כך תמיד?",
        icon: <Repeat className="w-5 h-5" />,
        position: { x: 650, y: 280 }
    }
];

const outcomes = {
    internal: {
        title: "ייחוס פנימי",
        description: "ההתנהגות נובעת מהאופי/אישיות",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
    },
    external: {
        title: "ייחוס חיצוני",
        description: "ההתנהגות נובעת מהמצב/הסיטואציה",
        color: "bg-blue-500",
        textColor: "text-sky-800",
        bgColor: "bg-blue-50",
        borderColor: "border-border"
    }
};

export const AttributionFlowchart: React.FC<AttributionFlowchartProps> = ({
    mode = "reference",
    onComplete
}) => {
    const [activeStep, setActiveStep] = useState<string | null>(null);
    const [quizMode, setQuizMode] = useState(false);
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const scenarios = [
        {
            question: "דני תמיד מגיש דוחות בזמן. היום הוא לא הגיש. שאר הצוות כן הגישו. מה הסוג ייחוס?",
            consensus: "גבוה",
            distinctiveness: "גבוהה",
            consistency: "נמוכה",
            correct: "external",
            explanation: "עקביות נמוכה (התנהגות לא טיפוסית) + קונצנזוס גבוה (כולם התנהגו אחרת) = ייחוס חיצוני. משהו חריג קרה לדני."
        },
        {
            question: "שרה מאחרת לעבודה כל יום. כל העובדים האחרים גם מאחרים בגלל עבודות בכביש. מה הסוג ייחוס?",
            consensus: "גבוה",
            distinctiveness: "נמוכה",
            consistency: "גבוהה",
            correct: "external",
            explanation: "קונצנזוס גבוה (כולם מאחרים) = ייחוס חיצוני. הבעיה היא בכביש, לא בשרה."
        },
        {
            question: "יוסי תמיד עושה עבודה מעולה. היום הוא עשה עבודה גרועה בלבד במשימה ספציפית. מה הסוג ייחוס?",
            consensus: "נמוך",
            distinctiveness: "גבוהה",
            consistency: "נמוכה",
            correct: "external",
            explanation: "ייחודיות גבוהה (רק במשימה הזו) + עקביות נמוכה = ייחוס חיצוני. הבעיה במשימה, לא ביוסי."
        },
        {
            question: "מיכל מאחרת כל יום כשהיא צריכה להגיע לישיבות ספציפיות עם המנהל. בשאר הזמן היא בזמן. מה הסוג ייחוס?",
            consensus: "נמוך",
            distinctiveness: "גבוהה",
            consistency: "נמוכה",
            correct: "external",
            explanation: "ייחודיות גבוהה (רק בישיבות אלה) = ייחוס חיצוני. משהו בישיבות או במנהל מונע ממנה להגיע."
        },
        {
            question: "אבי מאחר כל בוקר לעבודה כבר שנה. שאר העובדים תמיד בזמן. מה הסוג ייחוס?",
            consensus: "נמוך",
            distinctiveness: "נמוכה",
            consistency: "גבוהה",
            correct: "internal",
            explanation: "עקביות גבוהה (תמיד כך) + קונצנזוס נמוך (רק הוא) = ייחוס פנימי. זו בעיה באופי/אחריות של אבי."
        }
    ];

    const handleStepClick = (stepId: string) => {
        if (!quizMode) {
            setActiveStep(activeStep === stepId ? null : stepId);
        }
    };

    const handleQuizAnswer = (answer: "internal" | "external") => {
        if (showResult) return;
        
        setSelectedAnswer(answer);
        setShowResult(true);
        
        if (answer === scenarios[currentScenario].correct) {
            setScore(score + 1);
        }
    };

    const nextScenario = () => {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            onComplete?.(score + (selectedAnswer === scenarios[currentScenario].correct ? 1 : 0), scenarios.length);
        }
    };

    const resetQuiz = () => {
        setCurrentScenario(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
    };

    const getPathColor = (from: string, to: string) => {
        if (!quizMode || !showResult) return "stroke-slate-300";
        
        const scenario = scenarios[currentScenario];
        if (to === "consensus" && scenario.consensus === "גבוה") return "stroke-blue-500";
        if (to === "consistency" && scenario.consistency === "גבוהה") return "stroke-orange-500";
        if (to === "distinctiveness" && scenario.distinctiveness === "גבוהה") return "stroke-blue-500";
        return "stroke-slate-300";
    };

    return (
        <div className="w-full bg-white  rounded-2xl border border-border  overflow-hidden my-6 shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-foreground">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Brain className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">מודל הייחוס של קלי</h3>
                            <p className="text-sm text-foreground">
                                {quizMode ? `שאלה ${currentScenario + 1} מתוך ${scenarios.length}` : "תרשים זרימה אינטראקטיבי"}
                            </p>
                        </div>
                    </div>
                    {mode === "reference" && (
                        <button
                            onClick={() => setQuizMode(!quizMode)}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors"
                        >
                            {quizMode ? "חזרה לתצוגה" : "מעבר לתרגול"}
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {quizMode ? (
                    <div className="space-y-6">
                        {/* Quiz Scenario */}
                        <div className="bg-card  rounded-xl p-6 border border-border ">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-amber-700" />
                                <span className="text-sm font-bold text-muted-foreground ">תרחיש:</span>
                            </div>
                            <p className="text-lg font-medium text-foreground  leading-relaxed">
                                {scenarios[currentScenario].question}
                            </p>
                        </div>

                        {/* Criteria Display */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { key: "consensus", label: "קונצנזוס", value: scenarios[currentScenario].consensus },
                                { key: "distinctiveness", label: "ייחודיות", value: scenarios[currentScenario].distinctiveness },
                                { key: "consistency", label: "עקביות", value: scenarios[currentScenario].consistency }
                            ].map((criterion) => (
                                <div 
                                    key={criterion.key}
                                    className="bg-white  rounded-lg p-4 border border-border  text-center shadow-sm"
                                >
                                    <div className="text-sm text-muted-foreground  mb-1 font-medium">{criterion.label}</div>
                                    <div className={cn(
                                        "font-bold text-lg",
                                        criterion.value === "גבוה" || criterion.value === "גבוהה" 
                                            ? "text-emerald-600 " 
                                            : "text-amber-600 "
                                    )}>
                                        {criterion.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Answer Buttons */}
                        {!showResult ? (
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleQuizAnswer("internal")}
                                    className="p-6 rounded-xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors text-center"
                                >
                                    <div className="text-2xl mb-2">👤</div>
                                    <div className="font-bold text-orange-800">ייחוס פנימי</div>
                                    <div className="text-sm text-orange-600 mt-1">הבעיה באדם</div>
                                </button>
                                <button
                                    onClick={() => handleQuizAnswer("external")}
                                    className="p-6 rounded-xl border-2 border-border bg-blue-50 hover:bg-muted transition-colors text-center"
                                >
                                    <div className="text-2xl mb-2">🌍</div>
                                    <div className="font-bold text-foreground">ייחוס חיצוני</div>
                                    <div className="text-sm text-sky-800 mt-1">הבעיה במצב</div>
                                </button>
                            </div>
                        ) : (
                            <div className={cn(
                                "rounded-xl p-6 border-2",
                                selectedAnswer === scenarios[currentScenario].correct
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-red-50 border-red-200"
                            )}>
                                <div className="flex items-center gap-2 mb-3">
                                    {selectedAnswer === scenarios[currentScenario].correct ? (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    ) : (
                                        <span className="text-2xl">❌</span>
                                    )}
                                    <span className={cn(
                                        "font-bold text-lg",
                                        selectedAnswer === scenarios[currentScenario].correct
                                            ? "text-emerald-800"
                                            : "text-red-800"
                                    )}>
                                        {selectedAnswer === scenarios[currentScenario].correct ? "נכון!" : "לא נכון"}
                                    </span>
                                </div>
                                <p className="text-foreground mb-4">{scenarios[currentScenario].explanation}</p>
                                <button
                                    onClick={nextScenario}
                                    className="w-full py-3 bg-muted text-foreground rounded-lg font-bold hover:bg-slate-700 transition-colors"
                                >
                                    {currentScenario < scenarios.length - 1 ? "המשך לשאלה הבאה" : "סיום תרגול"}
                                </button>
                            </div>
                        )}

                        {/* Progress */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-foreground ">ניקוד: <span className="text-sky-800 ">{score}</span>/{currentScenario + (showResult ? 1 : 0)}</span>
                            <div className="flex gap-1">
                                {scenarios.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        className={cn(
                                            "w-2 h-2 rounded-full",
                                            idx < currentScenario + (showResult ? 1 : 0) 
                                                ? "bg-primary" 
                                                : "bg-slate-300 "
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative" style={{ height: "500px" }}>
                        {/* SVG Connections */}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                            {/* Main flow line */}
                            <motion.path
                                d="M 400 100 L 400 180"
                                stroke="currentColor"
                                className="text-muted-foreground "
                                strokeWidth="3"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            
                            {/* Branches to criteria */}
                            {[
                                { d: "M 400 200 L 150 280", to: "consensus" },
                                { d: "M 400 200 L 400 280", to: "distinctiveness" },
                                { d: "M 400 200 L 650 280", to: "consistency" }
                            ].map((line, idx) => (
                                <motion.path
                                    key={idx}
                                    d={line.d}
                                    stroke="currentColor"
                                    className={getPathColor("understanding", line.to)}
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                />
                            ))}

                            {/* Outcome lines */}
                            <motion.path
                                d="M 150 320 L 150 400 L 250 450"
                                stroke="currentColor"
                                className="text-blue-700"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            />
                            <motion.path
                                d="M 650 320 L 650 400 L 550 450"
                                stroke="currentColor"
                                className="text-orange-400"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            />
                        </svg>

                        {/* Nodes */}
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.id}
                                className={cn(
                                    "absolute cursor-pointer transition-all duration-300",
                                    activeStep === step.id && "scale-110 z-10"
                                )}
                                style={{ 
                                    left: step.position.x - 60, 
                                    top: step.position.y - 30,
                                    width: 120
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: activeStep === step.id ? 1.1 : 1 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleStepClick(step.id)}
                            >
                                <div className={cn(
                                    "rounded-xl p-4 border-2 text-center transition-colors shadow-sm",
                                    activeStep === step.id 
                                        ? "bg-indigo-50 border-indigo-400 shadow-lg" 
                                        : "bg-white  border-border  hover:border-indigo-300 "
                                )}>
                                    <div className="flex justify-center mb-2 text-sky-800 ">
                                        {step.icon}
                                    </div>
                                    <div className="font-bold text-foreground ">{step.hebrewTitle}</div>
                                    <div className="text-xs text-muted-foreground  mt-1">{step.title}</div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Outcome Boxes */}
                        <motion.div
                            className="absolute left-40"
                            style={{ top: "420px" }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="bg-blue-50  border-2 border-border  rounded-xl p-4 text-center w-40 shadow-md">
                                <div className="text-2xl mb-2">🌍</div>
                                <div className="font-bold text-foreground ">ייחוס חיצוני</div>
                                <div className="text-xs text-sky-800  mt-1">הבעיה במצב</div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute right-40"
                            style={{ top: "420px" }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="bg-orange-50  border-2 border-orange-200  rounded-xl p-4 text-center w-40 shadow-md">
                                <div className="text-2xl mb-2">👤</div>
                                <div className="font-bold text-orange-800 ">ייחוס פנימי</div>
                                <div className="text-xs text-orange-600  mt-1">הבעיה באדם</div>
                            </div>
                        </motion.div>

                        {/* Info Panel - positioned at top to not hide components */}
                        <AnimatePresence>
                            {activeStep && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-4 left-4 right-4 bg-white/95  backdrop-blur-sm rounded-xl p-4 border-2 border-indigo-200  shadow-xl z-50"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="bg-indigo-100  p-2 rounded-lg">
                                            {steps.find(s => s.id === activeStep)?.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-foreground  text-lg">
                                                {steps.find(s => s.id === activeStep)?.hebrewTitle}
                                            </h4>
                                            <p className="text-base text-foreground  mt-1 leading-relaxed">
                                                {steps.find(s => s.id === activeStep)?.description}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setActiveStep(null)}
                                            className="text-muted-foreground hover:text-muted-foreground  p-1 hover:bg-slate-100  rounded-full transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Legend */}
            {!quizMode && (
                <div className="px-6 pb-6">
                    <div className="bg-card  rounded-lg p-4 text-sm border border-border ">
                        <div className="font-bold text-foreground  mb-2">💡 כיצד להשתמש במודל:</div>
                        <ul className="space-y-1 text-foreground ">
                            <li>• <strong className="text-foreground ">קונצנזוס גבוה</strong> (כולם כך) → ייחוס חיצוני (הבעיה במצב)</li>
                            <li>• <strong className="text-foreground ">עקביות גבוהה</strong> (תמיד כך) → ייחוס פנימי (הבעיה באדם)</li>
                            <li>• <strong className="text-foreground ">ייחודיות גבוהה</strong> (רק במצב זה) → ייחוס חיצוני</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
