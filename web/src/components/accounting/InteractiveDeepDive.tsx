"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { DollarSign, Landmark, Briefcase, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple "Balancing Act" for the Intro Level
export function InteractiveDeepDive() {
    const [assets, setAssets] = useState(100000); // Cash + Machines
    const [liabilities, setLiabilities] = useState(40000); // Loans
    const [equity, setEquity] = useState(60000); // Owner's money

    // Simulation State
    const [activeScenario, setActiveScenario] = useState<string | null>(null);

    const handleAction = (action: string) => {
        if (activeScenario === action) return; // Prevent spamming for this simple demo

        switch (action) {
            case "loan":
                setAssets(prev => prev + 50000);
                setLiabilities(prev => prev + 50000);
                setActiveScenario("loan");
                break;
            case "buy_machine":
                // Asset swap: Cash goes down, Machine goes up. Total Asset Unchanged.
                // For simplicity visual, we just show "Structure Change" logic maybe?
                // Let's keep it simple: "Owner Investment"
                setAssets(prev => prev + 20000);
                setEquity(prev => prev + 20000);
                setActiveScenario("investment");
                break;
            case "pay_expense":
                setAssets(prev => prev - 5000);
                setEquity(prev => prev - 5000);
                setActiveScenario("expense");
                break;
            case "reset":
                setAssets(100000);
                setLiabilities(40000);
                setEquity(60000);
                setActiveScenario(null);
                break;
        }
    };

    const maxScale = 200000;
    const getHeight = (val: number) => Math.min((val / maxScale) * 100, 100);

    return (
        <GlassCard className="border-t-4 border-t-pink-500/50">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">המעבדה: משוואת המאזן</h3>
                <p className="text-slate-400 text-sm">
                    שחק עם המספרים וראה כיצד המאזן נשאר תמיד... מאוזן.
                </p>
            </div>

            {/* The Scale Visualization */}
            <div className="h-64 flex items-end justify-center gap-8 mb-8 p-4 bg-slate-950/30 rounded-xl relative overflow-hidden">

                {/* Left Side: Assets */}
                <div className="w-1/3 flex flex-col items-center group relative z-10">
                    <div
                        className="w-full bg-emerald-500/80 rounded-t-lg transition-all duration-700 ease-spring"
                        style={{ height: `${getHeight(assets)}%` }}
                    >
                        <div className="absolute top-2 left-0 right-0 text-center text-white font-bold drop-shadow-md">
                            {assets.toLocaleString()}
                        </div>
                    </div>
                    <div className="mt-2 text-emerald-400 font-bold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> נכסים
                    </div>
                </div>

                {/* Equals Sign */}
                <div className="text-4xl text-slate-600 font-black mb-8">=</div>

                {/* Right Side: Liab + Equity */}
                <div className="w-1/3 flex flex-col items-center group relative z-10 h-full justify-end">

                    {/* Liabilities Stack */}
                    <div
                        className="w-full bg-pink-500/80 rounded-t-lg transition-all duration-700 ease-spring relative mb-1"
                        style={{ height: `${getHeight(liabilities)}%` }}
                    >
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center text-white/90 text-xs font-bold">
                            התחייבויות
                        </div>
                    </div>

                    {/* Equity Stack */}
                    <div
                        className="w-full bg-indigo-500/80 rounded-b-lg transition-all duration-700 ease-spring relative"
                        style={{ height: `${getHeight(equity)}%` }}
                    >
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center text-white/90 text-xs font-bold">
                            הון עצמי
                        </div>
                    </div>

                    <div className="mt-2 text-indigo-400 font-bold flex items-center gap-2">
                        <Landmark className="w-4 h-4" /> מקורות מימון
                    </div>
                </div>

            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                    onClick={() => handleAction("loan")}
                    className="p-3 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 transition-all flex flex-col items-center gap-2 text-xs font-medium"
                >
                    <Briefcase className="w-4 h-4" />
                    קח הלוואה (50K)
                </button>
                <button
                    onClick={() => handleAction("buy_machine")}
                    className="p-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all flex flex-col items-center gap-2 text-xs font-medium"
                >
                    <Plus className="w-4 h-4" />
                    השקעת בעלים (20K)
                </button>
                <button
                    onClick={() => handleAction("pay_expense")}
                    className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition-all flex flex-col items-center gap-2 text-xs font-medium"
                >
                    <Minus className="w-4 h-4" />
                    תשלום הוצאה (5K)
                </button>
                <button
                    onClick={() => handleAction("reset")}
                    className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all flex flex-col items-center gap-2 text-xs font-medium"
                >
                    <span>🔄</span>
                    איפוס
                </button>
            </div>
        </GlassCard>
    );
}
