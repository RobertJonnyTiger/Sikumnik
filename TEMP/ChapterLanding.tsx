"use client";

import React, { useState } from "react";
import { ChapterData } from "@/types/chapter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Target,
  ArrowLeft,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LessonMarkdown } from "@/features/core-lessons/blocks/LessonMarkdown";

interface ChapterLandingProps {
  data: ChapterData;
  onStart: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export const ChapterLanding: React.FC<ChapterLandingProps> = ({ data, onStart }) => {
  const [hookRevealed, setHookRevealed] = useState(false);

  return (
    <motion.div
      className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 max-w-3xl mx-auto"
      dir="rtl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Badges */}
      <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8">
        <Badge variant="outline" className="text-sm py-1 px-4 border-primary/20 bg-primary/5 text-sky-800">
          {data.course}
        </Badge>
        <Badge variant="secondary" className="text-sm py-1 px-4">
          פרק {data.chapterNumber}
        </Badge>
        {data.pageMap?.estimatedTime && (
          <Badge variant="outline" className="text-sm py-1 px-4 text-muted-foreground gap-1 flex items-center">
            <Clock className="w-3.5 h-3.5" />
            {data.pageMap.estimatedTime}
          </Badge>
        )}
      </motion.div>

      {/* Chapter Title */}
      <motion.h1
        variants={item}
        className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-center text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/70 mb-12"
      >
        {data.title}
      </motion.h1>

      {/* Hook Block — the star of the page */}
      {data.introduction?.hook && (
        <motion.div variants={item} className="w-full mb-8">
          <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-200 shadow-lg shadow-indigo-100/50">

            {/* Gradient background */}
            <div className="bg-linear-to-br from-indigo-500 to-violet-600 px-8 pt-8 pb-6">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>

              {/* Hook question — the big text */}
              <p className="text-2xl md:text-3xl font-black text-white leading-snug mb-2">
                {data.introduction.hook}
              </p>

              {/* Reveal trigger */}
              {data.introduction?.whyItMatters && !hookRevealed && (
                <button
                  onClick={() => setHookRevealed(true)}
                  className="mt-4 flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold transition-colors group"
                >
                  <span>גלה את התשובה</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              )}
            </div>

            {/* Revealed answer — smooth slide */}
            <AnimatePresence>
              {hookRevealed && data.introduction?.whyItMatters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                  className="overflow-hidden"
                >
                  <div className="bg-indigo-50 border-t-2 border-indigo-200 px-8 py-5">
                    <p className="text-indigo-900 text-base leading-relaxed font-medium">
                      {data.introduction.whyItMatters}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Learning Objectives */}
      {data.pageMap?.learningObjectives && data.pageMap.learningObjectives.length > 0 && (
        <motion.div variants={item} className="w-full mb-10">
          <div className="bg-card border-2 border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              מה נלמד בפרק?
            </h3>
            <ul className="space-y-3">
              {data.pageMap.learningObjectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-xl bg-indigo-100 text-indigo-600 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">{objective}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div variants={item} className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="group relative px-10 py-4 bg-indigo-500 text-white text-lg font-black rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-600 hover:shadow-indigo-300 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          <span>התחל בפרק</span>
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>
        <p className="text-xs text-muted-foreground font-medium">לחץ כדי לצלול פנימה</p>
      </motion.div>

    </motion.div>
  );
};
