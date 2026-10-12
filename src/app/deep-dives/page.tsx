import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Layers, ArrowLeft } from "lucide-react";
import { getAllDeepDives } from "@/lib/content";

export default function DeepDivesListPage() {
  const deepDives = getAllDeepDives();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--accent)]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Chuyên đề Sâu</span>
      </div>

      <div className="border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-[var(--accent)] border border-[var(--accent-border)]">
          <BookOpen className="h-3.5 w-3.5" />
          <span>KHO CHUYÊN ĐỀ NGHIÊN CỨU</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
          Giải Thích Trực Quan & Mổ Xẻ Kiến Trúc
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Các bài viết giải thích trực giác, mô hình hóa toán học và phân tích cơ chế nội tại. Mọi bài viết đều được gắn liên kết quy chiếu trực tiếp về Báo cáo Toàn cảnh gốc.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deepDives.map((dd) => (
          <div
            key={dd.id}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition hover:border-[var(--accent-border)] hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="font-mono text-[var(--accent)] uppercase font-medium">
                  #{dd.sector}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dd.reading_time}
                </span>
              </div>

              <h2 className="mt-3 font-serif text-lg font-bold text-[var(--text-main)] transition hover:text-[var(--accent)] leading-snug">
                <Link href={`/deep-dives/${dd.slug}`}>
                  {dd.title}
                </Link>
              </h2>

              <p className="mt-1.5 text-xs text-[var(--accent)] font-medium">
                {dd.subtitle}
              </p>

              <p className="mt-3 text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                {dd.summary}
              </p>

              {/* Parent Overview Reference */}
              {dd.parentOverview && (
                <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-2.5 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)] uppercase">
                    <Layers className="h-3 w-3" />
                    Báo cáo Quy chiếu
                  </div>
                  <Link
                    href={`/overview/${dd.parentOverview.slug}`}
                    className="mt-1 block font-medium text-[var(--text-main)] hover:underline line-clamp-1"
                  >
                    {dd.parentOverview.title} →
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-[var(--border-subtle)] pt-3">
              <Link
                href={`/deep-dives/${dd.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
              >
                <span>Xem bài giải thích</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
