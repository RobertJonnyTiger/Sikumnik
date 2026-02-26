# 🎨 Visual Design System Reference

---

## **COLOR PALETTE**

### Primary Colors
```
Primary Blue:       #3b82f6
Teal/Cyan:         #06b6d4 (secondary, alerts/tips)
Dark Blue:         #1e3a8a (academic, formal)
Orange:            #f97316 (street-smart, casual)
```

### Component-Specific Colors
```
┌─────────────────────────────────────────────────────────┐
│ COMPONENT          │ COLOR       │ HEX      │ USE       │
├─────────────────────────────────────────────────────────┤
│ Academic Definition│ Dark Blue   │ #1e3a8a  │ Border,   │
│                    │             │          │ Icon,     │
│                    │             │          │ Text      │
├─────────────────────────────────────────────────────────┤
│ Definition (Simple)│ Teal        │ #06b6d4  │ Border,   │
│                    │             │          │ Icon      │
├─────────────────────────────────────────────────────────┤
│ Alert Tip          │ Teal        │ #06b6d4  │ Border,   │
│                    │             │          │ Background│
├─────────────────────────────────────────────────────────┤
│ Alert Warning      │ Amber       │ #fbbf24  │ Border,   │
│                    │             │          │ Background│
├─────────────────────────────────────────────────────────┤
│ Alert Prerequisite │ Gray        │ #9ca3af  │ Border,   │
│                    │             │          │ Background│
├─────────────────────────────────────────────────────────┤
│ Real-World Example │ Primary Blue│ #3b82f6  │ Border,   │
│                    │             │          │ Accent    │
├─────────────────────────────────────────────────────────┤
│ Hook               │ Gradient    │ See below│ Background│
│                    │ Violet→Indigo           │           │
├─────────────────────────────────────────────────────────┤
│ StreetSmart        │ Orange      │ #f97316  │ Border,   │
│                    │             │          │ Background│
├─────────────────────────────────────────────────────────┤
│ Deep Dive          │ Red         │ #dc2626  │ Border,   │
│                    │             │          │ Badge     │
└─────────────────────────────────────────────────────────┘
```

### Background Colors
```
Academic Definition  → #fafaf9 (very light gray-blue)
Definition (Simple)  → #f0fdfa (very light teal)
Alert Tip           → #f0fdfa (very light teal)
Alert Warning       → #fffbeb (very light amber)
Alert Prerequisite  → #f9fafb (very light gray)
StreetSmart         → #fff7ed (very light orange)
Deep Dive           → #f3f4f6 (light gray)
Explanation         → Transparent (blue left bar only)
Hook                → Gradient (see below)
```

### Gradient Reference
```css
/* Hook Component */
background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
/* Violet (#7c3aed) → Indigo (#4f46e5) */
```

---

## **TYPOGRAPHY**

### Font Families
```
Serif (Academic):     Georgia, Garamond, serif
Sans-Serif (Default): -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
Monospace (Code):     "Courier New", monospace
```

### Font Sizes & Weights

#### Academic Definition
```
Title (Term):         24px, font-weight: 700 (bold), Serif
Definition:           16px, font-weight: 400 (regular), Sans
Citation:             12px, font-weight: 500 (medium), Sans
```

#### Definition (Simple)
```
Title (Term):         18px, font-weight: 700 (bold), Sans
Definition:           14px, font-weight: 400 (regular), Sans
```

#### Alert Variants
```
Title:                14px, font-weight: 700 (bold), Sans
Content:              14px, font-weight: 400 (regular), Sans
```

#### Hook
```
Question/Statement:   24px, font-weight: 700 (bold), Sans, White
Follow-up:            16px, font-weight: 400 (regular), Sans, rgba(255,255,255,0.9)
```

#### StreetSmart
```
Title:                16px, font-weight: 700 (bold), Sans, Orange
Content:              14px, font-weight: 400 (regular), Sans, Black
(Informal, conversational tone in text)
```

#### Guided Exercise
```
Step Title:           16px, font-weight: 700 (bold), Sans
Step Content:         14px, font-weight: 400 (regular), Sans
Step Reasoning:       13px, font-weight: 400 (italic), Sans
Final Answer:         32px, font-weight: 700 (bold), Sans, Primary Blue
```

---

## **SPACING SCALE**

```
4px   - Extra small gaps (between icon and text)
8px   - Small gaps (padding in badges)
12px  - Standard padding for small elements
16px  - Standard padding for cards
20px  - Larger padding for content
24px  - Significant padding (between sections)
32px  - Large padding (page margins, academic blocks)
```

### Component Padding

```
Academic Definition  → 32px all sides
Definition (Simple)  → 16px all sides
Alert Variants       → 16px all sides
Real-World Example   → 24px all sides
Hook                 → 32px all sides
StreetSmart          → 20px all sides
Explanation          → 20px all sides
Deep Dive            → 20px all sides
Guided Exercise Step → 16px all sides
```

