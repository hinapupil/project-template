# Adding a Language to This Project

This project does not ship static language guides. Instead, it uses a Deep Research
workflow to find **current** best practices at the time you set up.

## With Claude Code

```bash
# Ask Claude Code to research and set up
claude "/add-language typescript — CLI tool, want heavy testing"
claude "/add-language python — web API with FastAPI"
claude "/add-language go — microservice with OpenTelemetry"
```

This runs `.claude/workflows/research-stack.js`, which:
1. Searches the web for current (2025-2026+) best practices
2. Extracts tool recommendations from multiple sources
3. Presents choices with WHY for each recommendation
4. After your approval, applies the setup to this project

## Without Claude Code

If you don't have Claude Code, you can manually research and set up:

1. Decide on your stack (package manager, linter, formatter, test framework, build tool)
2. Add packages: `devbox add <packages>`
3. Update `justfile` with dev/lint/fmt/test recipes
4. Update `lefthook.yml` with pre-commit lint hooks
5. Update `AGENTS.md` with your stack details

## Why dynamic research instead of static guides?

Language tooling changes fast. A static guide written in 2026 recommending Tool X
might be outdated by 2027 when Tool Y becomes the standard. By researching at
setup time, you always get current recommendations.

The tradeoff: you need internet access and an AI coding agent at setup time.
After setup, the project is fully self-contained.
