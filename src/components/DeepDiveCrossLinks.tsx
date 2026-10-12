import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";
import { ManifestDeepDive } from "@/lib/content";

interface DeepDiveCrossLinksProps {
  deepDives: ManifestDeepDive[];
}

export default function DeepDiveCrossLinks({ deepDives }: DeepDiveCrossLinksProps) {
  if (!deepDives || deepDives.length === 0) return null;

  return (
    <div className="my-10 rounded-2xl border border-gray-800 bg-[#0f1523] p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="h-5 w-5" />
            <h3 className="text-lg font-bold text-white">Chuyên Đề Giải Thích Chi Tiết Liên Quan</h3>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Các bài viết mổ xẻ trực quan, công thức toán và sơ đồ kiến trúc phát triển từ báo cáo này:
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deepDives.map((dd) => (
          <Link
            key={dd.id}
            href={`/deep-dives/${dd.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-gray-800/80 bg-[#141b2d] p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-[#182137] hover:shadow-lg hover:shadow-cyan-950/20"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1 font-mono text-cyan-400/90">
                  <Tag className="h-3 w-3" />
                  {dd.sector.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dd.reading_time}
                </span>
              </div>

              <h4 className="mt-2 text-sm font-bold text-white transition group-hover:text-cyan-300">
                {dd.title}
              </h4>

              <p className="mt-1.5 text-xs text-gray-300 line-clamp-2">
                {dd.summary}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>Đọc bài giải thích</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
