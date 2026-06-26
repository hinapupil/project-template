# project-template

[日本語](README.ja.md)

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

Instead of static guides, this template uses a **Deep Research workflow** to find
current best practices at setup time:

```bash
# With Claude Code — researches and sets up in one step
claude "/add-language typescript — CLI tool with heavy testing"
claude "/add-language python — web API with FastAPI"
claude "/add-language go — microservice with OpenTelemetry"
```

The workflow searches the web for current recommendations, presents choices with
tradeoffs, and applies the setup after your approval.

See `docs/research-language.md` for details, including setup without Claude Code.

After setup, remove the guides: `just eject`

## Project structure

```
├── devbox.json        # Team-friendly package definition
├── flake.nix          # Nix flake (alternative to devbox.json)
├── .envrc             # direnv auto-activation
├── justfile           # Task runner commands
├── lefthook.yml       # Git hooks (secret detection, lint, test)
├── AGENTS.md          # AI agent instructions (source of truth)
├── CLAUDE.md          # -> symlink to AGENTS.md
├── .claude/           # Claude Code settings
├── infra/             # Infrastructure (Terraform)
├── docs/              # Setup guides + research instructions (removable)
└── .github/workflows/ # CI
```

## Acknowledgements

Inspired by [mizchi/project-template](https://github.com/mizchi/project-template) and [mizchi's LLM-aware TypeScript guide](https://zenn.dev/mizchi/articles/llm-aware-ts-project-starter).

## License

MIT
