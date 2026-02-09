/**
 * STITCH DESIGN SYSTEM EXTRACTION
 * Based on "Sikumnik V2 Index Landing Page" project
 * 
 * Theme: Dark mode with purple (#3713ec) primary color
 * Font: Inter
 * Device: Mobile-first (780px base width)
 */

// Color Palette
const colors = {
    primary: '#3713ec',        // Purple (from Stitch)
    background: '#0a0914',     // Deep dark blue/black
    surface: '#1e1345',        // Temple purple
    accent: '#00f3ff',         // Neon cyan
    text: {
        primary: '#ffffff',
        secondary: '#a0a0b0',
    }
};

// Typography
const typography = {
    fontFamily: {
        primary: 'Inter, sans-serif',
        hebrew: 'Noto Sans Hebrew, Inter, sans-serif',
    },
    sizes: {
        hero: '3rem',      // 48px
        h1: '2rem',        // 32px
        h2: '1.5rem',      // 24px
        body: '1rem',      // 16px
        small: '0.875rem', // 14px
    }
};

// Spacing
const spacing = {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
};

// Border Radius
const borderRadius = {
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    full: '9999px',
};

// Glassmorphism Effects
const glass = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
};

// Neon Glow Effects
const neonGlow = {
    primary: '0 0 20px rgba(55, 19, 236, 0.4)',
    cyan: '0 0 15px rgba(0, 243, 255, 0.3)',
};

export const stitchDesignSystem = {
    colors,
    typography,
    spacing,
    borderRadius,
    glass,
    neonGlow,
};
