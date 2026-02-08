import { ConceptCard } from "@/components/accounting/ConceptCard";
import { InteractiveExercise } from "@/components/ui/interactive-exercise";
import courseData from "@/data/accounting-101.json";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AccountingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">

            {/* Navigation (Handled by Sidebar now) */}
            {/* <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50"> ... </nav> */}

            <main className="max-w-4xl mx-auto px-4 py-12">

                {/* Header */}
                <header className="mb-16 text-center">
                    <span className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-500 text-sm font-bold rounded-full mb-4 border border-pink-500/20">
                        {courseData.title}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        למה רואי חשבון הם האנשים <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 neon-text">
                            הכי פרנואידים בעולם?
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {courseData.summary}
                    </p>
                </header>

                {/* Concept Grid */}
                <div className="grid gap-8">
                    {courseData.sections.map((section, index) => (
                        <ConceptCard
                            key={index}
                            index={index}
                            title={section.concept_title}
                            academicText={section.academic_text}
                            analogyText={section.analogy_text}
                        />
                    ))}

                    {/* Interactive Knowledge Check */}
                    <div className="mt-16 border-t border-slate-800 pt-12">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 ">
                                בוא נראה אם הקשבת...
                            </span>
                        </h2>
                        <InteractiveExercise
                            question="אם שילמתי מראש על מנוי לחדר כושר לשנה שלמה, האם זו הוצאה של החודש הנוכחי?"
                            answer="❌ ממש לא! לפי עקרון ההקבלה, ההוצאה נרשמת רק כשאנחנו צורכים את השירות. התשלום מראש הוא בכלל 'נכס' (הוצאה מראש) והוא יהפוך להוצאה טיפה-טיפה כל חודש במשך השנה. כמו שלא משמינים המבורגר אחד, לא רושמים הוצאה שנתית ביום אחד."
                            hint="תחשוב על עקרון ההקבלה (ה'האנגאובר'). מתי נהנים מהשירות?"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
