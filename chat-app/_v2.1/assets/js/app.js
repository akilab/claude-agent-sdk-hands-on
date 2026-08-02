import { analysts, currentUser, environments, investigationPrompts, investigations, slashCommands } from './data/mock-data.js';
import { createAppState } from './core/app-state.js';
import { $, $$ } from './core/dom.js';
import { dateKey, esc, formatCompact, formatDate, formatTime, multiline } from './core/format.js';
import { createSelectors } from './core/selectors.js';
import { contextPanelHtml } from './ui/context-panel.js';
import { timelineHtml } from './ui/timeline.js';

const state = createAppState({ selectedId: investigations[0].id, organization: 'Contoso Japan' });
const {
  selected, environmentFor, organizations, environmentsForOrganization, organizationFor,
  analystFor, leadAnalystFor, initialsFor, canEdit, allEvidence, evidenceById,
} = createSelectors({ analysts, currentUser, environments, investigations, state });

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function filteredInvestigations() {
  return [...investigations].filter((item) => organizationFor(item) === state.organization && item.lifecycle !== 'archived').sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt));
}

function renderRail() {
  const items = filteredInvestigations();
  $('#visible-count').textContent = `${items.length}件`;
  $('#investigation-list').innerHTML = items.map((item) => {
    const environment = environmentFor(item);
    return `<button class="investigation-item ${item.id === state.selectedId ? 'is-selected' : ''} ${item.lifecycle === 'archived' ? 'is-archived' : ''}" type="button" data-investigation-id="${item.id}" role="listitem">
      <span class="investigation-item__dot"></span>
      <span class="investigation-item__main"><span class="investigation-item__top"><span class="investigation-item__key">${esc(item.key)}</span><time>${esc(formatCompact(item.lastActivityAt))}</time></span><span class="investigation-item__title">${esc(item.title)}</span><span class="investigation-item__meta"><span class="environment-mini">${esc(environment.name)}</span><span>· 担当 ${esc(leadAnalystFor(item).name)}</span>${item.lifecycle === 'archived' ? '<span>· アーカイブ</span>' : ''}</span></span>
    </button>`;
  }).join('');
}

function renderWorkspaceSwitcher() {
  $('#workspace-name').textContent = state.organization;
}

function renderOrganizationList() {
  $('#organization-list').innerHTML = organizations().map((organization) => {
    const organizationConnections = environmentsForOrganization(organization).flatMap((environment) => environment.connections);
    const investigationCount = investigations.filter((item) => organizationFor(item) === organization && item.lifecycle !== 'archived').length;
    const isSelf = organization === 'West INC';
    return `<button class="organization-option ${organization === state.organization ? 'is-active' : ''}" type="button" data-organization="${esc(organization)}" role="listitem"><span class="organization-option__mark">${isSelf ? 'W' : '◫'}</span><span><strong>${esc(organization)}</strong><small>${isSelf ? '自社' : '顧客'} · 接続済み製品 ${organizationConnections.length}件 · 調査 ${investigationCount}件</small></span>${organization === state.organization ? '<span class="organization-option__current">選択中</span>' : ''}</button>`;
  }).join('');
}

function openAnalystDirectory() {
  $('#analyst-directory-list').innerHTML = analysts.map((analyst) => `<article class="analyst-directory-item${analyst.id === currentUser.id ? ' is-current-user' : ''}" role="listitem"><span class="analyst-directory-avatar">${esc(analyst.initials)}</span><strong>${esc(analyst.name)}</strong></article>`).join('');
  $('#analyst-directory-layer').classList.add('is-open');
  $('#analyst-directory-layer').setAttribute('aria-hidden', 'false');
}

function closeAnalystDirectory() {
  $('#analyst-directory-layer').classList.remove('is-open');
  $('#analyst-directory-layer').setAttribute('aria-hidden', 'true');
}

