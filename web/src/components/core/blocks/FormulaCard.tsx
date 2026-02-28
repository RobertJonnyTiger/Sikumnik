"use client";

import React from "react";
import type { Variable } from "@/types/chapter";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface FormulaCardProps {
    title: string;
    description?: string;
    formula: string;
    variables?: Variable[];
    className?: string;
}

const VAR_COLORS = [
    { bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.4)", text: "#93c5fd" }, // Blue
    { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.4)", text: "#6ee7b7" }, // Emerald
    { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.4)", text: "#fdba74" }, // Orange
    { bg: "rgba(232,121,249,0.15)", border: "rgba(232,121,249,0.4)", text: "#f0abfc" }, // Fuchsia
    { bg: "rgba(250,204,21,0.15)", border: "rgba(250,204,21,0.4)", text: "#fde047" }, // Yellow
    { bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.4)", text: "#fca5a5" }, // Red
];

function chunkPairs(arr: Variable[]) {
    const rows = [];
    for (let i = 0; i < arr.length; i += 2) {
        rows.push(arr.slice(i, i + 2));
    }
    return rows;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
    title,
    description,
    formula,
    variables,
    className = ''
}) => {
    const varRows = chunkPairs(variables || []);

    return (
        <div
            dir="rtl"
            className={`w-full overflow-hidden rounded-[20px] transition-all duration-300 ${className}`}
            style={{
                background: "linear-gradient(160deg, #12101e 0%, #0e0c1a 100%)",
                border: "1px solid rgba(168,140,255,0.2)",
                boxShadow: "0 0 0 1px rgba(168,140,255,0.05), 0 24px 60px rgba(0,0,20,0.7)"
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,140,255,0.2), 0 24px 60px rgba(0,0,20,0.7), 0 0 40px rgba(168,140,255,0.12)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(168,140,255,0.05), 0 24px 60px rgba(0,0,20,0.7)";
            }}
        >
            {/* Top accent line */}
            <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #a08cff, #c4b5fd, #a08cff, transparent)" }} />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(168,140,255,0.1)] px-7 py-[1.2rem] pb-[1rem]">
                <span className="text-base font-bold text-[#d4c8ff]">{title}</span>
                <span className="rounded-[20px] border border-[rgba(168,140,255,0.15)] bg-[rgba(168,140,255,0.08)] px-[0.6rem] py-[0.2rem] text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#7c6aaa]">
                    נוסחה
                </span>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center px-7 pt-7 pb-3">
                <div
                    className="pointer-events-none absolute h-[70px] w-[200px] rounded-[50%]"
                    style={{ background: "radial-gradient(ellipse, rgba(160,140,255,0.1) 0%, transparent 70%)" }}
                />
                <div
                    dir="ltr"
                    className="relative inline-block rounded-xl border border-[rgba(168,140,255,0.18)] bg-[rgba(168,140,255,0.07)] px-6 py-3 text-center text-2xl font-bold text-[#e8e0ff] max-w-[85%]"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                    <BlockMath math={formula} />
                </div>
            </div>

            {/* Description */}
            {description && (
                <div className="flex w-full justify-center px-7 pb-6 pt-1">
                    <p className="m-0 text-center text-[0.85rem] font-medium leading-[1.6] italic text-[#7c6aaa] max-w-[90%]">
                        {description}
                    </p>
                </div>
            )}

            {/* Variables grid */}
            {variables && variables.length > 0 && (
                <div className="border-t border-[rgba(168,140,255,0.1)] px-7 pb-6 pt-4">
                    <div className="mb-3 text-right text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#3d3056]">
                        משתנים
                    </div>

                    <div className="flex flex-col gap-2">
                        {varRows.map((row, rowIdx) => (
                            <div
                                key={rowIdx}
                                className="grid gap-2"
                                style={{ gridTemplateColumns: row.length === 2 ? "1fr 1fr" : "1fr" }}
                            >
                                {row.map((v, colIdx) => {
                                    const globalIdx = rowIdx * 2 + colIdx;
                                    const c = VAR_COLORS[globalIdx % VAR_COLORS.length];
                                    return (
                                        <div
                                            key={globalIdx}
                                            className="flex items-center justify-start gap-2 rounded-lg border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] px-[0.6rem] py-[0.4rem]"
                                        >
                                            <span
                                                dir="ltr"
                                                className="shrink-0 rounded-md border px-[0.5rem] py-[0.1rem] text-center font-serif text-[0.9rem] font-bold"
                                                style={{
                                                    color: c.text, background: c.bg, borderColor: c.border, minWidth: "1.8rem"
                                                }}
                                            >
                                                {v.symbol}
                                            </span>
                                            <span className="text-[0.7rem] text-[#2e2545]">—</span>
                                            <span className="text-[0.82rem] leading-[1.3] text-[#9d91c0]">
                                                {v.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
