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
    <div className="bg-gradient-to-r from-[#FAFAFA] to-white border-y border-gray-200 py-5 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Product Count */}
        <div className="hidden md:block text-sm text-gray-600">
          Showing all products
        </div>

        {/* Grid Toggle - Centered */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setGridColumns(2)}
            className={`p-2.5 rounded-md transition-all cursor-pointer ${
              gridColumns === 2 
                ? 'bg-[#2C1810] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-[#2C1810]'
            }`}
            title="2 columns"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(3)}
            className={`p-2.5 rounded-md transition-all cursor-pointer ${
              gridColumns === 3 
                ? 'bg-[#2C1810] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-[#2C1810]'
            }`}
            title="3 columns"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(4)}
            className={`p-2.5 rounded-md transition-all cursor-pointer ${
              gridColumns === 4 
                ? 'bg-[#2C1810] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-[#2C1810]'
            }`}
            title="4 columns"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridColumns(5)}
            className={`p-2.5 rounded-md transition-all cursor-pointer ${
              gridColumns === 5 
                ? 'bg-[#2C1810] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-[#2C1810]'
            }`}
            title="5 columns"
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>

        {/* Sort Dropdown - Right aligned */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-gray-600 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white text-[#2C1810] cursor-pointer shadow-sm hover:border-[#D4AF37] transition-colors"
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
