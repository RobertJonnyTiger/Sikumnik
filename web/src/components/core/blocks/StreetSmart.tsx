"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface StreetSmartProps {
    title: string;
    children: React.ReactNode;
    emoji?: string;
}

export const StreetSmart: React.FC<StreetSmartProps> = ({ title, children, emoji = "☕" }) => {
    return (
        <div className="bg-orange-50 border-r-4 border-r-orange-500 border-y border-l border-orange-200 rounded-xl p-5 my-6 shadow-sm" dir="rtl">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{emoji}</span>
                <h4 className="text-lg font-black text-orange-600 uppercase tracking-wide">{title}</h4>
            </div>
            <div className="text-slate-800 leading-relaxed markdown-content font-medium">
                {typeof children === "string" ? (
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};
