'use client'

import { Grid2X2, Grid3X3, LayoutGrid, Rows3 } from 'lucide-react'
import { GridColumns, SortOption } from '@/types/product'

interface CategoryControlsProps {
  gridColumns: GridColumns
  setGridColumns: (cols: GridColumns) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
}

export default function CategoryControls({
  gridColumns,
  setGridColumns,
  sortBy,
  setSortBy
}: CategoryControlsProps) {
  return (
    <div className="bg-white border-y border-yellow-700/30 py-4 px-4 mb-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Grid Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">View:</span>
          <button
            onClick={() => setGridColumns(2)}
            className={`p-2 rounded cursor-pointer ${gridColumns === 2 ? 'bg-yellow-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            title="2 columns"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(3)}
            className={`p-2 rounded cursor-pointer ${gridColumns === 3 ? 'bg-yellow-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            title="3 columns"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(4)}
            className={`p-2 rounded cursor-pointer ${gridColumns === 4 ? 'bg-yellow-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            title="4 columns"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(5)}
            className={`p-2 rounded cursor-pointer ${gridColumns === 5 ? 'bg-yellow-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            title="5 columns"
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-700 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
