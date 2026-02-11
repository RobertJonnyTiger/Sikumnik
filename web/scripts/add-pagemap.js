/**
 * Adds pageMap, chapterNumber, and totalChapters to all chapter JSON files
 * that don't already have them.
 */
const fs = require("fs");
const path = require("path");

const chaptersDir = path.join(__dirname, "..", "src", "data", "chapters");

// Chapter metadata: chapterNumber -> { objectives, estimatedTime, prerequisites }
const chapterMeta = {
    3: {
        objectives: [
            "להבין מהו דוח רווח והפסד ומה מטרתו",
            "להכיר את ההבדל בין הכנסות להוצאות",
            "לדעת לחשב רווח גולמי, תפעולי ונקי",
            "להבין את עקרון ההקבלה (Matching Principle)",
            "לקרוא ולפרש דוח רווח והפסד בסיסי"
        ],
        estimatedTime: "40 דקות"
    },
    4: {
        objectives: [
            "להבין מהי פקודת יומן ומדוע היא חשובה",
            "לדעת את כללי החיוב והזיכוי",
            "לרשום פקודות יומן בסיסיות",
            "להבין את עקרון הכפולה (Double Entry)",
            "לזהות חשבונות חובה וזכות בעסקאות נפוצות"
        ],
        estimatedTime: "50 דקות",
        prerequisites: [{ chapterId: "chapter-2", title: "פרק 2: כללי חשבונאות מקובלים", description: "הבנת המשוואה החשבונאית" }]
    },
    5: {
        objectives: [
            "להבין מהו מאזן בוחן ומה תפקידו",
            "לדעת לערוך מאזן בוחן מפקודות יומן",
            "לזהות שגיאות באמצעות מאזן בוחן",
            "להבין את הקשר בין מאזן בוחן לדוחות כספיים"
        ],
        estimatedTime: "35 דקות",
        prerequisites: [{ chapterId: "chapter-4", title: "פרק 4: פקודות יומן", description: "רישום פקודות יומן בסיסיות" }]
    },
    6: {
        objectives: [
            "להבין את התהליך החשבונאי המלא",
            "לדעת את שלבי המחזור החשבונאי",
            "להכיר את תהליך הסגירה והפתיחה",
            "לקשר בין כל הדוחות הכספיים"
        ],
        estimatedTime: "45 דקות",
        prerequisites: [{ chapterId: "chapter-5", title: "פרק 5: מאזן בוחן", description: "עריכת מאזן בוחן" }]
    },
    7: {
        objectives: [
            "להבין מהם כרטיסי חתך ומתי משתמשים בהם",
            "לדעת לערוך פקודות חתך",
            "להכיר הכנסות והוצאות שנצברו",
            "להבין הכנסות והוצאות מראש",
            "לרשום פקודות מתקנות בסוף תקופה"
        ],
        estimatedTime: "55 דקות",
        prerequisites: [{ chapterId: "chapter-6", title: "פרק 6: התהליך החשבונאי", description: "הבנת המחזור החשבונאי" }]
    },
    8: {
        objectives: [
            "להבין מהו מלאי וכיצד מודדים אותו",
            "לדעת לחשב עלות מכר",
            "להכיר את שיטת הספירה התקופתית",
            "להבין את ההשפעה של מלאי על הדוחות"
        ],
        estimatedTime: "40 דקות"
    },
    9: {
        objectives: [
            "להבין את שיטת FIFO לחישוב מלאי",
            "להבין את שיטת הממוצע המשוקלל",
            "להשוות בין השיטות והשפעתן על הרווח",
            "לדעת לחשב מלאי סוף ועלות מכר בכל שיטה"
        ],
        estimatedTime: "45 דקות",
        prerequisites: [{ chapterId: "chapter-8", title: "פרק 8: חישובי מלאי", description: "הבנת מושגי יסוד במלאי" }]
    },
    10: {
        objectives: [
            "להבין מהו רכוש קבוע וכיצד מכירים בו",
            "לדעת לחשב פחת בשיטת הקו הישר",
            "להבין את מושג הפחת הנצבר",
            "לדעת לטפל במכירת רכוש קבוע",
            "לחשב רווח או הפסד ממכירה"
        ],
        estimatedTime: "50 דקות"
    },
    11: {
        objectives: [
            "להבין את חשבון הלקוחות ומשמעותו",
            "לדעת מהי הפרשה לחובות מסופקים",
            "להכיר את שיטת האחוזים ושיטת הגיול",
            "לרשום פקודות יומן להפרשה ולמחיקה",
            "להבין את ההשפעה על הדוחות הכספיים"
        ],
        estimatedTime: "45 דקות"
    },
    12: {
        objectives: [
            "להבין מהו גיול חובות (Aging)",
            "לדעת לערוך טבלת גיול",
            "לחשב הפרשה לפי קבוצות גיל",
            "להשוות בין שיטת האחוזים לשיטת הגיול",
            "לרשום פקודות התאמה מתאימות"
        ],
        estimatedTime: "40 דקות",
        prerequisites: [{ chapterId: "chapter-11", title: "פרק 11: לקוחות והפרשה", description: "הבנת חובות מסופקים" }]
    }
};

const totalChapters = 12;

// Process each chapter
for (const [chapterNum, meta] of Object.entries(chapterMeta)) {
    const filename = `chapter-${chapterNum}.json`;
    const filepath = path.join(chaptersDir, filename);

    if (!fs.existsSync(filepath)) {
        console.log(`SKIP: ${filename} not found`);
        continue;
    }

    const raw = fs.readFileSync(filepath, "utf-8");
    const data = JSON.parse(raw);

    // Skip if already has pageMap
    if (data.pageMap) {
        console.log(`SKIP: ${filename} already has pageMap`);
        continue;
    }

    // Add fields
    data.chapterNumber = parseInt(chapterNum);
    data.totalChapters = totalChapters;
    data.pageMap = {
        learningObjectives: meta.objectives,
        prerequisites: meta.prerequisites || [],
        estimatedTime: meta.estimatedTime
    };

    // Write back with proper formatting
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4), "utf-8");
    console.log(`DONE: ${filename} -> chapterNumber=${chapterNum}, ${meta.objectives.length} objectives`);
}

console.log("\nAll chapters updated!");
