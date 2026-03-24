import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_shutdown", async (_event, ctx) => {
    const sessionFile = ctx.sessionManager.getSessionFile();
    if (sessionFile && ctx.hasUI) {
      pi.sendMessage({
        customType: "session-info",
        content: `\n🔖 Session: ${sessionFile}\n   Resume with: pi --session ${sessionFile}\n`,
        display: true,
      });
    }
  });
}
