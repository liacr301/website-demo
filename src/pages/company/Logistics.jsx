import { useState } from 'react'
import CompanyHeader from '../../components/CompanyHeader'
import './Logistics.css'

const kpis = [
  { icon: <i className="fi fi-rr-box"/>,           label: 'MATERIAL PACKAGES',      value: '48',    trend: '↑ +5 vs last month',  trendUp: true  },
  { icon: <i className="fi fi-rr-helmet-safety"/>, label: 'SUBCONTRACTORS STARTED', value: '12/28', trend: '↑ +2 vs last month',  trendUp: true  },
  { icon: <i className="fi fi-rr-users"/>,         label: 'WORKFORCE ON SITE',      value: '368',   trend: '↑ +28 vs last month', trendUp: true  },
  { icon: <i className="fi fi-rr-truck"/>,         label: 'DELIVERIES ON TIME',     value: '92%',   trend: '↓ -3% vs last month', trendUp: false },
]

// materialStatus colors
const STATUS_COLORS = {
  'On Track':    '#4E8040',
  'In Progress': '#A0795A',
  'Completed':   '#4E8040',
  'Not Started': 'rgba(44,34,24,0.20)',
  'Delivered':   '#4A6E9A',
  'Delayed':     '#9A3030',
}

const packages = [
  {
    name: 'CONCRETE & MASONRY',   pkg: 'PKG-01', matStatus: 'On Track',    delivery: 78,
    plannedStart: '20 APR 2026',  actualStart: '18 APR 2026', subStatus: 'Started',
    wfPlanned: 45, wfActual: 48, wfVariance: 3,
  },
  {
    name: 'STRUCTURAL STEEL',      pkg: 'PKG-02', matStatus: 'In Progress', delivery: 62,
    plannedStart: '05 MAY 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 32, wfActual: 0,  wfVariance: -32,
  },
  {
    name: 'REINFORCEMENT STEEL',   pkg: 'PKG-03', matStatus: 'Delivered',   delivery: 100,
    plannedStart: '10 APR 2026',  actualStart: '08 APR 2026', subStatus: 'Completed',
    wfPlanned: 20, wfActual: 22, wfVariance: 2,
  },
  {
    name: 'WINDOWS & DOORS',       pkg: 'PKG-04', matStatus: 'In Progress', delivery: 45,
    plannedStart: '15 JUN 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 18, wfActual: 0,  wfVariance: -18,
  },
  {
    name: 'ELECTRICAL SYSTEMS',    pkg: 'PKG-05', matStatus: 'On Track',    delivery: 70,
    plannedStart: '01 MAY 2026',  actualStart: '30 APR 2026', subStatus: 'Started',
    wfPlanned: 28, wfActual: 26, wfVariance: -2,
  },
  {
    name: 'PLUMBING SYSTEMS',      pkg: 'PKG-06', matStatus: 'On Track',    delivery: 66,
    plannedStart: '10 MAY 2026',  actualStart: '09 MAY 2026', subStatus: 'Started',
    wfPlanned: 24, wfActual: 21, wfVariance: -3,
  },
  {
    name: 'HVAC SYSTEMS',          pkg: 'PKG-07', matStatus: 'In Progress', delivery: 40,
    plannedStart: '20 JUN 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 26, wfActual: 0,  wfVariance: -26,
  },
  {
    name: 'INSULATION & WATERPROOFING', pkg: 'PKG-08', matStatus: 'On Track', delivery: 58,
    plannedStart: '25 MAY 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 16, wfActual: 0,  wfVariance: -16,
  },
  {
    name: 'FINISHES & TILES',      pkg: 'PKG-09', matStatus: 'On Track',    delivery: 30,
    plannedStart: '15 JUL 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 30, wfActual: 0,  wfVariance: -30,
  },
  {
    name: 'PAINTING',              pkg: 'PKG-10', matStatus: 'On Track',    delivery: 20,
    plannedStart: '01 AUG 2026',  actualStart: '–',           subStatus: 'Not Started',
    wfPlanned: 15, wfActual: 0,  wfVariance: -15,
  },
]

const statusLegend = [
  { label: 'Completed',   color: '#4E8040',               solid: true  },
  { label: 'On Track',    color: '#4E8040',               solid: true  },
  { label: 'In Progress', color: '#A0795A',               solid: true  },
  { label: 'Delayed',     color: '#9A3030',               solid: true  },
  { label: 'Not Started', color: 'rgba(44,34,24,0.18)',   solid: false },
]

const docTypeTabs = [
  { icon: <i className="fi fi-rr-folder"/>,   label: 'All Documents',     count: 86 },
  { icon: <i className="fi fi-rr-truck-moving"/>, label: 'Delivery Notes',    count: 18 },
  { icon: <i className="fi fi-rr-check"/>,    label: 'Material Approvals',count: 14 },
  { icon: <i className="fi fi-rr-clipboard"/>,label: 'Packing Lists',     count: 12 },
  { icon: <i className="fi fi-rr-pen-nib"/>,  label: 'Method Statements', count: 10 },
  { icon: <i className="fi fi-rr-map"/>,      label: 'Logistics Plans',   count: 8  },
  { icon: <i className="fi fi-rr-id-badge"/>, label: 'Permits',           count: 6  },
]

