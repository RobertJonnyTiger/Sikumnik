---
trigger: on_demand
---

# VERIFICATION-BEFORE-COMPLETION.MD - Pre-Flight Check

> **Mục tiêu**: Ngăn chặn việc bàn giao code lỗi hoặc không đạt chuẩn thẩm mỹ.

---

## 🚀 1. TRƯỚC KHI HOÀN THÀNH (Before Completion)

Mọi Task liên quan đến UI/UX hoặc Master Page PHẢI được kiểm tra qua `quality-checklist.md`.

### Quy trình:
1.  **Chạy Verify**: Sử dụng skill `verification-before-completion`.
2.  **Rà soát Audit**: Đối chiếu với `rules/quality-checklist.md`.
3.  **Build Check**: `npm run build` PHẢI thành công 100%.

---

## 🚫 2. TIÊU CHUẨN DỪNG (Stop Standards)

KHÔNG được phép hoàn thành task nếu:
- Còn lỗi Hydration (màu đỏ trong console).
- Font chữ không đồng bộ (Varela/Noto thay vì Assistant/Mono).
- Layout mobile bị vỡ.

---

*Lưu ý: Chất lượng là kỷ luật, không phải lựa chọn.*
