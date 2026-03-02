"use client";

import React, { useState } from "react";
import { InteractiveGraph } from "./InteractiveGraph";
import { CurveElement } from "./CurveElement";
import { InteractionLayer } from "./InteractionLayer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface ShifterOption {
    id: string;
    label: string;
    effect: "positive" | "negative";
    description?: string;
}

interface CurveShifterProps {
    title?: string;
    description?: string;
    shifters: ShifterOption[];
    initialIntercept?: number;
    slope?: number;
    className?: string;
}

/**
 * CurveShifter: The user-facing interactive component for Microeconomics.
 * Allows students to toggle external factors (like Income or Trends) and see the curve shift.
 */
export const CurveShifter: React.FC<CurveShifterProps> = ({
    title,
    description,
    shifters,
    initialIntercept = 80,
    slope = 0.8,
    className,
}) => {
    // State: current 'a' parameter for P = a - bQ
    const [intercept, setIntercept] = useState(initialIntercept);
    const [activeShifter, setActiveShifter] = useState<string | null>(null);

    const handleShifterToggle = (id: string, effect: "positive" | "negative") => {
        if (activeShifter === id) {
            setIntercept(initialIntercept);
            setActiveShifter(null);
        } else {
            const shiftAmount = effect === "positive" ? 20 : -20;
            setIntercept(initialIntercept + shiftAmount);
            setActiveShifter(id);
        }
    };

    // The Demand Equation: P = a - bQ
    const currentEquation = (q: number) => intercept - slope * q;
    const originalEquation = (q: number) => initialIntercept - slope * q;

    return (
        <div className={cn("curve-shifter space-y-6", className)}>
            <div className="header-box pl-4 border-l-4 border-teal-200">
                <h3 className="text-xl font-bold text-foreground uppercase tracking-tight italic">
                    {title || "סימולטור עקומת ביקוש"}
                </h3>
                {description && (
                    <p className="text-muted-foreground text-sm mt-1">{description}</p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Interaction Controls Area */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Info size={14} className="text-secondary-foreground" />
                        בחר גורם משפיע (Shifters)
                    </div>

                    {shifters.map((shifter) => (
                        <button
                            key={shifter.id}
                            onClick={() => handleShifterToggle(shifter.id, shifter.effect)}
                            className={cn(
                                "w-full text-right p-4 rounded-2xl border transition-all duration-300 group",
                                activeShifter === shifter.id
                                    ? "bg-secondary/10 border-teal-200 ring-1 ring-ring/20"
                                    : "bg-card border-border hover:border-border"
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    activeShifter === shifter.id ? "bg-teal-400 animate-pulse" : "bg-slate-700"
                                )} />
                                <div className="text-sm font-bold text-foreground group-hover:text-foreground transition-colors">
                                    {shifter.label}
                                </div>
                            </div>
                            {shifter.description && (
                                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                                    {shifter.description}
                                </p>
                            )}
                        </button>
                    ))}

                    <div className="pt-6 mt-6 border-t border-border/50">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-muted-foreground uppercase">
                            <span>Intercept (a)</span>
                            <span className="text-secondary-foreground font-bold">{intercept}</span>
                        </div>
                        <input
                            type="range"
                            min="40" max="100"
                            value={intercept}
                            onChange={(e) => {
                                setIntercept(Number(e.target.value));
                                setActiveShifter(null);
                            }}
                            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-teal-500 mt-2"
                        />
                    </div>
                </div>

                {/* Visual Graph Area */}
                <div className="lg:col-span-8">
                    <InteractiveGraph
                        title="P = a - 0.8Q"
                        xAxisLabel="כמות (Q)"
                        yAxisLabel="מחיר (P)"
                    >
                        {/* Original (Fixed) Reference Curve if shifted */}
                        {activeShifter && (
                            <CurveElement
                                equation={originalEquation}
                                color="rgb(51, 65, 85)" // Slate-700
                                label="D0 (מקור)"
                            />
                        )}

                        {/* Current (Dynamic) Curve */}
                        <CurveElement
                            equation={currentEquation}
                            color="#2dd4bf"
                            label={activeShifter ? "D1 (חדש)" : "D"}
                        />

                        <InteractionLayer primaryEquation={currentEquation} />
                    </InteractiveGraph>
                </div>
            </div>
        </div>
    );
};
