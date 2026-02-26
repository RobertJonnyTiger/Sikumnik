"use client";

import React, { useState } from "react";
import { Trophy, CheckCircle2, XCircle, RefreshCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export interface ExamQuestionData {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface KnowledgeExamProps {
    chapterId?: string;
    questions: ExamQuestionData[];
    onSubmit?: (results: { score: number; percentage: number; correct: number }) => void;
}

export const KnowledgeExam: React.FC<KnowledgeExamProps> = ({ questions, onSubmit }) => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (qId: string, optIdx: number) => {
        if (isSubmitted) return;
        setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    };

    const isComplete = questions.every(q => answers[q.id] !== undefined);

    const handleSubmit = () => {
        if (!isComplete) return;
        setIsSubmitted(true);
        if (onSubmit) {
            const correctCount = questions.filter(q => answers[q.id] === q.correctIndex).length;
            onSubmit({
                score: Math.round((correctCount / questions.length) * 10),
                percentage: Math.round((correctCount / questions.length) * 100),
                correct: correctCount
            });
        }
    };

    const handleRetake = () => {
        setAnswers({});
        setIsSubmitted(false);
    }

    if (isSubmitted) {
        const correctCount = questions.filter(q => answers[q.id] === q.correctIndex).length;
        const percentage = Math.round((correctCount / questions.length) * 100);

        return (
            <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden my-8 shadow-md" dir="rtl">
                <div className="bg-slate-50 border-b border-slate-200 px-8 py-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm border border-slate-100 mb-4">
                        <Trophy className={`w-10 h-10 ${percentage >= 80 ? 'text-amber-500' : 'text-slate-400'}`} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">
                        ציון: {percentage}%
                    </h3>
                    <p className="text-slate-500 font-medium">ענית נכונה על {correctCount} מתוך {questions.length} שאלות</p>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <h4 className="font-bold text-lg text-slate-800 mb-4">פירוט התשובות:</h4>
                    {questions.map((q, idx) => {
                        const selectedIdx = answers[q.id];
                        const isCorrect = selectedIdx === q.correctIndex;
                        return (
                            <div key={q.id} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'}`}>
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="shrink-0 mt-1">
                                        {isCorrect ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 mb-1">שאלה {idx + 1}</p>
                                        <div className="text-sm text-slate-600 markdown-content mb-3">
                                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                                                {q.question}
                                            </ReactMarkdown>
                                        </div>
                                        {/* Shows explanation */}
                                        <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-emerald-100/50 text-emerald-800' : 'bg-red-100/50 text-red-800'}`}>
                                            <span className="font-bold">{isCorrect ? 'נכון:' : 'התשובה הנכונה הייתה:'}</span> {q.options[q.correctIndex]}
                                        </div>
                                        {!isCorrect && q.explanation && (
                                            <div className="mt-3 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100">
                                                <span className="font-bold text-slate-800">הסבר: </span>
                                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                                                    {q.explanation}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        onClick={handleRetake}
                        className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        נסה שוב
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden my-8 shadow-sm" dir="rtl">
            <div className="sticky top-0 z-10 px-6 py-4 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                        <Trophy className="w-5 h-5 text-slate-700" />
                    </div>
                    <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">מבחן ידע מסכם</h4>
                </div>
                <div className="text-sm font-mono font-bold text-slate-500">
                    {Object.keys(answers).length} / {questions.length}
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-12">
                {questions.map((q, qIdx) => (
                    <div key={q.id}>
                        <div className="text-slate-800 font-bold text-lg leading-relaxed mb-6 markdown-content flex gap-3">
                            <span className="text-slate-400 shrink-0">{qIdx + 1}.</span>
                            <div className="mt-[-2px]">
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                                    {q.question}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 pr-8">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = answers[q.id] === optIdx;
                                return (
                                    <button
                                        key={optIdx}
                                        onClick={() => handleSelect(q.id, optIdx)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-right transition-all group ${isSelected
                                            ? "border-slate-800 bg-slate-50 ring-2 ring-slate-200 shadow-sm"
                                            : "border-slate-100 hover:border-slate-300 hover:bg-slate-50/50"
                                            }`}
                                    >
                                        <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
                                            ? "border-slate-800 bg-slate-800"
                                            : "border-slate-300 bg-white"
                                            }`}>
                                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                        <span className={`flex-1 text-md ${isSelected ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                                            {opt}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="pt-6 border-t border-slate-100 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={!isComplete}
                        className={`px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-sm ${isComplete
                            ? "bg-slate-800 text-white hover:bg-slate-700 hover:-translate-y-0.5"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                    >
                        הגש מבחן
                    </button>
                </div>
            </div>
        </div>
    );
};
