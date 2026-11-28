import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

// All app routes live here. Role guards will be added in A-01.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
