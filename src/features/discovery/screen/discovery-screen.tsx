import { useState } from 'react'
import { DiscoveryHeader } from './parts/discovery-header'
import { DiscoveryFilters } from './parts/discovery-filters'
import { DiscoveryResults } from './parts/discovery-results'
import { FilterSheet } from './parts/filter-sheet'
import { useDiscoveryFilters } from '../helpers/use-discovery-filters'
import { useSearch } from '../api/use-search'

export function DiscoveryScreen() {
  const { filters, setFilter } = useDiscoveryFilters()
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const searchQuery = useSearch(filters)

  const tutors = searchQuery.data?.data ?? []
  const total = searchQuery.data?.meta.total ?? 0
  const totalPages = searchQuery.data?.meta.totalPages ?? 1

  return (
    <div className="min-h-screen bg-paper">
      <DiscoveryHeader
        searchValue={filters.q}
        onSearchChange={val => setFilter('q', val)}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <DiscoveryFilters
          filters={filters}
          onFilterChange={(key, val) => setFilter(key, val)}
          onOpenSheet={() => setFilterSheetOpen(true)}
          resultCount={total}
        />
        <div className="pb-16">
          <DiscoveryResults
            tutors={tutors}
            isLoading={searchQuery.isLoading}
            isFetching={searchQuery.isFetching}
            hasQuery={!!(filters.q || filters.level)}
            page={filters.page}
            totalPages={totalPages}
            total={total}
            onPageChange={page => { setFilter('page', page); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            onQuickSearch={q => { setFilter('q', q); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          />
        </div>
      </div>
      <FilterSheet
        open={filterSheetOpen}
        filters={filters}
        onFilterChange={(key, val) => setFilter(key, val)}
        onClose={() => setFilterSheetOpen(false)}
      />
    </div>
  )
}