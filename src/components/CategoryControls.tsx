'use client'

import { Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react'
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
    <div className="bg-[#FAFAFA] border-y border-gray-200 py-6 px-6 mb-12">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Empty left space */}
        <div className="flex-1"></div>

        {/* Grid Toggle - Centered */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGridColumns(2)}
            className={`p-2.5 rounded transition-all cursor-pointer ${gridColumns === 2 ? 'bg-[#2C1810] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'}`}
            title="2 columns"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(3)}
            className={`p-2.5 rounded transition-all cursor-pointer ${gridColumns === 3 ? 'bg-[#2C1810] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'}`}
            title="3 columns"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(4)}
            className={`p-2.5 rounded transition-all cursor-pointer ${gridColumns === 4 ? 'bg-[#2C1810] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'}`}
            title="4 columns"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Sort Dropdown - Right aligned */}
        <div className="flex-1 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-[#2C1810] cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Sort by: Price Low to High</option>
            <option value="price-high">Sort by: Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
