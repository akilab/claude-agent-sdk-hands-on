const analysts = {
  tanaka: {
    name: "田中 明",
    shortName: "田中",
    avatar: "T",
    role: "Tier2",
  },
  sato: {
    name: "佐藤 美咲",
    shortName: "佐藤",
    avatar: "S",
    role: "Tier2 Senior",
  },
  suzuki: {
    name: "鈴木 健",
    shortName: "鈴木",
    avatar: "U",
    role: "Tier2 Chief",
  },
  hayashi: {
    name: "林 涼",
    shortName: "林",
    avatar: "H",
    role: "Tier2",
  },
  mori: {
    name: "森 愛",
    shortName: "森",
    avatar: "M",
    role: "Tier2 Senior",
  },
  onodera: {
    name: "小野寺 健太郎",
    shortName: "小野寺",
    avatar: "O",
    role: "Tier2 Chief",
  },
  hasegawa: {
    name: "長谷川 奈津美",
    shortName: "長谷川",
    avatar: "N",
    role: "Tier2 Senior",
  },
  fujiwara: {
    name: "藤原 真由",
    shortName: "藤原",
    avatar: "F",
    role: "Tier2",
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

const sessions = {
  fastapi: {
    title: "Impossible Travel alert",
    sessionId: "4bf35ad0-805b-4e54-9623-d62191b77342",
    statusKey: "investigating",
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
    ],
  },
  sqlite: {
    title: "Suspicious PowerShell",
    sessionId: "9585f444-4265-474f-b9ed-668c8594f5ad",
    statusKey: "reviewing",
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

const messageList = document.querySelector("#message-list");
const messageCount = document.querySelector("#message-count");
const conversationTitle = document.querySelector("#conversation-title");
const caseStatusOptions = document.querySelector("#case-status-options");
const sessionId = document.querySelector("#session-id");
const updatedAt = document.querySelector("#updated-at");
const sessionButtons = document.querySelectorAll(".session-item");
const statusFilterButtons = document.querySelectorAll(".status-filter-button");
const visibleSessionCount = document.querySelector("#visible-session-count");
const openSessionSearchButton = document.querySelector("#open-session-search");
const closeSessionSearchButton = document.querySelector("#close-session-search");
const sessionSearchOverlay = document.querySelector("#session-search-overlay");
const sessionSearchInput = document.querySelector("#session-search-input");
const sessionSearchStatus = document.querySelector("#session-search-status");
const sessionSearchDateFrom = document.querySelector("#session-search-date-from");
const sessionSearchDateTo = document.querySelector("#session-search-date-to");
const sessionSearchSubmit = document.querySelector("#session-search-submit");
const sessionSearchClear = document.querySelector("#session-search-clear");
const sessionSearchResults = document.querySelector("#session-search-results");
const sessionSearchCount = document.querySelector("#session-search-count");
const openSettingsButton = document.querySelector("#open-settings");
const closeSettingsButton = document.querySelector("#close-settings");
const settingsCancelButton = document.querySelector("#settings-cancel");
const settingsSaveButton = document.querySelector("#settings-save");
const settingsOverlay = document.querySelector("#settings-overlay");
const settingsSaveStatus = document.querySelector("#settings-save-status");
const settingsCurrentAnalyst = document.querySelector("#settings-current-analyst");
const settingsNavButtons = document.querySelectorAll(".settings-nav-button");
const settingsPanels = document.querySelectorAll(".settings-panel");
const analystSwitcher = document.querySelector("#analyst-switcher");
const settingsAnalystList = document.querySelector("#settings-analyst-list");
const analystEditor = document.querySelector("#analyst-editor");
const analystEditKey = document.querySelector("#analyst-edit-key");
const analystEditorTitle = document.querySelector("#analyst-editor-title");
const analystNameInput = document.querySelector("#analyst-name-input");
const analystRoleSelect = document.querySelector("#analyst-role-select");
const analystEditorReset = document.querySelector("#analyst-editor-reset");
const analystEditorSubmit = document.querySelector("#analyst-editor-submit");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const activeAnalystAvatar = document.querySelector("#active-analyst-avatar");
const activeAnalystName = document.querySelector("#active-analyst-name");
const currentAnalystAvatar = document.querySelector("#current-analyst-avatar");
const currentAnalystName = document.querySelector("#current-analyst-name");
const currentAnalystRole = document.querySelector("#current-analyst-role");
const runStatusDot = document.querySelector("#run-status-dot");
const runStatusLabel = document.querySelector("#run-status-label");
const runStatusText = document.querySelector("#run-status-text");

let activeSessionKey = "fastapi";
let activeAnalystKey = "tanaka";
let activeStatusFilter = "all";

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

function renderSession(sessionKey) {
  const session = sessions[sessionKey];
  activeSessionKey = sessionKey;
  conversationTitle.textContent = session.title;
  renderCaseStatusOptions(session.statusKey);
  messageCount.textContent = String(session.messages.length);
  sessionId.textContent = session.sessionId;
  updatedAt.textContent = session.updatedAt;
  messageList.innerHTML = "";

  for (const message of session.messages) {
    messageList.appendChild(createMessageElement(message));
  }

  messageList.scrollTop = messageList.scrollHeight;
}

function renderCaseStatusOptions(statusKey) {
  for (const button of caseStatusOptions.querySelectorAll(".case-status-option")) {
    const isActive = button.dataset.statusOption === statusKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }
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

function countSessionsByStatus() {
  const counts = {
    all: sessionButtons.length,
  };

  for (const statusKey of Object.keys(caseStatuses)) {
    counts[statusKey] = 0;
  }

  for (const button of sessionButtons) {
    const session = sessions[button.dataset.session];
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
    const shouldShow = activeStatusFilter === "all" || session.statusKey === activeStatusFilter;
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

function renderAnalyst() {
  const analyst = analysts[activeAnalystKey];
  activeAnalystAvatar.textContent = analyst.avatar;
  activeAnalystName.textContent = analyst.name;
  currentAnalystAvatar.textContent = analyst.avatar;
  currentAnalystName.textContent = analyst.name;
  currentAnalystRole.textContent = analyst.role;
  settingsCurrentAnalyst.textContent = `${analyst.name} / ${analyst.role}`;

  for (const button of document.querySelectorAll(".analyst-button")) {
    button.classList.toggle("is-active", button.dataset.analyst === activeAnalystKey);
  }
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

function renderAnalystSwitcher() {
  analystSwitcher.innerHTML = "";

  for (const [analystKey, analyst] of getActiveAnalysts()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "analyst-button";
    button.classList.toggle("is-active", analystKey === activeAnalystKey);
    button.dataset.analyst = analystKey;
    button.innerHTML = `
      <span>${analyst.avatar}</span>
      <strong>${analyst.name}</strong>
      <em>${analyst.role}</em>
    `;
    analystSwitcher.appendChild(button);
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
  renderAnalystSwitcher();
  renderAnalyst();
  renderSettingsAnalystList();
}

function chooseFallbackAnalyst() {
  const firstActiveAnalyst = getActiveAnalysts()[0];

  if (firstActiveAnalyst) {
    activeAnalystKey = firstActiveAnalyst[0];
  }
}

function getSessionOwner(session) {
  let lastUserMessage = null;

  for (let index = session.messages.length - 1; index >= 0; index -= 1) {
    if (session.messages[index].role === "user") {
      lastUserMessage = session.messages[index];
      break;
    }
  }

  const analyst = analysts[lastUserMessage?.analystId] ?? analysts.tanaka;

  return analyst.name;
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
  const dateFrom = sessionSearchDateFrom.value;
  const dateTo = sessionSearchDateTo.value;
  const matchedSessions = Object.entries(sessions).filter(([, session]) => {
    const sessionDate = getSessionDateValue(session);
    const matchesStatus = statusKey === "all" || session.statusKey === statusKey;
    const matchesQuery = !query || getSessionSearchText(session).includes(query);
    const matchesDateFrom = !dateFrom || sessionDate >= dateFrom;
    const matchesDateTo = !dateTo || sessionDate <= dateTo;

    return matchesStatus && matchesQuery && matchesDateFrom && matchesDateTo;
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

for (const button of sessionButtons) {
  button.addEventListener("click", () => {
    const sessionKey = button.dataset.session;
    setActiveButton(sessionKey);
    renderSession(sessionKey);
  });
}

analystSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest(".analyst-button");

  if (!button) {
    return;
  }

  activeAnalystKey = button.dataset.analyst;
  renderAnalyst();
});

for (const button of statusFilterButtons) {
  button.addEventListener("click", () => {
    activeStatusFilter = button.dataset.statusFilter;
    renderSessionFilter();
  });
}

openSessionSearchButton.addEventListener("click", openSessionSearch);
closeSessionSearchButton.addEventListener("click", closeSessionSearch);
sessionSearchSubmit.addEventListener("click", renderSessionSearchResults);
sessionSearchClear.addEventListener("click", () => {
  sessionSearchInput.value = "";
  sessionSearchStatus.value = "all";
  sessionSearchDateFrom.value = "";
  sessionSearchDateTo.value = "";
  renderSessionSearchResults();
});

openSettingsButton.addEventListener("click", openSettings);
closeSettingsButton.addEventListener("click", closeSettings);
settingsCancelButton.addEventListener("click", closeSettings);
settingsSaveButton.addEventListener("click", () => {
  settingsSaveStatus.textContent = "設定を保存しました";
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sessionSearchOverlay.hidden) {
    closeSessionSearch();
  }

  if (event.key === "Escape" && !settingsOverlay.hidden) {
    closeSettings();
  }

  if (event.key === "Enter" && !sessionSearchOverlay.hidden) {
    renderSessionSearchResults();
  }
});

caseStatusOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".case-status-option");

  if (!button) {
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

renderAnalystManagement();
renderStatusCounts();
renderSessionFilter();
renderSession(activeSessionKey);
