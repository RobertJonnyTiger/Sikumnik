const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Expecting glob to be available or I'll use recursive read

// Helper for recursive read if glob isn't perfect in this env
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.json')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const chaptersDir = path.join(__dirname, 'web/src/data/chapters');
const accordionDataPath = path.join(__dirname, 'web/src/data/accordionData.js');

// 1. Get all exported keys
const accordionContent = fs.readFileSync(accordionDataPath, 'utf8');
const exportRegex = /export const (\w+)\s*=/g;
const validKeys = new Set();
let match;
while ((match = exportRegex.exec(accordionContent)) !== null) {
    validKeys.add(match[1]);
}

console.log(`Found ${validKeys.size} valid keys in accordionData.js`);

// 2. Scan JSONs
const jsonFiles = getAllFiles(chaptersDir);
const broken = [];

jsonFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const json = JSON.parse(content);

        // Recursive search for deep-dive blocks
        function findDeepDives(obj, pathStack = []) {
            if (!obj) return;
            if (Array.isArray(obj)) {
                obj.forEach((item, idx) => findDeepDives(item, [...pathStack, `[${idx}]`]));
            } else if (typeof obj === 'object') {
                if (obj.type === 'deep-dive') {
                    // Check dataId
                    if (!obj.dataId) {
                        broken.push({
                            file: file,
                            reason: 'Missing dataId',
                            block: obj
                        });
                    } else if (!validKeys.has(obj.dataId)) {
                        broken.push({
                            file: file,
                            reason: 'Invalid dataId (not exported)',
                            dataId: obj.dataId
                        });
                    } else {
                        // Valid
                    }
                }
                // Continue recursion
                Object.keys(obj).forEach(key => {
                    findDeepDives(obj[key], [...pathStack, key]);
                });
            }
        }

        findDeepDives(json);

    } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
    }
});

if (broken.length === 0) {
    console.log("SUCCESS: All deep-dive blocks have valid dataIds.");
} else {
    console.log("FAILURES FOUND:");
    console.log(JSON.stringify(broken, null, 2));
}
