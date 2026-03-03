import { GraduationCap, Calculator, TrendingUp, Brain, Landmark, Scale } from "lucide-react";

interface ChapterItem {
    id?: string;
    title: string;
    href: string;
}

interface Topic {
    id: string;
    title: string;
    items: ChapterItem[];
}

interface Course {
    title: string;
    courseId: string;
    href: string;
    topics?: Topic[];
}

interface Degree {
    title: string;
    icon: React.ElementType;
    items: Course[];
}

interface CourseChapter {
    id: string;
    number: number;
    title: string;
    href: string;
}

interface CourseSyllabusItem {
    title: string;
    description?: string;
    icon?: React.ElementType;
    chapters: CourseChapter[];
}

interface CourseData {
    id: string;
    title: string;
    syllabus: CourseSyllabusItem[];
}

const DEGREE_MAP: Record<string, { title: string; icon: React.ElementType }> = {
    math: { title: "מתמטיקה", icon: Calculator },
    accounting: { title: "חשבונאות", icon: Landmark },
    microeconomics: { title: "מיקרו כלכלה", icon: TrendingUp },
    macroeconomics: { title: "מאקרו כלכלה", icon: Scale },
    default: { title: "בית הספר לניהול (B.A)", icon: GraduationCap },
};

function extractTopicsFromSyllabus(syllabus: CourseSyllabusItem[], courseId: string): Topic[] {
    return syllabus.map((section, index) => ({
        id: `${courseId}-topic-${index}`,
        title: section.title,
        items: section.chapters.map((chapter) => ({
            id: chapter.id,
            title: `פרק ${chapter.number}: ${chapter.title}`,
            href: chapter.href,
        })),
    }));
}

export async function getSidebarData(): Promise<Degree[]> {
    const degrees: Degree[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const courseRegistry: Record<string, () => Promise<any>> = {
        math: () => import("@/data/math"),
    };

    const degreeCourses: Record<string, string[]> = {
        "בית הספר לניהול (B.A)": ["math"],
    };

    for (const [degreeTitle, courseIds] of Object.entries(degreeCourses)) {
        const degreeCoursesList: Course[] = [];

        for (const courseId of courseIds) {
            const loadCourse = courseRegistry[courseId];
            if (!loadCourse) continue;

            try {
                const courseModule = await loadCourse();
                const courseData: CourseData = courseModule.default || courseModule;

                const degreeInfo = DEGREE_MAP[courseId] || DEGREE_MAP.default;

                degreeCoursesList.push({
                    title: courseData.title,
                    courseId: courseData.id,
                    href: `/courses/${courseData.id}`,
                    topics: extractTopicsFromSyllabus(courseData.syllabus || [], courseData.id),
                });
            } catch (error) {
                console.error(`Failed to load course ${courseId}:`, error);
            }
        }

        if (degreeCoursesList.length > 0) {
            degrees.push({
                title: degreeTitle,
                icon: GraduationCap,
                items: degreeCoursesList,
            });
        }
    }

    return degrees;
}

export type { Degree, Course, Topic, ChapterItem };
