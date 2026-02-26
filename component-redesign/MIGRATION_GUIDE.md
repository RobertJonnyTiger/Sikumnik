# 🔄 Component System Migration Guide

## **Before → After Mapping**

### DEFINITIONS
```
OLD TYPE                          → NEW TYPE
─────────────────────────────────────────────────
"academic-definition"            → "definition" (variant: "academic")
"definition" / "definition-card"  → "definition" (variant: "simple")
```

**Example Migration:**
```json
// BEFORE
{
  "type": "academic-definition",
  "content": "The loss of potential gain from other alternatives..."
}

// AFTER
{
  "type": "definition",
  "variant": "academic",
  "term": "Opportunity Cost",
  "definition": "The loss of potential gain from other alternatives..."
}
```

---

### ALERTS & CALLOUTS
```
OLD TYPE                          → NEW TYPE
─────────────────────────────────────────────────
"callout" (variant: "tip")        → "alert" (variant: "tip")
"callout" (variant: "warning")    → "alert" (variant: "warning")
"callout" (variant: "note")       → "alert" (variant: "tip") [NO LONGER NEEDED]
"callout" (variant: "important")  → "alert" (variant: "warning") [MERGE INTO WARNING]
"exam-tip" (importance: any)      → "alert" (variant: "tip")
"common-mistake"                  → "alert" (variant: "warning")
"prerequisite"                    → "alert" (variant: "prerequisite")
```

**Example Migration:**
```json
// BEFORE
[
  { "type": "callout", "variant": "tip", "content": "Pro tip: Always..." },
  { "type": "exam-tip", "importance": "high", "content": "This appears on..." },
  { "type": "callout", "variant": "warning", "content": "Watch out..." }
]

// AFTER
[
  { "type": "alert", "variant": "tip", "content": "Pro tip: Always..." },
  { "type": "alert", "variant": "tip", "content": "This appears on..." },
  { "type": "alert", "variant": "warning", "content": "Watch out..." }
]
```

---

### EXAMPLES
```
OLD TYPE                          → NEW TYPE
─────────────────────────────────────────────────
"example"                         → "real-world-example"
"real-world-example"              → "real-world-example" (unchanged)
```

**NOTE:** Keep both types consolidated as one `RealWorldExample` component.

---

### EXERCISES
```
OLD TYPE                          → NEW TYPE
─────────────────────────────────────────────────
"checkpoint" / "checkpoint-quiz"  → "checkpoint-quiz"
"knowledge-challenge"             → "knowledge-exam" (moved to chapter end only)
"guided-exercise"                 → "guided-exercise" (enhanced)
```

**Important:** `KnowledgeExam` should ONLY appear:
- At the END of a chapter
- As a 5-question cumulative test
- NOT scattered throughout the chapter

---

### NARRATIVE
```
OLD TYPE                          → NEW TYPE
─────────────────────────────────────────────────
"hook"                            → "hook"
"tone-break"                      → "street-smart"
"explanation"                     → "explanation"
"deep-dive"                       → "deep-dive"
"narrative-summary"               → "narrative-summary"
"topic-summary"                   → DELETE (remove entirely)
```

---

## **IMPLEMENTATION CHECKLIST**

### Phase 1: Core Components (Week 1)
- [ ] Update `Definition.tsx` to support `variant` prop
- [ ] Create `AcademicDefinition.tsx` (enhanced styling)
- [ ] Create unified `Alert.tsx` with 3 variants
- [ ] Update all Callout usages → Alert
- [ ] Delete old Callout component

### Phase 2: Examples & Exercises (Week 2)
- [ ] Consolidate Example → RealWorldExample
- [ ] Improve CheckpointQuiz UX
- [ ] Create KnowledgeExam component
- [ ] Enhance GuidedExercise step system
- [ ] Delete old Exercise components

### Phase 3: Narrative (Week 3)
- [ ] Redesign Hook styling
- [ ] Resurrect StreetSmart component
- [ ] Keep Explanation and DeepDive
- [ ] Enhance NarrativeSummary
- [ ] Delete TopicSummary entirely

### Phase 4: Data Migration (Week 4)
- [ ] Update accounting chapter JSONs
- [ ] Update microeconomics chapter JSONs
- [ ] Update organizational-behavior chapter JSONs
- [ ] Test all chapters render correctly
- [ ] Update component library docs

