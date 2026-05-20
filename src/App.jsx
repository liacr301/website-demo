import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import ThreeDModel from './pages/ThreeDModel'
import Photos from './pages/Photos'
import FinishBook from './pages/FinishBook'
import CPU from './pages/CPU'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

import CompanyLayout from './components/CompanyLayout'
import CompanyOverview from './pages/company/CompanyOverview'
import Procurement from './pages/company/Procurement'
import Logistics from './pages/company/Logistics'
import Metrics from './pages/company/Metrics'
import Planning from './pages/company/Planning'
import Dashboard from './pages/company/Dashboard'
import Models from './pages/company/Models'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Member role */}
        <Route element={<Layout />}>
          <Route path="/members"     element={<Overview />} />
          <Route path="/3d"          element={<ThreeDModel />} />
          <Route path="/photos"      element={<Photos />} />
          <Route path="/finish-book" element={<FinishBook />} />
          <Route path="/cpu"         element={<CPU />} />
          <Route path="/documents"   element={<Documents />} />
          <Route path="/settings"    element={<Settings />} />
        </Route>

        {/* Company / CMS role */}
        <Route element={<CompanyLayout />}>
          <Route path="/company/overview"   element={<CompanyOverview />} />
          <Route path="/company/procurement" element={<Procurement />} />
          <Route path="/company/logistics"  element={<Logistics />} />
          <Route path="/company/metrics"    element={<Metrics />} />
          <Route path="/company/planning"   element={<Planning />} />
          <Route path="/company/dashboard"  element={<Dashboard />} />
          <Route path="/company/models"     element={<Models />} />
          <Route path="/company/settings"   element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
