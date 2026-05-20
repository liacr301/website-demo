import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-shell">
      <div className="app-main-col">
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
