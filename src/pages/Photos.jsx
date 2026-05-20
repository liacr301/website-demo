import { useState } from 'react'
import Header from '../components/Header'
import './Photos.css'
import img1 from '../assets/photos_members/photo_1.png'
import img2 from '../assets/photos_members/photo_2.png'
import img3 from '../assets/photos_members/photo_3.png'
import img4 from '../assets/photos_members/photo_4.png'
import img5 from '../assets/photos_members/photo_5.png'
import img6 from '../assets/photos_members/photo_6.png'
import img7 from '../assets/photos_members/photo_7.png'
import img8 from '../assets/photos_members/photo_8.png'
import tl1 from '../assets/overview_members/photos/photo_1.png'
import tl2 from '../assets/overview_members/photos/photo_2.png'
import tl3 from '../assets/overview_members/photos/photo_3.png'
import tl4 from '../assets/overview_members/photos/photo_4.png'
import tl5 from '../assets/overview_members/photos/photo_5.png'
import tl6 from '../assets/overview_members/photos/photo_6.png'
import tl7 from '../assets/overview_members/photos/photo_7.png'

const categories = [
  { id: 'site',      label: 'SITE OVERVIEW',       photos: 24, img: img1 },
  { id: 'found',     label: 'FOUNDATIONS',          photos: 18, img: img2 },
  { id: 'struct',    label: 'STRUCTURE',            photos: 32, img: img3 },
  { id: 'interior',  label: 'INTERIOR',             photos: 15, img: img4 },
  { id: 'roofing',   label: 'ROOFING',              photos: 12, img: img5 },
  { id: 'elec',      label: 'ELECTRICAL',           photos: 10, img: img6 },
  { id: 'plumb',     label: 'PLUMBING',             photos:  8, img: img7 },
  { id: 'ext',       label: 'EXTERIOR & LANDSCAPE', photos: 14, img: img8 },
]

const timeline = [
  { label: '01 – 07 APR', photos: 24,  img: tl1 },
  { label: '08 – 14 APR', photos: 32,  img: tl2 },
  { label: '15 – 21 APR', photos: 28,  img: tl3 },
  { label: '22 – 28 APR', photos: 31,  img: tl4 },
  { label: '29 – 30 APR', photos: 18,  img: tl5 },
  { label: 'MAR 2026',    photos: 124, img: tl6 },
  { label: 'FEB 2026',    photos: 98,  img: tl7 },
  { label: 'JAN 2026',    photos: 76,  img: tl1 },
]

const weeks = [
  { label: 'WEEK 1', range: '01 – 07 APR' },
  { label: 'WEEK 2', range: '08 – 14 APR' },
  { label: 'WEEK 3', range: '15 – 21 APR' },
  { label: 'WEEK 4', range: '22 – 28 APR' },
  { label: 'WEEK 5', range: '29 – 30 APR' },
]

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

export default function Photos() {
  const [activeWeek, setActiveWeek] = useState(0)
  const [activePage, setActivePage] = useState(1)

  return (
    <div className="photos-page">
      <Header title="PHOTOS" subtitle="Track Construction Progress Through Real Images" />

      <div className="photos-body">
        {/* Filters */}
        <div className="card photos-filter-card">
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">Date Range</span>
              <div style={{display:'flex',alignItems:'center',gap:4}}>
                <select className="filter-select">
                  <option>01 APR 2026 – 28 APR 2026</option>
                </select>
                <button className="btn btn-ghost" style={{padding:'7px 8px'}}><IconCalendar /></button>
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Category</span>
              <select className="filter-select">
                <option>All Categories</option>
                {categories.map(c => <option key={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Building Area</span>
              <select className="filter-select">
                <option>All Areas</option>
                <option>Ground Floor</option>
                <option>First Floor</option>
                <option>Exterior</option>
              </select>
            </div>
            <button className="btn btn-outline" style={{marginLeft:'auto',alignSelf:'flex-end'}}>
              <IconDownload /> EXPORT PHOTOS
            </button>
          </div>
        </div>

        {/* April 2026 */}
        <div className="card photos-section-card">
          <div className="photos-month-label">APRIL 2026</div>

          <div className="week-tabs">
            {weeks.map((w, i) => (
              <button
                key={i}
                className={`week-tab${activeWeek === i ? ' active' : ''}`}
                onClick={() => setActiveWeek(i)}
              >
                <div className="week-tab-label">{w.label}</div>
                <div className="week-tab-range">{w.range}</div>
              </button>
            ))}
          </div>

          <div className="photos-grid">
            {categories.map(cat => (
              <div key={cat.id} className="photo-category-card">
                <div className="photo-category-img" style={{backgroundImage: `url(${cat.img})`}}>
                  <button className="photo-category-arrow"><i className="fi fi-rr-angle-right"/></button>
                </div>
                <div className="photo-category-content">
                  <div className="photo-category-label">{cat.label}</div>
                  <div className="photo-category-count">{cat.photos} PHOTOS</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="card photos-timeline-card">
          <div className="photos-month-label">ALL PHOTOS TIMELINE</div>
          <div className="timeline-tabs">
            {timeline.map((t, i) => (
              <button
                key={i}
                className={`timeline-tab${activePage === i + 1 ? ' active' : ''}`}
                onClick={() => setActivePage(i + 1)}
              >
                <div className="timeline-tab-range">{t.label}</div>
                <div className="timeline-tab-count">{t.photos} photos</div>
              </button>
            ))}
          </div>

          <div className="timeline-photos">
            {timeline.map((t, i) => (
              <div key={i} className="timeline-photo-thumb" style={{backgroundImage: `url(${t.img})`}}>
                <span className="timeline-photo-label">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn">‹</button>
            {[1,2,3,4,5].map(p => (
              <button
                key={p}
                className={`page-btn${activePage === p ? ' active' : ''}`}
                onClick={() => setActivePage(p)}
              >{p}</button>
            ))}
            <button className="page-btn">…</button>
            <button className="page-btn">12</button>
            <button className="page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
