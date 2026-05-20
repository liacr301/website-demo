import { useState } from 'react'
import Header from '../components/Header'
import './FinishBook.css'
import mat1  from '../assets/finish_members/material_1.png'
import mat2  from '../assets/finish_members/material_2.png'
import mat3  from '../assets/finish_members/material_3.png'
import mat4  from '../assets/finish_members/material_4.png'
import mat5  from '../assets/finish_members/material_5.png'
import mat6  from '../assets/finish_members/material_6.png'
import mat7  from '../assets/finish_members/material_7.png'
import mat8  from '../assets/finish_members/material_8.png'
import mat9  from '../assets/finish_members/material_9.png'
import mat10 from '../assets/finish_members/material_10.png'

const categories = [
  { id: 'all',   label: 'All Finishes',      count: 98 },
  { id: 'ext',   label: 'Exterior Finishes', count: 24 },
  { id: 'floor', label: 'Flooring',          count: 14 },
  { id: 'wall',  label: 'Wall Finishes',     count: 16 },
  { id: 'kit',   label: 'Kitchen',           count: 12 },
  { id: 'bath',  label: 'Bathroom',          count: 15 },
  { id: 'join',  label: 'Joinery',           count: 10 },
  { id: 'door',  label: 'Doors & Windows',   count:  8 },
  { id: 'ceil',  label: 'Ceilings',          count:  4 },
  { id: 'san',   label: 'Sanitaryware',      count:  9 },
  { id: 'light', label: 'Lighting',          count:  6 },
]

const catIcons = {
  all:   <i className="fi fi-rr-apps"/>,
  ext:   <i className="fi fi-rr-home"/>,
  floor: <i className="fi fi-rr-border-outer"/>,
  wall:  <i className="fi fi-rr-border-all"/>,
  kit:   <i className="fi fi-rr-fork"/>,
  bath:  <i className="fi fi-rr-water"/>,
  join:  <i className="fi fi-rr-tools"/>,
  door:  <i className="fi fi-rr-expand"/>,
  ceil:  <i className="fi fi-rr-border-top"/>,
  san:   <i className="fi fi-rr-faucet"/>,
  light: <i className="fi fi-rr-bulb"/>,
}

const finishes = [
  {
    id: 1, category: 'FLOORING – LIVING AREA', material: 'Natural Limestone',
    color: 'Creme Clair', location: 'Living Room, Dining',
    status: 'selected', img: mat1,
  },
  {
    id: 2, category: 'FLOORING – BEDROOMS', material: 'Engineered Wood',
    color: 'Natural Oak', location: 'Bedrooms',
    status: 'selected', img: mat2,
  },
  {
    id: 3, category: 'WALL FINISH – INTERIOR', material: 'Lime Plaster',
    color: 'Off White', location: 'Interior Walls',
    status: 'selected', img: mat3,
  },
  {
    id: 4, category: 'KITCHEN – COUNTERTOP', material: 'Natural Stone',
    color: 'Calacatta Gold', location: 'Kitchen',
    status: 'selected', img: mat4,
  },
  {
    id: 5, category: 'KITCHEN – CABINETRY', material: 'Wood Veneer',
    color: 'Natural Oak', location: 'Kitchen',
    status: 'waiting', img: mat5,
  },
  {
    id: 6, category: 'BATHROOM – VANITY TOP', material: 'Natural Stone',
    color: "Crema d'Orcia", location: 'Bathrooms',
    status: 'selected', img: mat6,
  },
  {
    id: 7, category: 'BATHROOM – WALL TILE', material: 'Zellige Tile',
    color: 'Pearl', location: 'Bathrooms',
    status: 'waiting', img: mat7,
  },
  {
    id: 8, category: 'BATHROOM – FIXTURES', material: 'Brushed Black Nickel',
    color: 'Matte', location: 'Bathrooms',
    status: 'selected', img: mat8,
  },
  {
    id: 9, category: 'INTERIOR DOORS', material: 'Solid Wood',
    color: 'Natural Oak', location: 'Interior',
    status: 'selected', img: mat9,
  },
  {
    id: 10, category: 'WINDOWS & DOORS', material: 'Aluminum Frames',
    color: 'Dark Bronze', location: 'Exterior',
    status: 'selected', img: mat10,
  },
]

