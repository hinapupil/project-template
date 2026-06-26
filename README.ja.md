# project-template

[English](README.md)

言語非依存のプロジェクトテンプレート。再現可能な開発環境と AI コーディングエージェント対応を備えたスキャフォールド。

## 含まれるもの

- **[Devbox](https://www.jetify.com/devbox)** — 再現可能な開発環境（Nix ベース、Nix の知識不要）
- **[Just](https://github.com/casey/just)** — タスクランナー（`just dev`, `just lint`, `just test`）
- **[Lefthook](https://github.com/evilmartians/lefthook)** + **[gitleaks](https://github.com/gitleaks/gitleaks)** — コミット時のシークレット検出
- **[AGENTS.md](https://agents.md)** — AI コーディングエージェント設定（Claude Code, Codex, Cursor 等）
- **Nix flake** — Nix を直接使いたい人向けの代替手段

## クイックスタート

### Nix flake テンプレートから

```bash
nix flake init -t github:hinapupil/project-template
direnv allow
```

### 手動セットアップ

```bash
# Devbox をインストール（Nix も自動でインストールされる）
curl -fsSL https://get.jetify.com/devbox | bash

# クローンして開始
git clone https://github.com/hinapupil/project-template my-project
cd my-project
rm -rf .git && git init

# 環境を有効化
direnv allow   # または: devbox shell

# Git hooks をセットアップ
just setup
```

## 言語の追加

AI コーディングエージェントに聞くか、`docs/` のガイドに従ってください:

```bash
# Claude Code で
claude "docs/_init.md を読んで、TypeScript プロジェクトとしてセットアップして"

# 手動で
cat docs/add-typescript.md  # 手順に従う
```

利用可能なガイド:
- `docs/add-typescript.md` — TypeScript + Node.js（pnpm, Biome, Vitest）
- `docs/add-python.md` — Python（uv, Ruff, pytest）
- `docs/add-go.md` — Go（golangci-lint）
- `docs/add-terraform-aws.md` — Terraform + AWS（`infra/` ディレクトリ）

セットアップ後、ガイドを削除: `just eject`

## プロジェクト構成

```
├── devbox.json        # チーム向けパッケージ定義
├── flake.nix          # Nix flake（devbox.json の代替）
├── .envrc             # direnv 自動有効化
├── justfile           # タスクランナーのコマンド定義
├── lefthook.yml       # Git hooks（シークレット検出、lint、テスト）
├── AGENTS.md          # AI エージェント設定（正本）
├── CLAUDE.md          # → AGENTS.md へのシンボリックリンク
├── .claude/           # Claude Code 設定
├── infra/             # インフラ（Terraform）
├── docs/              # セットアップガイド（削除可能）
└── .github/workflows/ # CI
```

## 仕組み

このテンプレートは静的なボイラープレートではなく、**LLM が読んで拡張できるガイドライン**を同梱しています。

1. `nix flake init` または `git clone` で最小限の骨格を取得
2. `docs/_init.md` を AI エージェントに渡すと、プロジェクトの文脈に合わせて環境をセットアップ
3. `docs/add-*.md` で言語固有のツールチェーンを追加
4. セットアップ完了後、`just eject` で `docs/` を削除

ガイドラインには「どう使うか」だけでなく「なぜその選択をしたか」を記載しているため、AI エージェントがツールのバージョンアップや新しいベストプラクティスに自律的に対応できます。

## 謝辞

[mizchi/project-template](https://github.com/mizchi/project-template) および [mizchi 氏の LLM-aware TypeScript 環境構築ガイドライン](https://zenn.dev/mizchi/articles/llm-aware-ts-project-starter)にインスパイアされています。

## ライセンス

MIT
