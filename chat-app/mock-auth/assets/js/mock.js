// ============================================================
// データ: 調査担当者・ステータス種別・製品種別・セッション本体
// ============================================================

const analysts = {
  tanaka: {
    name: "田中 明",
    shortName: "田中",
    avatar: "T",
    role: "Tier2",
    workStatus: "office",
  },
  sato: {
    name: "佐藤 美咲",
    shortName: "佐藤",
    avatar: "S",
    role: "Tier2 Senior",
    workStatus: "remote",
  },
  suzuki: {
    name: "鈴木 健",
    shortName: "鈴木",
    avatar: "U",
    role: "Tier2 Chief",
    workStatus: "busy",
  },
  hayashi: {
    name: "林 涼",
    shortName: "林",
    avatar: "H",
    role: "Tier2",
    workStatus: "night",
  },
  mori: {
    name: "森 愛",
    shortName: "森",
    avatar: "M",
    role: "Tier2 Senior",
    workStatus: "away",
  },
  onodera: {
    name: "小野寺 健太郎",
    shortName: "小野寺",
    avatar: "O",
    role: "Tier2 Chief",
    workStatus: "office",
  },
  hasegawa: {
    name: "長谷川 奈津美",
    shortName: "長谷川",
    avatar: "N",
    role: "Tier2 Senior",
    workStatus: "leave",
  },
  fujiwara: {
    name: "藤原 真由",
    shortName: "藤原",
    avatar: "F",
    role: "Tier2",
    workStatus: "night",
  },
};

const workStatuses = {
  office: {
    label: "出勤",
    className: "is-office",
  },
  remote: {
    label: "在宅",
    className: "is-remote",
  },
  busy: {
    label: "対応中",
    className: "is-busy",
  },
  away: {
    label: "一時離席",
    className: "is-away",
  },
  night: {
    label: "夜勤",
    className: "is-night",
  },
  leave: {
    label: "休暇",
    className: "is-leave",
  },
};

const caseStatuses = {
  new: {
    label: "新規",
    className: "is-new",
  },
  investigating: {
    label: "調査中",
    className: "is-investigating",
  },
  reviewing: {
    label: "追加確認中",
    className: "is-reviewing",
  },
  monitoring: {
    label: "監視中",
    className: "is-monitoring",
  },
  paused: {
    label: "保留",
    className: "is-paused",
  },
  closed: {
    label: "クローズ",
    className: "is-closed",
  },
};

const products = {
  mde: {
    label: "MDE",
    className: "is-mde",
  },
  sentinel: {
    label: "Sentinel",
    className: "is-sentinel",
  },
  crowdstrike: {
    label: "CrowdStrike",
    className: "is-crowdstrike",
  },
  sentinelone: {
    label: "SentinelOne",
    className: "is-sentinelone",
  },
};

const customers = {
  alpha: {
    name: "アルファ商事",
  },
  beta: {
    name: "ベータ物流",
  },
  gamma: {
    name: "ガンマ製薬",
  },
  delta: {
    name: "デルタ興業",
  },
};

