"use client";

import { ReactNode } from "react";

interface AnalogyProps {
    children: ReactNode;
}

export function Analogy({ children }: AnalogyProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-secondary/30 border border-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12 hover:border-primary/20 transition-all duration-500 group/analogy">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover/analogy:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex gap-8">
                <span className="text-6xl select-none animate-bounce-slow">💡</span>
                <div className="space-y-4 flex-1">
                    <h4 className="text-2xl font-black text-primary/80 uppercase tracking-widest font-heading">
                        תכל'ס (Analogy)
                    </h4>
                    <div className="text-2xl md:text-3xl leading-relaxed font-main text-white/90 prose-strong:text-primary prose-strong:font-black">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
