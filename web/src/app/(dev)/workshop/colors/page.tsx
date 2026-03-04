"use client";

import React from 'react';

const RAW_CSS_ROOT = `@theme {
  /* Theme - "Accessible Education Indigo" */
  /* Base & Surfaces */
  --color-background: #FCFBFA; /* Warm Alabaster */
  --color-foreground: #1C1917; /* Stone 900 */
  --color-text-secondary: #57534E; /* Stone 500 */
  
  --color-card: #FFFFFF; /* Pure White */
  --color-card-foreground: #1C1917; /* Stone 900 */
  --color-glass: rgba(255, 255, 255, 0.85); /* Frost Glass */
  
  --color-popover: #FFFFFF;
  --color-popover-foreground: #1C1917;
  
  --color-muted: #F5F5F4; /* Stone 100 */
  --color-muted-foreground: #57534E; /* Stone 500 */
  
  --color-border: #E7E5E4; /* Stone 200 */
  --color-input: #E7E5E4; /* Stone 200 */
  --color-ring: #6366F1; /* Indigo 500 */

  /* Brand Colors */
  --color-primary: #6366F1; /* Indigo 500 */
  --color-primary-foreground: #FFFFFF;
  
  --color-secondary: #EEF2FF; /* Indigo 50 */
  --color-secondary-foreground: #4338CA; /* Indigo 700 */
  
  --color-accent: #E0E7FF; /* Indigo 100 */
  --color-accent-foreground: #3730A3; /* Indigo 800 */

  /* Semantic - Standardized to Tailwind Standards */
  --color-success: #10B981; /* Emerald 500 */
  --color-success-foreground: #FFFFFF;
  --color-success-bg: #D1FAE5; /* Emerald 100 */
  --color-success-border: #34D399; /* Emerald 400 */
  
  --color-error: #EF4444; /* Red 500 */
  --color-error-foreground: #FFFFFF;
  --color-error-bg: #FEE2E2; /* Red 100 */
  --color-error-border: #F87171; /* Red 400 */
  --color-destructive: #EF4444; /* Red 500 */
  --color-destructive-foreground: #FFFFFF;

  --color-warning: #F59E0B; /* Amber 500 */
  --color-warning-foreground: #FFFFFF;
  --color-tip: #FEF3C7; /* Amber 100 */
  --color-tip-foreground: #B45309; /* Amber 700 */
  
  --color-info: #3B82F6; /* Blue 500 */
  --color-info-foreground: #FFFFFF;

  /* Data Visualization Palette */
  --color-chart-1: #6366F1; /* Indigo */
  --color-chart-2: #14B8A6; /* Teal */
  --color-chart-3: #F59E0B; /* Amber */
  --color-chart-4: #EC4899; /* Pink */
  --color-chart-5: #8B5CF6; /* Violet */
  --color-chart-6: #10B981; /* Emerald */
  --color-chart-neutral: #A8A29E; /* Stone 400 */

  /* Typography Line Heights Configured for Harmony */
  /* Re-defining fonts */
  --font-sans: var(--font-assistant);
  --font-heading: var(--font-heebo);
  --font-mono: var(--font-mono);
  --font-handwriting: var(--font-handwriting);

  /* Shadows - Modern & Clean */
  --shadow-temple: 0 4px 20px rgba(99, 102, 241, 0.08); /* Soft indigo glow */
  --shadow-neon: 0 0 15px rgba(245, 158, 11, 0.15); /* Soft amber glow */
  --shadow-premium: 0 10px 30px -10px rgba(28, 25, 23, 0.1); /* Deep stone shadow */

  /* Border Radius */
  --radius: 0.5rem;
  --radius-4xl: 2rem;
  --radius-5xl: 2.5rem;
}`;

const RAW_CSS_DARK = `/* No .dark block found in globals.css - This theme does not appear to use a dark mode currently. */`;

interface TokenDef {
    variable: string;
    tailwind: string;
    usedIn?: string[];
    description: string;
    warning?: boolean;
}

