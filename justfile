# Project tasks — run `just --list` to see all available commands

# Install dependencies and set up git hooks
setup:
    lefthook install
    @echo "Setup complete. Run 'just --list' to see available commands."

# Start development server
dev:
    @echo "Configure 'just dev' for your project (see docs/add-*.md)"

# Run linters
lint:
    @echo "Configure 'just lint' for your project (see docs/add-*.md)"

# Run tests
test:
    @echo "Configure 'just test' for your project (see docs/add-*.md)"

# Run tests with coverage
test-coverage:
    @echo "Configure 'just test-coverage' for your project"

# Format code
fmt:
    @echo "Configure 'just fmt' for your project"

# Check all (lint + test) — used by CI
check: lint test

# Remove setup docs after project initialization
eject:
    rm -rf docs/
    @echo "Setup docs removed. You can also remove this recipe from justfile."
