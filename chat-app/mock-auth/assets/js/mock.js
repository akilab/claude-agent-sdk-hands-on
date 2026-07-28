// ============================================================
// データ: アナリスト・ステータス種別・製品種別・セッション本体
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

const investigationPrompts = {
  summary: {
    title: "調査サマリーを作成",
    description: "現在の状況、確認済み、未確認、次のアクションを整理します。",
    prompt: "この調査セッションの会話履歴と調査メモをもとに、現在の状況、確認済み事項、未確認事項、次のアクションをMarkdownで要約してください。",
  },
  nextSteps: {
    title: "次に確認すべき項目を整理",
    description: "ログ、端末、ユーザー、横展開などの追加確認を洗い出します。",
    prompt: "この調査セッションの現在の会話履歴と調査メモを確認し、次に確認すべき項目を優先度順にMarkdownで整理してください。各項目には、確認理由と期待する判断材料も添えてください。",
  },
  customerReport: {
    title: "顧客向け報告文を下書き",
    description: "顧客に共有しやすい落ち着いた文面へ整えます。",
    prompt: "この調査セッションの内容をもとに、顧客へ共有するための報告文をMarkdownで下書きしてください。断定しすぎず、判明している事実、対応状況、追加確認中の事項、次回報告予定が分かる文面にしてください。",
  },
  containment: {
    title: "封じ込めアクションを整理",
    description: "即時対応、追加確認、監視移行の判断を分けます。",
    prompt: "この調査セッションの内容をもとに、封じ込めアクションをMarkdownで整理してください。即時実施、追加確認後に実施、監視へ移行する条件の3つに分け、運用チームへ渡せる粒度で記載してください。",
  },
  riskReview: {
    title: "未確認リスクを洗い出し",
    description: "クローズ前に残っているリスクや確認漏れを点検します。",
    prompt: "この調査セッションをクローズまたは監視へ移す前提で、未確認リスクと確認漏れの可能性をMarkdownで洗い出してください。重大度、確認方法、放置した場合の影響が分かる形にしてください。",
  },
  closeDecision: {
    title: "クローズ判断を支援",
    description: "クローズ、監視継続、追加確認の判断材料をまとめます。",
    prompt: "この調査セッションの会話履歴と調査メモをもとに、クローズ可能か、監視継続か、追加確認が必要かを判断するための材料をMarkdownで整理してください。結論、根拠、不足情報、推奨ステータスを分けてください。",
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
    notes: [
      {
        text: "MFA成功だが未管理端末。SharePoint閲覧範囲の確認を続ける。",
        createdAt: "2026/07/26 15:56",
        analystId: "tanaka",
      },
      {
        text: "監視中へ移す前に、対象ユーザーのパスワード変更有無を確認。",
        createdAt: "2026/07/26 16:04",
        analystId: "sato",
      },
    ],
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
    notes: [
      {
        text: "PowerShell実行元の端末利用者と直近プロセスを確認する。",
        createdAt: "2026/07/26 14:22",
        analystId: "hayashi",
      },
    ],
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
const currentCaseStatusButton = document.querySelector("#current-case-status-button");
const currentCaseStatusLabel = document.querySelector("#current-case-status-label");
const caseStatusPopover = document.querySelector("#case-status-popover");
const sessionId = document.querySelector("#session-id");
const sessionCustomer = document.querySelector("#session-customer");
const sessionProduct = document.querySelector("#session-product");
const updatedAt = document.querySelector("#updated-at");
const sessionListContainer = document.querySelector("#session-list");
const statusFilterButtons = document.querySelectorAll(".status-filter-button");
const visibleSessionCount = document.querySelector("#visible-session-count");
const refreshRecentSessionsButton = document.querySelector("#refresh-recent-sessions");
const sessionRefreshStatus = document.querySelector("#session-refresh-status");
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
const analystRosterToggle = document.querySelector("#analyst-roster-toggle");
const analystRosterCount = document.querySelector("#analyst-roster-count");
const refreshAnalystRosterButton = document.querySelector("#refresh-analyst-roster");
const analystRosterStatus = document.querySelector("#analyst-roster-status");
const analystRoster = document.querySelector("#analyst-roster");
const settingsAnalystList = document.querySelector("#settings-analyst-list");
const visibilityToggleButton = document.querySelector("#visibility-toggle-button");
const openInvestigationPromptButton = document.querySelector("#open-investigation-prompt");
const closeInvestigationPromptButton = document.querySelector("#close-investigation-prompt");
const investigationPromptOverlay = document.querySelector("#investigation-prompt-overlay");
const investigationPromptList = document.querySelector("#investigation-prompt-list");
const investigationPromptHint = document.querySelector("#investigation-prompt-hint");
const investigationPromptText = document.querySelector("#investigation-prompt-text");
const investigationPromptStatus = document.querySelector("#investigation-prompt-status");
const investigationPromptCancelButton = document.querySelector("#investigation-prompt-cancel");
const sendInvestigationPromptButton = document.querySelector("#send-investigation-prompt");
const attachFileButton = document.querySelector("#attach-file-button");
const attachmentInput = document.querySelector("#attachment-input");
const attachmentTray = document.querySelector("#attachment-tray");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-button");
const currentAnalystAvatar = document.querySelector("#current-analyst-avatar");
const currentAnalystName = document.querySelector("#current-analyst-name");
const currentAnalystRole = document.querySelector("#current-analyst-role");
const headerUser = document.querySelector("#header-user");
const headerUserButton = document.querySelector("#header-user-button");
const headerUserAvatar = document.querySelector("#header-user-avatar");
const headerUserName = document.querySelector("#header-user-name");
const headerUserPopover = document.querySelector("#header-user-popover");
const headerUserMenuStatus = document.querySelector("#header-user-menu-status");
const headerWorkStatus = document.querySelector("#header-work-status");
const headerWorkStatusButton = document.querySelector("#header-work-status-button");
const headerWorkStatusDot = document.querySelector("#header-work-status-dot");
const headerWorkStatusLabel = document.querySelector("#header-work-status-label");
const workStatusPopover = document.querySelector("#work-status-popover");
const runStatusDot = document.querySelector("#run-status-dot");
const runStatusLabel = document.querySelector("#run-status-label");
const runStatusText = document.querySelector("#run-status-text");
const sessionNoteForm = document.querySelector("#session-note-form");
const sessionNoteInput = document.querySelector("#session-note-input");
const sessionNoteList = document.querySelector("#session-note-list");
const sessionNoteStatus = document.querySelector("#session-note-status");
const openDeleteSessionButton = document.querySelector("#open-delete-session");
const closeDeleteSessionButton = document.querySelector("#close-delete-session");
const deleteSessionOverlay = document.querySelector("#delete-session-overlay");
const deleteSessionCancelButton = document.querySelector("#delete-session-cancel");
const confirmDeleteSessionButton = document.querySelector("#confirm-delete-session");
const deleteSessionName = document.querySelector("#delete-session-name");
const deleteSessionHint = document.querySelector("#delete-session-hint");

// ============================================================
// 状態（現在選択中のセッション・アナリスト・フィルタなど）
// ============================================================

let activeSessionKey = "fastapi";
let activeAnalystKey = "tanaka";
let activeStatusFilter = "all";
let activeInvestigationMethod = "url";
let activeInvestigationPromptKey = "summary";
let sessionButtons = [];
let analystRosterExpanded = localStorage.getItem("west-hawk-analyst-roster") === "open";
let runStatusState = "idle";
let selectedAttachments = [];

const CHAT_INPUT_MAX_HEIGHT = 156;

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
      <span class="message-meta">
        <span class="message-time">${message.time}</span>
      </span>
    </div>
  `;

  const messageText = document.createElement("div");
  messageText.className = "message-markdown";
  messageText.innerHTML = renderMarkdown(message.text);
  body.appendChild(messageText);

  if (message.role === "claude") {
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "message-copy-button";
    copyButton.setAttribute("aria-label", "Claudeの返答をコピー");
    copyButton.title = "Claudeの返答をコピー";
    copyButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="8" y="8" width="11" height="11" rx="2"></rect>
        <path d="M5 15.5V6.5A1.5 1.5 0 0 1 6.5 5H15"></path>
      </svg>
    `;
    copyButton.addEventListener("click", () => {
      copyClaudeMessage(copyButton, message.text);
    });
    body.querySelector(".message-meta").appendChild(copyButton);
  }

  if (message.attachments?.length) {
    const attachmentList = document.createElement("div");
    attachmentList.className = "message-attachments";

    for (const attachment of message.attachments) {
      const attachmentItem = document.createElement("span");
      attachmentItem.className = "message-attachment";
      attachmentItem.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m20 11.5-8.3 8.3a5.1 5.1 0 0 1-7.2-7.2l9-9a3.3 3.3 0 0 1 4.7 4.7l-9.1 9.1a1.7 1.7 0 0 1-2.4-2.4l8.3-8.3"></path>
        </svg>
        <strong>${attachment.name}</strong>
        <small>${attachment.sizeLabel}</small>
      `;
      attachmentList.appendChild(attachmentItem);
    }

    body.appendChild(attachmentList);
  }

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

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.inset = "0 auto auto 0";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    const copied = document.execCommand("copy");
    temporaryInput.remove();
    return copied;
  }
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listItems = [];
  let orderedListItems = [];
  let codeLines = [];
  let inCodeBlock = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    html.push(`<p>${paragraph.map(renderInlineMarkdown).join("<br>")}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length > 0) {
      html.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }

    if (orderedListItems.length > 0) {
      html.push(`<ol>${orderedListItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ol>`);
      orderedListItems = [];
    }
  };

  const flushCodeBlock = () => {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      html.push(`<h${heading[1].length}>${renderInlineMarkdown(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    const unorderedListItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (unorderedListItem) {
      flushParagraph();
      if (orderedListItems.length > 0) {
        html.push(`<ol>${orderedListItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ol>`);
        orderedListItems = [];
      }
      listItems.push(unorderedListItem[1]);
      continue;
    }

    const orderedListItem = line.match(/^\s*\d+\.\s+(.+)$/);
    if (orderedListItem) {
      flushParagraph();
      if (listItems.length > 0) {
        html.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
        listItems = [];
      }
      orderedListItems.push(orderedListItem[1]);
      continue;
    }

    paragraph.push(line);
  }

  if (inCodeBlock) {
    flushCodeBlock();
  }

  flushParagraph();
  flushList();

  return html.join("");
}

async function copyClaudeMessage(button, text) {
  const copied = await copyTextToClipboard(text);

  if (!copied) {
    button.classList.add("is-error");
    button.setAttribute("aria-label", "コピーできませんでした");
    button.title = "コピーできませんでした";
    window.setTimeout(() => {
      button.classList.remove("is-error");
      button.setAttribute("aria-label", "Claudeの返答をコピー");
      button.title = "Claudeの返答をコピー";
    }, 1400);
    return;
  }

  button.classList.add("is-copied");
  button.setAttribute("aria-label", "コピー済み");
  button.title = "コピー済み";
  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.setAttribute("aria-label", "Claudeの返答をコピー");
    button.title = "Claudeの返答をコピー";
  }, 1400);
}

function formatAttachmentSize(size) {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  if (size >= 1024) {
    return `${Math.ceil(size / 1024)} KB`;
  }

  return `${size} B`;
}

function renderAttachmentTray() {
  attachmentTray.innerHTML = "";
  attachmentTray.hidden = selectedAttachments.length === 0;

  for (const [index, attachment] of selectedAttachments.entries()) {
    const item = document.createElement("span");
    item.className = "attachment-chip";
    item.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m20 11.5-8.3 8.3a5.1 5.1 0 0 1-7.2-7.2l9-9a3.3 3.3 0 0 1 4.7 4.7l-9.1 9.1a1.7 1.7 0 0 1-2.4-2.4l8.3-8.3"></path>
      </svg>
      <strong>${attachment.name}</strong>
      <small>${attachment.sizeLabel}</small>
      <button type="button" data-attachment-index="${index}" aria-label="${attachment.name} を取り外す">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6 6 18"></path>
        </svg>
      </button>
    `;
    attachmentTray.appendChild(item);
  }
}

function clearSelectedAttachments() {
  selectedAttachments = [];
  attachmentInput.value = "";
  renderAttachmentTray();
}

function resizeChatInput() {
  chatInput.style.height = "auto";

  const nextHeight = Math.min(chatInput.scrollHeight, CHAT_INPUT_MAX_HEIGHT);
  chatInput.style.height = `${nextHeight}px`;
  chatInput.style.overflowY = chatInput.scrollHeight > CHAT_INPUT_MAX_HEIGHT ? "auto" : "hidden";
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

  if (!session) {
    renderEmptySession();
    return;
  }

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
  renderInvestigationPromptAccess();
  renderComposerAccess();
  renderDeleteSessionAccess();
  renderSessionNote();
  messageList.innerHTML = "";

  for (const message of session.messages) {
    messageList.appendChild(createMessageElement(message));
  }

  messageList.scrollTop = messageList.scrollHeight;
}

function renderEmptySession() {
  activeSessionKey = null;
  closeCaseStatusMenu();
  conversationTitle.textContent = "セッション未選択";
  currentCaseStatusButton.className = "case-status-current";
  currentCaseStatusButton.disabled = true;
  currentCaseStatusButton.title = "セッションを選択すると調査ステータスを確認できます";
  currentCaseStatusLabel.textContent = "未選択";
  caseStatusPopover.innerHTML = "";
  sessionId.textContent = "-";
  renderSessionCustomer("");
  renderSessionProduct("");
  renderSessionOwner(null);
  updatedAt.textContent = "-";
  renderTitleEditAccess();
  renderVisibilityBadge();
  renderInvestigationPromptAccess();
  renderComposerAccess();
  renderSessionNote();
  renderDeleteSessionAccess();
  setActiveButton(null);
  messageList.innerHTML = `
    <section class="empty-session-state" aria-label="セッション未選択">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 19 17.5h-5.5L9 21v-3.5H5A1.5 1.5 0 0 1 3.5 16V6A1.5 1.5 0 0 1 5 4.5Z"></path>
          <path d="M7.5 9h9M7.5 12.5H14"></path>
        </svg>
      </span>
      <h3>セッションが開かれていません</h3>
      <p>左の最近のセッションから選択するか、新しい調査を開始してください。</p>
    </section>
  `;
}

function renderSessionNote() {
  if (!hasActiveSession()) {
    sessionNoteList.innerHTML = "";
    sessionNoteInput.value = "";
    sessionNoteInput.disabled = true;
    sessionNoteStatus.textContent = "セッションを選択すると調査メモを表示できます。";
    return;
  }

  const session = sessions[activeSessionKey];
  const notes = session.notes ?? [];

  sessionNoteList.innerHTML = "";
  sessionNoteInput.value = "";
  sessionNoteInput.disabled = false;
  sessionNoteStatus.textContent = "アナリストは誰でもこのセッションにメモを残せます。";

  if (notes.length === 0) {
    const emptyNote = document.createElement("p");
    emptyNote.className = "session-note-empty";
    emptyNote.textContent = "まだ調査メモはありません。";
    sessionNoteList.appendChild(emptyNote);
    return;
  }

  for (const note of notes) {
    sessionNoteList.appendChild(createSessionNoteElement(note));
  }
}

function createSessionNoteElement(note) {
  const analyst = analysts[note.analystId] ?? {
    name: "不明なアナリスト",
  };
  const article = document.createElement("article");
  article.className = "session-note-item";
  article.setAttribute("role", "listitem");

  const text = document.createElement("p");
  text.textContent = note.text;

  const meta = document.createElement("small");
  meta.textContent = `${note.createdAt} ${analyst.name}`;

  article.append(text, meta);
  return article;
}

function renderCaseStatusOptions(statusKey) {
  if (!hasActiveSession()) {
    currentCaseStatusButton.className = "case-status-current";
    currentCaseStatusButton.disabled = true;
    currentCaseStatusButton.title = "セッションを選択すると調査ステータスを確認できます";
    currentCaseStatusLabel.textContent = "未選択";
    caseStatusPopover.innerHTML = "";
    return;
  }

  const owned = isOwnSession(activeSessionKey);
  const status = caseStatuses[statusKey];

  currentCaseStatusButton.className = `case-status-current ${status.className}`;
  currentCaseStatusButton.disabled = !owned;
  currentCaseStatusButton.title = owned ? "調査ステータスを変更" : "他のアナリストのセッションは変更できません";
  currentCaseStatusLabel.textContent = status.label;

  caseStatusPopover.innerHTML = "";

  for (const [optionKey, option] of Object.entries(caseStatuses)) {
    const isActive = optionKey === statusKey;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "case-status-choice";
    button.classList.toggle("is-active", isActive);
    button.dataset.statusOption = optionKey;
    button.setAttribute("role", "menuitemradio");
    button.setAttribute("aria-checked", String(isActive));
    button.textContent = option.label;
    caseStatusPopover.appendChild(button);
  }
}

function openCaseStatusMenu() {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  closeWorkStatusMenu();
  closeUserMenu();
  caseStatusPopover.hidden = false;
  currentCaseStatusButton.setAttribute("aria-expanded", "true");
}

function closeCaseStatusMenu() {
  caseStatusPopover.hidden = true;
  currentCaseStatusButton.setAttribute("aria-expanded", "false");
}

function toggleCaseStatusMenu() {
  if (caseStatusPopover.hidden) {
    openCaseStatusMenu();
    return;
  }

  closeCaseStatusMenu();
}

function renderSidebarSessionList() {
  sessionListContainer.innerHTML = "";

  for (const sessionKey of RECENT_SESSION_ORDER) {
    const session = sessions[sessionKey];

    if (!session) {
      continue;
    }

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

    if (!session) {
      continue;
    }

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

    if (!session || !isSessionVisibleToCurrentUser(session)) {
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
    if (!session) {
      button.hidden = true;
      continue;
    }

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

function refreshRecentSessions() {
  refreshRecentSessionsButton.classList.remove("is-refreshing");
  void refreshRecentSessionsButton.offsetWidth;
  refreshRecentSessionsButton.classList.add("is-refreshing");
  refreshRecentSessionsButton.disabled = true;
  sessionRefreshStatus.textContent = "最近のセッションを更新しています...";

  window.setTimeout(() => {
    renderSidebarSessionList();
    renderStatusCounts();
    renderSessionFilter();
    setActiveButton(activeSessionKey);
    sessionRefreshStatus.textContent = `更新しました ${getCurrentTime()}`;
    refreshRecentSessionsButton.disabled = false;
  }, 450);
}

// ============================================================
// ログイン中のアナリスト表示・セッションアナリスト表示・アナリスト管理
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
  if (hasActiveSession()) {
    renderCaseStatusOptions(sessions[activeSessionKey].statusKey);
  } else {
    renderCaseStatusOptions(null);
  }
  renderComposerAccess();
  renderVisibilityBadge();
  renderDeleteSessionAccess();
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

function openUserMenu() {
  closeWorkStatusMenu();
  closeCaseStatusMenu();
  headerUserPopover.hidden = false;
  headerUserButton.setAttribute("aria-expanded", "true");
}

function closeUserMenu() {
  headerUserPopover.hidden = true;
  headerUserButton.setAttribute("aria-expanded", "false");
}

function toggleWorkStatusMenu() {
  if (workStatusPopover.hidden) {
    closeUserMenu();
    closeCaseStatusMenu();
    openWorkStatusMenu();
    return;
  }

  closeWorkStatusMenu();
}

function toggleUserMenu() {
  if (headerUserPopover.hidden) {
    openUserMenu();
    return;
  }

  closeUserMenu();
}

function handleUserMenuAction(action) {
  if (action === "profile") {
    closeUserMenu();
    openSettings();
    renderSettingsTab("general");
    settingsSaveStatus.textContent = "プロフィール情報は認証基盤から取得する想定です";
    return;
  }

  if (action === "sign-out") {
    headerUserMenuStatus.textContent = "Mockではサインアウト処理は実行しません。";
  }
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
    currentAnalystRole.textContent = "アナリスト情報が見つかりません";
    return;
  }

  currentAnalystAvatar.textContent = analyst.avatar;
  currentAnalystName.textContent = analyst.name;
  currentAnalystRole.textContent = `${analyst.role}${analyst.disabled ? " / 無効" : ""}`;
}

function getActiveAnalysts() {
  return Object.entries(analysts).filter(([, analyst]) => !analyst.disabled);
}

function renderAnalystRosterToggle() {
  analystRoster.hidden = !analystRosterExpanded;
  analystRosterToggle.classList.toggle("is-open", analystRosterExpanded);
  analystRosterToggle.setAttribute("aria-expanded", String(analystRosterExpanded));
  analystRosterCount.textContent = String(getActiveAnalysts().length);
}

function setAnalystRosterExpanded(expanded) {
  analystRosterExpanded = expanded;
  localStorage.setItem("west-hawk-analyst-roster", expanded ? "open" : "closed");
  renderAnalystRosterToggle();
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

  renderAnalystRosterToggle();
}

function refreshAnalystRoster(source = "manual") {
  if (source === "manual") {
    refreshAnalystRosterButton.classList.remove("is-refreshing");
    void refreshAnalystRosterButton.offsetWidth;
    refreshAnalystRosterButton.classList.add("is-refreshing");
    refreshAnalystRosterButton.disabled = true;
    analystRosterStatus.textContent = "登録アナリスト一覧を更新しています...";
  }

  window.setTimeout(() => {
    renderAnalystRoster();
    analystRosterStatus.textContent =
      source === "auto" ? `自動更新しました ${getCurrentTime()}` : `更新しました ${getCurrentTime()}`;
    refreshAnalystRosterButton.disabled = false;
  }, source === "auto" ? 0 : 450);
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
      <label class="settings-role-control">
        <span>役割</span>
        <select data-analyst-role="${analystKey}" ${analyst.disabled ? "disabled" : ""}>
          <option ${analyst.role === "Tier2" ? "selected" : ""}>Tier2</option>
          <option ${analyst.role === "Tier2 Senior" ? "selected" : ""}>Tier2 Senior</option>
          <option ${analyst.role === "Tier2 Chief" ? "selected" : ""}>Tier2 Chief</option>
        </select>
      </label>
    `;
    settingsAnalystList.appendChild(row);
  }
}

function renderAnalystManagement() {
  renderAnalystRoster();
  renderAnalyst();
  renderSessionOwner(hasActiveSession() ? sessions[activeSessionKey].ownerAnalystId : null);
  renderSettingsAnalystList();
  renderInvestigationPreview();
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
    notes: [],
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

function hasActiveSession() {
  return Boolean(activeSessionKey && sessions[activeSessionKey]);
}

function isOwnSession(sessionKey) {
  return Boolean(sessionKey && sessions[sessionKey]?.ownerAnalystId === activeAnalystKey);
}

function isSessionVisibleToCurrentUser(session) {
  return !session.isPrivate || session.ownerAnalystId === activeAnalystKey;
}

function renderVisibilityBadge() {
  if (!hasActiveSession()) {
    visibilityToggleButton.classList.remove("is-public", "is-private");
    visibilityToggleButton.disabled = true;
    visibilityToggleButton.innerHTML = `${visibilityIcons.public}未選択`;
    return;
  }

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

function renderInvestigationPromptAccess() {
  if (!hasActiveSession()) {
    openInvestigationPromptButton.disabled = true;
    openInvestigationPromptButton.title = "セッションを選択すると調査プロンプトを送信できます";
    return;
  }

  const owned = isOwnSession(activeSessionKey);
  const busy = runStatusState === "running" || runStatusState === "saving" || runStatusState === "summarizing";

  openInvestigationPromptButton.disabled = !owned || busy;
  openInvestigationPromptButton.title = owned
    ? "定型の調査プロンプトを選んでClaudeへ送信"
    : "他のアナリストのセッションでは調査プロンプトを送信できません";
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
  if (!hasActiveSession()) {
    chatInput.disabled = true;
    attachFileButton.disabled = true;
    sendButton.disabled = true;
    sendButton.innerHTML = `${sendButtonIcons.disabled}送信`;
    chatInput.placeholder = "セッションを選択してください";
    resizeChatInput();
    setRunStatus("empty");
    return;
  }

  const owned = isOwnSession(activeSessionKey);

  chatInput.disabled = !owned;
  attachFileButton.disabled = !owned;
  sendButton.disabled = !owned;
  sendButton.innerHTML = `${owned ? sendButtonIcons.enabled : sendButtonIcons.disabled}送信`;
  chatInput.placeholder = owned ? "Claudeに質問する" : "他のアナリストのセッションのため閲覧のみです";
  resizeChatInput();

  if (!owned) {
    setRunStatus("readonly");
    return;
  }

  if (runStatusState === "readonly" || runStatusState === "empty") {
    setRunStatus("idle");
  }
}

function getLatestUserMessage(session) {
  const latestUserMessage = [...session.messages].reverse().find((message) => message.role === "user");
  return latestUserMessage?.text ?? "まだアナリストからの質問はありません。";
}

function createInvestigationSummary(session) {
  const status = caseStatuses[session.statusKey]?.label ?? "未設定";
  const product = products[session.product]?.label ?? "未設定";
  const owner = analysts[session.ownerAnalystId]?.name ?? "未設定";
  const noteCount = session.notes?.length ?? 0;

  return [
    "## 調査サマリー",
    "",
    `**セッション:** ${session.title}`,
    `**顧客:** ${session.customer ?? "未設定"}`,
    `**製品:** ${product}`,
    `**ステータス:** ${status}`,
    `**アナリスト:** ${owner}`,
    "",
    "### 現在の見立て",
    `- 直近の確認内容: ${getLatestUserMessage(session)}`,
    "- 会話履歴と調査メモをもとに、判断材料を整理しました。",
    `- 調査メモは ${noteCount} 件記録されています。`,
    "",
    "### 確認済み",
    "- 主要なログ、対象ユーザー、端末、送信元情報の確認状況を整理します。",
    "- 封じ込めや追加確認が必要な項目を、次のアナリストが追える形にまとめます。",
    "",
    "### 未確認",
    "- 影響範囲の最終確認",
    "- 同一送信元や関連エンティティへの横展開確認",
    "- クローズ前の顧客連絡または運用チームへの引き継ぎ",
    "",
    "### 次のアクション",
    "1. 調査メモと会話履歴を確認する",
    "2. 未確認項目をつぶしてステータスを更新する",
    "3. 必要なら監視中へ移し、追加イベントの有無を確認する",
  ].join("\n");
}

function createPromptResponse(promptKey, session) {
  if (promptKey === "summary") {
    return createInvestigationSummary(session);
  }

  const status = caseStatuses[session.statusKey]?.label ?? "未設定";
  const product = products[session.product]?.label ?? "未設定";

  if (promptKey === "nextSteps") {
    return [
      "## 次に確認すべき項目",
      "",
      `**対象:** ${session.customer ?? "未設定"} / ${product}`,
      `**現在のステータス:** ${status}`,
      "",
      "### 優先度 高",
      "- 直近24時間の成功/失敗サインインとMFA結果を時系列で確認する",
      "- 対象ユーザーの端末ID、管理状態、初回利用かどうかを確認する",
      "- 同一IP、ASN、国から他ユーザーへのアクセスがないか検索する",
      "",
      "### 優先度 中",
      "- SharePoint、Teams、メールボックスなど主要アプリの操作履歴を確認する",
      "- 条件付きアクセスの評価結果と例外適用の有無を確認する",
      "",
      "### 判断材料",
      "- 正常な業務利用で説明できるか",
      "- セッション失効やパスワードリセット後に再発していないか",
      "- 追加の横展開兆候がないか",
    ].join("\n");
  }

  if (promptKey === "customerReport") {
    return [
      "## 顧客向け報告文ドラフト",
      "",
      "現在、対象アラートについて確認を進めています。現時点では、通常とは異なるアクセス条件が確認されており、対象ユーザー、端末、送信元情報、関連アプリケーションの操作履歴を中心に調査しています。",
      "",
      "### 現時点で確認している内容",
      "- 対象セッションの基本情報と関連ログを確認中です。",
      "- 追加の不審操作や横展開の有無を確認しています。",
      "- 必要に応じて封じ込め対応と監視継続を検討します。",
      "",
      "### 次回報告予定",
      "追加ログの確認結果がまとまり次第、影響範囲と推奨対応を含めて続報します。",
    ].join("\n");
  }

  if (promptKey === "containment") {
    return [
      "## 封じ込めアクション",
      "",
      "### 即時実施",
      "- 対象ユーザーの有効セッションを失効する",
      "- パスワードリセットとMFA再登録の要否を確認する",
      "- 未管理端末からのアクセス制限を検討する",
      "",
      "### 追加確認後に実施",
      "- 関連IPや端末に横展開が見つかった場合、対象範囲を広げて調査する",
      "- SharePointなどで閲覧・ダウンロード範囲が広い場合、影響範囲を顧客と確認する",
      "",
      "### 監視へ移行する条件",
      "- 本人確認とセッション失効が完了している",
      "- 追加の不審操作や横展開が確認されていない",
      "- 監視対象と期間が明確になっている",
    ].join("\n");
  }

  if (promptKey === "riskReview") {
    return [
      "## 未確認リスク",
      "",
      "### 重大度 高",
      "- 同一IPからの横展開: 他ユーザーのサインインログを検索し、被害範囲の過小評価を避ける",
      "- 未管理端末からの継続アクセス: 端末IDと条件付きアクセス結果を確認し、再侵入や追加操作を防ぐ",
      "",
      "### 重大度 中",
      "- SharePoint閲覧範囲の未確認: ファイル閲覧・ダウンロード履歴を確認し、情報流出範囲を明確にする",
      "- 顧客への連絡要否未判断: 影響範囲と対応状況を整理し、報告遅延や対応漏れを防ぐ",
    ].join("\n");
  }

  return [
    "## クローズ判断の材料",
    "",
    "### 推奨ステータス",
    `現時点では **${status}** として扱い、未確認項目が残る場合はクローズを急がない判断が自然です。`,
    "",
    "### クローズ可能と見る条件",
    "- 本人確認が完了している",
    "- セッション失効などの必要な封じ込めが完了している",
    "- 追加の不審操作、横展開、データ閲覧拡大が確認されていない",
    "",
    "### 監視継続が必要な条件",
    "- 影響範囲の確認が一部残っている",
    "- 類似イベントが短時間に再発する可能性がある",
    "- 顧客または運用チームへの申し送りが未完了である",
  ].join("\n");
}

function renderInvestigationPromptList() {
  investigationPromptList.innerHTML = "";

  for (const [promptKey, prompt] of Object.entries(investigationPrompts)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "investigation-prompt-option";
    button.classList.toggle("is-active", promptKey === activeInvestigationPromptKey);
    button.dataset.promptKey = promptKey;
    button.innerHTML = `
      <strong>${prompt.title}</strong>
      <span>${prompt.description}</span>
    `;
    investigationPromptList.appendChild(button);
  }
}

function selectInvestigationPrompt(promptKey) {
  const prompt = investigationPrompts[promptKey];

  if (!prompt) {
    return;
  }

  activeInvestigationPromptKey = promptKey;
  investigationPromptHint.textContent = prompt.description;
  investigationPromptText.value = prompt.prompt;
  investigationPromptStatus.textContent = "選択したプロンプトは、ユーザーの発言として会話履歴に残ります。";
  investigationPromptStatus.classList.remove("is-error");
  renderInvestigationPromptList();
}

function openInvestigationPrompt() {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  selectInvestigationPrompt(activeInvestigationPromptKey);
  sendInvestigationPromptButton.disabled = false;
  investigationPromptOverlay.hidden = false;
  investigationPromptText.focus();
}

function closeInvestigationPrompt() {
  investigationPromptOverlay.hidden = true;
}

function sendInvestigationPrompt() {
  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  const promptText = investigationPromptText.value.trim();

  if (!promptText) {
    investigationPromptStatus.textContent = "Claudeへ送るプロンプトを入力してください。";
    investigationPromptStatus.classList.add("is-error");
    investigationPromptText.focus();
    return;
  }

  const session = sessions[activeSessionKey];
  const currentTime = getCurrentTime();
  const responseText = createPromptResponse(activeInvestigationPromptKey, session);

  session.messages.push({
    role: "user",
    analystId: activeAnalystKey,
    time: currentTime,
    text: promptText,
  });

  setRunStatus("summarizing");
  openInvestigationPromptButton.disabled = true;
  sendInvestigationPromptButton.disabled = true;
  closeInvestigationPrompt();
  renderSession(activeSessionKey);

  window.setTimeout(() => {
    session.messages.push({
      role: "claude",
      time: getCurrentTime(),
      text: responseText,
    });
    session.updatedAt = getCurrentDateTimeLabel();
    session.sidebarTimeLabel = "たった今";

    setRunStatus("saving");
    renderSidebarSessionList();
    setActiveButton(activeSessionKey);
    renderSession(activeSessionKey);
    renderSessionSearchResults();

    window.setTimeout(() => {
      setRunStatus("idle");
      sendInvestigationPromptButton.disabled = false;
      renderInvestigationPromptAccess();
      renderDeleteSessionAccess();
    }, 700);
  }, 650);
}

// ============================================================
// セッション削除（所有者のみ）
// ============================================================

function renderDeleteSessionAccess() {
  if (!hasActiveSession()) {
    openDeleteSessionButton.disabled = true;
    openDeleteSessionButton.title = "削除するセッションが選択されていません";
    deleteSessionHint.textContent = "セッションを選択すると削除操作を確認できます。";
    return;
  }

  const owned = isOwnSession(activeSessionKey);
  const busy = runStatusState === "running" || runStatusState === "saving" || runStatusState === "summarizing";
  openDeleteSessionButton.disabled = !owned || busy;
  openDeleteSessionButton.title = owned
    ? "このセッションを削除"
    : "他のアナリストのセッションは削除できません";
  deleteSessionHint.textContent = owned
    ? "削除前に確認ダイアログを表示します。"
    : "他のアナリストのセッションは削除できません。";

  if (owned && busy) {
    deleteSessionHint.textContent = "Claudeへの問い合わせ中は削除できません。";
  }
}

function openDeleteSession() {
  if (!hasActiveSession() || !isOwnSession(activeSessionKey)) {
    return;
  }

  deleteSessionName.textContent = sessions[activeSessionKey].title;
  deleteSessionOverlay.hidden = false;
  confirmDeleteSessionButton.focus();
}

function closeDeleteSession() {
  deleteSessionOverlay.hidden = true;
}

function deleteActiveSession() {
  if (!hasActiveSession() || !isOwnSession(activeSessionKey)) {
    return;
  }

  const sessionKey = activeSessionKey;
  delete sessions[sessionKey];

  const recentIndex = RECENT_SESSION_ORDER.indexOf(sessionKey);
  if (recentIndex >= 0) {
    RECENT_SESSION_ORDER.splice(recentIndex, 1);
  }

  closeDeleteSession();
  renderSidebarSessionList();
  renderStatusCounts();
  renderSessionFilter();
  renderSessionSearchResults();
  renderEmptySession();
}

// ============================================================
// セッションタイトル変更（所有者のみ）
// ============================================================

function renderTitleEditAccess() {
  if (!hasActiveSession()) {
    openRenameSessionButton.disabled = true;
    openRenameSessionButton.title = "セッションを選択するとタイトルを変更できます";
    return;
  }

  const owned = isOwnSession(activeSessionKey);
  openRenameSessionButton.disabled = !owned;
  openRenameSessionButton.title = owned ? "セッションタイトルを変更" : "他のアナリストのセッションは変更できません";
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
  runStatusState = status;
  runStatusDot.className = "";

  if (status === "empty") {
    runStatusDot.classList.add("is-readonly");
    runStatusLabel.textContent = "未選択";
    runStatusText.textContent = "セッションを選択すると会話を確認できます。";
    return;
  }

  if (status === "readonly") {
    runStatusDot.classList.add("is-readonly");
    runStatusLabel.textContent = "閲覧のみ";
    runStatusText.textContent = "他のアナリストのセッションでは、会話の確認と調査メモの投稿ができます。";
    return;
  }

  if (status === "running") {
    runStatusDot.classList.add("is-running");
    runStatusLabel.textContent = "Claudeに問い合わせ中";
    runStatusText.textContent = "選択中のアナリストとして質問を送信しています。";
    return;
  }

  if (status === "saving") {
    runStatusDot.classList.add("is-saving");
    runStatusLabel.textContent = "保存中";
    runStatusText.textContent = "Claudeの返答とアナリスト情報を会話履歴へ保存しています。";
    return;
  }

  if (status === "summarizing") {
    runStatusDot.classList.add("is-running");
    runStatusLabel.textContent = "調査プロンプト実行中";
    runStatusText.textContent = "選択した調査プロンプトをClaudeへ送信しています。";
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

function getCurrentDateTimeLabel() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}/${month}/${day} ${getCurrentTime()}`;
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

refreshRecentSessionsButton.addEventListener("click", refreshRecentSessions);

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

headerUserButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleUserMenu();
});

workStatusPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-work-status]");

  if (!button) {
    return;
  }

  updateActiveWorkStatus(button.dataset.workStatus);
});

headerUserPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-user-action]");

  if (!button) {
    return;
  }

  handleUserMenuAction(button.dataset.userAction);
});

analystRosterToggle.addEventListener("click", () => {
  setAnalystRosterExpanded(!analystRosterExpanded);
});

refreshAnalystRosterButton.addEventListener("click", () => {
  refreshAnalystRoster("manual");
});

attachFileButton.addEventListener("click", () => {
  if (attachFileButton.disabled) {
    return;
  }

  attachmentInput.click();
});

attachmentInput.addEventListener("change", () => {
  selectedAttachments = Array.from(attachmentInput.files).map((file) => ({
    name: file.name,
    sizeLabel: formatAttachmentSize(file.size),
  }));
  renderAttachmentTray();
});

attachmentTray.addEventListener("click", (event) => {
  const button = event.target.closest("[data-attachment-index]");

  if (!button) {
    return;
  }

  selectedAttachments.splice(Number(button.dataset.attachmentIndex), 1);

  if (selectedAttachments.length === 0) {
    attachmentInput.value = "";
  }

  renderAttachmentTray();
});

chatInput.addEventListener("input", resizeChatInput);

chatInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || (!event.ctrlKey && !event.metaKey)) {
    return;
  }

  event.preventDefault();
  chatForm.requestSubmit();
});

