import { NextResponse } from "next/server";
import { getManifest } from "@/lib/content";

export async function GET() {
  const manifest = getManifest();
  const baseUrl = (process.env.SITE_URL || "https://daily-research-two.vercel.app").replace(/\/$/, "");

  const items: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
    guid: string;
  }> = [];

  // 1. Daily Reports
  for (const d of manifest.daily_reports || []) {
    items.push({
      title: `⚡ [DAILY PULSE] ${d.title}`,
      link: `${baseUrl}/daily/${d.slug}`,
      description: `${d.summary} — Kênh theo dõi: ${(d.channels_monitored || []).join(", ")}`,
      pubDate: d.slug.includes("test") ? new Date().toUTCString() : new Date(d.date).toUTCString(),
      guid: `daily-${d.slug}`,
    });
  }

  // 2. Weekly Reports
  for (const w of manifest.weekly_reports || []) {
    items.push({
      title: `📅 [WEEKLY BRIEFING] ${w.title}`,
      link: `${baseUrl}/weekly/${w.slug}`,
      description: w.summary,
      pubDate: new Date(w.published_at).toUTCString(),
      guid: `weekly-${w.slug}`,
    });
  }

  // 3. Deep-Dive Articles
  for (const dd of manifest.deep_dives || []) {
    items.push({
      title: `🔬 [DEEP DIVE] ${dd.title}`,
      link: `${baseUrl}/deep-dives/${dd.slug}`,
      description: dd.summary,
      pubDate: new Date(dd.published_at).toUTCString(),
      guid: `deepdive-${dd.slug}`,
    });
  }

  // 4. Overviews
  for (const o of manifest.overviews || []) {
    items.push({
      title: `🌐 [TOÀN CẢNH] ${o.title}`,
      link: `${baseUrl}/overview/${o.slug}`,
      description: o.summary,
      pubDate: new Date(o.published_at).toUTCString(),
      guid: `overview-${o.slug}`,
    });
  }

  // Sort newest first
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${manifest.system_info.title}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[${manifest.system_info.description}]]></description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (it) => `
    <item>
      <title><![CDATA[${it.title}]]></title>
      <link>${it.link}</link>
      <guid isPermaLink="false">${it.guid}</guid>
      <pubDate>${it.pubDate}</pubDate>
      <description><![CDATA[${it.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
