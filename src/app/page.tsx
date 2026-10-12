import Link from "next/link";
import { Sparkles, Layers, Calendar, BookOpen, ArrowRight, Clock, Tag, ExternalLink } from "lucide-react";
import { getManifest, getAllOverviews, getAllDeepDives, getAllWeeklyReports } from "@/lib/content";

export default function HomePage() {
  const manifest = getManifest();
  const overviews = getAllOverviews();
  const deepDives = getAllDeepDives();
  const weeklyReports = getAllWeeklyReports();

  const featuredOverview = overviews[0];
  const latestWeekly = weeklyReports[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0d131f] p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Research Intelligence Platform</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Theo dõi, Phân tích & Trực quan hóa <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Đột phá AI</span>
          </h1>

          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            Hệ thống báo cáo toàn cảnh định kỳ kết hợp chuyên đề phân tích sâu. Lưu trữ có cấu trúc trực tiếp trong Git, hỗ trợ AI đọc hiểu xuyên suốt mọi session và tự động deploy Vercel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/overview"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Layers className="h-4 w-4" />
              <span>Xem Toàn cảnh 2 Tháng (T8 - T9/2026)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/deep-dives"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/80 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gray-600 hover:bg-gray-800"
            >
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>Khám phá Chuyên đề Sâu</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 border-t border-gray-800/80 pt-6 sm:grid-cols-4">
          <div>
            <div className="text-2xl font-black text-cyan-400 sm:text-3xl">{overviews.length}</div>
            <div className="text-xs text-gray-400">Báo cáo Toàn cảnh</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400 sm:text-3xl">{deepDives.length}</div>
            <div className="text-xs text-gray-400">Chuyên đề Phân tích sâu</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400 sm:text-3xl">{weeklyReports.length}</div>
            <div className="text-xs text-gray-400">Báo cáo Hàng tuần</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400 sm:text-3xl">100%</div>
            <div className="text-xs text-gray-400">Lưu trữ Git & Vercel CI</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Featured Overview & Weekly */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Featured Overview Card (Spans 2 cols) */}
        {featuredOverview && (
          <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#131b2e] to-[#0f1626] p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                  <Layers className="h-3.5 w-3.5" />
                  BÁO CÁO TOÀN CẢNH MỚI NHẤT
                </span>
                <span className="text-xs text-gray-400 font-mono">{featuredOverview.period}</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {featuredOverview.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-cyan-400/90">
                {featuredOverview.subtitle}
              </p>

              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                {featuredOverview.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {featuredOverview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-800/80 px-2 py-0.5 text-xs text-gray-300 border border-gray-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-800/80 pt-4">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                Thời lượng đọc: {featuredOverview.reading_time}
              </span>

              <Link
                href={`/overview/${featuredOverview.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                <span>Đọc báo cáo chi tiết</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}

        {/* Latest Weekly Report Card */}
        {latestWeekly && (
          <div className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#111726] p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                  <Calendar className="h-3.5 w-3.5" />
                  BÁO CÁO HÀNG TUẦN
                </span>
                <span className="text-xs text-gray-400 font-mono">Tuần {latestWeekly.week_number}</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                {latestWeekly.title}
              </h3>

              <p className="mt-2 text-xs text-gray-400">
                {latestWeekly.subtitle}
              </p>

              <p className="mt-3 text-xs text-gray-300 line-clamp-3">
                {latestWeekly.summary}
              </p>

              {latestWeekly.parentOverview && (
                <div className="mt-4 rounded-lg bg-gray-900/90 p-2.5 text-xs text-gray-400 border border-gray-800">
                  <span className="text-gray-500">Quy chiếu:</span>{" "}
                  <Link
                    href={`/overview/${latestWeekly.parentOverview.slug}`}
                    className="text-cyan-400 hover:underline"
                  >
                    {latestWeekly.parentOverview.title}
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <Link
                href={`/weekly/${latestWeekly.slug}`}
                className="group flex items-center justify-between text-xs font-bold text-emerald-400 transition hover:text-emerald-300"
              >
                <span>Xem cập nhật tuần này</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Deep-Dives Showcase Section */}
      <div className="mt-16">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <BookOpen className="h-4 w-4" />
              <span>Chuyên Đề Giải Thích Trực Quan</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Học & Khám Phá Kiến Trúc Chuyên Sâu
            </h2>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Mỗi bài viết đều có liên kết ngược 2 chiều trực tiếp tới báo cáo toàn cảnh tương ứng.
            </p>
          </div>

          <Link
            href="/deep-dives"
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 sm:text-sm"
          >
            <span>Xem tất cả chuyên đề</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deepDives.map((dd) => (
            <div
              key={dd.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#111726] p-6 transition hover:border-cyan-500/40 hover:bg-[#141b2d] shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400">
                    #{dd.sector.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock className="h-3 w-3" />
                    {dd.reading_time}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-white line-clamp-2">
                  <Link href={`/deep-dives/${dd.slug}`} className="hover:text-cyan-400 transition">
                    {dd.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-gray-300 line-clamp-3">
                  {dd.summary}
                </p>

                {/* Prominent Reference link to Overview */}
                {dd.parentOverview && (
                  <div className="mt-4 rounded-lg bg-cyan-950/30 p-2 text-xs border border-cyan-800/30">
                    <span className="text-gray-400 font-medium">Báo cáo quy chiếu:</span>{" "}
                    <Link
                      href={`/overview/${dd.parentOverview.slug}`}
                      className="font-semibold text-cyan-300 hover:underline"
                    >
                      {dd.parentOverview.title} →
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-gray-800 pt-3">
                <Link
                  href={`/deep-dives/${dd.slug}`}
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  <span>Mở bài phân tích đầy đủ</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
