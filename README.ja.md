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

静的なガイドの代わりに、**Deep Research ワークフロー**でセットアップ時点の最新ベストプラクティスを調査します:

```bash
# Claude Code で — 調査とセットアップを一気に実行
claude "/add-language typescript — CLI ツールを作りたい、テストは厚めに"
claude "/add-language python — FastAPI で Web API"
claude "/add-language go — OpenTelemetry 付きマイクロサービス"
```

ワークフローが Web で最新の推奨事項を検索し、トレードオフ付きで選択肢を提示。承認後にセットアップを適用します。

Claude Code なしでのセットアップ方法は `docs/research-language.md` を参照。

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
├── docs/              # セットアップガイド + リサーチ手順（削除可能）
└── .github/workflows/ # CI
```

## 仕組み

このテンプレートは静的なボイラープレートではなく、**セットアップ時に最新のベストプラクティスを動的に調査する仕組み**を備えています。

1. `nix flake init` または `git clone` で最小限の骨格を取得
2. `/add-language` コマンドが Deep Research ワークフローを実行し、その時点での最新ツール・設定を調査
3. 調査結果をトレードオフ付きで提示し、ユーザーが選択
4. 承認後、devbox.json / justfile / lefthook.yml 等を自動更新
5. セットアップ完了後、`just eject` で `docs/` を削除

言語ツールの流行り廃りは速いため、静的ガイドではなく動的調査で対応します。骨格ツール（Devbox, Just, Lefthook 等）の選定理由は `docs/_init.md` に記載していますが、これも 2026 年時点の選択であり、ワークフローで再調査可能です。

## 謝辞

[mizchi/project-template](https://github.com/mizchi/project-template) および [mizchi 氏の LLM-aware TypeScript 環境構築ガイドライン](https://zenn.dev/mizchi/articles/llm-aware-ts-project-starter)にインスパイアされています。

## ライセンス

MIT
