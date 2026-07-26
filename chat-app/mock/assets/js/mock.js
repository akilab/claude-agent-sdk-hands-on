const sessions = {
  fastapi: {
    title: "FastAPI連携の相談",
    sessionId: "ses-fastapi-001",
    updatedAt: "2026/07/26 15:45",
    messages: [
      {
        role: "user",
        time: "15:42",
        text: "Claude Agent SDKをFastAPIに組み込む場合、最初にどこから作るのがよいですか？",
      },
      {
        role: "claude",
        time: "15:43",
        text: "最初は画面から始めると全体像をつかみやすくなります。次に、セッション一覧、履歴取得、質問送信のAPIを小さく分けて作るのがよいです。",
      },
      {
        role: "user",
        time: "15:44",
        text: "セッションを選ぶと、過去の会話が表示される形にしたいです。",
      },
      {
        role: "claude",
        time: "15:45",
        text: "その場合は、画面側では選択中のsession_idを持ち、API側ではそのsession_idに紐づくmessagesをSQLiteから取得します。",
        code: [
          "GET /api/sessions",
          "GET /api/sessions/{session_id}/messages",
          "POST /api/sessions/{session_id}/messages",
        ].join("\n"),
      },
    ],
  },
  sqlite: {
    title: "SQLite履歴保存",
    sessionId: "ses-sqlite-014",
    updatedAt: "2026/07/26 14:19",
    messages: [
      {
        role: "user",
        time: "14:18",
        text: "messagesテーブルには何を保存すればよいですか？",
      },
      {
        role: "claude",
        time: "14:19",
        text: "会話履歴として画面に再表示したい内容を保存します。この学習では、userとassistantの本文を保存対象にするのが分かりやすいです。",
      },
    ],
  },
  stream: {
    title: "ストリーミング表示",
    sessionId: "ses-stream-008",
    updatedAt: "2026/07/25 18:05",
    messages: [
      {
        role: "user",
        time: "18:04",
        text: "Claudeの返答を少しずつ画面に表示したいです。",
      },
      {
        role: "claude",
        time: "18:05",
        text: "FastAPI側ではストリーミング用のレスポンスを返し、フロント側では受け取った断片を同じメッセージ欄に追記していく設計にできます。",
      },
    ],
  },
  client: {
    title: "ClaudeSDKClient基礎",
    sessionId: "ses-client-003",
    updatedAt: "2026/07/25 11:21",
    messages: [
      {
        role: "user",
        time: "11:20",
        text: "queryとClaudeSDKClientの違いがまだ少し曖昧です。",
      },
      {
        role: "claude",
        time: "11:21",
        text: "queryは単発実行を簡潔に書ける入口です。ClaudeSDKClientは、同じclientで会話を続けたり、送受信の流れを細かく扱ったりする時に向いています。",
      },
    ],
  },
};

const messageList = document.querySelector("#message-list");
const messageCount = document.querySelector("#message-count");
const conversationTitle = document.querySelector("#conversation-title");
const sessionId = document.querySelector("#session-id");
const updatedAt = document.querySelector("#updated-at");
const sessionButtons = document.querySelectorAll(".session-item");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");

let activeSessionKey = "fastapi";

function createMessageElement(message) {
  const article = document.createElement("article");
  article.className = `message is-${message.role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = message.role === "user" ? "U" : "C";

  const body = document.createElement("div");
  body.className = "message-body";
  body.innerHTML = `
    <div class="message-header">
      <span>${message.role === "user" ? "User" : "Claude"}</span>
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
  messageCount.textContent = String(session.messages.length);
  sessionId.textContent = session.sessionId;
  updatedAt.textContent = session.updatedAt;
  messageList.innerHTML = "";

  for (const message of session.messages) {
    messageList.appendChild(createMessageElement(message));
  }

  messageList.scrollTop = messageList.scrollHeight;
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
    time: currentTime,
    text,
  });
  session.messages.push({
    role: "claude",
    time: currentTime,
    text: "受け取りました。この内容をもとに、保存済みの会話履歴を踏まえて回答を組み立てます。",
  });
  session.updatedAt = `2026/07/26 ${currentTime}`;

  chatInput.value = "";
  renderSession(activeSessionKey);
});

renderSession(activeSessionKey);
