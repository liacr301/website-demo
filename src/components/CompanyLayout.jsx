import { Outlet } from 'react-router-dom'
import CompanySidebar from './CompanySidebar'
import TopBar from './TopBar'
import './Layout.css'

export default function CompanyLayout() {
  return (
    <div className="app-shell">
      <div className="app-main-col">
        <TopBar />
        <div className="app-body">
          <CompanySidebar />
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
