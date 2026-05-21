import { useState } from 'react'
import CompanyHeader from '../../components/CompanyHeader'
import './Procurement.css'

const kpis = [
  { icon: <i className="fi fi-rr-box"/>,          label: 'ACTIVE PACKAGES',      value: '68',           trend: '↑ +6 vs last month',   trendUp: true },
  { icon: <i className="fi fi-rr-euro"/>,         label: 'TOTAL CONTRACT VALUE', value: '€28,118,750',  trend: '↑ +8.4% vs last month', trendUp: true },
  { icon: <i className="fi fi-rr-clock"/>,        label: 'PENDING AWARDS',        value: '12',           trend: '↓ -2 vs last month',   trendUp: false },
  { icon: <i className="fi fi-rr-check-circle"/>, label: 'EXECUTED CONTRACTS',    value: '24',           trend: '↑ +4 vs last month',   trendUp: true },
]

const contractors = [
  { abbr: 'MGPEC',   color: '#6b7a3a', name: 'MGPEC',          role: 'Main Contractor',       budget: '€12,500,000', contract: '€11,800,000', planned: 65, actual: 58, remain: 42 },
  { abbr: 'MEP',     color: '#4a7ab5', name: 'MEP Solutions',   role: 'MEP Contractor',        budget: '€3,200,000',  contract: '€2,950,000',  planned: 40, actual: 36, remain: 64 },
  { abbr: 'STONE',   color: '#7a7a7a', name: 'StoneWorks',      role: 'Stone & Cladding',      budget: '€1,400,000',  contract: '€1,180,000',  planned: 80, actual: 72, remain: 28 },
  { abbr: 'GLASS',   color: '#3a8a7a', name: 'Glass Systems',   role: 'Glass & Metal Works',   budget: '€1,850,000',  contract: '€1,675,000',  planned: 55, actual: 50, remain: 50 },
  { abbr: 'WOOD',    color: '#7a4a2a', name: 'WoodCraft',       role: 'Carpentry & Joinery',   budget: '€1,250,000',  contract: '€1,125,000',  planned: 60, actual: 45, remain: 55 },
  { abbr: 'PAINT',   color: '#3a7a3a', name: 'PaintPro',        role: 'Painting Works',        budget: '€680,000',    contract: '€610,000',    planned: 30, actual: 28, remain: 72 },
  { abbr: 'ELECTRA', color: '#b5a020', name: 'Electra Plus',    role: 'Electrical Works',      budget: '€900,000',    contract: '€810,000',    planned: 35, actual: 30, remain: 70 },
  { abbr: 'WATER',   color: '#20a0b5', name: 'WaterTech',       role: 'Plumbing & Irrigation', budget: '€550,000',    contract: '€495,000',    planned: 25, actual: 20, remain: 80 },
  { abbr: 'LAND',    color: '#1a5a2a', name: 'GreenScape',      role: 'Landscaping',           budget: '€985,000',    contract: '€910,000',    planned: 70, actual: 62, remain: 38 },
  { abbr: 'SECURE',  color: '#b56020', name: 'SecureSys',       role: 'Security Systems',      budget: '€300,000',    contract: '€270,000',    planned: 20, actual: 18, remain: 82 },
]

const docTypeTabs = [
  { icon: <i className="fi fi-rr-file"/>,          label: 'Contracts',           count: 18 },
  { icon: <i className="fi fi-rr-clipboard"/>,     label: 'RFQs',                count: 12 },
  { icon: <i className="fi fi-rr-shopping-cart"/>, label: 'Purchase Orders',     count: 15 },
  { icon: <i className="fi fi-rr-box"/>,           label: 'Procurement Packages',count: 11 },
  { icon: <i className="fi fi-rr-handshake"/>,     label: 'Supplier Agreements', count: 8  },
  { icon: <i className="fi fi-rr-wrench-simple"/>, label: 'Technical Submittals',count: 9  },
  { icon: <i className="fi fi-rr-check"/>,         label: 'Material Approvals',  count: 5  },
]

