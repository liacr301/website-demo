import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import costaLogo from '../assets/logos/logo_costaterra.png'
import jfaLogo from '../assets/logos/logo_jfa.png'

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a10 4 0 010 20 10 4 0 010-20"/>
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#cc2222">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const MemberIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const CmsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 9h18M9 21V9"/>
  </svg>
)

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('member')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSignIn = (e) => {
    e.preventDefault()
    if (tab === 'cms') {
      navigate('/company/overview')
    } else {
      navigate('/members')
    }
  }

  return (
    <div className="login-page">
      {/* Top navigation bar */}
      <div className="login-topbar">
        <div className="login-topbar-logos">
          <div className="login-costa">
            <img src={costaLogo} alt="Costaterra" className="login-costa-img" />
          </div>
          <div className="login-divider" />
          <div className="login-jfa">
            <img src={jfaLogo} alt="JFA" className="login-jfa-img" />
          </div>
        </div>
      </div>

      {/* Hero with form */}
      <div className="login-hero">
        <div className="login-hero-overlay" />

        <div className="login-center">
          <div className="login-eyebrow">Costaterra — Member Portal</div>
          <h1 className="login-title">WINERY</h1>
          <p className="login-lots">L217 &nbsp;&nbsp;&nbsp; L215</p>

          <div className="login-card" role="main">
            <div className="login-brand-logo">
              <img src={costaLogo} alt="Costaterra" className="login-card-logo-img" />
            </div>

            <div className="login-card-heading">
              <h2 className="login-card-title">LOG IN</h2>
              <span className="login-card-sub">Access your portal</span>
            </div>

            {/* Role selector */}
            <div className="login-tabs" role="tablist" aria-label="Login type">
              <button
                role="tab"
                aria-selected={tab === 'member'}
                className={`login-tab${tab === 'member' ? ' active' : ''}`}
                onClick={() => setTab('member')}
              >
                <MemberIcon />
                Member
              </button>
              <button
                role="tab"
                aria-selected={tab === 'cms'}
                className={`login-tab${tab === 'cms' ? ' active' : ''}`}
                onClick={() => setTab('cms')}
              >
                <CmsIcon />
                CMS
              </button>
            </div>

            <form onSubmit={handleSignIn} className="login-form" noValidate>
              <div className="login-field">
                <label className="login-label" htmlFor="login-email">E-mail address</label>
                <div className="login-input-wrap">
                  <input
                    id="login-email"
                    type="email"
                    className="login-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <input
                    id="login-password"
                    type="password"
                    className="login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <div className="login-row">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                  />
                  <span>Keep me signed in</span>
                </label>
                <button type="button" className="login-forgot">Forgot password?</button>
              </div>

              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <p className="login-footer">Secured by JFA &nbsp;·&nbsp; Costaterra</p>
          </div>
        </div>
      </div>
    </div>
  )
}
