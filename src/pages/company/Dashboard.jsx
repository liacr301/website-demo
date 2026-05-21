import './Dashboard.css'
import CompanyHeader from '../../components/CompanyHeader'

/* ─── DATA ──────────────────────────────────────────────────────── */

// Timeline columns: each object has an id, month label, year group, and
// a numeric "month index" (0=Sep25 … 13=Oct26) used to position bars.
const TL_COLS = [
  { id: 0, label: 'SEP', year: '2025' },
  { id: 1, label: 'OCT', year: '2025' },
  { id: 2, label: 'NOV', year: '2025' },
  { id: 3, label: 'DEC', year: '2025' },
  { id: 4, label: 'FEB', year: '2026' },
  { id: 5, label: 'MAR', year: '2026' },
  { id: 6, label: 'APR', year: '2026' },
  { id: 7, label: 'MAY', year: '2026' },
  { id: 8, label: 'JUN', year: '2026' },
  { id: 9, label: 'JUL', year: '2026' },
  { id: 10, label: 'AUG', year: '2026' },
  { id: 11, label: 'SEP', year: '2026' },
  { id: 12, label: 'OCT', year: '2026' },
]

// TODAY falls in MAY 2026 → col index 7
const TODAY_COL = 7

// bar: { col, span, variant }
// col = starting col index; span = how many columns wide; variant = css class
const SCHEDULE_ACTIVITIES = [
  {
    name: 'Design Freeze',
    baseline: '30-09-2025',
    rev01: '30-09-2025',
    bars: [{ col: 0, span: 1, variant: 'bar-gold' }],
  },
  {
    name: 'Dune Deck Shutdown',
    baseline: '20-10-2025',
    rev01: '22-10-2025',
    bars: [{ col: 1, span: 1, variant: 'bar-amber' }],
  },
  {
    name: 'Surf Cottages – commence construction',
    baseline: '22-10-2025',
    rev01: '03-12-2025',
    bars: [{ col: 1, span: 3, variant: 'bar-green' }],
  },
  {
    name: 'Dune Villas – commence construction',
    baseline: '22-10-2025',
    rev01: '12-12-2025',
    bars: [{ col: 1, span: 3, variant: 'bar-blue' }],
  },
  {
    name: 'Existing MC demobilised / vacated',
    baseline: '29-11-2025',
    rev01: '03-12-2025',
    bars: [{ col: 2, span: 2, variant: 'bar-amber' }],
  },
  {
    name: 'Construction team site office on site',
    baseline: '29-11-2025',
    rev01: '13-12-2025',
    bars: [{ col: 2, span: 2, variant: 'bar-gold' }],
  },
  {
    name: 'Golf Clubhouse Open to Public',
    baseline: '17-04-2025',
    rev01: '29-03-2026',
    bars: [{ col: 6, span: 1, variant: 'bar-green' }],
  },
  {
    name: 'Dune Deck Shutdown',
    baseline: '27-03-2026',
    rev01: '35-05-2026',
    bars: [{ col: 5, span: 3, variant: 'bar-amber' }],
  },
  {
    name: 'Surf Cottages – Power On',
    baseline: '29-05-2026',
    rev01: '28-07-2026',
    bars: [{ col: 8, span: 2, variant: 'bar-blue' }],
  },
  {
    name: 'Surf Cottages Pool Deck – PC',
    baseline: '17-07-2026',
    rev01: '31-07-2026',
    bars: [{ col: 9, span: 1, variant: 'bar-green' }],
  },
  {
    name: 'Dune Villas South infra completed',
    baseline: '29-07-2026',
    rev01: '29-07-2026',
    bars: [{ col: 9, span: 1, variant: 'bar-gold' }],
  },
  {
    name: 'Dune Deck Restaurant – Open to Public',
    baseline: '15-08-2026',
    rev01: '15-08-2026',
    bars: [{ col: 10, span: 1, variant: 'bar-amber' }],
  },
  {
    name: 'Surf Cottages – PC on Last Villa',
    baseline: '15-09-2026',
    rev01: '08-09-2026',
    bars: [{ col: 11, span: 1, variant: 'bar-green' }],
  },
  {
    name: 'Completion of construction to CMG',
    baseline: '15-09-2026',
    rev01: '08-09-2026',
    bars: [{ col: 11, span: 1, variant: 'bar-gold' }],
  },
]

