---
name: binks-worktree
description: Create and manage git worktrees for the Binks monorepo. Use when the user wants to work on a separate branch in parallel, create a worktree, list worktrees, switch to a worktree, or clean up old worktrees. Handles the mismatch between the git root and the working directory (areas/internal-services/binks/web).
---

# Binks Worktree Management

## Key Concept

The Binks repo has a **split between git root and working directory**:

- **Git root**: `/Users/jon/src/github.com/Shopify/binks`
- **Working directory**: `<git-root>/areas/internal-services/binks/web`

When creating worktrees, they must be created relative to the **git root**, but after creation you typically want to work from the `areas/internal-services/binks/web` subdirectory inside the new worktree.

Worktrees are created as **siblings** of the main repo, named `binks-<name>`:

```
/Users/jon/src/github.com/Shopify/
├── binks/                          ← main worktree (git root)
├── binks-my-feature/               ← additional worktree
└── binks-enrollment-due-diligence/ ← additional worktree
```

## Resolving Paths

Always derive paths dynamically from the current working directory. Don't hardcode paths.

```bash
# Get the git root from wherever we are
GIT_ROOT=$(git rev-parse --show-toplevel)

# Worktrees live as siblings of the git root
WORKTREE_PARENT=$(dirname "$GIT_ROOT")

# The repo basename (should be "binks")
REPO_NAME=$(basename "$GIT_ROOT")

# The working subdirectory relative to git root
WORK_SUBDIR="areas/internal-services/binks/web"
```

## Operations

### List Worktrees

```bash
git worktree list
```

### Create a Worktree

When the user asks to create a worktree for a branch or feature:

1. Derive a short name from the branch (e.g., `my-feature` from `my-feature-branch`)
2. Create the worktree as a sibling directory

```bash
GIT_ROOT=$(git rev-parse --show-toplevel)
WORKTREE_PARENT=$(dirname "$GIT_ROOT")
REPO_NAME=$(basename "$GIT_ROOT")
NAME="<short-name>"

# For a new branch:
git worktree add "${WORKTREE_PARENT}/${REPO_NAME}-${NAME}" -b "<branch-name>"

# For an existing branch:
git worktree add "${WORKTREE_PARENT}/${REPO_NAME}-${NAME}" "<branch-name>"
```

3. Create a tmux session for the new worktree, starting in the web working directory:

```bash
WORKTREE_WEB="${WORKTREE_PARENT}/${REPO_NAME}-${NAME}/${WORK_SUBDIR}"
SESSION_NAME="${REPO_NAME}-${NAME}"

tmux new-session -d -s "${SESSION_NAME}" -c "${WORKTREE_WEB}"
```

4. Tell the user the worktree and tmux session are ready, and how to switch:

```
tmux switch-client -t <session-name>
```

Or they can use `Ctrl-b s` to pick from the session list.

5. If `dev` setup is needed, mention they may want to run `dev up` once they switch to the session.

### Remove a Worktree

```bash
GIT_ROOT=$(git rev-parse --show-toplevel)
WORKTREE_PARENT=$(dirname "$GIT_ROOT")
REPO_NAME=$(basename "$GIT_ROOT")
NAME="<short-name>"
SESSION_NAME="${REPO_NAME}-${NAME}"

# Kill the tmux session if it exists
tmux kill-session -t "${SESSION_NAME}" 2>/dev/null

# Remove the worktree
git worktree remove "${WORKTREE_PARENT}/${REPO_NAME}-${NAME}"
```

If the worktree has uncommitted changes, warn the user and ask before using `--force`.

### Prune Stale Worktrees

```bash
git worktree prune
```

## Tips

- Always confirm the worktree name with the user before creating
- When listing, highlight which worktree the user is currently in
- After creating a worktree, remind the user that their `cd` target is the **web subdirectory**, not the worktree root
- If the user just says "make a worktree" without a branch name, ask what branch/feature name they want
- Always create a tmux session alongside the worktree so the user can jump straight in
- When removing a worktree, clean up its tmux session too
- The tmux session name matches the worktree directory name (e.g., `binks-my-feature`)
