// Содержимое сайта. Компании, продукты и заголовки выдуманы, но числа и
// технические детали согласованы между листами: один и тот же бюджет p95, один
// стек, повторяющиеся оценки.

export const IDENTITY = {
  name: 'Mara Solden',
  discipline: 'Product & frontend engineering',
  years: 12,
  location: 'Asheville, North Carolina',
  email: 'mara@solden.works',
  github: 'github.com/marasolden',
  stamp: 'SR. PRODUCT ENGINEER',
  license: 'NC · remote · UTC−5',
  premise:
    'This page is a submittal, not a pitch. Each sheet is one decision I made, the constraint that forced it, the number it moved, and what it cost. The red marks are mine — the parts I got wrong the first time, left in, because a set with no corrections on it is a set nobody checked.',
  cover:
    'I build the front half of software products: the editor, the empty state, the render path, the thing that has to still work on a 2019 Android on hotel wifi.',
  discipline_note:
    'Twelve years, four of them managing, which I stopped doing because I was worse at it than the people I hired.',
}

// Листы работ: у каждого решение и ограничение, которое к нему привело.

export const SHEETS = [
  {
    id: 'A-101',
    slug: 'waypost-editor',
    project: 'Waypost',
    title: 'Roadmap-as-document editor',
    role: 'Lead product engineer',
    span: '2024 — present',
    scale: 'Team of 6 · 40k MAU · self-serve',
    stack: ['TypeScript', 'React 19', 'ProseMirror', 'Yjs', 'Postgres', 'Fly.io'],
    governs:
      'A planning doc for a 30-person org hits ~14k nodes. ProseMirror re-renders the whole doc tree on every remote transaction, and Yjs delivers one transaction per keystroke per collaborator.',
    decision:
      'I stopped treating the document as one editor. The doc is split into block-level ProseMirror sub-views with their own plugin state, and Yjs awareness updates are routed to the sub-view that owns the affected block instead of the root. A remote keystroke now dirties one block, not 14k nodes.',
    numbers: [
      { metric: 'p95 keystroke → paint, 8 live cursors', from: '210 ms', to: '16 ms' },
      { metric: 'Main-thread work per remote transaction', from: '38 ms', to: '1.4 ms' },
      { metric: 'Doc ceiling before the tab dies', from: '~4k nodes', to: '~60k nodes' },
    ],
    cost:
      'Cross-block selection had to be rebuilt by hand, and it is still worse than a single editor at drag-selecting across a page boundary. I accepted that: people select inside one block 96% of the time (we measured), and nobody has ever filed the bug.',
    redline: {
      wrong:
        'My first version virtualised the doc — render only blocks in the viewport.',
      why: 'Ctrl+F broke. Print broke. Screen readers announced a 3-block document. I had optimised the metric I was measuring and destroyed three things I was not.',
      fix: 'Everything renders; only the *editable* view is per-block. Virtualisation stayed dead.',
    },
    artifact: 'schema',
  },
  {
    id: 'A-204',
    slug: 'longhand-sync',
    project: 'Longhand',
    title: 'Offline-first draft sync',
    role: 'Founding engineer',
    span: '2022 — 2023',
    scale: '2 engineers · 9k paying writers',
    stack: ['TypeScript', 'IndexedDB', 'CRDT (custom)', 'Cloudflare Workers', 'R2'],
    governs:
      "Writers draft on planes, in basements, and on trains through the Alps. The app had to be honest about being offline for six hours and then reconcile without ever showing a merge dialog, because a writer who is shown a merge dialog closes the app and doesn't come back.",
    decision:
      'Last-writer-wins per paragraph, not per document, with a monotonic Lamport clock on each paragraph id. Two people editing different paragraphs of the same essay never conflict. Two people editing the same paragraph produce both versions, stacked, with the loser collapsed under a one-line disclosure — a visible artifact instead of a modal.',
    numbers: [
      { metric: 'Merge dialogs shown to users', from: '1 per 40 sessions', to: '0' },
      { metric: 'Cold-start to typeable, no network', from: '2.4 s', to: '310 ms' },
      { metric: 'Sync payload, 6-hour offline session', from: '1.9 MB', to: '41 KB' },
    ],
    cost:
      'It is not a real CRDT. Concurrent edits to one paragraph lose character-level intent — you get two paragraphs, not an interleave. For prose that is fine and arguably better. For code or a spreadsheet it would be wrong, and I would not ship this design there.',
    redline: {
      wrong: 'I built a full RGA sequence CRDT first. It took nine weeks.',
      why: 'Tombstones grew unboundedly on documents that were edited for a year. A 40k-word novel carried 6 MB of deleted-character metadata. I had solved a problem two of nine thousand users had.',
      fix: 'Deleted the CRDT. Paragraph-granular LWW shipped in four days and has never been the reason for a support ticket.',
    },
    artifact: 'sync',
  },
  {
    id: 'A-330',
    slug: 'fieldglass-dashboard',
    project: 'Fieldglass',
    title: 'Monitoring dashboard nobody opened',
    role: 'Senior engineer, contract',
    span: '2021',
    scale: '3 infra teams · 220 engineers',
    stack: ['React', 'Canvas 2D', 'Web Workers', 'Prometheus', 'Go'],
    governs:
      'Three infra teams had each quietly stopped using the dashboard. Not because it was ugly — because the p50 load was 6.8 seconds and an on-call engineer will not wait 6.8 seconds. They were all curling Prometheus directly.',
    decision:
      'I killed the SVG chart library and rendered 40 sparklines to a single Canvas element in a Web Worker via OffscreenCanvas, then made the default view answer exactly one question — "is anything on fire right now" — with everything else behind a keystroke.',
    numbers: [
      { metric: 'p50 time-to-first-chart', from: '6.8 s', to: '390 ms' },
      { metric: 'DOM nodes on the default view', from: '11,400', to: '260' },
      { metric: 'Weekly actives across the 3 teams', from: '9', to: '147' },
    ],
    cost:
      'Canvas charts are not selectable, not in the accessibility tree, and not printable. I shipped a parallel `?table=1` route that renders the same series as a real HTML table with a caption and scope attributes. Two people use it. One of them is blind, so it was not optional.',
    redline: {
      wrong:
        'I first assumed the problem was information density and designed a cleaner, sparser dashboard.',
      why: 'I redesigned for six weeks before I ran a single timing. The sparse version was still 6-plus seconds, and adoption did not move at all. The problem was never the layout.',
      fix: 'Measure before you redesign. I now refuse to take a "redesign this" brief without a number attached to it.',
    },
    artifact: 'perf',
  },
  {
    id: 'A-418',
    slug: 'tidepool-system',
    project: 'Tidepool',
    title: 'Component library, 47 components, no theming',
    role: 'Design systems lead',
    span: '2019 — 2021',
    scale: '5 product teams · 12 surfaces',
    stack: ['TypeScript', 'CSS custom properties', 'Radix primitives', 'Storybook'],
    governs:
      'The org wanted a themeable system supporting four brands. We had four brands on paper and one in production, and every themeable system I had worked in before had collapsed under the weight of its own token indirection.',
    decision:
      'I shipped 47 components with hard-coded values and exactly zero theme layer, and wrote the reason into the README so nobody had to relitigate it in a Slack thread. When the second brand actually arrived, in 2023, adding it took one engineer eleven days.',
    numbers: [
      { metric: 'Components shipped in year one', from: '0', to: '47' },
      { metric: 'Token indirection layers', from: '3 (proposed)', to: '0 (shipped)' },
      { metric: 'Cost of the second brand, when it was real', from: 'estimated 1 quarter', to: '11 days' },
    ],
    cost:
      'I was wrong in public for two years. Every quarter someone re-opened the theming argument and I had to defend a decision that looked like laziness until the day it looked like foresight. That is a real cost and I would pay it again.',
    redline: {
      wrong:
        'I did add one abstraction: a `<Box>` component with a spacing prop scale.',
      why: 'Within a year there were 190 usages, each one a slightly different way to write a div, and no two engineers agreed which prop won. It was a styling language with no spec.',
      fix: 'Deleted `<Box>` in a single 2,100-line PR. Nobody has asked for it back. Now: if a component has no behaviour, it should not be a component.',
    },
    artifact: 'tokens',
  },
]