const HIGHLIGHTS = [
  { tag: 'SURF COTTAGE (SC)', text: 'PÉRGOLAS SC 01 02 03', date: '22-05-2026' },
  { tag: 'DUNE VILLAS (DV)', text: 'ALUMINUM WORKS ON DV 08 10 12 14', date: '05-06-2026' },
  { tag: 'POOL DECK', text: 'PREPARATIONS TO START MASONRY WORKS ON SITE', date: '24-06-2026' },
  { tag: 'SURF COTTAGE (SC)', text: 'DECORATIVE BEAMS SUBSTRUCTURE SC 01 02 03', date: '24-06-2026' },
  { tag: 'INFRA', text: 'CALÇADA IN ROUNDABOUT 02', date: '15-05-2026' },
]

const LOOKAHEAD = [
  { tag: 'SURF COTTAGE', text: 'DV-95-4010 Millwork – Cabinetry and doors', date: '21-04-2026' },
  { tag: 'INFRA', text: 'DVS-80-8010 – Road Finishes Calçada inc Kerbs', date: '23-04-2026' },
  { tag: 'AWARD', text: 'Fireplace PACKAGE AWARD', date: '24-04-2026' },
  { tag: 'SURF COTTAGE', text: 'DVS-60-60xx MEP 2nd/3rd Fix', date: '24-04-2026' },
  { tag: 'INFRA', text: 'Connection to Pressure Line & Existing Mains South', date: '30-04-2026' },
  { tag: 'DUNE DECK', text: 'Dune Deck Restaurant Kitchen Extension', date: '05-05-2026' },
  { tag: 'DUNE VILLA', text: 'DVS-80-4060 Kitchens – Supply and Install', date: '09-05-2026' },
]

const DVS_COST = [
  { desc: 'Design / Technical',          committed: '792,450,000€',        committed2: '–',              forecast: '390,250,000€',        paid: '65,105,000€' },
  { desc: 'Design / Non-Technical',       committed: '148,900,000€',        committed2: '–',              forecast: '145,790,000€',        paid: '41,208,000€' },
  { desc: 'Administration',               committed: '222,110,000€',        committed2: '–',              forecast: '21,690,000€',         paid: '6,548,000€' },
  { desc: 'Construction Management',      committed: '25,612,340,000€',     committed2: '4,800,000€',     forecast: '4,279,780,000€',      paid: '–' },
  { desc: 'Construction',                 committed: '805,950,000€',        committed2: '848,210,000€',   forecast: '178,661,000€',        paid: '–' },
  { desc: 'FFE',                          committed: '2,600,000,000€',      committed2: '–',              forecast: '2,540,000,000€',      paid: '–' },
  { desc: 'Dune Deck Expansion',          committed: '1,640,000,000€',      committed2: '1,300,000,000€', forecast: '1,600,000,000€',      paid: '65,250,000€' },
  { desc: 'TOTAL',                        committed: '29,318,875,000€',     committed2: '9,500,000,000€', forecast: '38,119,280,000€',     paid: '4,711,910,000€', isTotal: true },
]

const RISKS = [
  {
    hazard:     'DELAY OF GOH WORKS, COMMISSIONING AND OPENING TO PUBLIC OF DUNE DECK',
    mitigation: 'Anticipate scope and resources allocation',
    level:      'high',
    newLevel:   'medium',
    owner:      'VP CONSTRUCTION – PEDRO CHAVES',
  },
  {
    hazard:     'IDENTIFICATIONS AND RESOLUTION OF ROOT CAUSES FOR THE NOT EXPECTED DELAYS',
    mitigation: 'Create vertical accountability structure',
    level:      'high',
    newLevel:   'medium',
    owner:      'PROJECT DIRECTOR – ANDRE FONSECA',
  },
  {
    hazard:     'NEED OF CORRECTIONS ON WORKS AS LEFT BY MOTA ENGIL',
    mitigation: 'Inspections on site per discipline',
    level:      'high',
    newLevel:   'high',
    owner:      'CONSTRUCTION MANAGER – LUIS BRANCO',
  },
  {
    hazard:     'LACK ON SUBCONTRACTOR CAPACITY TO FULFIL THE NEEDS OF PROJECT',
    mitigation: 'Fabrication site periodic visits',
    level:      'high',
    newLevel:   'high',
    owner:      'VP CONSTRUCTION',
  },
  {
    hazard:     'CHANGES ON DESIGN COMING FROM MEMBERS REQUESTS',
    mitigation: 'Design frozen – change control process',
    level:      'medium',
    newLevel:   'low',
    owner:      'VP DESIGN – FRANCISCA ALVES',
  },
]

