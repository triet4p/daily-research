import { notFound } from "next/navigation";
import Link from "next/link";
import { getOverviewBySlug, getAllOverviews } from "@/lib/content";
import DeepDiveCrossLinks from "@/components/DeepDiveCrossLinks";
import { Calendar, Clock, Tag, ArrowLeft, Layers, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const overviews = getAllOverviews();
  return overviews.map((o) => ({
    slug: o.slug,
  }));
}

export default async function OverviewArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getOverviewBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, htmlContent, relatedDeepDives } = article;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
        <Link
          href="/"
          className="inline-flex items-center gap-1 transition hover:text-cyan-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-gray-300">Báo cáo Toàn cảnh</span>
      </div>

      {/* Header Info */}
      <header className="border-b border-gray-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-400 border border-cyan-500/20">
            <Layers className="h-3.5 w-3.5" />
            BÁO CÁO TOÀN CẢNH ĐỊNH KỲ
          </span>
          <span className="flex items-center gap-1 text-gray-400 font-mono">
            <Calendar className="h-3.5 w-3.5" />
            {meta.period}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            {meta.reading_time}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
          {meta.title}
        </h1>

        {meta.subtitle && (
          <p className="mt-3 text-lg font-medium text-cyan-300/90 sm:text-xl">
            {meta.subtitle}
          </p>
        )}

        {meta.summary && (
          <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-sm text-gray-200">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Tóm tắt Trọng tâm (Executive Summary)</span>
            </div>
            {meta.summary}
          </div>
        )}

        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {meta.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-gray-800/80 px-2.5 py-1 text-xs text-gray-300 border border-gray-700/60"
              >
                <Tag className="h-3 w-3 text-cyan-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cross-linking to Deep-Dives right near the top for quick jumping */}
      {relatedDeepDives.length > 0 && (
        <DeepDiveCrossLinks deepDives={relatedDeepDives} />
      )}

      {/* Main Prose Content */}
      <article
        className="article-prose mt-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Bottom Cross-linking reminder */}
      {relatedDeepDives.length > 0 && (
        <div className="mt-16 border-t border-gray-800 pt-8">
          <DeepDiveCrossLinks deepDives={relatedDeepDives} />
        </div>
      )}
    </div>
  );
}
