import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/accounting/chapters/chapter-5.json";

export default function Chapter5Page() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
