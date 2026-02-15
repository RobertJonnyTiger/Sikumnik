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

    const maxScale = 250000;
    const getHeight = (val: number) => Math.min((val / maxScale) * 100, 100);

    return (
        <GlassCard className="border-t-8 border-t-accent/40 my-24 p-10 md:p-16 rounded-[3rem] bg-card/40 backdrop-blur-3xl shadow-premium font-main">
            <div className="mb-12 border-b-2 border-border/20 pb-8">
                <div className="flex items-center gap-6 mb-4">
                    <div className="p-3 bg-accent/20 rounded-2xl text-accent border border-accent/30 shadow-neon">
                        <Landmark className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white">המעבדה: משוואת המאזן</h3>
                </div>
                <p className="text-foreground/60 text-xl font-medium">
                    שינוי אחד משפיע על הכל. <span className="text-accent font-black underline decoration-accent/30 underline-offset-8">המאזן חייב להישאר מאוזן.</span>
                </p>
            </div>

            {/* The Scale Visualization - Truth 2.0 High Contrast */}
            <div className="h-96 flex items-end justify-center gap-12 mb-16 p-10 bg-black/40 rounded-[2.5rem] border-2 border-border/10 relative overflow-hidden group/lab shadow-inner">
                {/* Visual Flair */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-accent/5 to-transparent pointer-events-none" />

                {/* Left Side: Assets */}
                <div className="w-1/3 flex flex-col items-center group relative z-10 transition-transform duration-500 hover:scale-105">
                    <div
                        className="w-full bg-primary/80 backdrop-blur-md rounded-t-3xl transition-all duration-1000 ease-out border-t-4 border-primary/50 shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.2)]"
                        style={{ height: `${getHeight(assets)}%` }}
                    >
                        <div className="absolute -top-12 left-0 right-0 text-center text-white text-3xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            {assets.toLocaleString()}
                        </div>
                    </div>
                    <div className="mt-4 text-primary font-black text-xl uppercase tracking-widest flex flex-col items-center gap-2">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <Plus className="w-6 h-6" />
                        </div>
                        נכסי העסק
                    </div>
                </div>

                {/* Equals Sign */}
                <div className="text-6xl text-border font-black mb-24 opacity-40 select-none">=</div>

                {/* Right Side: Liab + Equity */}
                <div className="w-1/3 flex flex-col items-center group relative z-10 h-full justify-end transition-transform duration-500 hover:scale-105">

                    {/* Liabilities Stack */}
                    <div
                        className="w-full bg-accent/80 backdrop-blur-md rounded-t-3xl transition-all duration-1000 ease-out border-t-4 border-accent/50 shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.2)] relative mb-2"
                        style={{ height: `${getHeight(liabilities)}%` }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs md:text-base uppercase tracking-widest opacity-80">
                            התחייבויות
                        </div>
                    </div>

                    {/* Equity Stack */}
                    <div
                        className="w-full bg-white/20 backdrop-blur-md rounded-b-3xl transition-all duration-1000 ease-out border-b-4 border-white/40 relative"
                        style={{ height: `${getHeight(equity)}%` }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs md:text-base uppercase tracking-widest opacity-80">
                            הון עצמי
                        </div>
                    </div>

                    <div className="mt-4 text-accent font-black text-xl uppercase tracking-widest flex flex-col items-center gap-2">
                        <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                            <Landmark className="w-6 h-6" />
                        </div>
                        מקורות מימון
                    </div>
                </div>

            </div>

            {/* Controls - Refined UI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-main">
                <button
                    onClick={() => handleAction("loan")}
                    className="group/btn p-6 rounded-3xl bg-accent/10 hover:bg-accent/20 text-accent border-2 border-accent/20 transition-all flex flex-col items-center gap-3 text-lg font-black uppercase tracking-widest shadow-lg hover:shadow-accent/10 active:scale-95"
                >
                    <Briefcase className="w-8 h-8 group-hover/btn:rotate-12 transition-transform" />
                    קח הלוואה
                </button>
                <button
                    onClick={() => handleAction("buy_machine")}
                    className="group/btn p-6 rounded-3xl bg-primary/10 hover:bg-primary/20 text-primary border-2 border-primary/20 transition-all flex flex-col items-center gap-3 text-lg font-black uppercase tracking-widest shadow-lg hover:shadow-primary/10 active:scale-95"
                >
                    <Plus className="w-8 h-8 group-hover/btn:rotate-90 transition-transform" />
                    השקעת בעלים
                </button>
                <button
                    onClick={() => handleAction("pay_expense")}
                    className="group/btn p-6 rounded-3xl bg-error/10 hover:bg-error/20 text-error border-2 border-error/20 transition-all flex flex-col items-center gap-3 text-lg font-black uppercase tracking-widest shadow-lg hover:shadow-error/10 active:scale-95"
                >
                    <Minus className="w-8 h-8 group-hover/btn:-rotate-90 transition-transform" />
                    תשלום הוצאה
                </button>
                <button
                    onClick={() => handleAction("reset")}
                    className="group/btn p-6 rounded-3xl bg-secondary/20 hover:bg-secondary/40 text-white border-2 border-white/5 transition-all flex flex-col items-center gap-3 text-lg font-black uppercase tracking-widest shadow-lg active:scale-95"
                >
                    <span className="text-2xl group-hover/btn:rotate-180 transition-transform duration-700">🔄</span>
                    איפוס
                </button>
            </div>
        </GlassCard>
    );
}
