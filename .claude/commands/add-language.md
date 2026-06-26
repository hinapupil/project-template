# Add Language

Research current best practices and set up a language stack for this project.

## Usage

```
/add-language <language> — <use case and preferences>
```

Examples:
- `/add-language typescript — building a CLI tool, want heavy testing`
- `/add-language python — web API with FastAPI, team of 3`
- `/add-language go — microservice, need OpenTelemetry`

## Steps

1. Run the research-stack workflow to find current best practices:

```
Workflow({ name: "research-stack", args: "$ARGUMENTS" })
```

2. Present the findings to the user as a table of decisions (category / recommended / alternatives / why)

3. Ask the user to confirm or adjust the choices

4. After confirmation, apply the guide:
   - Run `devbox add` commands
   - Write config files (package.json, tsconfig.json, etc.)
   - Update `justfile` with language-specific recipes (dev, lint, fmt, test)
   - Update `lefthook.yml` with language-specific hooks
   - Update `.gitignore`
   - Update `AGENTS.md` with stack details

5. Remove the docs/ directory: `just eject`