function renderHeader() {
  const item = selected();
  const environment = environmentFor(item);
  const leadAnalyst = leadAnalystFor(item);
  const editable = canEdit(item);
  $('#investigation-header').innerHTML = `<div class="investigation-breadcrumb"><span class="environment-mark">◫</span><span>${esc(environment.organization)}</span><span>›</span><span>${esc(environment.name.split(' / ').at(-1))}</span></div>
    <div class="investigation-title-row"><div class="investigation-title-wrap"><span class="investigation-key">${esc(item.key)}</span><div class="investigation-title-edit"><h1 class="investigation-title">${esc(item.title)}</h1>${editable ? '<button class="title-edit-button" type="button" data-action="edit-title" aria-label="調査タイトルを編集" title="調査タイトルを編集">✎</button>' : ''}</div></div><div class="investigation-actions"><button class="quiet-button" type="button" data-action="copy-key">IDをコピー</button>${editable || item.lifecycle === 'archived' ? `<button class="quiet-button" type="button" data-action="archive">${item.lifecycle === 'archived' ? '再開する' : 'アーカイブ'}</button>` : ''}</div></div>
    <div class="investigation-subline"><span class="information-chip information-chip--environment">◫ ${esc(environment.type)}</span><span class="information-chip information-chip--owner">調査担当 ${esc(leadAnalyst.name)}</span><span class="information-chip">最終活動 ${esc(formatCompact(item.lastActivityAt))}</span>${item.lifecycle === 'archived' ? '<span class="information-chip information-chip--archived">アーカイブ済み</span>' : ''}</div>`;
  $('#evidence-count').textContent = allEvidence(item).length;
  $('#related-count').textContent = item.related.length;
  $$('.workspace-tabs button').forEach((button) => button.classList.toggle('is-active', button.dataset.tab === state.tab));
}

function renderTimeline() {
  const stage = $('#content-stage');
  stage.innerHTML = timelineHtml(selected(), { dateKey, esc, evidenceById, formatDate, formatTime, initialsFor, multiline });
  stage.scrollTop = stage.scrollHeight;
}

function renderEvidence() {
  const item = selected();
  const evidence = allEvidence(item);
  $('#content-stage').innerHTML = `<div class="evidence-view"><div class="view-intro"><div><h2>根拠</h2></div><p>AIの回答と所見は、ここに登録された根拠へ戻って確認できます。</p></div><div class="evidence-ledger">${evidence.length ? evidence.map((entry) => `<article class="evidence-card"><p class="evidence-card__source">${esc(entry.type)}</p><div><h3>${esc(entry.title)}</h3><p>${esc(entry.summary)}</p><p class="evidence-card__meta">${esc(entry.product)} · 観測 ${esc(entry.observedAt)} · 取得 ${esc(entry.capturedAt)}</p></div><button type="button" data-evidence-id="${entry.id}">確認</button></article>`).join('') : '<p class="timeline-empty">まだ根拠は追加されていません。AIへ質問すると、取得できた根拠がここへ整理されます。</p>'}</div></div>`;
}

function renderRelated() {
  const item = selected();
  $('#content-stage').innerHTML = `<div class="related-view"><div class="view-intro"><div><h2>関連</h2></div><p>同じ対象や活動に関する調査を、根拠を添えて関連付けます。</p></div><div class="related-list">${item.related.length ? item.related.map((relation) => { const environment = environments.find((entry) => entry.id === relation.environmentId); return `<article class="related-card"><span class="related-card__line"></span><div><h3>${esc(relation.key)} · ${esc(relation.title)}</h3><p>${esc(relation.relation)} · ${esc(environment?.organization || '')}</p></div><button type="button" data-related-target="${esc(relation.id)}">開く</button></article>`; }).join('') : '<p class="timeline-empty">関連調査はまだありません。AIは候補を示せますが、関連付けの確定はアナリストが行います。</p>'}</div></div>`;
}

function renderContext() {
  const item = selected();
  const environment = environmentFor(item);
  $('#context-scroll').innerHTML = contextPanelHtml({
    item,
    environment,
    decision: item.decisions.at(-1),
    editable: canEdit(item),
    leadAnalyst: leadAnalystFor(item),
    esc,
    formatCompact,
    multiline,
  });
}

