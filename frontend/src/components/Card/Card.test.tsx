import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './Card'

describe('Card', () => {
  it('shows the title, actions and content', () => {
    render(
      <Card title="Upcoming meetings" actions={<button>New</button>}>
        <p>3 this week</p>
      </Card>,
    )
    expect(screen.getByRole('heading', { name: 'Upcoming meetings' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument()
    expect(screen.getByText('3 this week')).toBeInTheDocument()
  })
})
