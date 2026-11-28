import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Select from './Select'

const options = [
  { value: 'ceo', label: 'CEO' },
  { value: 'employee', label: 'Employee' },
]

describe('Select', () => {
  it('renders the options and reports the chosen value', () => {
    const onChange = vi.fn()
    render(
      <Select label="Role" options={options} placeholder="Select a role" onChange={onChange} />,
    )
    const select = screen.getByLabelText('Role')
    expect(screen.getAllByRole('option')).toHaveLength(3)
    fireEvent.change(select, { target: { value: 'ceo' } })
    expect(onChange).toHaveBeenCalled()
    expect(select).toHaveValue('ceo')
  })
})
