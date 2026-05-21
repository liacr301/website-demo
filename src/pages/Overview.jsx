import { useState } from 'react'
import Header from '../components/Header'
import './Overview.css'
import bimModel from '../assets/overview_members/bim_model.png'
import finishOak from '../assets/overview_members/finish_select_book/natural_oak.png'
import finishLinen from '../assets/overview_members/finish_select_book/moduleo_linen.png'
import finishSilestone from '../assets/overview_members/finish_select_book/silestone.png'
import finishMarazzi from '../assets/overview_members/finish_select_book/marazzi.png'
import finishNickel from '../assets/overview_members/finish_select_book/brushed_nickel.png'
import finishWhite from '../assets/overview_members/finish_select_book/warm_white.png'
import finishStone from '../assets/overview_members/finish_select_book/stone_cladding.png'
import photo1 from '../assets/my_home_members/WhatsApp Image 2026-05-21 at 15.39.10.jpeg'
import photo2 from '../assets/my_home_members/WhatsApp Image 2026-05-21 at 15.39.33.jpeg'
import photo3 from '../assets/overview_members/photos/photo_3.png'
import photo4 from '../assets/overview_members/photos/photo_4.png'
import photo5 from '../assets/overview_members/photos/photo_5.png'
import photo6 from '../assets/overview_members/photos/photo_6.png'
import photo7 from '../assets/overview_members/photos/photo_7.png'

const schedule = [
  { activity: 'Excavation',         status: 'completed',   completion: '15 JAN 2025', forecast: '15 JAN 2025' },
  { activity: 'Foundations',        status: 'completed',   completion: '29 JAN 2025', forecast: '29 JAN 2025' },
  { activity: 'Concrete Structure', status: 'completed',   completion: '12 MAR 2025', forecast: '12 MAR 2025' },
  { activity: 'Roof Structure',     status: 'in-progress', completion: '–',           forecast: '30 APR 2025' },
  { activity: 'Roofing',            status: 'upcoming',    completion: '–',           forecast: '20 MAY 2025' },
  { activity: 'Windows & Doors',    status: 'upcoming',    completion: '–',           forecast: '10 JUN 2025' },
  { activity: 'MEP Rough-In',       status: 'upcoming',    completion: '–',           forecast: '25 JUN 2025' },
  { activity: 'Interior Plastering',status: 'upcoming',    completion: '–',           forecast: '10 JUL 2025' },
  { activity: 'Tiling',             status: 'upcoming',    completion: '–',           forecast: '20 AUG 2025' },
  { activity: 'Painting',           status: 'upcoming',    completion: '–',           forecast: '05 SEP 2025' },
  { activity: 'Final Inspection',   status: 'upcoming',    completion: '–',           forecast: '30 JUN 2026' },
]

const finishes = [
  { label: 'FLOORING',           detail: 'Natural Oak',          img: finishOak },
  { label: 'KITCHEN',            detail: 'Moduleo – Linen',      img: finishLinen },
  { label: 'COUNTERTOP',         detail: 'Silestone – Blanco Zeus', img: finishSilestone },
  { label: 'BATHROOM TILES',     detail: 'Marazzi – Sand',       img: finishMarazzi },
  { label: 'BATHROOM FIXTURES',  detail: 'Brushed Nickel',       img: finishNickel },
  { label: 'PAINT',              detail: 'Warm White',           img: finishWhite },
  { label: 'EXTERIOR FINISH',    detail: 'Stone Cladding',       img: finishStone },
]

const sitePhotos = [
  { src: photo1, date: '24 MAY 2026', caption: 'Front view – Structure in progress' },
  { src: photo2, date: '17 MAY 2026', caption: 'East wing – Scaffolding phase' },
  { src: photo3, date: '10 MAY 2026', caption: 'Roof structure – Beam placement' },
  { src: photo4, date: '03 MAY 2026', caption: 'Interior – Ground floor slab' },
  { src: photo5, date: '26 APR 2026', caption: 'West facade – Block laying' },
  { src: photo6, date: '19 APR 2026', caption: 'Overview – Site progress' },
  { src: photo7, date: '12 APR 2026', caption: 'Foundation – Completed' },
]

