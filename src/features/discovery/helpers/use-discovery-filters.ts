import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export interface DiscoveryFilters {
  readonly q: string
  readonly level: string
  readonly format: string
  readonly minRate: number
  readonly maxRate: number
  readonly sort: 'relevance' | 'price' | 'price_desc'
  readonly page: number
}

export function useDiscoveryFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: DiscoveryFilters = {
    q: searchParams.get('q') ?? '',
    level: searchParams.get('level') ?? '',
    format: searchParams.get('format') ?? '',
    minRate: Number(searchParams.get('minRate') ?? 0),
    maxRate: Number(searchParams.get('maxRate') ?? 0),
    sort: (searchParams.get('sort') as DiscoveryFilters['sort']) ?? 'relevance',
    page: Number(searchParams.get('page') ?? 1),
  }

  const setFilter = useCallback(
    (key: keyof DiscoveryFilters, value: string | number) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        if (value === '' || value === 0) {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
        if (key !== 'page') next.set('page', '1')
        return next
      }, { replace: true })
    },
    [setSearchParams]
  )

  return { filters, setFilter }
}
