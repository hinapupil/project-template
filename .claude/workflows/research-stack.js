export const meta = {
  name: 'research-stack',
  description: 'Research current best practices for a language/tool stack and generate setup guide',
  phases: [
    { title: 'Scope', detail: 'Decompose requirements into search angles', model: 'sonnet' },
    { title: 'Search', detail: 'Parallel web searches across angles', model: 'haiku' },
    { title: 'Extract', detail: 'Fetch top sources and extract recommendations', model: 'haiku' },
    { title: 'Synthesize', detail: 'Compare options and generate setup guide', model: 'opus' },
  ],
}

// research-stack: Research best practices for a language/tool stack
// Input via args: { language: "typescript", useCase: "CLI tool", preferences: "heavy testing" }
// or as a string: "typescript — CLI tool, heavy testing"

const MAX_SOURCES = 10

const SCOPE_SCHEMA = {
  type: "object", required: ["language", "useCase", "angles"],
  properties: {
    language: { type: "string" },
    useCase: { type: "string" },
    angles: { type: "array", minItems: 3, maxItems: 6, items: {
      type: "object", required: ["label", "query"],
      properties: {
        label: { type: "string" },
        query: { type: "string" },
      },
    }},
  },
}

const SEARCH_SCHEMA = {
  type: "object", required: ["results"],
  properties: {
    results: { type: "array", maxItems: 5, items: {
      type: "object", required: ["url", "title", "relevance"],
      properties: {
        url: { type: "string" },
        title: { type: "string" },
        snippet: { type: "string" },
        relevance: { enum: ["high", "medium", "low"] },
      },
    }},
  },
}

const EXTRACT_SCHEMA = {
  type: "object", required: ["recommendations"],
  properties: {
    sourceQuality: { enum: ["primary", "secondary", "blog", "forum"] },
    recommendations: { type: "array", maxItems: 5, items: {
      type: "object", required: ["category", "tool", "why"],
      properties: {
        category: { type: "string" },
        tool: { type: "string" },
        why: { type: "string" },
        alternatives: { type: "array", items: { type: "string" } },
        config: { type: "string" },
      },
    }},
  },
}

const GUIDE_SCHEMA = {
  type: "object", required: ["summary", "decisions", "guide"],
  properties: {
    summary: { type: "string" },
    decisions: { type: "array", items: {
      type: "object", required: ["category", "recommended", "why", "alternatives"],
      properties: {
        category: { type: "string" },
        recommended: { type: "string" },
        why: { type: "string" },
        alternatives: { type: "array", items: {
          type: "object", required: ["name", "tradeoff"],
          properties: {
            name: { type: "string" },
            tradeoff: { type: "string" },
          },
        }},
      },
    }},
    guide: { type: "string" },
    caveats: { type: "string" },
  },
}

// Parse input
const input = typeof args === "string" ? args : (args || "")
if (!input) {
  return { error: "No input. Usage: Workflow({name: 'research-stack', args: 'typescript — CLI tool'})" }
}

// --- Scope ---
phase("Scope")
const scope = await agent(
  "You are researching the current best practices for setting up a development project.\n\n" +
  "## User request\n" + input + "\n\n" +
  "## Context\n" +
  "The project uses: Devbox (Nix) for environment, Just for tasks, Lefthook + gitleaks for git hooks, AGENTS.md for AI agents.\n" +
  "The user needs to decide on language-specific tooling.\n\n" +
  "## Task\n" +
  "1. Identify the language and use case from the request\n" +
  "2. Generate 4-5 search queries to find current (2025-2026) best practices for:\n" +
  "   - Package manager / dependency management\n" +
  "   - Linter and formatter\n" +
  "   - Test framework and strategy\n" +
  "   - Build tool / bundler (if applicable)\n" +
  "   - Project structure conventions\n" +
  "   - Any use-case-specific tools (e.g., CLI frameworks, web frameworks)\n\n" +
  "Include Japanese sources (Zenn, Qiita) in at least one query.\n\nStructured output only.",
  { label: "scope", schema: SCOPE_SCHEMA, model: "sonnet" }
)
if (!scope) return { error: "Failed to decompose the request." }
log("Researching: " + scope.language + " for " + scope.useCase)
log("Angles: " + scope.angles.map(a => a.label).join(", "))

// --- Search + Extract (pipeline, no barrier) ---
const seen = new Map()
let slots = MAX_SOURCES

