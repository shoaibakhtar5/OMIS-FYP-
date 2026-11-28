import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('links the label to the input and reports changes', () => {
    const onChange = vi.fn()
    render(<Input label="Email" onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('shows the error and marks the input invalid', () => {
    render(<Input label="Email" error="Email is required" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Email is required')
  })
})
