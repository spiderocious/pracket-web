export const USER_ROLES = {
  STUDENT: 'student',
  TUTOR: 'tutor',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
export type VerificationStatus = 'pending' | 'verified' | 'rejected'
export type LessonFormat = 'online' | 'inPerson' | 'both'
export type CredentialType = 'degree' | 'governmentId' | 'reference'
export type CredentialStatus = 'pending' | 'approved' | 'rejected'
export type ConnectionStatus = 'open' | 'closed'
export type ReportStatus = 'pending' | 'resolved'
export type AvatarTone = 'default' | 'sage' | 'sand' | 'clay' | 'bone'

export interface User {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly role: UserRole
  readonly isActive: boolean
}

export interface TutorProfile {
  readonly id: string
  readonly userId: string
  readonly displayName: string
  readonly bio?: string
  readonly subjects?: string[]
  readonly levels?: string[]
  readonly location?: string
  readonly format?: LessonFormat
  readonly rate?: number
  readonly connectionFee?: number
  readonly photoKey?: string
  readonly verificationStatus: VerificationStatus
  readonly isListed: boolean
  readonly availability?: TutorAvailabilitySlot[]
}

export interface Credential {
  readonly id: string
  readonly tutorId: string
  readonly fileKey: string
  readonly type: CredentialType
  readonly reviewStatus: CredentialStatus
  readonly createdAt: string
}

export interface Connection {
  readonly id: string
  readonly tutorId: string
  readonly studentId: string
  readonly tutorUserId?: string
  readonly amount: number
  readonly status: ConnectionStatus
  readonly openedAt?: string
  readonly createdAt: string
}

export interface Shortlist {
  readonly id: string
  readonly userId: string
  readonly tutorIds: string[]
}


export interface Message {
  readonly id: string
  readonly connectionId: string
  readonly senderId: string
  readonly body: string
  readonly createdAt: string
}

export interface Post {
  readonly id: string
  readonly tutorId: string
  readonly title: string
  readonly body: string
  readonly isPublished: boolean
  readonly publishedAt?: string
  readonly createdAt: string
}

export interface SearchTutor {
  readonly id: string
  readonly displayName: string
  readonly subjects: string[]
  readonly levels: string[]
  readonly location: string
  readonly format: LessonFormat
  readonly rate: number
  readonly connectionFee: number
  readonly verificationStatus: VerificationStatus
  readonly yearsExperience?: number
}

export interface Report {
  readonly id: string
  readonly connectionId: string
  readonly reporterId: string
  readonly tutorId: string
  readonly reason: string
  readonly status: ReportStatus
  readonly adminNote?: string
  readonly resolvedAt?: string
  readonly createdAt: string
}

export interface TutorAvailabilitySlot {
  readonly day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  readonly from: string
  readonly to: string
}