// Журнал изменений: какие оценки поменялись и из-за чего.

export const REVISIONS = [
  {
    rev: '05',
    date: '2026-03',
    dateLabel: 'Mar 2026',
    held: 'Every interaction should be undoable.',
    now: 'Most should be un-*needed*. Undo is the apology; the click you did not have to make is the fix.',
    trigger: 'Watching six Waypost users use undo as a navigation key.',
  },
  {
    rev: '04',
    date: '2025-11',
    dateLabel: 'Nov 2025',
    held: 'Ship fast, iterate.',
    now: 'Ship narrow. Speed came from cutting scope, never from moving quicker, and I spent four years confusing the two.',
    trigger: 'Longhand shipped in four days after nine weeks of the wrong thing.',
  },
  {
    rev: '03',
    date: '2025-06',
    dateLabel: 'Jun 2025',
    held: 'Code review is about the code.',
    now: 'Code review is where a team writes down what it believes. The diff is the excuse.',
    trigger: 'Realising my most useful review comments were all questions.',
  },
  {
    rev: '02',
    date: '2024-08',
    dateLabel: 'Aug 2024',
    held: 'Accessibility is a late pass.',
    now: 'It is a constraint on the architecture. Canvas charts taught me that the hard way — you cannot retrofit a render target.',
    trigger: 'Fieldglass. A blind SRE who could not use the thing I was proud of.',
  },
  {
    rev: '01',
    date: '2023-02',
    dateLabel: 'Feb 2023',
    held: 'Good abstractions pay for themselves.',
    now: 'Good abstractions pay for themselves *after* the second real use case. Before that they are a guess with a maintenance contract.',
    trigger: 'Deleting `<Box>`.',
  },
]

