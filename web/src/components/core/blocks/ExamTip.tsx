"use client";

import React from "react";
import { AlertTriangle, Stars } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ExamTipProps {
    content: string;
    importance: "high" | "medium";
}

export const ExamTip: React.FC<ExamTipProps> = ({ content, importance }) => {
    const isHigh = importance === "high";

    return (
        <div className={`my-6 p-4 rounded-xl border-2 ${isHigh
                ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                : "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20"
            } relative overflow-hidden group`}>
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-10 transition-transform group-hover:scale-110 ${isHigh ? "bg-amber-500" : "bg-teal-500"
                }`} />

            <div className="flex items-start gap-3 relative z-10">
                <div className={`p-2 rounded-lg ${isHigh ? "bg-amber-100 dark:bg-amber-900/50" : "bg-teal-100 dark:bg-teal-900/50"
                    }`}>
                    {isHigh ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                        <Stars className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-bold uppercase tracking-wider ${isHigh ? "text-amber-700 dark:text-amber-300" : "text-teal-700 dark:text-teal-300"
                            }`}>
                            טיפ למבחן {isHigh ? "🔥" : "✨"}
                        </span>
                        {isHigh && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200">
                                חובה לדעת
                            </span>
                        )}
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 leading-snug">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};
