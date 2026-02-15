---
name: debugging
description: "Systematic protocol for investigating, fixing, and verifying bugs. Merges 'systematic-debugging' and 'debug.md'."
---

# Debugging Protocol

> **Core Principle**: Investigate first. Fix second. Verify always.
> **Mục tiêu**: Điều tra, Sửa lỗi và Kiểm thử trong một luồng thống nhất.

---

## 🕵️ Phase 1: Investigation (Sherlock Mode)

**"NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST"**

1.  **Read the Stack Trace**: Don't guess. Read the first line of the log. (Đừng đoán. Đọc log dòng đầu tiên.)
2.  **Reproduce**: Write a small script or test case to reproduce the error reliably. (Viết một script/test nhỏ để tái hiện lỗi.)
3.  **Isolate**: Disable surrounding modules to isolate the suspect area. (Tắt các module xung quanh để khoanh vùng nghi phạm.)
4.  **Trace Data Flow**:
    *   Where does the bad value originate?
    *   What called this with the bad value?
    *   Trace backward until you find the source.

---

## 🧪 Phase 2: Hypothesis & Testing Strategy (The Guard)

**Scientific Method:**
1.  **Form Single Hypothesis**: "I think X is the root cause because Y".
2.  **TDD Lite**: Write a failing test case (Red) BEFORE fixing the code. (Viết test case đỏ trước khi sửa code.)
3.  **Test Scope**:
    *   **Unit Test**: Test individual function logic. (Test logic hàm lẻ.)
    *   **Integration**: Test API -> DB flows. (Test luồng API -> DB.)

---

## 🛠️ Phase 3: Fixing Protocol (Surgeon Mode)

1.  **Fix Root Cause**: Fix the actual cause, not just the symptom. (Sửa nguyên nhân, không sửa triệu chứng.)
2.  **One Change at a Time**: don't bundle refactoring with bug fixes.
3.  **Regression Check**: Run the old test suite to ensure no regressions. (Chạy lại bộ test cũ để đảm bảo không phá hỏng cái khác.)
4.  **Cleanup**: Remove all debug logs after completion. (Xóa mọi log debug sau khi xong.)

---

## 📝 Phase 4: Reporting

Format your final report as:
`[Error] -> [Root Cause] -> [Solution] -> [Prevention]`
(`[Lỗi] -> [Nguyên nhân] -> [Giải pháp] -> [Phòng ngừa]`)

---

## 🛑 Red Flags - STOP AND RETHINK

If you find yourself doing any of these, **STOP**. Return to Phase 1.

*   "Quick fix for now, investigate later"
*   "Just try changing X and see if it works"
*   "One more fix attempt" (when already tried 2+)
*   **Assuming** without verifying ("Is that not happening?")

---

## Common Rationalizations

| Excuse | Reality |
| :--- | :--- |
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
