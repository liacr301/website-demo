import { useState } from 'react'
import Header from '../components/Header'
import './Documents.css'

const docCategories = [
  { id: 'all',      label: 'All Documents', count: 32 },
  { id: 'contract', label: 'Contracts',     count:  6 },
  { id: 'permits',  label: 'Permits',       count:  4 },
  { id: 'project',  label: 'Project',       count:  5 },
  { id: 'tech',     label: 'Technical',     count:  8 },
  { id: 'fin',      label: 'Financial',     count:  3 },
  { id: 'planning', label: 'Planning',      count:  2 },
  { id: 'quality',  label: 'Quality',       count:  2 },
  { id: 'ops',      label: 'Operations',    count:  2 },
]

const catIcons = {
  all:      <i className="fi fi-rr-folder"/>,
  contract: <i className="fi fi-rr-file"/>,
  permits:  <i className="fi fi-rr-clipboard"/>,
  project:  <i className="fi fi-rr-document"/>,
  tech:     <i className="fi fi-rr-hammer"/>,
  fin:      <i className="fi fi-rr-euro"/>,
  planning: <i className="fi fi-rr-calendar"/>,
  quality:  <i className="fi fi-rr-shield"/>,
  ops:      <i className="fi fi-rr-settings"/>,
}

const documents = [
  { name: 'Construction Contract',     sub: 'Contract signed with general contractor',            category: 'Contracts',  type: 'PDF',  date: '25 APR 2026', size: '2.4 MB', color: '#cc3333' },
  { name: 'Building Permit',           sub: 'Official building permit document',                   category: 'Permits',    type: 'PDF',  date: '18 JAN 2025', size: '1.1 MB', color: '#cc3333' },
  { name: 'Project Specifications',    sub: 'Detailed project specifications and requirements',     category: 'Project',    type: 'DOCX', date: '05 FEB 2026', size: '3.7 MB', color: '#3355cc' },
  { name: 'Project Budget',            sub: 'Detailed budget and cost breakdown',                  category: 'Financial',  type: 'XLSX', date: '22 APR 2026', size: '1.8 MB', color: '#33aa44' },
  { name: 'Construction Timeline',     sub: 'Master construction schedule',                        category: 'Planning',   type: 'PDF',  date: '10 MAR 2026', size: '1.2 MB', color: '#cc3333' },
  { name: 'Architectural Plans',       sub: 'Set of architectural drawings',                       category: 'Technical',  type: 'PDF',  date: '15 JAN 2025', size: '8.9 MB', color: '#cc3333' },
  { name: 'Structural Plans',          sub: 'Structural engineering drawings',                     category: 'Technical',  type: 'PDF',  date: '20 JAN 2025', size: '6.3 MB', color: '#cc3333' },
  { name: 'MEP Plans',                 sub: 'Mechanical, electrical and plumbing drawings',        category: 'Technical',  type: 'PDF',  date: '25 JAN 2025', size: '7.1 MB', color: '#cc3333' },
  { name: 'Quality Control Plan',      sub: 'Quality assurance and control procedures',           category: 'Quality',    type: 'PDF',  date: '30 JAN 2026', size: '1.5 MB', color: '#cc3333' },
  { name: 'Home Owner Manual',         sub: 'Operation and maintenance manual',                   category: 'Operations', type: 'DOCX', date: '12 APR 2026', size: '4.2 MB', color: '#3355cc' },
]

const TypeIcon = ({ type, color }) => (
  <div className="doc-type-icon" style={{background: color}}>
    <span>{type}</span>
  </div>
)

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const IconMore = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
)

export default function Documents() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePage, setActivePage] = useState(1)

  return (
    <div className="docs-page">
      <Header title="DOCUMENTS" subtitle="Access and Download All Documents Related to Your Property and Construction" />

      <div className="docs-body">
        {/* Filters */}
        <div className="card docs-filter-card">
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">Category</span>
              <select className="filter-select">
                <option>All Categories</option>
                {docCategories.slice(1).map(c => <option key={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Document Type</span>
              <select className="filter-select">
                <option>All Types</option>
                <option>PDF</option>
                <option>DOCX</option>
                <option>XLSX</option>
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Date Range</span>
              <select className="filter-select">
                <option>All Time</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
            <div className="filter-group" style={{marginLeft: 'auto'}}>
              <span className="filter-label">&nbsp;</span>
              <div className="search-wrapper">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input className="search-input" placeholder="Search documents..." />
              </div>
            </div>
          </div>
        </div>

        {/* Layout: table + categories sidebar */}
        <div className="docs-layout">
          {/* Document table */}
          <div className="card docs-table-card">
            <table className="docs-table">
              <thead>
                <tr>
                  <th style={{color:'var(--accent)'}}>NAME</th>
                  <th>CATEGORY</th>
                  <th>TYPE</th>
                  <th>DATE UPLOADED</th>
                  <th>SIZE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={i}>
                    <td>
                      <div className="doc-name-cell">
                        <TypeIcon type={doc.type} color={doc.color} />
                        <div>
                          <div className="doc-name">{doc.name}</div>
                          <div className="doc-sub">{doc.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td className="doc-meta">{doc.category}</td>
                    <td>
                      <span className="doc-type-badge" style={{borderColor: doc.color, color: doc.color}}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="doc-meta">{doc.date}</td>
                    <td className="doc-meta">{doc.size}</td>
                    <td>
                      <div className="doc-actions">
                        <button className="doc-action-btn" title="Download"><IconDownload /></button>
                        <button className="doc-action-btn" title="More"><IconMore /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="docs-footer">
              <span className="docs-count">Showing 1 to 10 of 32 documents</span>
              <div className="pagination">
                <button className="page-btn">‹</button>
                {[1,2,3,4].map(p => (
                  <button
                    key={p}
                    className={`page-btn${activePage === p ? ' active' : ''}`}
                    onClick={() => setActivePage(p)}
                  >{p}</button>
                ))}
                <button className="page-btn">›</button>
              </div>
            </div>
          </div>

          {/* Categories sidebar */}
          <div className="card docs-cat-card">
            <div className="docs-cat-title">CATEGORIES</div>
            {docCategories.map(cat => (
              <button
                key={cat.id}
                className={`docs-cat-item${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="docs-cat-icon">{catIcons[cat.id] || <i className="fi fi-rr-folder"/>}</span>
                <span className="docs-cat-label">{cat.label}</span>
                <span className="docs-cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
