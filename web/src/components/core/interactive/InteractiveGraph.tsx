"use client";

import React, { createContext, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * GraphContext: Shares the scaling logic and dimensions with all child elements.
 */
interface GraphContextType {
    xScale: (q: number) => number;
    yScale: (p: number) => number;
    invertX: (svgX: number) => number;
    invertY: (svgY: number) => number;
    viewBox: { width: number; height: number; padding: number };
}

const GraphContext = createContext<GraphContextType | null>(null);

export const useGraph = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error("useGraph must be used within an InteractiveGraph");
    return context;
};

interface InteractiveGraphProps {
    children: React.ReactNode;
    maxQ?: number;
    maxP?: number;
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    className?: string;
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
    children,
    maxQ = 100,
    maxP = 100,
    title,
    xAxisLabel = "Q",
    yAxisLabel = "P",
    className,
}) => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const scales = useMemo(() => ({
        xScale: (q: number) => padding + (q / maxQ) * (width - 2 * padding),
        yScale: (p: number) => height - padding - (p / maxP) * (height - 2 * padding),
        invertX: (svgX: number) => ((svgX - padding) / (width - 2 * padding)) * maxQ,
        invertY: (svgY: number) => ((height - padding - svgY) / (height - 2 * padding)) * maxP,
        viewBox: { width, height, padding },
    }), [maxQ, maxP]);

    return (
        <GraphContext.Provider value={scales}>
            <div className={cn(
                "group relative w-full aspect-square max-w-xl mx-auto bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-4 shadow-2xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(45,212,191,0.2)] hover:border-primary/50 transition-all duration-300",
                className
            )}>
                {title && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-muted-foreground font-bold uppercase tracking-widest text-xs opacity-50">
                        {title}
                    </div>
                )}

                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Grid Lines (Subtle) */}
                    <g className="grid-lines opacity-10">
                        {[0, 25, 50, 75, 100].map((v) => (
                            <React.Fragment key={v}>
                                <line
                                    x1={scales.xScale(v)} y1={padding}
                                    x2={scales.xScale(v)} y2={height - padding}
                                    stroke="currentColor" strokeWidth="1"
                                />
                                <line
                                    x1={padding} y1={scales.yScale(v)}
                                    x2={width - padding} y2={scales.yScale(v)}
                                    stroke="currentColor" strokeWidth="1"
                                />
                            </React.Fragment>
                        ))}
                    </g>

                    {/* Axes */}
                    <g className="axes text-muted-foreground">
                        {/* Y Axis */}
                        <motion.line
                            x1={padding} y1={height - padding}
                            x2={padding} y2={padding}
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />
                        {/* X Axis */}
                        <motion.line
                            x1={padding} y1={height - padding}
                            x2={width - padding} y2={height - padding}
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />

                        {/* Labels */}
                        <text
                            x={width - padding + 10} y={height - padding + 5}
                            className="fill-slate-500 font-mono text-sm font-bold"
                        >
                            {xAxisLabel}
                        </text>
                        <text
                            x={padding - 35} y={padding}
                            className="fill-slate-500 font-mono text-sm font-bold"
                        >
                            {yAxisLabel}
                        </text>
                    </g>

                    {/* Dynamic Content */}
                    {children}
                </svg>
            </div>
        </GraphContext.Provider>
    );
};
