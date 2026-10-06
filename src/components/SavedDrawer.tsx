import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveSaved: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveSaved,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF7EE] text-[#24140E] w-full max-w-md h-full flex flex-col border-l-2 border-[#24140E] shadow-2xl relative animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#24140E] flex items-center justify-between bg-[#FFFDF8]">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-[#9E3F24] text-[#9E3F24]" />
            <div>
              <h2 className="font-serif text-xl font-bold text-[#24140E]">Talaan ng Naisip (Saved)</h2>
              <span className="font-mono text-[10px] tag-handmade-yellow px-1.5 py-0.2 uppercase">
                {savedProducts.length} {savedProducts.length === 1 ? 'likha' : 'mga likha'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-handmade-paper p-1.5 shadow-[2px_2px_0px_#24140E]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {savedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 bg-[#FFFDF8] border-2 border-[#24140E] rounded-[10px] shadow-[3px_3px_0px_#24140E] flex items-center justify-center mx-auto text-[#9E3F24]">
                <Heart size={28} />
              </div>
              <p className="font-serif text-xl font-bold text-[#24140E]">Walang naka-save na likha.</p>
              <p className="text-xs text-[#7A6A5C] font-mono max-w-xs mx-auto">
                Pindutin ang puso sa anumang gamit o likha para maibalik-balikan dito anumang oras.
              </p>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="card-handmade bg-[#FFFDF8] p-3.5 flex gap-3 items-center"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-16 h-16 rounded-[6px] object-cover bg-[#EFE8DD] border-1.5 border-[#24140E] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#24140E] truncate leading-tight">
                    {product.title}
                  </h4>
                  <div className="text-[11px] text-[#7A6A5C] font-mono truncate">
                    by {product.shop.name}
                  </div>
                  <div className="tag-handmade-yellow text-[11px] font-bold px-1.5 py-0.2 mt-1 tabular-nums inline-block">
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveSaved(product.id);
                    }}
                    className="btn-handmade-dark p-2 text-xs"
                    title="Ilagay sa Bayong"
                  >
                    <ShoppingBag size={14} />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(product.id)}
                    className="p-1.5 text-[#8C7A6B] hover:text-[#9E3F24] cursor-pointer"
                    title="Alisin sa Talaan"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
