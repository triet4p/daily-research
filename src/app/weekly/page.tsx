import Link from "next/link";
import { Calendar, Clock, ArrowRight, ArrowLeft, Layers } from "lucide-react";
import { getAllWeeklyReports } from "@/lib/content";

export default function WeeklyListPage() {
  const weeklyReports = getAllWeeklyReports();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Báo cáo Hàng tuần</span>
      </div>

      <div className="border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
          <Calendar className="h-3.5 w-3.5" />
          <span>BÁO CÁO NHỊP ĐẬP HÀNG TUẦN</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
          Theo Dõi Chuyển Động AI Từng Tuần
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Cập nhật định kỳ 7 ngày một lần về sự kiện ra mắt, benchmark mới, thử nghiệm thực tế và chính sách, kết nối trực tiếp với bản toàn cảnh vĩ mô.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {weeklyReports.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition hover:border-[var(--accent-border)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent)]">
                TUẦN {w.week_number} • NĂM {w.year}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">{w.period}</span>
            </div>

            <h2 className="mt-3 font-serif text-xl font-bold text-[var(--text-main)] sm:text-2xl leading-snug">
              <Link href={`/weekly/${w.slug}`} className="hover:text-[var(--accent)] transition">
                {w.title}
              </Link>
            </h2>

            <p className="mt-1 text-sm text-[var(--accent)] font-medium">
              {w.subtitle}
            </p>

            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
              {w.summary}
            </p>

            {/* Parent overview reference banner */}
            {w.parentOverview && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--bg-surface-elevated)] p-2.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]">
                <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Kế thừa từ Báo cáo Toàn cảnh:</span>
                <Link
                  href={`/overview/${w.parentOverview.slug}`}
                  className="font-medium text-[var(--text-main)] hover:text-[var(--accent)] hover:underline"
                >
                  {w.parentOverview.title} →
                </Link>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock className="h-3 w-3" />
                {w.reading_time}
              </span>

              <Link
                href={`/weekly/${w.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)] sm:text-sm"
              >
                <span>Đọc báo cáo tuần này</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
