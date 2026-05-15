import type { DiscoveryFilters } from './use-discovery-filters'

export function buildSearchParams(filters: DiscoveryFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.q) params.set('subject', filters.q)
  if (filters.level) params.set('level', filters.level)
  if (filters.format) params.set('format', filters.format)
  if (filters.minRate > 0) params.set('minRate', String(filters.minRate))
  if (filters.maxRate > 0) params.set('maxRate', String(filters.maxRate))
  params.set('sort', filters.sort)
  params.set('page', String(filters.page))
  params.set('limit', '20')
  return params
}
