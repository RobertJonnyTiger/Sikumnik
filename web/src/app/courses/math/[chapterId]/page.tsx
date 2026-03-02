import { notFound } from "next/navigation";
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";

interface PageProps {
    params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.join(process.cwd(), "src/data/chapters/math");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    return files.map(f => ({ chapterId: f.replace(".json", "") }));
}

export default async function MathChapterPage(props: PageProps) {
    const { chapterId } = await props.params;

    let raw: any;
    try {
        raw = (await import(`@/data/chapters/math/${chapterId}.json`)).default;
    } catch {
        return notFound();
    }

    const chapterNumber = parseInt(chapterId.replace("chapter-", ""), 10);

    const normalized: ChapterData = Array.isArray(raw)
        ? {
            id: `math-${chapterId}`,
            course: "מתמטיקה",
            chapterNumber,
            totalChapters: 12,
            title: raw[0]?.pageTitle ?? chapterId,
            topics: raw.map((page: any, idx: number) => ({
                id: `page-${idx}`,
                title: page.pageTitle || `חלק ${idx + 1}`,
                blocks: page.blocks,
            })),
        }
        : raw;

    return <ChapterTemplate data={normalized} />;
}
