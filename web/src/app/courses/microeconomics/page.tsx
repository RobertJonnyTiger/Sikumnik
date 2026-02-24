"use client";

import React from "react";
import { courseData } from "@/data/microeconomics";
import { CourseLandingTemplate } from "@/components/layout/CourseLandingTemplate";

export default function MicroeconomicsLanding() {
  return <CourseLandingTemplate courseData={courseData} />;
}
