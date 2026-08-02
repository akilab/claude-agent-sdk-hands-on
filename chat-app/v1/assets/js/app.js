const iconPaths = {
  search: '<circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path>',
  panel: '<path d="M4 5h16v14H4z"></path><path d="M15 5v14"></path><path d="m17 10 2 2-2 2"></path>',
  'close-panel': '<path d="M4 5h16v14H4z"></path><path d="M15 5v14"></path><path d="m18 9-3 3 3 3"></path>',
  chevron: '<path d="m7 10 5 5 5-5"></path>',
  plus: '<path d="M12 5v14M5 12h14"></path>',
  external: '<path d="M14 5h5v5"></path><path d="M10 14 19 5"></path><path d="M19 14v5H5V5h5"></path>',
  more: '<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  shield: '<path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"></path><path d="m9 12 2 2 4-4"></path>',
  tenant: '<path d="M4 21h16"></path><path d="M6 21V6l6-3 6 3v15"></path><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01"></path>',
  user: '<circle cx="12" cy="8" r="3"></circle><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"></path>',
  assigned: '<circle cx="12" cy="7.5" r="3"></circle><path d="M5 19c.8-3 3.1-4.7 6.2-4.7 1.2 0 2.2.2 3.1.7"></path><path d="m16 18 1.8 1.8L21 16.5"></path>',
  observed: '<path d="M2.5 12s3.3-5.2 9.5-5.2 9.5 5.2 9.5 5.2-3.3 5.2-9.5 5.2S2.5 12 2.5 12Z"></path><circle cx="12" cy="12" r="2.4"></circle>',
  activity: '<path d="M4 12h3l2-6 4 12 2-6h5"></path>',
  server: '<rect x="4" y="4" width="16" height="6" rx="2"></rect><rect x="4" y="14" width="16" height="6" rx="2"></rect><path d="M8 7h.01M8 17h.01"></path>',
  desktop: '<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path>',
  paperclip: '<path d="m20 11-8.3 8.3a5.1 5.1 0 0 1-7.2-7.2l9-9a3.3 3.3 0 0 1 4.7 4.7l-9.1 9.1a1.7 1.7 0 0 1-2.4-2.4l8.3-8.3"></path>',
  spark: '<path d="m12 3 1.5 5.3L19 10l-5.5 1.7L12 17l-1.5-5.3L5 10l5.5-1.7z"></path><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"></path>',
  send: '<path d="m21 3-7.5 18-3.8-7.7L2 10.5z"></path><path d="M9.7 13.3 14 9"></path>',
  edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"></path>',
  close: '<path d="m6 6 12 12M18 6 6 18"></path>',
  settings: '<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"></path><circle cx="12" cy="12" r="3.5"></circle><circle cx="12" cy="12" r="8"></circle>',
  theme: '<path d="M20.7 14.2A8.8 8.8 0 0 1 9.8 3.3 8.8 8.8 0 1 0 20.7 14.2Z"></path>',
  team: '<circle cx="9" cy="8" r="3"></circle><path d="M3.5 20c.8-3.5 2.8-5.2 5.5-5.2s4.7 1.7 5.5 5.2"></path><circle cx="17.5" cy="9" r="2.2"></circle><path d="M15.2 15.3c2.9-.2 4.7 1.4 5.3 4.7"></path>',
  link: '<path d="M10 13.8a4.2 4.2 0 0 0 6 .1l2.2-2.2a4.2 4.2 0 0 0-6-6L11 6.9"></path><path d="M14 10.2a4.2 4.2 0 0 0-6-.1l-2.2 2.2a4.2 4.2 0 0 0 6 6l1.2-1.2"></path>',
  availability: '<circle cx="12" cy="12" r="8"></circle><path d="m8.5 12 2.3 2.3 4.8-5"></path>',
  arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
  'arrow-up': '<path d="m6 15 6-6 6 6"></path>',
  'arrow-down': '<path d="m6 9 6 6 6-6"></path>',
  file: '<path d="M6 3h8l4 4v14H6z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h4"></path>',
};

const statuses = {
  all: { label: 'すべて', color: '#728497' },
  investigating: { label: '調査中', color: '#0072bc', bg: '#eaf6fd', text: '#00598f' },
  reviewing: { label: '追加確認中', color: '#c27a11', bg: '#fff5df', text: '#9b6007' },
  monitoring: { label: '監視中', color: '#057e78', bg: '#e7f7f5', text: '#006a65' },
  paused: { label: '保留', color: '#8393a1', bg: '#eef2f5', text: '#5f7180' },
  closed: { label: 'クローズ', color: '#16744d', bg: '#e9f7ef', text: '#12603f' },
};

