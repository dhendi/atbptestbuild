import React, { useState } from 'react';
import { Product, SellerShop, YardSale } from '../types';
import { ProductCard } from './ProductCard';
import { MapPin, Calendar, Clock, Store, Users, Check } from 'lucide-react';
import { LOCAL_YARD_SALES } from '../data/mockData';

interface LocalViewProps {
  products: Product[];
  shops: SellerShop[];
  currentLocation: string;
  onOpenLocationModal: () => void;
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const LocalView: React.FC<LocalViewProps> = ({
  products,
  shops,
  currentLocation,
  onOpenLocationModal,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [rsvpdSales, setRsvpdSales] = useState<Set<string>>(new Set());

  const regions = [
    { id: 'ALL', label: 'All Regions' },
    { id: 'Metro Manila', label: 'Metro Manila' },
    { id: 'Cordillera (CAR)', label: 'Cordillera / Abra / Benguet' },
    { id: 'Central Luzon', label: 'Pampanga / Central Luzon' },
    { id: 'CALABARZON', label: 'Cavite / Batangas / Laguna' },
    { id: 'Visayas', label: 'Cebu / Western Visayas' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedRegion === 'ALL') return true;
    return p.shop.region.includes(selectedRegion) || p.originLocation.includes(selectedRegion);
  });

  const toggleRsvp = (id: string) => {
    setRsvpdSales((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="border-b-2 border-[#24140E] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9E3F24] uppercase tracking-wider font-bold mb-1">
            <MapPin size={14} />
            <span>LOCAL MAKERS & NEIGHBORHOOD DROPS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
            Discover What's Near You
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1 max-w-xl">
            Support local businesses in your city for faster delivery, lower shipping costs, and studio pickups.
          </p>
        </div>

        <button
          onClick={onOpenLocationModal}
          className="btn-handmade-paper px-3.5 py-2 text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto"
        >
          <MapPin size={14} className="text-[#9E3F24]" />
          <span>Location: <strong className="text-[#24140E] underline decoration-[#FAB900] decoration-2">{currentLocation}</strong> (Change)</span>
        </button>
      </div>

      {/* Region Segmented Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {regions.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegion(reg.id)}
            className={`px-3.5 py-1.5 rounded-[6px] border-1.5 whitespace-nowrap cursor-pointer transition-all uppercase tracking-wider text-[11px] ${
              selectedRegion === reg.id
                ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900] font-bold'
                : 'bg-[#FFFDF8] border-[#24140E]/30 text-[#4A3B32] hover:border-[#24140E]'
            }`}
          >
            {reg.label}
          </button>
        ))}
      </div>

      {/* Local Yard Sales / Community Pop-Ups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#24140E] pb-2">
          <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#9E3F24] inline-block rounded-xs" />
            Neighborhood Yard Sales & Weekend Trunk Pop-ups
          </h2>
          <span className="text-[11px] text-[#7A6A5C] font-mono">Happening this week</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCAL_YARD_SALES.map((sale) => {
            const isRsvpd = rsvpdSales.has(sale.id);
            return (
              <div
                key={sale.id}
                className="card-handmade bg-[#FFFDF8] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/9 w-full bg-[#EFE8DD] overflow-hidden border-b-2 border-[#24140E]">
                    <img src={sale.image} alt={sale.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] text-[#9E3F24] font-mono font-bold flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{sale.city}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#24140E] leading-tight font-bold">
                      {sale.title}
                    </h3>
                    <p className="text-xs text-[#5C4A3E] font-mono">
                      {sale.dateString}
                    </p>
                    <div className="text-[11px] text-[#7A6A5C] pt-2 border-t border-dashed border-[#24140E]/20 font-mono">
                      Highlights: {sale.highlights.join(' · ')}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => toggleRsvp(sale.id)}
                    className={`w-full py-2 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                      isRsvpd
                        ? 'btn-handmade-dark'
                        : 'btn-handmade-gold'
                    }`}
                  >
                    {isRsvpd ? (
                      <>
                        <Check size={14} />
                        <span>Saved / Going</span>
                      </>
                    ) : (
                      <>
                        <Users size={14} />
                        <span>Save to Calendar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Products Grid */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#6F645A]">
          Items from Local Shops ({filteredProducts.length} finds)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
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
