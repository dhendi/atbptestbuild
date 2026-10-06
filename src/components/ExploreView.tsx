import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, ArrowUpDown, Check, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORY_DISCOVERY } from '../data/mockData';

interface ExploreViewProps {
  products: Product[];
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (cat: ProductCategory | 'ALL') => void;
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  searchQuery: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
  searchQuery,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState<boolean>(false);
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'RELEVANT' | 'PRICE_LOW' | 'PRICE_HIGH' | 'MOST_LOVED'>('RELEVANT');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
        if (p.price > maxPrice) return false;
        if (onlyFreeShipping && !p.freeShipping) return false;
        if (selectedCondition !== 'ALL' && p.condition !== selectedCondition) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchShop = p.shop.name.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchShop || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_LOW') return a.price - b.price;
        if (sortBy === 'PRICE_HIGH') return b.price - a.price;
        if (sortBy === 'MOST_LOVED') return b.favoritesCount - a.favoritesCount;
        return 0;
      });
  }, [products, selectedCategory, maxPrice, onlyFreeShipping, selectedCondition, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8 pb-4 border-b-2 border-[#24140E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-[#7A6A5C] font-mono mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FAB900] border border-[#24140E] inline-block" />
            <span>ATBP Marketplace / {selectedCategory === 'ALL' ? 'All Finds' : selectedCategory.replace(/_/g, ' ')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
            {selectedCategory === 'ALL' ? 'Explore Independent Filipino Shops' : selectedCategory.replace(/_/g, ' ')}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1">
            Browse handcrafted goods, studio wares, and authentic vintage from small businesses across the archipelago.
          </p>
        </div>

        {/* Sorting & Filter toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden btn-handmade-paper flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-[#FFFDF8] border-2 border-[#24140E] rounded-[6px] px-3 py-1.5 text-xs font-mono shadow-[2px_2px_0px_#24140E]">
            <ArrowUpDown size={13} className="text-[#9E3F24]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#24140E] focus:outline-none cursor-pointer font-bold"
            >
              <option value="RELEVANT">Most Relevant</option>
              <option value="MOST_LOVED">Most Loved</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filter with Handmade Board Styling */}
        <aside className={`md:block space-y-6 text-xs ${mobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="card-handmade p-5 bg-[#FFFDF8] space-y-5">
            
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#24140E] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#9E3F24] inline-block rounded-xs" />
                Category
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => onSelectCategory('ALL')}
                  className={`w-full text-left py-1.5 px-2.5 rounded-[5px] cursor-pointer transition-all font-mono text-[11px] uppercase tracking-wide border-1.5 ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900] font-bold'
                      : 'bg-[#FAF7EE] text-[#24140E] border-[#24140E]/30 hover:border-[#24140E]'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORY_DISCOVERY.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id as ProductCategory)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-[5px] cursor-pointer transition-all font-mono text-[11px] uppercase tracking-wide border-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900] font-bold'
                        : 'bg-[#FAF7EE] text-[#24140E] border-[#24140E]/30 hover:border-[#24140E]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-4 border-t-2 border-dashed border-[#24140E]/15">
              <div className="flex justify-between items-center">
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#24140E]">
                  Max Price
                </h3>
                <span className="tag-handmade-yellow px-2 py-0.5 text-xs font-mono font-bold">
                  ₱{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9E3F24] cursor-pointer"
              />
            </div>

            {/* Special Offers */}
            <div className="space-y-2 pt-4 border-t-2 border-dashed border-[#24140E]/15">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#24140E]">
                Special Offers
              </h3>
              <label className="flex items-center gap-2 text-[#24140E] font-mono text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyFreeShipping}
                  onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                  className="rounded text-[#9E3F24] accent-[#9E3F24] cursor-pointer"
                />
                <span>✓ FREE Nationwide Shipping</span>
              </label>
            </div>

            {/* Item Condition */}
            <div className="space-y-2 pt-4 border-t-2 border-dashed border-[#24140E]/15">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#24140E]">
                Item Condition
              </h3>
              <div className="space-y-1.5 font-mono text-[11px]">
                {[
                  { id: 'ALL', label: 'Any Condition' },
                  { id: 'BRAND_NEW_HANDMADE', label: 'Brand New Handmade' },
                  { id: 'CURATED_VINTAGE', label: 'Curated Vintage' },
                  { id: 'GENTLY_LOVED_PRELOVED', label: 'Pre-Loved Wardrobe' },
                ].map((cond) => (
                  <label key={cond.id} className="flex items-center gap-2 text-[#4A3B32] cursor-pointer select-none">
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond.id}
                      onChange={() => setSelectedCondition(cond.id)}
                      className="accent-[#9E3F24] cursor-pointer"
                    />
                    <span>{cond.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                onSelectCategory('ALL');
                setMaxPrice(5000);
                setOnlyFreeShipping(false);
                setSelectedCondition('ALL');
              }}
              className="btn-handmade-paper w-full py-2 text-xs font-mono uppercase tracking-wider text-[#9E3F24] cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        </aside>

        {/* Right Product Grid (md: 3 cols) */}
        <main className="md:col-span-3">
          <div className="text-xs text-[#7A6A5C] font-mono mb-4 flex items-center justify-between">
            <div>
              Showing <strong className="text-[#24140E] tag-handmade-yellow px-1.5 py-0.2">{filtered.length}</strong> items
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
            <span className="text-[11px] text-[#2E4A3D] font-bold">
              🌿 All items from independent small shops
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="card-handmade p-12 text-center bg-[#FFFDF8] space-y-4">
              <p className="font-serif text-2xl text-[#24140E]">No items match your selected filters.</p>
              <p className="text-xs text-[#7A6A5C] font-mono">Try expanding your price range or choosing another craft category.</p>
              <button
                onClick={() => {
                  onSelectCategory('ALL');
                  setMaxPrice(5000);
                  setOnlyFreeShipping(false);
                }}
                className="btn-handmade-gold text-xs px-5 py-2.5 font-mono uppercase tracking-wider cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isSaved={savedProductIds.has(prod.id)}
                  onToggleSave={onToggleSave}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
