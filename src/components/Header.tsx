import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, MapPin, Store, ChevronDown, Sparkles, X, Menu } from 'lucide-react';
import { PageView, ProductCategory } from '../types';
import { CATEGORY_DISCOVERY } from '../data/mockData';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (cat: ProductCategory | 'ALL') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  savedCount: number;
  onOpenCart: () => void;
  onOpenSaved: () => void;
  onOpenLocation: () => void;
  currentLocation: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  savedCount,
  onOpenCart,
  onOpenSaved,
  onOpenLocation,
  currentLocation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-b-2 border-[#24140E] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#24140E] text-[#FAF7EE] px-4 py-1.5 text-xs text-center flex items-center justify-between sm:justify-center gap-4 border-b border-[#24140E]">
        <span className="truncate">
          🌿 <strong className="text-[#FAB900]">Shop Independent Filipino Small Businesses:</strong> Free nationwide shipping on orders ₱1,500+
        </span>
        <button
          onClick={onOpenLocation}
          className="text-[#FAB900] hover:underline flex items-center gap-1 shrink-0 font-medium cursor-pointer"
        >
          <MapPin size={12} />
          <span>{currentLocation}</span>
        </button>
      </div>

      {/* Main Bar: Logo, Search, Navigation Links, Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo (Official Logo from user upload: letter 'a' with yellow price tag & at iba pa) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              onNavigate('HOME');
              onSelectCategory('ALL');
              onSearchChange('');
            }}
            className="flex items-center text-left group cursor-pointer focus:outline-none"
            aria-label="ATBP Home"
          >
            <Logo size="md" />
          </button>
        </div>

        {/* Global Search Bar (Handmade ledger craft frame) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4">
          <div className="search-handmade-header relative flex items-center w-full px-3 py-1.5 transition-all">
            <Search size={16} className="text-[#9E3F24] shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Search handmade pottery, Inabel weaves, Marikina leather..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-xs sm:text-sm w-full focus:outline-none text-[#24140E] placeholder:text-[#8C7A6B] font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#8C7A6B] hover:text-[#24140E] p-1 cursor-pointer mr-1"
              >
                <X size={14} />
              </button>
            )}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  onNavigate('EXPLORE');
                }
              }}
              className="btn-handmade-gold text-[11px] uppercase tracking-wider px-2.5 py-1 shrink-0 font-mono"
            >
              Find
            </button>
          </div>
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Sell on ATBP CTA for small businesses */}
          <button
            onClick={() => onNavigate('STUDIO')}
            className={`hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 transition-all cursor-pointer ${
              currentPage === 'STUDIO'
                ? 'btn-handmade-dark'
                : 'btn-handmade-paper'
            }`}
          >
            <Store size={15} className="text-[#FAB900]" />
            <span>Sell on ATBP</span>
          </button>

          {/* Saved / Favorites */}
          <button
            onClick={onOpenSaved}
            className="relative p-2 bg-[#FFFDF8] border-2 border-[#24140E] rounded-[8px] text-[#24140E] hover:bg-[#F5ECE0] shadow-[2px_2px_0px_#24140E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Favorites"
            title="Saved Items"
          >
            <Heart size={18} className={savedCount > 0 ? "fill-[#9E3F24] text-[#9E3F24]" : ""} />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#9E3F24] text-white text-[10px] font-mono font-bold w-4.5 h-4.5 rounded-full border border-[#24140E] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Shopping Bag / Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2 bg-[#FFFDF8] border-2 border-[#24140E] rounded-[8px] text-[#24140E] hover:bg-[#F5ECE0] shadow-[2px_2px_0px_#24140E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Shopping Cart"
            title="Bayong / Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FAB900] text-[#24140E] text-[10px] font-mono font-bold w-4.5 h-4.5 rounded-full border border-[#24140E] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden bg-[#FFFDF8] border-2 border-[#24140E] rounded-[8px] text-[#24140E] cursor-pointer"
          >
            <Menu size={18} />
          </button>

        </div>
      </div>

      {/* Primary Category & Page Navigation Bar */}
      <div className="border-t border-[#24140E]/15 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-medium text-[#4A3B32] overflow-x-auto no-scrollbar py-2.5">
          
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            <button
              onClick={() => { onNavigate('HOME'); onSelectCategory('ALL'); }}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'HOME' && selectedCategory === 'ALL'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('EXPLORE')}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'EXPLORE'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Explore All
            </button>

            <button
              onClick={() => onNavigate('TRENDING')}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'TRENDING'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Trending Finds
            </button>

            <button
              onClick={() => onNavigate('DEALS')}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'DEALS'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Sulit Deals & Sales
            </button>

            <button
              onClick={() => onNavigate('LOCAL')}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'LOCAL'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Near You (Local)
            </button>

            <button
              onClick={() => onNavigate('COLLECTIONS')}
              className={`hover:text-[#24140E] transition-colors cursor-pointer pb-0.5 tracking-wide ${
                currentPage === 'COLLECTIONS'
                  ? 'text-[#24140E] font-bold border-b-2 border-[#9E3F24]'
                  : ''
              }`}
            >
              Curated Collections
            </button>
          </div>

          <button
            onClick={onOpenLocation}
            className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#5C4A3E] hover:text-[#24140E] shrink-0 font-mono"
          >
            <MapPin size={12} className="text-[#9E3F24]" />
            <span>Delivering to: <strong className="text-[#24140E] underline decoration-[#FAB900] decoration-2">{currentLocation}</strong></span>
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2C2622]/10 bg-white p-4 space-y-3 text-xs">
          <div className="space-y-2">
            <button
              onClick={() => { onNavigate('HOME'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('EXPLORE'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Explore Marketplace
            </button>
            <button
              onClick={() => { onNavigate('TRENDING'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Trending Finds
            </button>
            <button
              onClick={() => { onNavigate('DEALS'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Sulit Deals & Sales
            </button>
            <button
              onClick={() => { onNavigate('LOCAL'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Local Sellers Near You
            </button>
            <button
              onClick={() => { onNavigate('COLLECTIONS'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1.5 font-medium"
            >
              Curated Gift Guides
            </button>
            <button
              onClick={() => { onNavigate('STUDIO'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-bold text-[#9E432A] border-t border-[#2C2622]/10"
            >
              Open a Shop / Sell on ATBP
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
