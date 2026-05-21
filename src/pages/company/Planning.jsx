import CompanyHeader from '../../components/CompanyHeader'
import './Planning.css'
import bimImg from '../../assets/planning/planing&METRICS.png'

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const kpiCards = [
  { label: 'TOTAL CONTRACT VALUE',            value: 'XXXX', sub: null,  sub2: null },
  { label: 'TOTAL EXECUTED (ACCUMULATED)',     value: 'XXXX', sub: '0%',  sub2: null },
  { label: 'TOTAL BILLED (ACCUMULATED)',       value: 'XXXX', sub: '0%',  sub2: null },
  { label: 'PAYMENT CERTIFICATES ISSUED',     value: 'XXXX', sub: null,  sub2: null },
  { label: 'NEXT FORECAST CERTIFICATED',      value: 'XXXX', sub: null,  sub2: 'DATE' },
]

/*
  Timeline covers: Jul 2023 → Jun 2024  = 12 months
  Each month = 1 unit (0–11), so total width = 12 units.
  start/end are fractional month indices (0=Jul-2023, 12=Jul-2024).
*/
const ganttActivities = [
  {
    id: '3.1.1–3',
    label: 'EXCAVATION WORKS',
    pct: 54,
    segments: [
      { type: 'done',    start: 0,  end: 6  },  // Jul → Dec
    ],
  },
  {
    id: '3.1.5',
    label: 'TRANSPORT AND DISPOSAL',
    pct: 73,
    segments: [
      { type: 'done',    start: 0,  end: 6.5 },  // Jul → mid-Jan
    ],
  },
  {
    id: '3.3.1',
    label: 'CONCRETE WORKS',
    pct: 15.2,
    segments: [
      { type: 'done',    start: 3,  end: 4.5 },  // Oct → mid-Nov
      { type: 'planned', start: 4.5, end: 9 },   // mid-Nov → Apr
    ],
  },
  {
    id: '3.3.10',
    label: 'COLUMNS',
    pct: 28.6,
    segments: [
      { type: 'done',    start: 4,  end: 6.5 },  // Nov → mid-Jan
      { type: 'planned', start: 6.5, end: 9 },   // mid-Jan → Apr
    ],
  },
  {
    id: '3.3.11',
    label: 'WALLS AND CORES',
    pct: 42.1,
    segments: [
      { type: 'done',    start: 4,  end: 7.5 },  // Nov → mid-Feb
      { type: 'planned', start: 7.5, end: 10 },  // mid-Feb → May
    ],
  },
  {
    id: '3.3.4–5',
    label: 'ISOLATED FOOTINGS AND PILES',
    pct: 61.3,
    segments: [
      { type: 'planned', start: 5,  end: 10 },   // Dec → May
    ],
  },
  {
    id: '3.3.6–7',
    label: 'BEAMS AND LINTELS',
    pct: 36.8,
    segments: [
      { type: 'planned', start: 6,  end: 11 },   // Jan → Jun
    ],
  },
  {
    id: '3.3.8',
    label: 'RETAINING WALLS',
    pct: 5.0,
    segments: [
      { type: 'planned', start: 8,  end: 12 },   // Mar → Jun
    ],
  },
]

// Planned vs Actual
const pvActual = [
  { label: 'EXCAVATION WORKS',           complete: 54, planned: 54 },
  { label: 'TRANSPORT AND DISPOSAL',      complete: 73, planned: 73 },
  { label: 'CONCRETE WORKS',             complete: 15, planned: 20 },
  { label: 'COLUMNS',                    complete: 28, planned: 35 },
  { label: 'WALLS AND CORES',            complete: 42, planned: 45 },
  { label: 'ISOLATED FOOTINGS AND PILES',complete: 61, planned: 61 },
  { label: 'BEAMS AND LINTELS',          complete: 37, planned: 40 },
  { label: 'RETAINING WALLS',            complete: 5,  planned: 10 },
]

/* ── Timeline header data ───────────────────────────────────────────────────── */

// 12 months: Jul 2023 – Jun 2024
const months = ['JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB','MAR','APR','MAY','JUN']
// "Today" marker at ~month index 6.3 (early January 2024)
const TODAY_POS = 6.3 / 12 // fraction

/* ── BIM SVG (reused) ──────────────────────────────────────────────────────── */

