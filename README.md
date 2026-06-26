# project-template

Language-agnostic project scaffold with reproducible dev environment and AI coding agent support.

## What's included

- **[Devbox](https://www.jetify.com/devbox)** — reproducible dev environment (Nix-backed, no Nix knowledge required)
- **[Just](https://github.com/casey/just)** — command runner (`just dev`, `just lint`, `just test`)
- **[Lefthook](https://github.com/evilmartians/lefthook)** + **[gitleaks](https://github.com/gitleaks/gitleaks)** — pre-commit secret detection
- **[AGENTS.md](https://agents.md)** — AI coding agent configuration (Claude Code, Codex, Cursor, etc.)
- **Nix flake** — alternative to Devbox for users who prefer raw Nix

## Quick start

### Using Nix flake template

```bash
nix flake init -t github:hinapupil/project-template
direnv allow
```

### Manual

```bash
# Install Devbox (installs Nix automatically if needed)
curl -fsSL https://get.jetify.com/devbox | bash

# Clone and enter
git clone https://github.com/hinapupil/project-template my-project
cd my-project
rm -rf .git && git init

# Activate environment
direnv allow   # or: devbox shell

# Set up git hooks
just setup
```

## Adding a language

Ask your AI coding agent, or follow the guides in `docs/`:

```bash
# With Claude Code
claude "docs/_init.md を読んで、TypeScript プロジェクトとしてセットアップして"

# Manually
cat docs/add-typescript.md  # and follow the steps
```

Available guides:
- `docs/add-typescript.md` — TypeScript + Node.js (pnpm, Biome, Vitest)
- `docs/add-python.md` — Python (uv, Ruff, pytest)
- `docs/add-go.md` — Go (golangci-lint)
- `docs/add-terraform-aws.md` — Terraform + AWS (`infra/` directory)

After setup, remove the guides: `just eject`

## Project structure

```
├── devbox.json        # Team-friendly package definition
├── flake.nix          # Nix flake (alternative to devbox.json)
├── .envrc             # direnv auto-activation
├── justfile           # Task runner commands
├── lefthook.yml       # Git hooks (secret detection, lint, test)
├── AGENTS.md          # AI agent instructions (source of truth)
├── CLAUDE.md          # → symlink to AGENTS.md
├── .claude/           # Claude Code settings
├── infra/             # Infrastructure (Terraform)
├── docs/              # Setup guides (removable)
└── .github/workflows/ # CI
```

## License

MIT
