import React from 'react';
import { Product, SellerShop } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, Star, Store, TrendingUp } from 'lucide-react';

interface TrendingViewProps {
  products: Product[];
  shops: SellerShop[];
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const TrendingView: React.FC<TrendingViewProps> = ({
  products,
  shops,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  // Sort by favorites count
  const trendingProducts = [...products].sort((a, b) => b.favoritesCount - a.favoritesCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="border-b-2 border-[#24140E] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9E3F24] uppercase tracking-wider font-bold mb-1">
          <Flame size={14} />
          <span>TRENDING ACROSS PHILIPPINE SHOPS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
          Most-Loved Finds This Week
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1 max-w-2xl">
          Items receiving the most saves, inquiries, and orders from shoppers across the archipelago.
        </p>
      </div>

      {/* Featured Trending Shops Row */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#FAB900] border border-[#24140E] inline-block rounded-xs" />
          Trending Independent Small Shops
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shops.slice(0, 3).map((shop) => (
            <div
              key={shop.id}
              className="card-handmade bg-[#FFFDF8] p-4 flex items-center gap-3.5"
            >
              <img
                src={shop.avatar}
                alt={shop.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#24140E] shadow-[2px_2px_0px_#24140E] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#24140E] truncate font-mono">{shop.name}</h3>
                  {shop.badge && (
                    <span className="tag-handmade-yellow text-[9px] px-1 py-0.2 uppercase font-mono">★ Star</span>
                  )}
                </div>
                <p className="text-[11px] text-[#7A6A5C] font-mono truncate">{shop.location}</p>
                <div className="flex items-center gap-2 text-[10px] text-[#5C4A3E] mt-1 font-mono">
                  <span>★ {shop.rating}</span>
                  <span>·</span>
                  <span>{shop.salesCount} sales</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#9E3F24] inline-block rounded-xs" />
          Trending Products (Top Saves)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => (
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
      </div>

    </div>
  );
};