const sessions = {
  fastapi: {
    title: "Impossible Travel alert",
    sessionId: "4bf35ad0-805b-4e54-9623-d62191b77342",
    statusKey: "investigating",
    ownerAnalystId: "tanaka",
    customer: "アルファ商事",
    product: "mde",
    sidebarTimeLabel: "今日 15:42",
    updatedAt: "2026/07/26 15:45",
    messages: [
      {
        role: "user",
        analystId: "tanaka",
        time: "15:42",
        text: "このImpossible Travelアラートについて、まず確認すべき観点を整理してください。",
      },
      {
        role: "claude",
        time: "15:43",
        text: "最初にサインイン時刻、送信元IP、端末、ユーザーの通常行動との差分を確認します。次に、直近の失敗ログインや多要素認証の状態を見ます。",
      },
      {
        role: "user",
        analystId: "sato",
        time: "15:44",
        text: "送信元IPの観点では、どの情報を追加で見ればよいですか？",
      },
      {
        role: "claude",
        time: "15:45",
        text: "IPの地理情報、ASN、過去の検知履歴、社内VPNや既知プロキシとの一致を確認します。必要に応じて脅威インテリジェンス照会も行います。",
        code: [
          "GET /api/sessions/{session_id}/messages",
          "POST /api/sessions/{session_id}/messages",
          "message.user_id = selected_analyst_id",
        ].join("\n"),
      },
      {
        role: "user",
        analystId: "suzuki",
        time: "15:47",
        text: "対象ユーザーは東京からの通常サインインが多いですが、今回はニューヨークから成功しています。直前に東京で成功サインインもあります。",
      },
      {
        role: "claude",
        time: "15:48",
        text: "短時間で東京とニューヨークの両方から成功しているため、通常移動では説明しにくい状態です。まず同一ユーザーの直近24時間の成功/失敗サインイン、MFA要求と成功状況、使用アプリ、端末IDの一致を並べて確認してください。",
      },
      {
        role: "user",
        analystId: "mori",
        time: "15:50",
        text: "MFAは成功しています。ただし、成功時の端末は未管理端末で、過去30日の利用履歴はありませんでした。",
      },
      {
        role: "claude",
        time: "15:51",
        text: "MFA成功だけでは安全とは判断しない方がよいです。未管理端末、初出の端末、通常と異なる地域が重なっているため、MFA疲労攻撃、トークン窃取、セッションハイジャックの可能性を考えます。条件付きアクセスの評価結果と、同時刻のメールボックス操作も確認してください。",
      },
      {
        role: "user",
        analystId: "tanaka",
        time: "15:54",
        text: "メールボックスでは外部転送ルールはありません。TeamsとSharePointへのアクセスがあり、SharePointで複数ファイルの閲覧が記録されています。",
      },
      {
        role: "claude",
        time: "15:55",
        text: "外部転送がない点はよい材料ですが、SharePoint閲覧は影響範囲確認が必要です。閲覧ファイルの機密度、ダウンロード有無、共有リンク作成有無、同じIPから他ユーザーへのアクセス有無を確認してください。現時点ではアカウント侵害疑いとして、リスク低減を優先する判断が妥当です。",
      },
      {
        role: "user",
        analystId: "onodera",
        time: "15:58",
        text: "推奨アクションを、SOCから運用チームへ渡せる形で短くまとめてください。",
      },
      {
        role: "claude",
        time: "15:59",
        text: "推奨アクションは、ユーザー本人確認、セッション失効、パスワードリセット、MFA再登録確認、未管理端末からのアクセス制限、SharePointアクセス範囲の確認です。あわせて、同一IP/ASNからの他ユーザーアクセスを検索し、横展開の有無を確認してください。",
      },
      {
        role: "user",
        analystId: "hasegawa",
        time: "16:02",
        text: "この状態はクローズではなく、監視に移す判断でよさそうですか？",
      },
      {
        role: "claude",
        time: "16:03",
        text: "本人確認とセッション失効が完了し、追加の不審操作が見つからない場合は、即時封じ込め後に監視へ移す判断でよいです。ただし、SharePointの閲覧範囲と同一IPからの横展開確認が終わるまでは、調査中または追加確認中として扱うのが自然です。",
      },
    ],
  },
  sqlite: {
    title: "Suspicious PowerShell",
    sessionId: "9585f444-4265-474f-b9ed-668c8594f5ad",
    statusKey: "reviewing",
    ownerAnalystId: "hayashi",
    customer: "ベータ物流",
    product: "crowdstrike",
    sidebarTimeLabel: "今日 14:18",
    updatedAt: "2026/07/26 14:19",
    messages: [
      {
        role: "user",
        analystId: "hayashi",
        time: "14:18",
        text: "PowerShellの実行ログから、悪性の可能性を判断するポイントを教えてください。",
      },
      {
        role: "claude",
        time: "14:19",
        text: "エンコード済みコマンド、外部通信、ダウンロード実行、永続化に関わるレジストリ操作、通常業務と異なる実行ユーザーを重点的に確認します。",
      },
    ],
  },
  stream: {
    title: "Multiple Failed Logon",
    sessionId: "cc607212-4081-4108-839c-f3cba0fe147a",
    statusKey: "monitoring",
    ownerAnalystId: "mori",
    customer: "アルファ商事",
    product: "sentinel",
    sidebarTimeLabel: "昨日 18:04",
    updatedAt: "2026/07/25 18:05",
    messages: [
      {
        role: "user",
        analystId: "mori",
        time: "18:04",
        text: "複数回のログオン失敗が出ています。ブルートフォースかどうかを見分けたいです。",
      },
      {
        role: "claude",
        time: "18:05",
        text: "短時間に同一IPまたは近いIP範囲から複数ユーザーへ試行しているか、失敗後に成功ログオンがあるか、通常利用端末との違いを確認します。",
      },
    ],
  },
  client: {
    title: "Malicious Attachment",
    sessionId: "2d9dcaaf-7f26-487d-aa47-5f515339629a",
    statusKey: "closed",
    ownerAnalystId: "onodera",
    customer: "ガンマ製薬",
    product: "mde",
    sidebarTimeLabel: "昨日 11:20",
    updatedAt: "2026/07/25 11:21",
    messages: [
      {
        role: "user",
        analystId: "onodera",
        time: "11:20",
        text: "添付ファイルの検知アラートで、利用者への確認前に整理すべき情報は何ですか？",
      },
      {
        role: "claude",
        time: "11:21",
        text: "送信者、件名、添付ファイル名、ハッシュ値、配信範囲、開封有無、端末側の後続挙動を整理します。",
      },
    ],
  },
  oauth: {
    title: "OAuth Consent Grant",
    sessionId: "8f4014e2-7db0-4952-9a6b-4fc975d33a2d",
    statusKey: "new",
    ownerAnalystId: "hasegawa",
    customer: "アルファ商事",
    product: "sentinel",
    sidebarTimeLabel: "昨日 09:48",
    updatedAt: "2026/07/26 09:48",
    messages: [
      {
        role: "user",
        analystId: "hasegawa",
        time: "09:48",
        text: "ユーザーが不審なOAuthアプリに同意した可能性があります。最初に確認する項目を整理してください。",
      },
      {
        role: "claude",
        time: "09:49",
        text: "アプリ名、発行元、要求された権限、同意したユーザー、同意時刻、直後のAPIアクセスを確認します。権限が広い場合は無効化とトークン失効も検討します。",
      },
    ],
  },
  "impossible-device": {
    title: "Unmanaged Device Sign-in",
    sessionId: "3a7b7903-b884-4d83-92f1-c79aa88c1b42",
    statusKey: "investigating",
    ownerAnalystId: "fujiwara",
    sidebarTimeLabel: "07/25 17:32",
    updatedAt: "2026/07/25 17:32",
    messages: [
      {
        role: "user",
        analystId: "fujiwara",
        time: "17:32",
        text: "未管理端末からのサインインが検知されています。端末観点で何を確認すべきですか？",
      },
      {
        role: "claude",
        time: "17:33",
        text: "端末ID、準拠状態、OS、ブラウザ、過去に同じユーザーが使った端末か、条件付きアクセスの判定結果を確認します。",
      },
    ],
  },
  "mail-forwarding": {
    title: "Mailbox Forwarding Rule",
    sessionId: "61b8b8e3-a68e-45d2-a9a5-72f6e5ef0c01",
    statusKey: "reviewing",
    ownerAnalystId: "sato",
    customer: "ベータ物流",
    product: "mde",
    sidebarTimeLabel: "07/25 13:06",
    updatedAt: "2026/07/25 13:06",
    messages: [
      {
        role: "user",
        analystId: "sato",
        time: "13:06",
        text: "外部転送ルールが作成されています。侵害後の操作かどうかを判断したいです。",
      },
      {
        role: "claude",
        time: "13:07",
        text: "作成者、作成時刻、転送先ドメイン、同時刻のログイン元、メールボックス監査ログ、他の受信トレイルールの有無を確認します。",
      },
    ],
  },
  "risky-user": {
    title: "Risky User Detected",
    sessionId: "6a9118f4-4d0d-4477-8b32-3244360b8739",
    statusKey: "paused",
    ownerAnalystId: "mori",
    customer: "ガンマ製薬",
    product: "sentinelone",
    sidebarTimeLabel: "07/24 16:40",
    updatedAt: "2026/07/24 16:40",
    messages: [
      {
        role: "user",
        analystId: "mori",
        time: "16:40",
        text: "リスクユーザーとして検知されていますが、利用者確認の返答待ちです。",
      },
      {
        role: "claude",
        time: "16:41",
        text: "返答待ちの間は、追加のサインイン、MFA変更、パスワード変更、メール転送設定などの重要イベントを監視対象にするとよいです。",
      },
    ],
  },
  "admin-role": {
    title: "Privileged Role Activated",
    sessionId: "ddabf05b-f26c-4cc6-a76c-7215e95a902a",
    statusKey: "monitoring",
    ownerAnalystId: "suzuki",
    isPrivate: true,
    customer: "アルファ商事",
    product: "sentinel",
    sidebarTimeLabel: "07/24 10:15",
    updatedAt: "2026/07/24 10:15",
    messages: [
      {
        role: "user",
        analystId: "suzuki",
        time: "10:15",
        text: "特権ロールが有効化されました。正当な作業か確認済みですが、監視を継続したいです。",
      },
      {
        role: "claude",
        time: "10:16",
        text: "有効化中に実行された管理操作、対象リソース、作業チケットとの一致、ロール解除時刻を継続確認してください。",
      },
    ],
  },
  "data-download": {
    title: "Large Data Download",
    sessionId: "bda911f7-6df6-4b21-a57a-67aa3b46a6e4",
    statusKey: "closed",
    ownerAnalystId: "onodera",
    customer: "ベータ物流",
    product: "sentinelone",
    sidebarTimeLabel: "07/23 19:22",
    updatedAt: "2026/07/23 19:22",
    messages: [
      {
        role: "user",
        analystId: "onodera",
        time: "19:22",
        text: "大量ダウンロードの調査は完了しました。クローズ前の記録として要点を残してください。",
      },
      {
        role: "claude",
        time: "19:23",
        text: "業務上の操作であること、承認済み端末からのアクセスであること、外部共有や追加流出兆候がないことを記録してクローズできます。",
      },
    ],
  },
  "legacy-vpn": {
    title: "Legacy VPN Geo Mismatch",
    sessionId: "0f62a2d5-8c0e-4c99-9ec4-2c274f99ec40",
    statusKey: "closed",
    ownerAnalystId: "hayashi",
    customer: "デルタ興業",
    product: "crowdstrike",
    updatedAt: "2026/07/20 09:35",
    messages: [
      {
        role: "user",
        analystId: "hayashi",
        time: "09:32",
        text: "古いVPNゲートウェイ経由のアクセスで地理情報がずれて見えています。誤検知として扱ってよいか確認したいです。",
      },
      {
        role: "claude",
        time: "09:35",
        text: "既知VPN出口IP、端末、MFA成功、勤務予定との一致を確認できていれば、誤検知としてクローズ候補にできます。",
      },
    ],
  },
  "legacy-device": {
    title: "Retired Device Access",
    sessionId: "1ad8f679-5ef7-48f7-baf8-943d8d6f3e7a",
    statusKey: "monitoring",
    ownerAnalystId: "suzuki",
    customer: "デルタ興業",
    product: "sentinelone",
    updatedAt: "2026/07/18 16:12",
    messages: [
      {
        role: "user",
        analystId: "suzuki",
        time: "16:10",
        text: "廃棄予定端末からのアクセス記録が残っています。継続監視に回す判断でよいでしょうか。",
      },
      {
        role: "claude",
        time: "16:12",
        text: "端末管理台帳、最終利用者、ネットワーク位置、以降のアクセス有無を確認し、追加イベントがなければ監視継続で妥当です。",
      },
    ],
  },
  "legacy-token": {
    title: "Stale Token Activity",
    sessionId: "827ac974-1533-4977-aea6-f5474992d729",
    statusKey: "paused",
    ownerAnalystId: "hasegawa",
    customer: "ガンマ製薬",
    product: "sentinel",
    updatedAt: "2026/07/15 11:28",
    messages: [
      {
        role: "user",
        analystId: "hasegawa",
        time: "11:25",
        text: "古いトークンによるAPIアクセスが見えています。利用部門の確認待ちにしたいです。",
      },
      {
        role: "claude",
        time: "11:28",
        text: "確認待ちの間は、同じトークンの利用頻度、対象API、失効済みアプリとの関連を監視してください。",
      },
    ],
  },
  "legacy-inbox": {
    title: "Shared Inbox Rule Review",
    sessionId: "49c1a358-a8a5-46c6-b314-8432aa7c4ec5",
    statusKey: "reviewing",
    ownerAnalystId: "fujiwara",
    customer: "デルタ興業",
    product: "mde",
    updatedAt: "2026/07/12 13:44",
    messages: [
      {
        role: "user",
        analystId: "fujiwara",
        time: "13:41",
        text: "共有メールボックスのルール変更がありました。通常運用かどうか確認します。",
      },
      {
        role: "claude",
        time: "13:44",
        text: "変更者、承認チケット、転送先、ルール条件、同時刻の管理者操作を並べて確認すると判断しやすくなります。",
      },
    ],
  },
};

