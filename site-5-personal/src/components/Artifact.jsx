// По одной SVG-схеме на лист: schema, sync, perf, tokens. Все линии синие,
// красным отмечено только то, что изменилось.

const INK = 'oklch(0.215 0.055 262)'
const PRINT = 'oklch(0.3 0.13 264)'
const MID = 'oklch(0.47 0.03 258)'
const RED = 'oklch(0.52 0.2 30)'
const RED_INK = 'oklch(0.455 0.185 28)'
const FILL = 'oklch(0.3 0.13 264 / 0.08)'
const MONO = 'Overpass Mono, monospace'
const SANS = 'Overpass, sans-serif'

function Frame({ label, children, viewBox, alt }) {
  return (
    <figure>
      <figcaption className="mb-3 flex items-baseline gap-3">
        <span className="sheet-no text-red-ink">DET</span>
        <span className="font-drawn text-[0.85rem] font-semibold leading-snug text-ink">
          {label}
        </span>
      </figcaption>
      <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-label={alt}>
        {children}
      </svg>
    </figure>
  )
}

function Schema() {
  const blocks = [
    { x: 18, label: 'B1' },
    { x: 86, label: 'B2' },
    { x: 154, label: 'B3' },
    { x: 222, label: 'B4' },
  ]
  return (
    <Frame
      viewBox="0 0 300 150"
      label="Transaction routed to the owning block, not the root"
      alt="Diagram: a root document node connects down to four block sub-views labelled B1 to B4. A red arrow from an incoming remote keystroke bypasses the root and lands directly on block B3, which is highlighted. The root path is crossed out in red."
    >
      <rect x="102" y="14" width="96" height="26" fill={FILL} stroke={PRINT} strokeWidth="1.4" />
      <text x="150" y="31" textAnchor="middle" fill={INK} fontFamily={MONO} fontSize="11" fontWeight="600">
        rootView
      </text>
      <path d="M150 40 V62" stroke={PRINT} strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M138 46 L162 58 M162 46 L138 58" stroke={RED} strokeWidth="1.6" />

      <path d="M40 62 H262" stroke={PRINT} strokeWidth="1.2" />
      {blocks.map((b) => (
        <g key={b.label}>
          <path d={`M${b.x + 30} 62 V78`} stroke={PRINT} strokeWidth="1.2" />
          <rect
            x={b.x}
            y={78}
            width="60"
            height="30"
            fill={b.label === 'B3' ? 'oklch(0.52 0.2 30 / 0.14)' : FILL}
            stroke={b.label === 'B3' ? RED : PRINT}
            strokeWidth={b.label === 'B3' ? 1.8 : 1.3}
          />
          <text
            x={b.x + 30}
            y={97}
            textAnchor="middle"
            fill={b.label === 'B3' ? RED_INK : INK}
            fontFamily={MONO}
            fontSize="11"
            fontWeight="700"
          >
            {b.label}
          </text>
        </g>
      ))}

      <path
        d="M286 118 C270 118 258 104 244 96 L200 93"
        stroke={RED}
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M204 89 L194 93 L204 97" fill="none" stroke={RED} strokeWidth="1.6" />
      <text x="292" y="132" textAnchor="end" fill={RED_INK} fontFamily={MONO} fontSize="10" fontWeight="600">
        remote keystroke
      </text>
      <text x="292" y="144" textAnchor="end" fill={MID} fontFamily={MONO} fontSize="10">
        1.4 ms
      </text>
    </Frame>
  )
}

function Sync() {
  // Первая строка на 34, а не на 22: рамка значения рисуется от y-11 до y+8 и
  // на 22 налезала на заголовок и его линейку. Шаг 28 уводит последний
  // разделитель от сноски.
  const rows = [
    { y: 34, id: 'p1', a: 4, b: 4, out: 'ok' },
    { y: 62, id: 'p2', a: 7, b: 3, out: 'a' },
    { y: 90, id: 'p3', a: 2, b: 9, out: 'b' },
    { y: 118, id: 'p4', a: 5, b: 5, out: 'both' },
  ]
  return (
    <Frame
      viewBox="0 0 300 150"
      label="Lamport clock per paragraph, not per document"
      alt="Table diagram: four paragraphs p1 to p4, each with a local clock value and a remote clock value. Higher clock wins per paragraph. The last row, where both clocks equal 5, is marked in red as stacked, meaning both versions are kept and shown."
    >
      <text x="10" y="12" fill={MID} fontFamily={MONO} fontSize="9.5" fontWeight="600">PARA</text>
      <text x="76" y="12" fill={MID} fontFamily={MONO} fontSize="9.5" fontWeight="600">LOCAL</text>
      <text x="140" y="12" fill={MID} fontFamily={MONO} fontSize="9.5" fontWeight="600">REMOTE</text>
      <text x="212" y="12" fill={MID} fontFamily={MONO} fontSize="9.5" fontWeight="600">RESULT</text>
      <path d="M8 16 H292" stroke={PRINT} strokeWidth="1.2" />
      {rows.map((r) => {
        const stacked = r.out === 'both'
        return (
          <g key={r.id}>
            <text x="10" y={r.y + 4} fill={INK} fontFamily={MONO} fontSize="11" fontWeight="600">
              {r.id}
            </text>
            <rect x="74" y={r.y - 11} width="26" height="19" fill={FILL} stroke={PRINT} strokeWidth="1.1" />
            <text x="87" y={r.y + 3} textAnchor="middle" fill={INK} fontFamily={MONO} fontSize="11">
              {r.a}
            </text>
            <rect x="138" y={r.y - 11} width="26" height="19" fill={FILL} stroke={PRINT} strokeWidth="1.1" />
            <text x="151" y={r.y + 3} textAnchor="middle" fill={INK} fontFamily={MONO} fontSize="11">
              {r.b}
            </text>
            {/* Стрелка начинается с 178: заголовок REMOTE дотягивается до 176,
                и с 168 древко уходило под его последнюю букву. */}
            <path d={`M178 ${r.y - 2} H204`} stroke={stacked ? RED : PRINT} strokeWidth="1.2" />
            <path
              d={`M200 ${r.y - 6} L208 ${r.y - 2} L200 ${r.y + 2}`}
              fill="none"
              stroke={stacked ? RED : PRINT}
              strokeWidth="1.2"
            />
            <text
              x="212"
              y={r.y + 3}
              fill={stacked ? RED_INK : INK}
              fontFamily={MONO}
              fontSize="10"
              fontWeight={stacked ? 700 : 400}
            >
              {r.out === 'ok' ? 'no-op' : r.out === 'a' ? 'keep local' : r.out === 'b' ? 'keep remote' : 'STACK BOTH'}
            </text>
            <path d={`M8 ${r.y + 14} H292`} stroke={PRINT} strokeWidth="0.7" opacity="0.35" />
          </g>
        )
      })}
      <text x="292" y={142} textAnchor="end" fill={RED_INK} fontFamily={MONO} fontSize="9.5" fontWeight="600">
        tie → visible artifact, never a modal
      </text>
    </Frame>
  )
}