const selectionByCategory = [
  { label: 'Exterior Finishes (24)', selected: 18, waiting: 4, notSelected: 2, pct: 75 },
  { label: 'Flooring (14)',          selected: 10, waiting: 2, notSelected: 2, pct: 71 },
  { label: 'Wall Finishes (16)',     selected: 11, waiting: 3, notSelected: 2, pct: 69 },
  { label: 'Kitchen (12)',           selected:  8, waiting: 2, notSelected: 2, pct: 67 },
  { label: 'Bathroom (15)',          selected: 11, waiting: 2, notSelected: 2, pct: 73 },
  { label: 'Joinery (10)',           selected:  7, waiting: 2, notSelected: 1, pct: 70 },
]

function StatusBadge({ status }) {
  if (status === 'selected') return <span className="finish-status finish-selected">✓ Selected</span>
  if (status === 'waiting')  return <span className="finish-status finish-waiting"><i className="fi fi-rr-clock"/> Waiting</span>
  return <span className="finish-status finish-not-selected">✗ Not Selected</span>
}

function OverviewDonut({ pct, selected, waiting, notSelected, total }) {
  const r = 50
  const circ = 2 * Math.PI * r
  const selFilled = (selected / total) * circ
  const waitFilled = (waiting / total) * circ
  const offset1 = 0
  const offset2 = selFilled

  return (
    <div className="finish-donut-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(44,34,24,0.10)" strokeWidth="14"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#4E8040" strokeWidth="14"
          strokeDasharray={`${selFilled} ${circ}`} strokeDashoffset={-offset1}
          transform="rotate(-90 65 65)" strokeLinecap="round"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#A0795A" strokeWidth="14"
          strokeDasharray={`${waitFilled} ${circ}`} strokeDashoffset={-offset2}
          transform="rotate(-90 65 65)"/>
        <text x="65" y="60" textAnchor="middle" fill="#2C2218" fontSize="18" fontWeight="700" fontFamily="Montserrat">{pct}%</text>
        <text x="65" y="73" textAnchor="middle" fill="#7A6E62" fontSize="8" fontFamily="Montserrat" letterSpacing="0.08em">Selected</text>
      </svg>
      <div className="finish-donut-legend">
        <div className="donut-leg-item">
          <span className="donut-leg-dot" style={{background:'#4E8040'}}/>
          <span>Selected</span>
          <strong>{selected}</strong>
          <span className="donut-leg-pct">{Math.round(selected/total*100)}%</span>
        </div>
        <div className="donut-leg-item">
          <span className="donut-leg-dot" style={{background:'#A0795A'}}/>
          <span>Waiting</span>
          <strong>{waiting}</strong>
          <span className="donut-leg-pct">{Math.round(waiting/total*100)}%</span>
        </div>
        <div className="donut-leg-item">
          <span className="donut-leg-dot" style={{background:'rgba(44,34,24,0.14)'}}/>
          <span>Not Selected</span>
          <strong>{notSelected}</strong>
          <span className="donut-leg-pct">{Math.round(notSelected/total*100)}%</span>
        </div>
        <div className="donut-leg-divider"/>
        <div className="donut-leg-item">
          <span>Total Finishes</span>
          <strong>{total}</strong>
        </div>
      </div>
    </div>
  )
}

