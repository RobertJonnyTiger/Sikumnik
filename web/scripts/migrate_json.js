const fs = require('fs');
const path = require('path');

function migrateBlock(block) {
    if (!block) return block;

    // DEFINITIONS
    if (block.type === 'academic-definition' || block.type === 'definition-card') {
        const variant = block.type === 'academic-definition' ? 'academic' : 'simple';
        return { ...block, type: 'definition', variant, term: block.term || block.title || 'מושג' };
    }

    // ALERTS & CALLOUTS
    if (block.type === 'callout') {
        let variant = block.variant || 'tip';
        if (variant === 'note') variant = 'tip';
        if (variant === 'important') variant = 'warning';
        return { ...block, type: 'alert', variant };
    }
    if (block.type === 'exam-tip') {
        const migrated = { ...block, type: 'alert', variant: 'tip' };
        delete migrated.importance;
        return migrated;
    }
    if (block.type === 'common-mistake') {
        // Special case mapping: common-mistake has mistake, correct, why. Alert just uses content.
        // We will combine them into the content field if content is missing.
        const content = block.content || `**טעות נפוצה:** ${block.mistake}\n\n**האמת היא:** ${block.correct}\n\n**למה?** ${block.why}`;
        const migrated = { ...block, type: 'alert', variant: 'warning', content };
        delete migrated.mistake;
        delete migrated.correct;
        delete migrated.why;
        return migrated;
    }
    if (block.type === 'prerequisite') {
        return { ...block, type: 'alert', variant: 'prerequisite' };
    }

    // EXAMPLES
    if (block.type === 'example') {
        const migrated = { ...block, type: 'real-world-example' };
        // Usually real-world-example expects narrative and theoreticalLink, but example has scenario and solution
        if (block.scenario && !migrated.narrative) {
            migrated.narrative = block.scenario;
            delete migrated.scenario;
        }
        if (block.solution && !migrated.theoreticalLink) {
            migrated.theoreticalLink = block.solution;
            delete migrated.solution;
        }
        return migrated;
    }

    // EXERCISES
    if (block.type === 'checkpoint') {
        const migrated = { ...block, type: 'checkpoint-quiz' };
        if (migrated.correct !== undefined) {
            migrated.correctAnswer = migrated.correct;
            delete migrated.correct;
        }
        return migrated;
    }

    // NARRATIVE
    if (block.type === 'tone-break') {
        return { ...block, type: 'street-smart' };
    }

    return block;
}

function processChapter(filePath) {
    let raw;
    try {
        raw = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.error("Failed to read", filePath);
        return false;
    }

    let chapter;
    try {
        chapter = JSON.parse(raw);
    } catch (e) {
        console.error("Failed to parse", filePath);
        return false;
    }

    let modified = false;

    if (chapter.topics && Array.isArray(chapter.topics)) {
        chapter.topics.forEach(topic => {
            if (topic.blocks && Array.isArray(topic.blocks)) {
                // Filter out topic-summary and knowledge-challenge (moved to endOfChapterExam)
                const originalLength = topic.blocks.length;
                let newBlocks = [];

                topic.blocks.forEach(block => {
                    if (block.type === 'topic-summary') {
                        modified = true;
                        return; // DELETE
                    }
                    if (block.type === 'knowledge-challenge') {
                        // Move to endOfChapterExam
                        if (!chapter.endOfChapterExam) {
                            chapter.endOfChapterExam = { type: 'knowledge-exam', questions: block.questions || [] };
                        }
                        modified = true;
                        return; // Removed from blocks
                    }

                    const migratedBlock = migrateBlock(block);
                    if (JSON.stringify(block) !== JSON.stringify(migratedBlock)) {
                        modified = true;
                    }
                    newBlocks.push(migratedBlock);
                });

                topic.blocks = newBlocks;
            }
        });
    }

    if (chapter.assessment && chapter.assessment.type === 'knowledge-challenge') {
        chapter.endOfChapterExam = {
            type: 'knowledge-exam',
            questions: chapter.assessment.questions || []
        };
        delete chapter.assessment;
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(chapter, null, 4));
        return true;
    }
    return false;
}

function findAndProcess() {
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
        console.log("Data dir not found at", dataDir);
        return;
    }

    let totalFiles = 0;
    let modifiedFiles = 0;

    const findJsonFiles = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                findJsonFiles(fullPath);
            } else if (fullPath.endsWith('.json')) {
                totalFiles++;
                if (processChapter(fullPath)) {
                    modifiedFiles++;
                    console.log(`Migrated: ${fullPath}`);
                }
            }
        }
    };

    findJsonFiles(dataDir);
    console.log(`\nMigration Complete: Checked ${totalFiles} files. Migrated ${modifiedFiles} files.`);
}

findAndProcess();
