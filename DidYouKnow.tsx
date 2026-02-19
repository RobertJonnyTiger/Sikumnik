import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, Brain, Zap, Rocket, Code } from "lucide-react";

interface FactItem {
    icon: React.ElementType;
    category: string;
    fact: string;
}

interface DidYouKnowProps {
    facts?: FactItem[];
    pageContext?: string;
    className?: string;
}

const defaultFacts: FactItem[] = [
    {
        icon: Lightbulb,
        category: "חדשנות",
        fact: "המונח 'באג' נוצר כאשר גרייס הופר מצאה עש אמיתי שגרם לבעיות במחשב Mark II של הרווארד ב-1947.",
    },
    {
        icon: Brain,
        category: "מדע",
        fact: 'המוח שלך מעבד מידע במהירות של 120 מטר לשנייה - מהר יותר מרוב מכוניות המירוץ ב-268 קמ"ש.',
    },
    {
        icon: Sparkles,
        category: "טבע",
        fact: "ארכיאולוגים מצאו דבש בן 3,000 שנה בקברים מצריים שעדיין היה ראוי למאכל.",
    },
    {
        icon: Zap,
        category: "טכנולוגיה",
        fact: "כל דקה, יותר מ-500 שעות וידאו מועלות ליוטיוב ו-200 מיליון אימיילים נשלחים ברחבי העולם.",
    },
    {
        icon: Code,
        category: "תכנות",
        fact: "המתכנתת הראשונה הייתה עדה לאבלייס ב-1843, מאה שנה לפני המחשב המודרני הראשון.",
    },
    {
        icon: Rocket,
        category: "חלל",
        fact: "כפית אחת מכוכב נויטרונים שוקלת כ-6 מיליארד טון - כמו 900 פירמידות גיזה.",
    },
];

export function DidYouKnow({ facts = defaultFacts, pageContext, className = "" }: DidYouKnowProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipping, setIsFlipping] = React.useState(false);

    const handleRefresh = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % facts.length);
            setIsFlipping(false);
        }, 300);
    };

    const currentFact = facts[currentIndex];
    const IconComponent = currentFact.icon;

    return (
        <Card
            className={`relative overflow-hidden cursor-pointer group ${className}`}
            onClick={handleRefresh}
        >
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-6 flex gap-4 items-start" dir="rtl">
                {/* Icon with glow */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <IconComponent
                        className={`w-6 h-6 text-yellow-400 transition-all duration-300 ${isFlipping ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-yellow-400/70 mb-1">הידעת?</p>
                    <p
                        className={`text-sm text-foreground/90 leading-relaxed transition-all duration-300 ${isFlipping ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
                    >
                        <span className="font-semibold text-foreground">{currentFact.category}:{" "}</span>
                        {currentFact.fact}
                    </p>
                </div>
            </div>

            {/* Click hint */}
            <div className="px-6 pb-4 text-right" dir="rtl">
                <p className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors">
                    לחץ לגילוי עובדה נוספת
                </p>
            </div>
        </Card>
    );
}

export default DidYouKnow;