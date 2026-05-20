import { useState } from 'react'
import CompanyHeader from '../../components/CompanyHeader'
import './CompanyOverview.css'
import masterplan from '../../assets/overview_cms/masterplan.jpeg'

// ── Vertical view data ──
const kpis = [
  { icon: <i className="fi fi-rr-home"/>,     label: 'TOTAL NUMBER OF HOUSES',   value: 'xx'      },
  { icon: <i className="fi fi-rr-globe"/>,    label: 'TOTAL LAND AREA',          value: 'xx ha'   },
  { icon: <i className="fi fi-rr-building"/>, label: 'CONSTRUCTION AREA',        value: 'xxx m²'  },
  { icon: <i className="fi fi-rr-calendar"/>, label: 'ESTIMATE COMPLETION DATE', value: 'Qx 20xx' },
]

const dailyStats = [
  { icon: <i className="fi fi-rr-users"/>,        label: 'PEOPLE ON SITE (TODAY)',       value: 128, unit: 'people'     },
  { icon: <i className="fi fi-rr-tools"/>,        label: 'TEAMS ON SITE',                value: 12,  unit: 'teams'      },
  { icon: <i className="fi fi-rr-clipboard"/>,    label: 'ACTIVITIES IN PROGRESS',       value: 18,  unit: 'activities' },
  { icon: <i className="fi fi-rr-check-circle"/>, label: 'ACTIVITIES COMPLETED (TODAY)', value: 7,   unit: 'activities' },
]

const ganttActivities = [
  { name: 'Excavation',               zone: 'ZONE 1',  start: 0,  width: 36, color: '#A0795A' },
  { name: 'Foundation Concrete',      zone: 'ZONE 2',  start: 18, width: 45, color: '#4E8040' },
  { name: 'Masonry – Ground Floor',   zone: 'ZONE 3',  start: 36, width: 45, color: '#4a7ab5' },
  { name: 'Electrical Installations', zone: 'ZONE 4',  start: 54, width: 36, color: '#8a5ab5' },
  { name: 'Waterproofing',            zone: 'ZONE 5',  start: 63, width: 45, color: '#c97a3c' },
  { name: 'Cleaning & Organization',  zone: 'GENERAL', start: 0,  width: 99, color: '#3a7a5a' },
]

const hours = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
const currentHour = 63

const phases = [
  { id: '217',  label: '217 – Phase 1',  x: 45, y: 47 },
  { id: '215',  label: '215 – Phase 2',  x: 62, y: 28 },
  { id: '218a', label: '218a – Phase 3', x: 73, y: 48 },
  { id: '212',  label: '212 – Phase 4',  x: 30, y: 28 },
  { id: '218b', label: '218b – Phase 5', x: 63, y: 68 },
  { id: '210',  label: '210 – Phase 6',  x: 28, y: 68 },
]

// ── Horizontal view data ──
const horizKpis = [
  { icon: <i className="fi fi-rr-globe"/>,        label: 'TOTAL SITE AREA',             value: 'XX ha'          },
  { icon: <i className="fi fi-rr-building"/>,     label: 'EARTHWORKS COMPLETION',       value: 'XXX m³ / XXX m³'},
  { icon: <i className="fi fi-rr-home"/>,         label: 'ROADS & INFRASTRUCTURE',      value: 'XXX m / XXX m'  },
  { icon: <i className="fi fi-rr-calendar"/>,     label: 'UTILITIES INSTALLATION',      value: 'XX %'           },
  { icon: <i className="fi fi-rr-clipboard"/>,    label: 'LANDSCAPING & GREEN AREAS',   value: 'XX ha / XX ha'  },
  { icon: <i className="fi fi-rr-check-circle"/>, label: 'OVERALL HORIZONTAL PROGRESS', value: 'XX %'           },
]

const phaseRows = [
  'Phase 1 – 217',
  'Phase 2 – 215',
  'Phase 3 – 218a',
  'Phase 4 – 212',
  'Phase 5 – 218b',
  'Phase 6 – 210',
]

