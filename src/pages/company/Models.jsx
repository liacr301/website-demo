import { useState } from 'react'
import './Models.css'
import CompanyHeader from '../../components/CompanyHeader'
import masterplanImg from '../../assets/overview_cms/masterplan.jpeg'
import renderImg from '../../assets/render/RENDER.png'

/* ─── ICONS (inline SVG) ────────────────────────────────────────── */
const IconHome = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconZoomIn = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
)
const IconZoomOut = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
)
const IconFit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)
const IconExpand = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <polyline points="21 15 21 21 15 21"/><polyline points="3 9 3 3 9 3"/>
  </svg>
)
const IconSun2 = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

/* ─── SITE PLAN SVG ─────────────────────────────────────────────── */
function SitePlanSVG() {
  return (
    <svg
      viewBox="0 0 900 560"
      className="site-plan-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background – dark satellite feel */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#1a2410" />
          <stop offset="100%" stopColor="#0a0f06" />
        </radialGradient>
        <pattern id="terrain" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none"/>
          <circle cx="10" cy="10" r="1.5" fill="rgba(90,120,60,0.15)"/>
          <circle cx="30" cy="25" r="1"   fill="rgba(60,90,40,0.1)"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Base terrain */}
      <rect width="900" height="560" fill="url(#bgGrad)" />
      <rect width="900" height="560" fill="url(#terrain)" />

      {/* Site boundary – dashed */}
      <path
        d="M80 40 L820 40 L840 100 L855 280 L830 480 L600 530 L300 520 L80 480 L55 280 Z"
        fill="rgba(100,130,70,0.06)"
        stroke="rgba(160,121,90,0.40)"
        strokeWidth="1.5"
        strokeDasharray="8,5"
      />

      {/* Internal roads */}
      {/* Main spine road */}
      <path
        d="M450 520 C450 460 430 400 410 340 C390 280 400 220 420 160 C440 100 450 70 450 70"
        fill="none" stroke="#A0A890" strokeWidth="14"
      />
      <path
        d="M450 520 C450 460 430 400 410 340 C390 280 400 220 420 160 C440 100 450 70 450 70"
        fill="none" stroke="#B0B8A0" strokeWidth="12"
      />

      {/* East loop road */}
      <path
        d="M420 160 C500 130 600 150 660 200 C720 250 710 340 680 390 C650 430 600 450 540 460 C480 470 440 460 410 440"
        fill="none" stroke="#A0A890" strokeWidth="10"
      />
      <path
        d="M420 160 C500 130 600 150 660 200 C720 250 710 340 680 390 C650 430 600 450 540 460 C480 470 440 460 410 440"
        fill="none" stroke="#B0B8A0" strokeWidth="8"
      />

      {/* West access */}
      <path
        d="M420 340 C360 330 300 320 250 340 C200 360 170 390 160 430"
        fill="none" stroke="#A0A890" strokeWidth="9"
      />
      <path
        d="M420 340 C360 330 300 320 250 340 C200 360 170 390 160 430"
        fill="none" stroke="#B0B8A0" strokeWidth="7"
      />

      {/* North access */}
      <path
        d="M420 160 C380 140 310 120 240 110 C180 102 140 115 110 130"
        fill="none" stroke="#A0A890" strokeWidth="8"
      />
      <path
        d="M420 160 C380 140 310 120 240 110 C180 102 140 115 110 130"
        fill="none" stroke="#B0B8A0" strokeWidth="6"
      />

      {/* Phase 1 highlight zone */}
      <ellipse cx="560" cy="290" rx="180" ry="140"
        fill="rgba(160,121,90,0.05)"
        stroke="rgba(160,121,90,0.20)"
        strokeWidth="1"
        strokeDasharray="6,4"
      />
      <text x="560" y="185" textAnchor="middle" fill="rgba(160,121,90,0.55)"
        fontSize="10" fontWeight="700" letterSpacing="2">PHASE 1</text>

      {/* ── UPPER CLUSTER – rows of villas ── */}
      {/* Row 1 */}
      {[0,1,2,3,4].map(i => (
        <g key={`ur1-${i}`}>
          <rect x={110 + i*38} y={55} width={28} height={18}
            fill="#B8C4A8" stroke="#8AA070" strokeWidth="0.8" rx="1" />
          <rect x={115 + i*38} y={59} width={18} height={10}
            fill="#A8B898" stroke="none" rx="0.5" />
        </g>
      ))}
      {/* Row 2 */}
      {[0,1,2,3,4,5].map(i => (
        <g key={`ur2-${i}`}>
          <rect x={100 + i*36} y={85} width={26} height={16}
            fill="#B4C0A4" stroke="#8AA070" strokeWidth="0.8" rx="1" />
          <rect x={105 + i*36} y={88} width={16} height={9}
            fill="#A8B898" stroke="none" rx="0.5" />
        </g>
      ))}

      {/* ── PHASE 1 CLUSTER (east) – highlighted ── */}
      {/* Upper-east villas */}
      {[0,1,2,3].map(i => (
        <g key={`p1a-${i}`}>
          <rect x={500 + i*44} y={160} width={34} height={22}
            fill="#C8CEBC" stroke="#A0795A" strokeWidth="1" rx="1" filter="url(#glow)" />
          <rect x={506 + i*44} y={165} width={22} height={12}
            fill="#223018" stroke="none" rx="0.5" />
        </g>
      ))}
      {/* Mid-east villas */}
      {[0,1,2,3,4].map(i => (
        <g key={`p1b-${i}`}>
          <rect x={490 + i*42} y={210} width={32} height={20}
            fill="#C8CEBC" stroke="#A0795A" strokeWidth="0.8" rx="1" />
          <rect x={495 + i*42} y={214} width={22} height={12}
            fill="#223018" stroke="none" rx="0.5" />
        </g>
      ))}
      {/* Lower-east villas */}
      {[0,1,2,3].map(i => (
        <g key={`p1c-${i}`}>
          <rect x={510 + i*44} y={260} width={34} height={22}
            fill="#C8CEBC" stroke="#A0795A" strokeWidth="0.8" rx="1" />
        </g>
      ))}
      {/* Far-east cluster */}
      {[0,1,2].map(i => (
        <g key={`p1d-${i}`}>
          <rect x={660 + i*28} y={220} width={22} height={16}
            fill="#C4CAB8" stroke="#A0795A" strokeWidth="0.7" rx="1" />
        </g>
      ))}
      {[0,1,2].map(i => (
        <g key={`p1e-${i}`}>
          <rect x={660 + i*28} y={260} width={22} height={16}
            fill="#C4CAB8" stroke="#A0795A" strokeWidth="0.7" rx="1" />
        </g>
      ))}

      {/* ── CENTRE-WEST CLUSTER ── */}
      {[0,1,2].map(i => (
        <g key={`cw-${i}`}>
          <rect x={190 + i*46} y={200} width={36} height={22}
            fill="#263418" stroke="#4a6030" strokeWidth="0.8" rx="1" />
          <rect x={196 + i*46} y={204} width={24} height={14}
            fill="#A4B094" stroke="none" rx="0.5" />
        </g>
      ))}

      {/* ── SOUTH-EAST CLUSTER ── */}
      {[0,1,2,3].map(i => (
        <g key={`se-${i}`}>
          <rect x={500 + i*46} y={370} width={36} height={22}
            fill="#BCC8AA" stroke="#8A9A78" strokeWidth="0.8" rx="1" />
        </g>
      ))}
      {[0,1,2].map(i => (
        <g key={`se2-${i}`}>
          <rect x={520 + i*46} y={408} width={36} height={22}
            fill="#BCC8AA" stroke="#8A9A78" strokeWidth="0.8" rx="1" />
        </g>
      ))}

      {/* ── SOUTH-WEST SCATTERED ── */}
      {[[150,380],[200,420],[260,400],[320,440],[370,410]].map(([x,y],i) => (
        <g key={`sw-${i}`}>
          <rect x={x} y={y} width={30} height={20}
            fill="#223016" stroke="#3a5028" strokeWidth="0.7" rx="1" />
        </g>
      ))}

      {/* ── MAIN BUILDING / CLUBHOUSE ── */}
      <rect x={380} y={295} width={75} height={50}
        fill="#C0CEAA" stroke="#8A9A78" strokeWidth="1.2" rx="2" />
      <rect x={385} y={300} width={65} height={40}
        fill="#B0BE9A" stroke="none" rx="1" />
      <rect x={395} y={308} width={20} height={12}
        fill="#243018" stroke="#4a6030" strokeWidth="0.5" />
      <rect x={425} y={308} width={16} height={12}
        fill="#243018" stroke="#4a6030" strokeWidth="0.5" />
      <text x="417" y="375" textAnchor="middle" fill="rgba(138,158,106,0.7)"
        fontSize="7" fontWeight="600" letterSpacing="1">CLUBHOUSE</text>

      {/* ── POOL DECK AREA ── */}
      <ellipse cx="450" cy="475" rx="55" ry="22"
        fill="rgba(30,80,120,0.35)"
        stroke="rgba(60,140,200,0.4)"
        strokeWidth="0.8"
      />
      <text x="450" y="479" textAnchor="middle"
        fill="rgba(60,140,200,0.6)" fontSize="7" fontWeight="600">POOL DECK</text>

      {/* ── VEGETATION blobs ── */}
      {[
        [130,200,18],[160,260,14],[700,150,16],[740,420,12],
        [200,460,15],[320,180,12],[600,480,14],[150,350,10],
      ].map(([x,y,r],i) => (
        <circle key={`veg-${i}`} cx={x} cy={y} r={r}
          fill="rgba(50,90,30,0.25)" stroke="rgba(70,110,40,0.3)" strokeWidth="0.5" />
      ))}

      {/* ── ZONE LABELS ── */}
      <text x="220" y="50" textAnchor="middle" fill="rgba(138,158,106,0.6)"
        fontSize="9" fontWeight="700" letterSpacing="1.5">SURF COTTAGES</text>
      <text x="200" y="245" textAnchor="middle" fill="rgba(138,158,106,0.5)"
        fontSize="8" letterSpacing="1">DUNE VILLAS WEST</text>
      <text x="620" y="340" textAnchor="middle" fill="rgba(160,121,90,0.65)"
        fontSize="8" fontWeight="700" letterSpacing="1.5">DUNE VILLAS EAST</text>
      <text x="230" y="400" textAnchor="middle" fill="rgba(138,158,106,0.4)"
        fontSize="7" letterSpacing="1">INFRA ZONE</text>

      {/* ── TODAY marker ── */}
      <circle cx="410" cy="340" r="5" fill="none" stroke="#A0795A" strokeWidth="1.5" />
      <circle cx="410" cy="340" r="2" fill="#A0795A" />
      <text x="422" y="344" fill="#A0795A" fontSize="7" fontWeight="700">YOU ARE HERE</text>

      {/* North arrow */}
      <g transform="translate(840,70)">
        <circle cx="0" cy="0" r="16" fill="rgba(242,237,228,0.88)" stroke="rgba(44,34,24,0.16)" strokeWidth="1" />
        <path d="M0,-12 L4,4 L0,1 L-4,4 Z" fill="#A0795A" />
        <path d="M0,12 L4,-4 L0,-1 L-4,-4 Z" fill="#8AA070" />
        <text x="0" y="-4" textAnchor="middle" fill="#A0795A" fontSize="7" fontWeight="700">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(760,510)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(44,34,24,0.40)" strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(44,34,24,0.40)" strokeWidth="1" />
        <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(44,34,24,0.40)" strokeWidth="1" />
        <text x="30" y="-7" textAnchor="middle" fill="rgba(44,34,24,0.45)" fontSize="7">100 m</text>
      </g>
    </svg>
  )
}

