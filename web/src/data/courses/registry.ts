export const COURSE_REGISTRY = {
    math: () => import("@/data/math").then(m => m.courseData),
} as const;

export type CourseId = keyof typeof COURSE_REGISTRY;