const phaseCols = [
  { key: 'e', label: 'EARTHWORKS',    color: '#A0795A' },
  { key: 'r', label: 'ROADS & INFRA', color: '#4E8040' },
  { key: 'u', label: 'UTILITIES',     color: '#4a7ab5' },
  { key: 'l', label: 'LANDSCAPING',   color: '#8a5ab5' },
  { key: 'o', label: 'OVERALL',       color: '#c97a3c' },
]

const worksStats = [
  { icon: <i className="fi fi-rr-globe"/>,        label: 'TOTAL SITE AREA',         value: 'XX',  unit: 'hectares' },
  { icon: <i className="fi fi-rr-building"/>,     label: 'TOTAL EARTHWORKS VOLUME', value: 'XXX', unit: 'm³'       },
  { icon: <i className="fi fi-rr-clipboard"/>,    label: 'TOTAL ROADS LENGTH',      value: 'XX',  unit: 'meters'   },
  { icon: <i className="fi fi-rr-calendar"/>,     label: 'STORMWATER NETWORK',      value: 'XX',  unit: 'meters'   },
  { icon: <i className="fi fi-rr-home"/>,         label: 'SEWER NETWORK',           value: 'XX',  unit: 'meters'   },
  { icon: <i className="fi fi-rr-check-circle"/>, label: 'WATER NETWORK',           value: 'XX',  unit: 'meters'   },
]

const breakdownItems = [
  { label: 'Earthworks',                color: '#A0795A', pct: 0, unit: 'XXX m³' },
  { label: 'Roads & Infrastructure',    color: '#4E8040', pct: 0, unit: 'XXX m'  },
  { label: 'Utilities Installation',    color: '#4a7ab5', pct: 0, unit: 'XX %'   },
  { label: 'Landscaping & Green Areas', color: '#8a5ab5', pct: 0, unit: 'XX ha'  },
  { label: 'Completed',                 color: '#7A9A80', pct: 0, unit: 'XX %'   },
]

const earthworksRows = [
  { activity: 'Cut',    volume: 'XXX', completed: 0, remaining: 'XXX', total: false },
  { activity: 'Fill',   volume: 'XXX', completed: 0, remaining: 'XXX', total: false },
  { activity: 'Import', volume: 'XXX', completed: 0, remaining: 'XXX', total: false },
  { activity: 'Export', volume: 'XXX', completed: 0, remaining: 'XXX', total: false },
  { activity: 'Total',  volume: 'XXX', completed: 0, remaining: 'XXX', total: true  },
]

const progressMapLegend = [
  { label: '0% – 25%',   color: '#9B4A3A' },
  { label: '25% – 50%',  color: '#C97A3C' },
  { label: '50% – 75%',  color: '#C8B240' },
  { label: '75% – 100%', color: '#4E8040' },
  { label: 'Completed',  color: '#8A9E88' },
]

const mapOverlayLegend = [
  { label: 'Earthworks',            color: '#A0795A' },
  { label: 'Roads & Infrastructure', color: '#8FBF5A' },
  { label: 'Utilities',              color: '#7A7AB5' },
  { label: 'Landscaping',            color: '#4E8040' },
  { label: 'Completed',              color: '#6A7A68' },
]

function SLineChart() {
  const months = ['JAN\n2025','APR','JUL','OCT','JAN\n2026','APR','JUL','OCT']
  return (
    <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
      <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(44,34,24,0.12)" strokeWidth="1"/>
      {months.map((m, i) => (
        <line key={i} x1={i*(300/7)} y1="0" x2={i*(300/7)} y2="75" stroke="rgba(44,34,24,0.07)" strokeWidth="1"/>
      ))}
      <polyline points="0,75 300,75" fill="none" stroke="rgba(44,34,24,0.25)" strokeWidth="1.5" strokeDasharray="4,3"/>
      <polyline points="0,75 60,75" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
      {months.map((m, i) => (
        <text key={i} x={i*(300/7)} y="80" fill="rgba(44,34,24,0.45)" fontSize="7" textAnchor="middle" fontFamily="Montserrat">{m.split('\n')[0]}</text>
      ))}
    </svg>
  )
}