---

## **JSON STRUCTURE CHANGES**

### New Top-Level Block Type Registry
```typescript
type BlockType = 
  | 'definition'                 // Unified definitions
  | 'alert'                      // Unified alerts
  | 'real-world-example'         // Unified examples
  | 'explanation'                // Core explanation
  | 'deep-dive'                  // Advanced expandable
  | 'hook'                        // Chapter opener
  | 'street-smart'               // Casual explanation (NEW!)
  | 'checkpoint-quiz'            // Quick check
  | 'knowledge-exam'             // Chapter-end 5-q exam
  | 'guided-exercise'            // How-to solution walkthrough
  | 'narrative-summary'          // Chapter wrap-up
  | 'formula'                    // Mathematical formula
  | 'analogy'                    // Real-world analogy
  | 'did-you-know'               // Fun facts
  | 'maslow-pyramid'             // Behavioral model
  | 'situational-leadership'     // 2x2 matrix
  | 'attribution-flowchart'      // Decision tree
  | 'curve-shifter'              // Economic visualization
  | 'ppf-graph'                  // Production possibility frontier
```

---

## **EXAMPLE: FULL CHAPTER MIGRATION**

### Before (Messy)
```json
{
  "id": "chapter-3",
  "title": "Supply and Demand",
  "topics": [
    {
      "id": "topic-1",
      "title": "Introduction",
      "blocks": [
        {
          "type": "hook",
          "content": "Ever wonder why gas prices jump before a hurricane?"
        },
        {
          "type": "academic-definition",
          "content": "Formal definition of supply..."
        },
        {
          "type": "definition-card",
          "term": "Supply",
          "content": "Simple def of supply"
        },
        {
          "type": "callout",
          "variant": "tip",
          "content": "Remember the upward slope..."
        }
      ]
    },
    {
      "id": "topic-2",
      "title": "Equilibrium",
      "blocks": [
        {
          "type": "explanation",
          "content": "Core explanation..."
        },
        {
          "type": "exam-tip",
          "importance": "high",
          "content": "This will definitely be on the exam"
        },
        {
          "type": "real-world-example",
          "title": "Housing Market",
          "content": "Story about housing prices..."
        },
        {
          "type": "checkpoint",
          "question": "What shifts...",
          "options": [...],
          "correct": 0
        }
      ]
    },
    {
      "id": "topic-3",
      "title": "Elasticity",
      "blocks": [
        {
          "type": "deep-dive",
          "title": "Advanced analysis",
          "sections": [...]
        }
      ]
    }
  ],
  "assessment": {
    "type": "knowledge-challenge",
    "questions": [...]
  }
}
```

### After (Clean)
```json
{
  "id": "chapter-3",
  "title": "Supply and Demand",
  "topics": [
    {
      "id": "topic-1",
      "title": "Introduction",
      "blocks": [
        {
          "type": "hook",
          "question": "Ever wonder why gas prices jump before a hurricane?",
          "followUp": "Let's dive into Supply and Demand."
        },
        {
          "type": "definition",
          "variant": "academic",
          "term": "Supply",
          "definition": "Formal definition of supply..."
        },
        {
          "type": "alert",
          "variant": "tip",
          "content": "Remember the upward slope..."
        }
      ]
    },
    {
      "id": "topic-2",
      "title": "Equilibrium",
      "blocks": [
        {
          "type": "explanation",
          "keyTakeaway": "Equilibrium is where supply meets demand",
          "content": "Core explanation..."
        },
        {
          "type": "alert",
          "variant": "tip",
          "content": "This will definitely be on the exam"
        },
        {
          "type": "real-world-example",
          "title": "Housing Market",
          "narrative": "Story about housing prices...",
          "theoreticalLink": "Shows how prices equilibrate..."
        },
        {
          "type": "checkpoint-quiz",
          "question": "What shifts...",
          "options": [...],
          "correctAnswer": 0,
          "explanation": "Because..."
        }
      ]
    },
    {
      "id": "topic-3",
      "title": "Elasticity",
      "blocks": [
        {
          "type": "deep-dive",
          "title": "Advanced analysis",
          "sections": [...]
        }
      ]
    }
  ],
  "endOfChapterExam": {
    "type": "knowledge-exam",
    "questions": [
      {
        "id": "q1",
        "question": "Question...",
        "options": [...],
        "correctAnswer": 0,
        "explanation": "..."
      },
      // ... 4 more questions (5 total minimum)
    ]
  }
}
```

