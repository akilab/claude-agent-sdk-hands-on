# エージェント指示

## 学習サイト作成

- このワークスペースでは Claude Agent SDK の学習サイトを作成する。
- サイト作成前に `working-memory/INDEX.md` と関連メモを読む。
- サイトは、Pro以上のClaudeサブスクリプション契約を前提としたハンズオン教材として設計する。
- Claude Agent SDK の仕様、認証、料金、利用条件は変わりうるため、教材化前に公式ドキュメントを確認する。
- 公式ドキュメントへのリンクは、日本語版がある場合は日本語ページを優先する。
- トップページは `index.html`、CSSは `assets/css/`、JavaScriptは `assets/js/`、画像は `assets/img/` に分ける。
- カリキュラムはPythonとuvのみを前提にする。Node.jsとTypeScriptは扱わない。
- 初期カリキュラムは12レッスン構成を前提にする。
- 各レッスンは、完成済みのPythonコードを実行して動作を観察し、必要に応じてソースを読む構成にする。学習者に長いコードを書かせる前提にはしない。
- Skillsとサブエージェントを学べる章を含める。
- Python実習コードは `python-labs/` に置く。各レッスンの完成済み実行ファイルは `python-labs/scripts/`、入力サンプルやSQLite DBは `python-labs/data/`、実行結果は `python-labs/outputs/` を使う。
- 学習ページのHTMLは `lessons/` に置く。
- `working-memory/` と `python-labs/outputs/` はGit管理対象外にする。`python-labs/scripts/` は完成コードとしてGit管理対象にする。
- uvやPythonが生成する `.venv/`、`__pycache__/`、`.pytest_cache/` はGit管理対象外にする。
- 長い作業ログ、判断、設計前提は `working-memory/` に記録する。