function renderStage() { if (state.tab === 'evidence') renderEvidence(); else if (state.tab === 'related') renderRelated(); else renderTimeline(); }
function renderComposer() {
  const editable = canEdit();
  const composer = $('#composer');
  composer.classList.toggle('is-readonly', !editable);
  $('#message-input').disabled = !editable;
  $('.send-button').disabled = !editable;
  if (!editable) {
    state.activeCommand = null;
    $('#message-input').value = '';
    $('#message-input').placeholder = selected().lifecycle === 'archived' ? 'この調査はアーカイブされています。再開すると投稿できます。' : `この調査は${leadAnalystFor(selected()).name}が担当しています。引き継ぐと投稿できます。`;
    $('.prompt-button').disabled = true;
    setComposerHint({ kind: 'ask' }, false);
    $('#slash-command-menu').hidden = true;
    renderActiveCommandToken();
  } else {
    updateComposerIntent();
  }
}
function renderAll({ keepScroll = false } = {}) { const stage = $('#content-stage'); const before = stage.scrollTop; renderWorkspaceSwitcher(); renderRail(); renderHeader(); renderContext(); renderStage(); renderComposer(); if (keepScroll && state.tab === 'timeline') stage.scrollTop = before; }

function setTab(tab) { state.tab = tab; renderHeader(); renderStage(); }
function selectInvestigation(id) { const item = investigations.find((entry) => entry.id === id); if (!item) return; state.selectedId = id; state.organization = organizationFor(item); state.tab = 'timeline'; populateEnvironmentSelects(); renderAll(); }

function selectOrganization(organization) {
  if (!organizations().includes(organization)) return;
  state.organization = organization;
  const scopedInvestigations = investigations.filter((item) => organizationFor(item) === organization).sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt));
  const next = scopedInvestigations.find((item) => item.lifecycle === 'active') || scopedInvestigations[0];
  if (next) state.selectedId = next.id;
  $('#organization-dialog').close();
  populateEnvironmentSelects();
  renderAll();
}

function openEvidence(id) {
  const evidence = evidenceById(id);
  if (!evidence) return;
  $('#evidence-dialog-content').innerHTML = `<div class="evidence-detail"><span class="evidence-detail__source">${esc(evidence.type)} · ${esc(evidence.product)}</span><h3>${esc(evidence.title)}</h3><p>${esc(evidence.summary)}</p><dl><dt>取得元</dt><dd>${esc(evidence.source)}</dd><dt>観測日時</dt><dd>${esc(evidence.observedAt)}</dd><dt>取得日時</dt><dd>${esc(evidence.capturedAt)}</dd></dl><pre>${esc(JSON.stringify(evidence.extract, null, 2))}</pre></div>`;
  $('#evidence-dialog').showModal();
}

function populateEnvironmentSelects() {
  const organizationSelect = $('#new-organization');
  organizationSelect.innerHTML = organizations().map((organization) => `<option value="${esc(organization)}">${esc(organization)}</option>`).join('');
  organizationSelect.value = state.organization;
}

function renderSearchResults() {
  const query = $('#search-query').value.trim().toLowerCase();
  const results = investigations.filter((item) => {
    const environment = environmentFor(item);
    const haystack = [item.key, item.title, environment.name, environment.organization, ...item.contextItems.map((context) => context.label)].join(' ').toLowerCase();
    return organizationFor(item) === state.organization && (!query || haystack.includes(query));
  }).sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt));
  $('#search-result-summary').textContent = `${results.length}件の調査`;
  $('#search-result-list').innerHTML = results.map((item) => `<button class="search-result" type="button" data-search-result="${item.id}" role="listitem"><span><h3>${esc(item.key)} · ${esc(item.title)}</h3><p>${esc(environmentFor(item).name)} · 最終活動 ${esc(formatCompact(item.lastActivityAt))}</p></span>${item.lifecycle === 'archived' ? '<time>アーカイブ</time>' : ''}</button>`).join('') || '<p class="timeline-empty">一致する調査はありません。</p>';
}

