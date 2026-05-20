import './TopBar.css'
import costaLogo from '../assets/logos/logo_costaterra.png'
import jfaLogo from '../assets/logos/logo_jfa.png'

const CostaLogo = () => (
  <div className="topbar-logo">
    <img src={costaLogo} alt="Costaterra" className="topbar-costa-img" />
  </div>
)

const JFALogo = () => (
  <div className="topbar-jfa">
    <img src={jfaLogo} alt="JFA" className="topbar-jfa-img" />
  </div>
)

export default function TopBar() {
  return (
    <div className="topbar">
      <CostaLogo />
      <JFALogo />
    </div>
  )
}
