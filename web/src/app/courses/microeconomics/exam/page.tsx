"use client";

import React from "react";
import { ExamEngine } from "@/components/exam/ExamEngine";
import examData from "@/data/microeconomics/chapters/simulation-micro-2013.json";
import { ExamData } from "@/types/exam";

export default function MicroeconomicsExamPage() {
    const data = examData as unknown as ExamData;

    return (
        <main className="min-h-screen bg-[#0f172a] py-12">
            <ExamEngine data={data} />
        </main>
    );
}
