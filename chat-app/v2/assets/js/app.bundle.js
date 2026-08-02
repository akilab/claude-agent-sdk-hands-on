/*
 * West Hawk Mock browser bundle (generated).
 * Source: assets/js/ modules. Rebuild: node tools/build-static-bundle.mjs
 */
(() => {
/* Mock data boundary. Replace this module with API queries when moving to React. */
const currentUser = { id: 'usr-tanaka', name: '田中 明', initials: 'AT' };
const analysts = [
  currentUser,
  { id: 'usr-sato', name: '佐藤 美咲', initials: 'MS' },
  { id: 'usr-suzuki', name: '鈴木 翔', initials: 'SS' },
  { id: 'usr-yamada', name: '山田 健太', initials: 'YK' },
  { id: 'usr-ito', name: '伊藤 智也', initials: 'IT' },
  { id: 'usr-takahashi', name: '高橋 直樹', initials: 'NT' },
  { id: 'usr-okada', name: '岡田 拓海', initials: 'OT' },
  { id: 'usr-saito', name: '斎藤 浩司', initials: 'SK' },
  { id: 'usr-kato', name: '加藤 彩', initials: 'KA' },
  { id: 'usr-fujita', name: '藤田 遥', initials: 'FH' },
];

const environments = [
  { id: 'env-contoso-prod', name: 'Contoso Japan / 本番テナント', organization: 'Contoso Japan', type: '顧客環境', connections: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'Zscaler'], policy: '社外AIへの送信は根拠の要約のみ' },
  { id: 'env-northstar-prod', name: 'West INC / 社内環境', organization: 'West INC', type: '自社環境', connections: ['Microsoft Defender XDR', 'Microsoft Sentinel', 'SKYSEA'], policy: '社内調査ポリシー v2.1' },
  { id: 'env-fabrikam-cloud', name: '河野製作所 / 本番テナント', organization: '河野製作所', type: '顧客環境', connections: ['Microsoft Sentinel', 'Microsoft Defender XDR'], policy: '顧客承認済みデータ範囲のみ' },
];

const investigations = [
  {
    id: '019c2e73-8a41-7be2-9c18-4f2ea51b2201', key: 'WH-INV-2026-000184', title: '疑わしいサインインと特権操作', environmentId: 'env-contoso-prod', lifecycle: 'active', createdAt: '2026-08-01T21:46:12+09:00', lastActivityAt: '2026-08-02T10:35:32+09:00', createdBy: '田中 明',
    contextItems: [
      { icon: '◉', label: 'user1@contoso.com', detail: 'Microsoft Entra ID · 営業部', kind: 'ユーザー' },
      { icon: '▣', label: 'WIN-SRV-01.contoso.com', detail: 'Windows Server 2022 · 管理サーバー', kind: 'ホスト' },
      { icon: '⌁', label: '198.51.100.24', detail: 'オランダ · ASN 8075', kind: 'IPアドレス' },
    ],
    externalReferences: [
      { system: 'Microsoft Sentinel', value: 'Incident 4821', url: 'https://security.example/sentinel/4821' },
      { system: 'ServiceNow', value: 'INC0018421', url: 'https://security.example/servicenow/INC0018421' },
    ],
    evidence: [
      { id: 'ev-184-signin', type: '外部アラート', title: 'Impossible Travel', summary: '通常利用地域と異なるオランダからの成功サインインを確認。', product: 'Microsoft Sentinel', observedAt: '2026-08-01 21:42:08 JST', capturedAt: '2026-08-02 09:51:19 JST', source: 'Contoso Sentinel / Alert 6c18f21a', extract: { severity: 'high', providerStatus: 'active', technique: 'T1078', user: 'user1@contoso.com', sourceIp: '198.51.100.24' } },
      { id: 'ev-184-role', type: '検索結果', title: 'Directory role assignment', summary: '異常サインインの18分後にHelpdesk Administratorへの追加を確認。', product: 'Microsoft Sentinel', observedAt: '2026-08-01 22:00:31 JST', capturedAt: '2026-08-02 09:53:02 JST', source: 'Contoso Sentinel / AuditLogs query', extract: { operation: 'Add member to role', target: 'Helpdesk Administrator', initiatedBy: 'user1@contoso.com', result: 'success' } },
      { id: 'ev-184-host', type: '対象情報', title: 'WIN-SRV-01 接続状況', summary: '対象ユーザーのアカウントを使ったRDP接続は確認されていません。', product: 'CrowdStrike Falcon', observedAt: '2026-08-02 09:08:45 JST', capturedAt: '2026-08-02 10:02:14 JST', source: 'Contoso Falcon / Host search', extract: { hostname: 'WIN-SRV-01', platform: 'Windows Server 2022', rdpLogon: 'not observed', status: 'online' } },
    ],
    findings: [],
    decisions: [{ author: '田中 明', at: '2026-08-02T10:31:08+09:00', text: '認証情報侵害の可能性を否定できないため、VPN利用有無と同一IPの横展開を追加確認する。' }],
    related: [
      { id: 'inv-183', relation: '同一ユーザー', key: 'WH-INV-2026-000176', title: '同一ユーザーのサインイン異常', environmentId: 'env-contoso-prod' },
      { id: 'inv-151', relation: '同一IPアドレス', key: 'WH-INV-2026-000151', title: 'VPN Geo Mismatch', environmentId: 'env-contoso-prod' },
    ],
    timeline: [
      { id: 'm-01', type: 'note', author: '田中 明', at: '2026-08-01T21:46:12+09:00', text: 'Sentinelのアラートを確認しました。対象ユーザーは営業部のuser1@contoso.comです。異常地域からのサインイン後に特権操作がないか確認します。' },
      { id: 'r-01', type: 'run', at: '2026-08-01T21:47:02+09:00', title: 'AIが調査を実行', summary: 'Microsoft Sentinel と CrowdStrike Falcon から、サインイン・特権操作・端末接続の根拠を取得しました。', details: ['Sentinel: サインイン履歴と監査ログを照会', 'CrowdStrike Falcon: 対象ホストのRDP接続状況を確認', '取得できなかった範囲: VPN利用履歴'] },
      { id: 'm-02', type: 'assistant', author: 'West Hawk', at: '2026-08-01T21:49:38+09:00', text: '異常地域からの成功サインインを確認しました。この時点ではVPN経由かどうかを判断できません。対象アカウントが直後に特権ロールへ追加されていないか、監査ログを確認します。', evidenceRefs: ['ev-184-signin'] },
      { id: 'm-02a', type: 'note', author: '田中 明', at: '2026-08-01T22:04:17+09:00', text: '利用部門へ、当該時刻のVPN利用と本人操作の有無を確認しています。回答が得られるまで、アカウントへの追加権限付与は見合わせます。' },
      { id: 'm-02b', type: 'assistant', author: 'West Hawk', at: '2026-08-01T22:08:49+09:00', text: '追加の監査ログでは、同一IPから他の利用者への操作は確認されていません。VPN利用履歴は未取得のため、正規利用かどうかは引き続き判断できません。', evidenceRefs: ['ev-184-signin'] },
      { id: 'm-02c', type: 'note', author: '田中 明', at: '2026-08-01T22:16:31+09:00', text: '夜間帯の追加調査はここで区切ります。朝の確認では、特権ロール変更と対象ホストの接続状況を優先します。' },
      { id: 'm-03', type: 'note', author: '田中 明', at: '2026-08-02T09:42:08+09:00', text: '夜間帯の監査ログを追加確認してください。特権ロールへの追加、対象ホストへのRDP接続、同一IPの他ユーザー利用を確認したいです。' },
      { id: 'r-02', type: 'run', at: '2026-08-02T09:50:55+09:00', title: 'AIが追加調査を実行', summary: '監査ログとエンドポイントの接続情報を照合し、2件の調査根拠を追加しました。', details: ['Sentinel: 特権ロールの変更を確認', 'CrowdStrike Falcon: WIN-SRV-01へのRDP接続有無を確認', '未確認: VPN装置のログはこのEnvironmentで接続未設定'] },
      { id: 'm-04', type: 'assistant', author: 'West Hawk', at: '2026-08-02T10:03:19+09:00', text: '異常サインインの18分後に、対象アカウントがHelpdesk Administratorへ追加されています。対象ホストへのRDP接続は確認できませんでした。VPNログへは接続されていないため、正規利用かどうかは未確認です。', evidenceRefs: ['ev-184-signin', 'ev-184-role', 'ev-184-host'] },
      { id: 'm-04a', type: 'note', author: '山田 健太', at: '2026-08-02T10:09:28+09:00', text: '夜間からの確認結果を追記しました。VPN利用履歴の照会は田中さんへ引き継ぎ、私は同一IPの横展開確認を継続します。' },
      { id: 'sys-01', type: 'system', author: 'System', at: '2026-08-02T10:12:03+09:00', text: '調査担当を 山田 健太 から 田中 明 に変更しました。変更者: 山田 健太' },
      { id: 'd-01', type: 'decision', author: '田中 明', at: '2026-08-02T10:31:08+09:00', text: '認証情報侵害の可能性を否定できないため、VPN利用有無と同一IPの横展開を追加確認する。' },
      { id: 'm-05', type: 'assistant', author: 'West Hawk', at: '2026-08-02T10:35:32+09:00', text: '次の確認として、VPN装置の利用履歴を外部参照として追加するか、対象IPの横展開を調べられる接続をEnvironmentへ登録してください。現時点で確認済みの事実と未確認事項は区別して保持されています。', evidenceRefs: ['ev-184-role'] },
    ],
  },
  { id: 'inv-183', key: 'WH-INV-2026-000176', title: '同一ユーザーのサインイン異常', environmentId: 'env-contoso-prod', lifecycle: 'active', createdAt: '2026-08-01T17:23:12+09:00', lastActivityAt: '2026-08-02T09:18:10+09:00', createdBy: '佐藤 美咲', contextItems: [{ icon: '◉', label: 'user1@contoso.com', detail: 'Microsoft Entra ID', kind: 'ユーザー' }], externalReferences: [{ system: 'Microsoft Sentinel', value: 'Incident 4789' }], evidence: [], findings: [{ state: 'inferred', text: '前日から異常な地域変更が継続している可能性' }], decisions: [], related: [], timeline: [{ id: 'x', type: 'note', author: '佐藤 美咲', at: '2026-08-02T09:18:10+09:00', text: '関連するサインイン履歴を確認中です。' }] },
  { id: 'inv-171', key: 'WH-INV-2026-000171', title: 'PowerShellによる資格情報アクセスの疑い', environmentId: 'env-northstar-prod', lifecycle: 'active', createdAt: '2026-08-01T12:20:00+09:00', lastActivityAt: '2026-08-02T08:44:12+09:00', createdBy: '鈴木 翔', contextItems: [{ icon: '▣', label: 'NS-LT-042', detail: 'Windows 11 Enterprise', kind: 'ホスト' }], externalReferences: [{ system: 'Microsoft Defender XDR', value: 'Alert 7134' }], evidence: [], findings: [{ state: 'confirmed', text: 'PowerShellからLSASSへのアクセス試行を確認' }], decisions: [], related: [], timeline: [{ id: 'x', type: 'assistant', author: 'West Hawk', at: '2026-08-02T08:44:12+09:00', text: 'プロセスツリーとネットワーク接続を確認しています。', evidenceRefs: [] }] },
  { id: 'inv-168', key: 'WH-INV-2026-000168', title: '管理者アカウントへのOAuth同意', environmentId: 'env-fabrikam-cloud', lifecycle: 'active', createdAt: '2026-08-01T09:14:02+09:00', lastActivityAt: '2026-08-01T18:21:40+09:00', createdBy: '加藤 彩', contextItems: [{ icon: '◉', label: 'admin@kono-seisakusho.co.jp', detail: 'Entra ID', kind: 'ユーザー' }], externalReferences: [{ system: 'Microsoft Sentinel', value: 'Incident 3038' }], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: 'x', type: 'note', author: '加藤 彩', at: '2026-08-01T18:21:40+09:00', text: 'アプリケーションの権限と利用状況を確認します。' }] },
  { id: 'inv-151', key: 'WH-INV-2026-000151', title: 'VPN Geo Mismatch', environmentId: 'env-contoso-prod', lifecycle: 'archived', createdAt: '2026-07-29T14:02:34+09:00', lastActivityAt: '2026-08-01T16:03:19+09:00', createdBy: '山田 健太', contextItems: [{ icon: '⌁', label: '198.51.100.24', detail: 'オランダ · ASN 8075', kind: 'IPアドレス' }], externalReferences: [{ system: 'Microsoft Sentinel', value: 'Incident 4654' }], evidence: [], findings: [{ state: 'confirmed', text: 'VPN出口IPの地理情報差異を確認' }], decisions: [{ author: '山田 健太', at: '2026-08-01T16:03:19+09:00', text: '調査結果を外部インシデントへ共有済み。West Hawkの記録をアーカイブする。' }], related: [], timeline: [{ id: 'x', type: 'decision', author: '山田 健太', at: '2026-08-01T16:03:19+09:00', text: '調査結果を外部インシデントへ共有済み。West Hawkの記録をアーカイブする。' }] },
  { id: 'inv-145', key: 'WH-INV-2026-000145', title: '外部転送ルールの作成', environmentId: 'env-contoso-prod', lifecycle: 'active', createdAt: '2026-07-31T10:11:12+09:00', lastActivityAt: '2026-07-31T17:48:03+09:00', createdBy: '高橋 直樹', contextItems: [{ icon: '◉', label: 'finance@contoso.com', detail: 'Microsoft 365', kind: 'ユーザー' }], externalReferences: [{ system: 'Microsoft Defender XDR', value: 'Alert 6981' }], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: 'x', type: 'note', author: '高橋 直樹', at: '2026-07-31T17:48:03+09:00', text: 'メールボックス監査ログを確認中です。' }] },
  { id: 'inv-131', key: 'WH-INV-2026-000131', title: 'DNSトンネリングの兆候', environmentId: 'env-northstar-prod', lifecycle: 'active', createdAt: '2026-07-30T15:42:27+09:00', lastActivityAt: '2026-07-31T13:06:00+09:00', createdBy: '岡田 拓海', contextItems: [{ icon: '▣', label: 'NS-WS-948', detail: 'Windows 11 Enterprise', kind: 'ホスト' }], externalReferences: [{ system: 'Microsoft Sentinel', value: 'Incident 2901' }], evidence: [], findings: [{ state: 'inferred', text: '高エントロピーDNSクエリが継続している可能性' }], decisions: [], related: [], timeline: [{ id: 'x', type: 'assistant', author: 'West Hawk', at: '2026-07-31T13:06:00+09:00', text: '通信先ドメインと端末プロセスを調査しています。', evidenceRefs: [] }] },
  { id: 'inv-120', key: 'WH-INV-2026-000120', title: '特権グループへの追加', environmentId: 'env-fabrikam-cloud', lifecycle: 'active', createdAt: '2026-07-29T20:22:43+09:00', lastActivityAt: '2026-07-30T11:36:58+09:00', createdBy: '斎藤 浩司', contextItems: [{ icon: '◉', label: 'opsadmin@kono-seisakusho.co.jp', detail: 'Entra ID', kind: 'ユーザー' }], externalReferences: [], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: 'x', type: 'note', author: '斎藤 浩司', at: '2026-07-30T11:36:58+09:00', text: '承認ワークフローとの一致を確認します。' }] },
  { id: 'inv-114', key: 'WH-INV-2026-000114', title: '端末からの大容量データ転送', environmentId: 'env-contoso-prod', lifecycle: 'archived', createdAt: '2026-07-28T09:25:22+09:00', lastActivityAt: '2026-07-29T14:08:44+09:00', createdBy: '藤田 遥', contextItems: [{ icon: '▣', label: 'LT-703', detail: 'Windows 11 Pro', kind: 'ホスト' }], externalReferences: [{ system: 'CrowdStrike Falcon', value: 'Detection 99814' }], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: 'x', type: 'note', author: '藤田 遥', at: '2026-07-29T14:08:44+09:00', text: '承認済み移行作業と一致することを確認しました。' }] },
  { id: 'inv-099', key: 'WH-INV-2026-000099', title: '不審な添付ファイルの実行', environmentId: 'env-northstar-prod', lifecycle: 'active', createdAt: '2026-07-26T11:56:10+09:00', lastActivityAt: '2026-07-28T09:13:10+09:00', createdBy: '伊藤 智也', contextItems: [{ icon: '◉', label: 'support@west.inc', detail: 'Microsoft 365', kind: 'ユーザー' }], externalReferences: [{ system: 'Microsoft Defender XDR', value: 'Alert 6102' }], evidence: [], findings: [], decisions: [], related: [], timeline: [{ id: 'x', type: 'assistant', author: 'West Hawk', at: '2026-07-28T09:13:10+09:00', text: '子プロセスと外部通信の確認を継続しています。', evidenceRefs: [] }] },
];

