import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";
import { ManifestDeepDive } from "@/lib/content";

interface DeepDiveCrossLinksProps {
  deepDives: ManifestDeepDive[];
}

export default function DeepDiveCrossLinks({ deepDives }: DeepDiveCrossLinksProps) {
  if (!deepDives || deepDives.length === 0) return null;

  return (
    <div className="my-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm transition-colors duration-200">
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-serif text-lg font-bold text-[var(--text-main)]">
              Chuyên Đề Giải Thích Chi Tiết Liên Quan
            </h3>
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Các bài viết mổ xẻ trực quan, công thức toán và sơ đồ kiến trúc phát triển từ báo cáo này:
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deepDives.map((dd) => (
          <Link
            key={dd.id}
            href={`/deep-dives/${dd.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1 font-mono text-[var(--accent)]">
                  <Tag className="h-3 w-3" />
                  {dd.sector.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dd.reading_time}
                </span>
              </div>

              <h4 className="mt-2.5 font-serif text-sm font-bold text-[var(--text-main)] transition group-hover:text-[var(--accent)] leading-snug">
                {dd.title}
              </h4>

              <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2">
                {dd.summary}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)]">
              <span>Đọc bài giải thích</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
