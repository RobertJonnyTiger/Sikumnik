"use client";

import React, { useState, useRef } from 'react';
import { HeroFormulaBlock } from '@/types/math-course';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { motion, AnimatePresence } from 'framer-motion';
import { renderMathText } from '@/utils/renderMathText';

interface HeroFormulaProps {
    block: HeroFormulaBlock;
    hasStreetNarrator?: boolean;
}

const MATH_SYMBOLS = ["∫", "∑", "√", "∂", "∞", "π", "Δ", "∇", "×", "÷", "±", "≈", "≠", "≤", "≥", "∈", "⊂", "∏", "lim", "dx"];

export const HeroFormula: React.FC<HeroFormulaProps> = ({
    block,
    hasStreetNarrator = true
}) => {
    const [narratorVisible, setNarratorVisible] = useState(true);
    const hasNarratorData = hasStreetNarrator && !!block.streetNarrator;

    return (
        <div className="my-12 w-full max-w-4xl mx-auto" dir="rtl">
            {/*
              KEY FIX: We do NOT use layout on the outer card.
              Instead, the card has no fixed height — it grows naturally with its children.
              AnimatePresence + height/opacity animation on the narrator handles everything.
              No layout thrashing, no jumps.
            */}
            <div
                className="group relative overflow-hidden rounded-[20px] border border-[rgba(99,140,255,0.25)] shadow-[0_0_0_1px_rgba(99,140,255,0.08),0_20px_60px_rgba(0,0,40,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(99,140,255,0.5)] hover:shadow-[0_0_0_1px_rgba(99,140,255,0.3),0_20px_60px_rgba(0,0,40,0.6),0_0_80px_rgba(99,140,255,0.3)]"
                style={{ background: "linear-gradient(145deg, #0e1628 0%, #0b1220 60%, #0d1530 100%)" }}
            >
                {/* TOP ACCENT LINE */}
                <div
                    className="absolute left-0 right-0 top-0 z-10 h-[3px]"
                    style={{ background: "linear-gradient(90deg, transparent, #4f7fff, #818cf8, #4f7fff, transparent)" }}
                />

                {/* WATERMARK — strictly bounded to this container, never bleeds into narrator */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.045]">
                    {MATH_SYMBOLS.map((sym, i) => (
                        <span key={i} style={{
                            position: "absolute",
                            fontSize: `${1.1 + (i % 5) * 0.5}rem`,
                            fontWeight: 300,
                            color: "#7eb8ff",
                            left: `${(i * 137.5) % 95}%`,
                            top: `${(i * 83.7) % 90}%`,
                            transform: `rotate(${(i * 23) % 60 - 30}deg)`,
                            fontFamily: "serif",
                            userSelect: "none",
                            whiteSpace: "nowrap",
                        }}>{sym}</span>
                    ))}
                </div>

                {/* HEADER */}
                <div className="relative z-10 flex flex-col gap-[0.3rem] border-b border-[rgba(99,140,255,0.12)] px-8 py-6 pb-5">
                    <div className="mb-2 inline-flex w-fit items-center gap-[0.4rem] rounded-[20px] border border-[rgba(79,127,255,0.25)] bg-[rgba(79,127,255,0.12)] px-3 py-1">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#7eb8ff]">
                            הגדרת יסוד
                        </span>
                    </div>
                    <h3 className="m-0 text-3xl font-bold leading-[1.2] tracking-tight text-[#e8f0ff]">
                        {block.title}
                    </h3>
                    {block.subtitle && (
                        <span className="text-sm font-normal italic text-[#6b8fc7]">
                            {block.subtitle}
                        </span>
                    )}
                </div>

                {/* FORMULA BODY */}
                <div className="relative z-10 flex items-center justify-center py-10 px-8">
                    <div
                        className="pointer-events-none absolute h-[120px] w-[300px] rounded-full"
                        style={{ background: "radial-gradient(ellipse, rgba(79,127,255,0.12) 0%, transparent 70%)" }}
                    />
                    <div
                        dir="ltr"
                        className="relative z-10 rounded-[14px] border border-[rgba(99,140,255,0.2)] bg-[rgba(10,20,50,0.5)] px-10 py-6 text-2xl md:text-4xl text-[#c8d8ff]"
                        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,30,0.4)" }}
                    >
                        <BlockMath math={block.katexString} />
                    </div>
                </div>

                {/* NARRATOR TOGGLE */}
                {hasNarratorData && (
                    <div className="relative z-10 flex justify-end px-8">
                        <button
                            onClick={() => setNarratorVisible(v => !v)}
                            className="mb-3 flex cursor-pointer items-center gap-[0.4rem] rounded-lg border border-[rgba(99,120,255,0.2)] bg-[rgba(99,120,255,0.1)] px-3 py-1 text-sm text-[#7eb8ff] transition-colors hover:bg-[rgba(99,120,255,0.15)]"
                        >
                            {narratorVisible ? "הסתר הסבר רחוב" : "הצג הסבר רחוב"} 💬
                        </button>
                    </div>
                )}

                {/* STREET NARRATOR STRIP
                  FIX: Use AnimatePresence with overflow:hidden wrapper.
                  Animate height from 0 to "auto" is unreliable.
                  Instead: wrap content in a div with known padding,
                  animate scaleY + opacity on the inner content,
                  and use a clipPath or max-height approach on the outer wrapper.
                  
                  Cleanest solution: animate the wrapper with 
                  initial height 0 via CSS, and use Framer Motion's 
                  custom height via a measured ref approach.
                */}
                {hasNarratorData && (
                    <AnimatePresence initial={false}>
                        {narratorVisible && (
                            <motion.div
                                key="narrator"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                {/* Inner div has the actual background — opaque, no bleed */}
                                <div
                                    className="relative z-10 flex items-start gap-4 border-t border-[rgba(99,80,220,0.2)] px-8 py-6"
                                    style={{ background: "#0e1628" }}
                                >
                                    <div
                                        className="mt-[0.1rem] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                                        style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}
                                    >
                                        💬
                                    </div>
                                    <div className="flex-1 border-r-[3px] border-[rgba(129,140,248,0.6)] pr-4">
                                        <div className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#818cf8]">
                                            הסבר רחוב
                                        </div>
                                        <div className="text-base font-normal leading-[1.75] text-[#c4b5fd]">
                                            {renderMathText(block.streetNarrator)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* BOTTOM ACCENT */}
                <div
                    className="absolute bottom-0 left-0 right-0 z-10 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,140,255,0.15), transparent)" }}
                />
            </div>
        </div>
    );
};