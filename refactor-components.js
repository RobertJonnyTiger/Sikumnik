const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'web', 'src', 'components');

const replacements = [
    // Generic Text Adjustments for better legibility on light bg
    { regex: /text-gray-[123]00/g, replacement: 'text-foreground' },
    { regex: /text-slate-[123]00/g, replacement: 'text-foreground' },
    { regex: /text-gray-[789]00/g, replacement: 'text-foreground' },

    // Highlighting generic low-contrast backgrounds
    { regex: /bg-slate-50\/50/g, replacement: 'bg-white' },
    { regex: /bg-[a-z]+-50\/50/g, replacement: 'bg-white' }, // e.g. bg-amber-50/50, bg-teal-50/50, bg-blue-50/50

    // Semantic mapping for specific components like RealWorldExample
    { regex: /border-l-blue-500/g, replacement: 'border-l-primary' },
    { regex: /border-blue-[12]00/g, replacement: 'border-border' },
    { regex: /text-blue-700/g, replacement: 'text-foreground' },
    { regex: /text-blue-800/g, replacement: 'text-foreground' },
    { regex: /text-blue-500\/70/g, replacement: 'text-muted-foreground' },
    { regex: /bg-blue-100/g, replacement: 'bg-muted' },
    { regex: /text-blue-600/g, replacement: 'text-primary' },

    // Semantic mapping for ExamTip
    { regex: /border-amber-400/g, replacement: 'border-amber-400' }, // keep warning border
    { regex: /border-teal-400/g, replacement: 'border-primary' },
    { regex: /text-amber-700/g, replacement: 'text-foreground' },
    { regex: /text-teal-700/g, replacement: 'text-foreground' },
    { regex: /bg-amber-100/g, replacement: 'bg-white' },
    { regex: /bg-teal-100/g, replacement: 'bg-white' },

    // Specific problem areas
    { regex: /bg-gradient-to-r from-slate-50 to-slate-100/g, replacement: 'bg-card' },
    { regex: /bg-slate-50/g, replacement: 'bg-card' },
    { regex: /border-slate-200/g, replacement: 'border-border' },
    { regex: /text-slate-700/g, replacement: 'text-foreground' },
    { regex: /text-slate-800/g, replacement: 'text-foreground' },
    { regex: /text-slate-900/g, replacement: 'text-foreground' }
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;

            for (const { regex, replacement } of replacements) {
                content = content.replace(regex, replacement);
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated component: ${fullPath.replace(__dirname, '')}`);
            }
        }
    }
}

console.log("Starting semantic component refactoring...");
processDirectory(componentsDir);
console.log("Refactoring complete!");
