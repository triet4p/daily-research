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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Báo cáo Toàn cảnh</span>
      </div>

      {/* Header Info */}
      <header className="border-b border-[var(--border-subtle)] pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-light)] px-3 py-1 font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
            <Layers className="h-3.5 w-3.5" />
            BÁO CÁO TOÀN CẢNH ĐỊNH KỲ
          </span>
          <span className="flex items-center gap-1 text-[var(--text-muted)] font-mono">
            <Calendar className="h-3.5 w-3.5" />
            {meta.period}
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
          <p className="mt-3 text-lg font-medium text-[var(--accent)] sm:text-xl">
            {meta.subtitle}
          </p>
        )}

        {meta.summary && (
          <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-4 text-sm text-[var(--text-main)] leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-[var(--accent)] mb-1.5">
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
                className="inline-flex items-center gap-1 rounded-md bg-[var(--bg-surface-elevated)] px-2.5 py-1 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]"
              >
                <Tag className="h-3 w-3 text-[var(--accent)]" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cross-linking to Deep-Dives */}
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
        <div className="mt-16 border-t border-[var(--border-subtle)] pt-8">
          <DeepDiveCrossLinks deepDives={relatedDeepDives} />
        </div>
      )}
    </div>
  );
}