const TOKEN_CATEGORIES: { name: string, description: string, tokens: TokenDef[] }[] = [
    {
        name: "🏔️ Base",
        description: "Backgrounds and text foundations (High Contrast)",
        tokens: [
            { variable: "--color-background", tailwind: "bg-background / text-background", usedIn: ["body", "pages", "layout"], description: "Warm Alabaster - Page background" },
            { variable: "--color-foreground", tailwind: "text-foreground", usedIn: ["body", "typography"], description: "Stone 900 - Primary text color", warning: false },
            { variable: "--color-text-secondary", tailwind: "text-text-secondary", usedIn: ["typography"], description: "Stone 500 - Secondary text" },
        ]
    },
    {
        name: "🏢 Surface & Structure",
        description: "Cards, borders, and UI borders",
        tokens: [
            { variable: "--color-card", tailwind: "bg-card / text-card", usedIn: ["cards", "panels", "CheckpointQuiz"], description: "Pure White - Surface background" },
            { variable: "--color-card-foreground", tailwind: "text-card-foreground", usedIn: ["cards"], description: "Stone 900 - Text on cards", warning: false },
            { variable: "--color-popover", tailwind: "bg-popover", usedIn: ["dropdowns", "tooltips"], description: "Pure White - Floating elements" },
            { variable: "--color-popover-foreground", tailwind: "text-popover-foreground", usedIn: ["dropdowns", "tooltips"], description: "Stone 900 - Text on popovers" },
            { variable: "--color-glass", tailwind: "bg-glass", usedIn: ["glass-card"], description: "Frost Glass (White / 85%) - Translucent background" },
            { variable: "--color-border", tailwind: "border-border", usedIn: ["borders", "dividers"], description: "Stone 200 - Structure/lines" },
            { variable: "--color-input", tailwind: "border-input", usedIn: ["forms", "inputs"], description: "Stone 200 - Inputs" },
            { variable: "--color-ring", tailwind: "ring-ring", usedIn: ["forms", "focus states"], description: "Indigo 500 - Focus ring" },
        ]
    },
    {
        name: "✨ Brand",
        description: "Identity and interactions",
        tokens: [
            { variable: "--color-primary", tailwind: "bg-primary / text-primary", usedIn: ["buttons", "highlights", "brand elements"], description: "Indigo 500 - Primary brand / interactions" },
            { variable: "--color-primary-foreground", tailwind: "text-primary-foreground", usedIn: ["primary buttons"], description: "White - Text on primary", warning: false },
            { variable: "--color-secondary", tailwind: "bg-secondary / text-secondary", usedIn: ["secondary buttons", "badges"], description: "Indigo 50 - Secondary pastel brand" },
            { variable: "--color-secondary-foreground", tailwind: "text-secondary-foreground", usedIn: ["secondary buttons"], description: "Indigo 700 - Text on secondary pastel", warning: false },
            { variable: "--color-accent", tailwind: "bg-accent / text-accent", usedIn: ["accents", "highlights"], description: "Indigo 100 - Accent / Highlight" },
            { variable: "--color-accent-foreground", tailwind: "text-accent-foreground", usedIn: ["accents"], description: "Indigo 800 - Text on accent", warning: false },
        ]
    },
    {
        name: "🚦 Semantic State",
        description: "Standardized system states",
        tokens: [
            { variable: "--color-muted", tailwind: "bg-muted / text-muted", usedIn: ["disabled states", "subtle backgrounds"], description: "Stone 100 - Soft structural background" },
            { variable: "--color-muted-foreground", tailwind: "text-muted-foreground", usedIn: ["subtle text", "captions"], description: "Stone 500 - Muted text", warning: false },
            { variable: "--color-success", tailwind: "bg-success / text-success", usedIn: ["success states", "correct answers"], description: "Emerald 500 - Success base" },
            { variable: "--color-success-bg", tailwind: "bg-success-bg", usedIn: ["success backgrounds"], description: "Emerald 100 - Success background" },
            { variable: "--color-success-border", tailwind: "border-success-border", usedIn: ["success borders"], description: "Emerald 400 - Success border" },
            { variable: "--color-success-foreground", tailwind: "text-success-foreground", usedIn: ["success text"], description: "White - Success solid text" },
            { variable: "--color-error", tailwind: "bg-error", usedIn: ["errors"], description: "Red 500 - Error base" },
            { variable: "--color-error-bg", tailwind: "bg-error-bg", usedIn: ["error backgrounds", "wrong answers"], description: "Red 100 - Error background" },
            { variable: "--color-error-border", tailwind: "border-error-border", usedIn: ["error borders"], description: "Red 400 - Error border" },
            { variable: "--color-error-foreground", tailwind: "text-error-foreground", usedIn: ["error text"], description: "White - Error text" },
            { variable: "--color-warning", tailwind: "bg-warning", usedIn: ["warnings"], description: "Amber 500 - Warning base" },
            { variable: "--color-warning-foreground", tailwind: "text-warning-foreground", usedIn: ["warning text"], description: "White - Warning text" },
            { variable: "--color-tip", tailwind: "bg-tip", usedIn: ["tips", "badges"], description: "Amber 100 - Tips pastel base" },
            { variable: "--color-tip-foreground", tailwind: "text-tip-foreground", usedIn: ["tips"], description: "Amber 700 - Tips dark text" },
            { variable: "--color-destructive", tailwind: "bg-destructive", usedIn: ["destructive actions"], description: "Red 500 - Destructive button base" },
            { variable: "--color-destructive-foreground", tailwind: "text-destructive-foreground", usedIn: ["destructive text"], description: "White - Destructive button text", warning: false },
        ]
    },
    {
        name: "📊 Charts",
        description: "Data visualization palette",
        tokens: [
            { variable: "--color-chart-1", tailwind: "bg-chart-1", description: "Indigo" },
            { variable: "--color-chart-2", tailwind: "bg-chart-2", description: "Teal" },
            { variable: "--color-chart-3", tailwind: "bg-chart-3", description: "Amber" },
            { variable: "--color-chart-4", tailwind: "bg-chart-4", description: "Pink" },
            { variable: "--color-chart-5", tailwind: "bg-chart-5", description: "Violet" },
            { variable: "--color-chart-6", tailwind: "bg-chart-6", description: "Emerald" },
            { variable: "--color-chart-neutral", tailwind: "bg-chart-neutral", description: "Stone 400 - axes/grid" },
        ]
    },
    {
        name: "💡 Shadows & Formatting",
        description: "Custom glows and layout tokens",
        tokens: [
            { variable: "--shadow-temple", tailwind: "shadow-temple", description: "Soft indigo temple glow" },
            { variable: "--shadow-neon", tailwind: "shadow-neon", description: "Amber neon glow" },
            { variable: "--shadow-premium", tailwind: "shadow-premium", description: "Premium stone shadow" },
            { variable: "--radius", tailwind: "rounded", description: "0.5rem - Default radius" },
            { variable: "--radius-4xl", tailwind: "rounded-4xl", description: "2rem - 4xl radius" },
            { variable: "--radius-5xl", tailwind: "rounded-5xl", description: "2.5rem - 5xl radius" },
        ]
    }
];

