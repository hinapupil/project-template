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

Choose the appropriate guide:
- TypeScript/Node.js → [add-typescript.md](add-typescript.md)
- Python → [add-python.md](add-python.md)
- Go → [add-go.md](add-go.md)

## Adding infrastructure

- AWS with Terraform → [add-terraform-aws.md](add-terraform-aws.md)

## After setup

Run `just eject` to remove this docs/ directory. The justfile, lefthook.yml, and
other config files will remain with the language-specific recipes already added.

## Design decisions

Why these tools were chosen (so you can make informed decisions when extending):

- **Devbox over raw Nix**: Same reproducibility, but team members don't need to learn Nix syntax. `devbox add <pkg>` is intuitive.
- **Just over Make/Taskfile**: Command runner, not a build system. No tab-sensitivity issues. Cross-platform. Simple syntax.
- **Lefthook over Husky/pre-commit**: Single Go binary, no language runtime dependency. Parallel execution. `{staged_files}` variable replaces lint-staged.
- **AGENTS.md over tool-specific configs**: Vendor-neutral standard supported by 30+ AI coding tools. CLAUDE.md symlink for Claude Code compatibility.
- **gitleaks over TruffleHog**: Simpler setup, runs fast on staged files, good default rules.
