"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * [INTERACTIVE LAB] PPC Shifter
 * Visualizes how technology/grants shift the Production Possibility Curve.
 * - Neutral Growth: Shifts both intercepts.
 * - Biased Growth: Shifts only one intercept.
 */
export const PPCShifter = () => {
    const [techX, setTechX] = useState(1); //Multiplier for X-axis (1.0 - 2.0)
    const [techY, setTechY] = useState(1); //Multiplier for Y-axis (1.0 - 2.0)

    // Base Curve Values (Quarter Circle approximation)
    const baseX = 300;
    const baseY = 300;

    // Calculated Endpoints
    const currentX = baseX * techX;
    const currentY = baseY * techY;

    // SVG Path Generator for a smooth curve (Elliptical Arc)
    // M 0,Y A rx,ry 0 0 1 X,0
    // Start at (0, currentY), Arc to (currentX, 0)
    const getPath = (x: number, y: number) => {
        return `M 50,${400 - y} A ${x},${y} 0 0 1 ${50 + x},400`;
    };

    const reset = () => {
        setTechX(1);
        setTechY(1);
    };

    return (
        <div className="w-full bg-background/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-12">

                {/* 1. The Graph Visualization */}
                <div className="flex-1 relative aspect-square md:aspect-video bg-card/50 rounded-2xl border border-border overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <svg className="w-full h-full" viewBox="0 0 800 500">
                        {/* Axes */}
                        <line x1="50" y1="50" x2="50" y2="400" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                        <line x1="50" y1="400" x2="750" y2="400" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Labels */}
                        <text x="30" y="40" fill="#94a3b8" fontSize="14" fontWeight="bold">מוצר Y</text>
                        <text x="760" y="410" fill="#94a3b8" fontSize="14" fontWeight="bold">מוצר X</text>

                        {/* Base Curve (Dashed Ghost) */}
                        {(techX > 1 || techY > 1) && (
                            <path
                                d={getPath(baseX, baseY)}
                                fill="none"
                                stroke="#475569"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                opacity="0.5"
                            />
                        )}

                        {/* Active Curve */}
                        <motion.path
                            d={getPath(currentX, currentY)}
                            fill="none"
                            stroke="url(#gradientCurve)"
                            strokeWidth="4"
                            initial={false}
                            animate={{ d: getPath(currentX, currentY) }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />

                        {/* Defs for gradients/markers */}
                        <defs>
                            <linearGradient id="gradientCurve" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                            </marker>
                        </defs>
                    </svg>

                    {/* Dynamic Labels for Growth Type */}
                    <div className="absolute top-4 right-4 pointer-events-none">
                        {techX > 1 && techY > 1 && techX === techY && (
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-200">
                                ✨ צמיחה ניטרלית (Neutral)
                            </span>
                        )}
                        {techX > 1 && techY === 1 && (
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-200">
                                🚀 צמיחה מוטה ל-X (Biased)
                            </span>
                        )}
                        {techY > 1 && techX === 1 && (
                            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/30">
                                🚀 צמיחה מוטה ל-Y (Biased)
                            </span>
                        )}
                    </div>
                </div>

                {/* 2. Controls */}
                <div className="w-full md:w-80 space-y-8">
                    <div>
                        <h3 className="text-2xl font-black text-foreground mb-2 flex items-center gap-2">
                            <Zap className="text-yellow-400" />
                            מרכז השליטה
                        </h3>
                        <p className="text-muted-foreground text-sm">שלוט בטכנולוגיה וראה כיצד עקומת התמורה מגיבה.</p>
                    </div>

                    {/* Tech X Control */}
                    <div className="space-y-4 bg-card/30 p-5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center">
                            <label className="text-foreground font-bold">טכנולוגיה במוצר X</label>
                            <span className="text-blue-700 font-mono font-bold">x{techX.toFixed(1)}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="2"
                            step="0.1"
                            value={techX}
                            onChange={(e) => setTechX(parseFloat(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <p className="text-xs text-muted-foreground">למשל: המצאת דשן חדש (משפר עגבניות)</p>
                    </div>

                    {/* Tech Y Control */}
                    <div className="space-y-4 bg-card/30 p-5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center">
                            <label className="text-foreground font-bold">טכנולוגיה במוצר Y</label>
                            <span className="text-purple-400 font-mono font-bold">x{techY.toFixed(1)}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="2"
                            step="0.1"
                            value={techY}
                            onChange={(e) => setTechY(parseFloat(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <p className="text-xs text-muted-foreground">למשל: שדרוג תשתיות אינטרנט (משפר הייטק)</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <button
                            onClick={reset}
                            className="w-full py-3 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <RefreshCcw size={18} />
                            אפס נתונים
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
