# claude-agent-sdk-hands-on

Claude Agent SDKを、Pythonとuvで手を動かしながら学ぶためのハンズオン学習サイトです。

このリポジトリでは、Agent SDKの基本、Pythonでの実装、権限設定、Skills、サブエージェント設計を、段階的なレッスンとして整理していきます。

## Learning Goal

- Claude Agent SDKの全体像を理解する
- Pythonとuvだけで学習環境を作る
- 省略の少ないPythonコードを書いてAgent SDKを動かす
- Options、権限、出力、ログの扱いを学ぶ
- Agent Skillsとサブエージェントを実務寄りに理解する
- 小さな業務自動化ツールとしてまとめる

## Assumptions

- Pythonとuvを使用します
- Node.jsとTypeScriptは扱いません
- Claude Pro以上のサブスクリプション契約を前提にします
- Claude Agent SDK、Claude Code、契約条件、認証方法、料金の扱いは将来変更される可能性があります
- 実務利用前には、必ず公式ドキュメントで最新情報を確認してください

## Repository Structure

```text
.
├─ index.html
├─ assets/
│  ├─ css/
│  ├─ js/
│  └─ img/
├─ lessons/
└─ python-labs/
   ├─ src/
   │  └─ agent_sdk_learning/
   ├─ scripts/
   ├─ data/
   └─ outputs/
```

## Directory Guide

- `index.html`: 学習ポータルのトップページ
- `assets/css/`: サイト用CSS
- `assets/js/`: サイト用JavaScript
- `assets/img/`: サイト用画像
- `lessons/`: 各レッスンページのHTML
- `python-labs/src/agent_sdk_learning/`: 共通Pythonコード
- `python-labs/scripts/`: 各レッスンで書いて実行するPythonファイル
- `python-labs/data/`: 入力サンプル
- `python-labs/outputs/`: 実行結果やログ

`python-labs/scripts/` は学習者が自由にコードを書く場所としてGit管理対象外にしています。

## Curriculum

1. 学習前提と公式情報を確認する
2. uvでPythonプロジェクトを作る
3. Pythonの基本を小さく書く
4. ファイル操作と例外処理を書く
5. async / await の感覚をつかむ
6. 最初のPython Agentを動かす
7. メッセージと結果を読み分ける
8. Optionsと権限を設定する
9. 構造化出力とログを作る
10. Agent Skillsを設計する
11. サブエージェントの役割を実装する
12. 業務向けミニ自動化を完成させる

## Official Documentation

- [Agent SDK の概要](https://code.claude.com/docs/ja/agent-sdk/overview)
- [クイックスタート](https://code.claude.com/docs/ja/agent-sdk/quickstart)
- [Python SDK reference](https://code.claude.com/docs/ja/agent-sdk/python)
- [SDK の Agent Skills](https://code.claude.com/docs/ja/agent-sdk/skills)
- [SDK のサブエージェント](https://code.claude.com/docs/ja/agent-sdk/subagents)
- [パーミッションの設定](https://code.claude.com/docs/ja/agent-sdk/permissions)
- [Claude プランで Agent SDK を使用する](https://support.claude.com/ja/articles/15036540-claude-%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A7-claude-agent-sdk-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)
- [Pro または Max プランで Claude Code を使用する](https://support.claude.com/ja/articles/11145838-pro-%E3%81%BE%E3%81%9F%E3%81%AF-max-%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A7-claude-code-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)

## Local Preview

トップページは静的HTMLです。ブラウザで `index.html` を開くと確認できます。

## Git Ignore Policy

以下はGit管理対象外です。

- `working-memory/`
- `python-labs/scripts/`
- `.venv/`
- `__pycache__/`
- `.pytest_cache/`