// Order of sessions shown in the sidebar's "最近のセッション" list. Sessions not
// listed here still exist in `sessions` and remain reachable via session search.
const RECENT_SESSION_ORDER = [
  "fastapi",
  "sqlite",
  "stream",
  "client",
  "oauth",
  "impossible-device",
  "mail-forwarding",
  "risky-user",
  "admin-role",
  "data-download",
];

const SESSION_ICON_SVG = `
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 19 17.5h-5.5L9 21v-3.5H5A1.5 1.5 0 0 1 3.5 16V6A1.5 1.5 0 0 1 5 4.5Z"></path>
    <path d="M7.5 9h9M7.5 12.5H14"></path>
  </svg>
`;

// ============================================================
// DOM要素の参照
// ============================================================

const messageList = document.querySelector("#message-list");
const conversationTitle = document.querySelector("#conversation-title");
const openRenameSessionButton = document.querySelector("#open-rename-session");
const closeRenameSessionButton = document.querySelector("#close-rename-session");
const renameSessionOverlay = document.querySelector("#rename-session-overlay");
const renameSessionForm = document.querySelector("#rename-session-form");
const renameSessionInput = document.querySelector("#rename-session-input");
const renameSessionCancelButton = document.querySelector("#rename-session-cancel");
const renameSessionStatus = document.querySelector("#rename-session-status");
const caseStatusOptions = document.querySelector("#case-status-options");
const sessionId = document.querySelector("#session-id");
const sessionCustomer = document.querySelector("#session-customer");
const sessionProduct = document.querySelector("#session-product");
const updatedAt = document.querySelector("#updated-at");
const sessionListContainer = document.querySelector("#session-list");
const statusFilterButtons = document.querySelectorAll(".status-filter-button");
const visibleSessionCount = document.querySelector("#visible-session-count");
const openSessionSearchButton = document.querySelector("#open-session-search");
const closeSessionSearchButton = document.querySelector("#close-session-search");
const sessionSearchOverlay = document.querySelector("#session-search-overlay");
const sessionSearchInput = document.querySelector("#session-search-input");
const sessionSearchStatus = document.querySelector("#session-search-status");
const sessionSearchOwner = document.querySelector("#session-search-owner");
const sessionSearchDateFrom = document.querySelector("#session-search-date-from");
const sessionSearchDateTo = document.querySelector("#session-search-date-to");
const sessionSearchSubmit = document.querySelector("#session-search-submit");
const sessionSearchClear = document.querySelector("#session-search-clear");
const sessionSearchResults = document.querySelector("#session-search-results");
const sessionSearchCount = document.querySelector("#session-search-count");
const openNewInvestigationButton = document.querySelector("#open-new-investigation");
const closeNewInvestigationButton = document.querySelector("#close-new-investigation");
const newInvestigationCancelButton = document.querySelector("#new-investigation-cancel");
const newInvestigationOverlay = document.querySelector("#new-investigation-overlay");
const investigationMethods = document.querySelectorAll(".investigation-method");
const investigationPanels = document.querySelectorAll(".investigation-panel");
const incidentUrlInput = document.querySelector("#incident-url-input");
const investigationCustomerSelect = document.querySelector("#investigation-customer-select");
const incidentProductSelect = document.querySelector("#incident-product-select");
const incidentIdInput = document.querySelector("#incident-id-input");
const detectedProduct = document.querySelector("#detected-product");
const investigationPreviewCustomer = document.querySelector("#investigation-preview-customer");
const investigationPreviewMethod = document.querySelector("#investigation-preview-method");
const investigationPreviewProduct = document.querySelector("#investigation-preview-product");
const investigationPreviewAnalyst = document.querySelector("#investigation-preview-analyst");
const newInvestigationStatus = document.querySelector("#new-investigation-status");
const startInvestigationButton = document.querySelector("#start-investigation");
const openSettingsButton = document.querySelector("#open-settings");
const closeSettingsButton = document.querySelector("#close-settings");
const settingsCancelButton = document.querySelector("#settings-cancel");
const settingsSaveButton = document.querySelector("#settings-save");
const settingsOverlay = document.querySelector("#settings-overlay");
const settingsSaveStatus = document.querySelector("#settings-save-status");
const settingsCurrentAnalyst = document.querySelector("#settings-current-analyst");
const settingsNavButtons = document.querySelectorAll(".settings-nav-button");
const settingsPanels = document.querySelectorAll(".settings-panel");
const analystRoster = document.querySelector("#analyst-roster");
const settingsAnalystList = document.querySelector("#settings-analyst-list");
const visibilityToggleButton = document.querySelector("#visibility-toggle-button");
const attachFileButton = document.querySelector("#attach-file-button");
const analystEditor = document.querySelector("#analyst-editor");
const analystEditKey = document.querySelector("#analyst-edit-key");
const analystEditorTitle = document.querySelector("#analyst-editor-title");
const analystNameInput = document.querySelector("#analyst-name-input");
const analystRoleSelect = document.querySelector("#analyst-role-select");
const analystEditorReset = document.querySelector("#analyst-editor-reset");
const analystEditorSubmit = document.querySelector("#analyst-editor-submit");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-button");
const currentAnalystAvatar = document.querySelector("#current-analyst-avatar");
const currentAnalystName = document.querySelector("#current-analyst-name");
const currentAnalystRole = document.querySelector("#current-analyst-role");
const headerUserAvatar = document.querySelector("#header-user-avatar");
const headerUserName = document.querySelector("#header-user-name");
const headerWorkStatus = document.querySelector("#header-work-status");
const headerWorkStatusButton = document.querySelector("#header-work-status-button");
const headerWorkStatusDot = document.querySelector("#header-work-status-dot");
const headerWorkStatusLabel = document.querySelector("#header-work-status-label");
const workStatusPopover = document.querySelector("#work-status-popover");
const runStatusDot = document.querySelector("#run-status-dot");
const runStatusLabel = document.querySelector("#run-status-label");
const runStatusText = document.querySelector("#run-status-text");

