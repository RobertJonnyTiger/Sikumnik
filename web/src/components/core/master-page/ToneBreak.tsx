"use client";

import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { MessageCircle, Zap } from "lucide-react";

interface ToneBreakProps {
    opener: string; // "אבל מה זה אומר תכלס?"
    content: string[]; // Splitting into paragraphs
}

export const ToneBreak: React.FC<ToneBreakProps> = ({
    opener,
    content,
}) => {
    return (
        <SectionWrapper id="tone-break" sectionNumber={5}>
            {/* "Neon" Container */}
            <div className="relative overflow-hidden bg-[#0a0a0a] border border-pink-500/30 rounded-xl p-8 shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]">
                {/* Neon Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20 text-pink-500">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-pink-500 to-purple-500">
                            {opener}
                        </h3>
                    </div>

                    <div className="space-y-4 text-lg font-medium text-slate-300 font-sans">
                        {content.map((paragraph, idx) => (
                            <p key={idx} className="leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="flex items-center gap-2 text-xs font-bold text-pink-500/70 border border-pink-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                            <MessageCircle size={12} />
                            Street Mode
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
