# Daily AI Research Intelligence — Master Index

> **Hệ thống theo dõi và nghiên cứu AI chu kỳ hàng tuần & định kỳ**.  
> Được đồng bộ tự động với `content/manifest.json` và giao diện Web trên Vercel.

---

## 📌 1. Các Bản Báo cáo Toàn cảnh (Overviews)
Báo cáo chu kỳ lớn (2 tháng, quý, năm) cung cấp góc nhìn vĩ mô và là điểm tựa cho các bài chuyên sâu.

* **[2026-08-09] Toàn cảnh AI Tháng 8 – Cuối tháng 9/2026** (`content/overviews/2026-08-09-two-months.mdx`)
  * *Khoảng thời gian*: 01/08/2026 – 30/09/2026
  * *Trọng tâm*: Khởi động thế hệ GPT-6 & Gemini 4 Argon (1M output token), làn sóng mã nguồn mở DeepSeek-V4 & Qwen 3.8, bước ngoặt CoRL 2026 phá vỡ Monolithic VLA, Decision Models (System 1) xóa bỏ JSON Streaming Tax, Unitree IPO bùng nổ, EU AI Act Điều 50 có hiệu lực.
  * *Các bài Deep-Dive liên kết*:
    1. `prefix-sliding-test-time-compute`
    2. `deepseek-v4-engram-memory`
    3. `unitree-humanoid-ipo-and-superman`
    4. `corl-2026-robot-learning-agentic-stack`
    5. `system-1-decision-models-jev-laya`


---

## ☀️ 2. Nhịp Đập Hàng Ngày (Daily Pulse)
Kênh radar diện rộng cập nhật đa kênh hàng ngày: Hugging Face Trending, ArXiv Daily Papers, GitHub Repos, và X (Twitter) Tech Buzz.

* **[14/10/2026] Gemini 4 Argon Lên Sóng Toàn Cầu, 'Robo Use' (32 Embodiments) & Flow Matching** (`content/daily/2026-10-14.mdx`)
  * *Kênh theo dõi*: Google DeepMind Official, X (Twitter) Buzz, ArXiv Daily Papers, GitHub Trending, BenchFlow Lab.
  * *Quy chiếu*: `weekly-2026-w41` | `overview-2026-08-09`.
  * *Nội dung*: Google DeepMind chính thức phát hành Gemini 4 Argon toàn cầu (1M output token, Vertex AI); Xiangyi Li (BenchFlow) công bố Robo Use với một API Python điều khiển 32 loại robot vật lý; Meta FAIR & ĐH Geneva giải mã hiện tượng Population Time Lag trong Flow Matching (arXiv:2610.10823).

* **[13/10/2026] RSI-Anything (Tự Cải Tiến Đa Miền), REA (100k Stars) & Meta Muse Wonder** (`content/daily/2026-10-13.mdx`)
  * *Kênh theo dõi*: X (Twitter) Buzz, GitHub Trending, ArXiv Daily, Meta Labs, Hugging Face Hub.
  * *Quy chiếu*: `weekly-2026-w41` | `overview-2026-08-09`.
  * *Nội dung*: Giải mã RSI-Anything & JEPA-Anything (PhAI / Shanghai AI Lab); Cơn sốt 100k stars của MCP server 'Reverse Engineer Anything' kết nối Ghidra/IDA; Meta ra mắt Muse Wonder (1M context) kèm tranh cãi giá API và khóa bản Full trong Muse Code.

* **[12/10/2026] Làn Sóng GEV/JEV Trên Hugging Face, Robot 'Reflex' & SoftwareGym** (`content/daily/2026-10-12.mdx`)
  * *Kênh theo dõi*: Hugging Face Hub, ArXiv, GitHub Trending, X/Twitter, Lab Releases.
  * *Quy chiếu*: `weekly-2026-w41` | `overview-2026-08-09`.
  * *Nội dung*: AutoTrust ra mắt series GEV/JEV-27B Decision Models; bài báo Reflex (UW) phản xạ xúc giác nhanh cho humanoid; SoftwareGym (SJTU) benchmark Computer-Use; tác giả ARTEX đóng repo vì cảnh báo an ninh mạng.
---

## ⚡ 2. Báo cáo Hàng tuần (Weekly Reports)
Theo dõi nhịp đập nhanh hàng tuần, phản ánh chuyển động của thị trường, mô hình mới và bài báo nóng.

* **[Tuần 41/2026] Dư Chấn Sau Làn Sóng Frontier, Mistral Large 4 Xuất Trận & Thử Lửa Thực Địa** (`content/weekly/2026-w41.mdx`)
  * *Khoảng thời gian*: 05/10/2026 – 11/10/2026
  * *Báo cáo gốc quy chiếu*: `overview-2026-08-09`
  * *Nội dung*: Mistral Large 4 "le Chonk" 1.05T MoE Sovereign AI, Claude Haiku 5.5 hoàn tất bộ ba, OpenAI Intelligent UI & hoãn GPT-6.1 Astra, kiểm thử thông lượng 1M token Gemini 4 Argon trong Fairwind, Figure 03 tại nhà máy BMW Spartanburg, 14 trát giải trình Điều 50 EU AI Act.

---

## 🔬 3. Chuyên đề Sâu (Deep-Dive Explanations)
Các bài viết mổ xẻ kiến trúc, giải thích trực quan, có liên kết 2 chiều (bi-directional link) với các báo cáo Overview tương ứng.

| ID Chủ đề | Tiêu đề Chuyên đề | Thuộc Báo cáo Gốc | Lĩnh vực |
| :--- | :--- | :--- | :--- |
| `corl-2026-robot-learning-agentic-stack` | **Toàn cảnh CoRL 2026: Phá Vỡ Monolithic VLA & Kiến Trúc Robot Đa Tầng** | `overview-2026-08-09` | Robotics |
| `system-1-decision-models-jev-laya` | **Kỷ Nguyên Decision Model (System 1): Trả Tự Do Khỏi 'JSON Streaming Tax'** | `overview-2026-08-09` | Systems / Agentic |
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
