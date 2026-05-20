import './Header.css'
import './CompanyHeader.css'

const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const IconExport = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

export default function CompanyHeader({ title, subtitle, showChapters = false }) {
  return (
    <header className="page-header">
      <div className="page-header-overlay" />
      <div className="page-header-content">
        <div className="page-header-left">
          <h1 className="page-header-title">{title}</h1>
          <p className="page-header-subtitle">{subtitle}</p>
        </div>
        <div className="page-header-right">
          {showChapters && (
            <div className="company-header-controls">
              <select className="chapter-select">
                <option>ALL Chapters</option>
                <option>Chapter 3.1</option>
                <option>Chapter 3.2</option>
                <option>Chapter 3.3</option>
              </select>
              <button className="chapter-export-btn"><IconExport /></button>
            </div>
          )}
          <div className="page-header-weather"><IconSun /><span>25°C MELIDES</span></div>
          <span className="page-header-date">07 MAY 2026 &nbsp;15:30</span>
        </div>
      </div>
    </header>
  )
}
