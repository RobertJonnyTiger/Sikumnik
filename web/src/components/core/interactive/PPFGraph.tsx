"use client";

import React, { useState } from "react";
import { InteractiveGraph } from "./InteractiveGraph";
import { CurveElement } from "./CurveElement";
import { InteractionLayer } from "./InteractionLayer";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PPFGraphProps {
    className?: string;
}

/**
 * PPFGraph Component
 * Specifically designed for Chapter 2 to demonstrate the Production Possibility Frontier.
 * Features a concave curve and a draggable point to show efficiency vs. unemployment.
 */
export const PPFGraph: React.FC<PPFGraphProps> = ({ className }) => {
    const [techLevel, setTechLevel] = useState(100);
    const [pointX, setPointX] = useState(40);

    // Concave PPF Equation: Y = sqrt(R^2 - X^2)
    const getPPFY = (x: number, radius: number) => {
        const val = Math.pow(radius, 2) - Math.pow(x, 2);
        return val > 0 ? Math.sqrt(val) : 0;
    };

    const currentY = getPPFY(pointX, techLevel);

    return (
        <div className={cn("space-y-8", className)}>
            <div className="relative aspect-square max-w-[500px] mx-auto">
                <InteractiveGraph
                    xAxisLabel="חינוך (X)"
                    yAxisLabel="ביטחון (Y)"
                >
                    {/* The Frontier */}
                    <CurveElement
                        equation={(x) => getPPFY(x, techLevel)}
                        label="עקומת התמורה"
                        color="#2dd4bf"
                    />

                    {/* Interactive Point */}
                    <InteractionLayer
                        activePoint={{ x: pointX, y: currentY }}
                    />

                    {/* Interior Point (Unemployment Example) */}
                    <motion.circle
                        cx="150"
                        cy="350"
                        r="6"
                        className="fill-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    />
                    <text x="165" y="355" className="fill-rose-400 text-[10px] font-bold">אבטלה</text>
                </InteractiveGraph>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="space-y-4">
                    <label className="text-xs font-bold text-teal-400 uppercase tracking-widest block text-right">
                        בחירת תמהיל ייצור (Move X)
                    </label>
                    <Slider
                        value={[pointX]}
                        onValueChange={(v: number[]) => setPointX(v[0])}
                        max={techLevel}
                        step={1}
                        className="dir-ltr"
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest block text-right">
                        שיפור טכנולוגי (Tech Level)
                    </label>
                    <Slider
                        value={[techLevel]}
                        onValueChange={(v: number[]) => setTechLevel(v[0])}
                        min={80}
                        max={120}
                        step={1}
                        className="dir-ltr"
                    />
                </div>
            </div>
        </div>
    );
};
