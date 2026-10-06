import React from 'react';
import { ShieldCheck, RefreshCw, Sparkles, MapPin, Store, HeartHandshake } from 'lucide-react';
import { PageView, ProductCategory } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory: (cat: ProductCategory | 'ALL') => void;
  onOpenLocation: () => void;
  currentLocation: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenLocation,
  currentLocation,
}) => {
  return (
    <footer className="bg-[#1E1B18] text-[#FAF8F5] border-t border-[#2C2622]/20 pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Core Principles Grid (Etsy-style marketplace promises) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-full bg-[#9E432A]/20 text-[#D4A359] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">ATBP Purchase Protection</h4>
              <p className="text-xs text-[#A69788] mt-1 leading-relaxed">
                Shop with confidence. If an item doesn't arrive, arrives damaged, or differs from the description, our support escrow team makes it right.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-full bg-[#2E4A3D]/25 text-[#7BB39E] flex items-center justify-center shrink-0">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">Direct Support for Small Businesses</h4>
              <p className="text-xs text-[#A69788] mt-1 leading-relaxed">
                From Abra handloom cooperatives to Betis woodcarvers and Marikina cordwainers, transactions support independent families and studios.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-full bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">Circular Vintage & Ukay Archive</h4>
              <p className="text-xs text-[#A69788] mt-1 leading-relaxed">
                Extending the life of authentic 70s-90s vintage garments, restored Quiapo horology, and heirloom furniture across the archipelago.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-[#FAF7EE] p-2 rounded-[8px] border-2 border-[#FAF7EE] shadow-[3px_3px_0px_#FAB900] inline-block">
                <Logo size="sm" />
              </div>
            </div>
            <p className="text-[#A69788] max-w-sm leading-relaxed">
              The curated Philippine marketplace for handcrafted ceramics, woven textiles, Marikina leather, and pre-loved archives from small businesses.
            </p>
            <div className="pt-2 text-[#FAB900] flex items-center gap-1.5 cursor-pointer hover:underline font-mono" onClick={onOpenLocation}>
              <MapPin size={13} />
              <span>Delivering to: <strong className="text-white underline decoration-[#FAB900] decoration-2">{currentLocation}</strong> (Change)</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-mono uppercase tracking-wider text-[#D4A359] font-semibold mb-3">
              Shop Categories
            </h5>
            <ul className="space-y-2 text-[#B3A69A]">
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('POTTERY_CERAMICS'); }} className="hover:text-white transition-colors cursor-pointer">
                  Pottery & Ceramics
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('WOVEN_TEXTILES'); }} className="hover:text-white transition-colors cursor-pointer">
                  Handwoven Inabel & Looms
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('LEATHER_BAGS'); }} className="hover:text-white transition-colors cursor-pointer">
                  Marikina Leathercraft
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('VINTAGE_UKAY'); }} className="hover:text-white transition-colors cursor-pointer">
                  Curated Vintage & Ukay
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('JEWELRY_ACCESSORIES'); }} className="hover:text-white transition-colors cursor-pointer">
                  Handmade Jewelry & Pearls
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('EXPLORE'); onSelectCategory('WOOD_RATTAN'); }} className="hover:text-white transition-colors cursor-pointer">
                  Solihiya Wood & Rattan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Discover */}
          <div>
            <h5 className="font-mono uppercase tracking-wider text-[#D4A359] font-semibold mb-3">
              Discover
            </h5>
            <ul className="space-y-2 text-[#B3A69A]">
              <li>
                <button onClick={() => onNavigate('TRENDING')} className="hover:text-white transition-colors cursor-pointer">
                  Trending Finds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('DEALS')} className="hover:text-white transition-colors cursor-pointer">
                  Sulit Deals & Sales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('LOCAL')} className="hover:text-white transition-colors cursor-pointer">
                  Local Sellers & Yard Sales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('COLLECTIONS')} className="hover:text-white transition-colors cursor-pointer">
                  Curated Gift Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sell */}
          <div>
            <h5 className="font-mono uppercase tracking-wider text-[#D4A359] font-semibold mb-3">
              Sell on ATBP
            </h5>
            <div className="space-y-2 text-[#A69788]">
              <p>
                Run your independent shop and reach customers who value authentic craft.
              </p>
              <button
                onClick={() => onNavigate('STUDIO')}
                className="btn-handmade-gold text-xs px-3.5 py-1.5 font-bold font-mono uppercase tracking-wider cursor-pointer inline-block mt-1"
              >
                Open Your Shop
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E72] font-mono">
          <div>
            © 2026 ATBP Marketplace (at iba pa). Built for independent small businesses across the Philippines.
          </div>
          <div className="flex items-center gap-4">
            <span>Manila</span>
            <span aria-hidden="true">·</span>
            <span>Cebu</span>
            <span aria-hidden="true">·</span>
            <span>Baguio</span>
            <span aria-hidden="true">·</span>
            <span>Davao</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
