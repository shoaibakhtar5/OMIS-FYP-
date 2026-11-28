import { describe, expect, it } from 'vitest'
import { canTransition, type TaskStatus } from './task'

describe('task status transitions', () => {
  it.each<[TaskStatus, TaskStatus]>([
    ['suggested', 'approved'],
    ['suggested', 'rejected'],
    ['approved', 'in_progress'],
    ['approved', 'completed'],
    ['in_progress', 'completed'],
    ['completed', 'in_progress'],
  ])('allows %s -> %s', (from, to) => {
    expect(canTransition(from, to)).toBe(true)
  })

  it.each<[TaskStatus, TaskStatus]>([
    ['suggested', 'in_progress'],
    ['suggested', 'completed'],
    ['rejected', 'approved'],
    ['in_progress', 'approved'],
    ['completed', 'suggested'],
  ])('blocks %s -> %s', (from, to) => {
    expect(canTransition(from, to)).toBe(false)
  })
})
