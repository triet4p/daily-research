import Link from "next/link";
import { Sparkles, Layers, Calendar, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white sm:text-lg">AI Research Pulse</span>
            <span className="hidden text-xs text-cyan-400 sm:inline sm:ml-2 font-mono">v2026.Q3</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white sm:text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/overview"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-cyan-400 sm:text-sm"
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Toàn cảnh 2 Tháng</span>
            <span className="sm:hidden">Overview</span>
          </Link>
          <Link
            href="/weekly"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-cyan-400 sm:text-sm"
          >
            <Calendar className="h-4 w-4" />
            <span>Hàng tuần</span>
          </Link>
          <Link
            href="/deep-dives"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-cyan-400 sm:text-sm"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Chuyên đề Sâu</span>
            <span className="sm:hidden">Deep Dives</span>
          </Link>

          <a
            href="https://github.com/triet4p/daily-research"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition hover:border-gray-700 hover:text-white"
            title="GitHub Repository"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
