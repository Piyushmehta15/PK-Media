import { Routes, Route } from 'react-router-dom'
import OsApp from './os/OsApp'
import { HomePage } from './website/pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/app/*" element={<OsApp />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
