import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/math/chapter-01.json";

const ArcadePlaceholder = ({ title, type }: { title: string; type: string }) => (
    <div
        className="p-8 border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 my-8 text-center"
        data-testid={`arcade-${type}`}
    >
        <div className="text-2xl mb-2">🎮</div>
        <div className="font-bold text-lg mb-1">{title}</div>
        <div className="text-sm text-muted-foreground font-mono">{type}</div>
    </div>
);

const mathChapterRaw = chapterData as any;

// Normalize paginated structure to Topics structure if needed
const normalizedData = Array.isArray(mathChapterRaw)
    ? {
        id: "math-ch1",
        course: "מתמטיקה",
        chapterNumber: 1,
        totalChapters: 12,
        title: "מבוא למתמטיקה אקדמית",
        topics: mathChapterRaw.map((page: any, idx: number) => ({
            id: `page-${idx}`,
            title: page.pageTitle || `חלק ${idx + 1}`,
            blocks: page.blocks
        }))
    }
    : mathChapterRaw;

export default function MathChapter1Page() {
    const registry = {
        // Math-specific games can be added here
        "arcade-algebra-speed": <ArcadePlaceholder title="Algebra Speed Challenge" type="speed-sorter" />,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <ChapterTemplate
                data={normalizedData}
                interactiveRegistry={registry}
            />
        </div>
    );
}
