"use client";

import React, { useState } from "react";
import { Gamepad2, RefreshCcw } from "lucide-react";

interface Item {
    label: string;
    correctCategory: string;
}

interface InteractiveElementProps {
    data: {
        type: string;
        title: string;
        instructions: string;
        items: Item[];
    };
}

export const ClassificationGame: React.FC<InteractiveElementProps> = ({ data }) => {
    if (data.type !== "classification-game") return null;

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
    const [gameOver, setGameOver] = useState(false);

    // Dynamic categories extraction
    const categories = Array.from(new Set(data.items.map(item => item.correctCategory)));
    const currentItem = data.items[currentItemIndex];

    const handleGuess = (category: string) => {
        if (showResult !== null) return;

        const isCorrect = category === currentItem.correctCategory;
        setShowResult(isCorrect ? "correct" : "incorrect");

        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            setShowResult(null);
            if (currentItemIndex < data.items.length - 1) {
                setCurrentItemIndex(prev => prev + 1);
            } else {
                setGameOver(true);
            }
        }, 1500);
    };

    const resetGame = () => {
        setCurrentItemIndex(0);
        setScore(0);
        setShowResult(null);
        setGameOver(false);
    };

    if (gameOver) {
        return (
            <div className="w-full my-12 bg-card border border-border rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-3xl font-black mb-2">נגמר המשחק! 🏆</h3>
                <div className="text-6xl mb-6">
                    {score === data.items.length ? "🌟" : "👍"}
                </div>
                <p className="text-xl">
                    צדקת ב-{score} מתוך {data.items.length} סעיפים
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={resetGame}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        שחק שוב
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full my-12 bg-linear-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-2xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500 rounded-lg text-white">
                    <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">{data.title}</h2>
                    <p className="text-muted-foreground text-sm">{data.instructions}</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
                {/* Progress */}
                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                    <span>שאלה {currentItemIndex + 1} / {data.items.length}</span>
                    <span>ניקוד: {score}</span>
                </div>

                {/* The Card */}
                <div className={`
                    p-12 rounded-2xl shadow-lg text-2xl font-black bg-card border-2 transition-all duration-300 transform text-center min-h-[200px] flex flex-col items-center justify-center
                    ${showResult === "correct" ? "border-green-500 bg-green-50 dark:bg-green-950/20 scale-105" : ""}
                    ${showResult === "incorrect" ? "border-destructive bg-destructive/5 dark:bg-destructive/20 shake" : "border-border"}
                `}>
                    <span className="text-3xl mb-2">{currentItem.label}</span>

                    {showResult === "correct" && (
                        <div className="text-sm text-green-600 mt-4 font-bold animate-in fade-in slide-in-from-bottom-2">
                            נכון! 🎉
                        </div>
                    )}
                    {showResult === "incorrect" && (
                        <div className="text-sm text-destructive mt-4 font-bold animate-in fade-in slide-in-from-bottom-2">
                            לא נכון! זה {currentItem.correctCategory} 😬
                        </div>
                    )}
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleGuess(category)}
                            disabled={showResult !== null}
                            className="p-4 rounded-xl bg-background border border-border hover:border-primary hover:bg-accent/50 transition-all font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
