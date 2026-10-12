import { notFound } from "next/navigation";
import Link from "next/link";
import { getDailyBySlug, getAllDailyReports } from "@/lib/content";
import ReferencedOverviewBanner from "@/components/ReferencedOverviewBanner";
import { Clock, Tag, ArrowLeft, Sun, Calendar, Radio } from "lucide-react";

export async function generateStaticParams() {
  const dailyReports = getAllDailyReports();
  return dailyReports.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DailyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getDailyBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, htmlContent, parentWeekly, relatedOverview } = article;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <Link href="/daily" className="transition hover:text-[var(--accent)]">
          Nhịp đập Hàng ngày
        </Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium font-mono">{meta.date}</span>
      </div>

      {/* Header Info */}
      <header className="border-b border-[var(--border-subtle)] pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>DAILY PULSE</span>
          </span>
          <span className="flex items-center gap-1 text-[var(--text-main)] font-mono font-medium">
            <Sun className="h-3.5 w-3.5 text-[var(--accent)]" />
            {meta.day_of_week}, {meta.date}
          </span>
          <span className="text-[var(--text-muted)] font-mono">
            (Tuần {meta.week_number} • {meta.year})
          </span>
          <span className="flex items-center gap-1 text-[var(--text-muted)]">
            <Clock className="h-3.5 w-3.5" />
            {meta.reading_time}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-4xl lg:text-5xl leading-[1.2]">
          {meta.title}
        </h1>

        {meta.subtitle && (
          <p className="mt-3 text-base font-medium text-[var(--accent)] sm:text-lg">
            {meta.subtitle}
          </p>
        )}

        {/* Channels Monitored Pills */}
        {meta.channels_monitored && meta.channels_monitored.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[var(--text-muted)] font-medium mr-1">Kênh quét:</span>
            {meta.channels_monitored.map((ch: string) => (
              <span
                key={ch}
                className="rounded-md bg-[var(--bg-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]"
              >
                {ch}
              </span>
            ))}
          </div>
        )}

        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meta.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-[var(--bg-surface-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]"
              >
                <Tag className="h-3 w-3 text-[var(--accent)]" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* TOP PROMINENT REFER BANNER */}
      {relatedOverview && (
        <ReferencedOverviewBanner
          overview={relatedOverview}
        />
      )}

      {/* Parent Weekly Link Callout if available */}
      {parentWeekly && (
        <div className="my-6 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-4 text-xs">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Calendar className="h-4 w-4 text-[var(--accent)]" />
            <span>Nằm trong chuỗi tổng hợp của tuần:</span>
            <span className="font-semibold text-[var(--text-main)]">{parentWeekly.title}</span>
          </div>
          <Link
            href={`/weekly/${parentWeekly.slug}`}
            className="font-semibold text-[var(--accent)] hover:underline ml-2 shrink-0"
          >
            Xem báo cáo tuần →
          </Link>
        </div>
      )}

      {/* Main Prose Content */}
      <article
        className="article-prose mt-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* BOTTOM PROMINENT REFER BANNER */}
      {relatedOverview && (
        <div className="mt-14 border-t border-[var(--border-subtle)] pt-8">
          <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Liên kết Báo cáo Toàn cảnh Gốc
          </div>
          <ReferencedOverviewBanner
            overview={relatedOverview}
          />
        </div>
      )}
    </div>
  );
}
