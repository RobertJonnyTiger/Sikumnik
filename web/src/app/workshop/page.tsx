"use client";

import React from "react";
import { BlockRenderer } from "@/features/core-lessons/renderers/BlockRenderer";
import type { ContentBlock } from "@/types/chapter";
import { Badge } from "@/components/ui/badge";

const mockBlocks: ContentBlock[] = [
  { type: "text", formalText: "זהו טקסט פורמלי ארוך עם נוסחאות משובצות. למשל, המשוואה הדיפרנציאלית $\\frac{d^2y}{dx^2} + \\omega^2y = 0$ מתארת מתנד הרמוני.", streetNarrator: "קריינות רחוב: בת'כלס, זה רק אומר שאם תדחוף משהו חזק מדי, הוא יחזור אליכם וינדנד קדימה אחורה." },
  { type: "explanation", content: "בלוק הסבר מעמיק בנושא תורת הקוואנטים. משוואת שרדינגר היא $i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)$. אל תבהלו מהסמלים, זה רק מפלצת מתמטית שפותרת לנו הכל.", highlight: "עיקרון אי הודאות של הייזנברג $\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}$" },
  { type: "analogy", content: "חשבו על תורת היחסות כמו על טרמפולינה ענקית. אם תניחו כדור באולינג במרכז (שמש), הטרמפולינה תתעקם, ואם תזרקו גולה (כדור הארץ) היא תסתובב סביבו בגלל העיקום. זהו העיקום של מרחב-זמן בגלל מסה $E=mc^2$.", icon: "🌌" },
  { type: "definition", term: "אנטרופיה ($S$)", content: "מדד לאי-סדר במערכת סגורה. על פי החוק השני של התרמודינמיקה, האנטרופיה תמיד תגדל עם הזמן: $\\Delta S \\ge 0$ מתארת את חץ הזמן מאי-סדר קטן לגדול." },
  { type: "formula", title: "נוסחת בלמייסטר-שרייבר", formula: "E = \\sum_{i=1}^{n} \\sqrt{\\frac{x_i^2 + y_i^2}{z_i^2}}", variables: [{ symbol: "$E$", name: "אנרגיה כללית", desc: "ג'אול" }, { symbol: "$x_i, y_i, z_i$", name: "ווקטור המרחב", desc: "קואורדינטות פולאריות" }] },
  { type: "hero-formula", title: "משוואת פיינמן", formula: "\\int \\mathcal{D}x \\, e^{\\frac{iS[x]}{\\hbar}}", subtitle: "ניסוח אינטגרלי מסלול למכניקת הקוונטים", streetNarrator: "פיינמן פשוט אמר: החלקיק עובר בכל המסלולים האפשריים בו זמנית! ואז מחברים הכל. מטורף!" },
  { type: "formula-card", title: "משוואת האון", formula: "P = \\frac{W}{t} = F \\cdot v", description: "הספק מייצג כמה מהר עבודה מתבצעת לאורך זמן." },
  { type: "example", title: "דוגמה לחוק השני של ניוטון", scenario: "רכב מסה $1000\\text{ kg}$ מאיץ בקצב של $5\\text{ m/s}^2$.", solution: "נשתמש בחוק השני $F=ma$. נציב את הערכים: $F = 1000 \\cdot 5$.", calculation: "F = 5000\\text{ Newtons}" },
  { type: "deep-dive", title: "צלילה עמוקה: הפונקציה הלוגריתמית", sections: [{ title: "מדוע דווקא הלאן?", content: "גזירת הפונקציה הלוגריתמית מניבה תכונות מופלאות כאשר הבסיס הוא $e$. השיפוע של הפונקציה $y=e^x$ בנקודה $x$ שווה לפונקציה עצמה." }, { title: "כלל המעבר", content: "ניזכר ש-$\\log_b(a) = \\frac{\\ln(a)}{\\ln(b)}$. תכונה זו מאפשרת חישוב מהיר ושילוב במחשבונים אלקטרוניים העובדים רק עם בסיסי אי ולוג טבעי." }] },
  { type: "guided-exercise", difficulty: 5, question: "חשב את האינטגרל של פונקציית צפיפות ההסתברות של התפלגות נורמלית סטנדרטית: $\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} e^{-x^2/2} dx$", thinkingDirection: "נסה את תעלול פואסון: כפל את האינטגרל בעצמו ועבור לקואורדינטות קוטביות (פולאריות).", steps: [{ title: "העלאה בריבוע והכפלה", action: "נכתוב את האינטגרל פעמיים במשתנים שונים: $I^2 = \\int e^{-x^2} dx \\cdot \\int e^{-y^2} dy$", reasoning: "זה מאפשר לנו לאחד את האינטגרל לאינטגרל כפול מעל כל המישור.", calculation: "I^2 = \\iint e^{-(x^2+y^2)} dx dy", result: "הכנו את הקרקע לקואורדינטות הפולריות." }], finalAnswer: "1.0", phases: [{ type: "we-do", content: "נחשב את האנטגרל בעזרת הקואורדינטות הפולריות $r^2 = x^2+y^2$ ו- $dx dy = r dr d\\theta$." }] },
  { type: "alert", variant: "warning", title: "אזהרת חלוקה באפס", content: "לעולם, אבל לעולם, אין לחלק בספר חסר משמעות או לבצע פעולה השואפת ל- $1/0$. התוצאה אינה מוגדרת והיא אסורה בתכלית." },
  { type: "alert", variant: "tip", title: "טריק הכשל המהיר", content: "אם הביטוי במעלה שנייה $ax^2 + bx + c$ נראה מאיים מדי, הפעילו מיד נוסחת שורשים $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$." },
  { type: "alert", variant: "prerequisite", title: "דרישות קדם", content: "לפני שנצלול אל נגזרות, זכור לחזור על אלגברה אקספוננציאלית ולוגריתמים מפרק 2." },
  { type: "list", items: ["ניסוח המשוואה הקאנונית", "בידוד הנעלם והצבת מערכת המשוואות בטריצת הליבה", "פתרון במודל מטריצי של גאוס-ז'ורדן לחילוץ משתנים תלויים"] },
  { type: "hook", opener: "אי פעם חשבתם מה קורה כאשר אנחנו מנסים למדוד את המסלול המדויק של חלקיק שעובר בחלל תלת ממדי?", question: "מה ההבדל בין מהירות לווקטור התאוצה?", context: "החלקיקים הקטנים ביותר בפיזיקה לא מצייתים לחוקים של רכבים בכביש, וכאן זה נהיה מרתק." },
  { type: "street-smart", content: "חבר'ה, קחו ללב את העצה הזו: במבחן בחדו\"א אף אחד לא בודק אם הייתם גאונים בטריקים באלגברה. העיקר למצוא את האינטגרל המיידי. תזרקו את כל ה- 'dx' בצד ותתחילו להציב $u$. שאר העבודה עושה את עצמה.", title: "טריפל קליק אינטגרציה" },
  { type: "common-mistake", mistake: "שוכחים את מינוס באגף שמאל בעת העברת אגפים ממשוואה מעריכית ללוגריתמית. למשל: $\\ln(1/x) = \\ln(x)$ במקום $\\ln(1/x) = -\\ln(x)$.", correction: "כאשר מעבירים נעלם שהיה במכנה החלק מהבסיס של השבר בתוך הלוג, הוא יוצא החוצה במינוס לפני פונקציית הלוג." },
  { type: "exam-tip", content: "בבחינת הבגרות בפיסיקה, רוב הניקוד על הגדרת משוואות מיוחס אך ורק לשרטוט התרשים. קודם שרטטו את כל הכוחות הפועלים ורק אז תכתבו חוק שני של ניוטון עבור שאר הכוחות.", source: "טיפ למבחן" },
  { type: "callout", variant: "info", title: "הידעת? מושגי מפתח בגאומטריה", content: "היחס של צלע משולש לחלק שממולו ידוע כחוק הסינוסים $\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)}$. זו הדרך המהירה ביותר לפתור משולש לא ישר זווית." },
  { type: "topic-summary", content: "לסיכום, מה שלמדנו היום יהפוך כל משוער דיפרנציאלי למושג שתוכלו ליישם בחיי היומיום.", keyPoints: ["זיהינו את סוג המשוואה מסדר שני", "בחרנו פונקציית מבחן מתאימה $y=e^{rx}$", "זיהינו גורמי מעטפת ושחיקה לפי $c/2m$"] },
  {
    type: "checkpoint-quiz", questions: [
      { id: "test-q1", question: "מהי המשמעות המעשית של דיסקרימיננטה שלילית במשוואה דיפרנציאלית הומוגנית רגילה?", options: ["הפתרון חייב להיות שווה לאפס", "הפתרון יכלול תנודות הרמוניות עם פונקציות טריגונומטריות", "אין פתרון כלל מסדר שני"], correctIndex: 1, explanation: "כאשר השורש הופך לשלילי הוא מייצר מהירות זוויתית במישור הקומפלקסי ולכן פונקציית הפתרון היא במונחי סינוס וקוסינוס." }
    ]
  },
  {
    type: "reference-table", tableCategory: "כללי הלופ של קירכהוף", rows: [
      { ruleName: "חוק הצמתים", generalForm: "$\\sum I_{in} = \\sum I_{out}$", numericExample: "זורם פנימה 5A ויוצא למספר קווי חשמל. סך היציאות 5A.", streetExplanation: "כמו לזרום במים בצינור, מה שנכנס זה מה שיוצא." },
      { ruleName: "חוק הלולאות", generalForm: "$\\sum \\Delta V = 0$", numericExample: "מעגל סגור. $+12V - 5V - 7V = 0$.", streetExplanation: "ברכבת הרים - אתה עולה עד לראש בגובה אבל תמיד חזור בתוך הלופ מתישהו לנקודת ההתחלה." }
    ]
  },
  { type: "worked-example", title: "שטח כלוא", scenario: "מצא את השטח הכלוא בין הפרבולה $y = x^2$ והישר $y = x + 2$.", solution: "השטח הוא האינטגרל של ההפרש בין הפונקציה העליונה לתחתונה: $A = \\int_{-1}^{2} (x+2 - x^2) dx$.", calculation: "\\left[ \\frac{x^2}{2} + 2x - \\frac{x^3}{3} \\right]_{-1}^{2} = 4.5" },
  { type: "real-world-example", title: "תאוצה ביומיום", scenario: "כאשר מטוס מאיץ על המסלול.", connection: "נוכל להרגיש את כוח האינרציה (ההתמד) שדוחף אותנו למושב.", source: "מקור: המכניקה של הפיזיקה." }
];

