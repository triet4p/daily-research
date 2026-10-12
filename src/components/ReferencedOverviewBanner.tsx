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
    <div className="my-8 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-900/60 p-5 shadow-lg shadow-cyan-950/20 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-500/20">
              <BookmarkCheck className="h-3 w-3" />
              Báo cáo Toàn cảnh Gốc
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
              <Calendar className="h-3 w-3" />
              {overview.period}
            </span>
          </div>

          <h4 className="text-base font-bold text-white sm:text-lg">
            {overview.title}
          </h4>

          <p className="text-xs text-gray-300 sm:text-sm line-clamp-2">
            {overview.summary}
          </p>
        </div>

        <Link
          href={targetHref}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 hover:shadow-md hover:shadow-cyan-500/20 sm:text-sm"
        >
          <Layers className="h-4 w-4" />
          <span>Xem Toàn cảnh Báo cáo</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
