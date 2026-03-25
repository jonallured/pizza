import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import * as path from "path";

export function formatSessionInfo(sessionFile: string, sessionName?: string): string {
  const filename = path.basename(sessionFile);

  // Extract timestamp and short ID from filename
  // Format: 2026-03-24T21-35-01-260Z_cba0e307-253b-4b3b-b8be-0cba249dc065.jsonl
  const parts = filename.replace(/\.jsonl$/, "").split("_");
  const timestamp = parts[0] || "";
  const uuid = parts.slice(1).join("_");
  const shortId = uuid.slice(0, 8);

  // Parse timestamp into a readable format
  let timeStr = timestamp;
  const timeMatch = timestamp.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})/,
  );
  if (timeMatch) {
    const [, year, month, day, hour, min] = timeMatch;
    const date = new Date(
      `${year}-${month}-${day}T${hour}:${min}:00Z`,
    );
    timeStr = "started " + date.toLocaleString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const label = sessionName ? `"${sessionName}"` : `anon (${shortId})`;
  return `\n📌 ${label} • ${timeStr} • resume: pi --session ${shortId}\n`;
}

export default function (pi: ExtensionAPI) {
  pi.on("session_shutdown", async (_event, ctx) => {
    const sessionFile = ctx.sessionManager.getSessionFile();
    if (sessionFile && ctx.hasUI) {
      const sessionName = pi.getSessionName();
      pi.sendMessage({
        customType: "session-info",
        content: formatSessionInfo(sessionFile, sessionName),
        display: true,
      });
    }
  });
}