export default function WorkshopPage() {
  // Generate anchor IDs
  const blockPairs = mockBlocks.map((block, idx) => ({
    ...block,
    _id: `block-${idx}`,
    _title: block.type.replace("-", " ").toUpperCase()
  }));

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="flex w-full">

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:pr-72 overflow-x-hidden pt-12">
          <div className="max-w-4xl mx-auto space-y-12 pb-32">
            <header className="mb-12 border-b border-border pb-6">
              <h1 className="text-5xl font-black text-foreground">Sikumnik Master Workshop</h1>
              <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                מעבדת לחץ קיצונית לבדיקת רינדור מרכיבי הקורס הויזואליים: רכיבי קוד עברית, טיפוגרפיה צפופה בשילוב
                משוואות <code className="mx-1 px-1 bg-muted rounded-sm text-sm">LaTeX / KaTeX</code>.
              </p>
            </header>

            <div className="space-y-24">
              {blockPairs.map((block, idx) => (
                <section key={idx} id={block._id} className="relative pt-6 border-b border-border/40 pb-16 scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge variant="secondary" className="text-xl px-5 py-2 font-black rounded-lg">{idx + 1}</Badge>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">{block._title}</h2>
                      <p className="text-sm text-muted-foreground font-mono mt-1 pr-1">{block.type}</p>
                    </div>
                  </div>
                  <div className="bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-2xl backdrop-blur-2xl">
                    <div className="block-renderer-wrapper overflow-x-auto relative z-10 w-full prose prose-stone max-w-none">
                      <BlockRenderer block={block as ContentBlock} />
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar Navigation (RTL positioned on the right) */}
        <aside className="fixed top-0 right-0 w-72 h-screen z-40 bg-card border-l border-border shadow-xl backdrop-blur-xl hidden lg:block overflow-hidden transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border bg-card/80 sticky top-0 z-10">
              <h3 className="text-base font-black tracking-widest text-primary uppercase text-center flex items-center justify-center gap-2">
                <span>מפתח רכיבים</span>
              </h3>
              <p className="text-xs text-center text-muted-foreground mt-2">{blockPairs.length} רכיבים נבדקים כעת</p>
            </div>

            <div className="flex-1 overflow-y-auto w-full p-4 space-y-1 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
              {blockPairs.map((block, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToBlock(block._id)}
                  className="w-full text-right py-2.5 px-3 rounded-lg text-sm hover:bg-muted font-medium transition-colors border border-transparent hover:border-border/50 text-foreground/80 hover:text-foreground flex items-center justify-between group"
                >
                  <span className="truncate pr-2 group-hover:pr-1 transition-all">
                    {idx + 1}. {block._title}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-muted/20">
              <p className="text-xs text-center text-muted-foreground font-mono opacity-60">System Core Rendering Test</p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
