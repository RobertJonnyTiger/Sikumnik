"use client";

import React from "react";
import { useGraph } from "./InteractiveGraph";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CurveElementProps {
    /**
     * Function that takes Quantity (Q) and returns Price (P).
     * For Demand: P = a - bQ
     */
    equation: (q: number) => number;
    label?: string;
    color?: string;
    className?: string;
    showPoints?: boolean;
}

export const CurveElement: React.FC<CurveElementProps> = ({
    equation,
    label,
    color = "rgb(45, 212, 191)", // Teal-400
    className,
    showPoints = false,
}) => {
    const { xScale, yScale, viewBox } = useGraph();
    const { width, padding } = viewBox;

    // Generate points for the SVG path
    // We sample 10 points for smooth drawing (linear curves only need 2, but we support non-linear)
    const samples = 20;
    const pathData = React.useMemo(() => {
        let d = "";
        for (let i = 0; i <= samples; i++) {
            // Map sample index to economic Quantity (0 to maxQ, assumed 100 for now)
            const q = (i / samples) * 100;
            const p = equation(q);

            // Only draw if within bounds
            if (p < 0 || p > 100) continue;

            const x = xScale(q);
            const y = yScale(p);

            if (d === "") {
                d = `M ${x} ${y}`;
            } else {
                d += ` L ${x} ${y}`;
            }
        }
        return d;
    }, [equation, xScale, yScale, samples]);

    return (
        <g className={cn("curve-element", className)}>
            {/* Ghost/Shadow Glow */}
            <motion.path
                d={pathData}
                fill="transparent"
                stroke={color}
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-5 blur-md"
                animate={{ d: pathData }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />

            {/* Main Curve */}
            <motion.path
                d={pathData}
                fill="transparent"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: pathData }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
            />

            {/* Optional Curve Label */}
            {label && (
                <motion.text
                    layout
                    x={xScale(85)}
                    y={yScale(equation(85)) - 15}
                    className="fill-white font-mono text-[10px] font-bold uppercase tracking-widest opacity-80"
                >
                    {label}
                </motion.text>
            )}
        </g>
    );
};
