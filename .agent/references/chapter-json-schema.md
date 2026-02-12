# Chapter JSON Schema

Every chapter data file should follow this structure:

```json
{
  "id": "chapter-X-slug",
  "chapterNumber": 2,
  "totalChapters": 12,
  "title": "שם הפרק",
  
  "navigation": {
    "previous": { "id": "chapter-1", "title": "פרק קודם" },
    "next": { "id": "chapter-3", "title": "פרק הבא" }
  },

  "pageMap": {
    "learningObjectives": ["...", "...", "..."],
    "prerequisites": [
      { "chapterId": "chapter-1", "title": "...", "description": "..." }
    ],
    "estimatedTime": "45 דקות"
  },

  "introduction": {
    "content": "2-3 paragraphs...",
    "whyItMatters": "..."
  },

  "teaserAnalogy": {
    "content": "One paragraph with TLV analogy..."
  },

  "formalDefinitions": {
    "concepts": [
      {
        "title": "...",
        "content": "...",
        "tooltips": { "term": "definition" }
      }
    ],
    "formulas": [
      {
        "title": "...",
        "formula": "...",
        "variables": [{ "symbol": "X", "name": "...", "desc": "..." }]
      }
    ]
  },

  "toneBreak": {
    "opener": "תכל'ס מה זה?",
    "content": "Casual re-explanation..."
  },

  "deepDive": {
    "content": "...",
    "examples": [...],
    "alternativeApproaches": [...],
    "connections": [...],
    "examAppearance": {
      "formats": [...],
      "keyPhrases": [...],
      "tips": [...]
    }
  },

  "commonMistakes": [
    { "mistake": "...", "correct": "...", "why": "..." }
  ],

  "interactiveElement": {
    "type": "comparison-table | flowchart | classification | ...",
    "title": "...",
    "data": { ... }
  },

  "checkpoint": [
    {
      "type": "multipleChoice | trueFalse",
      "question": "...",
      "options": [...],
      "correctIndex": 0,
      "explanation": "..."
    }
  ],

  "streetSummary": {
    "content": "Extended TLV analogy summary..."
  },

  "guidedExercises": [
    {
      "difficulty": 1,
      "question": "...",
      "thinkingDirection": "...",
      "steps": [
        { "title": "...", "action": "...", "reasoning": "...", 
          "calculation": "...", "result": "..." }
      ],
      "finalAnswer": "..."
    }
  ],

  "independentExercises": [
    {
      "difficulty": 3,
      "question": "...",
      "hint": "...",
      "answer": "...",
      "isExamStyle": false
    }
  ],

  "quickReference": {
    "formulas": [{ "name": "...", "formula": "..." }],
    "definitions": [{ "term": "...", "definition": "..." }]
  },

  "trivia": [
    { "fact": "...", "type": "historical | funFact" }
  ],

  "bridge": {
    "nextChapterTitle": "...",
    "content": "בפרק הבא..."
  }
}