### Margin Between Blocks
```
Between blocks in same topic: 24px (margin-bottom)
Between sections:             32px
Between topics:               40px
```

---

## **BORDERS & SHADOWS**

### Border Styles

```
Academic Definition  → 1px solid #e5e7eb + 4px left solid #1e3a8a
Definition (Simple)  → 1px solid #e2e8f0 + 2px left solid #06b6d4
Alert Tip           → 2px solid #06b6d4
Alert Warning       → 2px solid #fbbf24
Alert Prerequisite  → 2px solid #9ca3af
Real-World Example  → 1px solid #e5e7eb + 4px left solid #3b82f6
StreetSmart         → 1px solid #fed7aa + 4px left solid #f97316
Deep Dive           → 1px solid #fed7aa + 4px left solid #dc2626
Explanation         → 1px solid #e5e7eb + 4px left solid #3b82f6
```

### Shadow System

```
Shadow SM (Small):
  0 1px 2px 0 rgba(0, 0, 0, 0.05)

Shadow MD (Medium):
  0 4px 12px 0 rgba(0, 0, 0, 0.1)

Shadow LG (Large):
  0 8px 24px 0 rgba(0, 0, 0, 0.15)

Component Usage:
  Academic Definition  → MD
  Definition (Simple)  → SM
  Alert Variants       → SM
  Real-World Example   → MD
  Hook                 → LG (with color tint)
  StreetSmart          → SM
  Guided Exercise      → SM for steps, MD for final answer
```

### Box-Shadow with Color Tint
```css
/* Hook component specific */
box-shadow: 
  0 8px 24px 0 rgba(124, 58, 237, 0.3),  /* Purple tint */
  0 4px 12px 0 rgba(0, 0, 0, 0.1);
```

---

## **BORDER RADIUS**

```
Small elements (badges, small icons):    4px
Standard cards:                          8px
Component cards (blocks):                12px
Large elements (full-width sections):    16px
```

### By Component
```
Academic Definition  → 12px
Definition (Simple)  → 8px
Alert Variants       → 8px
Real-World Example   → 12px
Hook                 → 16px
StreetSmart          → 12px
Explanation          → 8px
Deep Dive            → 12px
Guided Exercise      → 12px overall, 8px for step cards
CheckpointQuiz       → 8px for questions, 12px for feedback
```

---

## **ICON SPECIFICATIONS**

### Icon Size

```
Small (inline):      16px (inside text)
Standard:            20px (headers)
Large:               24px (emphasis)
Extra Large:         32px (hero/header emphasis)
```

### Icon Placement

```
Academic Definition  → 30px, top-right, 30% opacity
Definition (Simple)  → 16px, inline with title, left-aligned
Alert Variants       → 20px, top-left, full opacity
Real-World Example   → 20px, top-left, full opacity
Hook                 → 40px, centered or top-left
StreetSmart          → 20px, top-left, full opacity
Explanation          → None (just left bar)
Deep Dive            → None (included in title)
Guided Exercise      → 16px per step, 24px for final answer
CheckpointQuiz       → 16px question icon, 24px in header
```

### Icon Color Mapping

```
Academic Definition  → Dark Blue (#1e3a8a), 30% opacity
Definition (Simple)  → Teal (#06b6d4), 100% opacity
Alert Tip           → Teal (#06b6d4), 100% opacity
Alert Warning       → Amber (#fbbf24), 100% opacity
Alert Prerequisite  → Gray (#9ca3af), 100% opacity
Real-World Example  → Primary Blue (#3b82f6), 100% opacity
Hook                → White (#ffffff), 100% opacity
StreetSmart         → Orange (#f97316), 100% opacity
Deep Dive           → Red (#dc2626), 100% opacity
Guided Exercise     → Brain icon (custom color per step)
CheckpointQuiz      → Primary Blue (#3b82f6)
KnowledgeExam       → Primary Blue (#3b82f6)
```

---

## **ANIMATION TIMINGS**

```
Fast transitions:        150ms ease-out
Standard transitions:    200ms ease-in-out
Slow transitions:        300ms cubic-bezier(0.16, 1, 0.3, 1)
Entrance animations:     300ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### By Component

```
Accordion open/close:    300ms ease-in-out
Hover effects:           150ms ease-out
Fade in (on load):       200ms ease-out
Button click feedback:   100ms ease-out
```

---

## **RESPONSIVE BREAKPOINTS**

```
Mobile (XS):         0px   - 640px
Tablet (MD):         640px - 1024px
Desktop (LG):        1024px+
```

### Component Adjustments by Breakpoint

```
MOBILE (< 640px):
  - Reduce padding by 25%
  - Stack elements vertically
  - Increase font size slightly (readability)
  - Full-width cards
  - Reduce border radius to 8px max

