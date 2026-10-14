"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface CopySummaryButtonProps {
  title: string;
  summary: string;
  url?: string;
  date?: string;
}

export default function CopySummaryButton({
  title,
  summary,
  url,
  date,
}: CopySummaryButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const textToCopy = `⚡ *${title}* ${date ? `(${date})` : ""}\n\n📝 *Tóm tắt:* ${summary}\n\n👉 *Đọc chi tiết:* ${fullUrl}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
      title="Sao chép bản tóm tắt nhanh để gửi vào Microsoft Teams / chat"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-500">Đã sao chép cho Teams!</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Copy tóm tắt cho Teams</span>
        </>
      )}
    </button>
  );
}
