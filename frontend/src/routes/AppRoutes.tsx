import { Route, Routes } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'

// All app routes live here. The full route table and role guards come next.
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout userName="Demo User" role="ceo" />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
