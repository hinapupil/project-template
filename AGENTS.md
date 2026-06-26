# Project Instructions

## Quick Start

```bash
just setup    # install dependencies and git hooks
just dev      # start development
just lint     # run linters
just test     # run tests
```

## Architecture

<!-- Describe your project structure here -->

```
src/           # application source code
infra/         # Terraform infrastructure (AWS)
docs/          # setup guides (remove with `just eject` after initial setup)
```

## Conventions

- Commit messages in English
- Branch naming: `feat/`, `fix/`, `chore/`
- All commands are defined in `justfile` — run `just --list` to see available tasks

## Security

- Never commit secrets — gitleaks runs on every commit via lefthook
- Use environment variables or secret managers for credentials
- `.env` files are gitignored and must not be committed

## Testing

<!-- Describe your test strategy here -->

```bash
just test           # run all tests
just test-coverage  # run tests with coverage
```
