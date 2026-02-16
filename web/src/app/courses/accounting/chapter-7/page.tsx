import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/accounting/chapter-7.json";

export default function Chapter7Page() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
