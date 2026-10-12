import Link from "next/link";
import { Calendar, Clock, ArrowRight, ArrowLeft, Layers } from "lucide-react";
import { getAllWeeklyReports } from "@/lib/content";

export default function WeeklyListPage() {
  const weeklyReports = getAllWeeklyReports();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-cyan-400">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-gray-300">Báo cáo Hàng tuần</span>
      </div>

      <div className="border-b border-gray-800 pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <Calendar className="h-3.5 w-3.5" />
          <span>BÁO CÁO NHỊP ĐẬP HÀNG TUẦN</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Theo Dõi Chuyển Động AI Từng Tuần
        </h1>
        <p className="mt-2 text-sm text-gray-400 max-w-2xl">
          Cập nhật định kỳ 7 ngày một lần về sự kiện ra mắt, benchmark mới, thử nghiệm thực tế và chính sách, kết nối trực tiếp với bản toàn cảnh vĩ mô.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {weeklyReports.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-gray-800 bg-[#111726] p-6 sm:p-8 transition hover:border-emerald-500/40 hover:bg-[#141b2d] shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-400">
                TUẦN {w.week_number} • NĂM {w.year}
              </span>
              <span className="text-xs text-gray-400 font-mono">{w.period}</span>
            </div>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              <Link href={`/weekly/${w.slug}`} className="hover:text-emerald-300 transition">
                {w.title}
              </Link>
            </h2>

            <p className="mt-1 text-sm text-gray-400 font-medium">
              {w.subtitle}
            </p>

            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {w.summary}
            </p>

            {/* Parent overview reference banner */}
            {w.parentOverview && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-900/80 p-2.5 text-xs text-gray-400 border border-gray-800">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>Kế thừa từ Báo cáo Toàn cảnh:</span>
                <Link
                  href={`/overview/${w.parentOverview.slug}`}
                  className="font-semibold text-cyan-300 hover:underline"
                >
                  {w.parentOverview.title} →
                </Link>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-gray-800/80 pt-4">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {w.reading_time}
              </span>

              <Link
                href={`/weekly/${w.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 transition hover:text-emerald-300 sm:text-sm"
              >
                <span>Đọc báo cáo tuần này</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