const PROCUREMENT = [
  { pkg: 'MATERIAL SUPPLY PACKAGES',  rfpIssued: '13/13', rfpRet: '11/11', loa: '10/10' },
  { pkg: 'TRADE CONTRACTOR PACKAGES', rfpIssued: '16/16', rfpRet: '15/15', loa: '13/13' },
  { pkg: 'SITE LOGISTICS PACKAGES',   rfpIssued: '42/42', rfpRet: '40/41', loa: '39/40' },
]

const UTILITIES = [
  { name: 'Water',           status: 'Completed',    design: 100, material: 100, install: 100, commission: 100, remark: '–' },
  { name: 'Sewage',          status: 'In Progress',  design: 100, material: 90,  install: 75,  commission: 60,  remark: 'On track' },
  { name: 'Electricity',     status: 'In Progress',  design: 100, material: 90,  install: 70,  commission: 45,  remark: 'Delayed' },
  { name: 'Telecom',         status: 'In Progress',  design: 100, material: 70,  install: 45,  commission: 20,  remark: 'Delayed' },
  { name: 'Gas',             status: 'In Progress',  design: 100, material: 60,  install: 30,  commission: 0,   remark: 'To start' },
  { name: 'Irrigation',      status: 'In Progress',  design: 100, material: 60,  install: 30,  commission: 0,   remark: 'Monitor' },
  { name: 'Fire Protection', status: 'In Progress',  design: 100, material: 80,  install: 50,  commission: 40,  remark: 'Monitor' },
  { name: 'Stormwater',      status: 'In Progress',  design: 100, material: 80,  install: 60,  commission: 40,  remark: 'Monitor' },
]

const EQUIPMENT = [
  { icon: <i className="fi fi-rr-building"/>, label: 'Tower Cranes',   count: 2 },
  { icon: <i className="fi fi-rr-tractor"/>,  label: 'Excavators',     count: 4 },
  { icon: <i className="fi fi-rr-truck"/>,    label: 'Loaders',        count: 3 },
  { icon: <i className="fi fi-rr-wrench-simple"/>, label: 'Concrete Pumps', count: 2 },
  { icon: <i className="fi fi-rr-bus"/>,      label: 'Trucks',         count: 7 },
]

/* ─── HELPERS ───────────────────────────────────────────────────── */

function RiskBadge({ level }) {
  const cls = level === 'high' ? 'risk-high' : level === 'medium' ? 'risk-medium' : 'risk-low'
  const label = `RISK-${level.toUpperCase()}`
  return <span className={`risk-badge ${cls}`}>{label}</span>
}

function PctCell({ value }) {
  const cls =
    value === 100 ? 'pct-100' :
    value >= 75   ? 'pct-hi'  :
    value >= 40   ? 'pct-mid' :
    value > 0     ? 'pct-lo'  : 'pct-zero'
  return <span className={`util-pct ${cls}`}>{value}%</span>
}

function RemarkCell({ text }) {
  const cls =
    text === 'On track' ? 'remark-on-track' :
    text === 'Delayed'  ? 'remark-delayed'  :
    text === 'Monitor'  ? 'remark-monitor'  :
    text === 'To start' ? 'remark-tostart'  : ''
  return <span className={cls}>{text}</span>
}

