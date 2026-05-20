import Header from '../components/Header'
import './CPU.css'
import cpuImg1 from '../assets/cpu_members/Captura de ecrã de 2026-05-20 18-31-32.png'
import cpuImg2 from '../assets/cpu_members/Captura de ecrã de 2026-05-20 18-31-41.png'
import cpuImg3 from '../assets/cpu_members/Captura de ecrã de 2026-05-20 18-31-46.png'
import cpuImg4 from '../assets/cpu_members/Captura de ecrã de 2026-05-20 18-31-54.png'
import cpuImg5 from '../assets/cpu_members/Captura de ecrã de 2026-05-20 18-32-04.png'

const projectOverview = [
  { label: 'General Contractor',                  icon: <i className="fi fi-rr-tools"/>, value: 'BuildCore Group' },
  { label: 'Supervision',                          icon: <i className="fi fi-rr-eye"/>,            value: 'PlanTech Solutions' },
  { label: 'Contracted Value to-date (excl VAT)', icon: <i className="fi fi-rr-euro"/>,           value: '€24,750,000' },
  { label: 'Gross Construction Area (sq.m)',       icon: <i className="fi fi-rr-square"/>,         value: '12,850 m²' },
  { label: 'Permit Construction Start Date',       icon: <i className="fi fi-rr-calendar"/>,       value: '15 JAN 2025' },
  { label: 'Target Completion Date',               icon: <i className="fi fi-rr-flag"/>,           value: '30 JUN 2026' },
]

const weeklyProgress = [
  {
    week: 'WEEK 1', range: '1 – 7 MARCH', pct: 10.20,
    notes: ['Slab A1 – level 1 poured', 'Slab A2 – assembling rebar and formwork', 'Flower bed – assembling rebar and formwork on walls'],
    color: '#2a2e18', img: cpuImg1,
  },
  {
    week: 'WEEK 2', range: '8 – 14 MARCH', pct: 12.80,
    notes: ['Slab A2 – rebar and formwork continued', 'Wall formwork ongoing', 'Connection between buildings – footings'],
    color: '#262a16', img: cpuImg2,
  },
  {
    week: 'WEEK 3', range: '15 – 21 MARCH', pct: 14.20,
    notes: ['Columns – assembling formwork', 'Lift shaft – formwork progressing', 'Site preparation continued'],
    color: '#222618', img: cpuImg3,
  },
  {
    week: 'WEEK 4', range: '22 – 31 MARCH', pct: 15.05,
    notes: ['Columns – formwork and concrete', 'Lift shaft – formwork and rebar', 'Overall structure progressing'],
    color: '#20241a', img: cpuImg4,
  },
]

const workplan = [
  { division: 'Structure', item: 'Block A – Level 1', status: 'in-progress' },
  { division: 'Structure', item: 'Block B – Level 1', status: 'completed' },
  { division: 'Structure', item: 'Lift Shaft',        status: 'in-progress' },
  { division: 'Structure', item: 'Flower Bed – Walls', status: 'in-progress' },
]

const schedule = [
  { division: 'Site Facilities', mar: 0.85, apr: 0.3,  may: 0.0,  jun: 0.0  },
  { division: 'Earthworks',      mar: 0.6,  apr: 0.3,  may: 0.1,  jun: 0.0  },
  { division: 'Foundations',     mar: 0.7,  apr: 0.5,  may: 0.3,  jun: 0.1  },
  { division: 'Structure',       mar: 0.2,  apr: 0.55, may: 0.65, jun: 0.4  },
  { division: 'MEP',             mar: 0.0,  apr: 0.1,  may: 0.4,  jun: 0.5  },
  { division: 'Finishes',        mar: 0.0,  apr: 0.0,  may: 0.1,  jun: 0.45 },
]

const budget = [
  { description: 'Site Facilities', amount: '€2,950,000',  pct: '5.55%' },
  { description: 'Earthworks',      amount: '€14,350,000', pct: '27.90%' },
  { description: 'Foundations',     amount: '€19,950,000', pct: '38.77%' },
  { description: 'Structures',      amount: '€950,000',    pct: '1.82%' },
  { description: 'Architecture',    amount: '€–',          pct: '–' },
  { description: 'MEP & Others',    amount: '€13,750,000', pct: '26.96%' },
]

function ContractDonut({ pct }) {
  const r = 38
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(44,34,24,0.10)" strokeWidth="10"/>
      <circle cx="45" cy="45" r={r} fill="none" stroke="#A0795A" strokeWidth="10"
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 45 45)"/>
      <text x="45" y="42" textAnchor="middle" fill="#2C2218" fontSize="13" fontWeight="700" fontFamily="Montserrat">{pct}%</text>
      <text x="45" y="54" textAnchor="middle" fill="#7A6E62" fontSize="7" fontFamily="Montserrat" letterSpacing="0.06em">CONTRACT</text>
    </svg>
  )
}

function StatusDot({ status }) {
  const colors = { 'completed': '#4E8040', 'in-progress': '#A0795A', 'upcoming': '#4A6E9A' }
  return <span className="status-dot" style={{background: colors[status] || '#666'}} />
}