// ============================================================
// 状態（現在選択中のセッション・担当者・フィルタなど）
// ============================================================

let activeSessionKey = "fastapi";
let activeAnalystKey = "tanaka";
let activeStatusFilter = "all";
let activeInvestigationMethod = "url";
let sessionButtons = [];

// ============================================================
// メッセージ一覧の描画
// ============================================================

function getMessageAuthor(message) {
  if (message.role === "claude") {
    return {
      name: "Claude",
      avatar: "C",
    };
  }

  const analyst = analysts[message.analystId] ?? analysts[activeAnalystKey];
  return {
    name: analyst.name,
    avatar: analyst.avatar,
  };
}

function createMessageElement(message) {
  const author = getMessageAuthor(message);
  const article = document.createElement("article");
  article.className = `message is-${message.role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = author.avatar;

  const body = document.createElement("div");
  body.className = "message-body";
  body.innerHTML = `
    <div class="message-header">
      <span>${author.name}</span>
      <span class="message-time">${message.time}</span>
    </div>
    <p>${message.text}</p>
  `;

  if (message.code) {
    const codePreview = document.createElement("div");
    codePreview.className = "code-preview";
    codePreview.innerHTML = `
      <div class="code-preview-header">
        <span>API sketch</span>
        <span>Draft</span>
      </div>
      <pre>${message.code}</pre>
    `;
    body.appendChild(codePreview);
  }

  article.appendChild(avatar);
  article.appendChild(body);
  return article;
}

// ============================================================
// セッション詳細（右パネル）・サイドバー一覧・ステータス表示
// ============================================================

function renderSessionCustomer(customerName) {
  if (customerName) {
    sessionCustomer.textContent = customerName;
    sessionCustomer.classList.remove("is-unset");
  } else {
    sessionCustomer.textContent = "未設定";
    sessionCustomer.classList.add("is-unset");
  }
}

function renderSessionProduct(productKey) {
  const product = products[productKey];

  if (!product) {
    sessionProduct.innerHTML = '<span class="product-badge is-unset">未設定</span>';
    return;
  }

  sessionProduct.innerHTML = `<span class="product-badge ${product.className}">${product.label}</span>`;
}

function renderSession(sessionKey) {
  const session = sessions[sessionKey];
  activeSessionKey = sessionKey;
  conversationTitle.textContent = session.title;
  renderCaseStatusOptions(session.statusKey);
  sessionId.textContent = session.sessionId;
  renderSessionCustomer(session.customer);
  renderSessionProduct(session.product);
  renderSessionOwner(session.ownerAnalystId);
  updatedAt.textContent = session.updatedAt;
  renderTitleEditAccess();
  renderVisibilityBadge();
  renderComposerAccess();
  messageList.innerHTML = "";

  for (const message of session.messages) {
    messageList.appendChild(createMessageElement(message));
  }

  messageList.scrollTop = messageList.scrollHeight;
}

function renderCaseStatusOptions(statusKey) {
  const owned = isOwnSession(activeSessionKey);

  for (const button of caseStatusOptions.querySelectorAll(".case-status-option")) {
    const isActive = button.dataset.statusOption === statusKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = !owned;
  }
}

function renderSidebarSessionList() {
  sessionListContainer.innerHTML = "";

  for (const sessionKey of RECENT_SESSION_ORDER) {
    const session = sessions[sessionKey];
    const status = caseStatuses[session.statusKey];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "session-item";
    button.classList.toggle("is-owned", session.ownerAnalystId === activeAnalystKey);
    button.dataset.session = sessionKey;
    button.innerHTML = `
      <span class="session-icon" aria-hidden="true">${SESSION_ICON_SVG}</span>
      <span class="session-title">${session.title}</span>
      <span class="session-meta">
        <span class="session-status ${status.className}">${status.label}</span>
        <span class="session-time">${session.sidebarTimeLabel}</span>
      </span>
    `;
    sessionListContainer.appendChild(button);
  }

  sessionButtons = document.querySelectorAll(".session-item");
}

function renderSessionStatusBadge(sessionKey) {
  const session = sessions[sessionKey];
  const status = caseStatuses[session.statusKey];
  const button = document.querySelector(`[data-session="${sessionKey}"]`);
  const badge = button?.querySelector(".session-status");

  if (!badge) {
    return;
  }

  badge.textContent = status.label;
  badge.className = `session-status ${status.className}`;
}

function renderOwnedSessionIcons() {
  for (const button of sessionButtons) {
    const session = sessions[button.dataset.session];
    button.classList.toggle("is-owned", session.ownerAnalystId === activeAnalystKey);
  }
}

function countSessionsByStatus() {
  const counts = {
    all: 0,
  };

  for (const statusKey of Object.keys(caseStatuses)) {
    counts[statusKey] = 0;
  }

  for (const button of sessionButtons) {
    const session = sessions[button.dataset.session];

    if (!isSessionVisibleToCurrentUser(session)) {
      continue;
    }

    counts.all += 1;
    counts[session.statusKey] += 1;
  }

  return counts;
}

function renderStatusCounts() {
  const counts = countSessionsByStatus();

  for (const [statusKey, count] of Object.entries(counts)) {
    const countElement = document.querySelector(`[data-status-count="${statusKey}"]`);

    if (countElement) {
      countElement.textContent = String(count);
    }
  }
}

function renderSessionFilter() {
  let visibleCount = 0;

  for (const button of sessionButtons) {
    const session = sessions[button.dataset.session];
    const matchesStatus = activeStatusFilter === "all" || session.statusKey === activeStatusFilter;
    const shouldShow = matchesStatus && isSessionVisibleToCurrentUser(session);
    button.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  }

  visibleSessionCount.textContent = String(visibleCount);

  for (const button of statusFilterButtons) {
    button.classList.toggle("is-active", button.dataset.statusFilter === activeStatusFilter);
  }
}

// ============================================================
// ログイン中の担当者表示・セッション担当者表示・担当者マスタ管理
// ============================================================

function renderAnalyst() {
  const analyst = analysts[activeAnalystKey];
  settingsCurrentAnalyst.textContent = `${analyst.name} / ${analyst.role}`;
  headerUserAvatar.textContent = analyst.avatar;
  headerUserName.textContent = analyst.name;

  renderHeaderWorkStatus();
  renderWorkStatusMenu();
  renderSessionFilter();
  renderStatusCounts();
  renderOwnedSessionIcons();
  renderCaseStatusOptions(sessions[activeSessionKey].statusKey);
  renderComposerAccess();
  renderVisibilityBadge();
  renderSessionSearchResults();
}

function getActiveWorkStatus() {
  const analyst = analysts[activeAnalystKey];
  return workStatuses[analyst.workStatus] ?? workStatuses.office;
}

function renderHeaderWorkStatus() {
  const status = getActiveWorkStatus();
  headerWorkStatusButton.className = `header-work-status-button ${status.className}`;
  headerWorkStatusDot.className = `work-status-dot ${status.className}`;
  headerWorkStatusLabel.textContent = status.label;
}

function renderWorkStatusMenu() {
  const activeStatusKey = analysts[activeAnalystKey].workStatus;
  workStatusPopover.innerHTML = "";

  for (const [statusKey, status] of Object.entries(workStatuses)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `work-status-option ${status.className}`;
    button.classList.toggle("is-active", statusKey === activeStatusKey);
    button.dataset.workStatus = statusKey;
    button.setAttribute("role", "menuitem");
    button.innerHTML = `
      <span class="work-status-dot ${status.className}" aria-hidden="true"></span>
      <strong>${status.label}</strong>
    `;
    workStatusPopover.appendChild(button);
  }
}

function openWorkStatusMenu() {
  workStatusPopover.hidden = false;
  headerWorkStatusButton.setAttribute("aria-expanded", "true");
}

function closeWorkStatusMenu() {
  workStatusPopover.hidden = true;
  headerWorkStatusButton.setAttribute("aria-expanded", "false");
}

function toggleWorkStatusMenu() {
  if (workStatusPopover.hidden) {
    openWorkStatusMenu();
    return;
  }

  closeWorkStatusMenu();
}

function updateActiveWorkStatus(statusKey) {
  if (!workStatuses[statusKey]) {
    return;
  }

  analysts[activeAnalystKey].workStatus = statusKey;
  renderHeaderWorkStatus();
  renderWorkStatusMenu();
  renderAnalystRoster();
  closeWorkStatusMenu();
}

function renderSessionOwner(ownerAnalystId) {
  const analyst = analysts[ownerAnalystId];

  if (!analyst) {
    currentAnalystAvatar.textContent = "?";
    currentAnalystName.textContent = "未設定";
    currentAnalystRole.textContent = "担当者情報が見つかりません";
    return;
  }

  currentAnalystAvatar.textContent = analyst.avatar;
  currentAnalystName.textContent = analyst.name;
  currentAnalystRole.textContent = `${analyst.role}${analyst.disabled ? " / 無効" : ""}`;
}

function getAnalystInitial(name) {
  return name.trim().slice(0, 1).toUpperCase() || "A";
}

function createAnalystKey(name) {
  const baseKey = `analyst-${Date.now()}`;
  const initial = getAnalystInitial(name);
  return `${baseKey}-${initial}`;
}

function getActiveAnalysts() {
  return Object.entries(analysts).filter(([, analyst]) => !analyst.disabled);
}

function renderAnalystRoster() {
  analystRoster.innerHTML = "";

  for (const [analystKey, analyst] of getActiveAnalysts()) {
    const workStatus = workStatuses[analyst.workStatus] ?? workStatuses.office;
    const row = document.createElement("div");
    row.className = "analyst-record";
    row.classList.toggle("is-login-user", analystKey === activeAnalystKey);
    row.setAttribute("role", "listitem");
    row.innerHTML = `
      <span>${analyst.avatar}</span>
      <strong>${analyst.name}</strong>
      <em>${analyst.role}</em>
      <small class="work-status ${workStatus.className}">${workStatus.label}</small>
    `;
    analystRoster.appendChild(row);
  }
}

function resetAnalystEditor() {
  analystEditKey.value = "";
  analystNameInput.value = "";
  analystRoleSelect.value = "Tier2";
  analystEditorTitle.textContent = "新規追加";
  analystEditorSubmit.textContent = "追加";
}

function renderSettingsAnalystList() {
  settingsAnalystList.innerHTML = "";

  for (const [analystKey, analyst] of Object.entries(analysts)) {
    const row = document.createElement("div");
    row.className = "settings-analyst-row";
    row.classList.toggle("is-disabled", Boolean(analyst.disabled));
    row.innerHTML = `
      <span class="settings-analyst-avatar">${analyst.avatar}</span>
      <span class="settings-analyst-name">
        <strong>${analyst.name}</strong>
        <span>${analyst.role}</span>
      </span>
      <span class="settings-analyst-status">${analyst.disabled ? "無効" : "有効"}</span>
      <span class="settings-analyst-actions">
        <button type="button" data-analyst-action="edit" data-analyst-key="${analystKey}">変更</button>
        <button type="button" class="is-danger" data-analyst-action="disable" data-analyst-key="${analystKey}" ${analyst.disabled ? "disabled" : ""}>削除</button>
      </span>
    `;
    settingsAnalystList.appendChild(row);
  }
}

function renderAnalystManagement() {
  renderAnalystRoster();
  renderAnalyst();
  renderSessionOwner(sessions[activeSessionKey].ownerAnalystId);
  renderSettingsAnalystList();
  renderInvestigationPreview();
}

function chooseFallbackAnalyst() {
  const firstActiveAnalyst = getActiveAnalysts()[0];

  if (firstActiveAnalyst) {
    activeAnalystKey = firstActiveAnalyst[0];
  }
}

// ============================================================
// 新しい調査ダイアログ
// ============================================================

function getProductLabel(productKey) {
  const productLabels = {
    mde: "Microsoft Defender for Endpoint (MDE)",
    sentinelone: "SentinelOne",
    crowdstrike: "CrowdStrike",
  };

  return productLabels[productKey] ?? "未判定";
}

function inferProductFromUrl(url) {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes("security.microsoft.com") || normalizedUrl.includes("defender.microsoft.com")) {
    return "mde";
  }

  if (normalizedUrl.includes("sentinelone") || normalizedUrl.includes("sentinelone.net")) {
    return "sentinelone";
  }

  if (normalizedUrl.includes("crowdstrike") || normalizedUrl.includes("falcon")) {
    return "crowdstrike";
  }

  return "";
}

function getInvestigationProductKey() {
  if (activeInvestigationMethod === "blank") {
    return "";
  }

  if (activeInvestigationMethod === "id") {
    return incidentProductSelect.value;
  }

  return inferProductFromUrl(incidentUrlInput.value.trim());
}

function renderInvestigationMethod(methodKey) {
  activeInvestigationMethod = methodKey;

  for (const button of investigationMethods) {
    const isActive = button.dataset.investigationMethod === methodKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }

  for (const panel of investigationPanels) {
    panel.classList.toggle("is-active", panel.dataset.investigationPanel === methodKey);
  }

  renderInvestigationPreview();
}

function renderInvestigationPreview() {
  const productKey = getInvestigationProductKey();
  const productLabel = getProductLabel(productKey);
  const customer = customers[investigationCustomerSelect.value];
  const analyst = analysts[activeAnalystKey];
  const methodLabels = {
    blank: "空で開始",
    url: "URLから開始",
    id: "製品とIDから開始",
  };

  investigationPreviewCustomer.textContent = customer?.name ?? "未選択";
  investigationPreviewMethod.textContent = methodLabels[activeInvestigationMethod];
  investigationPreviewProduct.textContent = activeInvestigationMethod === "blank" ? "未指定" : productLabel;
  investigationPreviewAnalyst.textContent = analyst.name;
  detectedProduct.textContent = activeInvestigationMethod === "url" ? productLabel : "URLから開始する場合に推測します";
}

function resetNewInvestigationForm() {
  investigationCustomerSelect.value = "";
  incidentUrlInput.value = "";
  incidentProductSelect.value = "mde";
  incidentIdInput.value = "";
  newInvestigationStatus.textContent = "入力内容をもとに調査セッションを作成します";
  renderInvestigationMethod("url");
}

function openNewInvestigation() {
  newInvestigationOverlay.hidden = false;
  renderInvestigationPreview();
  investigationCustomerSelect.focus();
}

function closeNewInvestigation() {
  newInvestigationOverlay.hidden = true;
}

function createMockSessionKey() {
  return `investigation-${Date.now()}`;
}

function createMockSessionId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `mock-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function startInvestigation() {
  const productKey = getInvestigationProductKey();
  const customer = customers[investigationCustomerSelect.value];

  if (!customer) {
    newInvestigationStatus.textContent = "顧客を選択してください。";
    investigationCustomerSelect.focus();
    return;
  }

  if (activeInvestigationMethod === "url" && !productKey) {
    newInvestigationStatus.textContent = "製品を推測できません。製品とIDから開始してください。";
    return;
  }

  if (activeInvestigationMethod === "id" && !incidentIdInput.value.trim()) {
    newInvestigationStatus.textContent = "インシデントIDを入力してください。";
    incidentIdInput.focus();
    return;
  }

  const productLabel = getProductLabel(productKey);
  const isBlankInvestigation = activeInvestigationMethod === "blank";
  const sourceLabel = activeInvestigationMethod === "url" ? "URL" : `ID: ${incidentIdInput.value.trim()}`;
  const sessionTitle = isBlankInvestigation ? `${customer.name} investigation` : `${customer.name} ${productLabel} investigation`;
  const userMessage = isBlankInvestigation
    ? `${customer.name} の調査として、まだ製品やインシデント情報は指定せず、新しい調査セッションを開始します。`
    : `${customer.name} の ${productLabel} ${sourceLabel} から新しい調査を開始します。`;
  const claudeMessage = isBlankInvestigation
    ? "新しい調査セッションを開始しました。調査対象が分かり次第、URL、製品名、インシデントID、気になっている事象のいずれかを入力してください。"
    : "調査対象を受け取りました。対象製品から取得すべき概要、主要エンティティ、初動確認の観点を整理します。";
  const now = getCurrentTime();
  const newSessionKey = createMockSessionKey();

  sessions[newSessionKey] = {
    title: sessionTitle,
    sessionId: createMockSessionId(),
    statusKey: "new",
    ownerAnalystId: activeAnalystKey,
    customer: customer.name,
    product: productKey,
    sidebarTimeLabel: `今日 ${now}`,
    updatedAt: `2026/07/29 ${now}`,
    messages: [
    {
      role: "user",
      analystId: activeAnalystKey,
      time: now,
      text: userMessage,
    },
    {
      role: "claude",
      time: now,
      text: claudeMessage,
    },
    ],
  };

  RECENT_SESSION_ORDER.unshift(newSessionKey);
  activeStatusFilter = "all";
  renderSidebarSessionList();
  setActiveButton(newSessionKey);
  renderSession(newSessionKey);
  renderStatusCounts();
  renderSessionFilter();
  renderSessionSearchResults();
  closeNewInvestigation();
  resetNewInvestigationForm();
}

// ============================================================
// セッション検索ダイアログ
// ============================================================

function getSessionOwner(session) {
  const analyst = analysts[session.ownerAnalystId] ?? analysts.tanaka;

  return analyst.name;
}

function renderSessionSearchOwnerOptions() {
  for (const [analystKey, analyst] of Object.entries(analysts)) {
    const option = document.createElement("option");
    option.value = analystKey;
    option.textContent = analyst.name;
    sessionSearchOwner.appendChild(option);
  }
}

function getSessionSearchText(session) {
  return [
    session.title,
    session.sessionId,
    caseStatuses[session.statusKey].label,
    getSessionOwner(session),
  ].join(" ").toLowerCase();
}

function getSessionDateValue(session) {
  return session.updatedAt.slice(0, 10).replace(/\//g, "-");
}

function renderSessionSearchResults() {
  const query = sessionSearchInput.value.trim().toLowerCase();
  const statusKey = sessionSearchStatus.value;
  const ownerKey = sessionSearchOwner.value;
  const dateFrom = sessionSearchDateFrom.value;
  const dateTo = sessionSearchDateTo.value;
  const matchedSessions = Object.entries(sessions).filter(([, session]) => {
    const sessionDate = getSessionDateValue(session);
    const matchesStatus = statusKey === "all" || session.statusKey === statusKey;
    const matchesOwner = ownerKey === "all" || session.ownerAnalystId === ownerKey;
    const matchesQuery = !query || getSessionSearchText(session).includes(query);
    const matchesDateFrom = !dateFrom || sessionDate >= dateFrom;
    const matchesDateTo = !dateTo || sessionDate <= dateTo;

    return (
      matchesStatus &&
      matchesOwner &&
      matchesQuery &&
      matchesDateFrom &&
      matchesDateTo &&
      isSessionVisibleToCurrentUser(session)
    );
  });

  sessionSearchCount.textContent = String(matchedSessions.length);
  sessionSearchResults.innerHTML = "";

  if (matchedSessions.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "session-result-empty";
    emptyMessage.textContent = "条件に一致するセッションはありません。";
    sessionSearchResults.appendChild(emptyMessage);
    return;
  }

  for (const [sessionKey, session] of matchedSessions) {
    const status = caseStatuses[session.statusKey];
    const resultButton = document.createElement("button");
    resultButton.type = "button";
    resultButton.className = "session-result";
    resultButton.classList.toggle("is-active", sessionKey === activeSessionKey);
    resultButton.dataset.sessionResult = sessionKey;
    resultButton.innerHTML = `
      <span class="session-result-title">
        <strong>${session.title}</strong>
        <span>${getSessionOwner(session)}</span>
      </span>
      <span class="session-status ${status.className}">${status.label}</span>
      <span class="session-result-time">${session.updatedAt}</span>
      <span class="session-result-id">${session.sessionId}</span>
    `;

    resultButton.addEventListener("click", () => {
      setActiveButton(sessionKey);
      renderSession(sessionKey);
      closeSessionSearch();
    });

    sessionSearchResults.appendChild(resultButton);
  }
}

function openSessionSearch() {
  sessionSearchOverlay.hidden = false;
  renderSessionSearchResults();
  sessionSearchInput.focus();
}

function closeSessionSearch() {
  sessionSearchOverlay.hidden = true;
}

// ============================================================
// 設定ダイアログ
// ============================================================

function renderSettingsTab(tabKey) {
  for (const button of settingsNavButtons) {
    button.classList.toggle("is-active", button.dataset.settingsTab === tabKey);
  }

  for (const panel of settingsPanels) {
    panel.classList.toggle("is-active", panel.dataset.settingsPanel === tabKey);
  }
}

function openSettings() {
  settingsOverlay.hidden = false;
  settingsSaveStatus.textContent = "未保存の変更はありません";
  renderSettingsTab("general");
}

function closeSettings() {
  settingsOverlay.hidden = true;
}

// ============================================================
// 公開範囲トグル・投稿権限（所有者のみ操作可能にする一連のロジック）
// ============================================================

const visibilityIcons = {
  public:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 12S6.5 6 12 6s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>',
  private:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>',
};

const sendButtonIcons = {
  enabled:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12 20 4l-4.8 16-3.1-6.1L4 12Z"></path><path d="m12.1 13.9 3.2-3.2"></path></svg>',
  disabled:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>',
};

function isOwnSession(sessionKey) {
  return sessions[sessionKey].ownerAnalystId === activeAnalystKey;
}

function isSessionVisibleToCurrentUser(session) {
  return !session.isPrivate || session.ownerAnalystId === activeAnalystKey;
}

function renderVisibilityBadge() {
  const session = sessions[activeSessionKey];
  const owned = isOwnSession(activeSessionKey);
  const isPrivate = Boolean(session.isPrivate);

  visibilityToggleButton.classList.toggle("is-public", !isPrivate);
  visibilityToggleButton.classList.toggle("is-private", isPrivate);
  visibilityToggleButton.disabled = !owned;
  visibilityToggleButton.innerHTML = `${isPrivate ? visibilityIcons.private : visibilityIcons.public}${
    isPrivate ? "非公開" : "公開"
  }`;
}

function toggleSessionVisibility() {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  sessions[activeSessionKey].isPrivate = !sessions[activeSessionKey].isPrivate;
  renderVisibilityBadge();
  renderSessionFilter();
  renderStatusCounts();
  renderSessionSearchResults();
}

function renderComposerAccess() {
  const owned = isOwnSession(activeSessionKey);

  chatInput.disabled = !owned;
  attachFileButton.disabled = !owned;
  sendButton.disabled = !owned;
  sendButton.innerHTML = `${owned ? sendButtonIcons.enabled : sendButtonIcons.disabled}送信`;
  chatInput.placeholder = owned ? "Claudeに質問する" : "他の担当者のセッションのため閲覧のみです";
}

// ============================================================
// セッションタイトル変更（所有者のみ）
// ============================================================

function renderTitleEditAccess() {
  const owned = isOwnSession(activeSessionKey);
  openRenameSessionButton.disabled = !owned;
  openRenameSessionButton.title = owned ? "セッションタイトルを変更" : "他の担当者のセッションは変更できません";
}

function openRenameSession() {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  renameSessionInput.value = sessions[activeSessionKey].title;
  renameSessionStatus.textContent = "自分のセッションだけタイトルを変更できます。";
  renameSessionStatus.classList.remove("is-error");
  renameSessionOverlay.hidden = false;
  renameSessionInput.focus();
  renameSessionInput.select();
}

function closeRenameSession() {
  renameSessionOverlay.hidden = true;
}

function renameActiveSession(newTitle) {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  const title = newTitle.trim();

  if (!title) {
    renameSessionStatus.textContent = "タイトルを入力してください。";
    renameSessionStatus.classList.add("is-error");
    renameSessionInput.focus();
    return;
  }

  sessions[activeSessionKey].title = title;
  sessions[activeSessionKey].updatedAt = `2026/07/29 ${getCurrentTime()}`;
  renderSidebarSessionList();
  setActiveButton(activeSessionKey);
  renderSession(activeSessionKey);
  renderStatusCounts();
  renderSessionFilter();
  renderSessionSearchResults();
  closeRenameSession();
}

// ============================================================
// 実行ステータス（待機中/問い合わせ中/保存中）表示
// ============================================================

function setRunStatus(status) {
  runStatusDot.className = "";

  if (status === "running") {
    runStatusDot.classList.add("is-running");
    runStatusLabel.textContent = "Claudeに問い合わせ中";
    runStatusText.textContent = "選択中の調査担当者として質問を送信しています。";
    return;
  }

  if (status === "saving") {
    runStatusDot.classList.add("is-saving");
    runStatusLabel.textContent = "保存中";
    runStatusText.textContent = "Claudeの返答と担当者情報を会話履歴へ保存しています。";
    return;
  }

  runStatusLabel.textContent = "待機中";
  runStatusText.textContent = "入力を送信するとClaudeへの問い合わせを開始します。";
}

function setActiveButton(sessionKey) {
  for (const button of sessionButtons) {
    button.classList.toggle("is-active", button.dataset.session === sessionKey);
  }
}

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

// ============================================================
// イベントリスナー
// ============================================================

for (const button of statusFilterButtons) {
  button.addEventListener("click", () => {
    activeStatusFilter = button.dataset.statusFilter;
    renderSessionFilter();
  });
}

sessionListContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".session-item");

  if (!button) {
    return;
  }

  const sessionKey = button.dataset.session;
  setActiveButton(sessionKey);
  renderSession(sessionKey);
});

