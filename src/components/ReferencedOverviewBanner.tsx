import Link from "next/link";
import { Layers, ArrowRight, BookmarkCheck, Calendar } from "lucide-react";
import { ManifestReport } from "@/lib/content";

interface ReferencedOverviewBannerProps {
  overview?: ManifestReport;
  customAnchor?: string;
}

export default function ReferencedOverviewBanner({
  overview,
  customAnchor,
}: ReferencedOverviewBannerProps) {
  if (!overview) return null;

  const targetHref = customAnchor
    ? `/overview/${overview.slug}${customAnchor}`
    : `/overview/${overview.slug}`;

  return (
    <div className="my-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 shadow-sm transition-colors duration-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] border border-[var(--accent-border)]">
              <BookmarkCheck className="h-3 w-3" />
              Báo cáo Toàn cảnh Gốc
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
              <Calendar className="h-3 w-3" />
              {overview.period}
            </span>
          </div>

          <h4 className="font-serif text-base font-bold text-[var(--text-main)] sm:text-lg">
            {overview.title}
          </h4>

          <p className="text-xs text-[var(--text-muted)] sm:text-sm line-clamp-2">
            {overview.summary}
          </p>
        </div>

        <Link
          href={targetHref}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent-hover)] shadow-sm sm:text-sm"
        >
          <Layers className="h-4 w-4" />
          <span>Xem Toàn cảnh Báo cáo</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
