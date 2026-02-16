"use client";

import React from "react";
import { ClipboardList, Check } from "lucide-react";

interface TopicSummaryProps {
    content: string;
    keyPoints?: string[];
}

export const TopicSummary: React.FC<TopicSummaryProps> = ({ content, keyPoints }) => {
    return (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 my-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                    <ClipboardList className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-sm font-black text-primary uppercase tracking-wider">סיכום</h4>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-4">{content}</p>

            {keyPoints && keyPoints.length > 0 && (
                <div className="space-y-2">
                    {keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            <p className="text-foreground/70 text-sm leading-relaxed">{point}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