openSessionSearchButton.addEventListener("click", openSessionSearch);
closeSessionSearchButton.addEventListener("click", closeSessionSearch);
sessionSearchSubmit.addEventListener("click", renderSessionSearchResults);
sessionSearchClear.addEventListener("click", () => {
  sessionSearchInput.value = "";
  sessionSearchStatus.value = "all";
  sessionSearchOwner.value = "all";
  sessionSearchDateFrom.value = "";
  sessionSearchDateTo.value = "";
  renderSessionSearchResults();
});

openNewInvestigationButton.addEventListener("click", openNewInvestigation);
closeNewInvestigationButton.addEventListener("click", closeNewInvestigation);
newInvestigationCancelButton.addEventListener("click", closeNewInvestigation);
startInvestigationButton.addEventListener("click", startInvestigation);
investigationCustomerSelect.addEventListener("change", renderInvestigationPreview);
incidentUrlInput.addEventListener("input", renderInvestigationPreview);
incidentProductSelect.addEventListener("change", renderInvestigationPreview);
incidentIdInput.addEventListener("input", renderInvestigationPreview);

for (const button of investigationMethods) {
  button.addEventListener("click", () => {
    renderInvestigationMethod(button.dataset.investigationMethod);
  });
}

for (const panel of investigationPanels) {
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
    startInvestigation();
  });
}