/* ─── SVG S-CURVE ───────────────────────────────────────────────── */
function SCurve() {
  // 13 x-positions spread across 380px wide plot area (left=40, right=420)
  const W = 420, H = 160, padL = 40, padB = 24, padT = 10
  const plotW = W - padL - 4
  const plotH = H - padB - padT

  const xLabels = ['SEP','OCT','NOV','DEC','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT']
  const n = xLabels.length

  // sigmoid-like values 0→~85 for Planned
  const planned = [0, 2, 6, 12, 20, 32, 46, 58, 68, 76, 81, 84, 85]
  const actual   = [0, 1, 4, 10, 16, 28, 40, 52, 62, 71, 77, 80, 80]

  const xScale = i => padL + (i / (n - 1)) * plotW
  const yScale = v => padT + plotH - (v / 100) * plotH

  const toPath = pts =>
    pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`).join(' ')

  // today marker at col 7 (MAY)
  const todayX = xScale(7)

  return (
    <div className="scurve-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="scurve-svg" preserveAspectRatio="xMidYMid meet">
        {/* grid lines */}
        {[0,25,50,75,100].map(v => (
          <g key={v}>
            <line x1={padL} x2={W-4} y1={yScale(v)} y2={yScale(v)}
              stroke="rgba(44,34,24,0.08)" strokeWidth="0.5" />
            <text x={padL-3} y={yScale(v)+3} textAnchor="end" fill="#7A6E62"
              fontSize="6">{v}%</text>
          </g>
        ))}
        {/* x-axis labels */}
        {xLabels.map((l, i) => (
          <text key={i} x={xScale(i)} y={H-4} textAnchor="middle"
            fill="#7A6E62" fontSize="6">{l}</text>
        ))}
        {/* year group labels */}
        <text x={xScale(1.5)} y={H+2} textAnchor="middle" fill="rgba(122,110,98,0.55)" fontSize="5.5">2025</text>
        <text x={xScale(8)}   y={H+2} textAnchor="middle" fill="rgba(122,110,98,0.55)" fontSize="5.5">2026</text>

        {/* today line */}
        <line x1={todayX} x2={todayX} y1={padT} y2={H-padB}
          stroke="rgba(160,121,90,0.55)" strokeWidth="1" strokeDasharray="3,2" />
        <text x={todayX+2} y={padT+8} fill="#A0795A" fontSize="5.5" fontWeight="700">TODAY</text>

        {/* actual */}
        <path d={toPath(actual)} fill="none" stroke="#B87040" strokeWidth="1.5" />
        {/* planned */}
        <path d={toPath(planned)} fill="none" stroke="#4A6E9A" strokeWidth="1.5" strokeDasharray="4,2" />
      </svg>
      <div className="scurve-legend">
        <div className="legend-item">
          <div className="legend-line" style={{ background: '#4a8fc1', borderTop: '2px dashed #4a8fc1', backgroundColor: 'transparent' }} />
          Planned
        </div>
        <div className="legend-item">
          <div className="legend-line" style={{ background: '#e07b20' }} />
          Actual
        </div>
      </div>
    </div>
  )
}

/* ─── SVG DONUT ─────────────────────────────────────────────────── */
function Donut() {
  // 39% spent (gold), 14% commitments (amber), 47% remaining (grey)
  const cx = 55, cy = 55, r = 40, stroke = 14
  const circ = 2 * Math.PI * r

  const segments = [
    { pct: 39, color: '#A0795A' },
    { pct: 14, color: '#B87040' },
    { pct: 47, color: '#C8D4C0' },
  ]

  let offset = 0
  const arcs = segments.map(s => {
    const dash = (s.pct / 100) * circ
    const gap  = circ - dash
    const arc  = { ...s, dasharray: `${dash} ${gap}`, dashoffset: -offset * circ / 100 }
    offset += s.pct
    return arc
  })

  return (
    <div className="donut-wrap">
      <svg width="110" height="110" className="donut-svg">
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeDasharray={a.dasharray}
            strokeDashoffset={a.dashoffset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
        <text x={cx} y={cy-4} textAnchor="middle" fill="#A0795A" fontSize="13" fontWeight="700">39%</text>
        <text x={cx} y={cy+8} textAnchor="middle" fill="#7A6E62" fontSize="6">OF BUDGET</text>
      </svg>
      <div className="donut-legend">
        <div className="donut-legend-item"><div className="donut-legend-box" style={{ background: '#A0795A' }} /> Spent to Date 39%</div>
        <div className="donut-legend-item"><div className="donut-legend-box" style={{ background: '#B87040' }} /> Commitments 14%</div>
        <div className="donut-legend-item"><div className="donut-legend-box" style={{ background: '#C8D4C0' }} /> Remaining 47%</div>
      </div>
    </div>
  )
}

/* ─── MASTER SCHEDULE ───────────────────────────────────────────── */
function MasterSchedule() {
  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="panel-title">
        MASTER SCHEDULE (REFER TO S CURVE RECOVERY PLANNED VS ACTUAL BELOW)
      </p>
      <div className="schedule-table-wrap">
        <table className="schedule-table">
          <thead>
            <tr className="year-header">
              <th className="act-col" rowSpan={2}>ACTIVITY</th>
              <th colSpan={4}>2025</th>
              <th colSpan={9}>2026</th>
              <th rowSpan={2}>BASELINE DATE</th>
              <th rowSpan={2}>REV 01</th>
            </tr>
            <tr>
              {TL_COLS.map(c => (
                <th key={c.id} className={c.id === TODAY_COL ? 'today-marker' : ''}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE_ACTIVITIES.map((act, ai) => (
              <tr key={ai}>
                <td className="act-name">{act.name}</td>
                {TL_COLS.map(col => {
                  const bar = act.bars.find(b => b.col === col.id)
                  const isInBar = act.bars.some(b => col.id >= b.col && col.id < b.col + b.span)
                  const isStart = act.bars.some(b => b.col === col.id)
                  const barForSpan = act.bars.find(b => b.col === col.id)

                  if (isStart && barForSpan) {
                    return (
                      <td key={col.id} colSpan={barForSpan.span}
                        className={col.id === TODAY_COL ? 'today-col' : ''}>
                        <div className="timeline-grid">
                          <div className={`tl-bar ${barForSpan.variant}`}
                            style={{ width: '90%', left: '5%' }} />
                        </div>
                      </td>
                    )
                  }
                  if (isInBar) return null
                  return (
                    <td key={col.id} className={col.id === TODAY_COL ? 'today-col' : ''}>
                      <div className="timeline-grid" />
                    </td>
                  )
                })}
                <td className="date-cell">{act.baseline}</td>
                <td className="date-cell">{act.rev01}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── WEEKLY HIGHLIGHTS ─────────────────────────────────────────── */
function WeeklyHighlights() {
  return (
    <div className="panel panel-scroll">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <p className="panel-title" style={{ margin: 0 }}>WEEKLY HIGHLIGHTS</p>
        <span style={{ fontSize: 7, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          PLANNED DATE
        </span>
      </div>
      <div className="highlights-list">
        {HIGHLIGHTS.map((h, i) => (
          <div key={i} className="highlight-item">
            <div className="hi-text">
              <strong>{h.tag}</strong>
              {h.text}
            </div>
            <div className="hi-date">{h.date}</div>
          </div>
        ))}
      </div>

      <div className="lookahead-title">TWO WEEK LOOKAHEAD</div>
      <div className="highlights-list">
        {LOOKAHEAD.map((h, i) => (
          <div key={i} className="highlight-item lookahead-item">
            <div className="hi-text">
              <strong>{h.tag}</strong>
              {h.text}
            </div>
            <div className="hi-date">{h.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── DVS STATUS ────────────────────────────────────────────────── */
function DvsStatus() {
  return (
    <div className="panel">
      <div className="aerial-photo">
        <svg width="80" height="50" viewBox="0 0 80 50" style={{ position: 'absolute', opacity: 0.25 }}>
          {/* simplified aerial site sketch */}
          <rect x="5"  y="10" width="18" height="8"  fill="#5a9a3c" rx="1" />
          <rect x="26" y="10" width="18" height="8"  fill="#5a9a3c" rx="1" />
          <rect x="5"  y="22" width="12" height="8"  fill="#3a7a2c" rx="1" />
          <rect x="20" y="22" width="12" height="8"  fill="#3a7a2c" rx="1" />
          <rect x="35" y="22" width="12" height="8"  fill="#4a8a34" rx="1" />
          <rect x="50" y="10" width="25" height="15" fill="#2a5a1c" rx="1" />
          <path d="M5 35 Q40 30 75 38" stroke="#888" strokeWidth="1" fill="none" />
          <path d="M5 18 Q20 15 45 18" stroke="#666" strokeWidth="0.5" fill="none" />
        </svg>
        <span className="aerial-label">AERIAL VIEW</span>
      </div>

      <div className="status-row">
        <span className="status-label">DVS PROJECT STATUS</span>
        <span className="badge-green">GREEN</span>
      </div>
      <p className="revision-note">Business Revision last modified: 18 Apr</p>

      <table className="cost-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Committed</th>
            <th>Committed</th>
            <th>Forecast</th>
            <th>Paid to Date</th>
          </tr>
        </thead>
        <tbody>
          {DVS_COST.map((row, i) => (
            <tr key={i} className={row.isTotal ? 'total-row' : ''}>
              <td>{row.desc}</td>
              <td>{row.committed}</td>
              <td>{row.committed2}</td>
              <td>{row.forecast}</td>
              <td>{row.paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── TOP 7 RISKS ───────────────────────────────────────────────── */
function RisksTable() {
  return (
    <div className="panel">
      <p className="panel-title">TOP 7 RISKS</p>
      <table className="risks-table">
        <thead>
          <tr>
            <th style={{ width: '28%' }}>Hazard Description</th>
            <th style={{ width: '22%' }}>Mitigation Measures</th>
            <th>Risk Level</th>
            <th>New Forecasted Risk ↑</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {RISKS.map((r, i) => (
            <tr key={i}>
              <td>{r.hazard}</td>
              <td>{r.mitigation}</td>
              <td><RiskBadge level={r.level} /></td>
              <td><RiskBadge level={r.newLevel} /></td>
              <td className="owner-cell">{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── PROCUREMENT + HSSE ────────────────────────────────────────── */
function ProcurementHsse() {
  return (
    <div className="panel">
      <p className="panel-title">PROCUREMENT</p>
      <table className="procurement-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>RFP Issued</th>
            <th>RFP Returned</th>
            <th>LOA Issued</th>
          </tr>
        </thead>
        <tbody>
          {PROCUREMENT.map((p, i) => (
            <tr key={i}>
              <td>{p.pkg}</td>
              <td>{p.rfpIssued}</td>
              <td>{p.rfpRet}</td>
              <td>{p.loa}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="panel-title" style={{ marginTop: 10 }}>HSSE</p>
      <p className="hsse-header">
        04 PAR 2026 up to 10 APR 2026<br />
        CONTRACTOR: MGPEC
      </p>
      <div className="hsse-stat">
        <span className="hsse-stat-label">Number of manhours without accident</span>
        <span className="hsse-stat-value">174 352</span>
      </div>
      <div className="hsse-stat">
        <span className="hsse-stat-label">Number of workers onsite (daily avg)</span>
        <span className="hsse-stat-value">368</span>
      </div>
    </div>
  )
}

/* ─── COST PERFORMANCE ──────────────────────────────────────────── */
function CostPerformance() {
  return (
    <div className="panel">
      <p className="panel-title">COST PERFORMANCE</p>
      <div className="cost-perf-grid">
        <div className="cost-kpi">
          <div className="cost-kpi-label">Budget</div>
          <div className="cost-kpi-value accent">€21,450,000</div>
        </div>
        <div className="cost-kpi">
          <div className="cost-kpi-label">Spent to Date</div>
          <div className="cost-kpi-value">€8,460,320</div>
        </div>
        <div className="cost-kpi">
          <div className="cost-kpi-label">Commitments</div>
          <div className="cost-kpi-value">€8,125,680</div>
        </div>
        <div className="cost-kpi">
          <div className="cost-kpi-label">Forecast at Completion</div>
          <div className="cost-kpi-value">€21,980,000</div>
        </div>
      </div>
      <Donut />
    </div>
  )
}

/* ─── UTILITY TRACKER ───────────────────────────────────────────── */
function UtilityEquipment() {
  return (
    <div className="utility-equipment-row">
      {/* Utility Tracker */}
      <div className="panel">
        <p className="panel-title">UTILITY TRACKER</p>
        <p className="utility-note">
          2026/04/14 · RUI EZEQUIEL · FROM THE GLOBAL UTILITY TRACKER
        </p>
        <table className="utility-table">
          <thead>
            <tr>
              <th>Utility</th>
              <th>Status</th>
              <th>Design</th>
              <th>Material</th>
              <th>Install</th>
              <th>Commission</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {UTILITIES.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>
                  <span className={`status-badge ${u.status === 'Completed' ? 'status-completed' : 'status-progress'}`}>
                    {u.status}
                  </span>
                </td>
                <td><PctCell value={u.design} /></td>
                <td><PctCell value={u.material} /></td>
                <td><PctCell value={u.install} /></td>
                <td><PctCell value={u.commission} /></td>
                <td><RemarkCell text={u.remark} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Equipment on Site */}
      <div className="panel">
        <p className="panel-title">EQUIPMENT ON SITE</p>
        <div className="equipment-list">
          {EQUIPMENT.map((e, i) => (
            <div key={i} className="equip-item">
              <div className="equip-label">
                <span className="equip-icon">{e.icon}</span>
                {e.label}
              </div>
              <span className="equip-count">{e.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <CompanyHeader
        title="DASHBOARD"
        subtitle="Weekly Dashboard Report"
        showChapters={true}
      />

      <div className="report-card">
        {/* TOP ROW */}
        <div className="dashboard-row row-top">
          <MasterSchedule />
          <WeeklyHighlights />
          <DvsStatus />
        </div>

        {/* MIDDLE ROW */}
        <div className="dashboard-row row-middle">
          <div className="panel">
            <p className="panel-title">SCHEDULE S CURVE — PLANNED VS ACTUAL</p>
            <SCurve />
          </div>
          <RisksTable />
          <ProcurementHsse />
        </div>

        {/* BOTTOM ROW */}
        <div className="dashboard-row row-bottom">
          <CostPerformance />
          <UtilityEquipment />
        </div>
      </div>
    </div>
  )
}
