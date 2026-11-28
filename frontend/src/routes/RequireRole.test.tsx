import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { MOCK_USERS } from '../mocks/users'
import type { Role } from '../types/roles'
import type { User } from '../types/user'
import CurrentUserProvider from './CurrentUserProvider'
import RequireRole from './RequireRole'

function renderGuard(user: User | null, roles?: Role[]) {
  render(
    <MemoryRouter initialEntries={['/secret']}>
      <CurrentUserProvider initialUser={user}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireRole roles={roles}>
                <p>Secret page</p>
              </RequireRole>
            }
          />
          <Route path="/login" element={<p>Login page</p>} />
          <Route path="/unauthorized" element={<p>No access page</p>} />
        </Routes>
      </CurrentUserProvider>
    </MemoryRouter>,
  )
}

describe('RequireRole', () => {
  it('redirects to login when signed out', () => {
    renderGuard(null, ['ceo'])
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('redirects to unauthorized when the role is not allowed', () => {
    renderGuard(MOCK_USERS.employee, ['ceo', 'project_manager'])
    expect(screen.getByText('No access page')).toBeInTheDocument()
  })

  it('renders the page when the role is allowed', () => {
    renderGuard(MOCK_USERS.ceo, ['ceo', 'project_manager'])
    expect(screen.getByText('Secret page')).toBeInTheDocument()
  })

  it('allows any signed-in user when no roles are given', () => {
    renderGuard(MOCK_USERS.hr_manager)
    expect(screen.getByText('Secret page')).toBeInTheDocument()
  })
})
