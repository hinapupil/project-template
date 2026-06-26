# Project Setup Guide

This document is for AI coding agents (Claude Code, Codex, etc.) to read and execute.
After setup is complete, run `just eject` to remove this docs/ directory.

## What this template provides

- **Reproducible environment**: Devbox (Nix-backed) + direnv for automatic activation
- **Task runner**: Just (`justfile`) for common commands
- **Security gate**: Lefthook + gitleaks for pre-commit secret detection
- **AI agent config**: AGENTS.md as the source of truth (CLAUDE.md is a symlink)
- **Infrastructure**: `/infra` directory for Terraform

## Initial setup steps

1. Ensure Devbox is installed: `curl -fsSL https://get.jetify.com/devbox | bash`
2. Run `direnv allow` to activate the environment
3. Run `just setup` to install git hooks

## Adding a language

This template does not ship static language guides. Use the Deep Research workflow
to find current best practices:

```bash
# In Claude Code
/add-language typescript — CLI tool with heavy testing
```

Or run the workflow directly:

```
Workflow({ name: "research-stack", args: "typescript — CLI tool" })
```

See [research-language.md](research-language.md) for details.

## Adding infrastructure

Use the same research approach for infrastructure setup:

```
Workflow({ name: "research-stack", args: "terraform aws — VPC, ECS, RDS for web app" })
```

## After setup

Run `just eject` to remove this docs/ directory. The justfile, lefthook.yml, and
other config files will remain with the language-specific recipes already added.

## Design decisions (as of 2026)

Why these tools were chosen. Run `/add-language` or the research-stack workflow
to get up-to-date recommendations — these choices may be superseded.

- **Devbox over raw Nix**: Same reproducibility, but team members don't need to learn Nix syntax. `devbox add <pkg>` is intuitive.
- **Just over Make/Taskfile**: Command runner, not a build system. No tab-sensitivity issues. Cross-platform. Simple syntax.
- **Lefthook over Husky/pre-commit**: Single Go binary, no language runtime dependency. Parallel execution. `{staged_files}` variable replaces lint-staged.
- **AGENTS.md over tool-specific configs**: Vendor-neutral standard supported by 30+ AI coding tools. CLAUDE.md symlink for Claude Code compatibility.
- **gitleaks over TruffleHog**: Simpler setup, runs fast on staged files, good default rules.
