import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    BookOpen,
    Clock,
    Target,
    ArrowRight,
    ChevronLeft,
    PlayCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COURSE_REGISTRY, CourseId } from "@/data/courses/registry";

interface PageProps {
    params: Promise<{ courseId: string }>;
}

export default async function CourseOverviewPage(props: PageProps) {
    const params = await props.params;
    const courseId = params.courseId;

    if (!courseId || !(courseId in COURSE_REGISTRY)) {
        return notFound();
    }

    const course = await COURSE_REGISTRY[courseId as CourseId]();

    if (!course) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 pb-20" dir="rtl">
            {/* Hero Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-bold">
                    <BookOpen className="w-5 h-5" />
                    <span className="tracking-widest uppercase text-sm">קורס אקדמי</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight">{course.title}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                    {course.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    {course.stats.map((stat: any, idx: number) => (
                        <Card key={idx} className="flex items-center gap-4 px-6 py-4 bg-muted/50 border-none rounded-2xl">
                            <stat.icon className="w-6 h-6 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-lg font-black">{stat.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Syllabus */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black">סילבוס הקורס</h2>
                    <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary">
                        {course.syllabus.length} פרקים
                    </Badge>
                </div>

                <div className="grid gap-6">
                    {course.syllabus.map((section: any, sectionIdx: number) => (
                        <div key={sectionIdx} className="space-y-4">
                            <div className="flex items-center gap-4 pt-6 first:pt-0">
                                <section.icon className="w-6 h-6 text-muted-foreground" />
                                <h3 className="text-xl font-bold opacity-60 uppercase tracking-wider">{section.title}</h3>
                            </div>

                            <div className="grid gap-4">
                                {section.chapters.map((chapter: any, chapterIdx: number) => (
                                    <Link key={chapterIdx} href={chapter.href}>
                                        <Card className="group relative overflow-hidden p-6 hover:border-primary/50 transition-all hover:shadow-lg rounded-3xl border-2">
                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-foreground transition-colors">
                                                        {chapter.number}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black group-hover:text-primary transition-colors">{chapter.title}</h4>
                                                        <p className="text-muted-foreground font-medium line-clamp-1">{chapter.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <PlayCircle className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all" />
                                                    <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