const documents = [
  { name: 'PKG-01_Concrete_Delivery_Schedule.pdf', pkg: 'PKG-01', type: 'Delivery Schedule',  supplier: 'Betão Sul',    date: '26 APR 2026', size: '1.2 MB',  status: 'On Track'    },
  { name: 'PKG-02_Steel_Packing_List.xlsx',        pkg: 'PKG-02', type: 'Packing List',        supplier: 'Aços Modernos',date: '25 APR 2026', size: '850 KB', status: 'In Progress' },
  { name: 'PKG-03_Rebar_Material_Approval.pdf',    pkg: 'PKG-03', type: 'Material Approval',   supplier: 'Armat Steel',  date: '24 APR 2026', size: '1.1 MB',  status: 'Completed'   },
  { name: 'PKG-04_Windows_Method_Statement.docx',  pkg: 'PKG-04', type: 'Method Statement',    supplier: 'AluPlus',      date: '24 APR 2026', size: '620 KB',  status: 'Not Started' },
  { name: 'PKG-05_Electrical_Logistics_Plan.pdf',  pkg: 'PKG-05', type: 'Logistics Plan',      supplier: 'VoltPrime',    date: '23 APR 2026', size: '2.3 MB',  status: 'On Track'    },
  { name: 'PKG-06_Plumbing_Delivery_Note.xlsx',    pkg: 'PKG-06', type: 'Delivery Note',       supplier: 'HidroTec',     date: '23 APR 2026', size: '540 KB',  status: 'On Track'    },
  { name: 'PKG-07_HVAC_Equipment_List.pdf',        pkg: 'PKG-07', type: 'Equipment List',      supplier: 'ClimaControl', date: '22 APR 2026', size: '1.7 MB',  status: 'In Progress' },
  { name: 'Site_Logistics_Plan_Overall.pdf',       pkg: '–',      type: 'Logistics Plan',      supplier: 'Costaterra',   date: '20 APR 2026', size: '3.4 MB',  status: 'On Track'    },
]

const fileExt = (name) => {
  const m = name.match(/\.(\w+)$/)
  return m ? m[1].toUpperCase() : 'FILE'
}
const fileTypeColor = { PDF: '#c0392b', XLSX: '#1e7e44', DOCX: '#2563c9' }