const results = await pipeline(
  scope.angles,

  angle => agent(
    "Search for current best practices.\n\n" +
    "Language: " + scope.language + "\nUse case: " + scope.useCase + "\n" +
    "Angle: " + angle.label + "\nQuery: " + angle.query + "\n\n" +
    "Use WebSearch. Return top 3-5 most relevant results. Skip SEO spam.\n\nStructured output only.",
    { label: "search:" + angle.label, phase: "Search", schema: SEARCH_SCHEMA, model: "haiku" }
  ).then(r => {
    if (!r) return null
    log(angle.label + ": " + r.results.length + " results")
    return { angle: angle.label, results: r.results }
  }),

  searchResult => {
    const novel = searchResult.results.filter(r => {
      try {
        const key = new URL(r.url).hostname.replace(/^www\./, "") + new URL(r.url).pathname.replace(/\/$/, "")
        if (seen.has(key) || slots <= 0) return false
        seen.set(key, true)
        slots--
        return true
      } catch { return false }
    })
    return parallel(
      novel.map(source => () => {
        let host = "unknown"
        try { host = new URL(source.url).hostname.replace(/^www\./, "") } catch {}
        return agent(
          "Extract tool recommendations from this source.\n\n" +
          "Language: " + scope.language + " | Use case: " + scope.useCase + "\n" +
          "URL: " + source.url + "\nTitle: " + source.title + "\n\n" +
          "Use WebFetch to get the page. Extract specific tool recommendations with:\n" +
          "- Category (e.g., 'package manager', 'linter', 'test framework')\n" +
          "- Recommended tool name\n" +
          "- Why it's recommended (concrete reasons, not vague)\n" +
          "- Alternatives mentioned\n" +
          "- Config snippets if available\n\n" +
          "If the page is irrelevant or paywalled, return recommendations: [].\n\nStructured output only.",
          { label: "fetch:" + host, phase: "Extract", schema: EXTRACT_SCHEMA, model: "haiku" }
        ).catch(() => null)
      })
    )
  }
)

const allRecs = results.flat().filter(Boolean).flatMap(r => r.recommendations || [])
const sources = [...seen.keys()]
log("Extracted " + allRecs.length + " recommendations from " + sources.length + " sources")

if (allRecs.length === 0) {
  return { error: "No recommendations found. Try a more specific query.", sources }
}

// --- Synthesize ---
phase("Synthesize")
const recsBlock = allRecs.map((r, i) =>
  "[" + i + "] " + r.category + ": " + r.tool + " — " + r.why +
  (r.alternatives && r.alternatives.length > 0 ? " (alternatives: " + r.alternatives.join(", ") + ")" : "") +
  (r.config ? "\n    Config: " + r.config.slice(0, 200) : "")
).join("\n")

const guide = await agent(
  "## Synthesize: development stack recommendation\n\n" +
  "Language: " + scope.language + " | Use case: " + scope.useCase + "\n" +
  "User request: " + input + "\n\n" +
  "## Raw recommendations from " + sources.length + " sources\n" + recsBlock + "\n\n" +
  "## Project context\n" +
  "The project already uses: Devbox (Nix-backed), Just (task runner), Lefthook + gitleaks (git hooks), AGENTS.md.\n" +
  "The guide needs to integrate with these tools (devbox add, justfile recipes, lefthook.yml commands).\n\n" +
  "## Task\n" +
  "1. For each category (package manager, linter, formatter, test, build, etc.):\n" +
  "   - Pick the recommended tool based on consensus across sources\n" +
  "   - Explain WHY in 1-2 sentences (concrete reasons, not 'it is popular')\n" +
  "   - List 1-2 alternatives with their tradeoff vs the recommendation\n" +
  "2. Write a complete setup guide in Markdown that includes:\n" +
  "   - devbox add commands\n" +
  "   - Full config files (package.json / tsconfig.json / pyproject.toml / etc.)\n" +
  "   - justfile recipes (dev, lint, fmt, test, test-coverage)\n" +
  "   - lefthook.yml additions\n" +
  "   - .gitignore additions\n" +
  "   - AGENTS.md updates\n" +
  "3. Note any caveats (experimental tools, known issues, version pinning advice)\n\n" +
  "The guide should be detailed enough that an AI agent can execute it step by step.\n" +
  "Include WHY for each decision — without WHY, the agent cannot adapt to edge cases.\n\nStructured output only.",
  { label: "synthesize", schema: GUIDE_SCHEMA, model: "opus" }
)

if (!guide) {
  return {
    language: scope.language,
    useCase: scope.useCase,
    error: "Synthesis failed. Raw recommendations available.",
    recommendations: allRecs,
    sources,
  }
}

return {
  language: scope.language,
  useCase: scope.useCase,
  ...guide,
  sources,
  stats: {
    angles: scope.angles.length,
    sourcesFetched: sources.length,
    recommendations: allRecs.length,
    decisions: guide.decisions ? guide.decisions.length : 0,
  },
}
