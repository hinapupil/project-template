# Add Python

## 1. Add packages to devbox.json

```bash
devbox add python@3.12 uv
```

For Nix users, add to `flake.nix` devShell packages:
```nix
python312
uv
```

## 2. Initialize the project

```bash
uv init
uv add --dev ruff pytest
```

## 3. Update justfile

Replace the placeholder recipes:

```just
dev:
    uv run python -m src.main

lint:
    uv run ruff check .

fmt:
    uv run ruff format .

test:
    uv run pytest

test-coverage:
    uv run pytest --cov
```

## 4. Update lefthook.yml

Add lint-on-commit for staged files:

```yaml
pre-commit:
  parallel: true
  commands:
    gitleaks:
      run: gitleaks git --staged --no-banner
    ruff:
      glob: "*.py"
      run: uv run ruff check {staged_files}
```

## 5. Add to .gitignore

```
__pycache__/
.venv/
*.egg-info/
.coverage
htmlcov/
```

## 6. Update AGENTS.md

Add to the Architecture section:
```markdown
- Language: Python 3.12
- Package manager: uv
- Linter/Formatter: Ruff
- Test: pytest
```
