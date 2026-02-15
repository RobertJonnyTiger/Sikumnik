"use client";

import React, { useState } from "react";
import { useGraph } from "./InteractiveGraph";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractionLayerProps {
    /**
     * Optional primary curve to probe for values.
     */
    primaryEquation?: (q: number) => number;
    /**
     * Externally controlled point to display (useful for manual sliders).
     */
    activePoint?: { x: number; y: number };
    className?: string;
}

export const InteractionLayer: React.FC<InteractionLayerProps> = ({
    primaryEquation,
    activePoint,
    className,
}) => {
    const { xScale, yScale, invertX, invertY, viewBox } = useGraph();
    const { width, height, padding } = viewBox;

    const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; q: number; p: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
        const svg = e.currentTarget.ownerSVGElement;
        if (!svg) return;
        const CTM = svg.getScreenCTM();
        if (!CTM) return;

        // Get point in SVG coordinates
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgPt = pt.matrixTransform(CTM.inverse());

        // Constraints: Only respond within padding bounds
        if (svgPt.x < padding || svgPt.x > width - padding || svgPt.y < padding || svgPt.y > height - padding) {
            setHoveredPoint(null);
            return;
        }

        const q = invertX(svgPt.x);
        const p = primaryEquation ? primaryEquation(q) : invertY(svgPt.y);

        setHoveredPoint({
            x: xScale(q),
            y: yScale(p),
            q,
            p
        });
    };

    const displayPoint = activePoint ? { ...activePoint, q: invertX(activePoint.x), p: invertY(activePoint.y) } : hoveredPoint;

    return (
        <g className={cn("interaction-layer", className)}>
            {/* Invisible overlay for capturing mouse events */}
            <rect
                x={padding}
                y={padding}
                width={width - 2 * padding}
                height={height - 2 * padding}
                fill="transparent"
                className="cursor-crosshair pointer-events-auto"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
            />

            <AnimatePresence>
                {displayPoint && (
                    <g className="crosshairs pointer-events-none">
                        {/* Guide Lines */}
                        <motion.line
                            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
                            x1={padding} y1={displayPoint.y}
                            x2={displayPoint.x} y2={displayPoint.y}
                            stroke="white" strokeWidth="1" strokeDasharray="4 4"
                        />
                        <motion.line
                            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
                            x1={displayPoint.x} y1={height - padding}
                            x2={displayPoint.x} y2={displayPoint.y}
                            stroke="white" strokeWidth="1" strokeDasharray="4 4"
                        />

                        {/* Pivot Point */}
                        <motion.circle
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            cx={displayPoint.x} cy={displayPoint.y}
                            r="6" fill="#2dd4bf"
                            className="shadow-neon"
                        />

                        {/* Tooltip Labels */}
                        <motion.g
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            {/* Price Label (Y-Axis) */}
                            <text
                                x={padding - 10}
                                y={displayPoint.y + 4}
                                textAnchor="end"
                                className="fill-white font-mono text-[10px] font-bold"
                            >
                                {Math.round(displayPoint.p)}
                            </text>

                            {/* Quantity Label (X-Axis) */}
                            <text
                                x={displayPoint.x}
                                y={height - padding + 20}
                                textAnchor="middle"
                                className="fill-white font-mono text-[10px] font-bold"
                            >
                                {Math.round(displayPoint.q)}
                            </text>
                        </motion.g>
                    </g>
                )}
            </AnimatePresence>
        </g>
    );
};