function Perf() {
  return (
    <Frame
      viewBox="0 0 300 150"
      label="Render target: 11,400 SVG nodes → one canvas"
      alt="Bar chart comparison: the SVG DOM approach shows 11,400 nodes and a 6.8 second time to first chart. The canvas in a worker approach shows 260 nodes and 390 milliseconds. The improvement bar is drawn in print blue and annotated in red."
    >
      {[
        { y: 24, label: 'SVG DOM', w: 268, t: '6.8 s', n: '11,400 nodes', red: true },
        { y: 84, label: 'CANVAS + WORKER', w: 15, t: '390 ms', n: '260 nodes', red: false },
      ].map((b) => (
        <g key={b.label}>
          <text x="8" y={b.y - 5} fill={INK} fontFamily={SANS} fontSize="11" fontWeight="700" letterSpacing="0.05em">
            {b.label}
          </text>
          <rect
            x="8"
            y={b.y}
            width={b.w}
            height="20"
            fill={b.red ? 'oklch(0.52 0.2 30 / 0.16)' : 'oklch(0.3 0.13 264 / 0.22)'}
            stroke={b.red ? RED : PRINT}
            strokeWidth="1.4"
          />
          <text
            x={b.red ? 268 : 30}
            y={b.y + 14}
            textAnchor={b.red ? 'end' : 'start'}
            fill={b.red ? RED_INK : PRINT}
            fontFamily={MONO}
            fontSize="11.5"
            fontWeight="700"
          >
            {b.t}
          </text>
          <text x="8" y={b.y + 34} fill={MID} fontFamily={MONO} fontSize="10">
            {b.n}
          </text>
        </g>
      ))}
      <path d="M8 128 H292" stroke={PRINT} strokeWidth="1" opacity="0.4" />
      <text x="8" y={142} fill={RED_INK} fontFamily={MONO} fontSize="9.5" fontWeight="600">
        cost: ?table=1 route exists because canvas has no a11y tree
      </text>
    </Frame>
  )
}

function Tokens() {
  const layers = [
    { y: 20, label: 'brand.theme.json', dead: true },
    { y: 48, label: 'semantic tokens', dead: true },
    { y: 76, label: '<Box spacing>', dead: true },
    { y: 108, label: '47 components, literal values', dead: false },
  ]
  return (
    <Frame
      viewBox="0 0 300 150"
      label="Three proposed indirection layers, all struck"
      alt="Diagram: three stacked proposed abstraction layers — brand theme JSON, semantic tokens, and a Box spacing component — each crossed out in red. Below them, one surviving layer: forty-seven components with literal values. A red note reads: second brand cost eleven days anyway."
    >
      {layers.map((l) => (
        <g key={l.label}>
          <rect
            x="14"
            y={l.y}
            width="272"
            height="22"
            fill={l.dead ? 'transparent' : FILL}
            stroke={l.dead ? RED : PRINT}
            strokeWidth={l.dead ? 1.2 : 1.8}
            strokeDasharray={l.dead ? '4 3' : undefined}
          />
          <text
            x="24"
            y={l.y + 15}
            fill={l.dead ? RED_INK : INK}
            fontFamily={MONO}
            fontSize="11"
            fontWeight={l.dead ? 400 : 700}
          >
            {l.label}
          </text>
          {l.dead && (
            <>
              <path d={`M14 ${l.y + 11} H286`} stroke={RED} strokeWidth="1.5" />
              <text x="278" y={l.y + 15} textAnchor="end" fill={RED_INK} fontFamily={MONO} fontSize="9.5" fontWeight="700">
                CUT
              </text>
            </>
          )}
        </g>
      ))}
      <text x="14" y={144} fill={RED_INK} fontFamily={MONO} fontSize="9.5" fontWeight="600">
        2nd brand still landed in 11 days
      </text>
    </Frame>
  )
}

const MAP = { schema: Schema, sync: Sync, perf: Perf, tokens: Tokens }

export default function Artifact({ kind }) {
  const C = MAP[kind]
  if (!C) return null
  return <C />
}
