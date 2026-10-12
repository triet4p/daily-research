# Daily AI Research Intelligence — Master Index

> **Hệ thống theo dõi và nghiên cứu AI chu kỳ hàng tuần & định kỳ**.  
> Được đồng bộ tự động với `content/manifest.json` và giao diện Web trên Vercel.

---

## 📌 1. Các Bản Báo cáo Toàn cảnh (Overviews)
Báo cáo chu kỳ lớn (2 tháng, quý, năm) cung cấp góc nhìn vĩ mô và là điểm tựa cho các bài chuyên sâu.

* **[2026-08-09] Toàn cảnh AI Tháng 8 – Cuối tháng 9/2026** (`content/overviews/2026-08-09-two-months.mdx`)
  * *Khoảng thời gian*: 01/08/2026 – 30/09/2026
  * *Trọng tâm*: Khởi động thế hệ GPT-6 & Gemini 4 Argon (1M output token), làn sóng mã nguồn mở DeepSeek-V4 & Qwen 3.8, Unitree IPO bùng nổ, EU AI Act Điều 50 có hiệu lực.
  * *Các bài Deep-Dive liên kết*:
    1. `prefix-sliding-test-time-compute`
    2. `deepseek-v4-engram-memory`
    3. `unitree-humanoid-ipo-and-superman`

---

## ⚡ 2. Báo cáo Hàng tuần (Weekly Reports)
Theo dõi nhịp đập nhanh hàng tuần, phản ánh chuyển động của thị trường, mô hình mới và bài báo nóng.

* **[Tuần 41/2026] Hậu làn sóng Frontier & Động thái đầu tháng 10** (`content/weekly/2026-w41.mdx`)
  * *Khoảng thời gian*: 05/10/2026 – 11/10/2026
  * *Báo cáo gốc quy chiếu*: `overview-2026-08-09`
  * *Nội dung*: Đánh giá ban đầu về Gemini 4 Argon trong production, triển khai thực địa Figure 03, sơ kết tuân thủ EU AI Act sau 2 tháng.

---

## 🔬 3. Chuyên đề Sâu (Deep-Dive Explanations)
Các bài viết mổ xẻ kiến trúc, giải thích trực quan, có liên kết 2 chiều (bi-directional link) với các báo cáo Overview tương ứng.

| ID Chủ đề | Tiêu đề Chuyên đề | Thuộc Báo cáo Gốc | Lĩnh vực |
| :--- | :--- | :--- | :--- |
| `prefix-sliding-test-time-compute` | **Giải mã 'Prefix Sliding': Bước nhảy $3\times$ Tốc độ Suy luận trong TTC** | `overview-2026-08-09` | ArXiv Research |
| `deepseek-v4-engram-memory` | **Bên trong DeepSeek-V4.1: Cơ chế Engram Memory & Nén KV-Cache** | `overview-2026-08-09` | Open Weights |
| `unitree-humanoid-ipo-and-superman` | **Cú bứt phá Unitree Robotics: Từ IPO STAR Market đến Robot 'Superman'** | `overview-2026-08-09` | Robotics |

---

## 🛠 Hướng dẫn cho AI Assistant ở các Session tiếp theo
1. **Khi người dùng yêu cầu báo cáo mới**: Đọc `content/manifest.json` để kiểm tra danh sách hiện tại.
2. **Khi viết bài mới**:
   - Bắt buộc khai báo trường `parent_overview_id` trong frontmatter để duy trì liên kết 2 chiều ngược về bản Overview.
   - Luôn kèm theo các ví dụ trực quan, sơ đồ (Mermaid / SVG / bảng biểu).
   - Thêm bản ghi mới vào `manifest.json`.
3. **Commit & Push**: `git add . && git commit -m "..." && git push origin main`.
