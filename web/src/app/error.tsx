"use client";

import React from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-background px-6"
            dir="rtl"
        >
            <div className="glass-card p-8 text-center max-w-md space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-error/10 flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                    משהו השתבש
                </h2>
                <p className="text-text-secondary leading-relaxed">
                    אירעה שגיאה בלתי צפויה. נסו לרענן את הדף או לחזור לדף הבית.
                </p>
                {process.env.NODE_ENV === "development" && error.message && (
                    <pre className="text-xs text-error/80 bg-error/5 p-3 rounded-lg overflow-auto text-start max-h-32">
                        {error.message}
                    </pre>
                )}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        נסה שוב
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 bg-secondary text-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        דף הבית
                    </a>
                </div>
            </div>
        </div>
    );
}
