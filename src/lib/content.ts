import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import katex from "katex";

const contentDirectory = path.join(process.cwd(), "content");

export interface ManifestReport {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  published_at: string;
  reading_time: string;
  summary: string;
  tags: string[];
  deep_dive_ids?: string[];
}

export interface ManifestWeekly {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  week_number: number;
  year: number;
  period: string;
  published_at: string;
  reading_time: string;
  parent_overview_id: string;
  summary: string;
  tags: string[];
}

export interface ManifestDeepDive {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  published_at: string;
  reading_time: string;
  sector: string;
  tags: string[];
  parent_overview_id: string;
  overview_section_anchor?: string;
  summary: string;
}

export interface Manifest {
  system_info: {
    title: string;
    description: string;
    last_updated: string;
    version: string;
  };
  sectors: Array<{ id: string; name: string; badge_color: string }>;
  overviews: ManifestReport[];
  weekly_reports: ManifestWeekly[];
  deep_dives: ManifestDeepDive[];
}

export interface ArticleData {
  meta: Record<string, any>;
  content: string;
  htmlContent: string;
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

function renderLatex(text: string): string {
  // 1. Display Math: $$ ... $$
  let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return `\n\n<div class="math-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false, strict: "ignore" })}</div>\n\n`;
    } catch {
      return `$$${math}$$`;
    }
  });

  // 2. Protect currencies: $0.042, $0, $10, $5, $150.80, $0.00008, $0.0178, $0.0065
  res = res.replace(/\$(\d+(?:[.,]\d+)?)(?!\s*\\times|\s*\\pm|\s*\\ge|\s*\\le)/g, "&dollar;$1");

  // 3. Inline Math: $ ... $, excluding standard currencies and plain Vietnamese text
  res = res.replace(/(^|[^\w\$])\$([^\$\n]+?)\$(?!\w)/g, (match, prefix, math) => {
    const trimmed = math.trim();
    // If it contains Vietnamese accented letters, it's not a math formula
    if (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(trimmed)) {
      return match;
    }
    try {
      const rendered = katex.renderToString(trimmed, { displayMode: false, throwOnError: true, strict: "ignore" });
      return `${prefix}${rendered}`;
    } catch {
      return match;
    }
  });

  return res;
}

export function getManifest(): Manifest {
  const manifestPath = path.join(contentDirectory, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error("manifest.json not found in content directory");
  }
  const fileContent = fs.readFileSync(manifestPath, "utf-8");
  return JSON.parse(fileContent);
}

export function getOverviewBySlug(slug: string): (ArticleData & { manifestItem?: ManifestReport; relatedDeepDives: ManifestDeepDive[] }) | null {
  const manifest = getManifest();
  const manifestItem = manifest.overviews.find((o) => o.slug === slug);
  const filePath = path.join(contentDirectory, "overviews", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processedContent = renderLatex(content);
  const htmlContent = marked.parse(processedContent) as string;

  const deepDiveIds = manifestItem?.deep_dive_ids || (data.deep_dive_ids as string[]) || [];
  const relatedDeepDives = manifest.deep_dives.filter((d) => deepDiveIds.includes(d.id));

  return {
    meta: { ...manifestItem, ...data },
    content,
    htmlContent,
    manifestItem,
    relatedDeepDives,
  };
}

export function getAllOverviews(): ManifestReport[] {
  const manifest = getManifest();
  return manifest.overviews;
}

export function getDeepDiveBySlug(slug: string): (ArticleData & { manifestItem?: ManifestDeepDive; parentOverview?: ManifestReport }) | null {
  const manifest = getManifest();
  const manifestItem = manifest.deep_dives.find((d) => d.slug === slug);
  const filePath = path.join(contentDirectory, "deep-dives", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processedContent = renderLatex(content);
  const htmlContent = marked.parse(processedContent) as string;

  const parentId = manifestItem?.parent_overview_id || (data.parent_overview_id as string);
  const parentOverview = manifest.overviews.find((o) => o.id === parentId);

  return {
    meta: { ...manifestItem, ...data },
    content,
    htmlContent,
    manifestItem,
    parentOverview,
  };
}

export function getAllDeepDives(): (ManifestDeepDive & { parentOverview?: ManifestReport })[] {
  const manifest = getManifest();
  return manifest.deep_dives.map((dd) => ({
    ...dd,
    parentOverview: manifest.overviews.find((o) => o.id === dd.parent_overview_id),
  }));
}

export function getWeeklyBySlug(slug: string): (ArticleData & { manifestItem?: ManifestWeekly; parentOverview?: ManifestReport }) | null {
  const manifest = getManifest();
  const manifestItem = manifest.weekly_reports.find((w) => w.slug === slug);
  const filePath = path.join(contentDirectory, "weekly", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processedContent = renderLatex(content);
  const htmlContent = marked.parse(processedContent) as string;

  const parentId = manifestItem?.parent_overview_id || (data.parent_overview_id as string);
  const parentOverview = manifest.overviews.find((o) => o.id === parentId);

  return {
    meta: { ...manifestItem, ...data },
    content,
    htmlContent,
    manifestItem,
    parentOverview,
  };
}

export function getAllWeeklyReports(): (ManifestWeekly & { parentOverview?: ManifestReport })[] {
  const manifest = getManifest();
  return manifest.weekly_reports.map((w) => ({
    ...w,
    parentOverview: manifest.overviews.find((o) => o.id === w.parent_overview_id),
  }));
}