const photoHistory = [
  { date: '24 MAY 2026', src: photo1 },
  { date: '17 MAY 2026', src: photo2 },
  { date: '10 MAY 2026', src: photo3 },
  { date: '03 MAY 2026', src: photo4 },
  { date: '26 APR 2026', src: photo5 },
  { date: '19 APR 2026', src: photo6 },
]

function PhotoSlider({ photos }) {
  const [active, setActive] = useState(0)
  const prev = () => setActive(i => (i - 1 + photos.length) % photos.length)
  const next = () => setActive(i => (i + 1) % photos.length)
  const p = photos[active]
  return (
    <div className="photo-slider">
      <div className="photo-slider-main" style={{backgroundImage: `url(${p.src})`}} />
      <div className="photo-slider-meta">
        <span className="photo-slider-date">{p.date}</span>
        <span className="photo-slider-caption">{p.caption}</span>
      </div>
      <div className="photo-slider-strip">
        <button className="photo-slider-nav" onClick={prev}><i className="fi fi-rr-angle-left"/></button>
        <div className="photo-slider-thumbs">
          {photos.map((ph, i) => (
            <div
              key={i}
              className={`photo-slider-thumb${i === active ? ' active' : ''}`}
              style={{backgroundImage: `url(${ph.src})`}}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button className="photo-slider-nav" onClick={next}><i className="fi fi-rr-angle-right"/></button>
      </div>
    </div>
  )
}

function DonutChart({ pct }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(44,34,24,0.10)" strokeWidth="10"/>
      <circle
        cx="55" cy="55" r={r}
        fill="none"
        stroke="#A0795A"
        strokeWidth="10"
        strokeDasharray={`${filled} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
      />
      <text x="55" y="50" textAnchor="middle" fill="#2C2218" fontSize="16" fontWeight="700" fontFamily="Montserrat">{pct}%</text>
      <text x="55" y="64" textAnchor="middle" fill="#7A6E62" fontSize="7.5" fontWeight="500" fontFamily="Montserrat" letterSpacing="0.08em">OVERALL</text>
      <text x="55" y="73" textAnchor="middle" fill="#7A6E62" fontSize="7.5" fontWeight="500" fontFamily="Montserrat" letterSpacing="0.08em">COMPLETION</text>
    </svg>
  )
}

function StatusIcon({ status }) {
  if (status === 'completed')
    return <span className="status-text status-completed">Completed</span>
  if (status === 'in-progress')
    return <span className="status-text status-inprogress">In Progress</span>
  return <span className="status-text status-upcoming">Upcoming</span>
}

export default function Overview() {
  return (
    <div className="overview">
      <Header title="VILLA 27" subtitle="Construction Progress of Your Home in Real Time" />

      <div className="overview-body">
        {/* Row 1: BIM + Overall Progress + Key Numbers */}
        <div className="overview-row3">
          {/* BIM Model */}
          <div className="card bim-card">
            <div className="card-title">BIM Model – Live Progress</div>
            <div className="bim-viewer">
              <img src={bimModel} alt="BIM Model" className="bim-model-img" />
            </div>
            <div className="bim-legend">
              <span className="bim-legend-item"><span className="dot dot-grey"/>Not Started</span>
              <span className="bim-legend-item"><span className="dot dot-blue"/>In Progress</span>
              <span className="bim-legend-item"><span className="dot dot-green"/>Completed</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="card progress-card">
            <div className="card-title">Overall Progress</div>
            <div className="progress-main">
              <div>
                <div className="progress-stat-label">CONSTRUCTION PROGRESS</div>
                <div className="progress-stat-value">57%</div>
                <div className="progress-bar" style={{margin: '6px 0 16px', width: '100%'}}>
                  <div className="progress-bar-fill" style={{width: '57%'}}/>
                </div>
                <div className="progress-stat-label">ESTIMATED COMPLETION</div>
                <div className="progress-stat-value" style={{fontSize: 14}}>Q2 2026</div>
                <div className="progress-stat-label" style={{marginTop:8}}>DAYS REMAINING</div>
                <div className="progress-stat-value" style={{fontSize: 20}}>92 <span style={{fontSize:12,fontWeight:400,color:'var(--text-muted)'}}>days</span></div>
              </div>
              <DonutChart pct={57} />
            </div>
            <div className="progress-phases">
              <div className="phase-item">
                <span className="phase-check">✓</span>
                <div className="phase-label">SITE WORKS</div>
                <div className="phase-val">100%</div>
              </div>
              <div className="phase-item">
                <span className="phase-icon"><i className="fi fi-rr-cube"/></span>
                <div className="phase-label">STRUCTURE</div>
                <div className="phase-val">75%</div>
              </div>
              <div className="phase-item">
                <span className="phase-icon"><i className="fi fi-rr-bolt"/></span>
                <div className="phase-label">MEP</div>
                <div className="phase-val">40%</div>
              </div>
              <div className="phase-item">
                <span className="phase-icon"><i className="fi fi-rr-square"/></span>
                <div className="phase-label">FINISHES</div>
                <div className="phase-val">20%</div>
              </div>
            </div>
          </div>

          {/* Key Project Numbers */}
          <div className="card kpn-card">
            <div className="card-title">Key Project Numbers</div>
            <div className="kpn-list">
              <div className="kpn-row">
                <span className="kpn-label">TOTAL HOUSES</span>
                <span className="kpn-value">90</span>
              </div>
              <div className="kpn-row">
                <span className="kpn-label">YOUR HOME PROGRESS</span>
                <span className="kpn-value accent">57%</span>
              </div>
              <div className="kpn-row">
                <span className="kpn-label">PROJECT PROGRESS</span>
                <span className="kpn-value">38%</span>
              </div>
              <div className="kpn-divider"/>
              <div className="kpn-row">
                <span className="kpn-label">CONSTRUCTION START</span>
                <span className="kpn-value sm">18 JAN 2025</span>
              </div>
              <div className="kpn-row">
                <span className="kpn-label">ESTIMATED COMPLETION</span>
                <span className="kpn-value sm">30 JUN 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Schedule + Latest Photos + Photo History */}
        <div className="overview-row3">
          {/* Construction Schedule */}
          <div className="card schedule-card">
            <div className="card-title">Construction Schedule</div>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Status</th>
                  <th>Completion</th>
                  <th>Forecast</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i}>
                    <td>{row.activity}</td>
                    <td><StatusIcon status={row.status} /></td>
                    <td style={{color: 'var(--text-muted)', fontSize:10}}>{row.completion}</td>
                    <td style={{color: 'var(--text-muted)', fontSize:10}}>{row.forecast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Latest Site Photos */}
          <div className="card latest-photos-card">
            <div className="card-title">Latest Site Photos</div>
            <PhotoSlider photos={sitePhotos} />
          </div>

          {/* Photo History */}
          <div className="card photo-history-card">
            <div className="card-title-row">
              <span className="card-title" style={{marginBottom:0}}>Photo History</span>
              <select className="filter-select" style={{fontSize:10, padding:'4px 22px 4px 8px', minWidth:90}}>
                <option>May 2026</option>
                <option>Apr 2026</option>
              </select>
            </div>
            <div className="photo-history-grid">
              {photoHistory.map((p, i) => (
                <div key={i} className="photo-history-item-wrap">
                  <div className="photo-placeholder photo-history-img" style={{backgroundImage: `url(${p.src})`}} />
                  <span className="photo-date">{p.date}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-outline view-all-btn">VIEW ALL PHOTOS</button>
          </div>
        </div>

        {/* Row 3: Finish Select Book */}
        <div className="card finish-row-card">
          <div className="card-title">Finish Select Book</div>
          <div className="finish-row">
            {finishes.map((f, i) => (
              <div key={i} className="finish-item">
                <div className="finish-item-label">{f.label}</div>
                <img src={f.img} alt={f.detail} className="finish-item-img" />
                <div className="finish-item-detail">{f.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
