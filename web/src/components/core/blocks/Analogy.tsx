"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface AnalogyProps {
    content: string;
    icon?: string;
}

export const Analogy: React.FC<AnalogyProps> = ({ content, icon }) => {
    return (
        <div className="bg-yellow-50/50 border-2 border-yellow-400 rounded-2xl p-6 my-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300" dir="rtl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="flex items-start gap-5 relative z-10">
                <div className="shrink-0 bg-yellow-400 p-3 rounded-2xl shadow-inner shadow-white/50 transform group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-yellow-950" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-yellow-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                        {icon || "🧠"} רגע של אנלוגיה
                    </h4>
                    <div className="text-slate-800 font-medium leading-relaxed text-lg markdown-content">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content.replace(/→/g, '←')}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};