const currentUser = { id: 'tanaka', name: '田中 明', initials: 'T' };
const customerProfiles = {
  'Contoso Japan / contoso.com': { customer: 'Contoso Japan', tenant: 'contoso.com', tenantId: '5b2e••••-••••-••••-••••-8a9421', products: ['Microsoft Sentinel', 'Microsoft Defender for Endpoint', 'CrowdStrike Falcon', 'Zscaler', 'SKYSEA Client View'] },
  'Fabrikam / fabrikam.com': { customer: 'Fabrikam', tenant: 'fabrikam.com', tenantId: 'ad61••••-••••-••••-••••-3f7c20', products: ['CrowdStrike Falcon', 'Zscaler', 'SKYSEA Client View'] },
  'Northwind Traders / northwindtraders.com': { customer: 'Northwind Traders', tenant: 'northwindtraders.com', tenantId: '93e4••••-••••-••••-••••-1d5b68', products: ['Microsoft Sentinel', 'Microsoft Defender for Endpoint', 'SentinelOne'] },
};
const defaultCustomerProfile = customerProfiles['Contoso Japan / contoso.com'];
const analysts = {
  tanaka: { name: '田中 明', alias: 'akira tanaka', initials: 'T' },
  satou: { name: '佐藤 美咲', alias: 'misaki satou', initials: 'MS' },
  suzuki: { name: '鈴木 翔', alias: 'sho suzuki', initials: 'SS' },
  yamada: { name: '山田 健太', alias: 'kenta yamada', initials: 'YK' },
  mori: { name: '森 拓也', alias: 'takuya mori', initials: 'MT' },
  takahashi: { name: '高橋 直樹', alias: 'naoki takahashi', initials: 'TN' },
  kato: { name: '加藤 彩', alias: 'aya kato', initials: 'KA' },
  nakamura: { name: '中村 亮', alias: 'ryo nakamura', initials: 'NR' },
  ito: { name: '伊藤 智也', alias: 'tomoya ito', initials: 'IT' },
  watanabe: { name: '渡辺 優子', alias: 'yuko watanabe', initials: 'WY' },
  kobayashi: { name: '小林 大輔', alias: 'daisuke kobayashi', initials: 'KD' },
  yoshida: { name: '吉田 真理', alias: 'mari yoshida', initials: 'YM' },
  saito: { name: '斎藤 浩司', alias: 'koji saito', initials: 'SK' },
  inoue: { name: '井上 由佳', alias: 'yuka inoue', initials: 'IY' },
  hashimoto: { name: '橋本 直人', alias: 'naoto hashimoto', initials: 'HN' },
  ishikawa: { name: '石川 玲奈', alias: 'rena ishikawa', initials: 'IR' },
  okada: { name: '岡田 拓海', alias: 'takumi okada', initials: 'OT' },
  fujita: { name: '藤田 遥', alias: 'haruka fujita', initials: 'FH' },
  maeda: { name: '前田 駿', alias: 'shun maeda', initials: 'MS' },
  kondo: { name: '近藤 陽介', alias: 'yosuke kondo', initials: 'KY' },
};
const workStatuses = {
  pre_shift: { label: '出勤前', color: '#397394', bg: '#e8f3f8' },
  available: { label: '勤務中', color: '#168154', bg: '#e8f7ef' },
  busy: { label: '対応中', color: '#b36b05', bg: '#fff5dc' },
  away: { label: '離席中', color: '#55758a', bg: '#edf3f6' },
  offline: { label: '退勤', color: '#83929c', bg: '#f0f3f5' },
};
const analystWorkStatuses = { tanaka: 'available', satou: 'busy', suzuki: 'pre_shift', yamada: 'available', mori: 'offline', takahashi: 'available', kato: 'away', nakamura: 'busy', ito: 'available', watanabe: 'pre_shift', kobayashi: 'offline', yoshida: 'available', saito: 'busy', inoue: 'away', hashimoto: 'available', ishikawa: 'pre_shift', okada: 'offline', fujita: 'available', maeda: 'busy', kondo: 'available' };
const workLocations = {
  office: { label: '出社', color: '#0072bc', bg: '#e8f5fc' },
  remote: { label: '在宅', color: '#506d80', bg: '#eef3f6' },
};
const analystWorkLocations = { tanaka: 'office', satou: 'remote', suzuki: 'remote', yamada: 'office', mori: 'remote', takahashi: 'office', kato: 'remote', nakamura: 'office', ito: 'remote', watanabe: 'office', kobayashi: 'remote', yoshida: 'office', saito: 'remote', inoue: 'office', hashimoto: 'remote', ishikawa: 'office', okada: 'remote', fujita: 'office', maeda: 'remote', kondo: 'office' };
const sessions = [
  {
    sessionId: '01989f4c-78e2-7a31-8d42-23eac8423d11', incidentNo: 'INC-2026-1212-34', title: '疑わしいサインインの活動', severity: 'High', status: 'investigating', product: 'Microsoft Sentinel', user: 'user1@contoso.com', host: 'WIN-SRV-01.contoso.com', ip: '203.0.113.48', os: 'Windows Server 2022', analyst: '田中 明', analystInitials: 'T', assigneeId: 'tanaka', updatedAt: '5分前', createdAt: '2026/05/20 21:46', updatedFull: '2026/05/21 10:26', alertCount: 8,
    files: [{ name: 'signin-activity.csv', type: 'CSV', meta: '92 KB · 10:24' }, { name: 'evidence-summary.pdf', type: 'PDF', meta: '1.8 MB · 10:25' }],
    alerts: [{ level: 'High', name: 'Impossible Travel', source: 'Microsoft Sentinel · 10:17' }, { level: 'High', name: 'Privileged operation from unfamiliar location', source: 'Microsoft Sentinel · 10:20' }, { level: 'Medium', name: 'Suspicious sign-in properties', source: 'Microsoft Sentinel · 10:21' }],
    messages: [
      { role: 'system', author: 'System', time: '21:46', timestamp: '2026-05-20T21:46:18+09:00', text: 'Microsoft Sentinel のアラートリンクを起点に調査を開始しました。開始者: 田中 明' },
      { role: 'analyst', author: '田中 明', initials: 'T', time: '21:52', timestamp: '2026-05-20T21:52:41+09:00', text: '通知内容を確認しました。対象ユーザーの通常利用地域と認証履歴を照合します。' },
      { role: 'ai', author: 'West Hawk', time: '22:01', timestamp: '2026-05-20T22:01:09+09:00', text: '一次確認では、通常と異なる国からのサインインを検知しました。夜間帯のため、影響範囲の確認と本人連絡を次の対応へ引き継ぐことを推奨します。', bullets: ['通常利用地域と異なる国からの成功サインイン', '高権限操作に関連するアラートを検知', '認証元IPとVPN利用有無の照合が未完了'] },
      { role: 'analyst', author: '田中 明', initials: 'T', time: '22:14', timestamp: '2026-05-20T22:14:36+09:00', text: '関連アラートを確認し、朝番で本人確認とVPNログの照合を継続します。現時点では追加の封じ込め操作は保留します。' },
      { role: 'system', author: 'System', time: '22:20', timestamp: '2026-05-20T22:20:04+09:00', text: '担当アナリストを 田中 明 から 山田 健太 に変更しました。変更者: 田中 明' },
      { role: 'analyst', author: '山田 健太', initials: 'YK', time: '10:22', timestamp: '2026-05-21T10:22:12+09:00', text: 'user1@contoso.com のサインインアクティビティを確認してください。\n不審な場所や時間帯のアクセスがあれば教えてください。' },
      { role: 'ai', author: 'West Hawk', time: '10:23', timestamp: '2026-05-21T10:23:08+09:00', text: 'サインインアクティビティを調査しました。以下の点が確認されています。', bullets: ['通常のサインイン場所：東京、日本（過去30日間）', '異常なサインイン：オランダ、アムステルダム（2026/05/21 02:17 UTC）', '成功したサインイン後、10分以内に複数の管理操作を確認'], actions: ['詳細を表示', '関連アラートを確認'] },
      { role: 'analyst', author: '山田 健太', initials: 'YK', time: '10:25', timestamp: '2026-05-21T10:25:31+09:00', text: '関連するアラートと、実行された操作を教えてください。' },
      { role: 'ai', author: 'West Hawk', time: '10:26', timestamp: '2026-05-21T10:26:04+09:00', text: '関連アラートと実行操作を確認しました。', bullets: ['アラート：Impossible Travel（高）', 'アラート：Privileged operation from unfamiliar location（中）', '操作：グローバル管理者ロールの割り当てを確認'] },
      { role: 'system', author: 'System', time: '10:27', timestamp: '2026-05-21T10:27:19+09:00', text: '担当アナリストを 山田 健太 から 田中 明 に変更しました。変更者: 山田 健太' },
      { role: 'analyst', author: '田中 明', initials: 'T', time: '10:28', timestamp: '2026-05-21T10:28:47+09:00', text: 'ユーザーへの連絡を開始しました。本人確認と、当該時間帯のVPN利用有無を確認します。' },
      { role: 'ai', author: 'West Hawk', time: '10:29', timestamp: '2026-05-21T10:29:15+09:00', text: '確認観点を整理しました。本人の回答と合わせて、認証・端末・操作ログの3点を照合してください。', bullets: ['MFAチャレンジの成否と認証方式', 'WIN-SRV-01からの同時刻の端末操作', '管理者ロール付与を実行したクライアント情報'] },
      { role: 'analyst', author: '田中 明', initials: 'T', time: '10:32', timestamp: '2026-05-21T10:32:22+09:00', text: '本人はオランダからのアクセス、および当該時刻のVPN利用を否定しています。セッション無効化を実施します。' },
      { role: 'system', author: 'System', time: '10:33', timestamp: '2026-05-21T10:33:10+09:00', text: '重大度を Medium から High に変更しました。変更者: 田中 明' },
      { role: 'ai', author: 'West Hawk', time: '10:35', timestamp: '2026-05-21T10:35:32+09:00', text: '重大度の引き上げは妥当です。無効化後に残存トークン、転送ルール、特権ロールの変更有無を確認してください。', bullets: ['既存セッションと更新トークンの失効', 'メール転送ルールとOAuth同意の確認', 'Privileged Identity Managementの監査ログ確認'] },
      { role: 'analyst', author: '田中 明', initials: 'T', time: '10:38', timestamp: '2026-05-21T10:38:26+09:00', text: 'セッション無効化を完了しました。現在は監査ログとメール転送ルールを確認中です。' },
    ],
  },
  {
    sessionId: '01989f58-a410-72ac-90c1-73f548a9c427', incidentNo: 'INC-2026-1212-34', title: '疑わしいサインインの追加調査', severity: 'High', status: 'reviewing', product: 'Microsoft Sentinel', user: 'user1@contoso.com', host: 'WIN-SRV-01.contoso.com', ip: '203.0.113.48', os: 'Windows Server 2022', analyst: '佐藤 美咲', analystInitials: 'MS', assigneeId: 'satou', updatedAt: '12分前', createdAt: '2026/05/21 02:18', updatedFull: '2026/05/21 10:19', alertCount: 8,
    files: [{ name: 'admin-operations.json', type: 'JSON', meta: '18 KB · 10:17' }], alerts: [{ level: 'High', name: 'Impossible Travel', source: 'Microsoft Sentinel · 10:17' }],
    messages: [{ role: 'analyst', author: '佐藤 美咲', initials: 'MS', time: '10:15', text: '管理者ロールの変更履歴を対象ユーザーに限定して確認してください。' }, { role: 'ai', author: 'West Hawk', time: '10:16', text: '対象ユーザーに関連するロール変更を抽出しました。承認元の確認が次の調査ポイントです。', bullets: ['グローバル管理者ロールが一時的に付与', '承認元IPは異常サインインと同一リージョン', '変更後7分でロールは解除'] }],
  },
  {
    sessionId: '01989f62-18cd-7651-b27a-343b0558ad0d', incidentNo: 'INC-2026-1211-12', title: 'Impossible Travelの検知', severity: 'Medium', status: 'investigating', product: 'Microsoft Defender', user: 'user2@contoso.com', host: 'PC-1042', ip: '198.51.100.72', os: 'Windows 11 Pro', analyst: '鈴木 翔', analystInitials: 'SS', assigneeId: 'suzuki', updatedAt: '20分前', createdAt: '2026/05/21 01:48', updatedFull: '2026/05/21 10:06', alertCount: 3,
    files: [], alerts: [{ level: 'Medium', name: 'Impossible Travel', source: 'Microsoft Defender · 09:54' }], messages: [{ role: 'ai', author: 'West Hawk', time: '09:58', text: '異常な位置情報はVPN出口IPと一致する可能性があります。端末利用者への確認を推奨します。' }],
  },
  {
    sessionId: '01989f6a-530d-70cb-92cb-aae8c40cb103', incidentNo: 'INC-2026-1210-08', title: '特権アカウントの操作', severity: 'High', status: 'monitoring', product: 'CrowdStrike Falcon', user: 'admin@contoso.com', host: 'ADMIN-PC-01', ip: '10.10.14.28', os: 'Windows 11 Enterprise', analyst: '山田 健太', analystInitials: 'YK', assigneeId: 'yamada', updatedAt: '1時間前', createdAt: '2026/05/21 00:20', updatedFull: '2026/05/21 09:34', alertCount: 5,
    files: [{ name: 'containment-log.txt', type: 'TXT', meta: '4 KB · 09:30' }], alerts: [{ level: 'High', name: 'Privileged account anomaly', source: 'CrowdStrike Falcon · 09:12' }], messages: [{ role: 'ai', author: 'West Hawk', time: '09:30', text: '封じ込め操作は完了しています。現在は追加の異常挙動を監視しています。' }],
  },
  {
    sessionId: '01989f7b-f4a6-7c8b-90a1-55a1433fb1ec', incidentNo: 'INC-2026-1209-77', title: 'PowerShell実行の検知', severity: 'Low', status: 'closed', product: 'CrowdStrike Falcon', user: 'itops@contoso.com', host: 'WS-204', ip: '10.10.22.104', os: 'Windows 10 Enterprise', analyst: '森 拓也', analystInitials: 'MT', assigneeId: 'mori', updatedAt: '昨日', createdAt: '2026/05/20 16:20', updatedFull: '2026/05/20 18:12', alertCount: 2,
    files: [], alerts: [], messages: [{ role: 'ai', author: 'West Hawk', time: '18:10', text: '管理者が実行した正規スクリプトであることを確認しました。クローズ可能です。' }],
  },
  {
    sessionId: '01989f8e-016a-752b-8ea2-58fbb0e13a01', incidentNo: 'INC-2026-1209-65', title: '同一ユーザーのサインイン異常', severity: 'High', status: 'reviewing', product: 'Microsoft Sentinel', user: 'user1@contoso.com', host: 'VPN-GW-02', ip: '198.51.100.43', os: 'Network Gateway', analyst: '佐藤 美咲', analystInitials: 'MS', assigneeId: 'satou', updatedAt: '昨日', createdAt: '2026/05/20 15:42', updatedFull: '2026/05/20 17:35', alertCount: 4,
    files: [{ name: 'vpn-session-log.csv', type: 'CSV', meta: '46 KB · 17:30' }], alerts: [{ level: 'High', name: 'Unfamiliar sign-in properties', source: 'Microsoft Sentinel · 17:21' }], messages: [{ role: 'ai', author: 'West Hawk', time: '17:28', text: '同一ユーザーに関連するVPN経由の認証異常を確認しています。' }],
  },
  {
    sessionId: '01989f91-22fd-7e41-90af-6b06c9401a02', incidentNo: 'INC-2026-1208-42', title: 'VPN Geo Mismatch', severity: 'Medium', status: 'monitoring', product: 'Microsoft Sentinel', user: 'user2@contoso.com', host: 'VPN-GW-01', ip: '203.0.113.91', os: 'Network Gateway', analyst: '鈴木 翔', analystInitials: 'SS', assigneeId: 'suzuki', updatedAt: '2日前', createdAt: '2026/05/19 14:10', updatedFull: '2026/05/19 16:44', alertCount: 2,
    files: [], alerts: [{ level: 'Medium', name: 'VPN geo mismatch', source: 'Microsoft Sentinel · 16:22' }], messages: [{ role: 'ai', author: 'West Hawk', time: '16:30', text: '利用者申告とVPN出口IPの照合を継続しています。' }],
  },
  {
    sessionId: '01989f95-3c20-7458-8423-d93eb91d1a03', incidentNo: 'INC-2026-1208-31', title: 'メール転送ルールの変更', severity: 'High', status: 'investigating', product: 'Microsoft Defender', user: 'finance@contoso.com', host: 'EXO-ONLINE', ip: '203.0.113.118', os: 'Microsoft 365', analyst: '高橋 直樹', analystInitials: 'TN', assigneeId: 'takahashi', updatedAt: '2日前', createdAt: '2026/05/19 12:54', updatedFull: '2026/05/19 15:16', alertCount: 3,
    files: [{ name: 'mail-rule-audit.json', type: 'JSON', meta: '12 KB · 15:10' }], alerts: [{ level: 'High', name: 'Suspicious inbox rule', source: 'Microsoft Defender · 14:58' }], messages: [{ role: 'ai', author: 'West Hawk', time: '15:04', text: '外部ドメインへの転送ルールを検出しました。作成元の認証履歴を確認してください。' }],
  },
  {
    sessionId: '01989f99-4b72-79d5-8e44-d260a4031a04', incidentNo: 'INC-2026-1207-18', title: 'OAuth 同意の異常', severity: 'High', status: 'investigating', product: 'Microsoft Sentinel', user: 'sales@contoso.com', host: 'ENTRA-ID', ip: '198.51.100.128', os: 'Cloud Identity', analyst: '加藤 彩', analystInitials: 'KA', assigneeId: 'kato', updatedAt: '3日前', createdAt: '2026/05/18 18:03', updatedFull: '2026/05/18 19:12', alertCount: 2,
    files: [], alerts: [{ level: 'High', name: 'Suspicious OAuth application', source: 'Microsoft Sentinel · 18:44' }], messages: [{ role: 'ai', author: 'West Hawk', time: '18:52', text: '高権限スコープを要求する未承認アプリケーションを確認しました。' }],
  },
  {
    sessionId: '01989f9c-5d93-7012-91df-ef8a0c1e1a05', incidentNo: 'INC-2026-1207-04', title: '大量のサインイン失敗', severity: 'Medium', status: 'reviewing', product: 'Microsoft Sentinel', user: 'hr@contoso.com', host: 'PC-2088', ip: '198.51.100.206', os: 'Windows 11 Pro', analyst: '中村 亮', analystInitials: 'NR', assigneeId: 'nakamura', updatedAt: '3日前', createdAt: '2026/05/18 14:26', updatedFull: '2026/05/18 16:07', alertCount: 7,
    files: [], alerts: [{ level: 'Medium', name: 'Password spray suspected', source: 'Microsoft Sentinel · 15:48' }], messages: [{ role: 'ai', author: 'West Hawk', time: '15:54', text: '失敗した認証は複数アカウントへ分散しています。送信元IPの評判を確認中です。' }],
  },
  {
    sessionId: '01989fa1-6e84-78a5-8d29-2cd2d62b1a06', incidentNo: 'INC-2026-1206-56', title: '不審な添付ファイルの実行', severity: 'High', status: 'monitoring', product: 'CrowdStrike Falcon', user: 'support@contoso.com', host: 'LT-512', ip: '10.10.44.52', os: 'Windows 11 Enterprise', analyst: '伊藤 智也', analystInitials: 'IT', assigneeId: 'ito', updatedAt: '4日前', createdAt: '2026/05/17 11:08', updatedFull: '2026/05/17 13:42', alertCount: 5,
    files: [{ name: 'attachment-hash.txt', type: 'TXT', meta: '1 KB · 13:36' }], alerts: [{ level: 'High', name: 'Malicious attachment execution', source: 'CrowdStrike Falcon · 12:20' }], messages: [{ role: 'ai', author: 'West Hawk', time: '13:01', text: '添付ファイル実行後の子プロセスは隔離済みです。横展開の痕跡を監視しています。' }],
  },
  {
    sessionId: '01989fa5-7fa6-7b21-8a15-af4a1f391a07', incidentNo: 'INC-2026-1206-22', title: '新規サービスアカウントの作成', severity: 'Medium', status: 'closed', product: 'Microsoft Sentinel', user: 'svc-build@contoso.com', host: 'AD-01', ip: '10.10.3.11', os: 'Windows Server 2019', analyst: '渡辺 優子', analystInitials: 'WY', assigneeId: 'watanabe', updatedAt: '4日前', createdAt: '2026/05/17 09:14', updatedFull: '2026/05/17 10:18', alertCount: 1,
    files: [], alerts: [{ level: 'Medium', name: 'New service account', source: 'Microsoft Sentinel · 09:26' }], messages: [{ role: 'ai', author: 'West Hawk', time: '10:12', text: '変更申請と一致する正規のサービスアカウント作成であることを確認しました。' }],
  },
  {
    sessionId: '01989fa9-81c9-75b5-97b4-38c1a56a1a08', incidentNo: 'INC-2026-1205-91', title: 'EDR 隔離の失敗', severity: 'High', status: 'investigating', product: 'CrowdStrike Falcon', user: 'research@contoso.com', host: 'MAC-091', ip: '10.10.61.19', os: 'macOS 15', analyst: '小林 大輔', analystInitials: 'KD', assigneeId: 'kobayashi', updatedAt: '5日前', createdAt: '2026/05/16 16:35', updatedFull: '2026/05/16 17:58', alertCount: 3,
    files: [], alerts: [{ level: 'High', name: 'Containment failed', source: 'CrowdStrike Falcon · 17:11' }], messages: [{ role: 'ai', author: 'West Hawk', time: '17:24', text: '端末がネットワークから切断されていないため、手動隔離の実施を推奨します。' }],
  },
  {
    sessionId: '01989fad-92df-78a3-8d5f-a80e01bd1a09', incidentNo: 'INC-2026-1205-38', title: '外部IPへの異常な通信', severity: 'Medium', status: 'monitoring', product: 'Microsoft Defender', user: 'dev@contoso.com', host: 'DEV-332', ip: '10.10.78.33', os: 'Windows 11 Pro', analyst: '吉田 真理', analystInitials: 'YM', assigneeId: 'yoshida', updatedAt: '5日前', createdAt: '2026/05/16 13:02', updatedFull: '2026/05/16 15:20', alertCount: 4,
    files: [{ name: 'network-flow.csv', type: 'CSV', meta: '110 KB · 15:13' }], alerts: [{ level: 'Medium', name: 'Outbound anomaly', source: 'Microsoft Defender · 14:29' }], messages: [{ role: 'ai', author: 'West Hawk', time: '14:45', text: '通信先は新規登録されたドメインです。頻度と送信データ量を監視しています。' }],
  },
  {
    sessionId: '01989fb1-a3f0-7c22-8a7d-3f6b1e611a10', incidentNo: 'INC-2026-1204-74', title: '特権グループへの追加', severity: 'High', status: 'reviewing', product: 'Microsoft Sentinel', user: 'opsadmin@contoso.com', host: 'AD-02', ip: '10.10.3.12', os: 'Windows Server 2022', analyst: '斎藤 浩司', analystInitials: 'SK', assigneeId: 'saito', updatedAt: '6日前', createdAt: '2026/05/15 19:21', updatedFull: '2026/05/15 20:30', alertCount: 2,
    files: [], alerts: [{ level: 'High', name: 'Privileged group membership change', source: 'Microsoft Sentinel · 19:55' }], messages: [{ role: 'ai', author: 'West Hawk', time: '20:04', text: '特権グループ追加は承認ワークフローの確認待ちです。' }],
  },
  {
    sessionId: '01989fb5-b5e1-72d4-92cc-1982bfdc1a11', incidentNo: 'INC-2026-1204-19', title: 'MFA 疲労攻撃の疑い', severity: 'High', status: 'investigating', product: 'Microsoft Defender', user: 'executive@contoso.com', host: 'IPHONE-128', ip: '203.0.113.164', os: 'iOS 18', analyst: '井上 由佳', analystInitials: 'IY', assigneeId: 'inoue', updatedAt: '6日前', createdAt: '2026/05/15 13:18', updatedFull: '2026/05/15 14:26', alertCount: 9,
    files: [], alerts: [{ level: 'High', name: 'MFA denied multiple times', source: 'Microsoft Defender · 13:42' }], messages: [{ role: 'ai', author: 'West Hawk', time: '13:58', text: '短時間に連続したMFA拒否を確認しました。パスワードリセットとトークン失効を検討してください。' }],
  },
  {
    sessionId: '01989fb9-c713-7d46-8658-55f0e3ea1a12', incidentNo: 'INC-2026-1203-63', title: '管理共有へのアクセス', severity: 'Medium', status: 'closed', product: 'CrowdStrike Falcon', user: 'backup@contoso.com', host: 'FS-018', ip: '10.10.18.77', os: 'Windows Server 2022', analyst: '橋本 直人', analystInitials: 'HN', assigneeId: 'hashimoto', updatedAt: '7日前', createdAt: '2026/05/14 17:04', updatedFull: '2026/05/14 18:41', alertCount: 2,
    files: [], alerts: [{ level: 'Medium', name: 'Administrative share access', source: 'CrowdStrike Falcon · 17:32' }], messages: [{ role: 'ai', author: 'West Hawk', time: '18:34', text: 'バックアップ作業に伴うアクセスであることを確認しました。' }],
  },
  {
    sessionId: '01989fbd-d824-7173-8417-0e60a4121a13', incidentNo: 'INC-2026-1203-28', title: 'Linux ホストの認証異常', severity: 'Medium', status: 'monitoring', product: 'CrowdStrike Falcon', user: 'deploy@contoso.com', host: 'LINUX-APP-04', ip: '10.10.90.24', os: 'Ubuntu 24.04', analyst: '石川 玲奈', analystInitials: 'IR', assigneeId: 'ishikawa', updatedAt: '7日前', createdAt: '2026/05/14 10:22', updatedFull: '2026/05/14 12:08', alertCount: 3,
    files: [], alerts: [{ level: 'Medium', name: 'SSH authentication anomaly', source: 'CrowdStrike Falcon · 11:19' }], messages: [{ role: 'ai', author: 'West Hawk', time: '11:35', text: '通常と異なる鍵によるSSH認証を確認しました。鍵のローテーション状況を確認中です。' }],
  },
  {
    sessionId: '01989fc1-e935-79c7-8e6f-8de9a5e91a14', incidentNo: 'INC-2026-1202-87', title: 'DNSトンネリングの兆候', severity: 'High', status: 'reviewing', product: 'Microsoft Sentinel', user: 'system@contoso.com', host: 'WS-948', ip: '10.10.24.188', os: 'Windows 11 Enterprise', analyst: '岡田 拓海', analystInitials: 'OT', assigneeId: 'okada', updatedAt: '8日前', createdAt: '2026/05/13 15:33', updatedFull: '2026/05/13 17:20', alertCount: 6,
    files: [{ name: 'dns-query-sample.csv', type: 'CSV', meta: '84 KB · 17:14' }], alerts: [{ level: 'High', name: 'Possible DNS tunneling', source: 'Microsoft Sentinel · 16:22' }], messages: [{ role: 'ai', author: 'West Hawk', time: '16:48', text: '高エントロピーのDNSクエリを確認しました。通信先ドメインの遮断可否を確認してください。' }],
  },
  {
    sessionId: '01989fc5-fa46-7a21-9a84-1f69e6ba1a15', incidentNo: 'INC-2026-1202-14', title: '端末からのデータ持ち出し疑い', severity: 'High', status: 'closed', product: 'Microsoft Defender', user: 'contractor@contoso.com', host: 'LT-703', ip: '10.10.53.47', os: 'Windows 11 Pro', analyst: '藤田 遥', analystInitials: 'FH', assigneeId: 'fujita', updatedAt: '8日前', createdAt: '2026/05/13 09:06', updatedFull: '2026/05/13 11:40', alertCount: 4,
    files: [], alerts: [{ level: 'High', name: 'Large data transfer', source: 'Microsoft Defender · 10:18' }], messages: [{ role: 'ai', author: 'West Hawk', time: '11:22', text: '承認済みのデータ移行作業と一致することを確認しました。追加の持ち出しは検出されていません。' }],
  },
];

