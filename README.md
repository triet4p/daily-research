# 🚀 Daily AI Research Intelligence Platform

> **Nền tảng theo dõi, nghiên cứu và phân tích trực quan các bước tiến Trí tuệ Nhân tạo**  
> Tự động triển khai trên Vercel: [`https://github.com/triet4p/daily-research`](https://github.com/triet4p/daily-research)

---

## 🌟 Tính Năng & Kiến Trúc Nổi Bật

1. **Phân cấp Tri thức 3 Tầng**:
   * **Báo cáo Toàn cảnh (Overviews - `/overview`)**: Bức tranh vĩ mô định kỳ (2 tháng, quý, năm) bao quát toàn bộ thị trường, hạ tầng và thể chế.
   * **Báo cáo Hàng tuần (Weekly - `/weekly`)**: Nhịp đập nhanh hàng tuần cập nhật sự kiện, benchmark và biến động mới nhất.
   * **Chuyên đề Sâu (Deep-Dives - `/deep-dives`)**: Các bài viết mổ xẻ trực giác, công thức toán học, thuật toán và sơ đồ kiến trúc cho các khái niệm phức tạp.
2. **Liên kết Hai chiều (Bi-directional Cross-Referencing)**:
   * **Mọi bài chi tiết (Deep-dive & Weekly)** đều có banner nổi bật (`ReferencedOverviewBanner`) hiển thị báo cáo toàn cảnh gốc kèm nút xem trực tiếp.
   * **Báo cáo Toàn cảnh (Overview)** hiển thị danh sách các bài phân tích sâu liên quan ngay đầu và cuối bài viết (`DeepDiveCrossLinks`).
3. **Session Continuity (Duy trì Trí nhớ Xuyên Session)**:
   * File `content/manifest.json` hoạt động như một hệ cơ sở dữ liệu phi tập trung (File-based DB).
   * Mọi session chat AI sau này chỉ cần đọc file này là nắm bắt được lịch sử nghiên cứu, các slug đã viết và cấu trúc liên kết.
4. **Trực quan hóa Cao cấp & Sẵn sàng Vercel**:
   * Xây dựng trên **Next.js 16 + Tailwind CSS v4 + TypeScript + Lucide Icons**.
   * Hỗ trợ định dạng bài viết chuẩn Typography cho bảng biểu, callout, công thức LaTeX và khối mã nguồn.

---

## 📁 Cấu Trúc Thư Mục Dữ Liệu

```
daily-research/
├── content/
│   ├── manifest.json            # ⭐️ FILE TRỌNG TÂM: Mục lục toàn hệ thống cho AI đọc
│   ├── INDEX.md                 # Master Index định dạng Markdown
│   ├── overviews/               # Thư mục chứa các báo cáo toàn cảnh
│   │   └── 2026-08-09-two-months.mdx
│   ├── weekly/                  # Thư mục chứa các báo cáo hàng tuần
│   │   └── 2026-w41.mdx
│   └── deep-dives/              # Thư mục chứa các bài phân tích sâu
│       ├── prefix-sliding-test-time-compute.mdx
│       ├── deepseek-v4-engram-memory.mdx
│       └── unitree-humanoid-ipo-and-superman.mdx
├── public/
│   └── images/                  # Thư mục lưu ảnh / infographic minh họa
└── src/                         # Mã nguồn giao diện Web (Next.js App Router)
    ├── app/                     # Routing (/overview, /weekly, /deep-dives)
    ├── components/              # UI components & Reference Banners
    └── lib/content.ts           # Trình nạp và phân giải liên kết 2 chiều
```

---

## 🔄 Hướng Dẫn Vận Hành Cho Các Session Tiếp Theo

### Khi bạn yêu cầu viết thêm một bài Deep-Dive mới:
1. AI đọc `content/manifest.json`.
2. Tạo file bài viết mới trong `content/deep-dives/<slug>.mdx` với frontmatter:
   ```yaml
   ---
   id: "<slug>"
   slug: "<slug>"
   title: "Tiêu đề bài viết"
   parent_overview_id: "overview-2026-08-09" # Bắt buộc để gắn liên kết ngược
   tags: ["Tag 1", "Tag 2"]
   summary: "Tóm tắt 2 câu..."
   ---
   ```
3. Cập nhật `content/manifest.json` thêm ID bài viết vào mảng `deep_dives` và `deep_dive_ids` của overview tương ứng.
4. Chạy `git add . && git commit -m "feat: add deep-dive <slug>" && git push origin main`.
5. Vercel tự động build và xuất bản bài mới trong 60 giây!

---

## 🚀 Triển Khai Lên Vercel (1-Click Deploy)

Dự án đã sẵn sàng 100% để deploy lên Vercel:
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com).
2. Chọn **"Add New..."** ➔ **"Project"**.
3. Import kho mã nguồn: **`triet4p/daily-research`**.
4. Framework Preset: **Next.js** (Tự động nhận diện).
5. Bấm **"Deploy"**.
