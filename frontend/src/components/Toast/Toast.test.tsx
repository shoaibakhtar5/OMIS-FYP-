import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ToastProvider, { TOAST_DURATION_MS } from './ToastProvider'
import { useToast } from './useToast'

function SaveButton() {
  const { showToast } = useToast()
  return <button onClick={() => showToast('Task approved', 'success')}>Approve</button>
}

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows a message and removes it after the timeout', () => {
    vi.useFakeTimers()
    render(
      <ToastProvider>
        <SaveButton />
      </ToastProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }))
    expect(screen.getByText('Task approved')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(TOAST_DURATION_MS)
    })
    expect(screen.queryByText('Task approved')).not.toBeInTheDocument()
  })
})
