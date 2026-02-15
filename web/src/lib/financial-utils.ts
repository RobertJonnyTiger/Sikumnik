/**
 * Utility for financial and accounting semantic coloring logic.
 * Enforces a single source of truth for color connotations based on Hebrew terminology.
 */

export const FINANCIAL_CONNOTATIONS = {
    POSITIVE: {
        keywords: ["הכנסות", "נכסים", "הון", "רווח", "זכות", "נכס"],
        class: "text-emerald-400",
        bgClass: "bg-emerald-500/10",
        borderClass: "border-emerald-500/30",
        visuals: { trend: "up", icon: "trending-up" },
    },
    NEGATIVE: {
        keywords: ["הוצאות", "התחייבויות", "הפסד", "חובה", "התחייבות"],
        class: "text-rose-400",
        bgClass: "bg-rose-500/10",
        borderClass: "border-rose-500/30",
        visuals: { trend: "down", icon: "trending-down" },
    },
    NEUTRAL: {
        keywords: ["מאזן", "סה\"כ", "יתרה", "סיכום"],
        class: "text-teal-400",
        bgClass: "bg-teal-500/10",
        borderClass: "border-teal-500/30",
        visuals: { trend: "neutral", icon: "activity" },
    }
} as const;

// ... (getConnotationColor and getConnotationBg implementations)

/**
 * Returns the visual metadata (trend, icon) based on the semantic connotation.
 * Accepts either a raw string or an object with a text property.
 */
export function getConnotationVisuals(input: string | { text: string }) {
    const text = typeof input === 'string' ? input : input.text;
    if (!text) return FINANCIAL_CONNOTATIONS.NEUTRAL.visuals;

    const normalized = text.trim();

    if (FINANCIAL_CONNOTATIONS.POSITIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.POSITIVE.visuals;
    }

    if (FINANCIAL_CONNOTATIONS.NEGATIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.NEGATIVE.visuals;
    }

    return FINANCIAL_CONNOTATIONS.NEUTRAL.visuals;
}

/**
 * Returns the Tailwind text color class based on the semantic connotation of the provided text.
 * Accepts either a raw string or an object with a text property.
 */
export function getConnotationColor(input: string | { text: string }): string {
    const text = typeof input === 'string' ? input : input.text;
    if (!text) return FINANCIAL_CONNOTATIONS.NEUTRAL.class;

    const normalized = text.trim();

    if (FINANCIAL_CONNOTATIONS.POSITIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.POSITIVE.class;
    }

    if (FINANCIAL_CONNOTATIONS.NEGATIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.NEGATIVE.class;
    }

    return FINANCIAL_CONNOTATIONS.NEUTRAL.class;
}

/**
 * Returns the Tailwind background color class based on the semantic connotation.
 * Accepts either a raw string or an object with a text property.
 */
export function getConnotationBg(input: string | { text: string }): string {
    const text = typeof input === 'string' ? input : input.text;
    if (!text) return FINANCIAL_CONNOTATIONS.NEUTRAL.bgClass;

    const normalized = text.trim();

    if (FINANCIAL_CONNOTATIONS.POSITIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.POSITIVE.bgClass;
    }

    if (FINANCIAL_CONNOTATIONS.NEGATIVE.keywords.some(k => normalized.includes(k))) {
        return FINANCIAL_CONNOTATIONS.NEGATIVE.bgClass;
    }

    return FINANCIAL_CONNOTATIONS.NEUTRAL.bgClass;
}