function ColorSwatch({ token }: { token: TokenDef }) {
    const isColor = token.variable.startsWith('--color-');

    return (
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col h-full bg-card">
            {/* The actual color — rendered using inline CSS var */}
            <div
                className="h-24 w-full relative border-b border-border/50 shrink-0 flex items-center justify-center p-4 bg-background"
                style={
                    isColor ? { backgroundColor: `var(${token.variable})` } :
                        token.variable.startsWith('--shadow') ? { boxShadow: `var(${token.variable})`, backgroundColor: 'var(--color-card)' } :
                            token.variable.startsWith('--radius') ? { borderRadius: `var(${token.variable})`, backgroundColor: 'var(--color-primary)', width: '40px', height: '40px' } : {}
                }
            >
                {token.warning && (
                    <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-sm" title="Potential contrast issue with background">
                        ⚠️ Contrast
                    </div>
                )}
            </div>

            {/* Token info */}
            <div className="p-4 flex-1 flex flex-col items-start bg-card justify-between" dir="ltr">
                <div className="w-full">
                    <p className="font-mono text-sm font-bold text-foreground break-all">
                        {token.variable}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground mt-1 break-all">
                        {token.tailwind}
                    </p>
                    <p className="text-sm text-foreground/80 mt-2 font-medium">
                        {token.description}
                    </p>
                </div>
                {token.usedIn && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {token.usedIn.map(u => (
                            <span key={u} className="text-[10px] bg-primary/10 text-primary-foreground border border-primary/20 px-2 py-0.5 rounded-full font-sans font-medium">
                                {u}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ColorSystemPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-primary/20 border-b border-primary/30 pt-24 pb-6 px-6 mb-12" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <p className="font-bold font-mono text-sm py-2 px-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                        Color System — Design Token Reference
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-foreground font-heading mb-3" dir="rtl">מערכת הצבעים • Color System</h1>
                    <p className="text-xl text-muted-foreground">
                        {TOKEN_CATEGORIES.reduce((acc, cat) => acc + cat.tokens.length, 0)} tokens across {TOKEN_CATEGORIES.length} categories. Source: globals.css
                    </p>
                </div>

                <div className="space-y-16">
                    {TOKEN_CATEGORIES.map(category => (
                        <section key={category.name}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                    {category.name}
                                </h2>
                                <p className="text-muted-foreground mt-1">
                                    {category.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {category.tokens.map(token => (
                                    <ColorSwatch key={token.variable} token={token} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-20 bg-zinc-950 rounded-2xl p-6 shadow-xl border border-zinc-800" dir="ltr">
                    <h3 className="text-zinc-400 font-bold mb-4 text-sm font-mono flex items-center gap-2">
                        📄 Raw CSS Variables — globals.css
                    </h3>
                    <div className="overflow-x-auto">
                        <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                            {RAW_CSS_ROOT}
                        </pre>
                        <br />
                        <pre className="text-blue-400 font-mono text-xs leading-relaxed">
                            {RAW_CSS_DARK}
                        </pre>
                    </div>
                </div>
            </main>
        </div>
    );
}
