(() => {
  const selectors = {
    codeBlock: ".code-block",
    diagramOpen: "[data-diagram-open]",
    themeToggle: "[data-theme-toggle]",
    topLink: 'a[href="#top"]',
  };

  const state = {
    diagramModal: null,
    diagramModalClose: null,
    diagramModalImage: null,
    lastDiagramTrigger: null,
  };

  const themeStorageKey = "agent-sdk-learning-theme";

  function getElements(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function applyTheme(theme) {
    const themeToggle = document.querySelector(selectors.themeToggle);
    const isDark = theme === "dark";

    document.documentElement.dataset.theme = theme;

    if (!themeToggle) {
      return;
    }

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "ライトモードに切り替え" : "ダークモードに切り替え",
    );
  }

  function getInitialTheme() {
    let storedTheme = null;

    try {
      storedTheme = window.localStorage.getItem(themeStorageKey);
    } catch (error) {
      storedTheme = null;
    }

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function initThemeToggle() {
    const themeToggle = document.querySelector(selectors.themeToggle);

    applyTheme(getInitialTheme());

    if (!themeToggle) {
      return;
    }

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      try {
        window.localStorage.setItem(themeStorageKey, nextTheme);
      } catch (error) {
        // Theme switching should still work when storage is unavailable.
      }

      applyTheme(nextTheme);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  function createCopyButton(code) {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.dataset.copyCode = "";
    button.textContent = "コピー";

    button.addEventListener("click", async () => {
      const originalText = button.textContent;

      try {
        await copyText(code.innerText);
        button.textContent = "コピー済み";
        button.classList.add("is-copied");
      } catch (error) {
        button.textContent = "失敗";
      }

      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("is-copied");
      }, 1600);
    });

    return button;
  }

  function inferCodeLanguage(block, code) {
    const headerText = block.querySelector(".code-block__header span")?.textContent.toLowerCase() ?? "";
    const codeText = code.textContent.trim();

    if (headerText.includes(".py") || headerText.includes("python")) {
      return "python";
    }

    if (headerText.includes(".json") || headerText.includes("json")) {
      return "json";
    }

    if (headerText.includes(".toml") || headerText.includes("pyproject")) {
      return "toml";
    }

    if (headerText.includes(".html")) {
      return "markup";
    }

    if (headerText.includes(".css")) {
      return "css";
    }

    if (headerText.includes(".js") || headerText.includes("javascript")) {
      return "javascript";
    }

    if (headerText.includes(".md") || codeText.startsWith("---")) {
      return "yaml";
    }

    if (/\b(Get-Content|New-Item|Set-Content)\b/.test(codeText)) {
      return "powershell";
    }

    if (headerText.includes("macos") || headerText.includes("linux")) {
      return "bash";
    }

    if (headerText.includes("windows")) {
      return "powershell";
    }

    if (/^(cd|uv|cat|mkdir|python)\b/m.test(codeText)) {
      return "bash";
    }

    if (codeText.startsWith("{") || codeText.startsWith("[")) {
      return "json";
    }

    if (/\b(import|from|def|async def|class)\b/.test(codeText)) {
      return "python";
    }

    return "plaintext";
  }

  function initCodeHighlighting() {
    getElements(selectors.codeBlock).forEach((block) => {
      const code = block.querySelector("code");

      if (!code || Array.from(code.classList).some((className) => className.startsWith("language-"))) {
        return;
      }

      const language = inferCodeLanguage(block, code);
      const pre = code.closest("pre");

      code.classList.add(`language-${language}`);
      pre?.classList.add(`language-${language}`);
    });

    if (window.Prism) {
      window.Prism.highlightAllUnder(document);
    }
  }

  function initCodeCopy() {
    getElements(selectors.codeBlock).forEach((block) => {
      const header = block.querySelector(".code-block__header");
      const code = block.querySelector("code");

      if (!header || !code || header.querySelector("[data-copy-code]")) {
        return;
      }

      header.appendChild(createCopyButton(code));
    });
  }

  function closeDiagramModal() {
    if (!state.diagramModal) {
      return;
    }

    state.diagramModal.classList.remove("is-open");
    document.body.classList.remove("has-open-modal");

    if (state.lastDiagramTrigger) {
      state.lastDiagramTrigger.focus();
    }
  }

  function createDiagramModal() {
    const modal = document.createElement("div");
    modal.className = "diagram-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "図の拡大表示");

    const panel = document.createElement("div");
    panel.className = "diagram-modal__panel";

    const image = document.createElement("img");
    image.className = "diagram-modal__image";
    image.alt = "";

    const closeButton = document.createElement("button");
    closeButton.className = "diagram-modal__close";
    closeButton.type = "button";
    closeButton.textContent = "閉じる";

    panel.appendChild(image);
    panel.appendChild(closeButton);
    modal.appendChild(panel);
    document.body.appendChild(modal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeDiagramModal();
      }
    });

    closeButton.addEventListener("click", closeDiagramModal);

    state.diagramModal = modal;
    state.diagramModalImage = image;
    state.diagramModalClose = closeButton;
  }

  function openDiagramModal(trigger) {
    const image = trigger.querySelector("img");

    if (!image) {
      return;
    }

    if (!state.diagramModal) {
      createDiagramModal();
    }

    state.lastDiagramTrigger = trigger;
    state.diagramModalImage.src = image.currentSrc || image.src;
    state.diagramModalImage.alt = image.alt;
    state.diagramModal.classList.add("is-open");
    document.body.classList.add("has-open-modal");
    state.diagramModalClose.focus();
  }

  function initDiagramZoom() {
    getElements(selectors.diagramOpen).forEach((button) => {
      button.addEventListener("click", () => {
        openDiagramModal(button);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.diagramModal?.classList.contains("is-open")) {
        closeDiagramModal();
      }
    });
  }

  function initTopLinks() {
    getElements(selectors.topLink).forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        if (window.location.hash === "#top") {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      });
    });
  }

  function initPage() {
    initThemeToggle();
    initCodeHighlighting();
    initCodeCopy();
    initDiagramZoom();
    initTopLinks();
  }

  initPage();
})();