function addTimelineEntry(item, entry) { item.timeline.push(entry); item.lastActivityAt = entry.at; }
function isoNow() { return new Date().toISOString(); }

function submitComposer(event) {
  event.preventDefault();
  if (!canEdit()) { showToast('AIとの対話は調査担当のアナリストだけが実行できます。'); return; }
  const input = $('#message-input');
  const intent = parseComposerIntent(input.value);
  const text = intent.text;
  if (!text || state.aiWorking) return;
  const item = selected();
  const at = isoNow();
  input.value = '';
  state.activeCommand = null;
  state.slashMenuDismissed = false;
  renderSlashCommandMenu();
  if (intent.kind === 'record') {
    if (intent.recordType === 'decision') {
      item.decisions.push({ author: currentUser.name, at, text, command: intent.command });
      addTimelineEntry(item, { id: `decision-${Date.now()}`, type: 'decision', author: currentUser.name, at, text, command: intent.command });
      renderAll();
      showToast('アナリスト判断を記録しました。');
      return;
    }
    if (intent.recordType === 'finding') {
      const findingState = intent.findingState || 'analyst';
      item.findings.push({ state: findingState, text, command: intent.command });
      addTimelineEntry(item, { id: `finding-${Date.now()}`, type: 'finding', author: currentUser.name, at, text, command: intent.command });
      renderAll();
      showToast(intent.notice || 'アナリスト所見を記録しました。');
      return;
    }
    addTimelineEntry(item, { id: `note-${Date.now()}`, type: 'note', author: currentUser.name, at, text, command: intent.command });
    renderAll();
    showToast('調査記録を追加しました。');
    return;
  }
  addTimelineEntry(item, { id: `note-${Date.now()}`, type: 'note', author: currentUser.name, at, text });
  state.aiWorking = true;
  addTimelineEntry(item, { id: `run-${Date.now()}`, type: 'run', at: new Date(Date.now() + 450).toISOString(), title: 'AIが調査を実行', summary: '現在の調査コンテキストと利用可能な接続を照合しています。', details: ['調査対象Environmentで利用可能な読み取り接続を選択', '既存の調査根拠と関連する対象を確認', '外部操作は実行していません'] });
  renderAll();
  window.setTimeout(() => {
    const responseAt = isoNow();
    if (!item.findings.some((finding) => finding.text === '追加調査の結果は、既存の確認済み事項と矛盾していません。')) item.findings.push({ state: 'inferred', text: '追加調査の結果は、既存の確認済み事項と矛盾していません。' });
    addTimelineEntry(item, { id: `ai-${Date.now()}`, type: 'assistant', author: 'West Hawk', at: responseAt, text: '入力内容を調査記録へ追加しました。現在のEnvironmentで確認できる根拠を照合したところ、既存の所見と矛盾する情報は確認されていません。追加の外部データが必要な場合は、対象のURLまたは識別子を外部参照として追加してください。', evidenceRefs: item.evidence.slice(0, 2).map((evidence) => evidence.id) });
    state.aiWorking = false;
    renderAll();
  }, 760);
}

function createInvestigation(event) {
  event.preventDefault();
  const organization = $('#new-organization').value;
  const environmentId = environmentsForOrganization(organization)[0]?.id;
  if (!environmentId) { showToast('調査対象組織の接続設定が見つかりません。'); return; }
  const title = $('#new-title').value.trim() || '無題の調査';
  const reference = $('#new-reference').value.trim();
  const now = isoNow();
  const sequence = String(185 + investigations.length).padStart(6, '0');
  const item = { id: `inv-${Date.now()}`, key: `WH-INV-2026-${sequence}`, title, environmentId, lifecycle: 'active', createdAt: now, lastActivityAt: now, createdBy: currentUser.name, leadAnalyst: { ...currentUser }, contextItems: [], externalReferences: reference ? [{ system: reference.startsWith('http') ? '外部URL' : '外部参照', value: reference, url: reference.startsWith('http') ? reference : '' }] : [], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: `created-${Date.now()}`, type: 'note', author: currentUser.name, at: now, text: `調査を開始しました。対象Environment: ${environmentFor({ environmentId }).name}` }] };
  investigations.unshift(item);
  state.selectedId = item.id;
  state.organization = environmentFor(item).organization;
  state.tab = 'timeline';
  $('#new-dialog').close();
  event.target.reset();
  populateEnvironmentSelects();
  renderAll();
  showToast('新しい調査を開始しました。');
}

