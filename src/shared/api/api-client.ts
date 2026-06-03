import type { ApiEnvelope, ApiError } from '../types/api'

const BASE_URL = (import.meta.env['VITE_API_URL'] as string | undefined) ?? 'http://localhost:8086/api'

function getToken(): string | null {
  return localStorage.getItem('pracket_token')
}

function buildHeaders(body?: unknown): HeadersInit {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!body) delete headers['Content-Type']
  return headers
}

export class ApiRequestError extends Error {
  readonly code: string
  readonly fieldErrors?: Record<string, string>
  readonly status?: number

  constructor(code: string, message: string, fieldErrors?: Record<string, string>, status?: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.code = code
    this.fieldErrors = fieldErrors
    this.status = status
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(body),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) return undefined as unknown as T

  const json = await res.json() as ApiEnvelope<T> | { error: ApiError }

  if (!res.ok) {
    const err = (json as { error: ApiError }).error
    throw new ApiRequestError(err.code, err.message, err.field_errors, res.status)
  }

  return (json as ApiEnvelope<T>).data
}

async function requestRaw<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { headers: buildHeaders() })
  if (!res.ok) {
    const json = await res.json() as { error: ApiError }
    const err = json.error
    throw new ApiRequestError(err.code, err.message, err.field_errors, res.status)
  }
  return res.json() as Promise<T>
}

export const apiClient = {
  get: <T>(path: string): Promise<T> => request<T>('GET', path),
  getPaginated: <T>(path: string): Promise<T> => requestRaw<T>(path),
  post: <T>(path: string, body: unknown): Promise<T> => request<T>('POST', path, body),
  patch: <T>(path: string, body: unknown): Promise<T> => request<T>('PATCH', path, body),
  delete: <T>(path: string): Promise<T> => request<T>('DELETE', path),
}

export async function to<T>(promise: Promise<T>): Promise<[null, T] | [Error, null]> {
  try {
    const result = await promise
    return [null, result]
  } catch (err) {
    return [err instanceof Error ? err : new Error(String(err)), null]
  }
}
