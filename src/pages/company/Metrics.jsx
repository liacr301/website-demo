import CompanyHeader from '../../components/CompanyHeader'
import './Metrics.css'
import bimImg from '../../assets/planning/WhatsApp Image 2026-05-20 at 16.44.50.jpeg'

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const kpiCards = [
  { label: 'TOTAL CONTRACT VALUE',            value: 'XXXX',  sub: null,  sub2: null },
  { label: 'TOTAL EXECUTED (ACCUMULATED)',     value: 'XXXX',  sub: '0%',  sub2: null },
  { label: 'TOTAL BILLED (ACCUMULATED)',       value: 'XXXX',  sub: '0%',  sub2: null },
  { label: 'PAYMENT CERTIFICATES ISSUED',     value: 'XXXX',  sub: null,  sub2: null },
  { label: 'NEXT FORECAST CERTIFICATED',      value: 'XXXX',  sub: null,  sub2: 'DATE' },
]

// executed %, inProgress %, balance % (negative = over-run → shown in red)
const chapters = [
  { label: '3.1 EARTHWORKS',    ex: 22.36, ip: 8.64,  bal: 69.00, over: false },
  { label: '3.2 STRUCTURES',    ex: 95.20, ip: 4.80,  bal: 0,     over: false },
  { label: '3.3 MASONRY',       ex: 63.00, ip: 0,     bal: 37.00, over: false },
  { label: '3.4 ROOFING',       ex: 96.00, ip: 0,     bal: 3.90,  over: true  },
  { label: '3.5 FINISHES',      ex: 85.71, ip: 14.29, bal: 0,     over: false },
  { label: '3.6 INSTALLATIONS', ex: 93.18, ip: 6.82,  bal: 0,     over: false },
  { label: '3.7 FINAL WORKS',   ex: 30.00, ip: 45.00, bal: 25.00, over: false },
]

const subchapters = [
  { icon: <i className="fi fi-rr-wrench"/>,   label: 'EXCAVATION AND EARTHWORKS', pct: 91.77 },
  { icon: <i className="fi fi-rr-truck"/>,    label: 'EARTH MOVEMENT',            pct: 85.97 },
  { icon: <i className="fi fi-rr-building"/>, label: 'CONCRETE WORKS',            pct: 88.05 },
  { icon: <i className="fi fi-rr-apps"/>,     label: 'MISCELLANEOUS',             pct: 100.00 },
  { icon: <i className="fi fi-rr-cube"/>,     label: 'STEEL STRUCTURE',           pct: 100.00 },
]

const certificates = [
  { num: 1, date: 'APR 10, 2024', amount: '€6,250,000',  accum: '€6,250,000',  pct: 6.58  },
  { num: 2, date: 'APR 25, 2024', amount: '€7,850,000',  accum: '€14,100,000', pct: 14.84 },
  { num: 3, date: 'MAY 10, 2024', amount: '€9,120,000',  accum: '€23,220,000', pct: 24.44 },
  { num: 4, date: 'MAY 25, 2024', amount: '€10,150,000', accum: '€33,370,000', pct: 35.05 },
  { num: 5, date: 'JUN 10, 2024', amount: '€4,280,000',  accum: '€37,650,000', pct: 39.55 },
  { num: 6, date: 'JUL 10, 2024', amount: '—',           accum: '—',           pct: null  },
]

/* ─── BIM SVG ───────────────────────────────────────────────────────────────── */