export default function FinishBook() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? finishes : finishes

  return (
    <div className="finish-page">
      <Header title="FINISH SELECTION BOOK" subtitle="Explore and Review All Interior and Exterior Finishes Selected for Your Home" />

      <div className="finish-body">
        {/* Top filters */}
        <div className="card finish-filter-card">
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">Category</span>
              <select className="filter-select">
                <option>All Categories</option>
                {categories.slice(1).map(c => <option key={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Location</span>
              <select className="filter-select">
                <option>All Locations</option>
                <option>Living Room</option>
                <option>Bedrooms</option>
                <option>Kitchen</option>
                <option>Bathrooms</option>
                <option>Exterior</option>
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              <select className="filter-select">
                <option>All Status</option>
                <option>Selected</option>
                <option>Waiting</option>
                <option>Not Selected</option>
              </select>
            </div>
            <div className="filter-group" style={{marginLeft:'auto'}}>
              <span className="filter-label">&nbsp;</span>
              <div className="search-wrapper">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input className="search-input" placeholder="Search finishes..." />
              </div>
            </div>
          </div>
        </div>

        <div className="finish-layout">
          {/* Left: Categories */}
          <div className="card finish-cat-panel">
            <div className="finish-cat-title">CATEGORIES</div>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`finish-cat-item${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="finish-cat-icon">{catIcons[cat.id] || '◉'}</span>
                <span className="finish-cat-label">{cat.label}</span>
                <span className="finish-cat-count">{cat.count}</span>
              </button>
            ))}
            <button className="btn btn-outline" style={{width:'100%', justifyContent:'center', marginTop:16, fontSize:10}}>
              REQUEST CHANGE
            </button>
          </div>

          {/* Right: Grid + Overview */}
          <div className="finish-right">
            <div className="card finish-grid-card">
              <div className="finish-grid-header">
                <span className="finish-grid-title">
                  ALL FINISHES <span className="finish-grid-count">({finishes.length})</span>
                </span>
                <div className="view-toggle">
                  <button
                    className={`view-toggle-btn${viewMode === 'grid' ? ' active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  ><i className="fi fi-rr-apps"/> Grid View</button>
                  <button
                    className={`view-toggle-btn${viewMode === 'list' ? ' active' : ''}`}
                    onClick={() => setViewMode('list')}
                  ><i className="fi fi-rr-list"/> List View</button>
                </div>
              </div>

              <div className={`finishes-grid${viewMode === 'list' ? ' list-mode' : ''}`}>
                {filtered.map(f => (
                  <div key={f.id} className="finish-card">
                    <img src={f.img} alt={f.material} className="finish-card-swatch" />
                    <div className="finish-card-info">
                      <div className="finish-card-category">{f.category}</div>
                      <div className="finish-card-material">{f.material}</div>
                      {f.color && <div className="finish-card-detail">Color: {f.color}</div>}
                      <div className="finish-card-detail">Location: {f.location}</div>
                      <StatusBadge status={f.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Selection Overview */}
            <div className="card finish-overview-card">
              <div className="finish-overview-layout">
                <div>
                  <div className="card-title" style={{marginBottom: 12}}>Finish Selection Overview</div>
                  <OverviewDonut pct={72} selected={71} waiting={19} notSelected={8} total={98} />
                </div>
                <div className="finish-by-category">
                  <div className="card-title" style={{marginBottom: 12}}>Selection by Category</div>
                  {selectionByCategory.map((row, i) => (
                    <div key={i} className="cat-bar-row">
                      <div className="cat-bar-label">{row.label}</div>
                      <div className="cat-bar-track">
                        <div className="cat-bar-fill green" style={{width: `${(row.selected / 24) * 100}%`}}/>
                        <div className="cat-bar-fill amber" style={{width: `${(row.waiting / 24) * 100}%`}}/>
                        <div className="cat-bar-fill grey" style={{width: `${(row.notSelected / 24) * 100}%`}}/>
                      </div>
                      <div className="cat-bar-pct">{row.pct}%</div>
                    </div>
                  ))}
                  <div className="cat-bar-legend">
                    <span><span className="dot dot-green"/>Selected</span>
                    <span><span className="dot dot-amber"/>Waiting</span>
                    <span><span className="dot dot-grey"/>Not Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
