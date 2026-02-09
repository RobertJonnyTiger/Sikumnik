# Stitch Design Integration Plan

## Screens to Download

### Core Pages
1. **Landing Page** (b05cf7fc856b4d788932d0c4ccaf3c39)
   - Title: "Sikumnik V2 Index Landing Page"
```markdown
   - Size: 1440x6240 (desktop)
```

2. **Course Overview** (7a9f4d12dd014f16a4aff885b3b25ccb)
   - Title: "Sikumnik Accounting Course Overview"
   - Size: 780x1768

```markdown
3. **Chapter View** (9225ee4852c843c09f8e1df7c396fa66)
   - **Migration Strategy:**
     - Map existing chapter content (text, media, and interactive elements) to the new design components via a structured content audit.
     - **Conflict Resolution:** Prioritize content integrity over design constraints. If legacy content does not fit the new layout, implement flexible "Legacy" containers or overflow sections to ensure zero data loss.
```
   - Title: "Sikumnik Inner Sanctum Chapter View"
   - Size: 780x3268

```markdown
### Interactive Tools
4. **T-Account** (82dba9cc73f54e66b18c9401ef047712)
   - Title: "Sikumnik T-Account Interactive"
   - Size: 780x1200
```
5. **Journal Entry** (77e874e4baab4959b82e45d22620b848)
6. **Debit/Credit** (f49146134fb8443fa42607f4ecf15262)

## Design Theme
- **Color Mode:** Dark
- **Primary Color:** #3713ec (purple)
- **Font:** Inter
- **Roundness:** 8px
```markdown
- **Device:** Desktop-first
```

## Integration Strategy
1. Download HTML files from Stitch
2. Extract CSS and component patterns
3. Create React components matching the design
4. Wire up with existing accounting data
5. Test navigation and functionality
