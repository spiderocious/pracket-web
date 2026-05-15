import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { SearchTutor } from '@shared/types'
import type { PaginatedEnvelope } from '@shared/types'
import { buildSearchParams } from '../helpers/build-search-params'
import type { DiscoveryFilters } from '../helpers/use-discovery-filters'

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export function useSearch(filters: DiscoveryFilters) {
  const debouncedQuery = useDebouncedValue(filters.q, 400)

  const effectiveFilters: DiscoveryFilters = { ...filters, q: debouncedQuery }

  return useQuery({
    queryKey: [
      'search',
      debouncedQuery,
      filters.level,
      filters.format,
      filters.minRate,
      filters.maxRate,
      filters.sort,
      filters.page,
    ],
    queryFn: () => {
      const params = buildSearchParams(effectiveFilters)
      return apiClient.getPaginated<PaginatedEnvelope<SearchTutor>>(
        `${Endpoints.SEARCH}?${params.toString()}`
      )
    },
    placeholderData: prev => prev,
  })
}
