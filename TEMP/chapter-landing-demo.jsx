import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, HelpCircle, ChevronDown, ArrowLeft, CheckCircle } from "lucide-react";

const chapter = {
  course: "מתמטיקה",
  chapterNumber: 3,
  title: "נוסחאות כפל מקוצר ופירוק לגורמים",
  hook: {
    question: "למה המחשבון של הטלפון שלך יכול לחשב מיליוני פעולות בשנייה — אבל אתה לא?",
    teaser: "כי המחשב מכיר קיצורים שאתה עוד לא.",
    reveal: "נוסחאות כפל מקוצר הן בדיוק אותם קיצורים — הן מאפשרות לפרק ולבנות ביטויים מורכבים תוך שניות, בלי לחשב את הכל מהתחלה. זה מה שנלמד בפרק הזה.",
  },
  objectives: [
    "להכיר את נוסחאות כפל מקוצר המרכזיות",
    "לפרק ביטויים אלגבריים לגורמים",
    "להשתמש בנוסחאות לפתרון משוואות",
    "לזהות מתי להשתמש בכל נוסחה",
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ChapterLanding() {
  const [stage, setStage] = useState(0);
  // stage 0: question only
  // stage 1: teaser revealed
  // stage 2: full answer revealed

  return (
    <div dir="rtl" className="min-h-screen bg-[#FCFBFA] flex flex-col items-center justify-start py-14 px-4">
      <motion.div
        className="w-full max-w-2xl flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badges */}
        <motion.div variants={item} className="flex gap-2 mb-7">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
            {chapter.course}
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600">
            פרק {chapter.chapterNumber}
          </span>
        </motion.div>

        {/* Chapter title */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-black text-center text-gray-900 leading-tight tracking-tight mb-12"
        >
          {chapter.title}
        </motion.h1>

        {/* ── HOOK BLOCK ── */}
        <motion.div variants={item} className="w-full mb-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-200/60">

            {/* Main gradient area */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 pb-6 relative overflow-hidden">

              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-400/20 rounded-full translate-x-1/4 translate-y-1/4 blur-xl" />

              {/* Label */}
              <div className="flex items-center gap-2 mb-5 relative z-10">
                <HelpCircle className="w-5 h-5 text-white/60" />
                <span className="text-white/60 text-xs font-black uppercase tracking-widest">
                  רגע לפני שמתחילים
                </span>
              </div>

              {/* The big question */}
              <p className="text-2xl md:text-3xl font-black text-white leading-snug relative z-10 mb-6">
                {chapter.hook.question}
              </p>

              {/* Stage 0 — CTA to reveal teaser */}
              {stage === 0 && (
                <motion.button
                  onClick={() => setStage(1)}
                  className="relative z-10 flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>אני תוהה...</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}

              {/* Stage 1 — teaser shown, invite full reveal */}
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <div className="bg-white/15 border border-white/20 rounded-2xl px-5 py-4 mb-4">
                      <p className="text-white font-bold text-lg">
                        {chapter.hook.teaser}
                      </p>
                    </div>

                    {stage === 1 && (
                      <button
                        onClick={() => setStage(2)}
                        className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold transition-colors"
                      >
                        <span>ספר לי יותר</span>
                        <span>←</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage 2 — full answer slides in below */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-indigo-50 border-t-2 border-indigo-200 px-8 py-6">
                    <p className="text-indigo-900 text-base leading-relaxed font-medium">
                      {chapter.hook.reveal}
                    </p>
                    <p className="text-indigo-400 text-sm font-bold mt-3">
                      עכשיו אתה מוכן להתחיל
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── WHAT WE'LL LEARN ── */}
        <motion.div variants={item} className="w-full mb-10">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              מה נלמד בפרק?
            </h3>

            {/* Timeline — single col ≤6, two cols >6 */}
            {(() => {
              const useDouble = chapter.objectives.length > 6;
              const cols = useDouble
                ? [chapter.objectives.slice(0, Math.ceil(chapter.objectives.length / 2)),
                   chapter.objectives.slice(Math.ceil(chapter.objectives.length / 2))]
                : [chapter.objectives];

              const TimelineCol = ({ items, startIdx }) => (
                <div className="relative flex-1">
                  {/* Centered vertical line */}
                  <div className="absolute top-3 bottom-3 w-0.5 bg-indigo-100"
                       style={{ right: "11px" }} />
                  <ul className="space-y-0">
                    {items.map((obj, i) => (
                      <motion.li
                        key={i}
                        variants={item}
                        className="flex items-start gap-3 relative pb-5 last:pb-0"
                      >
                        {/* Dot — perfectly centered on the line */}
                        <div className="relative z-10 shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            startIdx + i === 0
                              ? "bg-indigo-500 border-indigo-500"
                              : "bg-white border-indigo-200"
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              startIdx + i === 0 ? "bg-white" : "bg-indigo-300"
                            }`} />
                          </div>
                        </div>
                        <p className="flex-1 text-gray-700 font-medium text-sm leading-relaxed pt-0.5">{obj}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              );

              return (
                <div className={useDouble ? "flex gap-8" : ""}>
                  {cols.map((colItems, ci) => (
                    <TimelineCol
                      key={ci}
                      items={colItems}
                      startIdx={ci * Math.ceil(chapter.objectives.length / 2)}
                    />
                  ))}
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div variants={item} className="flex flex-col items-center gap-3">
          <motion.button
            className="group px-10 py-4 bg-indigo-500 text-white text-lg font-black rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-600 hover:shadow-indigo-300 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>התחל בפרק</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </motion.button>
          <p className="text-xs text-gray-400 font-medium">לחץ כדי לצלול פנימה</p>
        </motion.div>

      </motion.div>
    </div>
  );
}
