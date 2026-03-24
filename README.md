# 🍕 pizza

Personal [pi](https://pi.dev) configuration package — skills, extensions, prompts, and themes.

## Setup

```bash
./setup.sh
```

This installs `pizza` as a global pi package via local path. Pi will automatically discover everything in this repo on startup.

## Structure

```
extensions/   — TypeScript extensions (custom tools, commands, UI)
skills/       — On-demand skill packages (SKILL.md directories)
prompts/      — Reusable prompt templates (.md files)
themes/       — Custom themes (.json files)
```

## Usage

After setup, pi loads resources from this package automatically. Use `pi config` to enable/disable individual resources, or `pi list` to verify installation.

Add new resources by creating files in the appropriate directory — no reinstall needed since pi resolves the local path on each startup.
