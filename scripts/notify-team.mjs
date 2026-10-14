#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
// Auto-load .env.local if present
const envLocalPath = path.join(rootDir, ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length > 0 && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
}

// Configuration
const SITE_URL = process.env.SITE_URL || process.env.VERCEL_PROJECT_URL || "https://daily-research-two.vercel.app";
const manifestPath = path.join(rootDir, "content", "manifest.json");

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    channel: "all",
    type: "latest", // 'daily', 'weekly', 'deep-dive', 'latest'
    slug: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") options.dryRun = true;
    else if (args[i] === "--channel" && args[i + 1]) options.channel = args[++i];
    else if (args[i] === "--type" && args[i + 1]) options.type = args[++i];
    else if (args[i] === "--slug" && args[i + 1]) options.slug = args[++i];
  }
  return options;
}

function getLatestItem(manifest, type, slug) {
  if (slug) {
    const daily = manifest.daily_reports?.find(d => d.slug === slug);
    if (daily) return { item: daily, type: "daily" };
    const weekly = manifest.weekly_reports?.find(w => w.slug === slug);
    if (weekly) return { item: weekly, type: "weekly" };
    const dd = manifest.deep_dives?.find(d => d.slug === slug);
    if (dd) return { item: dd, type: "deep-dive" };
    const overview = manifest.overviews?.find(o => o.slug === slug);
    if (overview) return { item: overview, type: "overview" };
  }
  if (type === "weekly") return { item: manifest.weekly_reports?.[0], type: "weekly" };
  if (type === "deep-dive") return { item: manifest.deep_dives?.[0], type: "deep-dive" };
  if (type === "overview") return { item: manifest.overviews?.[0], type: "overview" };
  
  // Default: check latest daily report first, then weekly
  if (manifest.daily_reports && manifest.daily_reports.length > 0) {
    return { item: manifest.daily_reports[0], type: "daily" };
  }
  if (manifest.weekly_reports && manifest.weekly_reports.length > 0) {
    return { item: manifest.weekly_reports[0], type: "weekly" };
  }
  return { item: manifest.overviews?.[0], type: "overview" };
}

function formatNotification(payload) {
  const { item, type } = payload;
  const baseUrl = SITE_URL.replace(/\/$/, "");
  let link = `${baseUrl}`;
  let titlePrefix = "⚡ [DAILY RESEARCH]";

  if (type === "daily") {
    link = `${baseUrl}/daily/${item.slug}`;
    titlePrefix = `⚡ [DAILY PULSE • ${item.date}]`;
  } else if (type === "weekly") {
    link = `${baseUrl}/weekly/${item.slug}`;
    titlePrefix = `📅 [WEEKLY BRIEFING • Tuần ${item.week_number}]`;
  } else if (type === "deep-dive") {
    link = `${baseUrl}/deep-dives/${item.slug}`;
    titlePrefix = `🔬 [CHUYÊN ĐỀ SÂU • ${item.sector?.toUpperCase() || "TECH"}]`;
  } else if (type === "overview") {
    link = `${baseUrl}/overview/${item.slug}`;
    titlePrefix = `🌐 [BÁO CÁO TOÀN CẢNH]`;
  }

  // Plain text / Markdown format
  const lines = [
    `${titlePrefix} *${item.title}*`,
    ``,
    `📝 *Tóm tắt:* ${item.summary}`,
  ];

  if (item.channels_monitored && item.channels_monitored.length > 0) {
    lines.push(`📡 *Kênh quét:* ${item.channels_monitored.join(" • ")}`);
  }

  if (item.tags && item.tags.length > 0) {
    lines.push(`🏷 *Tags:* ${item.tags.map(t => `#${t.replace(/\s+/g, "_")}`).join(" ")}`);
  }

  lines.push(``);
  lines.push(`👉 *Đọc bài đầy đủ:* ${link}`);

  const text = lines.join("\n");

  return {
    title: item.title,
    summary: item.summary,
    url: link,
    text,
    rawItem: item,
    type,
  };
}

async function sendTeams(message, payload) {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true, reason: "Missing TEAMS_WEBHOOK_URL" };

  const { item, type } = payload;
  const facts = [];
  if (item.date) facts.push({ title: "Ngày", value: `${item.date} (${item.day_of_week || ""})` });
  if (item.reading_time) facts.push({ title: "Thời lượng", value: item.reading_time });
  if (item.channels_monitored && item.channels_monitored.length > 0) {
    facts.push({ title: "Kênh quét", value: item.channels_monitored.join(", ") });
  }

  // Microsoft Teams Adaptive Card format (Works directly with MS Teams Workflows / Power Automate)
  const adaptiveCard = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.4",
          body: [
            {
              type: "TextBlock",
              text: type === "daily" ? "⚡ AI DAILY RESEARCH PULSE" : "📅 AI RESEARCH INTELLIGENCE",
              weight: "Bolder",
              color: "Accent",
              size: "Small"
            },
            {
              type: "TextBlock",
              text: item.title,
              weight: "Bolder",
              size: "Medium",
              wrap: true
            },
            {
              type: "TextBlock",
              text: item.summary,
              wrap: true,
              spacing: "Medium"
            },
            ...(facts.length > 0 ? [{ type: "FactSet", facts }] : [])
          ],
          actions: [
            {
              type: "Action.OpenUrl",
              title: "Xem Bản Tin Chi Tiết Trên Web →",
              url: message.url
            }
          ]
        }
      }
    ]
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adaptiveCard),
  });

  return { ok: response.ok, status: response.status };
}