const incidentRelationships = [
  { id: 'seed-1209-65', a: { no: 'INC-2026-1212-34', title: '疑わしいサインインの活動' }, b: { no: 'INC-2026-1209-65', title: '同一ユーザーのサインイン異常' }, relation: '同一ユーザー' },
  { id: 'seed-1208-42', a: { no: 'INC-2026-1212-34', title: '疑わしいサインインの活動' }, b: { no: 'INC-2026-1208-42', title: 'VPN Geo Mismatch' }, relation: '同一ホスト／IP' },
];

const incidentTeamChats = {
  'INC-2026-1212-34': [
    { author: '佐藤 美咲', initials: 'MS', analystId: 'satou', time: '10:34', timestamp: '2026-05-21T10:34:18+09:00', text: '@田中 明 さん、ユーザーへの連絡状況はいかがですか。こちらでVPNログも確認します。' },
    { author: '山田 健太', initials: 'YK', analystId: 'yamada', time: '10:36', timestamp: '2026-05-21T10:36:44+09:00', text: '承知しました。関連アラートの時系列を整理して、ここへ共有します。' },
    { author: '田中 明', initials: 'T', analystId: 'tanaka', time: '10:38', timestamp: '2026-05-21T10:38:53+09:00', text: '本人確認を進めています。@佐藤 美咲 さん、VPNログの確認をお願いします。' },
  ],
  'INC-2026-1211-07': [
    { author: '鈴木 翔', initials: 'SS', analystId: 'suzuki', time: '09:18', text: '@田中 明 さん、一次切り分けの結果を共有しました。追加確認があればお願いします。' },
  ],
};