// Листинг кода. t: k=ключевое слово, s=строка, n=число, c=комментарий,
// f=функция, p=обычный текст, r=правка.

export const SPECIMEN = {
  file: 'src/editor/route-transaction.ts',
  note: 'The whole Waypost decision, in the twelve lines that matter.',
  lines: [
    [['// A remote keystroke used to dirty the root view. Now it dirties one block.', 'c']],
    [['export', 'k'], [' ', 'p'], ['function', 'k'], [' ', 'p'], ['routeTransaction', 'f'], ['(tr: Transaction, doc: DocIndex) {', 'p']],
    [['  ', 'p'], ['const', 'k'], [' blockId = doc.', 'p'], ['ownerOf', 'f'], ['(tr.', 'p'], ['from', 'p'], [')', 'p']],
    [],
    [['  ', 'p'], ['// Bail before React hears about it. This line is the whole perf win.', 'c']],
    [['  ', 'p'], ['if', 'k'], [' (blockId === ', 'p'], ['null', 'k'], [') ', 'p'], ['return', 'k'], [' ', 'p'], ['ROOT', 'n']],
    [],
    [['  ', 'p'], ['const', 'k'], [' view = views.', 'p'], ['get', 'f'], ['(blockId)', 'p']],
    [['  ', 'p'], ['if', 'k'], [' (!view) ', 'p'], ['return', 'k'], [' ', 'p'], ['ROOT', 'n'], ['  ', 'p'], ['// not mounted: fall back, correctly', 'c']],
    [],
    [['  view.', 'p'], ['dispatch', 'f'], ['(tr)', 'p'], ['              ', 'p'], ['// 1.4ms, not 38ms', 'c']],
    [['  ', 'p'], ['return', 'k'], [' blockId', 'p']],
    [['}', 'p']],
  ],
  mark: {
    at: 5,
    text:
      'This early-return is the entire optimisation. Everything else is bookkeeping. I wrote 900 lines around it before I understood that.',
  },
}

// Исключения из объёма работ: то, за что автор не берётся.

export const EXCLUSIONS = [
  {
    label: 'Native mobile',
    detail:
      'I have shipped one React Native app and it was mediocre. If your product lives or dies on iOS gesture feel, hire someone who thinks in UIKit.',
  },
  {
    label: 'Data engineering',
    detail:
      'I can write a window function. I cannot design your warehouse, and I have watched a frontend engineer try.',
  },
  {
    label: 'Managing people',
    detail:
      'Did it for four years, was worse at it than the people I hired. I am useful to a manager, not as one.',
  },
  {
    label: 'Design from a blank page',
    detail:
      'Give me a constraint and I will find the shape. Give me a mood board and I will build you something competent and forgettable.',
  },
]

// Инструменты, сделанные для себя.

export const TOOLS = [
  {
    name: 'why',
    line: 'A 90-line CLI that greps `git log -S` for a token and prints the commit that introduced it, with the PR body.',
    use: 'Run maybe eight times a week. It has answered "who decided this and why" more times than any wiki I have worked in.',
  },
  {
    name: 'budget',
    line: 'CI check that fails the build if the route bundle grows more than 4 KB gzip without a note in the PR body.',
    use: 'Caught a 210 KB moment-with-locales import twice. The note requirement matters more than the number.',
  },
  {
    name: 'oncall-quiet',
    line: 'Rewrites my own alert rules to suppress anything that has fired more than three times without an action taken.',
    use: 'Deleted 40% of my pages in one month. None of them were real.',
  },
]

export const CONTACT = {
  headline: 'Reviewer comments welcome.',
  body:
    'If something on this page is wrong, or you disagree with a decision on one of the sheets, that is the most interesting email you could send me. Second most interesting: a constraint you are stuck behind.',
  links: [
    { label: 'Email', detail: 'mara@solden.works', href: 'mailto:mara@solden.works' },
    { label: 'Code', detail: 'github.com/marasolden', href: 'https://github.com/marasolden' },
    { label: 'Revisions', detail: 'Notes, when a belief changes', href: '#revisions' },
  ],
}
