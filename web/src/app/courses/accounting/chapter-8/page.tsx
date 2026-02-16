import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/accounting/chapter-8.json";

export default function Chapter8Page() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
