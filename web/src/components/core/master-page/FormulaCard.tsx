import React from "react";
import { cn } from "@/lib/utils";
import { LatexRenderer } from "../LatexRenderer";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

interface FormulaCardProps {
    label: string;
    formula: string;
    subtext?: string;
    className?: string;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
    label,
    formula,
    subtext,
    className
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 p-6 backdrop-blur-sm transition-all hover:bg-slate-800/60 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 text-slate-400 group-hover:text-teal-400 transition-colors">
                <Calculator size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>

            {/* Formula Area - Auto Scroll */}
            <div className="mb-4 text-slate-100 group-hover:scale-105 transition-transform origin-left overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <LatexRenderer formula={formula} />
            </div>

            {/* Explanation */}
            {subtext && (
                <div className="text-sm text-slate-500 border-t border-slate-800 pt-3 mt-3">
                    {subtext}
                </div>
            )}

            {/* Aesthetic Decor */}
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-teal-500 blur-[2px]" />
            </div>
        </motion.div>
    );
};
