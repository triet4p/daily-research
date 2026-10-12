import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800/80 bg-[#070a11] py-8 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-200">AI Research Intelligence Lab</span>
            <span className="text-xs text-gray-500 font-mono">| Auto-deployed on Vercel</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-white">Dashboard</Link>
            <Link href="/overview" className="transition hover:text-white">Báo cáo Toàn cảnh</Link>
            <Link href="/weekly" className="transition hover:text-white">Báo cáo Hàng tuần</Link>
            <Link href="/deep-dives" className="transition hover:text-white">Chuyên đề Sâu</Link>
            <a
              href="https://github.com/triet4p/daily-research"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800/60 pt-4 text-center text-xs text-gray-500">
          Dữ liệu nghiên cứu công nghệ được lưu trữ có cấu trúc trong Git (`content/manifest.json`), sẵn sàng kết nối xuyên suốt mọi session.
        </div>
      </div>
    </footer>
  );
}
