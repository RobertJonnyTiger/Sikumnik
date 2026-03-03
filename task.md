# Task: Fix System-Wide KaTeX + Theme Color Regression

## Phase 1: Environment Scan & Diagnosis
- [/] Run environment scan commands
- [ ] Read `layout.tsx` — check KaTeX CSS import, font/theme provider
- [ ] Read `globals.css` — check CSS custom properties
- [ ] Read `LessonMarkdown.tsx` — check KaTeX invocation method
- [ ] Read Tailwind config — check CSS variable mappings
- [ ] Read `TextBlock.tsx` — check if it uses LessonMarkdown
- [ ] Report all findings (Diagnostic Checklist)

## Phase 2: KaTeX Diagnosis
- [ ] Is `import 'katex/dist/katex.min.css'` present in `layout.tsx`?
- [ ] What package is used for math rendering?
- [ ] Is that package listed in `package.json` dependencies?
- [ ] What delimiter does `LessonMarkdown` use for inline math?
- [ ] Is `LessonMarkdown` a client or server component?

## Phase 3: Color Diagnosis
- [ ] Does `globals.css` have `:root { --background; --foreground; }` block?
- [ ] Are the values valid CSS colors?
- [ ] Does `.dark {}` block override same variables?
- [ ] Does tailwind config map background/foreground to CSS vars?
- [ ] Any recent git changes to `globals.css` or `layout.tsx`?

## Phase 4: Apply Fixes
- [ ] Fix KaTeX rendering (based on diagnosis)
- [ ] Fix color token collapse (based on diagnosis)
- [ ] Verify build passes
- [ ] Verify `/courses/math/chapter-01` renders correctly
- [ ] Verify `/workshop` renders correctly

## Phase 5: Final Report
- [ ] Generate `Final Action Report.md`
- [ ] Send for audit