const documents = [
  { name: 'Main Contract – MGPEC.pdf',           category: 'Contracts',             type: 'PDF',  party: 'MGPEC',          date: '25 APR 2026', size: '2.4 MB'  },
  { name: 'MEP Solutions – Contract.pdf',        category: 'Contracts',             type: 'PDF',  party: 'MEP Solutions',  date: '22 APR 2026', size: '1.8 MB'  },
  { name: 'Procurement Tracking.xlsx',           category: 'Procurement Packages',  type: 'XLSX', party: 'All Packages',   date: '20 APR 2026', size: '450 KB'  },
  { name: 'RFQ – Glass Systems.docx',            category: 'RFQs',                  type: 'DOCX', party: 'Glass Systems',  date: '18 APR 2026', size: '320 KB'  },
  { name: 'StoneWorks – Agreement.pdf',          category: 'Supplier Agreements',   type: 'PDF',  party: 'StoneWorks',     date: '15 APR 2026', size: '1.2 MB'  },
  { name: 'PO-0456 – PaintPro.pdf',             category: 'Purchase Orders',       type: 'PDF',  party: 'PaintPro',       date: '12 APR 2026', size: '780 KB'  },
  { name: 'Technical Submittal – Electra Plus.pdf', category: 'Technical Submittals', type: 'PDF', party: 'Electra Plus',  date: '10 APR 2026', size: '1.1 MB'  },
  { name: 'Material Approval – Tiles.pdf',       category: 'Material Approvals',    type: 'PDF',  party: 'StoneWorks',     date: '08 APR 2026', size: '540 KB'  },
]

const fileTypeColor = { PDF: '#c0392b', XLSX: '#1e7e44', DOCX: '#2563c9' }

