// Проводки двойной записи: расход по счёту debit, встречный кредит всегда на
// 2100 (обязательство по карте). Суммы в центах целыми: на дробных накопленные
// итоги уплывают из-за float.

export const CARDHOLDERS = [
  { id: 'jra', name: 'J. Alvarez', dept: 'Engineering', last4: '4471' },
  { id: 'mch', name: 'M. Chen', dept: 'Revenue', last4: '2290' },
  { id: 'sos', name: 'S. Osei', dept: 'Design', last4: '8813' },
  { id: 'rko', name: 'R. Kowalski', dept: 'Operations', last4: '7742' },
  { id: 'pna', name: 'P. Nathan', dept: 'Finance', last4: '3106' },
]

// `state`: auth — авторизована, но не проведена; coded — присвоены счёт и
// центр затрат; posted — в журнале и в закрытии; held — заблокирована.
export const POSTINGS = [
  { merchant: 'Amazon Web Services', card: 'jra', cents: -421890, debit: '6410', account: 'Cloud infrastructure', cc: 'ENG-PLAT', rule: 'Vendor allowlist · Infra', state: 'posted', t: '09:04:12' },
  { merchant: 'Datadog', card: 'jra', cents: -189000, debit: '6410', account: 'Observability', cc: 'ENG-PLAT', rule: 'Vendor allowlist · Infra', state: 'posted', t: '09:11:47' },
  { merchant: 'Delta Air Lines', card: 'mch', cents: -61240, debit: '6720', account: 'Travel — air', cc: 'GTM-FIELD', rule: 'Trip #4402 · pre-approved', state: 'coded', t: '09:26:03' },
  { merchant: 'Hertz — SFO', card: 'mch', cents: -18455, debit: '6725', account: 'Travel — ground', cc: 'GTM-FIELD', rule: 'Trip #4402 · pre-approved', state: 'coded', t: '09:31:58' },
  { merchant: 'Figma', card: 'sos', cents: -13500, debit: '6310', account: 'Software — design', cc: 'PROD-DES', rule: 'Seat count matches roster', state: 'posted', t: '09:44:20' },
  { merchant: 'Ritz-Carlton Osaka', card: 'mch', cents: -142900, debit: '6730', account: 'Travel — lodging', cc: 'GTM-FIELD', rule: 'Nightly cap $420 exceeded', state: 'held', t: '10:02:41' },
  { merchant: 'AWS — vendor credit', card: 'jra', cents: 31800, debit: '6410', account: 'Cloud infrastructure', cc: 'ENG-PLAT', rule: 'Credit memo matched', state: 'posted', t: '10:15:09' },
  { merchant: 'WeWork Salesforce Tower', card: 'rko', cents: -240000, debit: '6110', account: 'Rent — coworking', cc: 'OPS-FAC', rule: 'Recurring · contract #881', state: 'posted', t: '10:33:52' },
  { merchant: 'Snowflake', card: 'jra', cents: -978400, debit: '6415', account: 'Data warehouse', cc: 'ENG-DATA', rule: 'Over $5k · CFO countersign', state: 'held', t: '10:51:17' },
  { merchant: 'Uber', card: 'sos', cents: -5820, debit: '6725', account: 'Travel — ground', cc: 'PROD-DES', rule: 'Under $75 · auto-coded', state: 'posted', t: '11:07:33' },
  { merchant: 'Gusto', card: 'pna', cents: -412600, debit: '6210', account: 'Payroll services', cc: 'FIN-OPS', rule: 'Recurring · contract #204', state: 'posted', t: '11:22:46' },
  { merchant: 'Slack', card: 'rko', cents: -96000, debit: '6320', account: 'Software — collab', cc: 'OPS-IT', rule: 'Seat count matches roster', state: 'posted', t: '11:39:04' },
  { merchant: 'Blue Bottle Coffee', card: 'sos', cents: -4210, debit: '6810', account: 'Meals — team', cc: 'PROD-DES', rule: 'Under $75 · auto-coded', state: 'coded', t: '11:52:29' },
  { merchant: 'GitHub', card: 'jra', cents: -21000, debit: '6310', account: 'Software — eng', cc: 'ENG-PLAT', rule: 'Seat count matches roster', state: 'posted', t: '12:08:15' },
  { merchant: 'Marriott Bonvoy', card: 'rko', cents: -54410, debit: '6730', account: 'Travel — lodging', cc: 'OPS-FAC', rule: 'Nightly cap $420 · ok', state: 'auth', t: '12:24:37' },
  { merchant: 'Card rebate — Q3', card: 'pna', cents: 14265, debit: '4910', account: 'Interchange rebate', cc: 'FIN-OPS', rule: 'Program rebate · 1.4%', state: 'posted', t: '12:41:58' },
  { merchant: 'Salesforce', card: 'mch', cents: -312000, debit: '6330', account: 'Software — CRM', cc: 'GTM-OPS', rule: 'Recurring · contract #519', state: 'posted', t: '12:58:11' },
  { merchant: 'Adobe', card: 'sos', cents: -7999, debit: '6310', account: 'Software — design', cc: 'PROD-DES', rule: 'Seat count matches roster', state: 'auth', t: '13:14:44' },
]

export const OPENING_CENTS = 28491237

export function formatUSD(cents, { sign = true } = {}) {
  const abs = Math.abs(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  if (!sign) return abs
  return cents < 0 ? `(${abs})` : abs
}

export function cardholder(id) {
  return CARDHOLDERS.find((c) => c.id === id) ?? CARDHOLDERS[0]
}
