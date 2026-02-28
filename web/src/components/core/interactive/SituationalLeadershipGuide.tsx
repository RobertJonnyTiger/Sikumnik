import React, { useState } from 'react';
import { Check, X, ArrowRight, User, Users, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SituationalLeadershipGuideProps {
    // No props needed for this standalone tool, logic is self-contained
}

type Style = 'S1' | 'S2' | 'S3' | 'S4';

interface LeadershipStyle {
    id: Style;
    name: string; // Hebrew name (e.g. "המכוון")
    slangName: string; // The "Slang" name (e.g. "הווייז")
    description: string;
    behavior: {
        task: 'High' | 'Low';
        relationship: 'High' | 'Low';
    };
    suitableFor: string;
    risks: string;
    icon: React.ReactNode;
    color: string;
}

const styles: Record<Style, LeadershipStyle> = {
    S1: {
        id: 'S1',
        name: 'המכוון (Telling)',
        slangName: 'הווייז (Waze)',
        description: 'אתה אומר להם בדיוק לאן לנסוע, איפה לפנות, ובאיזה מהירות. אין שאלות, אין ויכוחים. הם לא יודעים את הדרך, ואתה ה-GPS.',
        behavior: { task: 'High', relationship: 'Low' },
        suitableFor: 'עובד חדש, חסר ניסיון, או חסר ביטחון (R1). צריך הוראות מדויקות.',
        risks: 'מיקרו-ניהול אם נתקעים בזה יותר מדי זמן.',
        icon: <ArrowRight className="w-8 h-8" />,
        color: 'bg-red-500'
    },
    S2: {
        id: 'S2',
        name: 'המאמן (Selling)',
        slangName: 'המאמן האישי (Personal Trainer)',
        description: 'אתה עדיין קובע את התרגילים, אבל אתה מסביר "למה" הם טובים, מעודד, ונותן "פומפ". אתה מוכר להם את הרעיון שהם מסוגלים.',
        behavior: { task: 'High', relationship: 'High' },
        suitableFor: 'עובד שרוצה אבל עדיין לא יכול (R2). יש מוטיבציה, אין יכולת. צריך הכוונה + עידוד.',
        risks: 'דיבורים כמו חול ואין מה לאכול - אם רק מעודדים ולא מלמדים תכלס.',
        icon: <Zap className="w-8 h-8" />,
        color: 'bg-orange-500'
    },
    S3: {
        id: 'S3',
        name: 'המשתף (Participating)',
        slangName: 'החבר הטלפוני (Facilitator)',
        description: 'הם יודעים את העבודה, אבל לא בטוחים בעצמם (או סתם מבואסים). אתה לא נותן הוראות, אתה שם להקשיב, לחזק ולפתור דילמות ביחד.',
        behavior: { task: 'Low', relationship: 'High' },
        suitableFor: 'עובד שיודע את העבודה אבל חסר ביטחון או מוטיבציה (R3). צריך כתף, לא הוראות.',
        risks: 'שיחות נפש אינסופיות במקום עבודה.',
        icon: <Users className="w-8 h-8" />,
        color: 'bg-yellow-500' // Darker yellow for contrast usually needed, handle in CSS
    },
    S4: {
        id: 'S4',
        name: 'המאציל (Delegating)',
        slangName: 'רוח רפאים (Ghost)',
        description: 'זרוק להם את המפתחות ותעלם. הם יודעים מה לעשות והם רוצים לעשות את זה. אתה רק מפריע אם אתה מתערב. תחזור רק לבדוק תוצאות.',
        behavior: { task: 'Low', relationship: 'Low' },
        suitableFor: 'תותחים. יודעים ורוצים (R4). תן להם לרוץ.',
        risks: 'הזנחה פושעת אם העובד פתאום צריך עזרה ואתה בים.',
        icon: <Brain className="w-8 h-8" />,
        color: 'bg-green-500'
    }
};

export const SituationalLeadershipGuide: React.FC<SituationalLeadershipGuideProps> = () => {
    const [competence, setCompetence] = useState<'Low' | 'High' | null>(null);
    const [commitment, setCommitment] = useState<'Low' | 'High' | null>(null);

    const getResultStyle = (): Style | null => {
        if (!competence || !commitment) return null;

        // Logic Mapping (Hersey-Blanchard):
        // R1: Low Competence, High Commitment (Usually enthusiastic beginner) -> S1 (Telling) - *Wait, actually R1 is often unable and unwilling OR unable and insecure. Let's stick to standard mapping*
        // Let's use the standard matrix inputs usually provided in these tools:

        // Standard Matrix:
        // Ability (Competence) | Willingness (Commitment) | Readiness | Style
        // ---------------------|--------------------------|-----------|------
        // Low                  | High (Unwilling/Insecure? No, usually willing beginner) -> R1 -> S1? 
        // *Correction*: 
        // R1: Unable & Unwilling/Insecure -> S1 (Telling)
        // R2: Unable & Willing (Confident) -> S2 (Selling)
        // R3: Able & Unwilling/Insecure   -> S3 (Participating)
        // R4: Able & Willing (Confident)  -> S4 (Delegating)

        // Let's simplify the toggles to match this specific diagnosis flow:

        if (competence === 'Low' && commitment === 'Low') return 'S1'; // R1 (Unable & Insecure/Unwilling) -> Telling (High Task, Low Rel - strictly directive to get moving) *Actually classical model says R1 needs S1*
        if (competence === 'Low' && commitment === 'High') return 'S2'; // R2 (Unable but Willing/Motivated) -> Selling (High Task, High Rel)
        if (competence === 'High' && commitment === 'Low') return 'S3'; // R3 (Able but Insecure/Unwilling) -> Participating (Low Task, High Rel)
        if (competence === 'High' && commitment === 'High') return 'S4'; // R4 (Able & Willing) -> Delegating (Low Task, Low Rel)

        return null;
    };

    const result = getResultStyle();

    return (
        <div className="group w-full max-w-4xl mx-auto p-4 md:p-8 font-sans bg-card rounded-3xl text-foreground shadow-2xl border border-border hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-500/50" dir="rtl">

            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    המערבל הניהולי
                </h2>
                <p className="text-xl text-muted-foreground font-light">
                    אל תנחש. תאבחן. איזה מנהיג הצוות שלך צריך <span className="font-bold text-foreground">עכשיו</span>?
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Controls */}
                <div className="space-y-10 bg-muted/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">

                    {/* Competence Control */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Brain className="text-blue-700 w-6 h-6" />
                                יכולת (Competence)
                            </h3>
                            {competence && (
                                <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", competence === 'High' ? "bg-green-500/20 text-green-400" : "bg-red-50 text-red-700")}>
                                    {competence === 'High' ? 'גבוהה' : 'נמוכה'}
                                </span>
                            )}
                        </div>
                        <p className="text-muted-foreground text-sm">האם העובד <span className="font-bold text-foreground">יודע</span> לבצע את המשימה הספציפית הזו בהצלחה?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setCompetence('Low')}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                                    competence === 'Low'
                                        ? "border-red-500 bg-red-50 text-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                        : "border-border hover:border-slate-600 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <X className="w-6 h-6" />
                                <span className="font-bold">לא יודע (נמוכה)</span>
                            </button>
                            <button
                                onClick={() => setCompetence('High')}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                                    competence === 'High'
                                        ? "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        : "border-border hover:border-slate-600 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Check className="w-6 h-6" />
                                <span className="font-bold">יודע (גבוהה)</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-700/50" />

                    {/* Commitment Control */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Zap className="text-yellow-400 w-6 h-6" />
                                מוטיבציה (Commitment)
                            </h3>
                            {commitment && (
                                <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", commitment === 'High' ? "bg-green-500/20 text-green-400" : "bg-red-50 text-red-700")}>
                                    {commitment === 'High' ? 'גבוהה' : 'נמוכה'}
                                </span>
                            )}
                        </div>
                        <p className="text-muted-foreground text-sm">האם העובד <span className="font-bold text-foreground">רוצה</span> ובטוח בעצמו לבצע את המשימה?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setCommitment('Low')}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                                    commitment === 'Low'
                                        ? "border-red-500 bg-red-50 text-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                        : "border-border hover:border-slate-600 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <X className="w-6 h-6" />
                                <span className="font-bold">לא רוצה (נמוכה)</span>
                            </button>
                            <button
                                onClick={() => setCommitment('High')}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                                    commitment === 'High'
                                        ? "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        : "border-border hover:border-slate-600 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Check className="w-6 h-6" />
                                <span className="font-bold">רוצה (גבוהה)</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Result Display */}
                <div className="relative min-h-[400px] flex items-center justify-center">

                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key={result}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="w-full"
                            >
                                <div className={cn("relative overflow-hidden rounded-3xl border-4 p-8 text-center shadow-2xl space-y-6",
                                    styles[result].color.replace('bg-', 'border-')
                                )}>
                                    {/* Background decoration */}
                                    <div className={cn("absolute top-0 left-0 w-full h-2 opacity-50", styles[result].color)} />

                                    <div className={cn("inline-flex items-center justify-center p-4 rounded-full mb-4 shadow-lg", styles[result].color, "text-foreground")}>
                                        {styles[result].icon}
                                    </div>

                                    <div>
                                        <h2 className="text-6xl font-black mb-2 tracking-tighter uppercase">
                                            {result}
                                        </h2>
                                        <h3 className="text-3xl font-bold text-foreground mb-1">
                                            {styles[result].slangName}
                                        </h3>
                                        <p className="text-lg opacity-70 font-mono">
                                            {styles[result].name}
                                        </p>
                                    </div>

                                    <div className="bg-background/50 p-6 rounded-2xl text-lg leading-relaxed border border-border text-right">
                                        {styles[result].description.replace(/\*/g, '')}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-right" dir="rtl">
                                        <div className="bg-card/80 p-3 rounded-lg border border-border">
                                            <span className="block text-xs uppercase text-muted-foreground mb-1 font-bold">מתאים ל:</span>
                                            {styles[result].suitableFor.replace(/\*/g, '')}
                                        </div>
                                        <div className="bg-card/80 p-3 rounded-lg border border-border">
                                            <span className="block text-xs uppercase text-muted-foreground mb-1 font-bold">סיכון:</span>
                                            {styles[result].risks}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center space-y-6 opacity-30"
                            >
                                <div className="w-32 h-32 mx-auto border-4 border-dashed border-slate-600 rounded-full flex items-center justify-center">
                                    <span className="text-6xl">?</span>
                                </div>
                                <p className="text-2xl font-bold">בחר פרמטרים כדי לחשוף את הסגנון</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};