function BimBuilding({ label = 'PHYSICAL EXECUTION' }) {
  return (
    <div className="bim-wrap">
      <div className="bim-label">{label}</div>
      <div className="bim-body">
        <img src={bimImg} alt="BIM Model – Physical Execution" className="bim-svg"/>

        {/* Right toolbar */}
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

      {/* Legend */}
      <div className="bim-legend">
        {[
          { color: '#4E8040', label: 'Executed' },
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

export default function Metrics() {
  return (
    <div className="mx-page">
      <CompanyHeader
        title="METRICS & EXECUTION"
        subtitle="Quantity Tracking and Payment Certificates"
        showChapters={true}
      />

      <div className="mx-body">

        {/* ── KPI Summary Row ─────────────────────────────────────────────── */}
        <div className="mx-kpi-row">
          {kpiCards.map((k, i) => (
            <div key={i} className="card mx-kpi-card">
              <div className="mx-kpi-label">{k.label}</div>
              <div className="mx-kpi-value">{k.value}</div>
              {k.sub  && <div className="mx-kpi-sub">{k.sub}</div>}
              {k.sub2 && <div className="mx-kpi-date">{k.sub2}</div>}
            </div>
          ))}
        </div>

        {/* ── Two-Column Layout ────────────────────────────────────────────── */}
        <div className="mx-cols">

          {/* LEFT ── */}
          <div className="mx-col-left">

            {/* Execution by Chapter */}
            <div className="card">
              <div className="card-title">EXECUTION BY CHAPTER</div>

              <div className="ch-legend">
                <span className="ch-leg-item"><span className="ch-dot ch-dot--ex"/>EXECUTED (EUR)</span>
                <span className="ch-leg-item"><span className="ch-dot ch-dot--ip"/>IN PROGRESS (EUR)</span>
                <span className="ch-leg-item"><span className="ch-dot ch-dot--bal"/>BALANCE (EUR)</span>
              </div>

              <div className="ch-chart">
                {chapters.map((c, i) => (
                  <div key={i} className="ch-row">
                    <div className="ch-row-label">{c.label}</div>
                    <div className="ch-bar-track">
                      <div className="ch-seg ch-seg--ex"  style={{ width: `${c.ex}%` }} />
                      <div className="ch-seg ch-seg--ip"  style={{ width: `${c.ip}%` }} />
                      <div
                        className={`ch-seg ${c.over ? 'ch-seg--over' : 'ch-seg--bal'}`}
                        style={{ width: `${c.bal}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="ch-x-axis">
                  {['0%','20%','40%','60%','80%','100%'].map(t => (
                    <span key={t} className="ch-x-tick">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Economic Execution by Subchapter */}
            <div className="card">
              <div className="card-title">ECONOMIC EXECUTION BY SUBCHAPTER</div>

              <div className="sub-table">
                <div className="sub-header">
                  <span className="sub-col-label">SUBCHAPTER</span>
                  <span className="sub-col-pct">EXECUTION (%)</span>
                </div>
                {subchapters.map((s, i) => (
                  <div key={i} className="sub-row">
                    <span className="sub-row-icon">{s.icon}</span>
                    <span className="sub-row-label">{s.label}</span>
                    <div className="sub-bar-wrap">
                      <div className="sub-bar-track">
                        <div className="sub-bar-fill" style={{ width: `${s.pct}%` }} />
                      </div>
                      <span className="sub-bar-pct">{s.pct.toFixed(2)}%</span>
                    </div>
                  </div>
                ))}
                <div className="sub-x-axis">
                  {['0%','50%','100%'].map(t => (
                    <span key={t} className="sub-x-tick">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>{/* /col-left */}

          {/* RIGHT ── */}
          <div className="mx-col-right">

            {/* Payment Certificates */}
            <div className="card">
              <div className="cert-header">
                <div className="card-title" style={{ marginBottom: 0 }}>PAYMENT CERTIFICATES</div>
                <button className="btn mx-export-btn">EXPORT TO EXCEL</button>
              </div>

              <div className="cert-table-wrap">
                <table className="cert-table">
                  <thead>
                    <tr>
                      <th>CERTIFICATE #</th>
                      <th>ISSUE DATE</th>
                      <th>AMOUNT (EXCL. VAT)</th>
                      <th>ACCUMULATED (EXCL. VAT)</th>
                      <th>% EXECUTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((c, i) => (
                      <tr key={i}>
                        <td className="cert-num">#{c.num}</td>
                        <td>{c.date}</td>
                        <td className="cert-amount">{c.amount}</td>
                        <td className="cert-amount">{c.accum}</td>
                        <td>
                          {c.pct !== null ? (
                            <div className="cert-pct-cell">
                              <div className="progress-bar cert-bar">
                                <div
                                  className="progress-bar-fill cert-bar-fill"
                                  style={{ width: `${c.pct}%` }}
                                />
                              </div>
                              <span className="cert-pct-val">{c.pct.toFixed(2)}%</span>
                            </div>
                          ) : (
                            <span className="cert-dash">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BIM Model */}
            <div className="card">
              <div className="card-title">BIM MODEL – PHYSICAL EXECUTION</div>
              <BimBuilding label="PHYSICAL EXECUTION" />
            </div>

          </div>{/* /col-right */}
        </div>{/* /cols */}
      </div>
    </div>
  )
}
