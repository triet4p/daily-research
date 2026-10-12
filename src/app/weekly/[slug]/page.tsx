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
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-cyan-400">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <Link href="/weekly" className="transition hover:text-cyan-400">
          Báo cáo Hàng tuần
        </Link>
        {parentOverview && (
          <>
            <span>/</span>
            <Link
              href={`/overview/${parentOverview.slug}`}
              className="flex items-center gap-1 text-cyan-400/90 hover:underline line-clamp-1"
            >
              <Layers className="h-3 w-3" />
              <span>{parentOverview.title}</span>
            </Link>
          </>
        )}
      </div>

      {/* Header Info */}
      <header className="border-b border-gray-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400 border border-emerald-500/20">
            <Calendar className="h-3.5 w-3.5" />
            TUẦN {meta.week_number} • {meta.year}
          </span>
          <span className="text-gray-400 font-mono">{meta.period}</span>
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            {meta.reading_time}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
          {meta.title}
        </h1>

        {meta.subtitle && (
          <p className="mt-3 text-base font-medium text-emerald-300/90 sm:text-lg">
            {meta.subtitle}
          </p>
        )}

        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-gray-800/80 px-2 py-0.5 text-xs text-gray-300 border border-gray-700/60"
              >
                <Tag className="h-3 w-3 text-emerald-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* TOP PROMINENT REFER BANNER (User explicitly requested!) */}
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
        <div className="mt-14 border-t border-gray-800 pt-8">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
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
