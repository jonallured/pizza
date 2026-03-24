# Workflow

- Never commit directly to main
- Always create a feature branch for changes
- Push the branch and open a PR
- After a PR is merged, clean up locally:
  - Switch to main and pull
  - Delete the local feature branch
  - Prune stale remote tracking refs

# Commit Messages

Follow these rules when writing git commit messages:

- Subject line must be 50 characters or less (hard max)
- Capitalize the subject line (sentence case)
- No trailing period on the subject line
- Use imperative mood: "Fix bug" not "Fixed bug" or "Fixes bug"
- Do not use conventional commits (no `feat:`, `fix:`, `chore:`, etc.)
- Separate subject from body with a blank line (if a body is used)
- Wrap body text at 72 characters
- Use the body to explain what and why, not how
- Bullet points are fine in the body — use hyphens, with blank lines between