function createReference(event) {
  event.preventDefault();
  if (!canEdit()) return;
  const system = $('#reference-system').value;
  const value = $('#reference-value').value.trim();
  if (!value) return;
  const item = selected();
  item.externalReferences.push({ system, value, url: value.startsWith('http') ? value : '' });
  const at = isoNow();
  addTimelineEntry(item, { id: `reference-${Date.now()}`, type: 'note', author: currentUser.name, at, text: `外部参照を追加しました。${system}: ${value}` });
  $('#reference-dialog').close();
  event.target.reset();
  renderAll();
  showToast('外部参照を追加しました。');
}

function updateTitle(event) {
  event.preventDefault();
  if (!canEdit()) return;
  const title = $('#title-value').value.trim();
  if (!title) return;
  const item = selected();
  const before = item.title;
  item.title = title;
  const at = isoNow();
  addTimelineEntry(item, { id: `title-${Date.now()}`, type: 'note', author: currentUser.name, at, text: `調査タイトルを「${before}」から「${title}」へ変更しました。` });
  $('#title-dialog').close();
  renderAll();
  showToast('調査タイトルを変更しました。');
}

function renderPromptList() {
  $('#prompt-list').innerHTML = Object.entries(investigationPrompts).map(([key, prompt]) => `<button class="prompt-option ${key === state.promptKey ? 'is-active' : ''}" type="button" role="listitem" aria-pressed="${key === state.promptKey}" data-prompt-key="${key}"><strong>${esc(prompt.title)}</strong><span>${esc(prompt.description)}</span></button>`).join('');
}

function selectPrompt(key) {
  const prompt = investigationPrompts[key];
  if (!prompt) return;
  state.promptKey = key;
  $('#prompt-description').textContent = prompt.description;
  $('#prompt-value').value = prompt.prompt;
  renderPromptList();
}

function openPrompt() {
  if (!canEdit()) return;
  selectPrompt(state.promptKey);
  $('#prompt-dialog').showModal();
  requestAnimationFrame(() => $('#prompt-value').focus());
}

function submitPrompt(event) {
  event.preventDefault();
  if (!canEdit()) return;
  const text = $('#prompt-value').value.trim();
  if (!text) { $('#prompt-value').focus(); return; }
  $('#prompt-dialog').close();
  $('#message-input').value = text;
  updateComposerIntent();
  $('#composer').requestSubmit();
}

function parseComposerIntent(value) {
  const input = value.trim();
  if (state.activeCommand) return { kind: 'record', command: state.activeCommand.command, recordType: state.activeCommand.recordType, findingState: state.activeCommand.findingState, label: state.activeCommand.label, notice: state.activeCommand.notice, text: input };
  const match = input.match(/^\/([^\s]+)(?:\s+([\s\S]*))?$/);
  if (!match) return { kind: 'ask', text: input };
  const typedCommand = `/${match[1].toLowerCase()}`;
  const command = slashCommands.find((entry) => entry.aliases.some((alias) => alias.toLowerCase() === typedCommand));
  return command ? { kind: 'record', command: command.command, recordType: command.recordType, findingState: command.findingState, label: command.label, notice: command.notice, text: (match[2] || '').trim() } : { kind: 'ask', text: input };
}

