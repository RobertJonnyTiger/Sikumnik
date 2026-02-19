"use client";

import React from "react";
import { Globe, Link as LinkIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface RealWorldExampleProps {
    title: string;
    scenario: string;
    connection: string;
    source?: string;
}

export const RealWorldExample: React.FC<RealWorldExampleProps> = ({ title, scenario, connection, source }) => {
    return (
        <div className="my-6 border-l-4 border-l-blue-500 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/20">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-lg">
                    <Globe className="w-5 h-5" />
                    {title}
                    {source && (
                        <span className="text-xs font-normal text-blue-500/70 dark:text-blue-400/50 mr-auto px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800/50">
                            מקור: {source}
                        </span>
                    )}
                </div>
            </div>
            <div className="px-6 py-4 space-y-4">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{scenario}</ReactMarkdown>
                </div>
                <div className="pt-3 border-t border-blue-100 dark:border-blue-900/20">
                    <div className="flex items-start gap-2">
                        <LinkIcon className="w-4 h-4 mt-1 text-blue-600 dark:text-blue-400 shrink-0" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>הקשר לתיאוריה:</strong>{" "}
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{connection}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