const investigationPrompts = {
  summary: { title: '調査サマリーを作成', description: '現在の状況、確認済み、未確認、次のアクションを整理します。', prompt: 'この調査セッションの会話履歴と調査コンテキストをもとに、現在の状況、確認済み事項、未確認事項、次のアクションをMarkdownで要約してください。' },
  nextSteps: { title: '次に確認すべき項目を整理', description: 'ログ、端末、ユーザー、横展開などの追加確認を洗い出します。', prompt: 'この調査セッションの会話履歴と調査コンテキストを確認し、次に確認すべき項目を優先度順にMarkdownで整理してください。各項目には、確認理由と期待する判断材料も添えてください。' },
  customerReport: { title: '顧客向け報告文を下書き', description: '顧客に共有しやすい落ち着いた文面へ整えます。', prompt: 'この調査セッションの内容をもとに、顧客へ共有するための報告文をMarkdownで下書きしてください。断定しすぎず、判明している事実、対応状況、追加確認中の事項、次回報告予定が分かる文面にしてください。' },
  containment: { title: '封じ込めアクションを整理', description: '即時対応、追加確認、監視移行の判断を分けます。', prompt: 'この調査セッションの内容をもとに、封じ込めアクションをMarkdownで整理してください。即時実施、追加確認後に実施、監視へ移行する条件の3つに分け、運用チームへ渡せる粒度で記載してください。' },
  riskReview: { title: '未確認リスクを洗い出し', description: 'クローズ前に残っているリスクや確認漏れを点検します。', prompt: 'この調査セッションをクローズまたは監視へ移す前提で、未確認リスクと確認漏れの可能性をMarkdownで洗い出してください。重大度、確認方法、放置した場合の影響が分かる形にしてください。' },
  closeDecision: { title: 'クローズ判断を支援', description: 'クローズ、監視継続、追加確認の判断材料をまとめます。', prompt: 'この調査セッションの会話履歴と調査コンテキストをもとに、クローズ可能か、監視継続か、追加確認が必要かを判断するための材料をMarkdownで整理してください。結論、根拠、不足情報、推奨ステータスを分けてください。' },
};

