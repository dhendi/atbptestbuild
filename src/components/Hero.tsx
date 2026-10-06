import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, HeartHandshake, Truck, Store, Tag } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORY_DISCOVERY } from '../data/mockData';

interface HeroProps {
  onSearch: (q: string) => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onExploreAll: () => void;
  onOpenStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onSelectCategory,
  onExploreAll,
  onOpenStudio,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="border-b-2 border-[#24140E] bg-[#FAF7EE]">
      
      {/* Editorial Hero with Weave Graph Paper Texture */}
      <section className="relative overflow-hidden px-4 md:px-6 pt-10 pb-16 weave-texture border-b-2 border-[#24140E]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-8">
          
          {/* Left Column: Exact Headline, Subtitle, and Search Form */}
          <div className="relative z-10 space-y-6">
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-[#24140E]">
              Everything Filipino, <em className="italic text-[#9E3F24]">at iba pa.</em>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#5C4A3E] md:text-lg">
              Handmade, vintage, pre-loved, and collectible finds from sellers across the Philippines.
            </p>

            {/* Hand-Crafted Search Ledger Form */}
            <form onSubmit={handleSubmit} className="mt-6 max-w-lg">
              <div className="search-handmade-ledger relative flex items-center p-1.5 transition-all">
                <div className="flex items-center pl-3 pr-2 text-[#9E3F24] shrink-0 font-mono text-xs font-bold gap-1.5 border-r-2 border-[#24140E]/20 mr-2 py-1">
                  <Search size={16} strokeWidth={2.5} />
                  <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Find</span>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, sellers, or shops"
                  className="h-10 w-full bg-transparent text-sm text-[#24140E] placeholder:text-[#8C7A6B] focus:outline-none font-medium px-1"
                />
                <button
                  type="submit"
                  className="btn-handmade-gold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 shrink-0 font-mono flex items-center gap-1.5 ml-1"
                >
                  <span>Search</span>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>
              </div>

              {/* Hand-stitched quick tags below the search bar */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-[#7A6A5C] uppercase tracking-wider font-bold">Popular:</span>
                {['Inabel Weaves', 'Marikina Leather', 'Stoneware Mugs', 'Capiz Lamps', 'Vintage Barong'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onSearch(tag)}
                    className="btn-handmade-stitch text-[11px] font-mono px-2 py-0.5 hover:bg-[#FAF0E1] text-[#24140E] transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Hand-Made CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onExploreAll}
                className="btn-handmade-dark px-6 py-3 text-xs tracking-wider uppercase font-mono"
              >
                <span>Start exploring</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={onOpenStudio}
                className="btn-handmade-paper px-6 py-3 text-xs tracking-wider uppercase font-mono"
              >
                <Store size={15} className="text-[#9E3F24]" />
                <span>Sell on ATBP</span>
              </button>
            </div>

          </div>

          {/* Right Column: Tilted Authentic Artisan Photo Collage with Washi Tape and Ink Borders */}
          <div className="relative hidden h-[440px] md:block select-none">
            {/* Top Left Tilted Photo: Inabel weave */}
            <div className="tilt-l absolute left-2 top-0 h-52 w-42 overflow-hidden rounded-[10px] border-2 border-[#24140E] shadow-[4px_4px_0px_#24140E] bg-[#EFE8DD]">
              <div className="washi-tape-strip absolute -top-1 left-10 w-16 h-4 rotate-[-4deg] z-10 border-t border-b border-[#24140E]/20" />
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                alt="Inabel Handwoven Throw"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Center Tilted Photo: Marikina Leather Tote */}
            <div className="tilt-r absolute left-36 top-14 h-64 w-52 overflow-hidden rounded-[12px] border-2 border-[#24140E] shadow-[5px_5px_0px_#24140E] bg-[#EFE8DD] z-10">
              <div className="washi-tape-strip absolute -top-1 right-12 w-18 h-4 rotate-[3deg] z-20 border-t border-b border-[#24140E]/20" />
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
                alt="Marikina Leather Tote"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Top Right Tilted Photo: Stoneware Mug */}
            <div className="tilt-r-sm absolute right-2 top-2 h-46 w-42 overflow-hidden rounded-[10px] border-2 border-[#24140E] shadow-[4px_4px_0px_#24140E] bg-[#EFE8DD]">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Stoneware Clay Mug"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Right Tilted Photo: Vintage Jacket */}
            <div className="tilt-l-sm absolute bottom-2 right-8 h-56 w-46 overflow-hidden rounded-[12px] border-2 border-[#24140E] shadow-[5px_5px_0px_#24140E] bg-[#EFE8DD]">
              <div className="washi-tape-strip absolute -bottom-1 left-8 w-16 h-4 rotate-[-2deg] z-10 border-t border-b border-[#24140E]/20" />
              <img
                src="https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=600&q=80"
                alt="Vintage Chore Coat"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Authentic Tactile Manila Tag Pin matching the Logo Tag */}
            <div className="tilt-r absolute bottom-10 left-12 z-20 tag-handmade-yellow px-3.5 py-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white border border-[#24140E] inline-block" />
              <span className="font-mono text-[11px] font-bold text-[#24140E] tracking-wider uppercase">
                handmade · 1 of 1
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Curated Category Bubbles & Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Category Bubbles with Hand-Stamped Ink Borders */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A6A5C] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#9E3F24] inline-block rounded-xs" />
              Explore by Category
            </h2>
            <button
              onClick={onExploreAll}
              className="text-xs text-[#9E3F24] hover:underline font-mono font-bold cursor-pointer"
            >
              Shop all finds →
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {CATEGORY_DISCOVERY.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#24140E] shadow-[2.5px_2.5px_0px_#24140E] group-hover:shadow-[3.5px_3.5px_0px_#FAB900] group-hover:-translate-y-0.5 transition-all duration-200 bg-[#EFE8DD]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif text-xs sm:text-sm text-[#24140E] group-hover:text-[#9E3F24] transition-colors mt-2.5 leading-tight font-medium">
                  {cat.name}
                </span>
                <span className="hidden sm:block text-[10px] text-[#7A6A5C] font-mono mt-0.5 line-clamp-1">
                  {cat.tagline}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clean Editorial Trust Bar (Using 'Nationwide Shipping') with Handmade Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t-2 border-dashed border-[#24140E]/20 text-xs">
          <div className="card-handmade p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#9E3F24] text-[#FAF7EE] border-2 border-[#24140E] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#24140E]">
              <HeartHandshake size={18} />
            </div>
            <div>
              <strong className="block text-[#24140E] font-serif text-base">Independent Small Businesses</strong>
              <span className="text-[#5C4A3E] text-xs leading-relaxed">Direct connection with genuine Philippine artisans, cooperatives, and collectors.</span>
            </div>
          </div>

          <div className="card-handmade p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#2E4A3D] text-[#FAF7EE] border-2 border-[#24140E] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#24140E]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <strong className="block text-[#24140E] font-serif text-base">ATBP Buyer Protection</strong>
              <span className="text-[#5C4A3E] text-xs leading-relaxed">Full refund if your order does not arrive as described by the seller.</span>
            </div>
          </div>

          <div className="card-handmade p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#FAB900] text-[#24140E] border-2 border-[#24140E] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#24140E]">
              <Truck size={18} />
            </div>
            <div>
              <strong className="block text-[#24140E] font-serif text-base">Nationwide Shipping</strong>
              <span className="text-[#5C4A3E] text-xs leading-relaxed">Reliable parcel delivery across Luzon, Visayas, and Mindanao.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