investigations.slice(1).forEach((item, index) => {
  if (item.timeline.length !== 1) return;
  const finalEntry = item.timeline[0];
  const finalAt = new Date(finalEntry.at).getTime();
  const noteAt = new Date(finalAt - 30 * 60 * 1000).toISOString();
  const runAt = new Date(finalAt - 18 * 60 * 1000).toISOString();
  item.timeline.unshift(
    { id: `seed-note-${item.id}`, type: 'note', author: item.createdBy, at: noteAt, text: `関連する記録を確認し、${item.title}の対象範囲と追加確認が必要な事項を整理します。` },
    { id: `seed-run-${item.id}`, type: 'run', at: runAt, title: 'AIが調査を実行', summary: '利用可能な接続と既存の調査根拠を照合しました。', details: ['対象のログと関連する記録を照会', '既存の調査根拠と対象情報を確認', `記録番号: ${String(index + 1).padStart(2, '0')}`] },
  );
});

const investigationPrompts = {
  summary: { title: '調査サマリーを作成', description: '現在の状況、確認済み、未確認、次のアクションを整理します。', prompt: 'この調査の記録と調査コンテキストをもとに、現在の状況、確認済み事項、未確認事項、次のアクションをMarkdownで整理してください。根拠と推定は区別してください。' },
  nextSteps: { title: '次に確認すべき項目を整理', description: 'ログ、端末、ユーザー、横展開などの追加確認を洗い出します。', prompt: '現在の調査記録と調査根拠を確認し、次に確認すべき項目を優先順に整理してください。各項目に、確認する理由と判断材料を添えてください。' },
  stakeholder: { title: '共有事項を下書き', description: '顧客や関係チームへ伝えるための、事実に基づく要点を整えます。', prompt: '調査記録と根拠をもとに、関係者への共有事項を下書きしてください。確認済みの事実、現在の対応、未確認事項を分け、断定できない内容は推定として明記してください。' },
  riskReview: { title: '未確認リスクを洗い出し', description: '調査を進める前に、残るリスクと確認漏れを点検します。', prompt: 'この調査で未確認のリスクと確認漏れの可能性を洗い出してください。確認方法、影響、優先して確認すべき理由が分かる形で整理してください。' },
};

