"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface HookProps {
    opener: string;
    question?: string;
    context?: string;
}

export const Hook: React.FC<HookProps> = ({ opener, question, context }) => {
    return (
        <div className="group bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl p-8 md:p-10 my-8 shadow-xl shadow-violet-600/20 text-white relative overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20" dir="rtl">
            <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none">
                <Lightbulb className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30">
                        <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-black text-violet-100 uppercase tracking-widest opacity-90">נקודה למחשבה</p>
                </div>

                {question && (
                    <div className="text-3xl md:text-4xl font-black mb-6 leading-tight drop-shadow-sm markdown-content">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{question}</ReactMarkdown>
                    </div>
                )}

                <div className={`text-xl font-medium ${question ? 'text-violet-100' : 'text-3xl md:text-4xl font-black mb-6 leading-tight'} drop-shadow-sm markdown-content`}>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{opener}</ReactMarkdown>
                </div>

                {context && (
                    <div className="mt-6 p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm text-violet-50 font-medium markdown-content leading-relaxed">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{context}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};
