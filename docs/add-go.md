# Add Go

## 1. Add packages to devbox.json

```bash
devbox add go@1.23 golangci-lint
```

For Nix users, add to `flake.nix` devShell packages:
```nix
go_1_23
golangci-lint
```

## 2. Initialize the project

```bash
go mod init github.com/yourorg/yourproject
```

## 3. Update justfile

Replace the placeholder recipes:

```just
dev:
    go run ./cmd/main.go

lint:
    golangci-lint run ./...

fmt:
    gofmt -w .

test:
    go test ./...

test-coverage:
    go test -coverprofile=coverage.out ./... && go tool cover -html=coverage.out -o coverage.html
```

## 4. Update lefthook.yml

Add lint-on-commit for staged files:

```yaml
pre-commit:
  parallel: true
  commands:
    gitleaks:
      run: gitleaks git --staged --no-banner
    golangci-lint:
      glob: "*.go"
      run: golangci-lint run --new-from-rev=HEAD
```

## 5. Add to .gitignore

```
/bin/
coverage.out
coverage.html
```

## 6. Update AGENTS.md

Add to the Architecture section:
```markdown
- Language: Go 1.23
- Linter: golangci-lint
- Test: go test
```
