"use client";

import React from "react";
import { courseData } from "@/data/accounting";
import { CourseLandingTemplate } from "@/components/layout/CourseLandingTemplate";

export default function AccountingLanding() {
    return <CourseLandingTemplate courseData={courseData} />;
}
