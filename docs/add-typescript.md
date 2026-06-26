# Add TypeScript / Node.js

## 1. Add packages to devbox.json

```bash
devbox add nodejs@22 pnpm
```

For Nix users, add to `flake.nix` devShell packages:
```nix
nodejs_22
nodePackages.pnpm
```

## 2. Initialize the project

```bash
pnpm init
pnpm add -D typescript @types/node
pnpm exec tsc --init
```

## 3. Add linter/formatter

Biome is recommended (fast, single tool for lint + format):

```bash
pnpm add -D @biomejs/biome
pnpm exec biome init
```

## 4. Add test framework

```bash
pnpm add -D vitest
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

## 5. Update justfile

Replace the placeholder recipes:

```just
dev:
    pnpm dev

lint:
    pnpm exec biome check .

fmt:
    pnpm exec biome check --write .

test:
    pnpm exec vitest run

test-coverage:
    pnpm exec vitest run --coverage
```

## 6. Update lefthook.yml

Add lint-on-commit for staged files:

```yaml
pre-commit:
  parallel: true
  commands:
    gitleaks:
      run: gitleaks git --staged --no-banner
    biome:
      glob: "*.{ts,tsx,js,jsx,json}"
      run: pnpm exec biome check --no-errors-on-unmatched {staged_files}
```

## 7. Add to .gitignore

```
node_modules/
dist/
coverage/
```

## 8. Update AGENTS.md

Add to the Architecture section:
```markdown
- Language: TypeScript
- Runtime: Node.js 22
- Package manager: pnpm
- Linter/Formatter: Biome
- Test: Vitest
```
