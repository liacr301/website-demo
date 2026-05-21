import { useState } from 'react'
import Header from '../components/Header'
import './ThreeDModel.css'
import model3d from '../assets/my_home_members/WhatsApp Image 2026-05-21 at 15.39.10.jpeg'
import floorPlan from '../assets/my_home_members/WhatsApp Image 2026-05-21 at 15.39.33.jpeg'

const layers = [
  { id: 'arch',      label: 'Architectural', icon: <i className="fi fi-rr-square"/> },
  { id: 'struct',    label: 'Structural',     icon: <i className="fi fi-rr-apps"/>   },
  { id: 'mep',       label: 'MEP',            icon: <i className="fi fi-rr-bolt"/>   },
  { id: 'furniture', label: 'Furniture',      icon: <i className="fi fi-rr-layers"/> },
  { id: 'site',      label: 'Site',           icon: <i className="fi fi-rr-leaf"/>   },
]

const tools3d  = ['Select','Pan','Orbit','Zoom','Fit All','Section','Measure']
const toolsBot = ['Home','Fit All','Orbit','Pan','Zoom','First Person','Section Box','Explode','Measure','Properties','Layers','Settings']

const ToolIcon3D = ({ label }) => {
  const icons = {
    Select:    'fi-rr-cursor',
    Pan:       'fi-rr-hand',
    Orbit:     'fi-rr-undo',
    Zoom:      'fi-rr-search',
    'Fit All': 'fi-rr-expand',
    Section:   'fi-rr-cube',
    Measure:   'fi-rr-vector-alt',
  }
  return <span className="tool3d-icon"><i className={`fi ${icons[label] || 'fi-rr-circle'}`}/></span>
}

const ToolIconBot = ({ label }) => {
  const icons = {
    Home:           'fi-rr-home',
    'Fit All':      'fi-rr-expand',
    Orbit:          'fi-rr-undo',
    Pan:            'fi-rr-hand',
    Zoom:           'fi-rr-search',
    'First Person': 'fi-rr-user',
    'Section Box':  'fi-rr-cube',
    Explode:        'fi-rr-arrows-from-line',
    Measure:        'fi-rr-vector-alt',
    Properties:     'fi-rr-info',
    Layers:         'fi-rr-layers',
    Settings:       'fi-rr-settings',
  }
  return <span className="toolbot-icon"><i className={`fi ${icons[label] || 'fi-rr-circle'}`}/></span>
}

export default function ThreeDModel() {
  const [activeView, setActiveView] = useState('3d')
  const [visibleLayers, setVisibleLayers] = useState(new Set(layers.map(l => l.id)))
  const [activeTool, setActiveTool] = useState('Orbit')

  const toggleLayer = (id) => {
    setVisibleLayers(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="threed-page">
      <Header title="VILLA 27" subtitle="3D Model" />
      <div className="threed-layout">
        {/* Viewer */}
        <div className="threed-viewer-wrap">
          <div className="threed-left-tools">
            {tools3d.map(t => (
              <button
                key={t}
                className={`tool3d-btn${activeTool === t ? ' active' : ''}`}
                onClick={() => setActiveTool(t)}
                title={t}
              >
                <ToolIcon3D label={t} />
                <span>{t}</span>
              </button>
            ))}
          </div>

          <div className="threed-canvas">
            <div className="threed-model-placeholder">
              <img
                src={activeView === 'floor' ? floorPlan : model3d}
                alt={activeView === 'floor' ? 'Floor Plan' : '3D Model'}
                className="threed-model-img"
              />
            </div>
          </div>

          <div className="threed-bottom-toolbar">
            {toolsBot.map(t => (
              <button
                key={t}
                className={`toolbot-btn${activeTool === t ? ' active' : ''}`}
                onClick={() => setActiveTool(t)}
                title={t}
              >
                <ToolIconBot label={t} />
                <span>{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="threed-right-panel">
          <div className="threed-view-toggle">
            <button
              className={`view-toggle-btn${activeView === '3d' ? ' active' : ''}`}
              onClick={() => setActiveView('3d')}
            >
              <i className="fi fi-rr-cube"/> 3D VIEW
            </button>
            <button
              className={`view-toggle-btn${activeView === 'floor' ? ' active' : ''}`}
              onClick={() => setActiveView('floor')}
            >
              <i className="fi fi-rr-square"/> FLOOR PLAN
            </button>
          </div>

          <div className="threed-panel-section">
            <div className="threed-panel-title">FLOOR PLAN</div>
            <div className="threed-panel-label">Select level</div>
            <select className="filter-select" style={{width:'100%', marginBottom:12}}>
              <option>Level 0 – Ground Floor</option>
              <option>Level 1 – First Floor</option>
              <option>Roof</option>
            </select>
            <div className="floor-plan-preview">
              <img src={floorPlan} alt="Floor Plan" className="floor-plan-img" />
            </div>
          </div>

          <div className="threed-panel-section">
            <div className="threed-panel-title">LAYERS</div>
            {layers.map(l => (
              <div key={l.id} className="layer-row">
                <span className="layer-icon">{l.icon}</span>
                <span className="layer-label">{l.label}</span>
                <button
                  className={`layer-eye${visibleLayers.has(l.id) ? ' visible' : ''}`}
                  onClick={() => toggleLayer(l.id)}
                  title={visibleLayers.has(l.id) ? 'Hide' : 'Show'}
                >
                  {visibleLayers.has(l.id) ? <i className="fi fi-rr-eye"/> : <i className="fi fi-rr-eye-slash"/>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