function slashCommandCandidates(value = $('#message-input').value) {
  const match = value.match(/^\s*\/([^\s]*)$/);
  if (!match) return [];
  const query = `/${match[1].toLowerCase()}`;
  return slashCommands.filter((entry) => entry.aliases.some((alias) => alias.toLowerCase().startsWith(query)));
}

function renderSlashCommandMenu() {
  const menu = $('#slash-command-menu');
  const candidates = state.slashMenuDismissed ? [] : slashCommandCandidates();
  if (!candidates.length) { menu.hidden = true; return; }
  state.commandIndex = Math.min(state.commandIndex, candidates.length - 1);
  menu.innerHTML = candidates.map((command, index) => `<button class="slash-command-option ${index === state.commandIndex ? 'is-selected' : ''}" type="button" role="option" aria-selected="${index === state.commandIndex}" data-slash-command="${esc(command.command)}"><kbd>${esc(command.command)}</kbd><span>${esc(command.label)} · ${esc(command.description)}</span></button>`).join('');
  menu.hidden = false;
}

function selectSlashCommand(commandValue) {
  const command = slashCommands.find((entry) => entry.command === commandValue);
  if (!command || !canEdit()) return;
  state.activeCommand = command;
  $('#message-input').value = '';
  state.commandIndex = 0;
  state.slashMenuDismissed = false;
  updateComposerIntent();
  $('#message-input').focus();
}

function promoteTypedCommand() {
  if (state.activeCommand) return false;
  const input = $('#message-input');
  const match = input.value.match(/^\s*(\/[^\s]+)(?:\s+([\s\S]*))?$/);
  if (!match) return false;
  const typedCommand = match[1].toLowerCase();
  const command = slashCommands.find((entry) => entry.aliases.some((alias) => alias.toLowerCase() === typedCommand));
  if (!command) return false;
  state.activeCommand = command;
  input.value = match[2] || '';
  return true;
}

function renderActiveCommandToken() {
  const token = $('#active-command-token');
  const command = state.activeCommand;
  if (!command) { token.hidden = true; token.innerHTML = ''; return; }
  token.hidden = false;
  token.innerHTML = `<span>${esc(command.command.replace(/^\//, ''))}</span><button type="button" data-action="clear-command" aria-label="${esc(command.label)}を解除" title="コマンドを解除">×</button>`;
}

function clearActiveCommand() {
  state.activeCommand = null;
  $('#message-input').value = '';
  state.commandIndex = 0;
  state.slashMenuDismissed = false;
  updateComposerIntent();
  $('#message-input').focus();
}

function setComposerHint(intent, editable = true) {
  const hint = $('#composer-hint');
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l2.5 1.5"></path></svg>';
  const recordHints = {
    note: 'AIには送信せず、確認した情報を調査記録として時系列に残します。',
    finding: 'AIには送信せず、根拠を踏まえたアナリスト所見として残します。',
    decision: 'AIには送信せず、次の方針や明示的なアナリスト判断として残します。',
  };
  const text = !editable
    ? selected().lifecycle === 'archived'
      ? 'この調査はアーカイブされています。再開すると、AIへの質問と調査記録を追加できます。'
      : `この調査は${leadAnalystFor(selected()).name}が担当しています。引き継ぐと投稿できます。`
    : intent.kind === 'ask'
      ? 'AIは利用可能な調査手段を選び、根拠と制約を分けて回答します。'
      : recordHints[intent.recordType];
  hint.innerHTML = `${icon}${esc(text)}`;
}

function updateComposerIntent() {
  if (!canEdit()) return;
  const intent = parseComposerIntent($('#message-input').value);
  renderActiveCommandToken();
  $('#message-input').placeholder = 'AIに質問、または / で記録の種類を選択…';
  $('#send-label').textContent = intent.kind === 'ask' ? 'AIに質問' : intent.label;
  $('.send-button').setAttribute('aria-label', intent.kind === 'ask' ? 'AIに質問' : intent.label);
  $('.prompt-button').disabled = intent.kind !== 'ask';
  setComposerHint(intent);
  renderSlashCommandMenu();
}