openRenameSessionButton.addEventListener("click", openRenameSession);
closeRenameSessionButton.addEventListener("click", closeRenameSession);
renameSessionCancelButton.addEventListener("click", closeRenameSession);
renameSessionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renameActiveSession(renameSessionInput.value);
});

openSettingsButton.addEventListener("click", openSettings);
closeSettingsButton.addEventListener("click", closeSettings);
settingsCancelButton.addEventListener("click", closeSettings);
settingsSaveButton.addEventListener("click", () => {
  settingsSaveStatus.textContent = "設定を保存しました";
});

headerWorkStatusButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleWorkStatusMenu();
});

workStatusPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-work-status]");

  if (!button) {
    return;
  }

  updateActiveWorkStatus(button.dataset.workStatus);
});

for (const button of settingsNavButtons) {
  button.addEventListener("click", () => {
    renderSettingsTab(button.dataset.settingsTab);
  });
}

settingsAnalystList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-analyst-action]");

  if (!button) {
    return;
  }

  const analystKey = button.dataset.analystKey;
  const analyst = analysts[analystKey];

  if (button.dataset.analystAction === "edit") {
    analystEditKey.value = analystKey;
    analystNameInput.value = analyst.name;
    analystRoleSelect.value = analyst.role;
    analystEditorTitle.textContent = "担当者を変更";
    analystEditorSubmit.textContent = "変更を保存";
    analystNameInput.focus();
    return;
  }

  if (getActiveAnalysts().length <= 1) {
    settingsSaveStatus.textContent = "有効な担当者は1名以上必要です";
    return;
  }

  analyst.disabled = true;

  if (activeAnalystKey === analystKey) {
    chooseFallbackAnalyst();
  }

  settingsSaveStatus.textContent = `${analyst.name} を削除しました。過去の履歴には残ります。`;
  resetAnalystEditor();
  renderAnalystManagement();
});

