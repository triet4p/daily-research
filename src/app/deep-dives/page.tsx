import Link from "next/link";
import { BookOpen, Clock, Tag, ArrowRight, Layers, ArrowLeft } from "lucide-react";
import { getAllDeepDives } from "@/lib/content";

export default function DeepDivesListPage() {
  const deepDives = getAllDeepDives();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-cyan-400">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-gray-300">Chuyên đề Sâu</span>
      </div>

      <div className="border-b border-gray-800 pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
          <BookOpen className="h-3.5 w-3.5" />
          <span>KHO CHUYÊN ĐỀ NGHIÊN CỨU</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Giải Thích Trực Quan & Mổ Xẻ Kiến Trúc
        </h1>
        <p className="mt-2 text-sm text-gray-400 max-w-2xl">
          Các bài viết giải thích trực giác, mô hình hóa toán học và phân tích cơ chế nội tại. Mọi bài viết đều được gắn liên kết quy chiếu trực tiếp về Báo cáo Toàn cảnh gốc.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deepDives.map((dd) => (
          <div
            key={dd.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#111726] p-6 transition hover:border-cyan-500/40 hover:bg-[#141b2d] shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-cyan-400 uppercase">
                  #{dd.sector}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dd.reading_time}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-white transition hover:text-cyan-300">
                <Link href={`/deep-dives/${dd.slug}`}>
                  {dd.title}
                </Link>
              </h2>

              <p className="mt-1 text-xs text-cyan-400/80 font-medium">
                {dd.subtitle}
              </p>

              <p className="mt-3 text-xs text-gray-300 line-clamp-3">
                {dd.summary}
              </p>

              {/* Prominent Parent Overview Reference */}
              {dd.parentOverview && (
                <div className="mt-4 rounded-xl border border-cyan-800/30 bg-cyan-950/20 p-2.5 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 uppercase">
                    <Layers className="h-3 w-3" />
                    Báo cáo Quy chiếu
                  </div>
                  <Link
                    href={`/overview/${dd.parentOverview.slug}`}
                    className="mt-1 block font-medium text-gray-200 hover:text-white hover:underline line-clamp-1"
                  >
                    {dd.parentOverview.title} →
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-gray-800/80 pt-3">
              <Link
                href={`/deep-dives/${dd.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition hover:text-cyan-300"
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
