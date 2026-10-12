import Link from "next/link";
import { Sparkles, Layers, Calendar, BookOpen, ArrowRight, Clock } from "lucide-react";
import { getManifest, getAllOverviews, getAllDeepDives, getAllWeeklyReports } from "@/lib/content";

export default function HomePage() {
  const overviews = getAllOverviews();
  const deepDives = getAllDeepDives();
  const weeklyReports = getAllWeeklyReports();

  const featuredOverview = overviews[0];
  const latestWeekly = weeklyReports[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Hero Section */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 lg:p-12 shadow-[var(--card-shadow)] transition-colors duration-200">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Research Intelligence Platform</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-5xl lg:text-6xl leading-[1.15]">
            Theo dõi, Phân tích & Trực quan hóa <span className="text-[var(--accent)] italic">Đột phá AI</span>
          </h1>

          <p className="mt-4 text-base text-[var(--text-muted)] sm:text-lg leading-relaxed">
            Hệ thống báo cáo toàn cảnh định kỳ kết hợp chuyên đề phân tích sâu. Lưu trữ có cấu trúc trực tiếp trong Git, hỗ trợ AI đọc hiểu xuyên suốt mọi session và tự động deploy Vercel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/overview"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] shadow-sm"
            >
              <Layers className="h-4 w-4" />
              <span>Xem Toàn cảnh 2 Tháng (T8 - T9/2026)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/deep-dives"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--border-hover)]"
            >
              <BookOpen className="h-4 w-4 text-[var(--accent)]" />
              <span>Khám phá Chuyên đề Sâu</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-4">
          <div>
            <div className="font-serif text-2xl font-bold text-[var(--text-main)] sm:text-3xl">{overviews.length}</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Báo cáo Toàn cảnh</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[var(--accent)] sm:text-3xl">{deepDives.length}</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Chuyên đề Phân tích sâu</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[var(--text-main)] sm:text-3xl">{weeklyReports.length}</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Báo cáo Hàng tuần</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[var(--text-main)] sm:text-3xl">100%</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Lưu trữ Git & Vercel CI</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Featured Overview & Weekly */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Featured Overview Card (Spans 2 cols) */}
        {featuredOverview && (
          <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-colors duration-200">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
                  <Layers className="h-3.5 w-3.5" />
                  BÁO CÁO TOÀN CẢNH MỚI NHẤT
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">{featuredOverview.period}</span>
              </div>

              <h2 className="mt-4 font-serif text-2xl font-bold text-[var(--text-main)] sm:text-3xl leading-snug">
                {featuredOverview.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                {featuredOverview.subtitle}
              </p>

              <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
                {featuredOverview.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {featuredOverview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--bg-surface-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock className="h-3.5 w-3.5" />
                Thời lượng đọc: {featuredOverview.reading_time}
              </span>

              <Link
                href={`/overview/${featuredOverview.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
              >
                <span>Đọc báo cáo chi tiết</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}

        {/* Latest Weekly Report Card */}
        {latestWeekly && (
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-colors duration-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
                  <Calendar className="h-3.5 w-3.5" />
                  BÁO CÁO HÀNG TUẦN
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">Tuần {latestWeekly.week_number}</span>
              </div>

              <h3 className="mt-4 font-serif text-xl font-bold text-[var(--text-main)]">
                {latestWeekly.title}
              </h3>

              <p className="mt-2 text-xs text-[var(--text-muted)]">
                {latestWeekly.subtitle}
              </p>

              <p className="mt-3 text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                {latestWeekly.summary}
              </p>

              {latestWeekly.parentOverview && (
                <div className="mt-4 rounded-lg bg-[var(--bg-surface-elevated)] p-2.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] font-medium">Quy chiếu:</span>{" "}
                  <Link
                    href={`/overview/${latestWeekly.parentOverview.slug}`}
                    className="text-[var(--accent)] hover:underline font-medium"
                  >
                    {latestWeekly.parentOverview.title}
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
              <Link
                href={`/weekly/${latestWeekly.slug}`}
                className="group flex items-center justify-between text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
              >
                <span>Xem cập nhật tuần này</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Deep-Dives Showcase Section */}
      <div className="mt-16">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <BookOpen className="h-4 w-4" />
              <span>Chuyên Đề Giải Thích Trực Quan</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[var(--text-main)] sm:text-3xl">
              Học & Khám Phá Kiến Trúc Chuyên Sâu
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
              Mỗi bài viết đều có liên kết ngược 2 chiều trực tiếp tới báo cáo toàn cảnh tương ứng.
            </p>
          </div>

          <Link
            href="/deep-dives"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)] sm:text-sm"
          >
            <span>Xem tất cả chuyên đề</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deepDives.map((dd) => (
            <div
              key={dd.id}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition hover:border-[var(--accent-border)] hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--accent)] font-medium">
                    #{dd.sector.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Clock className="h-3 w-3" />
                    {dd.reading_time}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-[var(--text-main)] line-clamp-2">
                  <Link href={`/deep-dives/${dd.slug}`} className="hover:text-[var(--accent)] transition">
                    {dd.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                  {dd.summary}
                </p>

                {/* Reference link to Overview */}
                {dd.parentOverview && (
                  <div className="mt-4 rounded-lg bg-[var(--bg-surface-elevated)] p-2 text-xs border border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)] font-medium">Báo cáo quy chiếu:</span>{" "}
                    <Link
                      href={`/overview/${dd.parentOverview.slug}`}
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      {dd.parentOverview.title} →
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-[var(--border-subtle)] pt-3">
                <Link
                  href={`/deep-dives/${dd.slug}`}
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
                >
                  <span>Mở bài phân tích đầy đủ</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
