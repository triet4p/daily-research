import Link from "next/link";
import { Sun, Clock, ArrowRight, ArrowLeft, Layers, Calendar, Radio } from "lucide-react";
import { getAllDailyReports } from "@/lib/content";

export default function DailyListPage() {
  const dailyReports = getAllDailyReports();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Nhịp đập Hàng ngày</span>
      </div>

      <div className="border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>RADAR QUÉT ĐA KÊNH HÀNG NGÀY</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
          Daily Research Pulse
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Kênh theo dõi diện rộng hàng ngày: tổng hợp nhanh các đợt phát hành checkpoint trên Hugging Face, bài báo mới trên arXiv, biến động GitHub Trending, và các luồng tranh luận nóng nhất trên X (Twitter) từ cộng đồng kỹ sư.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {dailyReports.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition hover:border-[var(--accent-border)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent)]">
                  <Sun className="h-3.5 w-3.5" />
                  {d.day_of_week}, {d.date}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  (Tuần {d.week_number} • {d.year})
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {d.channels_monitored.slice(0, 3).map((ch) => (
                  <span
                    key={ch}
                    className="rounded bg-[var(--bg-surface-elevated)] px-2 py-0.5 text-[11px] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="mt-3.5 font-serif text-xl font-bold text-[var(--text-main)] sm:text-2xl leading-snug">
              <Link href={`/daily/${d.slug}`} className="hover:text-[var(--accent)] transition">
                {d.title}
              </Link>
            </h2>

            <p className="mt-1 text-sm text-[var(--accent)] font-medium">
              {d.subtitle}
            </p>

            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
              {d.summary}
            </p>

            {/* Parent references */}
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-[var(--bg-surface-elevated)] p-2.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]">
              {d.parentWeekly && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Thuộc chu kỳ:</span>
                  <Link
                    href={`/weekly/${d.parentWeekly.slug}`}
                    className="font-medium text-[var(--text-main)] hover:text-[var(--accent)] hover:underline"
                  >
                    Tuần {d.parentWeekly.week_number}
                  </Link>
                </div>
              )}
              {d.related_overview_id && (
                <div className="flex items-center gap-1 border-l border-[var(--border-subtle)] pl-3">
                  <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Quy chiếu toàn cảnh:</span>
                  <Link
                    href={`/overview/${d.related_overview_id.replace('overview-', '')}`}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    Bản 2 Tháng
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock className="h-3 w-3" />
                {d.reading_time}
              </span>

              <Link
                href={`/daily/${d.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)] sm:text-sm"
              >
                <span>Xem bản tin chi tiết trong ngày</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
