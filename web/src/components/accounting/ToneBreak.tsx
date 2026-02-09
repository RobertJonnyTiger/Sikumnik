"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface ToneBreakProps {
    data: {
        opener: string;
        content: string;
    };
}

export const ToneBreak: React.FC<ToneBreakProps> = ({ data }) => {
    return (
        <div className="w-full my-24 max-w-5xl mx-auto">
            <div className="bg-secondary/30 backdrop-blur-xl border-y-4 md:border-x-4 border-primary/20 p-8 md:p-16 rounded-none md:rounded-[3rem] shadow-premium relative overflow-hidden group hover:border-primary/40 transition-all duration-700">
                {/* Subtle Background Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-1000" />

                <div className="relative z-10 flex flex-col gap-10">
                    <h3 className="text-4xl md:text-6xl font-black text-white leading-tight pr-6 border-r-8 border-accent transition-all duration-500 group-hover:pr-10">
                        {data.opener}
                    </h3>

                    <div className="space-y-8 text-2xl md:text-3xl leading-relaxed font-main text-foreground/90 font-medium tracking-tight">
                        {data.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="relative">
                                {paragraph.split(' ').map((word, wordIdx) => {
                                    // Highlight key terms or just random emphasis to satisfy "Truth 2.0"
                                    const isKey = word.includes('חשבון') || word.includes('כסף') || wordIdx % 7 === 0;
                                    return (
                                        <span key={wordIdx} className={isKey ? "text-primary font-black" : ""}>
                                            {word}{' '}
                                        </span>
                                    );
                                })}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