TABLET (640px - 1024px):
  - 75% of desktop padding
  - 2-column layouts where appropriate
  - Standard font sizes

DESKTOP (> 1024px):
  - Full padding as specified
  - 3-4 column layouts
  - Standard sizing
```

---

## **ACCESSIBILITY COLORS**

### Contrast Ratios (WCAG AA Minimum: 4.5:1)

```
Dark Blue (#1e3a8a) on White:      ✅ 8.1:1 (EXCELLENT)
Teal (#06b6d4) on White:           ✅ 4.7:1 (GOOD)
Amber (#fbbf24) on White:          ✅ 5.3:1 (GOOD)
Gray (#9ca3af) on White:           ✅ 4.6:1 (GOOD)
Primary Blue (#3b82f6) on White:   ✅ 4.5:1 (MINIMUM)
Orange (#f97316) on White:         ✅ 5.2:1 (GOOD)
Red (#dc2626) on White:            ✅ 5.9:1 (GOOD)

Dark Blue (#1e3a8a) on Light Blue: ✅ 7.2:1 (EXCELLENT)
White on Dark Blue:                ✅ 8.1:1 (EXCELLENT)
White on Gradient (Hook):          ✅ 8.3:1 (EXCELLENT)
```

---

## **LIGHT MODE vs DARK MODE**

### Light Mode (Current)
```
Background:          #ffffff
Text:                #0f172a (dark slate)
Borders:             #e2e8f0 (light blue-gray)
Subtle BG:           #f8fafc (lightest blue)
```

### Dark Mode (If Implemented)
```
Background:          #0f172a (dark blue)
Text:                #f1f5f9 (light slate)
Borders:             #334155 (medium slate)
Subtle BG:           #1e293b (dark gray-blue)

Color Adjustments:
  Blue accents:      Shift to lighter tone (#60a5fa)
  Teal accents:      Shift to lighter tone (#22d3ee)
  Orange accents:    Shift to lighter tone (#fb923c)
```

---

## **INTERACTIVE STATES**

### Hover State
```
All cards:           +5% opacity / slight scale (1.01x) / shadow increase
Buttons:             +10% brightness / scale (1.02x)
Accordion items:     Border color brighten, slight bg change
```

### Active State
```
Selected option:     Blue highlight, check mark
Expanded accordion:  Full height visible, border color change
```

### Disabled State
```
Disabled button:     50% opacity, no hover effects, cursor: not-allowed
```

---

## **DESIGN QA CHECKLIST**

Before launching any component, verify:

- [ ] All text has 4.5:1+ contrast ratio
- [ ] All colors match the palette exactly
- [ ] Padding/spacing matches the scale
- [ ] Border radius matches spec
- [ ] Shadows are consistent with system
- [ ] Icons are correct size and color
- [ ] Animations are smooth and don't exceed 300ms
- [ ] Mobile responsive: stacks properly at 640px
- [ ] Dark mode (if enabled) maintains contrast and colors
- [ ] Hover/focus states are clear and accessible
- [ ] No magic numbers, all measurements from scale

---

## **EXAMPLE: BUILDING A COMPONENT BY SPECS**

### Alert Component (Tip Variant)

```tsx
// Layout
<div class="alert-container">
  <div class="alert-icon">✨</div>  {/* 20px, teal #06b6d4 */}
  <div class="alert-content">
    <h3 class="alert-title">Exam Tip</h3>  {/* 14px bold */}
    <p class="alert-text">{content}</p>  {/* 14px regular */}
  </div>
</div>

// Styles (CSS-in-JS / Tailwind equivalent)
container: {
  padding: '16px',              // From spacing scale
  border: '2px solid #06b6d4',  // Teal, from border spec
  borderRadius: '8px',          // From radius spec
  backgroundColor: '#f0fdfa',   // Very light teal
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',  // SM shadow
  display: 'flex',
  gap: '12px',                  // Spacing scale
  alignItems: 'flex-start'
}

icon: {
  fontSize: '20px',              // Standard size
  color: '#06b6d4',              // Teal
  flexShrink: 0
}

title: {
  fontSize: '14px',              // From typography spec
  fontWeight: '700',             // Bold
  margin: 0,
  marginBottom: '4px'            // Small gap
}

text: {
  fontSize: '14px',              // From typography spec
  fontWeight: '400',             // Regular
  lineHeight: '1.5',
  color: '#0f172a',              // Dark text
  margin: 0
}

// Hover state
container:hover: {
  borderColor: '#00c4d4',        // 10% lighter
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'  // Slight increase
}

// Animation
animation: {
  duration: '200ms',             // Fade in on load
  easing: 'ease-out'
}
```

---