const slashCommands = [
  { command: '/記録', aliases: ['/記録', '/情報'], recordType: 'note', label: '情報を記録', description: '確認した事実や対応状況を残す' },
  { command: '/確認済', aliases: ['/確認済', '/確認'], recordType: 'finding', findingState: 'confirmed', label: '確認済みを記録', description: '根拠を確認できた事実を残す', notice: '確認済みとして記録しました。' },
  { command: '/推定', aliases: ['/推定'], recordType: 'finding', findingState: 'inferred', label: '推定を記録', description: '未確定の仮説や見立てを残す', notice: '推定として記録しました。' },
  { command: '/所見', aliases: ['/所見'], recordType: 'finding', findingState: 'analyst', label: '所見を記録', description: '根拠を踏まえた分析・見立てを残す', notice: 'アナリスト所見を記録しました。' },
  { command: '/アナリスト判断', aliases: ['/アナリスト判断', '/判断', '/analyst', '/対応判断'], recordType: 'decision', label: 'アナリスト判断', description: '次の方針や明示的な判断を残す' },
];


function createAppState({ selectedId, organization }) {
  return {
    selectedId,
    organization,
    tab: 'timeline',
    commandIndex: 0,
    slashMenuDismissed: false,
    activeCommand: null,
    contextOpen: true,
    theme: 'standard',
    aiWorking: false,
    promptKey: 'summary',
  };
}


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

