const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'app', 'courses', 'accounting');

for (let i = 1; i <= 12; i++) {
    const dir = path.join(baseDir, 'chapter-' + i);
    if (!fs.existsSync(dir)) {
        console.log('Skip ch' + i + ': no dir');
        continue;
    }
    const layoutPath = path.join(dir, 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
        console.log('Skip ch' + i + ': layout exists');
        continue;
    }
    const content = [
        'import type { Metadata } from "next";',
        'import { createChapterMetadata } from "@/lib/chapter-metadata";',
        'import chapterData from "@/data/chapters/chapter-' + i + '.json";',
        '',
        'export const metadata: Metadata = createChapterMetadata(chapterData as any);',
        '',
        'export default function Chapter' + i + 'Layout({ children }: { children: React.ReactNode }) {',
        '    return <>{children}</>;',
        '}',
        ''
    ].join('\n');

    fs.writeFileSync(layoutPath, content, 'utf8');
    console.log('Created layout for chapter ' + i);
}
