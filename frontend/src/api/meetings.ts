import type { Meeting } from '../types/meeting'
import { apiRequest } from './client'

/** Meetings in the signed-in user's organization. */
export function listMeetings() {
  return apiRequest<Meeting[]>('/meetings')
}

export function getMeeting(id: string) {
  return apiRequest<Meeting>(`/meetings/${encodeURIComponent(id)}`)
}
