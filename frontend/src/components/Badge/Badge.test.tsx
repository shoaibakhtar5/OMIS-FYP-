import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Badge from './Badge'

describe('Badge', () => {
  it('renders its text with the tone class', () => {
    render(<Badge tone="success">Approved</Badge>)
    const badge = screen.getByText('Approved')
    expect(badge.className).toMatch(/success/)
  })
})
