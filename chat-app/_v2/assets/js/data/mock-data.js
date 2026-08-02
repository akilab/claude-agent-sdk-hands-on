/* Mock data boundary. Replace this module with API queries when moving to React. */
export const currentUser = { id: 'usr-tanaka', name: '田中 明', initials: 'AT' };
export const analysts = [
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

export const environments = [
  { id: 'env-contoso-prod', name: 'Contoso Japan / 本番テナント', organization: 'Contoso Japan', type: '顧客環境', connections: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'Zscaler'], policy: '社外AIへの送信は根拠の要約のみ' },
  { id: 'env-northstar-prod', name: 'West INC / 社内環境', organization: 'West INC', type: '自社環境', connections: ['Microsoft Defender XDR', 'Microsoft Sentinel', 'SKYSEA'], policy: '社内調査ポリシー v2.1' },
  { id: 'env-fabrikam-cloud', name: '河野製作所 / 本番テナント', organization: '河野製作所', type: '顧客環境', connections: ['Microsoft Sentinel', 'Microsoft Defender XDR'], policy: '顧客承認済みデータ範囲のみ' },
];

export const investigations = [
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

export const investigationPrompts = {
  summary: { title: '調査サマリーを作成', description: '現在の状況、確認済み、未確認、次のアクションを整理します。', prompt: 'この調査の記録と調査コンテキストをもとに、現在の状況、確認済み事項、未確認事項、次のアクションをMarkdownで整理してください。根拠と推定は区別してください。' },
  nextSteps: { title: '次に確認すべき項目を整理', description: 'ログ、端末、ユーザー、横展開などの追加確認を洗い出します。', prompt: '現在の調査記録と調査根拠を確認し、次に確認すべき項目を優先順に整理してください。各項目に、確認する理由と判断材料を添えてください。' },
  stakeholder: { title: '共有事項を下書き', description: '顧客や関係チームへ伝えるための、事実に基づく要点を整えます。', prompt: '調査記録と根拠をもとに、関係者への共有事項を下書きしてください。確認済みの事実、現在の対応、未確認事項を分け、断定できない内容は推定として明記してください。' },
  riskReview: { title: '未確認リスクを洗い出し', description: '調査を進める前に、残るリスクと確認漏れを点検します。', prompt: 'この調査で未確認のリスクと確認漏れの可能性を洗い出してください。確認方法、影響、優先して確認すべき理由が分かる形で整理してください。' },
};

export const slashCommands = [
  { command: '/記録', aliases: ['/記録', '/情報'], recordType: 'note', label: '情報を記録', description: '確認した事実や対応状況を残す' },
  { command: '/確認済', aliases: ['/確認済', '/確認'], recordType: 'finding', findingState: 'confirmed', label: '確認済みを記録', description: '根拠を確認できた事実を残す', notice: '確認済みとして記録しました。' },
  { command: '/推定', aliases: ['/推定'], recordType: 'finding', findingState: 'inferred', label: '推定を記録', description: '未確定の仮説や見立てを残す', notice: '推定として記録しました。' },
  { command: '/所見', aliases: ['/所見'], recordType: 'finding', findingState: 'analyst', label: '所見を記録', description: '根拠を踏まえた分析・見立てを残す', notice: 'アナリスト所見を記録しました。' },
  { command: '/アナリスト判断', aliases: ['/アナリスト判断', '/判断', '/analyst', '/対応判断'], recordType: 'decision', label: 'アナリスト判断', description: '次の方針や明示的な判断を残す' },
];
