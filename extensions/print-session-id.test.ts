import { describe, expect, it } from "vitest";
import { formatSessionInfo } from "./print-session-id.js";

const SESSION_FILENAME =
  "/tmp/sessions/2026-03-24T21-35-01-260Z_cba0e307-253b-4b3b-b8be-0cba249dc065.jsonl";

describe("formatSessionInfo", () => {
  it("shows quoted name for a named session", () => {
    const result = formatSessionInfo(SESSION_FILENAME, "my-project");
    expect(result).toContain('"my-project"');
    expect(result).not.toContain("anon");
  });

  it("shows anon with short ID for an unnamed session", () => {
    const result = formatSessionInfo(SESSION_FILENAME);
    expect(result).toContain("anon (cba0e307)");
  });

  it("extracts the first 8 chars of the UUID as the short ID", () => {
    const result = formatSessionInfo(SESSION_FILENAME);
    expect(result).toContain("cba0e307");
    expect(result).toContain("resume: pi --session cba0e307");
  });

  it("parses the timestamp into a human-readable format", () => {
    const result = formatSessionInfo(SESSION_FILENAME);
    expect(result).toMatch(/started \d{1,2}:\d{2}\s*(AM|PM|am|pm)?/);
  });

  it("handles a malformed filename missing the UUID", () => {
    const file = "/tmp/sessions/2026-03-24T21-35-01-260Z.jsonl";
    const result = formatSessionInfo(file);
    // No UUID means shortId is empty, should not crash
    expect(result).toContain("anon ()");
    expect(result).toContain("resume: pi --session ");
  });

  it("handles a malformed filename missing the timestamp", () => {
    const file = "/tmp/sessions/not-a-timestamp_cba0e307-253b-4b3b.jsonl";
    const result = formatSessionInfo(file);
    // Timestamp doesn't match the regex, falls back to raw string
    expect(result).toContain("not-a-timestamp");
    expect(result).not.toContain("started");
  });
});