function DonutChart() {
  return (
    <svg width="108" height="108" viewBox="0 0 108 108">
      <circle cx="54" cy="54" r="38" fill="none" stroke="rgba(44,34,24,0.08)" strokeWidth="16"/>
      <text x="54" y="50" textAnchor="middle" fontFamily="Montserrat" fontWeight="700" fontSize="17" fill="#2C2218">0%</text>
      <text x="54" y="62" textAnchor="middle" fontFamily="Montserrat" fontSize="7" fill="#7A6E62">Overall</text>
      <text x="54" y="72" textAnchor="middle" fontFamily="Montserrat" fontSize="7" fill="#7A6E62">Progress</text>
    </svg>
  )
}

export default function CompanyOverview() {
  const [layout, setLayout] = useState('vertical')

  return (
    <div className="co-page">
      <CompanyHeader title="WINERY" subtitle="COSTATERRA  GOLF & OCEAN CLUB" />

      <div className="co-body">
        {/* Layout toggle */}
        <div className="co-toggle-bar" role="group" aria-label="Layout view">
          <button className={`co-toggle-btn${layout==='vertical' ? ' active':''}`}   onClick={()=>setLayout('vertical')}>Vertical</button>
          <button className={`co-toggle-btn${layout==='horizontal' ? ' active':''}`} onClick={()=>setLayout('horizontal')}>Horizontal</button>
        </div>

        {layout === 'vertical' ? (
          <>
            {/* Row 1: Masterplan + KPIs */}
            <div className="co-row2">
              <div className="card co-masterplan-card">
                <div className="card-title">MASTERPLAN</div>
                <div className="co-map">
                  <img src={masterplan} alt="Masterplan" className="co-masterplan-img"/>
                </div>
              </div>

              <div className="co-kpis-col">
                <div className="card co-kpi-card">
                  <div className="card-title">PROJECT KPI's</div>
                  {kpis.map((k, i) => (
                    <div key={i} className="co-kpi-row">
                      <span className="co-kpi-icon">{k.icon}</span>
                      <div className="co-kpi-info">
                        <div className="co-kpi-label">{k.label}</div>
                        <div className="co-kpi-value">{k.value}</div>
                      </div>
                      <div className="co-kpi-right">
                        <div className="progress-bar" style={{width:120}}>
                          <div className="progress-bar-fill" style={{width:'0%'}}/>
                        </div>
                        <span className="co-kpi-pct">0%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card co-kpi-card">
                  <div className="co-kpi-header-row">
                    <div className="card-title" style={{marginBottom:0}}>KPIs – BY PHASE</div>
                    <select className="filter-select" style={{fontSize:10, padding:'4px 22px 4px 8px', minWidth:90, backgroundColor:'rgba(160,121,90,0.10)', borderColor:'var(--accent)', color:'var(--accent)'}}>
                      <option>PHASE 1</option>
                      <option>PHASE 2</option>
                      <option>PHASE 3</option>
                    </select>
                  </div>
                  {kpis.map((k, i) => (
                    <div key={i} className="co-kpi-row">
                      <span className="co-kpi-icon">{k.icon}</span>
                      <div className="co-kpi-info">
                        <div className="co-kpi-label">{k.label}</div>
                        <div className="co-kpi-value">{k.value}</div>
                      </div>
                      <div className="co-kpi-right">
                        <div className="progress-bar" style={{width:120}}>
                          <div className="progress-bar-fill" style={{width:'0%'}}/>
                        </div>
                        <span className="co-kpi-pct">0%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Daily Execution + Daily Plan */}
            <div className="co-row2">
              <div className="card co-daily-card">
                <div className="card-title">DAILY EXECUTION – OVERVIEW</div>
                <div className="daily-stats-grid">
                  {dailyStats.map((s, i) => (
                    <div key={i} className="daily-stat-item">
                      <span className="daily-stat-icon">{s.icon}</span>
                      <div>
                        <div className="daily-stat-label">{s.label}</div>
                        <div className="daily-stat-value">{s.value}</div>
                        <div className="daily-stat-unit">{s.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card co-gantt-card">
                <div className="card-title">DAILY PLAN</div>
                <div className="gantt-wrap">
                  <div className="gantt-header">
                    <div className="gantt-label-col">ACTIVITY</div>
                    <div className="gantt-zone-col">LOCATION/ZONE</div>
                    <div className="gantt-bars-col">
                      {hours.map(h => <span key={h} className="gantt-hour">{h}</span>)}
                    </div>
                  </div>
                  <div className="gantt-body">
                    {ganttActivities.map((act, i) => (
                      <div key={i} className="gantt-row">
                        <div className="gantt-label-col">{act.name}</div>
                        <div className="gantt-zone-col">{act.zone}</div>
                        <div className="gantt-bars-col">
                          <div className="gantt-track">
                            <div className="gantt-bar" style={{left:`${act.start}%`, width:`${act.width}%`, background:act.color}}/>
                            <div className="gantt-now-line" style={{left:`${currentHour}%`}}/>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="gantt-legend">
                    {[
                      {label:'Earthworks',   color:'#A0795A'},
                      {label:'Structures',   color:'#4E8040'},
                      {label:'Masonry',      color:'#4a7ab5'},
                      {label:'Installations',color:'#8a5ab5'},
                      {label:'Finishes',     color:'#c97a3c'},
                      {label:'General',      color:'#3a7a5a'},
                    ].map(l => (
                      <span key={l.label} className="gantt-leg-item">
                        <span className="dot" style={{background:l.color}}/>
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Economic Execution */}
            <div className="card co-economic-card">
              <div className="card-title">ECONOMIC EXECUTION</div>
              <div className="economic-grid">
                <div className="economic-item">
                  <div className="economic-label">TOTAL INVESTMENT</div>
                  <div className="economic-value">100.000.000€</div>
                </div>
                <div className="economic-item">
                  <div className="economic-label">ACTUAL INVESTMENT</div>
                  <div className="economic-value">0€</div>
                  <div className="progress-bar" style={{marginTop:6}}>
                    <div className="progress-bar-fill" style={{width:'0%'}}/>
                  </div>
                  <div className="economic-sub">0%</div>
                  <div className="economic-forecast">FORECAST 0€ (0%)</div>
                </div>
                <div className="economic-item economic-chart-item">
                  <div className="economic-label">ACTUAL vs FORECAST INVESTMENT</div>
                  <SLineChart />
                </div>
                <div className="economic-item">
                  <div className="economic-label">ESTIMATED COMPLETION (COST)</div>
                  <div className="economic-value" style={{fontSize:26}}>0€</div>
                  <div className="economic-pct">0%</div>
                  <div className="economic-vs-budget">VS BUDGET</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ── HORIZONTAL VIEW ── */}

            {/* Row 1: Masterplan + KPIs + Phase Progress */}
            <div className="co-row2">
              <div className="card co-masterplan-card">
                <div className="card-title">MASTERPLAN – HORIZONTAL WORKS</div>
                <div className="co-map co-map-rel">
                  <img src={masterplan} alt="Masterplan" className="co-masterplan-img"/>
                  {phases.map(p => (
                    <div key={p.id} className="co-phase-pin" style={{left:`${p.x}%`, top:`${p.y}%`}}>
                      {p.label}
                    </div>
                  ))}
                  <div className="co-map-controls">
                    <button className="co-map-ctrl-btn">+</button>
                    <button className="co-map-ctrl-btn">–</button>
                    <button className="co-map-ctrl-btn co-map-ctrl-target">⊙</button>
                  </div>
                  <div className="co-map-bottom-legend">
                    {mapOverlayLegend.map(l => (
                      <span key={l.label} className="co-map-leg-item">
                        <span className="dot" style={{background:l.color, width:7, height:7}}/>
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="co-kpis-col">
                <div className="card co-kpi-card">
                  <div className="card-title">PROJECT KPI's</div>
                  {horizKpis.map((k, i) => (
                    <div key={i} className="co-kpi-row">
                      <span className="co-kpi-icon">{k.icon}</span>
                      <div className="co-kpi-info">
                        <div className="co-kpi-label">{k.label}</div>
                        <div className="co-kpi-value" style={{fontSize:12}}>{k.value}</div>
                      </div>
                      <div className="co-kpi-right">
                        <div className="progress-bar" style={{width:80}}>
                          <div className="progress-bar-fill" style={{width:'0%'}}/>
                        </div>
                        <span className="co-kpi-pct">0%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card co-phase-card">
                  <div className="card-title">PHASE PROGRESS – HORIZONTAL WORKS</div>
                  <div style={{overflowX:'auto'}}>
                    <table className="phase-table">
                      <thead>
                        <tr>
                          <th>PHASE</th>
                          {phaseCols.map(c => (
                            <th key={c.key} style={{color:c.color}}>{c.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {phaseRows.map((phase, i) => (
                          <tr key={i}>
                            <td><div className="phase-name">{phase}</div></td>
                            {phaseCols.map(c => (
                              <td key={c.key}>
                                <div className="mini-prog-cell">
                                  <span className="mini-prog-pct">0%</span>
                                  <div className="mini-prog-bar">
                                    <div className="mini-prog-fill" style={{width:'0%', background:c.color}}/>
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Works Overview + Breakdown */}
            <div className="co-row2">
              <div className="card co-works-card">
                <div className="card-title">WORKS OVERVIEW</div>
                <div className="works-grid">
                  {worksStats.map((s, i) => (
                    <div key={i} className="works-stat-item">
                      <span className="works-stat-icon">{s.icon}</span>
                      <div>
                        <div className="works-stat-label">{s.label}</div>
                        <div className="works-stat-value">{s.value}</div>
                        <div className="works-stat-unit">{s.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card co-breakdown-card">
                <div className="card-title">HORIZONTAL WORKS BREAKDOWN</div>
                <div className="breakdown-body">
                  <div className="breakdown-donut-wrap">
                    <DonutChart />
                  </div>
                  <div className="breakdown-legend">
                    {breakdownItems.map((item, i) => (
                      <div key={i} className="breakdown-leg-item">
                        <span className="dot" style={{background:item.color, width:7, height:7}}/>
                        <span className="breakdown-leg-label">{item.label}</span>
                        <span className="breakdown-leg-pct">{item.pct}%</span>
                        <span className="breakdown-leg-unit">({item.unit})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Earthworks Overview + Progress Map */}
            <div className="co-row2">
              <div className="card co-earthworks-card">
                <div className="card-title">EARTHWORKS OVERVIEW</div>
                <table className="earthworks-table">
                  <thead>
                    <tr>
                      <th>ACTIVITY</th>
                      <th>VOLUME (m³)</th>
                      <th>COMPLETED (m³)</th>
                      <th>REMAINING (m³)</th>
                      <th style={{minWidth:100}}>PROGRESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earthworksRows.map((row, i) => (
                      <tr key={i} className={row.total ? 'total-row' : ''}>
                        <td><span className="earthworks-act-name">{row.activity}</span></td>
                        <td><span className="earthworks-num">{row.volume}</span></td>
                        <td><span className="earthworks-num">{row.completed}</span></td>
                        <td><span className="earthworks-num">{row.remaining}</span></td>
                        <td>
                          <div className="earthworks-prog-cell">
                            <div className="progress-bar" style={{flex:1, minWidth:50}}>
                              <div className="progress-bar-fill" style={{width:'0%'}}/>
                            </div>
                            <span className="earthworks-prog-pct">0%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card co-progress-map-card">
                <div className="card-title">EARTHWORKS PROGRESS MAP</div>
                <div className="progress-map-body">
                  <div className="progress-map-img-wrap">
                    <img src={masterplan} alt="Earthworks Progress Map" className="progress-map-img"/>
                  </div>
                  <div className="progress-map-legend-col">
                    <div className="progress-map-leg-title">COMPLETION (%)</div>
                    {progressMapLegend.map(l => (
                      <div key={l.label} className="progress-map-leg-item">
                        <div className="progress-map-leg-swatch" style={{background:l.color}}/>
                        {l.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