const multiline = (value = '') => esc(value).replace(/\r?\n/g, '<br>');

const formatTime = (value) => new Intl.DateTimeFormat('ja-JP', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo',
}).format(new Date(value));

const formatDate = (value) => new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'short', timeZone: 'Asia/Tokyo',
}).format(new Date(value));

const formatCompact = (value) => new Intl.DateTimeFormat('ja-JP', {
  month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo',
}).format(new Date(value));

const dateKey = (value) => new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo',
}).format(new Date(value));


function createSelectors({ analysts, currentUser, environments, investigations, state }) {
  const selected = () => investigations.find((item) => item.id === state.selectedId);
  const environmentFor = (item) => environments.find((environment) => environment.id === item.environmentId);
  const organizations = () => [...new Set(environments.map((environment) => environment.organization))];
  const environmentsForOrganization = (organization = state.organization) => environments.filter((environment) => environment.organization === organization);
  const organizationFor = (item) => environmentFor(item)?.organization;
  const analystFor = (name) => analysts.find((analyst) => analyst.name === name)
    || { id: `usr-${name}`, name, initials: name.slice(0, 1) };
  const leadAnalystFor = (item) => item.leadAnalyst || analystFor(item.createdBy);
  const initialsFor = (name) => analystFor(name).initials;
  const canEdit = (item = selected()) => item?.lifecycle === 'active' && leadAnalystFor(item).id === currentUser.id;
  const allEvidence = (item = selected()) => item?.evidence || [];
  const evidenceById = (id, item = selected()) => allEvidence(item).find((evidence) => evidence.id === id);

  return {
    selected,
    environmentFor,
    organizations,
    environmentsForOrganization,
    organizationFor,
    analystFor,
    leadAnalystFor,
    initialsFor,
    canEdit,
    allEvidence,
    evidenceById,
  };
}


