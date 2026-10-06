import React from 'react';
import { CuratedCollection, Product } from '../types';
import { ProductCard } from './ProductCard';
import { FolderHeart, Sparkles, ArrowRight } from 'lucide-react';
import { CURATED_COLLECTIONS } from '../data/mockData';

interface CollectionsViewProps {
  collections: CuratedCollection[];
  products: Product[];
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  products,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="border-b-2 border-[#24140E] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9E3F24] uppercase tracking-wider font-bold mb-1">
          <FolderHeart size={14} />
          <span>CURATED EDITORIAL GUIDES</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
          Curated Gift Guides & Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1 max-w-2xl">
          Thematic selections thoughtfully curated by Philippine designers, cultural archivists, and editors.
        </p>
      </div>

      {/* Collections Exhibition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col) => (
          <div
            key={col.id}
            className="card-handmade group bg-[#FFFDF8] overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 w-full bg-[#EFE8DD] overflow-hidden relative border-b-2 border-[#24140E]">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#24140E] text-[#FAF7EE] text-[11px] font-mono px-2.5 py-1 rounded-[4px] border border-[#24140E] shadow-[2px_2px_0px_#FAB900]">
                  {col.itemCount} Curated Pieces
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="text-[11px] text-[#9E3F24] font-semibold uppercase font-mono">
                  Curated by {col.curator}
                </div>
                <h3 className="font-serif text-2xl text-[#24140E] font-bold leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs text-[#5C4A3E] leading-relaxed">
                  {col.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {col.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-[#FAF7EE] text-[#4A3B32] px-2 py-0.5 rounded-[4px] border-1.5 border-[#24140E]/40 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t-2 border-dashed border-[#24140E]/15 mt-4 flex items-center justify-between">
              <span className="text-xs text-[#7A6A5C] font-mono">Explore collection edit</span>
              <span className="btn-handmade-paper text-xs font-semibold text-[#9E3F24] flex items-center gap-1.5 px-3 py-1.5 shadow-[2px_2px_0px_#24140E]">
                <span>View Products</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Curated Items Strip */}
      <div className="space-y-4 pt-6 border-t-2 border-[#24140E]">
        <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FAB900] border border-[#24140E] inline-block rounded-xs" />
          Featured Pieces from Our Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((prod) => (
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
