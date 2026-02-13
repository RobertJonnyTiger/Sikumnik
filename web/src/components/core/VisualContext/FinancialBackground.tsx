"use client";

import React from "react";
import { getConnotationVisuals } from "@/lib/financial-utils";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialBackgroundProps {
    term: string;
    className?: string;
    opacity?: number; // 0-100
}

export const FinancialBackground: React.FC<FinancialBackgroundProps> = ({
    term,
    className,
    opacity = 5
}) => {
    const visuals = getConnotationVisuals({ text: term });

    // Only render if there is a distinct trend (up/down)
    if (visuals.trend === "neutral") return null;

    const isPositive = visuals.trend === "up";

    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none overflow-hidden select-none",
                className
            )}
            aria-hidden="true"
        >
            {/* Main Icon Watermark */}
            <div
                className={cn(
                    "absolute -right-4 -bottom-4 transform rotate-12 transition-all duration-500",
                    isPositive ? "text-emerald-500" : "text-rose-500"
                )}
                style={{ opacity: opacity / 100 }}
            >
                {isPositive ? (
                    <TrendingUp size={120} strokeWidth={1} />
                ) : (
                    <TrendingDown size={120} strokeWidth={1} />
                )}
            </div>

            {/* SVG Chart Line (Subtle background curve) */}
            <svg
                className={cn(
                    "absolute bottom-0 left-0 w-full h-24 opacity-10",
                    isPositive ? "text-emerald-500" : "text-rose-500"
                )}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
            >
                <path
                    d={isPositive
                        ? "M0 20 Q 25 20 40 15 T 70 5 T 100 0 V 20 H 0 Z"
                        : "M0 0 Q 30 5 50 15 T 100 20 V 20 H 0 V 0 Z"
                    }
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