/* Pure right-panel view. React will replace this with ContextPanel components. */
function contextPanelHtml({ item, environment, decision, editable, leadAnalyst, esc, formatCompact, multiline }) {
  return `<section class="context-section"><div class="context-section__head"><h3>担当アナリスト</h3></div><div class="ownership-card"><span class="ownership-card__avatar">${esc(leadAnalyst.initials)}</span><strong>${esc(leadAnalyst.name)}</strong></div>${!editable && item.lifecycle !== 'archived' ? '<div class="assignment-actions"><button class="take-assignment-button" type="button" data-action="open-transfer"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"></circle><path d="M5.5 20c.9-3.4 3-5.2 6.5-5.2s5.6 1.8 6.5 5.2M18 17l1.4 1.4L22 15.8"></path></svg>自分を担当にする</button></div>' : ''}</section>
    <section class="context-section"><div class="context-section__head"><h3>接続済み製品</h3></div><div class="context-environment"><strong>${esc(environment.organization)}</strong><span>この調査対象組織で、AI調査に利用できる読み取り接続</span><div class="context-environment__products">${environment.connections.map((connection) => `<span>${esc(connection)}</span>`).join('')}</div></div></section>
    <section class="context-section"><div class="context-section__head"><h3>調査コンテキスト</h3><span class="context-section__count">${item.contextItems.length}件</span></div><div class="context-items">${item.contextItems.map((context) => `<div class="context-item"><span class="context-item__icon">${esc(context.icon)}</span><div><strong>${esc(context.label)}</strong><small>${esc(context.kind)} · ${esc(context.detail)}</small></div></div>`).join('')}</div></section>
    <section class="context-section"><div class="context-section__head"><h3>調査所見</h3><span class="context-section__count">記録から整理</span></div><div class="finding-list">${item.findings.length ? item.findings.map((finding) => `<div class="finding"><span class="finding__state finding__state--${finding.state}">${finding.state === 'confirmed' ? '確認済み' : finding.state === 'rejected' ? '否定' : finding.state === 'analyst' ? 'アナリスト所見' : '推定'}</span><p>${multiline(finding.text)}</p></div>`).join('') : '<p class="timeline-empty">投稿フォームで /確認済、/推定、/所見 を選ぶと、ここへ整理されます。</p>'}</div></section>
    <section class="context-section"><div class="context-section__head"><h3>アナリスト判断</h3></div>${decision ? `<div class="decision-context"><p>${multiline(decision.text)}</p><small>${esc(decision.author)} · ${esc(formatCompact(decision.at))}</small></div>` : '<p class="context-empty">投稿フォームで /アナリスト判断 を選び、明示的に記録します。</p>'}</section>
    <section class="context-section"><div class="context-section__head"><h3>外部参照</h3>${editable ? '<button type="button" data-action="add-reference">＋ 追加</button>' : ''}</div><div class="reference-list">${item.externalReferences.length ? item.externalReferences.map((reference) => `<div class="reference-row"><div><strong>${esc(reference.system)}</strong><span>${esc(reference.value)}</span></div><button type="button" data-action="open-reference" data-reference="${esc(reference.value)}">開く ↗</button></div>`).join('') : '<p class="timeline-empty">外部参照はまだありません。</p>'}</div></section>`;
}


/* Pure timeline view. React will replace this with Timeline components. */
function timelineHtml(item, { dateKey, esc, evidenceById, formatDate, formatTime, initialsFor, multiline }) {
  const events = [...item.timeline].sort((a, b) => new Date(a.at) - new Date(b.at));
  let previous = '';
  const entries = events.map((entry) => {
    const key = dateKey(entry.at);
    const divider = key === previous ? '' : `<div class="timeline-date-divider"><span>${esc(formatDate(entry.at))}</span></div>`;
    previous = key;
    return `${divider}${timelineEntryHtml(entry, { esc, evidenceById, formatTime, initialsFor, multiline })}`;
  }).join('');
  return `<div class="timeline">${entries || '<p class="timeline-empty">まだ調査記録はありません。AIへの質問、または調査記録を投稿して開始してください。</p>'}</div>`;
}

function timelineEntryHtml(entry, { esc, evidenceById, formatTime, initialsFor, multiline }) {
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

})();
