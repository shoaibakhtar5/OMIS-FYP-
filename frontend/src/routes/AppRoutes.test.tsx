import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { MOCK_USERS } from '../mocks/users'
import type { User } from '../types/user'
import AppRoutes from './AppRoutes'
import CurrentUserProvider from './CurrentUserProvider'

function renderAt(path: string, user: User | null) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <CurrentUserProvider initialUser={user}>
        <AppRoutes />
      </CurrentUserProvider>
    </MemoryRouter>,
  )
}

describe('AppRoutes', () => {
  it('sends a signed-out visitor to the login page', () => {
    renderAt('/meetings', null)
    expect(screen.getByRole('heading', { name: 'Sign in to OMIS' })).toBeInTheDocument()
  })

  it('sends a signed-in user from / to their role home page', () => {
    renderAt('/', MOCK_USERS.hr_manager)
    expect(screen.getByRole('heading', { name: 'Participation' })).toBeInTheDocument()
  })

  it('shows a page the role is allowed to see', () => {
    renderAt('/tasks/review', MOCK_USERS.project_manager)
    expect(screen.getByRole('heading', { name: 'Task review' })).toBeInTheDocument()
  })

  it('blocks a page the role is not allowed to see', () => {
    renderAt('/tasks/review', MOCK_USERS.employee)
    expect(screen.getByRole('heading', { name: 'No access' })).toBeInTheDocument()
  })

  it('keeps meeting content away from HR and Super Admin', () => {
    renderAt('/meetings/m-1', MOCK_USERS.hr_manager)
    expect(screen.getByRole('heading', { name: 'No access' })).toBeInTheDocument()
  })

  it('shows a 404 page for unknown paths', () => {
    renderAt('/does-not-exist', MOCK_USERS.ceo)
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
