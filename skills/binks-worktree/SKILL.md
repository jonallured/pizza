---
name: binks-worktree
description: Create and manage git worktrees for Binks in World. Use when the user wants to work on a separate branch in parallel, create a worktree, list worktrees, switch to a worktree, or clean up old worktrees.
---

# Binks Worktree Management

Binks lives in World at `//areas/internal-services/binks/web`. World has its own worktree tooling (`dev tree`) that handles sparse checkout, the expected directory layout, and integration with other World tooling.

**Always use `dev tree` — never raw `git worktree` commands.** World worktrees live at `~/world/trees/<name>/src`, not as siblings of the git root.

## Operations

### List Worktrees

```bash
dev tree list
```

The current worktree is marked with `*`.

### Create a Worktree

```bash
# Create a worktree with a new branch
dev tree add <worktree-name> -b <branch-name>

# Create and immediately switch into it
dev tree add <worktree-name> -b <branch-name> --switch
```

The worktree will be at `~/world/trees/<worktree-name>/src`.

After creation, create a tmux session pointed at the Binks web directory:

```bash
tmux new-session -d -s "binks-<worktree-name>" -c "$HOME/world/trees/<worktree-name>/src/areas/internal-services/binks/web"
```

Tell the user:

- Switch with: `tmux switch-client -t binks-<worktree-name>` (or `Ctrl-b s` to pick)
- They'll likely need to run `dev up` in the new worktree before working

### Switch to a Worktree

```bash
dev tree switch <worktree-name>
```

Pass `-` to jump back to the previous worktree (like `cd -`).

### Show Worktree Info

```bash
dev tree show <worktree-name>
# or for current worktree:
dev tree show .
```

### Remove a Worktree

```bash
# Kill the tmux session if one exists
tmux kill-session -t "binks-<worktree-name>" 2>/dev/null

# Remove the worktree
dev tree remove <worktree-name>

# Force remove if dirty
dev tree remove <worktree-name> --force
```

If the worktree has uncommitted changes, warn the user and ask before using `--force`.

Bulk cleanup options:

```bash
# Remove worktrees whose PRs have been merged
dev tree remove --merged

# Remove worktrees whose PRs have been closed (unmerged)
dev tree remove --closed
```

## Naming

Use short, descriptive worktree names. The branch can differ from the worktree name via `-b`:

```bash
dev tree add ruby4 -b ruby4-upgrade
```

## Error Handling

If any command fails, **stop immediately** and show the user the error. Do not attempt to recover or retry.

## Tips

- Always confirm the worktree name with the user before creating
- After creating, remind the user to run `dev up` in the new worktree
- When removing, clean up the tmux session too
- `dev tree remove --merged` is handy for periodic cleanup
