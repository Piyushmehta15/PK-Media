// ============================================================
// PK MEDIA OS — Router
// Mounted at /app/* in App.tsx, so ALL paths here are RELATIVE
// to /app. (/app/login -> "login", /app/dashboard -> "dashboard")
// Protected routing + role-based permission gates.
// ============================================================
import { Routes, Route, Navigate } from 'react-router-dom'
import { Shell } from './components/Shell'
import { ProtectedRoute, RequirePermission } from './auth/ProtectedRoute'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Influencers from './pages/Influencers'
import Brands from './pages/Brands'
import Campaigns from './pages/Campaigns'
import Outreach from './pages/Outreach'
import Proposals from './pages/Proposals'
import Finance from './pages/Finance'
import Deliverables from './pages/Deliverables'
import Analytics from './pages/Analytics'
import AITools from './pages/AITools'
import Documents from './pages/Documents'
import Calendar from './pages/Calendar'
import Team from './pages/Team'
import Settings from './pages/Settings'

export default function OsApp() {
  return (
    <Routes>
{/* Public login (not wrapped in ProtectedRoute) — reached at /app/login */}
      <Route path="login" element={<Login />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Protected shell layout — all inner routes are nested */}
      <Route element={<ProtectedRoute><Shell /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="influencers" element={<RequirePermission permission="influencers.view"><Influencers /></RequirePermission>} />
        <Route path="brands" element={<RequirePermission permission="brands.view"><Brands /></RequirePermission>} />
        <Route path="campaigns" element={<RequirePermission permission="campaigns.view"><Campaigns /></RequirePermission>} />
        <Route path="outreach" element={<RequirePermission permission="outreach.view"><Outreach /></RequirePermission>} />
        <Route path="proposals" element={<RequirePermission permission="proposals.view"><Proposals /></RequirePermission>} />
        <Route path="finance" element={<RequirePermission permission="finance.view"><Finance /></RequirePermission>} />
        <Route path="deliverables" element={<RequirePermission permission="deliverables.view"><Deliverables /></RequirePermission>} />
        <Route path="analytics" element={<RequirePermission permission="analytics.view"><Analytics /></RequirePermission>} />
        <Route path="ai" element={<RequirePermission permission="campaigns.view"><AITools /></RequirePermission>} />
        <Route path="documents" element={<RequirePermission permission="documents.view"><Documents /></RequirePermission>} />
        <Route path="calendar" element={<RequirePermission permission="calendar.view"><Calendar /></RequirePermission>} />
        <Route path="team" element={<RequirePermission permission="team.view"><Team /></RequirePermission>} />
        <Route path="settings" element={<RequirePermission permission="settings.manage"><Settings /></RequirePermission>} />
      </Route>

      {/* Fallback inside OS */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  )
}