const state = { selectedSessionId: sessions[0].sessionId, filter: 'all', tab: 'conversation', panelOpen: true, analystDrawerOpen: false, visualTheme: 'standard', relatedSelectionIncidentNo: null, aiWorkingFor: null, investigationPromptKey: 'summary', mentionCandidates: [], mentionIndex: -1, timelinePositions: {} };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function esc(value = '') { return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char])); }
function getSession(id = state.selectedSessionId) { return sessions.find((session) => session.sessionId === id); }
function isEditable(session = getSession()) { return session?.assigneeId === currentUser.id; }
function timeNow(date = new Date()) { return new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone:'Asia/Tokyo' }).format(date); }
function dateTimeNow() { return new Intl.DateTimeFormat('ja-JP', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Tokyo' }).format(new Date()).replace(/\//g, '/'); }
function messageNow(message, date = new Date()) { return { ...message, time: timeNow(date), timestamp: date.toISOString() }; }
function sessionFallbackTimestamp(session, time = '00:00') {
  const date = (session.createdAt.match(/\d{4}\/\d{2}\/\d{2}/)?.[0] || '2026/05/21').replace(/\//g, '-');
  return `${date}T${time.length === 5 ? `${time}:00` : time}+09:00`;
}
function messageDate(message, session) {
  const date = new Date(message.timestamp || sessionFallbackTimestamp(session, message.time));
  return Number.isNaN(date.getTime()) ? new Date(sessionFallbackTimestamp(session, '00:00')) : date;
}
function dateParts(date) {
  return Object.fromEntries(new Intl.DateTimeFormat('en-CA', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23', timeZone:'Asia/Tokyo' }).formatToParts(date).filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value]));
}
function messageDateKey(date) { const parts = dateParts(date); return `${parts.year}-${parts.month}-${parts.day}`; }
function formatTimelineDate(date) { return new Intl.DateTimeFormat('ja-JP', { year:'numeric', month:'long', day:'numeric', weekday:'short', timeZone:'Asia/Tokyo' }).format(date); }
function formatFullTimestamp(date) { const parts = dateParts(date); return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} JST`; }
function timelineDateDividerHtml(date) { return `<div class="timeline-date-divider"><span>${esc(formatTimelineDate(date))}</span></div>`; }
function timelineMessagesHtml(messages, session, renderMessage) {
  let previousDateKey = '';
  return messages.map((message) => {
    const date = messageDate(message, session);
    const dateKey = messageDateKey(date);
    const divider = dateKey === previousDateKey ? '' : timelineDateDividerHtml(date);
    previousDateKey = dateKey;
    return `${divider}${renderMessage(message, date)}`;
  }).join('');
}
function isTimelineTab(tab = state.tab) { return tab === 'conversation' || tab === 'team-chat'; }
function timelineKey(sessionId = state.selectedSessionId, tab = state.tab) { return `${sessionId}:${tab}`; }
function isAtTimelineLatest(stage) { return stage.scrollHeight - stage.scrollTop - stage.clientHeight < 72; }
function rememberTimelinePosition() {
  const stage = $('#content-stage');
  const key = stage.dataset.timelineKey;
  if (!key) return;
  state.timelinePositions[key] = { top: stage.scrollTop, atLatest: isAtTimelineLatest(stage) };
}
function renderTimelineNavigation(session, tab) {
  return `<nav class="timeline-navigation" aria-label="調査記録の移動"><button class="timeline-jump-button" type="button" data-action="timeline-top" title="最初の記録へ移動"><span class="icon" data-icon="arrow-up"></span><span>最初</span></button><button class="timeline-jump-button" type="button" data-action="timeline-latest" title="最新の記録へ移動"><span class="icon" data-icon="arrow-down"></span><span>最新</span></button></nav>`;
}
function moveTimeline(position) {
  const stage = $('#content-stage');
  const key = stage.dataset.timelineKey;
  if (!key) return;
  const top = position === 'top' ? 0 : stage.scrollHeight;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  stage.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
}
function statusStyle(status) { const item = statuses[status]; return `--status:${item.color};--status-bg:${item.bg || '#eef2f5'};--status-text:${item.text || '#5f7180'};`; }
function severityClass(severity) { return severity.toLowerCase(); }
function getIncidentInfo(incidentNo) { const session = sessions.find((item) => item.incidentNo === incidentNo); return session ? { no: session.incidentNo, title: session.title, analyst: session.analyst, product: session.product, status: session.status } : null; }
function getRelatedIncidentItems(incidentNo) { return incidentRelationships.filter((item) => item.a.no === incidentNo || item.b.no === incidentNo).map((item) => ({ id: item.id, ...(item.a.no === incidentNo ? item.b : item.a), relation: item.relation })); }
function getIncidentTeamChat(incidentNo) { if (!incidentTeamChats[incidentNo]) incidentTeamChats[incidentNo] = []; return incidentTeamChats[incidentNo]; }
function recordIncidentEvent(incidentNo, text) { sessions.filter((session) => session.incidentNo === incidentNo).forEach((session) => { session.messages.push(messageNow({ role: 'system', author: 'System', text })); session.updatedAt = 'たった今'; session.updatedFull = dateTimeNow(); }); }
function activeAssignmentCount(analystId) { return sessions.filter((session) => session.assigneeId === analystId && session.status !== 'closed').length; }

function renderIcons(scope = document) {
  scope.querySelectorAll('[data-icon]').forEach((element) => {
    const key = element.dataset.icon;
    const path = iconPaths[key] || iconPaths.file;
    element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  });
}

function renderFilters() {
  const counts = Object.keys(statuses).reduce((acc, key) => ({ ...acc, [key]: key === 'all' ? sessions.length : sessions.filter((session) => session.status === key).length }), {});
  $('#status-filters').innerHTML = Object.entries(statuses).map(([key, value]) => `
    <button class="status-filter ${state.filter === key ? 'is-active' : ''}" type="button" data-filter="${key}" style="--status:${value.color}">
      <span class="status-pin"></span><span>${value.label}</span><strong>${counts[key]}</strong>
    </button>`).join('');
}

function matchesSession(session) {
  return state.filter === 'all' || session.status === state.filter;
}

function matchesSearch(session) {
  const query = $('#search-query').value.trim().toLowerCase();
  const status = $('#search-status').value;
  const analyst = $('#search-analyst').value;
  const searchMatch = !query || [session.incidentNo, session.title, session.analyst, session.product, session.user, session.host].join(' ').toLowerCase().includes(query);
  return searchMatch && (status === 'all' || session.status === status) && (analyst === 'all' || session.assigneeId === analyst);
}

function renderSearchResults() {
  const visible = sessions.filter(matchesSearch);
  $('#search-result-count').textContent = `${visible.length}件の調査セッション`;
  $('#search-result-list').innerHTML = visible.length ? visible.map((session) => `
    <button class="search-result" type="button" role="listitem" data-search-session-id="${session.sessionId}" style="${statusStyle(session.status)}">
      <span><strong>#${esc(session.incidentNo)} · ${esc(session.title)}</strong><small>${esc(session.analyst)} · ${esc(session.product)}</small></span>
      <span class="search-result__status"><i></i>${esc(statuses[session.status].label)}</span>
    </button>`).join('') : '<p class="search-result-empty">条件に一致する調査セッションはありません。</p>';
}

function openSearch() {
  const dialog = $('#search-dialog');
  if (!dialog.open) dialog.showModal();
  renderSearchResults();
  requestAnimationFrame(() => $('#search-query').focus());
}

function renderSessionList() {
  const visible = sessions.filter(matchesSession);
  const recentSessions = visible.slice(0, 10);
  $('#visible-count').textContent = visible.length > recentSessions.length ? `直近${recentSessions.length}件 / 全${visible.length}件` : `${visible.length}件`;
  $('#session-list').innerHTML = recentSessions.length ? recentSessions.map((session) => `
    <button class="session-item ${session.sessionId === state.selectedSessionId ? 'is-selected' : ''} ${isEditable(session) ? 'is-assigned' : 'is-observed'}" type="button" role="listitem" data-session-id="${session.sessionId}" style="--session-status:${statuses[session.status].color}">
      <span class="session-icon" aria-label="${isEditable(session) ? '自分に割り当て済み' : '他のアナリストに割り当て済み'}"><span class="icon" data-icon="${isEditable(session) ? 'assigned' : 'observed'}"></span></span>
      <span class="session-content"><span class="session-item__top"><strong>#${esc(session.incidentNo)}</strong><time>${esc(session.updatedAt)}</time></span>
      <span class="session-item__title">${esc(session.title)}</span>
      <span class="session-meta" style="${statusStyle(session.status)}"><span class="severity is-${severityClass(session.severity)}"><i></i>${esc(session.severity)}</span><span class="tag is-product">${esc(session.product.replace('Microsoft ', ''))}</span><span class="tag is-status">${esc(statuses[session.status].label)}</span></span></span>
    </button>`).join('') : '<div class="empty-list">条件に一致するインシデントはありません。</div>';
  renderIcons($('#session-list'));
}

function renderCaseHeader() {
  const session = getSession();
  const customerProfile = customerProfiles[session.customer] || defaultCustomerProfile;
  const titleEditAction = isEditable(session) ? '<button class="case-title-edit-button" type="button" data-action="open-title-edit" aria-label="調査タイトルを編集" title="調査タイトルを編集"><span class="icon" data-icon="edit"></span></button>' : '';
  $('#case-header').innerHTML = `
    <div class="case-header__top">
      <div>
        <div class="case-state" style="${statusStyle(session.status)}"><span class="status-pin"></span>${esc(statuses[session.status].label)}</div>
        <div class="case-title-row"><h1>#${esc(session.incidentNo)}</h1><button type="button" data-action="copy-incident" aria-label="インシデント番号をコピー" title="インシデント番号をコピー"><span class="icon" data-icon="copy"></span></button></div>
        <div class="case-title-edit"><p class="case-title">${esc(session.title)}</p>${titleEditAction}</div>
        <div class="case-facts">
          <div class="case-facts__primary">
            <span class="severity is-${severityClass(session.severity)}"><i></i>${esc(session.severity)}</span>
            <span class="fact-chip is-customer"><span class="icon" data-icon="tenant"></span>${esc(customerProfile.customer)}</span>
            <span class="assignment-chip ${isEditable(session) ? 'is-assigned' : 'is-observed'}"><span class="icon" data-icon="${isEditable(session) ? 'assigned' : 'observed'}"></span>${isEditable(session) ? '自分に割り当て済み' : '閲覧のみ'}</span>
          </div>
          <div class="case-facts__secondary">
            <span class="fact-chip"><span class="icon" data-icon="shield"></span>${esc(session.product)}</span>
            <span class="fact-chip"><span class="icon" data-icon="user"></span>${esc(session.user)}</span>
            <span class="fact-chip"><span class="icon" data-icon="desktop"></span>${esc(session.host)}</span>
          </div>
        </div>
      </div>
      <div class="case-actions">
        <button type="button" data-action="session-menu" aria-label="その他の操作"><span class="icon" data-icon="more"></span></button>
      </div>
    </div>`;
  $('#alert-count').textContent = `(${session.alerts.length})`;
  $('#file-count').textContent = `(${session.files.length})`;
  renderIcons($('#case-header'));
}

function messageTimeHtml(message, date) {
  const time = message.time || timeNow(date);
  const fullTimestamp = formatFullTimestamp(date);
  return `<time datetime="${esc(date.toISOString())}" title="${esc(fullTimestamp)}" aria-label="投稿日時 ${esc(fullTimestamp)}">${esc(time)}</time>`;
}

function messageHtml(message, date) {
  if (message.role === 'system') {
    return `<article class="system-event"><span class="system-event__mark"><span class="icon" data-icon="activity"></span></span><div><p><strong>System</strong>${esc(message.text)}</p>${messageTimeHtml(message, date)}</div></article>`;
  }
  const body = message.text.split('\n').filter(Boolean).map((line) => `<p>${esc(line)}</p>`).join('');
  const bullets = message.bullets?.length ? `<ul>${message.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : '';
  const actions = message.actions?.length ? `<div class="message-actions">${message.actions.map((action) => `<button type="button" data-action="message-action">${esc(action)}</button>`).join('')}</div>` : '';
  const isAi = message.role === 'ai';
  return `<article class="message ${isAi ? 'is-ai' : 'is-analyst'}"><div class="message-avatar ${isAi ? 'is-ai' : 'is-analyst'}">${isAi ? '<img src="assets/img/logo-design.svg" alt="" aria-hidden="true">' : esc(message.initials)}</div><div><div class="message-head"><strong>${esc(message.author)}</strong>${messageTimeHtml(message, date)}</div><div class="message-body">${body}${bullets}${actions}</div></div></article>`;
}

function renderConversation(session) {
  const working = state.aiWorkingFor === session.sessionId ? '<div class="message is-ai"><div class="message-avatar is-ai"><img src="assets/img/logo-design.svg" alt="" aria-hidden="true"></div><div><div class="ai-working"><span></span>調査コンテキストを確認しています…</div></div></div>' : '';
  return `<div class="conversation">${renderTimelineNavigation(session, 'conversation')}<div class="conversation-trace">${timelineMessagesHtml(session.messages, session, messageHtml)}${working}</div></div>`;
}

function teamChatTextHtml(text) {
  let safeText = esc(text);
  Object.values(analysts).forEach((analyst) => { safeText = safeText.replaceAll(`@${analyst.name}`, `<mark class="chat-mention">@${esc(analyst.name)}</mark>`); });
  return safeText.replace(/\n/g, '<br>');
}

function teamChatMessageHtml(message, date) {
  const isCurrentUser = message.analystId === currentUser.id;
  return `<article class="team-chat-message ${isCurrentUser ? 'is-current-user' : ''}"><span class="team-chat-avatar ${isCurrentUser ? 'is-current-user' : ''}">${esc(message.initials)}</span><div><div class="team-chat-message__head"><strong>${esc(message.author)}</strong>${messageTimeHtml(message, date)}</div><p>${teamChatTextHtml(message.text)}</p></div></article>`;
}

function renderTeamChat(session) {
  const messages = getIncidentTeamChat(session.incidentNo);
  const body = messages.length ? timelineMessagesHtml(messages, session, teamChatMessageHtml) : '<p class="empty-state">まだチャットはありません。チームへの共有や確認依頼を投稿できます。</p>';
  return `<div class="team-chat">${renderTimelineNavigation(session, 'team-chat')}<div class="team-chat__intro"><h2>アナリストチャット</h2><p>#${esc(session.incidentNo)} に関するチーム内の連絡です。AIへの問い合わせは行いません。</p></div><div class="team-chat__trace">${body}</div></div>`;
}

function productPortalUrl(product) {
  if (product.includes('SentinelOne')) return 'https://usea1.sentinelone.net/';
  if (product.includes('Sentinel')) return 'https://portal.azure.com/';
  if (product.includes('Defender')) return 'https://security.microsoft.com/';
  if (product.includes('CrowdStrike')) return 'https://falcon.crowdstrike.com/';
  return '#';
}

function alertUrl(alert, session) { return alert.url || productPortalUrl(alert.product || session.product); }

function alertSourceText(alert, product) {
  return alert.source.startsWith(product) ? alert.source : `${product} · ${alert.source}`;
}

function externalReferenceDetails(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return { isUrl: false };
    const text = `${url.hostname}${url.pathname}`.toLowerCase();
    const product = text.includes('crowdstrike') || text.includes('falcon') ? 'CrowdStrike Falcon'
      : text.includes('sentinelone') ? 'SentinelOne'
      : text.includes('security.microsoft') || text.includes('defender') ? 'Microsoft Defender for Endpoint'
      : text.includes('azure') || text.includes('sentinel') ? 'Microsoft Sentinel'
      : '';
    const title = text.includes('impossible') ? 'Impossible Travelの調査'
      : text.includes('mfa') ? 'MFA 疲労攻撃の調査'
      : product ? `${product}のアラート調査` : '外部アラートから開始した調査';
    return { isUrl: true, url: url.href, product, title };
  } catch {
    return { isUrl: false };
  }
}

function generatedIncidentNo() {
  return `INC-${new Date().getFullYear()}-${String(Date.now()).slice(-7)}`;
}

function updateNewInvestigationReference() {
  const reference = $('#new-reference').value.trim();
  const details = externalReferenceDetails(reference);
  const product = $('#new-product');
  const title = $('#new-title');
  const note = $('#new-reference-note');
  if (!details.isUrl) {
    note.textContent = '番号で開始する場合は、アラート発出製品と顧客／テナントを選択してください。';
    return;
  }
  if (details.product) product.value = details.product;
  if (!title.value) title.value = details.title;
  note.textContent = details.product ? `${details.product} のURLとして認識しました。内容を確認して調査を開始できます。` : 'URLを認識しました。アラート発出製品と顧客／テナントを確認してください。';
}

function renderAlerts(session) {
  const canManage = isEditable(session);
  const cards = session.alerts.length ? session.alerts.map((alert) => {
    const product = alert.product || session.product;
    return `<article class="alert-card"><span class="alert-level">${esc(alert.level)}</span><div><strong>${esc(alert.name)}</strong><p>${esc(alertSourceText(alert, product))}</p></div><a href="${esc(alertUrl(alert, session))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(alert.name)}を製品画面で開く"><span class="icon" data-icon="external"></span>開く</a></article>`;
  }).join('') : '<p class="empty-state">アラートリンクはまだありません。調査中に確認した外部アラートURLを追加できます。</p>';
  return `<div class="tab-view"><div class="tab-view__heading"><div><h2>アラートリンク</h2></div>${canManage ? '<button class="link-related-button" type="button" data-action="open-alert-link"><span class="icon" data-icon="plus"></span>URLを追加</button>' : ''}</div><p class="alert-list__lead">外部製品で確認したアラートを、調査の判断根拠として保存します。</p><div class="alert-list">${cards}</div></div>`;
}
function renderRelated(session) {
  const canManage = isEditable(session);
  const relatedItems = getRelatedIncidentItems(session.incidentNo);
  const cards = relatedItems.length ? relatedItems.map((item) => `<article class="related-card"><span class="file-type">INC</span><div><strong>#${esc(item.no)} · ${esc(item.title)}</strong><p>${esc(item.relation)}</p></div><div class="related-card__actions"><button type="button" data-action="show-related">確認</button>${canManage ? `<button type="button" data-action="unlink-related" data-related-id="${esc(item.id)}">解除</button>` : ''}</div></article>`).join('') : '<p class="empty-state">関連インシデントはまだありません。</p>';
  return `<div class="tab-view"><div class="tab-view__heading"><div><h2>関連インシデント</h2></div>${canManage ? '<button class="link-related-button" type="button" data-action="open-related-link"><span class="icon" data-icon="link"></span>関連付ける</button>' : ''}</div><div class="related-list">${cards}</div></div>`;
}
function renderFiles(session) { return `<div class="tab-view"><h2>調査ファイル</h2><div class="file-list">${session.files.length ? session.files.map((file) => `<article class="file-card"><span class="file-type">${esc(file.type)}</span><div><strong>${esc(file.name)}</strong><p>${esc(file.meta)}</p></div><button type="button" data-action="show-file">開く</button></article>`).join('') : '<p class="empty-state">この調査セッションにはファイルがありません。</p>'}</div></div>`; }

function renderStage() {
  const session = getSession();
  const stage = $('#content-stage');
  rememberTimelinePosition();
  const timeline = isTimelineTab();
  const key = timeline ? timelineKey(session.sessionId, state.tab) : '';
  const views = { conversation: renderConversation, 'team-chat': renderTeamChat, alerts: renderAlerts, related: renderRelated, files: renderFiles };
  stage.innerHTML = views[state.tab](session);
  if (timeline) stage.dataset.timelineKey = key;
  else delete stage.dataset.timelineKey;
  $('#composer').classList.toggle('is-hidden', state.tab !== 'conversation');
  $('#team-chat-composer').classList.toggle('is-hidden', state.tab !== 'team-chat');
  $$('#workspace-tabs [data-tab]').forEach((button) => button.classList.toggle('is-active', button.dataset.tab === state.tab));
  renderIcons(stage);
  if (timeline) requestAnimationFrame(() => {
    const position = state.timelinePositions[key];
    if (!position || position.atLatest) stage.scrollTop = stage.scrollHeight;
    else stage.scrollTop = position.top;
  });
}

function renderComposer() {
  const editable = isEditable();
  const input = $('#message-input');
  input.disabled = !editable;
  input.placeholder = editable ? 'AIに質問する…' : 'この調査セッションは閲覧専用です';
  $('[data-action="attach"]').disabled = !editable;
  $('[data-action="open-investigation-prompt"]').disabled = !editable;
  $('[data-action="post-message"]').disabled = !editable;
  $('#composer [type="submit"]').disabled = !editable;
  $('#composer').classList.toggle('is-readonly', !editable);
  $('#composer-hint').innerHTML = editable
    ? '「調査記録に投稿」はAIへ問い合わせず、調査記録だけを残します。<span>Ctrl + Enter でAIに質問</span>'
    : `この調査は ${esc(getSession().analyst)} さんに割り当てられているため、閲覧のみです。`;
}

function renderTeamChatComposer() {
  const input = $('#team-chat-input');
  input.disabled = false;
  input.placeholder = 'アナリストへメッセージを投稿…';
}

function analystRosterHtml() {
  return Object.entries(analysts).map(([id, analyst]) => {
    const workStatus = workStatuses[analystWorkStatuses[id]];
    const workLocation = workLocations[analystWorkLocations[id]];
    const assignmentCount = activeAssignmentCount(id);
    return `<li class="analyst-roster__item ${id === currentUser.id ? 'is-current-user' : ''}" style="--work-status:${workStatus.color};--work-status-bg:${workStatus.bg};--work-location:${workLocation.color};--work-location-bg:${workLocation.bg}"><span class="analyst-roster__avatar">${esc(analyst.initials)}</span><span class="analyst-roster__identity"><strong><span>${esc(analyst.name)}</span><em>${esc(workLocation.label)}</em></strong><small><i></i>${esc(workStatus.label)}</small></span><span class="analyst-roster__load">担当 ${assignmentCount}件</span></li>`;
  }).join('');
}

function renderAnalystDrawer() {
  const analystRoster = analystRosterHtml();
  const statusSummary = Object.entries(workStatuses).map(([key, item]) => `<li style="--summary-status:${item.color}"><span><i></i>${esc(item.label)}</span><strong>${Object.values(analystWorkStatuses).filter((status) => status === key).length}<small>名</small></strong></li>`).join('');
  $('#analyst-drawer-content').innerHTML = `<p class="analyst-drawer__lead">現在の対応可否、出社／在宅、進行中の担当件数をチーム横断で確認できます。</p><ul class="analyst-status-summary">${statusSummary}</ul><div class="analyst-drawer__list-heading"><span>アナリスト一覧</span><strong>${Object.keys(analysts).length}名</strong></div><div class="analyst-roster analyst-roster--drawer"><div class="analyst-roster__list" tabindex="0" aria-label="アナリスト一覧、全${Object.keys(analysts).length}名"><ul>${analystRoster}</ul></div></div>`;
}

function renderContext() {
  const session = getSession();
  const editable = isEditable(session);
  const customerProfile = customerProfiles[session.customer] || defaultCustomerProfile;
  const assignedAnalyst = analysts[session.assigneeId];
  const statusOptions = Object.entries(statuses).filter(([key]) => key !== 'all').map(([key, value]) => `<option value="${key}" ${session.status === key ? 'selected' : ''}>${esc(value.label)}</option>`).join('');
  const assigneeOptions = Object.entries(analysts).map(([key, analyst]) => `<option value="${key}" ${session.assigneeId === key ? 'selected' : ''}>${esc(analyst.name)}</option>`).join('');
  const statusValue = editable
    ? `<span class="inline-state-select-trigger"><span class="context-status"><span class="status-pin"></span>${esc(statuses[session.status].label)}</span><span class="icon" data-icon="chevron"></span><select class="inline-state-select" id="status-select" aria-label="ステータスを変更">${statusOptions}</select></span>`
    : `<span class="context-status"><span class="status-pin"></span>${esc(statuses[session.status].label)}</span>`;
  const assigneeValue = `<span class="assignee-select-trigger"><span class="assignee-avatar">${esc(assignedAnalyst.initials)}</span><span>${esc(assignedAnalyst.name)}</span><span class="icon" data-icon="chevron"></span><select class="assignee-select" id="assignee-select" aria-label="担当アナリストを変更">${assigneeOptions}</select></span>`;
  const assignmentActions = !editable ? '<button class="take-assignment-button" type="button" data-action="take-assignment"><span class="icon" data-icon="assigned"></span>自分を担当にする</button>' : '';
  $('#context-scroll').innerHTML = `
    <section class="context-section"><div class="context-section__head"><h3>現在の状態</h3></div><dl class="detail-list" style="${statusStyle(session.status)}"><div><dt>ステータス</dt><dd>${statusValue}</dd></div><div><dt>作成日時</dt><dd>${esc(session.createdAt)}</dd></div><div><dt>最終更新</dt><dd>${esc(session.updatedFull)}</dd></div><div><dt>担当アナリスト</dt><dd>${assigneeValue}</dd></div></dl>${assignmentActions ? `<div class="assignment-actions">${assignmentActions}</div>` : ''}</section>
    <section class="context-section"><div class="context-section__head"><h3>顧客・テナント</h3></div><dl class="detail-list"><div><dt>顧客</dt><dd>${esc(customerProfile.customer)}</dd></div><div><dt>テナント</dt><dd>${esc(customerProfile.tenant)}</dd></div><div><dt>テナントID</dt><dd>${esc(customerProfile.tenantId)}</dd></div><div class="detail-list__products"><dt>導入製品</dt><dd><span class="product-chip-list">${customerProfile.products.map((product) => `<span>${esc(product)}</span>`).join('')}</span></dd></div></dl></section>
    <section class="context-section"><div class="context-section__head"><h3>ユーザー情報</h3></div><dl class="detail-list"><div><dt>ユーザー</dt><dd>${esc(session.user)}</dd></div><div><dt>ホスト名</dt><dd>${esc(session.host)}</dd></div><div><dt>IPアドレス</dt><dd>${esc(session.ip)}</dd></div><div><dt>OS</dt><dd>${esc(session.os)}</dd></div></dl></section>
    `;
  renderIcons($('#context-scroll'));
}

function renderWorkStatusControl() {
  const status = workStatuses[analystWorkStatuses[currentUser.id]];
  const location = workLocations[analystWorkLocations[currentUser.id]];
  const button = $('#work-status-button');
  button.style.setProperty('--work-status', status.color);
  button.setAttribute('aria-label', `勤務状況を変更（現在: ${status.label}、${location.label}）`);
  button.title = `勤務状況: ${status.label} / ${location.label}`;
}
function renderAll() { renderFilters(); renderSessionList(); renderCaseHeader(); renderStage(); renderComposer(); renderTeamChatComposer(); renderContext(); renderWorkStatusControl(); renderAnalystDrawer(); }
function showToast(text) { const toast = $('#toast'); toast.textContent = text; toast.classList.add('is-visible'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600); }

function selectSession(sessionId) { if (!getSession(sessionId)) return; state.selectedSessionId = sessionId; state.tab = 'conversation'; $('#message-input').value = ''; renderAll(); }
function togglePanel() { state.panelOpen = !state.panelOpen; $('#workspace-grid').classList.toggle('is-panel-closed', !state.panelOpen); $$('[data-action="toggle-panel"]').forEach((button) => button.setAttribute('aria-label', state.panelOpen ? '詳細パネルを閉じる' : '詳細パネルを開く')); }
function setAnalystDrawer(open) {
  state.analystDrawerOpen = open;
  const layer = $('#analyst-drawer-layer');
  layer.classList.toggle('is-open', open);
  layer.setAttribute('aria-hidden', String(!open));
  $('#analyst-drawer-button').setAttribute('aria-expanded', String(open));
  if (open) { renderAnalystDrawer(); requestAnimationFrame(() => $('#analyst-drawer-close').focus()); }
}
function setVisualTheme(theme) {
  const isNightOps = theme === 'night-ops';
  state.visualTheme = isNightOps ? 'night-ops' : 'standard';
  $('#night-ops-theme').disabled = !isNightOps;
  document.body.classList.toggle('theme-night-ops', isNightOps);
  const button = $('#theme-toggle-button');
  button.setAttribute('aria-pressed', String(isNightOps));
  button.setAttribute('aria-label', isNightOps ? '標準の表示テーマに戻す' : '濃色の表示テーマに切り替え');
  button.title = isNightOps ? '標準テーマに戻す（Mock）' : '濃色テーマを試す（Mock）';
}
function toggleVisualTheme() { setVisualTheme(state.visualTheme === 'night-ops' ? 'standard' : 'night-ops'); }
function copyText(value, message) { navigator.clipboard?.writeText(value).then(() => showToast(message)).catch(() => showToast(`${message}（クリップボードへのアクセスが必要です）`)); }
function autoResize(input) { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 96)}px`; }
function changeAssignee(assigneeId) {
  const session = getSession();
  const analyst = analysts[assigneeId];
  if (!analyst || session.assigneeId === assigneeId) return;
  const previousAnalyst = session.analyst;
  session.assigneeId = assigneeId;
  session.analyst = analyst.name;
  session.analystInitials = analyst.initials;
  session.messages.push(messageNow({ role: 'system', author: 'System', text: `担当アナリストを ${previousAnalyst} から ${analyst.name} に変更しました。変更者: ${currentUser.name}` }));
  session.updatedAt = 'たった今';
  session.updatedFull = dateTimeNow();
  renderAll();
  showToast(`${analyst.name} さんを担当アナリストに設定しました。`);
}

function openTitleEditor() {
  if (!isEditable()) return;
  $('#edit-title-input').value = getSession().title;
  $('#title-dialog').showModal();
  requestAnimationFrame(() => $('#edit-title-input').select());
}

function openWorkStatusDialog() {
  $('#work-status-select').value = analystWorkStatuses[currentUser.id];
  $('#work-location-select').value = analystWorkLocations[currentUser.id];
  $('#work-status-dialog').showModal();
}

function renderRelatedLinkResults() {
  const source = getSession();
  const query = $('#related-query').value.trim().toLowerCase();
  const relatedIncidentNos = new Set(getRelatedIncidentItems(source.incidentNo).map((item) => item.no));
  const visible = [...new Map(sessions.map((session) => [session.incidentNo, getIncidentInfo(session.incidentNo)]).filter(([incidentNo, item]) => incidentNo !== source.incidentNo && !relatedIncidentNos.has(incidentNo) && (!query || [item.no, item.title, item.analyst, item.product].join(' ').toLowerCase().includes(query)))).values()];
  $('#related-link-count').textContent = `${visible.length}件の候補`;
  $('#related-link-list').innerHTML = visible.length ? visible.map((incident) => `<button class="related-link-candidate ${state.relatedSelectionIncidentNo === incident.no ? 'is-selected' : ''}" type="button" role="listitem" data-related-incident-no="${incident.no}" style="${statusStyle(incident.status)}"><span><strong>#${esc(incident.no)} · ${esc(incident.title)}</strong><small>${esc(incident.analyst)} · ${esc(incident.product)}</small></span><span class="related-link-candidate__status"><i></i>${esc(statuses[incident.status].label)}</span></button>`).join('') : '<p class="search-result-empty">関連付け可能なインシデントはありません。</p>';
  $('#link-related-submit').disabled = !state.relatedSelectionIncidentNo;
}

function openRelatedLink() {
  if (!isEditable()) return;
  state.relatedSelectionIncidentNo = null;
  $('#related-link-form').reset();
  $('#related-dialog').showModal();
  renderRelatedLinkResults();
  requestAnimationFrame(() => $('#related-query').focus());
}

function addRelatedIncident() {
  const source = getSession();
  const target = getIncidentInfo(state.relatedSelectionIncidentNo);
  const sourceIncident = getIncidentInfo(source.incidentNo);
  if (!isEditable(source) || !target || target.no === source.incidentNo) return;
  const relation = $('#related-relation').value;
  if (getRelatedIncidentItems(source.incidentNo).some((item) => item.no === target.no)) return;
  incidentRelationships.push({ id: `rel-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`, a: { no: sourceIncident.no, title: sourceIncident.title }, b: { no: target.no, title: target.title }, relation });
  recordIncidentEvent(sourceIncident.no, `関連インシデントとして #${target.no}「${target.title}」を追加しました。関係: ${relation}。変更者: ${currentUser.name}`);
  recordIncidentEvent(target.no, `関連インシデントとして #${sourceIncident.no}「${sourceIncident.title}」が追加されました。関係: ${relation}。変更者: ${currentUser.name}`);
  state.relatedSelectionIncidentNo = null;
  $('#related-dialog').close();
  renderAll();
  showToast('関連インシデントを追加しました。');
}

function unlinkRelatedIncident(relatedId) {
  const source = getSession();
  if (!isEditable(source)) return;
  const relationship = incidentRelationships.find((item) => item.id === relatedId);
  if (!relationship) return;
  const related = relationship.a.no === source.incidentNo ? relationship.b : relationship.a;
  const sourceIncident = getIncidentInfo(source.incidentNo);
  const index = incidentRelationships.findIndex((item) => item.id === relatedId);
  incidentRelationships.splice(index, 1);
  recordIncidentEvent(sourceIncident.no, `関連インシデント #${related.no}「${related.title}」との関連付けを解除しました。変更者: ${currentUser.name}`);
  recordIncidentEvent(related.no, `関連インシデント #${sourceIncident.no}「${sourceIncident.title}」との関連付けが解除されました。変更者: ${currentUser.name}`);
  renderAll();
  showToast('関連インシデントを解除しました。');
}

function openAlertLink() {
  const session = getSession();
  if (!isEditable(session)) return;
  const form = $('#alert-link-form');
  form.reset();
  const product = $('#alert-link-product');
  if ([...product.options].some((option) => option.value === session.product)) product.value = session.product;
  $('#alert-link-dialog').showModal();
  requestAnimationFrame(() => $('#alert-link-url').focus());
}

function addAlertLink() {
  const session = getSession();
  if (!isEditable(session)) return;
  const form = new FormData($('#alert-link-form'));
  const url = externalReferenceDetails(form.get('url').trim());
  if (!url.isUrl) { $('#alert-link-url').focus(); return; }
  const product = form.get('product');
  const name = form.get('name').trim() || `${product}のアラート`;
  session.alerts.push({ level: form.get('level'), name, product, source: '手動追加', url: url.url });
  session.alertCount = session.alerts.length;
  session.messages.push(messageNow({ role: 'system', author: 'System', text: `アラートリンク「${name}」を追加しました。製品: ${product}。変更者: ${currentUser.name}` }));
  session.updatedAt = 'たった今';
  session.updatedFull = dateTimeNow();
  $('#alert-link-dialog').close();
  renderAll();
  showToast('アラートURLを保存しました。');
}

function renderInvestigationPromptList() {
  $('#investigation-prompt-list').innerHTML = Object.entries(investigationPrompts).map(([key, prompt]) => `<button class="investigation-prompt-option ${key === state.investigationPromptKey ? 'is-active' : ''}" type="button" role="listitem" aria-pressed="${key === state.investigationPromptKey}" data-investigation-prompt-key="${key}"><strong>${esc(prompt.title)}</strong><span>${esc(prompt.description)}</span></button>`).join('');
}

function selectInvestigationPrompt(promptKey) {
  const prompt = investigationPrompts[promptKey];
  if (!prompt) return;
  state.investigationPromptKey = promptKey;
  $('#investigation-prompt-description').textContent = prompt.description;
  $('#investigation-prompt-text').value = prompt.prompt;
  renderInvestigationPromptList();
}

function openInvestigationPrompt() {
  if (!isEditable() || state.tab !== 'conversation') return;
  selectInvestigationPrompt(state.investigationPromptKey);
  const dialog = $('#investigation-prompt-dialog');
  if (!dialog.open) dialog.showModal();
  requestAnimationFrame(() => $('#investigation-prompt-text').focus());
}

function investigationPromptResponse(promptKey, session) {
  const responses = {
    summary: { text: '調査状況を整理しました。確認済みの事実と、次に進めるべき対応を分けて記録します。', bullets: [`対象: ${session.user} / ${session.host}`, '確認済み: 関連アラートと直近の操作履歴を確認中', '未確認: 影響範囲と横展開の有無', '次のアクション: 認証・端末・ネットワークの記録を時系列で照合'] },
    nextSteps: { text: '優先度順に、次の確認項目を整理しました。', bullets: ['高: 対象ユーザーの直近認証、MFA、セッション失効の結果', '高: 同一IP・端末・ユーザーへの類似イベント', '中: 関連アプリケーションの操作履歴と条件付きアクセスの評価', '判断材料: 正常な業務利用で説明できるか'] },
    customerReport: { text: '顧客向けの報告文ドラフトです。現時点での事実と、追加確認中の事項を区別しています。', bullets: ['通常と異なるアクセス条件を確認し、現在は影響範囲を調査中', '必要に応じて封じ込め対応と監視継続を実施', '追加ログの確認後、推奨対応を含めて続報予定'] },
    containment: { text: '封じ込めアクションを、実施タイミング別に整理しました。', bullets: ['即時: 有効セッションの失効と認証情報の保護', '追加確認後: 関連端末・IPへの範囲拡大とアクセス制限', '監視移行: 追加の不審操作がなく、対象と期間が明確な場合'] },
    riskReview: { text: 'クローズまたは監視移行前に確認したいリスクを洗い出しました。', bullets: ['高: 同一IP・端末からの横展開や継続アクセス', '中: 関連アプリケーションでの閲覧・ダウンロード範囲', '中: 顧客への連絡要否と申し送りの未完了事項'] },
    closeDecision: { text: 'クローズ判断に必要な材料を整理しました。', bullets: ['クローズ条件: 本人確認と必要な封じ込めが完了している', '監視継続条件: 影響範囲または再発可能性の確認が残る', '追加確認条件: 横展開や追加の不審操作を否定できない'] },
  };
  return responses[promptKey] || responses.summary;
}

function sendInvestigationPrompt() {
  if (!isEditable()) return;
  const promptText = $('#investigation-prompt-text').value.trim();
  if (!promptText) { $('#investigation-prompt-text').focus(); return; }
  const sessionId = state.selectedSessionId;
  const session = getSession(sessionId);
  const promptKey = state.investigationPromptKey;
  session.messages.push(messageNow({ role: 'analyst', author: currentUser.name, initials: currentUser.initials, text: promptText }));
  session.updatedAt = 'たった今'; session.updatedFull = dateTimeNow();
  $('#investigation-prompt-dialog').close();
  state.aiWorkingFor = sessionId;
  renderAll();
  showToast('調査プロンプトをAIへ送信しました。');
  window.setTimeout(() => {
    const target = getSession(sessionId);
    if (!target) return;
    const response = investigationPromptResponse(promptKey, target);
    target.messages.push(messageNow({ role: 'ai', author: 'West Hawk', ...response }));
    target.updatedAt = 'たった今'; target.updatedFull = dateTimeNow(); state.aiWorkingFor = null;
    if (state.selectedSessionId === sessionId) renderAll();
  }, 620);
}

function publishMessage({ askAi }) {
  if (!isEditable()) return;
  const input = $('#message-input');
  const text = input.value.trim();
  if (!text) return;
  const sessionId = state.selectedSessionId;
  const session = getSession(sessionId);
  session.messages.push(messageNow({ role: 'analyst', author: currentUser.name, initials: currentUser.initials, text }));
  session.updatedAt = 'たった今'; session.updatedFull = dateTimeNow(); input.value = ''; autoResize(input);
  if (!askAi) { renderAll(); showToast('調査記録に投稿しました。'); return; }
  state.aiWorkingFor = sessionId; renderAll();
  window.setTimeout(() => {
    const target = getSession(sessionId);
    if (!target) return;
    target.messages.push(messageNow({ role: 'ai', author: 'West Hawk', text: '受け取りました。現在の会話と調査コンテキストを踏まえ、次に確認すべき観点を整理します。', bullets: ['対象ユーザーの直近30日間の通常行動と比較', '関連アラートの発生順序を確認', '判断根拠を会話内で確認'] }));
    target.updatedAt = 'たった今'; target.updatedFull = dateTimeNow(); state.aiWorkingFor = null;
    if (state.selectedSessionId === sessionId) renderAll();
  }, 620);
}

function closeMentionMenu() {
  const input = $('#team-chat-input');
  const menu = $('#mention-menu');
  state.mentionCandidates = [];
  state.mentionIndex = -1;
  menu.hidden = true;
  menu.innerHTML = '';
  input.removeAttribute('aria-activedescendant');
}

function renderMentionMenuOptions() {
  const input = $('#team-chat-input');
  const menu = $('#mention-menu');
  if (!state.mentionCandidates.length) { closeMentionMenu(); return; }
  menu.innerHTML = state.mentionCandidates.map(({ id, analyst }, index) => `<button id="mention-option-${id}" class="${index === state.mentionIndex ? 'is-active' : ''}" type="button" role="option" aria-selected="${index === state.mentionIndex}" data-mention-id="${id}"><span>${esc(analyst.initials)}</span><strong>${esc(analyst.name)}</strong><small>${esc(analyst.alias)}</small></button>`).join('');
  menu.hidden = false;
  const activeOption = menu.querySelector('.is-active');
  input.setAttribute('aria-activedescendant', activeOption.id);
  activeOption.scrollIntoView({ block: 'nearest' });
}

function renderMentionMenu() {
  const input = $('#team-chat-input');
  const beforeCursor = input.value.slice(0, input.selectionStart);
  const match = beforeCursor.match(/@([^\s@]*)$/);
  if (!match) { closeMentionMenu(); return; }
  const query = match[1].toLowerCase();
  state.mentionCandidates = Object.entries(analysts)
    .filter(([, analyst]) => `${analyst.name} ${analyst.alias}`.toLowerCase().includes(query))
    .slice(0, 6)
    .map(([id, analyst]) => ({ id, analyst }));
  if (!state.mentionCandidates.length) { closeMentionMenu(); return; }
  state.mentionIndex = 0;
  renderMentionMenuOptions();
}

function insertMention(analystId) {
  const analyst = analysts[analystId];
  const input = $('#team-chat-input');
  if (!analyst) return;
  const beforeCursor = input.value.slice(0, input.selectionStart).replace(/@[^\s@]*$/, `@${analyst.name} `);
  input.value = `${beforeCursor}${input.value.slice(input.selectionEnd)}`;
  input.selectionStart = input.selectionEnd = beforeCursor.length;
  closeMentionMenu();
  input.focus();
}

function publishTeamChat() {
  const input = $('#team-chat-input');
  const text = input.value.trim();
  if (!text) return;
  const session = getSession();
  getIncidentTeamChat(session.incidentNo).push(messageNow({ author: currentUser.name, initials: currentUser.initials, analystId: currentUser.id, text }));
  input.value = '';
  autoResize(input);
  closeMentionMenu();
  renderStage();
  showToast('チームチャットへ投稿しました。');
}

function sendMessage() { publishMessage({ askAi: true }); }

function createMockSessionId() { return `019${Date.now().toString(16).slice(-5)}-${Math.random().toString(16).slice(2,6)}-7${Math.random().toString(16).slice(2,5)}-8${Math.random().toString(16).slice(2,5)}-${Math.random().toString(16).slice(2,14).padEnd(12, '0')}`; }

document.addEventListener('click', (event) => {
  const mentionButton = event.target.closest('[data-mention-id]');
  if (mentionButton) { insertMention(mentionButton.dataset.mentionId); return; }
  const investigationPromptOption = event.target.closest('[data-investigation-prompt-key]');
  if (investigationPromptOption) { selectInvestigationPrompt(investigationPromptOption.dataset.investigationPromptKey); return; }
  const relatedIncident = event.target.closest('[data-related-incident-no]');
  if (relatedIncident) { state.relatedSelectionIncidentNo = relatedIncident.dataset.relatedIncidentNo; renderRelatedLinkResults(); return; }
  const searchSession = event.target.closest('[data-search-session-id]');
  if (searchSession) { selectSession(searchSession.dataset.searchSessionId); $('#search-dialog').close(); return; }
  const sessionButton = event.target.closest('[data-session-id]');
  if (sessionButton) { selectSession(sessionButton.dataset.sessionId); return; }
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) { state.filter = filterButton.dataset.filter; renderFilters(); renderSessionList(); return; }
  const tabButton = event.target.closest('[data-tab]');
  if (tabButton) { state.tab = tabButton.dataset.tab; renderStage(); return; }
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'open-search') openSearch();
  if (action === 'close-search') $('#search-dialog').close();
  if (action === 'clear-search') { $('#search-form').reset(); renderSearchResults(); $('#search-query').focus(); }
  if (action === 'open-title-edit') openTitleEditor();
  if (action === 'close-title-edit') $('#title-dialog').close();
  if (action === 'open-work-status') openWorkStatusDialog();
  if (action === 'close-work-status') $('#work-status-dialog').close();
  if (action === 'open-related-link') openRelatedLink();
  if (action === 'close-related-link') $('#related-dialog').close();
  if (action === 'open-alert-link') openAlertLink();
  if (action === 'close-alert-link') $('#alert-link-dialog').close();
  if (action === 'open-investigation-prompt') openInvestigationPrompt();
  if (action === 'close-investigation-prompt') $('#investigation-prompt-dialog').close();
  if (action === 'unlink-related') unlinkRelatedIncident(actionButton.dataset.relatedId);
  if (action === 'clear-filter') { state.filter = 'all'; renderFilters(); renderSessionList(); }
  if (action === 'toggle-panel') togglePanel();
  if (action === 'open-analyst-drawer') setAnalystDrawer(true);
  if (action === 'close-analyst-drawer') setAnalystDrawer(false);
  if (action === 'toggle-theme') toggleVisualTheme();
  if (action === 'open-new') { $('#new-incident-form').reset(); updateNewInvestigationReference(); $('#new-dialog').showModal(); requestAnimationFrame(() => $('#new-reference').focus()); }
  if (action === 'close-new') $('#new-dialog').close();
  if (action === 'open-settings') $('#settings-dialog').showModal();
  if (action === 'close-settings') $('#settings-dialog').close();
  if (action === 'notify') showToast('新しい通知はありません。');
  if (action === 'profile') showToast('プロフィールはMockでは変更できません。');
  if (action === 'session-menu') showToast('セッション操作は本Mockでは省略しています。');
  if (action === 'copy-incident') copyText(getSession().incidentNo, 'インシデント番号をコピーしました。');
  if (action === 'take-assignment') changeAssignee(currentUser.id);
  if (action === 'timeline-top') moveTimeline('top');
  if (action === 'timeline-latest') moveTimeline('latest');
  if (action === 'post-message') publishMessage({ askAi: false });
  if (action === 'message-action') showToast('選択した情報を調査コンテキストへ反映しました。');
  if (action === 'show-alert' || action === 'show-related' || action === 'show-file') showToast('詳細表示はMockでは省略しています。');
  if (action === 'attach') showToast('添付操作は本Mockでは表示のみです。');
});