async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true, reason: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" };

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message.text,
      parse_mode: "Markdown",
      disable_web_page_preview: false,
    }),
  });

  return await response.json();
}

async function sendSlack(message) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true, reason: "Missing SLACK_WEBHOOK_URL" };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: message.text,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message.text,
          },
        },
      ],
    }),
  });

  return { ok: response.ok, status: response.status };
}

async function sendDiscord(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true, reason: "Missing DISCORD_WEBHOOK_URL" };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: message.text,
    }),
  });

  return { ok: response.ok, status: response.status };
}

async function main() {
  const options = parseArgs();

  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Manifest not found at ${manifestPath}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const payload = getLatestItem(manifest, options.type, options.slug);

  if (!payload.item) {
    console.error("❌ No report found to notify.");
    process.exit(1);
  }

  const message = formatNotification(payload);

  console.log("\n=======================================================");
  console.log("📢 PREPARED TEAM NOTIFICATION PAYLOAD:");
  console.log("=======================================================\n");
  console.log(message.text);
  console.log("\n=======================================================");

  if (options.dryRun) {
    console.log("ℹ️  [DRY RUN] No messages sent to webhooks.");
    return;
  }

  console.log("\n🚀 Dispatching to configured team channels...");
  const results = {};

  if (options.channel === "all" || options.channel === "teams") {
    results.teams = await sendTeams(message, payload);
    console.log("  • Microsoft Teams:", results.teams.skipped ? `⏭️ Skipped (${results.teams.reason})` : "✅ Sent");
  }

  if (options.channel === "all" || options.channel === "telegram") {
    results.telegram = await sendTelegram(message);
    console.log("  • Telegram:", results.telegram.skipped ? `⏭️ Skipped (${results.telegram.reason})` : "✅ Sent");
  }

  if (options.channel === "all" || options.channel === "slack") {
    results.slack = await sendSlack(message);
    console.log("  • Slack:", results.slack.skipped ? `⏭️ Skipped (${results.slack.reason})` : "✅ Sent");
  }

  if (options.channel === "all" || options.channel === "discord") {
    results.discord = await sendDiscord(message);
    console.log("  • Discord:", results.discord.skipped ? `⏭️ Skipped (${results.discord.reason})` : "✅ Sent");
  }

  console.log("\n✨ Workflow execution complete.\n");
}

main().catch(err => {
  console.error("❌ Error running notification workflow:", err);
  process.exit(1);
});
