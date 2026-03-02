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
        <div className="group my-6 border-l-4 border-l-primary bg-white  rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-500/50">
            <div className="px-6 py-4 bg-white  border-b border-border ">
                <div className="flex items-center gap-2 text-foreground  font-bold text-lg">
                    <Globe className="w-5 h-5" />
                    {title}
                    {source && (
                        <span className="text-xs font-normal text-muted-foreground  mr-auto px-2 py-0.5 rounded-full bg-muted ">
                            מקור: {source}
                        </span>
                    )}
                </div>
            </div>
            <div className="px-6 py-4 space-y-4">
                <div className="text-foreground  leading-relaxed">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{scenario}</ReactMarkdown>
                </div>
                <div className="pt-3 border-t border-border ">
                    <div className="flex items-start gap-2">
                        <LinkIcon className="w-4 h-4 mt-1 text-sky-800  shrink-0" />
                        <div className="text-sm text-foreground ">
                            <strong>הקשר לתיאוריה:</strong>{" "}
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{connection}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