/* ─── VILLA RENDER ──────────────────────────────────────────────── */
function VillaRender() {
  return (
    <div className="villa-render">
      {/* Sky background */}
      <div className="villa-sky" />
      {/* Architectural SVG */}
      <svg
        viewBox="0 0 300 180"
        className="villa-render-svg"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Ground */}
        <rect x="0" y="140" width="300" height="40" fill="#8a9e6a" opacity="0.5" />
        <rect x="0" y="148" width="300" height="32" fill="#7a8e5a" opacity="0.4" />

        {/* Main villa body */}
        <rect x="40" y="70" width="220" height="80" fill="#e8dfc0" stroke="#c8b890" strokeWidth="0.5" />
        {/* Roof */}
        <path d="M30 70 L150 30 L270 70 Z" fill="#d4c8a0" stroke="#b8a870" strokeWidth="0.5" />
        {/* Roof detail */}
        <path d="M30 70 L150 30 L270 70" fill="none" stroke="#a89860" strokeWidth="1" />

        {/* Left wing */}
        <rect x="10" y="85" width="40" height="55" fill="#ddd4b0" stroke="#c4b890" strokeWidth="0.5" />
        <path d="M5 85 L30 65 L55 85 Z" fill="#ccc0a0" stroke="#b0a080" strokeWidth="0.5" />

        {/* Right wing */}
        <rect x="250" y="85" width="40" height="55" fill="#ddd4b0" stroke="#c4b890" strokeWidth="0.5" />
        <path d="M245 85 L270 65 L295 85 Z" fill="#ccc0a0" stroke="#b0a080" strokeWidth="0.5" />

        {/* Main arched windows */}
        {[70, 110, 150, 190, 230].map((x, i) => (
          <g key={i}>
            <rect x={x} y={90} width={22} height={30} fill="#c8dce8" stroke="#a0b0c0" strokeWidth="0.5" rx="11 11 0 0" />
            <path d={`M${x} ${90+11} A11 11 0 0 1 ${x+22} ${90+11}`}
              fill="none" stroke="#a0b0c0" strokeWidth="0.5" />
            {/* window reflection */}
            <line x1={x+6} y1={93} x2={x+6} y2={116} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </g>
        ))}

        {/* Central door */}
        <rect x="136" y="108" width="28" height="42" fill="#8a7050" rx="14 14 0 0" />
        <rect x="138" y="110" width="24" height="38" fill="#7a6040" rx="12 12 0 0" />
        {/* door knob */}
        <circle cx="160" cy="132" r="2" fill="#A0795A" />

        {/* Columns */}
        {[128, 170].map((x, i) => (
          <rect key={i} x={x} y={70} width={6} height={80} fill="#d4c8a0" stroke="#c0b080" strokeWidth="0.3" />
        ))}

        {/* Pergola / overhang detail */}
        <rect x="60" y="66" width="180" height="6" fill="#c8b880" opacity="0.7" />
        {[70, 100, 130, 160, 190, 220].map((x, i) => (
          <rect key={i} x={x} y="55" width="4" height="18" fill="#b8a870" opacity="0.6" />
        ))}

        {/* Olive trees */}
        {[[15, 120, 18], [280, 115, 22], [48, 128, 14]].map(([x, y, s], i) => (
          <g key={i}>
            {/* trunk */}
            <rect x={x - 2} y={y} width={4} height={22} fill="#8a7050" />
            {/* foliage */}
            <ellipse cx={x} cy={y} rx={s * 0.7} ry={s} fill="#6a8840" opacity="0.85" />
            <ellipse cx={x - 4} cy={y + 4} rx={s * 0.5} ry={s * 0.7} fill="#5a7830" opacity="0.6" />
          </g>
        ))}

        {/* Foreground path */}
        <path d="M110 180 L190 180 L180 148 L120 148 Z" fill="#c8b890" opacity="0.6" />
        <line x1="150" y1="148" x2="150" y2="180" stroke="#b0a070" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function Models() {
  const [activeView, setActiveView] = useState('3d')
  const [activeTool, setActiveTool] = useState('orbit')

  const leftTools = [
    { id: 'walk',    icon: <i className="fi fi-rr-walking"/>,     label: 'WALK' },
    { id: 'fly',     icon: <i className="fi fi-rr-paper-plane"/>, label: 'FLY' },
    { id: 'orbit',   icon: <i className="fi fi-rr-undo"/>,        label: 'ORBIT' },
    { id: 'zoom',    icon: <i className="fi fi-rr-search"/>,      label: 'ZOOM' },
    { id: 'measure', icon: <i className="fi fi-rr-ruler-combined"/>, label: 'MEASURE' },
  ]

  const bottomTools = [
    { id: 'home',     icon: <IconHome />,    label: 'HOME' },
    { id: 'zoomin',   icon: <IconZoomIn />,  label: 'ZOOM IN' },
    { id: 'zoomout',  icon: <IconZoomOut />, label: 'ZOOM OUT' },
    { id: 'fit',      icon: <IconFit />,     label: 'FIT TO VIEW' },
    { id: 'expand',   icon: <IconExpand />,  label: 'FULL SCREEN' },
    { id: 'sep' },
    { id: 'daynight', icon: <IconSun2 />,    label: 'DAY / NIGHT' },
  ]

  return (
    <div className="models-page">
      <CompanyHeader
        title="MODELS"
        subtitle="3D Model"
        showChapters={false}
      />

      {/* Top bar */}
      <div className="models-topbar">
        <div className="models-topbar-left">
          <select className="phase-select">
            <option>Phase 1</option>
            <option>Phase 2</option>
            <option>Phase 3</option>
          </select>
        </div>
        <div className="models-topbar-right">
          <button
            className={`view-toggle-btn ${activeView === '3d' ? 'active' : ''}`}
            onClick={() => setActiveView('3d')}
          >
            3D VIEW
          </button>
          <button
            className={`view-toggle-btn ${activeView === 'site' ? 'active' : ''}`}
            onClick={() => setActiveView('site')}
          >
            SITE PLAN
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="models-body">
        {/* Viewer */}
        <div className="models-viewer">
          <div className="viewer-main">
            {/* Left toolbar */}
            <div className="viewer-toolbar-left">
              {leftTools.map(tool => (
                <button
                  key={tool.id}
                  className={`toolbar-btn ${activeTool === tool.id ? 'active' : ''}`}
                  onClick={() => setActiveTool(tool.id)}
                  title={tool.label}
                >
                  <span className="toolbar-btn-icon">{tool.icon}</span>
                  <span className="toolbar-btn-label">{tool.label}</span>
                </button>
              ))}
            </div>

            {/* Site plan */}
            <img src={masterplanImg} alt="Site Plan" className="site-plan-svg" />
          </div>

          {/* Bottom toolbar */}
          <div className="viewer-toolbar-bottom">
            {bottomTools.map((btn, i) =>
              btn.id === 'sep'
                ? <div key={i} className="bottom-btn-sep" />
                : (
                  <button key={btn.id} className="bottom-btn">
                    <span className="bottom-btn-icon">{btn.icon}</span>
                    {btn.label}
                  </button>
                )
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="models-panel">
          <img src={renderImg} alt="Villa Render" className="villa-render" style={{ objectFit: 'cover' }} />

          <div className="panel-content">
            <div className="villa-header">
              <h2 className="villa-title">VILLA 217</h2>
              <span className="phase-badge">Phase 1</span>
            </div>

            <table className="property-table">
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>Type D</td>
                </tr>
                <tr>
                  <td>Bedrooms</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Bathrooms</td>
                  <td>4.5</td>
                </tr>
                <tr>
                  <td>Interior Area</td>
                  <td>215.0 m²</td>
                </tr>
                <tr>
                  <td>Plot Area</td>
                  <td>1,200.0 m²</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <span className="status-dot status-dot-amber" />
                    In Construction
                  </td>
                </tr>
                <tr>
                  <td>Expected Completion</td>
                  <td>Q2 2027</td>
                </tr>
              </tbody>
            </table>

            <div className="panel-actions">
              <button className="panel-btn panel-btn-primary">
                <i className="fi fi-rr-cube"/>&nbsp; VIEW IN 3D
              </button>
              <button className="panel-btn panel-btn-outline">
                <i className="fi fi-rr-file"/>&nbsp; VIEW DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