$('#search-form').addEventListener('submit', (event) => { event.preventDefault(); renderSearchResults(); });
$('#search-query').addEventListener('input', renderSearchResults);
['search-status', 'search-analyst'].forEach((id) => $(`#${id}`).addEventListener('change', renderSearchResults));
$('#related-link-form').addEventListener('submit', (event) => { event.preventDefault(); addRelatedIncident(); });
$('#alert-link-form').addEventListener('submit', (event) => { event.preventDefault(); addAlertLink(); });
$('#investigation-prompt-form').addEventListener('submit', (event) => { event.preventDefault(); sendInvestigationPrompt(); });
$('#related-query').addEventListener('input', () => { state.relatedSelectionIncidentNo = null; renderRelatedLinkResults(); });
$('#new-reference').addEventListener('input', updateNewInvestigationReference);
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); } });
$('#content-stage').addEventListener('scroll', () => {
  const stage = $('#content-stage');
  const key = stage.dataset.timelineKey;
  if (!key) return;
  const atLatest = isAtTimelineLatest(stage);
  state.timelinePositions[key] = { top: stage.scrollTop, atLatest };
});
$('#message-input').addEventListener('input', (event) => autoResize(event.target));
$('#message-input').addEventListener('keydown', (event) => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); $('#composer').requestSubmit(); } });
$('#composer').addEventListener('submit', (event) => { event.preventDefault(); sendMessage(); });
$('#team-chat-input').addEventListener('input', (event) => { autoResize(event.target); renderMentionMenu(); });
$('#team-chat-input').addEventListener('compositionend', renderMentionMenu);
$('#team-chat-input').addEventListener('keydown', (event) => {
  if (event.isComposing) return;
  const menuIsOpen = !$('#mention-menu').hidden && state.mentionCandidates.length;
  if (menuIsOpen && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    state.mentionIndex = (state.mentionIndex + delta + state.mentionCandidates.length) % state.mentionCandidates.length;
    renderMentionMenuOptions();
    return;
  }
  if (menuIsOpen && ['Enter', 'Tab'].includes(event.key)) {
    event.preventDefault();
    insertMention(state.mentionCandidates[state.mentionIndex].id);
    return;
  }
  if (menuIsOpen && event.key === 'Escape') { event.preventDefault(); closeMentionMenu(); return; }
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); $('#team-chat-composer').requestSubmit(); }
});
$('#team-chat-composer').addEventListener('submit', (event) => { event.preventDefault(); publishTeamChat(); });
document.addEventListener('change', (event) => {
  if (event.target.id === 'assignee-select') { changeAssignee(event.target.value); return; }
  if (event.target.id !== 'status-select' || !isEditable()) return;
  const session = getSession();
  const previous = statuses[session.status].label;
  const next = statuses[event.target.value].label;
  if (session.status === event.target.value) return;
  session.status = event.target.value;
  session.messages.push(messageNow({ role: 'system', author: 'System', text: `ステータスを ${previous} から ${next} に変更しました。変更者: ${currentUser.name}` }));
  session.updatedAt = 'たった今';
  session.updatedFull = dateTimeNow();
  renderAll();
  showToast('ステータスを更新しました。');
});
$('#new-incident-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const reference = form.get('reference').trim();
  const details = externalReferenceDetails(reference);
  const product = form.get('product');
  const title = form.get('title').trim() || details.title || `${reference} の調査`;
  const incidentNo = details.isUrl ? generatedIncidentNo() : reference;
  const alerts = details.isUrl ? [{ level: 'Medium', name: title, product, source: '開始URL', url: details.url }] : [];
  const sourceNote = details.isUrl ? '入力されたアラートURLを保存し、製品・タイトルの情報を反映しました。' : `外部識別子 ${reference} を起点に調査を開始しました。`;
  const session = { sessionId: createMockSessionId(), incidentNo, externalReference: reference, sourceUrl: details.isUrl ? details.url : '', customer: form.get('customer'), title, severity: 'Medium', status: 'investigating', product, user: '未設定', host: '未設定', ip: '未設定', os: '未設定', analyst: currentUser.name, analystInitials: currentUser.initials, assigneeId: currentUser.id, updatedAt: 'たった今', createdAt: dateTimeNow(), updatedFull: dateTimeNow(), alertCount: alerts.length, files: [], alerts, messages: [messageNow({ role: 'system', author: 'System', text: `${sourceNote} 顧客／テナント: ${form.get('customer')}。開始者: ${currentUser.name}` }), messageNow({ role: 'ai', author: 'West Hawk', text: '新しい調査を開始しました。登録されたアラートリンクと対象情報をもとに、確認したい事実を入力してください。システム時刻を基準に調査記録へ追加します。' })] };
  sessions.unshift(session); state.selectedSessionId = session.sessionId; state.filter = 'all'; state.tab = 'conversation'; $('#new-dialog').close(); event.currentTarget.reset(); renderAll(); showToast('新しい調査セッションを開始しました。');
});

$('#edit-title-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!isEditable()) return;
  const title = new FormData(event.currentTarget).get('title').trim();
  if (!title) return;
  const session = getSession();
  if (session.title === title) { $('#title-dialog').close(); return; }
  const previousTitle = session.title;
  session.title = title;
  session.messages.push(messageNow({ role: 'system', author: 'System', text: `調査タイトルを「${previousTitle}」から「${title}」に変更しました。変更者: ${currentUser.name}` }));
  session.updatedAt = 'たった今';
  session.updatedFull = dateTimeNow();
  $('#title-dialog').close();
  renderAll();
  showToast('調査タイトルを更新しました。');
});

$('#work-status-form').addEventListener('submit', (event) => {
  event.preventDefault();
  analystWorkStatuses[currentUser.id] = $('#work-status-select').value;
  analystWorkLocations[currentUser.id] = $('#work-location-select').value;
  $('#work-status-dialog').close();
  renderAll();
  showToast(`勤務状況を更新しました（${workStatuses[analystWorkStatuses[currentUser.id]].label} / ${workLocations[analystWorkLocations[currentUser.id]].label}）。`);
});

renderIcons();
setVisualTheme('standard');
renderAll();