function toggleContext() {
  state.contextOpen = !state.contextOpen;
  $('#workspace-grid').classList.toggle('is-panel-closed', !state.contextOpen);
  document.body.classList.toggle('context-hidden', !state.contextOpen);
  $$('[data-action="toggle-context"]').forEach((button) => { button.setAttribute('aria-pressed', String(state.contextOpen)); button.setAttribute('aria-label', state.contextOpen ? '調査コンテキストを隠す' : '調査コンテキストを表示する'); });
}

function transferInvestigation(event) {
  event.preventDefault();
  const item = selected();
  const previous = leadAnalystFor(item);
  if (previous.id === currentUser.id) return;
  item.leadAnalyst = { ...currentUser };
  const at = isoNow();
  addTimelineEntry(item, { id: `transfer-${Date.now()}`, type: 'system', author: 'System', at, text: `調査担当を ${previous.name} から ${currentUser.name} に変更しました。変更者: ${currentUser.name}` });
  $('#transfer-dialog').close();
  renderAll();
  showToast('調査を引き継ぎました。AIとの対話と記録を追加できます。');
}

function openArchiveDialog() {
  const item = selected();
  const archived = item.lifecycle === 'archived';
  $('#archive-dialog-title').textContent = archived ? '調査を再開する' : '調査をアーカイブ';
  $('#archive-dialog-message').textContent = archived
    ? 'この調査を最近の調査へ戻します。調査記録や根拠はそのまま保持されます。'
    : 'この調査を最近の調査から外します。調査記録や根拠は削除されず、検索から後で再開できます。';
  $('#archive-confirm-button').textContent = archived ? '再開する' : 'アーカイブする';
  $('#archive-dialog').showModal();
}

function confirmArchive(event) {
  event.preventDefault();
  const item = selected();
  if (!canEdit(item) && item.lifecycle !== 'archived') return;
  item.lifecycle = item.lifecycle === 'archived' ? 'active' : 'archived';
  item.lastActivityAt = isoNow();
  $('#archive-dialog').close();
  renderAll();
  showToast(item.lifecycle === 'archived' ? '調査をアーカイブしました。' : '調査を再開しました。');
}

