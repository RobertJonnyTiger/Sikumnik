/**
 * Intelligently formats text for display.
 * 1. Inserts newlines after question marks.
 * 2. Inserts newlines before numbered/lettered lists (1., a), א., etc.).
 * 3. Preserves existing newlines.
 */
export const formatText = (text: string): string => {
    if (!text) return "";

    let formatted = text;

    // 1. Ensure breaks after question marks (if not already there)
    formatted = formatted.replace(/\? (?!\n)/g, '?\n');

    // 2. Add line breaks before numbered/lettered lists (e.g., "1.", "א.", "a)", "א)")
    // Look for a pattern that is NOT at the start of the string
    formatted = formatted.replace(/([^\n])\s+([א-ת\d]+[).])\s/g, '$1\n$2 ');

    // 3. Handle explicit newlines from JSON (e.g. "\\n" string literals) if they escaped
    formatted = formatted.replace(/\\n/g, '\n');

    return formatted;
};
