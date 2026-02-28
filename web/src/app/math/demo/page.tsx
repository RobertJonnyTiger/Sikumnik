import React from 'react';
import { ReferenceTable } from '@/components/math/ReferenceTable';
import { ConceptTranslation } from '@/components/math/ConceptTranslation';
import { HeroFormula } from '@/components/math/HeroFormula';
import { StreetNarratorBlock } from '@/components/math/StreetNarratorBlock';
import { FormulaCard } from '@/components/core/blocks/FormulaCard';
import { ReferenceTableBlock, StandardConceptBlock, HeroFormulaBlock, StreetNarratorBlock as IStreetNarratorBlock } from '@/types/math-course';

export default function MathDemoPage() {
    const heroBlock: HeroFormulaBlock = {
        id: "block-hero-derivative",
        type: "hero-formula",
        title: "הגדרת הנגזרת דרך גבול",
        subtitle: "Limit Definition of a Derivative",
        katexString: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
        streetNarrator: "הנגזרת היא בעצם דרך למדוד <strong>בדיוק כמה מהר</strong> משהו משתנה בכל רגע נתון. דמיינו שאתם מודדים מהירות של רכב בדיוק בשנייה שהוא באוויר."
    };

    const standaloneNarrator: IStreetNarratorBlock = {
        id: "block-narrator-1",
        type: "street-narrator-block",
        standaloneNarration: "<strong>שימו לב:</strong> הכלל הזה עובד רק כשהבסיסים זהים! אי אפשר לחבר חזקות אם יש לכם $2^x$ כפול $3^y$."
    };

    const textBlock: StandardConceptBlock = {
        id: "block-text-chain-rule",
        type: "text",
        content: {
            formalText: "כלל השרשרת מאפשר גזירה של הרכבת פונקציות. אם $f$ ניתנת לגזירה ב-$g(x)$ ו-$g$ ב-$x$, אז ההרכבה $F(x) = f(g(x))$ ניתנת לגזירה ב-$x$.",
            streetNarrator: "כלל השרשרת מתמודד עם פונקציות שהן כמו <strong>בובת בבושקה רוסית</strong>. חופרים פנימה — קודם גוזרים את הפונקציה החיצונית ביותר, ואז כופלים בנגזרת של הפונקציה הפנימית. <em>בלי לפספס אף שכבה בדרך.</em>"
        }
    };

    const exponentRulesBlock: ReferenceTableBlock = {
        id: "block-exponent-rules",
        type: "reference-table",
        title: "Essential rules for manipulating powers and exponents",
        tableCategory: "חוקי חזקות (Exponent Rules)",
        rows: [
            {
                id: "rule-1",
                ruleName: "חזקת אפס",
                generalForm: "a^0 = 1 \\quad (a \\neq 0)",
                numericExample: "99^0 = 1",
                streetExplanation: "<strong>כל דבר</strong> בחזקת אפס שווה 1. תמיד. <em>לא משנה כמה הפונקציה מצולקת.</em>"
            },
            {
                id: "rule-2",
                ruleName: "חזקה שלילית",
                generalForm: "a^{-n} = \\frac{1}{a^n}",
                numericExample: "2^{-3} = \\frac{1}{8}",
                streetExplanation: "המינוס בחזקה הוא <strong>כרטיס כניסה למרתף</strong> — הביטוי יורד למכנה <em>והמינוס נעלם</em>."
            },
            {
                id: "rule-3",
                ruleName: "כלל המכפלה",
                generalForm: "a^m \\cdot a^n = a^{m+n}",
                numericExample: "x^3 \\cdot x^4 = x^7",
                streetExplanation: "כשכופלים בסיסים זהים, פשוט <strong>מחברים את המעריכים למעלה</strong>."
            },
            {
                id: "rule-4",
                ruleName: "כלל החילוק",
                generalForm: "\\frac{a^m}{a^n} = a^{m-n}",
                numericExample: "\\frac{y^5}{y^2} = y^3",
                streetExplanation: "כשמחלקים בסיסים זהים, <strong>מחסרים את המעריכים</strong>. <em>מה שלמעלה פחות מה שלמטה.</em>"
            },
            {
                id: "rule-5",
                ruleName: "חזקה על חזקה",
                generalForm: "(a^m)^n = a^{m \\cdot n}",
                numericExample: "(z^2)^4 = z^8",
                streetExplanation: "חזקה על חזקה — <strong>המעריכים מוכפלים זה בזה</strong>. <em>זה כמו קומות בבניין.</em>"
            }
        ]
    };

    const formulaCardData = {
        title: "משפט פיתגורס",
        formula: "a^2 + b^2 = c^2",
        description: "סכום ריבועי הניצבים שווה לריבוע היתר",
        variables: [
            { symbol: "a, b", name: "ניצבים" },
            { symbol: "c", name: "יתר" }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16" dir="rtl">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        תצוגת רכיבי מתמטיקה (Math UI Demo)
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        בדיקה ויזואלית של טבלת החוקים, הסברי ה"רחוב", ותרגומי המושגים.
                    </p>
                </div>

                {/* Visual Section: Hero Formulas & Concept Translations */}
                <section className="space-y-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        נוסחאות דגל ותרגומי מושגים (Hero Formulas & Translations)
                    </h2>

                    {/* The Hero Block */}
                    <div className="pb-4">
                        <HeroFormula block={heroBlock} hasStreetNarrator={true} />
                    </div>

                    <div className="space-y-4">
                        <StreetNarratorBlock block={standaloneNarrator} />
                        <ConceptTranslation block={textBlock} hasStreetNarrator={true} />
                    </div>
                </section>

                {/* Visual Section: Formula Card */}
                <section className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800/60">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        כרטיסיית נוסחה (Formula Card כרגע קיים)
                    </h2>
                    <div className="max-w-xl mx-auto">
                        <FormulaCard
                            title={formulaCardData.title}
                            formula={formulaCardData.formula}
                            description={formulaCardData.description}
                            variables={formulaCardData.variables}
                        />
                    </div>
                </section>

                {/* Visual Section: Reference Table */}
                <section className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800/60">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        טבלאות התייחסות (Reference Tables)
                    </h2>
                    <div dir="ltr">
                        {/* The table internal forces specific text orientations, but the wrapper is LTR to keep math alignment logical */}
                        <ReferenceTable block={exponentRulesBlock} />
                    </div>
                </section>
            </div>
        </div>
    );
}