function toggleTheme() {
  state.theme = state.theme === 'standard' ? 'night-ops' : 'standard';
  const enabled = state.theme === 'night-ops';
  document.body.classList.toggle('theme-night-ops', enabled);
  $('#night-ops-theme').disabled = !enabled;
  $('.theme-toggle').setAttribute('aria-pressed', String(enabled));
  showToast(enabled ? '夜間管制テーマを表示しています。' : '標準テーマを表示しています。');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    const tab = event.target.closest('[data-tab]')?.dataset.tab;
    const investigationId = event.target.closest('[data-investigation-id]')?.dataset.investigationId;
    const evidenceId = event.target.closest('[data-evidence-id]')?.dataset.evidenceId;
    const relatedTarget = event.target.closest('[data-related-target]')?.dataset.relatedTarget;
    const searchResult = event.target.closest('[data-search-result]')?.dataset.searchResult;
    const promptKey = event.target.closest('[data-prompt-key]')?.dataset.promptKey;
    const organization = event.target.closest('[data-organization]')?.dataset.organization;
    const slashCommand = event.target.closest('[data-slash-command]')?.dataset.slashCommand;
    if (tab) { setTab(tab); return; }
    if (investigationId) { selectInvestigation(investigationId); return; }
    if (evidenceId) { openEvidence(evidenceId); return; }
    if (relatedTarget) { selectInvestigation(relatedTarget); return; }
    if (searchResult) { $('#search-dialog').close(); selectInvestigation(searchResult); return; }
    if (promptKey) { selectPrompt(promptKey); return; }
    if (organization) { selectOrganization(organization); return; }
    if (slashCommand) { selectSlashCommand(slashCommand); return; }
    if (!action) return;
    if (action === 'open-search') { renderSearchResults(); $('#search-dialog').showModal(); $('#search-query').focus(); }
    if (action === 'open-new') { populateEnvironmentSelects(); $('#new-dialog').showModal(); $('#new-title').focus(); }
    if (action === 'open-organization-switch') { renderOrganizationList(); $('#organization-dialog').showModal(); }
    if (action === 'close-organization-switch') $('#organization-dialog').close();
    if (action === 'open-analyst-directory') openAnalystDirectory();
    if (action === 'close-analyst-directory') closeAnalystDirectory();
    if (action === 'close-new') $('#new-dialog').close();
    if (action === 'add-reference') { $('#reference-dialog').showModal(); $('#reference-value').focus(); }
    if (action === 'close-reference') $('#reference-dialog').close();
    if (action === 'edit-title') { $('#title-value').value = selected().title; $('#title-dialog').showModal(); $('#title-value').focus(); $('#title-value').select(); }
    if (action === 'close-title') $('#title-dialog').close();
    if (action === 'open-transfer') $('#transfer-dialog').showModal();
    if (action === 'close-transfer') $('#transfer-dialog').close();
    if (action === 'open-prompt') openPrompt();
    if (action === 'close-prompt') $('#prompt-dialog').close();
    if (action === 'close-search') $('#search-dialog').close();
    if (action === 'close-archive') $('#archive-dialog').close();
    if (action === 'close-evidence') $('#evidence-dialog').close();
    if (action === 'toggle-context') toggleContext();
    if (action === 'toggle-theme') toggleTheme();
    if (action === 'copy-key') { navigator.clipboard?.writeText(selected().key).catch(() => {}); showToast(`${selected().key} をコピーしました。`); }
    if (action === 'archive' && (canEdit() || selected().lifecycle === 'archived')) openArchiveDialog();
    if (action === 'open-reference') showToast('外部製品への遷移は本番のConnection設定から行います。');
    if (action === 'open-settings') showToast('設定は運用組織の管理画面として分離する想定です。');
    if (action === 'profile') showToast('プロフィールは認証基盤のユーザー情報と連携する想定です。');
    if (action === 'clear-command') clearActiveCommand();
  });
  $('#composer').addEventListener('submit', submitComposer);
  $('#new-investigation-form').addEventListener('submit', createInvestigation);
  $('#reference-form').addEventListener('submit', createReference);
  $('#title-form').addEventListener('submit', updateTitle);
  $('#transfer-form').addEventListener('submit', transferInvestigation);
  $('#archive-form').addEventListener('submit', confirmArchive);
  $('#prompt-form').addEventListener('submit', submitPrompt);
  $('#search-form').addEventListener('submit', (event) => { event.preventDefault(); renderSearchResults(); });
  $('#search-query').addEventListener('input', renderSearchResults);
  $('#message-input').addEventListener('input', () => { state.commandIndex = 0; state.slashMenuDismissed = false; promoteTypedCommand(); updateComposerIntent(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && $('#analyst-directory-layer').classList.contains('is-open')) { closeAnalystDirectory(); return; }
    if (document.activeElement === $('#message-input')) {
      if (state.activeCommand && event.key === 'Escape') { event.preventDefault(); clearActiveCommand(); return; }
      const candidates = slashCommandCandidates();
      const menu = $('#slash-command-menu');
      if (!menu.hidden && candidates.length) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          state.commandIndex = (state.commandIndex + (event.key === 'ArrowDown' ? 1 : -1) + candidates.length) % candidates.length;
          renderSlashCommandMenu();
          return;
        }
        if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault();
          selectSlashCommand(candidates[state.commandIndex].command);
          return;
        }
        if (event.key === 'Escape') { event.preventDefault(); state.slashMenuDismissed = true; renderSlashCommandMenu(); return; }
      }
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') { event.preventDefault(); renderSearchResults(); $('#search-dialog').showModal(); $('#search-query').focus(); }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && document.activeElement === $('#message-input')) $('#composer').requestSubmit();
  });
}

function initialize() { populateEnvironmentSelects(); renderAll(); updateComposerIntent(); bindEvents(); }
initialize();
