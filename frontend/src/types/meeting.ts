/** How the audio got into OMIS. The two paths are processed differently. */
export type MeetingSource = 'live' | 'upload'

/*
  Processing status. Live meetings skip "diarizing" and
  "awaiting_speaker_mapping" because each participant has their own track.
  Names to be aligned with the backend schema (B-01).
*/
export type MeetingStatus =
  | 'scheduled'
  | 'live'
  | 'transcribing'
  | 'diarizing'
  | 'awaiting_speaker_mapping'
  | 'analyzing'
  | 'completed'
  | 'failed'

export interface Meeting {
  id: string
  organizationId: string
  title: string
  source: MeetingSource
  status: MeetingStatus
  /** ISO date-time. */
  scheduledAt: string
  hostId: string
  participantIds: string[]
}

export const MEETING_STATUS_LABELS: Record<MeetingStatus, string> = {
  scheduled: 'Scheduled',
  live: 'Live',
  transcribing: 'Transcribing',
  diarizing: 'Diarizing',
  awaiting_speaker_mapping: 'Awaiting speaker mapping',
  analyzing: 'Analyzing',
  completed: 'Completed',
  failed: 'Failed',
}