analystEditor.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = analystNameInput.value.trim();

  if (!name) {
    settingsSaveStatus.textContent = "担当者名を入力してください";
    analystNameInput.focus();
    return;
  }

  const role = analystRoleSelect.value;
  const editingKey = analystEditKey.value;

  if (editingKey) {
    analysts[editingKey].name = name;
    analysts[editingKey].shortName = name;
    analysts[editingKey].avatar = getAnalystInitial(name);
    analysts[editingKey].role = role;
    settingsSaveStatus.textContent = `${name} の変更を保存しました`;
  } else {
    const analystKey = createAnalystKey(name);
    analysts[analystKey] = {
      name,
      shortName: name,
      avatar: getAnalystInitial(name),
      role,
      workStatus: "office",
    };
    settingsSaveStatus.textContent = `${name} を追加しました`;
  }

  resetAnalystEditor();
  renderAnalystManagement();
});

analystEditorReset.addEventListener("click", () => {
  resetAnalystEditor();
  settingsSaveStatus.textContent = "新規入力に戻しました";
});

sessionSearchOverlay.addEventListener("click", (event) => {
  if (event.target === sessionSearchOverlay) {
    closeSessionSearch();
  }
});

settingsOverlay.addEventListener("click", (event) => {
  if (event.target === settingsOverlay) {
    closeSettings();
  }
});