export default function Procurement() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState(null)

  return (
    <div className="procurement-page">
      <CompanyHeader title="PROCUREMENT" subtitle="CONTRACT MANAGEMENT" showChapters={false} />

      {/* KPI row */}
      <div className="proc-kpi-grid">
        {kpis.map((k) => (
          <div className="proc-kpi-card card" key={k.label}>
            <span className="proc-kpi-icon">{k.icon}</span>
            <div className="proc-kpi-body">
              <div className="proc-kpi-label">{k.label}</div>
              <div className="proc-kpi-value">{k.value}</div>
              <div className={`proc-kpi-trend ${k.trendUp ? 'trend-up' : 'trend-down'}`}>{k.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="proc-two-col">

        {/* LEFT — Contract Status */}
        <div className="card proc-left">
          <div className="card-title">CONTRACT STATUS</div>
          <div className="proc-table-wrapper">
            <table className="proc-table">
              <thead>
                <tr>
                  <th>CONTRACTOR</th>
                  <th>BUDGET</th>
                  <th>CONTRACT</th>
                  <th>PLANNED (%)</th>
                  <th>ACTUAL (%)</th>
                  <th>REMAIN (%)</th>
                </tr>
              </thead>
              <tbody>
                {contractors.map((c) => (
                  <tr key={c.abbr}>
                    <td>
                      <div className="proc-contractor-cell">
                        <span className="proc-badge" style={{ background: c.color }}>{c.abbr}</span>
                        <div>
                          <div className="proc-contractor-name">{c.name}</div>
                          <div className="proc-contractor-role">{c.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="proc-money">{c.budget}</td>
                    <td className="proc-money">{c.contract}</td>
                    <td>
                      <div className="proc-bar-cell">
                        <div className="progress-bar proc-progress">
                          <div className="progress-bar-fill" style={{ width: `${c.planned}%` }} />
                        </div>
                        <span>{c.planned}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="proc-bar-cell">
                        <div className="progress-bar proc-progress">
                          <div className="progress-bar-fill" style={{ width: `${c.actual}%` }} />
                        </div>
                        <span>{c.actual}%</span>
                      </div>
                    </td>
                    <td className="proc-remain">{c.remain}%</td>
                  </tr>
                ))}
                <tr className="proc-total-row">
                  <td><strong>TOTAL</strong></td>
                  <td className="proc-money"><strong>€23,615,000</strong></td>
                  <td className="proc-money"><strong>€21,825,000</strong></td>
                  <td>
                    <div className="proc-bar-cell">
                      <div className="progress-bar proc-progress">
                        <div className="progress-bar-fill" style={{ width: '53%' }} />
                      </div>
                      <strong>53%</strong>
                    </div>
                  </td>
                  <td>
                    <div className="proc-bar-cell">
                      <div className="progress-bar proc-progress">
                        <div className="progress-bar-fill" style={{ width: '47%' }} />
                      </div>
                      <strong>47%</strong>
                    </div>
                  </td>
                  <td className="proc-remain"><strong>53%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="proc-table-note">ⓘ Percentages are calculated based on contract value.</div>
        </div>

        {/* RIGHT — Procurement Documents */}
        <div className="card proc-right">
          <div className="proc-right-header">
            <span className="card-title">PROCUREMENT DOCUMENTS</span>
            <button className="btn btn-accent"><i className="fi fi-rr-upload"/> UPLOAD DOCUMENT</button>
          </div>

          {/* Search row */}
          <div className="filter-bar proc-search-row">
            <div className="search-wrapper">
              <input
                className="search-input"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter row */}
          <div className="proc-filter-row">
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
              <label className="filter-label">PACKAGE</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <div className="filter-group">
              <label className="filter-label">CONTRACTOR</label>
              <select className="filter-select"><option>All</option></select>
            </div>
            <button className="btn btn-accent proc-apply-btn">APPLY FILTERS</button>
            <button className="btn btn-ghost proc-apply-btn" onClick={() => setSearch('')}>CLEAR FILTERS</button>
          </div>

          {/* Doc type tabs */}
          <div className="proc-type-tabs">
            {docTypeTabs.map((t) => (
              <button
                key={t.label}
                className={`proc-type-tab${activeTab === t.label ? ' active' : ''}`}
                onClick={() => setActiveTab(activeTab === t.label ? null : t.label)}
              >
                <span className="proc-tab-icon">{t.icon}</span>
                <span className="proc-tab-label">{t.label}</span>
                <span className="proc-tab-count">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Documents table */}
          <div className="proc-doc-table-wrapper">
            <table className="proc-table proc-doc-table">
              <thead>
                <tr>
                  <th>DOCUMENT NAME</th>
                  <th>CATEGORY</th>
                  <th>TYPE</th>
                  <th>CONTRACTOR / PACKAGE</th>
                  <th>DATE</th>
                  <th>SIZE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {documents
                  .filter((d) =>
                    !search || d.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((d) => (
                    <tr key={d.name}>
                      <td>
                        <div className="proc-doc-name-cell">
                          <span
                            className="proc-file-badge"
                            style={{ background: fileTypeColor[d.type] ?? '#555' }}
                          >
                            {d.type}
                          </span>
                          <span className="proc-doc-name">{d.name}</span>
                        </div>
                      </td>
                      <td className="proc-muted">{d.category}</td>
                      <td>
                        <span
                          className="proc-file-badge"
                          style={{ background: fileTypeColor[d.type] ?? '#555' }}
                        >
                          {d.type}
                        </span>
                      </td>
                      <td className="proc-muted">{d.party}</td>
                      <td className="proc-muted">{d.date}</td>
                      <td className="proc-muted">{d.size}</td>
                      <td>
                        <div className="proc-actions">
                          <button className="proc-action-btn" title="Download"><i className="fi fi-rr-download"/></button>
                          <button className="proc-action-btn" title="More options">⋯</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="proc-doc-footer">
            <span className="proc-muted">Showing 1 to 8 of 78 documents</span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="proc-muted">...</span>
              <button className="page-btn">10</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