**Key Changes:**
1. ❌ Remove `academic-definition`, use `definition` with `variant: "academic"`
2. ❌ Remove redundant `definition-card`, consolidate into `definition` variant
3. ❌ Remove `callout`, use `alert` variants
4. ❌ Remove `exam-tip`, use `alert` variant `"tip"`
5. ✅ Keep `checkpoint-quiz` but improve UX
6. ✅ Move `knowledge-challenge` → `knowledge-exam` to chapter end only
7. ✅ Add `street-smart` type for casual explanations (NEW!)
8. ✅ Keep `explanation`, `deep-dive`, `hook`, `real-world-example`

---

## **MIGRATION SCRIPT (Pseudo-code)**

```python
# Run this on all chapter JSON files

def migrate_chapter(old_json):
    new_json = deepcopy(old_json)
    
    # Flatten topics into blocks with proper type mapping
    for topic in new_json['topics']:
        for i, block in enumerate(topic['blocks']):
            block_type = block.get('type')
            
            # Definition consolidation
            if block_type in ['academic-definition', 'definition-card', 'definition']:
                block['type'] = 'definition'
                block['variant'] = 'academic' if block_type == 'academic-definition' else 'simple'
                block.pop('variant', None)  # Remove if exists
            
            # Alert unification
            elif block_type == 'callout':
                block['type'] = 'alert'
                variant = block.get('variant', 'tip')
                # Map: 'note' → 'tip', 'important' → 'warning'
                if variant in ['note']:
                    block['variant'] = 'tip'
                elif variant in ['important']:
                    block['variant'] = 'warning'
            
            elif block_type == 'exam-tip':
                block['type'] = 'alert'
                block['variant'] = 'tip'
                block.pop('importance', None)
            
            elif block_type == 'common-mistake':
                block['type'] = 'alert'
                block['variant'] = 'warning'
            
            # Exercise updates
            elif block_type == 'checkpoint':
                block['type'] = 'checkpoint-quiz'
                # Map: 'correct' → 'correctAnswer'
                if 'correct' in block:
                    block['correctAnswer'] = block.pop('correct')
            
            elif block_type == 'knowledge-challenge':
                # MOVE TO END OF CHAPTER, not in topics
                continue
            
            # Narrative updates
            elif block_type == 'tone-break':
                block['type'] = 'street-smart'
                # Map 'content' to be in 'children' implicitly
            
            elif block_type == 'topic-summary':
                # DELETE
                topic['blocks'].pop(i)
    
    # Move knowledge-challenge to end-of-chapter-exam
    if 'assessment' in old_json and old_json['assessment']['type'] == 'knowledge-challenge':
        new_json['endOfChapterExam'] = {
            'type': 'knowledge-exam',
            'questions': old_json['assessment']['questions']
        }
        new_json.pop('assessment')
    
    return new_json
```

---

## **VALIDATION CHECKLIST**

After migration, ensure:

- [ ] All chapters load without console errors
- [ ] `AcademicDefinition` appears on chapter-1, topic-1 pages
- [ ] `Definition` (simple) appears mid-chapter only
- [ ] All `alert` variants display correctly
- [ ] `KnowledgeExam` appears ONLY at chapter end
- [ ] `CheckpointQuiz` scattered through chapters
- [ ] `GuidedExercise` appears in relevant topics
- [ ] `Hook` appears at chapter start
- [ ] `StreetSmart` works for casual explanations
- [ ] `NarrativeSummary` at chapter end (before exam)
- [ ] No `TopicSummary` components remain
- [ ] Mobile responsive on all new components
- [ ] Dark mode / light mode working

---

## **ROLLBACK PLAN**

If issues arise:
1. Keep old component files in `/archive/` folder
2. Create feature branch for migration
3. Test thoroughly on staging before prod
4. If critical issue: revert to old components + data
5. Debug issue in dev environment
6. Re-deploy when ready

---

## **TIMELINE**

- **Week 1:** Create/update core components (Definition, Alert)
- **Week 2:** Update Exercise components
- **Week 3:** Finalize Narrative components
- **Week 4:** Data migration + testing
- **Week 5:** Deploy to production
- **Week 6:** Monitor + bug fixes

---