newInvestigationOverlay.addEventListener("click", (event) => {
  if (event.target === newInvestigationOverlay) {
    closeNewInvestigation();
  }
});

renameSessionOverlay.addEventListener("click", (event) => {
  if (event.target === renameSessionOverlay) {
    closeRenameSession();
  }
});

document.addEventListener("click", (event) => {
  if (!headerWorkStatus.contains(event.target)) {
    closeWorkStatusMenu();
  }
});

visibilityToggleButton.addEventListener("click", toggleSessionVisibility);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !workStatusPopover.hidden) {
    closeWorkStatusMenu();
  }

  if (event.key === "Escape" && !sessionSearchOverlay.hidden) {
    closeSessionSearch();
  }

  if (event.key === "Escape" && !newInvestigationOverlay.hidden) {
    closeNewInvestigation();
  }

  if (event.key === "Escape" && !settingsOverlay.hidden) {
    closeSettings();
  }

  if (event.key === "Escape" && !renameSessionOverlay.hidden) {
    closeRenameSession();
  }

  if (event.key === "Enter" && !sessionSearchOverlay.hidden) {
    renderSessionSearchResults();
  }

  if (event.key === "Enter" && !newInvestigationOverlay.hidden) {
    startInvestigation();
  }
});

caseStatusOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".case-status-option");

  if (!button || !isOwnSession(activeSessionKey)) {
    return;
  }

  sessions[activeSessionKey].statusKey = button.dataset.statusOption;
  renderSession(activeSessionKey);
  renderSessionStatusBadge(activeSessionKey);
  renderStatusCounts();
  renderSessionFilter();
  renderSessionSearchResults();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  const text = chatInput.value.trim();
  if (!text) {
    return;
  }

  const session = sessions[activeSessionKey];
  const currentTime = getCurrentTime();
  session.messages.push({
    role: "user",
    analystId: activeAnalystKey,
    time: currentTime,
    text,
  });

  setRunStatus("running");

  window.setTimeout(() => {
    session.messages.push({
      role: "claude",
      time: getCurrentTime(),
      text: "受け取りました。保存済みの調査履歴と現在の担当者情報を踏まえて、次に確認すべき観点を整理します。",
    });
    session.updatedAt = `2026/07/27 ${getCurrentTime()}`;
    setRunStatus("saving");
    renderSession(activeSessionKey);
    renderSessionSearchResults();

    window.setTimeout(() => {
      setRunStatus("idle");
    }, 700);
  }, 650);

  chatInput.value = "";
  renderSession(activeSessionKey);
});

// ============================================================
// 初期化
// ============================================================

renderSidebarSessionList();
setActiveButton(activeSessionKey);
renderSessionSearchOwnerOptions();
renderAnalystManagement();
renderStatusCounts();
renderSessionFilter();
renderSession(activeSessionKey);