export default function CPU() {
  return (
    <div className="cpu-page">
      <Header title="CONSTRUCTION PROGRESS UPDATE" subtitle="April 2026" />

      <div className="cpu-body">
        {/* Actions */}
        <div className="cpu-actions">
          <button className="btn btn-ghost">SEARCH REPORTS</button>
          <button className="btn btn-ghost">DOWNLOAD PDF</button>
        </div>

        {/* Row 1: Project Overview + Monthly Stats */}
        <div className="cpu-row2">
          <div className="card cpu-overview-card">
            <div className="cpu-overview-layout">
              <div className="cpu-overview-photo" />
              <div className="cpu-overview-info">
                <div className="card-title">PROJECT OVERVIEW</div>
                {projectOverview.map((item, i) => (
                  <div key={i} className="po-row">
                    <span className="po-icon">{item.icon}</span>
                    <span className="po-label">{item.label}</span>
                    <span className="po-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card cpu-stats-card">
            <div className="card-title">MONTHLY STATS</div>
            <div className="monthly-stat-row">
              <span className="monthly-stat-label">Site Personnel (avg)</span>
              <span className="monthly-stat-value">48</span>
            </div>
            <div className="monthly-stat-row">
              <span className="monthly-stat-label">Average of Worker/Day</span>
              <span className="monthly-stat-value">46</span>
            </div>
            <div className="monthly-stat-row monthly-stat-row--col">
              <span className="monthly-stat-label">% Construction Contract Progress</span>
              <div className="monthly-donut-wrap">
                <ContractDonut pct={15} />
                <div className="monthly-trend">
                  <span>vs last month</span>
                  <strong className="trend-up">↑ +1.73%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="card cpu-weekly-card">
          <div className="card-title">CONSTRUCTION PROGRESS BY WEEK</div>
          <div className="weekly-grid">
            {weeklyProgress.map((w, i) => (
              <div key={i} className="weekly-item" style={{background: w.color}}>
                <div className="weekly-header">
                  <span className="weekly-week">{w.week}</span>
                  <span className="weekly-range">({w.range})</span>
                  <span className="weekly-pct">{w.pct.toFixed(2)}%</span>
                </div>
                <div className="progress-bar" style={{marginBottom: 8}}>
                  <div className="progress-bar-fill" style={{width: `${w.pct}%`}} />
                </div>
                <img src={w.img} alt={w.week} className="weekly-photo" />
                <ul className="weekly-notes">
                  {w.notes.map((n, j) => <li key={j}>{n}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Progress at end of month */}
        <div className="card cpu-month-end-card">
          <div className="card-title">PROGRESS AT THE END OF THE MONTH</div>
          <div className="month-end-caption">Overall view of construction progress – March 2025</div>
          <img src={cpuImg5} alt="End of month" className="month-end-photo" />
        </div>

        {/* Row: Updates + Workplan + Schedule + Budget */}
        <div className="cpu-row4">
          {/* Updates & Timelines */}
          <div className="card cpu-updates-card">
            <div className="card-title">UPDATES & TIMELINES</div>
            <div className="update-item">
              <span className="update-icon"><i className="fi fi-rr-clipboard"/></span>
              <div>
                <div className="update-label">Workplan Update</div>
                <button className="update-link">View details ›</button>
              </div>
            </div>
            <div className="update-item">
              <span className="update-icon"><i className="fi fi-rr-calendar"/></span>
              <div>
                <div className="update-label">Draft Schedule Update</div>
                <button className="update-link">View details ›</button>
              </div>
            </div>
            <div className="update-item">
              <span className="update-icon"><i className="fi fi-rr-dollar"/></span>
              <div>
                <div className="update-label">Project Budget</div>
                <button className="update-link">View details ›</button>
              </div>
            </div>
          </div>

          {/* Workplan */}
          <div className="card cpu-workplan-card">
            <div className="card-title">WORKPLAN UPDATE</div>
            <table>
              <thead>
                <tr>
                  <th>Division</th>
                  <th>Item</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workplan.map((row, i) => (
                  <tr key={i}>
                    <td style={{fontSize:10}}>{row.division}</td>
                    <td style={{fontSize:10}}>{row.item}</td>
                    <td><StatusDot status={row.status} /> <span style={{fontSize:9, color:'var(--text-muted)', textTransform:'capitalize'}}>{row.status.replace('-',' ')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-ghost" style={{marginTop:10, fontSize:10, width:'100%', justifyContent:'center'}}>View full workplan</button>
          </div>

          {/* Draft Schedule */}
          <div className="card cpu-schedule-card">
            <div className="card-title">DRAFT SCHEDULE UPDATE</div>
            <div className="schedule-months">
              {['MAR 2025','APR 2025','MAY 2025','JUN 2025'].map(m => (
                <span key={m} className="schedule-month">{m}</span>
              ))}
            </div>
            {schedule.map((row, i) => (
              <div key={i} className="sched-row">
                <div className="sched-label">{row.division}</div>
                <div className="sched-bars">
                  {[row.mar, row.apr, row.may, row.jun].map((v, j) => (
                    <div key={j} className="sched-bar-wrap">
                      <div className="sched-bar-fill" style={{width: `${v * 100}%`}} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{marginTop:10, fontSize:10, width:'100%', justifyContent:'center'}}>View full schedule</button>
          </div>

          {/* Budget */}
          <div className="card cpu-budget-card">
            <div className="card-title">PROJECT BUDGET</div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount (excl VAT)</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((row, i) => (
                  <tr key={i}>
                    <td style={{fontSize:10}}>{row.description}</td>
                    <td style={{fontSize:10}}>{row.amount}</td>
                    <td style={{fontSize:10}}>{row.pct}</td>
                  </tr>
                ))}
                <tr style={{fontWeight: 700}}>
                  <td style={{color:'var(--accent)', fontSize:11}}>TOTAL</td>
                  <td style={{color:'var(--accent)', fontSize:11}}>€52,950,000</td>
                  <td style={{color:'var(--accent)', fontSize:11}}>100.00%</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-ghost" style={{marginTop:10, fontSize:10, width:'100%', justifyContent:'center'}}>View full budget</button>
          </div>
        </div>
      </div>
    </div>
  )
}