export default function Logistics() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState(null)

  return (
    <div className="logistics-page">
      <CompanyHeader
        title="LOGISTICS"
        subtitle="Track Construction Progress Through Real Images"
        showChapters={false}
      />

      {/* KPI row */}
      <div className="log-kpi-grid">
        {kpis.map((k) => (
          <div className="log-kpi-card card" key={k.label}>
            <span className="log-kpi-icon">{k.icon}</span>
            <div className="log-kpi-body">
              <div className="log-kpi-label">{k.label}</div>
              <div className="log-kpi-value">{k.value}</div>
              <div className={`log-kpi-trend ${k.trendUp ? 'trend-up' : 'trend-down'}`}>{k.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="log-two-col">

        {/* LEFT — Logistics Status */}
        <div className="card log-left">
          <div className="card-title">LOGISTICS STATUS</div>

          <div className="log-table-wrapper">
            <table className="log-table">
              <thead>
                <tr>
                  <th rowSpan={2} className="log-th-pkg">PACKAGE</th>
                  <th colSpan={2} className="log-th-group">MATERIAL STATUS</th>
                  <th colSpan={3} className="log-th-group">SUBCONTRACTOR START</th>
                  <th colSpan={3} className="log-th-group">WORKFORCE</th>
                </tr>
                <tr>
                  <th>STATUS</th>
                  <th>DELIVERY PROGRESS</th>
                  <th>PLANNED START</th>
                  <th>ACTUAL START</th>
                  <th>STATUS</th>
                  <th>PLANNED</th>
                  <th>ACTUAL</th>
                  <th>VARIANCE</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p.pkg}>
                    <td>
                      <div className="log-pkg-name">{p.name}</div>
                      <div className="log-pkg-id">{p.pkg}</div>
                    </td>
                    <td>
                      <span
                        className="log-status-badge"
                        style={{
                          background: STATUS_COLORS[p.matStatus] ?? '#555',
                          color: p.matStatus === 'Not Started' ? 'rgba(255,255,255,0.6)' : '#fff',
                        }}
                      >
                        {p.matStatus}
                      </span>
                    </td>
                    <td>
                      <div className="log-bar-cell">
                        <div className="progress-bar log-progress">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${p.delivery}%` }}
                          />
                        </div>
                        <span>{p.delivery}%</span>
                      </div>
                    </td>
                    <td className="log-muted">{p.plannedStart}</td>
                    <td className="log-muted">{p.actualStart}</td>
                    <td>
                      <span
                        className="log-status-badge"
                        style={{
                          background: STATUS_COLORS[p.subStatus] ?? '#555',
                          color: p.subStatus === 'Not Started' ? 'rgba(255,255,255,0.6)' : '#fff',
                        }}
                      >
                        {p.subStatus}
                      </span>
                    </td>
                    <td className="log-num">{p.wfPlanned}</td>
                    <td className="log-num">{p.wfActual}</td>
                    <td
                      className="log-num log-variance"
                      style={{ color: p.wfVariance >= 0 ? '#5a9a38' : '#c94a4a' }}
                    >
                      {p.wfVariance > 0 ? `+${p.wfVariance}` : p.wfVariance}
                    </td>
                  </tr>
                ))}
                <tr className="log-total-row">
                  <td><strong>TOTAL</strong></td>
                  <td />
                  <td>
                    <div className="log-bar-cell">
                      <div className="progress-bar log-progress">
                        <div className="progress-bar-fill" style={{ width: '55%' }} />
                      </div>
                      <strong>55%</strong>
                    </div>
                  </td>
                  <td /><td /><td />
                  <td className="log-num"><strong>254</strong></td>
                  <td className="log-num"><strong>117</strong></td>
                  <td className="log-num log-variance" style={{ color: '#c94a4a' }}><strong>-137</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="log-legend">
            {statusLegend.map((l) => (
              <div className="log-legend-item" key={l.label}>
                <span
                  className="log-legend-dot"
                  style={{
                    background: l.solid ? l.color : 'transparent',
                    border: l.solid ? 'none' : '1px solid rgba(255,255,255,0.4)',
                  }}
                />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Logistics Documents */}
        <div className="card log-right">
          <div className="log-right-header">
            <span className="card-title">LOGISTICS DOCUMENTS</span>
            <button className="btn btn-accent">⬆ UPLOAD DOCUMENT</button>
          </div>

          {/* Search row */}
          <div className="filter-bar log-search-row">
            <div className="search-wrapper">
              <input
                className="search-input"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="log-filter-row">
            <div className="filter-group">
              <label className="filter-label">CATEGORY</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <div className="filter-group">
              <label className="filter-label">TYPE</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <div className="filter-group">
              <label className="filter-label">DATE RANGE</label>
              <input type="date" className="filter-select" />
            </div>
            <div className="filter-group">
              <label className="filter-label">STATUS</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <div className="filter-group">
              <label className="filter-label">CONTRACTOR / SUPPLIER</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <button className="btn btn-accent log-apply-btn">APPLY FILTERS</button>
            <button className="btn btn-ghost log-apply-btn" onClick={() => setSearch('')}>CLEAR FILTERS</button>
          </div>

          {/* Doc type tabs */}
          <div className="log-type-tabs">
            {docTypeTabs.map((t) => (
              <button
                key={t.label}
                className={`log-type-tab${activeTab === t.label ? ' active' : ''}`}
                onClick={() => setActiveTab(activeTab === t.label ? null : t.label)}
              >
                <span className="log-tab-icon">{t.icon}</span>
                <span className="log-tab-label">{t.label}</span>
                <span className="log-tab-count">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Documents table */}
          <div className="log-doc-table-wrapper">
            <table className="log-table log-doc-table">
              <thead>
                <tr>
                  <th>DOCUMENT NAME</th>
                  <th>PACKAGE</th>
                  <th>TYPE</th>
                  <th>CONTRACTOR / SUPPLIER</th>
                  <th>DATE</th>
                  <th>SIZE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {documents
                  .filter((d) =>
                    !search || d.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((d) => {
                    const ext = fileExt(d.name)
                    return (
                      <tr key={d.name}>
                        <td>
                          <div className="log-doc-name-cell">
                            <span
                              className="log-file-badge"
                              style={{ background: fileTypeColor[ext] ?? '#555' }}
                            >
                              {ext}
                            </span>
                            <span className="log-doc-name">{d.name}</span>
                          </div>
                        </td>
                        <td className="log-muted">{d.pkg}</td>
                        <td className="log-muted">{d.type}</td>
                        <td className="log-muted">{d.supplier}</td>
                        <td className="log-muted">{d.date}</td>
                        <td className="log-muted">{d.size}</td>
                        <td>
                          <span
                            className="log-status-badge"
                            style={{
                              background: STATUS_COLORS[d.status] ?? '#555',
                              color: d.status === 'Not Started' ? 'rgba(255,255,255,0.6)' : '#fff',
                            }}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td>
                          <div className="log-actions">
                            <button className="log-action-btn" title="Download"><i className="fi fi-rr-download"/></button>
                            <button className="log-action-btn" title="More options">⋯</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
          <div className="log-doc-footer">
            <span className="log-muted">Showing 1 to 8 of 86 documents</span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="log-muted">...</span>
              <button className="page-btn">11</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
