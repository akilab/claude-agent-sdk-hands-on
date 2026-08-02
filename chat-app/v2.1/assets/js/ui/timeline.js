/* Pure timeline view. React will replace this with Timeline components. */
export function timelineHtml(item, { dateKey, esc, evidenceById, formatDate, formatTime, initialsFor, multiline }) {
  const events = [...item.timeline].sort((a, b) => new Date(a.at) - new Date(b.at));
  let previous = '';
  const entries = events.map((entry) => {
    const key = dateKey(entry.at);
    const divider = key === previous ? '' : `<div class="timeline-date-divider"><span>${esc(formatDate(entry.at))}</span></div>`;
    previous = key;
    return `${divider}${timelineEntryHtml(entry)}`;
  }).join('');
  return `<div class="timeline">${entries || '<p class="timeline-empty">まだ調査記録はありません。AIへの質問、または調査記録を投稿して開始してください。</p>'}</div>`;
}

function timelineEntryHtml(entry) {
  const author = entry.type === 'run' ? 'West Hawk' : entry.author;
  const meta = `<div class="timeline-entry__meta"><strong>${esc(author)}</strong><time title="${esc(entry.at)}">${esc(formatTime(entry.at))}</time></div>`;
  const marker = entry.type === 'assistant' ? '<span class="timeline-marker timeline-marker--assistant"><img src="assets/img/logo-design.svg" alt="West Hawk"></span>' : entry.type === 'run' ? '<span class="timeline-marker timeline-marker--run"><img src="assets/img/logo-design.svg" alt="West Hawk"></span>' : entry.type === 'decision' ? `<span class="timeline-marker timeline-marker--decision">${esc(initialsFor(entry.author || ''))}</span>` : entry.type === 'system' ? '<span class="timeline-marker timeline-marker--system">⌁</span>' : `<span class="timeline-marker">${esc(initialsFor(entry.author || ''))}</span>`;
  const command = entry.command ? `<span class="entry-command">${esc(entry.command.replace(/^\//, ''))}</span>` : '';
  if (entry.type === 'run') return `<article class="timeline-entry timeline-entry--run">${marker}<div class="timeline-entry__content">${meta}<div class="run-summary"><span class="run-summary__icon"><img src="assets/img/logo-design.svg" alt=""></span><div class="run-summary__body"><strong>${esc(entry.title)}</strong><p>${esc(entry.summary)}</p><details><summary>取得範囲と制約</summary><ul>${entry.details.map((detail) => `<li>${esc(detail)}</li>`).join('')}</ul></details></div></div></div></article>`;
  if (entry.type === 'decision') return `<article class="timeline-entry timeline-entry--decision">${marker}<div class="timeline-entry__content">${meta}<div class="decision-card"><div class="decision-card__label"><span></span>${command || 'アナリスト判断'}</div><p>${multiline(entry.text)}</p></div></div></article>`;
  if (entry.type === 'system') return `<article class="timeline-entry timeline-entry--system">${marker}<div class="timeline-entry__content"><div class="system-event"><strong>System</strong><p>${multiline(entry.text)}</p><time title="${esc(entry.at)}">${esc(formatTime(entry.at))}</time></div></div></article>`;
  if (entry.type === 'assistant') {
    const refs = (entry.evidenceRefs || []).map((id) => evidenceById(id)).filter(Boolean);
    const rail = refs.length ? `<div class="evidence-rail"><span class="evidence-rail__lead">調査根拠 ${refs.length}件</span><div class="evidence-rail__items">${refs.map((evidence) => `<button class="evidence-link" type="button" data-evidence-id="${evidence.id}"><span class="evidence-link__mark">▣</span>${esc(evidence.title)}</button>`).join('')}</div></div>` : '';
    return `<article class="timeline-entry timeline-entry--assistant">${marker}<div class="timeline-entry__content">${meta}<div class="ai-answer"><div class="ai-answer__content"><p>${multiline(entry.text)}</p></div>${rail}</div></div></article>`;
  }
  if (entry.type === 'finding') return `<article class="timeline-entry timeline-entry--note timeline-entry--finding">${marker}<div class="timeline-entry__content">${meta}<div class="timeline-entry__body analyst-note"><span class="analyst-finding-label">${command || 'アナリスト所見'}</span><p>${multiline(entry.text)}</p></div></div></article>`;
  return `<article class="timeline-entry timeline-entry--note">${marker}<div class="timeline-entry__content">${meta}<div class="timeline-entry__body analyst-note"><p>${command}${multiline(entry.text)}</p></div></div></article>`;
}