for (const button of settingsNavButtons) {
  button.addEventListener("click", () => {
    renderSettingsTab(button.dataset.settingsTab);
  });
}

settingsAnalystList.addEventListener("change", (event) => {
  const select = event.target.closest("[data-analyst-role]");

  if (!select) {
    return;
  }

  const analystKey = select.dataset.analystRole;
  const analyst = analysts[analystKey];

  if (!analyst) {
    return;
  }

  analyst.role = select.value;
  settingsSaveStatus.textContent = `${analyst.name} の役割を ${analyst.role} に変更しました`;
  renderAnalystManagement();
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

investigationPromptOverlay.addEventListener("click", (event) => {
  if (event.target === investigationPromptOverlay) {
    closeInvestigationPrompt();
  }
});

deleteSessionOverlay.addEventListener("click", (event) => {
  if (event.target === deleteSessionOverlay) {
    closeDeleteSession();
  }
});

document.addEventListener("click", (event) => {
  if (!headerWorkStatus.contains(event.target)) {
    closeWorkStatusMenu();
  }

  if (!headerUser.contains(event.target)) {
    closeUserMenu();
  }

  if (!caseStatusOptions.contains(event.target)) {
    closeCaseStatusMenu();
  }
});

visibilityToggleButton.addEventListener("click", toggleSessionVisibility);
openInvestigationPromptButton.addEventListener("click", openInvestigationPrompt);
closeInvestigationPromptButton.addEventListener("click", closeInvestigationPrompt);
investigationPromptCancelButton.addEventListener("click", closeInvestigationPrompt);
sendInvestigationPromptButton.addEventListener("click", sendInvestigationPrompt);
openDeleteSessionButton.addEventListener("click", openDeleteSession);
closeDeleteSessionButton.addEventListener("click", closeDeleteSession);
deleteSessionCancelButton.addEventListener("click", closeDeleteSession);
confirmDeleteSessionButton.addEventListener("click", deleteActiveSession);

investigationPromptList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-prompt-key]");

  if (!button) {
    return;
  }

  selectInvestigationPrompt(button.dataset.promptKey);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !workStatusPopover.hidden) {
    closeWorkStatusMenu();
  }

  if (event.key === "Escape" && !headerUserPopover.hidden) {
    closeUserMenu();
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

  if (event.key === "Escape" && !investigationPromptOverlay.hidden) {
    closeInvestigationPrompt();
  }

  if (event.key === "Escape" && !deleteSessionOverlay.hidden) {
    closeDeleteSession();
  }

  if (event.key === "Escape" && !caseStatusPopover.hidden) {
    closeCaseStatusMenu();
  }

  if (event.key === "Enter" && !sessionSearchOverlay.hidden) {
    renderSessionSearchResults();
  }

  if (event.key === "Enter" && !newInvestigationOverlay.hidden) {
    startInvestigation();
  }
});

currentCaseStatusButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleCaseStatusMenu();
});

caseStatusPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-status-option]");

  if (!button || !isOwnSession(activeSessionKey)) {
    return;
  }

  sessions[activeSessionKey].statusKey = button.dataset.statusOption;
  closeCaseStatusMenu();
  renderSession(activeSessionKey);
  renderSessionStatusBadge(activeSessionKey);
  renderStatusCounts();
  renderSessionFilter();
  renderSessionSearchResults();
});

sessionNoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!hasActiveSession()) {
    return;
  }

  const text = sessionNoteInput.value.trim();

  if (!text) {
    sessionNoteStatus.textContent = "投稿するメモを入力してください。";
    sessionNoteInput.focus();
    return;
  }

  const session = sessions[activeSessionKey];
  const notes = session.notes ?? [];

  notes.push({
    text,
    createdAt: getCurrentDateTimeLabel(),
    analystId: activeAnalystKey,
  });
  session.notes = notes;
  renderSessionNote();
  sessionNoteStatus.textContent = "調査メモを追加しました。";
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isOwnSession(activeSessionKey)) {
    return;
  }

  const text = chatInput.value.trim();
  const attachments = [...selectedAttachments];

  if (!text && attachments.length === 0) {
    return;
  }

  const session = sessions[activeSessionKey];
  const currentTime = getCurrentTime();
  session.messages.push({
    role: "user",
    analystId: activeAnalystKey,
    time: currentTime,
    text: text || "添付ファイルを共有します。",
    attachments,
  });

  setRunStatus("running");

  window.setTimeout(() => {
    session.messages.push({
      role: "claude",
      time: getCurrentTime(),
      text: "受け取りました。保存済みの調査履歴と現在のアナリスト情報を踏まえて、次に確認すべき観点を整理します。",
    });
    session.updatedAt = `2026/07/27 ${getCurrentTime()}`;
    setRunStatus("saving");
    renderSession(activeSessionKey);
    renderSessionSearchResults();

    window.setTimeout(() => {
      setRunStatus("idle");
      renderDeleteSessionAccess();
    }, 700);
  }, 650);

  chatInput.value = "";
  resizeChatInput();
  clearSelectedAttachments();
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
window.setInterval(() => {
  refreshAnalystRoster("auto");
}, 60000);
