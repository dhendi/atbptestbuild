import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Tag, Sparkles, Percent, Ticket } from 'lucide-react';

interface DealsViewProps {
  products: Product[];
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({
  products,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  // Filter for products that have originalPrice or discounted prices
  const dealsProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="border-b-2 border-[#24140E] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#2E4A3D] uppercase tracking-wider font-bold mb-1">
          <Percent size={14} />
          <span>SULIT DEALS & SELLER DISCOUNTS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
          Special Offers from Small Businesses
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1 max-w-2xl">
          Limited-time maker markdowns, studio sample clearance, and bundle discounts directly from independent sellers.
        </p>
      </div>

      {/* Promo Voucher Cards Banner (Handmade Tickets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-handmade bg-[#FFFDF8] p-5 flex items-start gap-4">
          <div className="p-2.5 rounded-[8px] bg-[#2E4A3D] text-[#FAF7EE] border-2 border-[#24140E] shadow-[2px_2px_0px_#24140E]">
            <Ticket size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="tag-handmade-yellow text-xs px-2.5 py-0.5 font-mono uppercase">
                SALAMAT10
              </span>
              <span className="text-[11px] font-mono text-[#2E4A3D] font-bold">✓ 10% OFF</span>
            </div>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              Use code <strong className="text-[#24140E]">SALAMAT10</strong> at checkout for 10% off any order over ₱1,000.
            </p>
          </div>
        </div>

        <div className="card-handmade bg-[#FFFDF8] p-5 flex items-start gap-4">
          <div className="p-2.5 rounded-[8px] bg-[#9E3F24] text-[#FAF7EE] border-2 border-[#24140E] shadow-[2px_2px_0px_#24140E]">
            <Ticket size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="tag-handmade-yellow text-xs px-2.5 py-0.5 font-mono uppercase">
                UNANGPILI
              </span>
              <span className="text-[11px] font-mono text-[#9E3F24] font-bold">✓ ₱150 OFF</span>
            </div>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              First time shopping on ATBP? Enter <strong className="text-[#24140E]">UNANGPILI</strong> for ₱150 off your first purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Discounted Product Grid */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#9E3F24] inline-block rounded-xs" />
          Active Markdowns ({dealsProducts.length} items)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsProducts.map((prod) => (
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
