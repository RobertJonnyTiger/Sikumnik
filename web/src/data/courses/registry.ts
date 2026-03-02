// This is the ONLY file you ever edit when adding a new course.
// Add one line per course — nothing else needs to change anywhere.

export const COURSE_REGISTRY = {
    math: () => import("@/data/math").then(m => m.courseData),
    microeconomics: () => import("@/data/microeconomics").then(m => m.courseData),
    accounting: () => import("@/data/accounting").then(m => m.courseData),
    "organizational-behavior": () => import("@/data/organizational-behavior").then(m => m.courseData),
} as const;

export type CourseId = keyof typeof COURSE_REGISTRY;
