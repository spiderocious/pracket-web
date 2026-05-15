export interface ApiError {
  readonly code: string
  readonly message: string
  readonly field_errors?: Record<string, string>
}

export interface ApiEnvelope<T> {
  readonly data: T
}

export interface PaginatedMeta {
  readonly page: number
  readonly total: number
  readonly totalPages: number
}

export interface PaginatedEnvelope<T> {
  readonly data: T[]
  readonly meta: PaginatedMeta
}
