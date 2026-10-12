import { notFound } from "next/navigation";
import Link from "next/link";
import { getWeeklyBySlug, getAllWeeklyReports } from "@/lib/content";
import ReferencedOverviewBanner from "@/components/ReferencedOverviewBanner";
import { Calendar, Clock, Tag, ArrowLeft, Layers } from "lucide-react";

export async function generateStaticParams() {
  const weeklyReports = getAllWeeklyReports();
  return weeklyReports.map((w) => ({
    slug: w.slug,
  }));
}

export default async function WeeklyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getWeeklyBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, htmlContent, parentOverview } = article;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <Link href="/weekly" className="transition hover:text-[var(--accent)]">
          Báo cáo Hàng tuần
        </Link>
        {parentOverview && (
          <>
            <span>/</span>
            <Link
              href={`/overview/${parentOverview.slug}`}
              className="flex items-center gap-1 text-[var(--accent)] hover:underline line-clamp-1 font-medium"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{parentOverview.title}</span>
            </Link>
          </>
        )}
      </div>

      {/* Header Info */}
      <header className="border-b border-[var(--border-subtle)] pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-light)] px-3 py-1 font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
            <Calendar className="h-3.5 w-3.5" />
            TUẦN {meta.week_number} • {meta.year}
          </span>
          <span className="text-[var(--text-muted)] font-mono">{meta.period}</span>
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

        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
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
      {parentOverview && (
        <ReferencedOverviewBanner
          overview={parentOverview}
        />
      )}

      {/* Main Prose Content */}
      <article
        className="article-prose mt-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* BOTTOM PROMINENT REFER BANNER */}
      {parentOverview && (
        <div className="mt-14 border-t border-[var(--border-subtle)] pt-8">
          <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Liên kết Báo cáo Gốc
          </div>
          <ReferencedOverviewBanner
            overview={parentOverview}
          />
        </div>
      )}
    </div>
  );
}
