export const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

export const multiline = (value = '') => esc(value).replace(/\r?\n/g, '<br>');

export const formatTime = (value) => new Intl.DateTimeFormat('ja-JP', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo',
}).format(new Date(value));

export const formatDate = (value) => new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'short', timeZone: 'Asia/Tokyo',
}).format(new Date(value));

export const formatCompact = (value) => new Intl.DateTimeFormat('ja-JP', {
  month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo',
}).format(new Date(value));

export const dateKey = (value) => new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo',
}).format(new Date(value));