function BimBuilding({ label = 'CONSTRUCTION PROGRESS' }) {
  return (
    <div className="bim-wrap">
      <div className="bim-label">{label}</div>
      <div className="bim-body">
        <img src={bimImg} alt="BIM Model – Construction Progress" className="bim-svg"/>

        <div className="bim-toolbar">
          {[
            { title: '3D View',    icon: '3D'                                    },
            { title: 'Layers',     icon: <i className="fi fi-rr-layers"/>         },
            { title: 'Edit',       icon: <i className="fi fi-rr-pencil"/>         },
            { title: 'Info',       icon: <i className="fi fi-rr-info"/>           },
            { title: 'Fullscreen', icon: <i className="fi fi-rr-expand"/>         },
          ].map((btn, i) => (
            <button key={i} className="bim-tool-btn" title={btn.title}>
              {btn.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="bim-legend">
        {[
          { color: '#4E8040', label: 'Completed' },
          { color: '#A0795A', label: 'In Progress' },
          { color: '#8AA070', label: 'Planned' },
          { color: '#C8D4C0', label: 'Not Started' },
        ].map(l => (
          <span key={l.label} className="bim-leg-item">
            <span className="bim-leg-dot" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function Planning() {
  return (
    <div className="pl-page">
      <CompanyHeader
        title="PLANNING & SCHEDULE"
        subtitle="Construction Planning and Progress Monitoring"
        showChapters={true}
      />

      <div className="pl-body">

        {/* ── KPI Summary Row ─────────────────────────────────────────────── */}
        <div className="pl-kpi-row">
          {kpiCards.map((k, i) => (
            <div key={i} className="card pl-kpi-card">
              <div className="pl-kpi-label">{k.label}</div>
              <div className="pl-kpi-value">{k.value}</div>
              {k.sub  && <div className="pl-kpi-sub">{k.sub}</div>}
              {k.sub2 && <div className="pl-kpi-date">{k.sub2}</div>}
            </div>
          ))}
        </div>

        {/* ── Schedule / Gantt ────────────────────────────────────────────── */}
        <div className="card">
          <div className="gantt-top-row">
            <div className="card-title" style={{ marginBottom: 0 }}>SCHEDULE</div>
            <div className="gantt-legend-row">
              <span className="gantt-leg-item"><span className="gantt-leg-dot gantt-dot--done"/>Completed</span>
              <span className="gantt-leg-item"><span className="gantt-leg-dot gantt-dot--ip"/>In Progress</span>
              <span className="gantt-leg-item"><span className="gantt-leg-dot gantt-dot--plan"/>Planned</span>
            </div>
          </div>

          <div className="gantt-wrap">
            {/* Activity label column header */}
            <div className="gantt-header">
              <div className="gantt-act-col gantt-th">ACTIVITY</div>
              <div className="gantt-timeline-col">
                {/* Year + quarter groups */}
                <div className="gantt-year-row">
                  <span className="gantt-year-label" style={{ width: `${(6/12)*100}%` }}>2023</span>
                  <span className="gantt-year-divider" />
                  <span className="gantt-year-label" style={{ width: `${(6/12)*100}%` }}>2024</span>
                </div>
                {/* Month ticks */}
                <div className="gantt-month-row" style={{ position: 'relative' }}>
                  {months.map((m, i) => (
                    <span key={i} className="gantt-month-tick"
                      style={{ left: `${(i / 12) * 100}%` }}>
                      {m}
                    </span>
                  ))}
                  {/* Today line header nub */}
                  <div className="gantt-today-head" style={{ left: `${TODAY_POS * 100}%` }}>
                    <span className="gantt-today-label">TODAY</span>
                  </div>
                </div>
              </div>
              <div className="gantt-pct-col gantt-th">%</div>
            </div>

            {/* Activity rows */}
            {ganttActivities.map((act, i) => (
              <div key={i} className="gantt-row">
                <div className="gantt-act-col">
                  <span className="gantt-act-id">{act.id}</span>
                  <span className="gantt-act-name">{act.label}</span>
                </div>
                <div className="gantt-timeline-col" style={{ position: 'relative' }}>
                  {/* Today vertical line */}
                  <div className="gantt-today-line" style={{ left: `${TODAY_POS * 100}%` }} />
                  {/* Segments */}
                  {act.segments.map((seg, j) => (
                    <div key={j}
                      className={`gantt-bar gantt-bar--${seg.type}`}
                      style={{
                        left:  `${(seg.start / 12) * 100}%`,
                        width: `${((seg.end - seg.start) / 12) * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="gantt-pct-col">
                  <span className="gantt-pct-val">{act.pct.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Activity Summary Cards ──────────────────────────────────────── */}
        <div className="pl-summary-row">
          <div className="card pl-summary-card">
            <div className="pl-sum-icon"><i className="fi fi-rr-clipboard"/></div>
            <div className="pl-sum-info">
              <div className="pl-sum-label">STARTED ACTIVITIES</div>
              <div className="pl-sum-value">24</div>
            </div>
          </div>
          <div className="card pl-summary-card">
            <div className="pl-sum-icon"><i className="fi fi-rr-clock"/></div>
            <div className="pl-sum-info">
              <div className="pl-sum-label">NON STARTED ACTIVITIES</div>
              <div className="pl-sum-value">8</div>
            </div>
          </div>
          <div className="card pl-summary-card">
            <div className="pl-sum-icon"><i className="fi fi-rr-calendar"/></div>
            <div className="pl-sum-info">
              <div className="pl-sum-label">DEVIATION (DAYS)</div>
              <div className="pl-sum-value">0.00</div>
              <div className="pl-sum-status">ON SCHEDULE</div>
            </div>
          </div>
        </div>

        {/* ── Bottom Two-Column ─────────────────────────────────────────── */}
        <div className="pl-bottom-cols">

          {/* Planned vs Actual */}
          <div className="card">
            <div className="card-title">PLANNED VS ACTUAL PROGRESS</div>

            <div className="pva-legend">
              <span className="pva-leg-item"><span className="pva-dot pva-dot--complete"/>% Complete</span>
              <span className="pva-leg-item"><span className="pva-dot pva-dot--planned"/>% Planned</span>
            </div>

            <div className="pva-chart">
              {pvActual.map((a, i) => (
                <div key={i} className="pva-row">
                  <div className="pva-label">{a.label}</div>
                  <div className="pva-bars">
                    {/* Planned bar (background) */}
                    <div className="pva-bar-track">
                      <div className="pva-bar pva-bar--planned" style={{ width: `${a.planned}%` }} />
                      <div className="pva-bar pva-bar--complete" style={{ width: `${a.complete}%` }} />
                    </div>
                    <div className="pva-vals">
                      <span className="pva-complete-val">{a.complete}%</span>
                      <span className="pva-planned-val">{a.planned}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pva-x-axis">
                {['0%','25%','50%','75%','100%'].map(t => (
                  <span key={t} className="pva-x-tick">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* BIM Model */}
          <div className="card">
            <div className="card-title">BIM MODEL – CONSTRUCTION PROGRESS</div>
            <BimBuilding label="CONSTRUCTION PROGRESS" />
          </div>

        </div>
      </div>
    </div>
  )
}
