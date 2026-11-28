import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Modal from './Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} title="Approve task" onClose={() => {}}>
        Body
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows a labelled dialog and closes on Escape', () => {
    const onClose = vi.fn()
    render(
      <Modal open title="Approve task" onClose={onClose}>
        Body
      </Modal>,
    )
    expect(screen.getByRole('dialog', { name: 'Approve task' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
