import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import type { Role } from '../types/roles'
import AppLayout from './AppLayout'
import { homePathForRole } from './navigation'

function renderLayout(role: Role) {
  render(
    <MemoryRouter>
      <Routes>
        <Route element={<AppLayout userName="Ayesha Khan" role={role} />}>
          <Route index element={<p>Page content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
  return within(screen.getByRole('navigation', { name: 'Main' }))
}

describe('AppLayout', () => {
  it('renders the page inside the layout with the user and role', () => {
    renderLayout('ceo')
    expect(screen.getByText('Page content')).toBeInTheDocument()
    expect(screen.getByText('Ayesha Khan')).toBeInTheDocument()
    expect(screen.getByText('CEO')).toBeInTheDocument()
  })

  it('shows task review to a CEO but not to an employee', () => {
    expect(renderLayout('ceo').getByRole('link', { name: 'Task review' })).toBeInTheDocument()
  })

  it('hides reviewer and admin links from an employee', () => {
    const nav = renderLayout('employee')
    expect(nav.getByRole('link', { name: 'My tasks' })).toBeInTheDocument()
    expect(nav.queryByRole('link', { name: 'Task review' })).not.toBeInTheDocument()
    expect(nav.queryByRole('link', { name: 'Users' })).not.toBeInTheDocument()
  })

  it.each<Role>(['super_admin', 'hr_manager'])('never shows meeting links to %s', (role) => {
    const nav = renderLayout(role)
    expect(nav.queryByRole('link', { name: 'Meetings' })).not.toBeInTheDocument()
    expect(nav.queryByRole('link', { name: 'My tasks' })).not.toBeInTheDocument()
  })
})

describe('homePathForRole', () => {
  it('sends each role to a page it can see', () => {
    expect(homePathForRole('employee')).toBe('/dashboard')
    expect(homePathForRole('hr_manager')).toBe('/participation')
    expect(homePathForRole('super_admin')).toBe('/admin/users')
  })
})
