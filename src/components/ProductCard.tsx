import React from 'react';
import { Heart, Star, Award, ShoppingBag, Eye, MapPin } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="card-handmade group relative flex flex-col bg-[#FFFDF8] overflow-hidden">
      
      {/* Product Image Container */}
      <div 
        className="relative aspect-4/3 w-full bg-[#EFE8DD] overflow-hidden cursor-pointer border-b-2 border-[#24140E]"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Favorite Heart Stamp Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-[6px] bg-[#FFFDF8] hover:bg-[#FAF0E1] text-[#24140E] hover:text-[#9E3F24] border-1.5 border-[#24140E] shadow-[2px_2px_0px_#24140E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer z-10"
          title={isSaved ? "Remove from Favorites" : "Save to Favorites"}
        >
          <Heart size={15} className={isSaved ? "fill-[#9E3F24] text-[#9E3F24]" : ""} />
        </button>

        {/* Handmade Badges: Bestseller / Editors' Pick / Sale */}
        {product.isBestseller ? (
          <div className="absolute top-2.5 left-2.5 tag-handmade-yellow text-[10px] uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white border border-[#24140E]" />
            <span>Bestseller</span>
          </div>
        ) : product.isEditorsPick ? (
          <div className="absolute top-2.5 left-2.5 bg-[#9E3F24] text-[#FAF7EE] border-1.5 border-[#24140E] rounded-[4px] shadow-[2px_2px_0px_#24140E] text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
            Editors' Pick
          </div>
        ) : product.originalPrice ? (
          <div className="absolute top-2.5 left-2.5 bg-[#2E4A3D] text-[#FAF7EE] border-1.5 border-[#24140E] rounded-[4px] shadow-[2px_2px_0px_#24140E] text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
            Sale
          </div>
        ) : null}

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="btn-handmade-paper absolute bottom-2.5 right-2.5 text-xs py-1 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-10 font-mono shadow-[2px_2px_0px_#24140E]"
        >
          <Eye size={12} />
          <span className="text-[10px] uppercase font-bold tracking-wider">Inspect</span>
        </button>
      </div>

      {/* Product Details (Handcrafted Label Format) */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2 bg-[#FFFDF8]">
        
        <div>
          {/* Shop Name & Rating line */}
          <div className="flex items-center justify-between text-xs text-[#7A6A5C] mb-1">
            <span className="truncate max-w-[130px] text-[#5C4A3E] font-medium font-mono text-[11px]">
              {product.shop.name}
            </span>
            <div className="flex items-center gap-1 shrink-0 text-[11px] font-mono">
              <Star size={11} className="fill-[#FAB900] text-[#24140E]" />
              <span className="font-bold text-[#24140E]">{product.shop.rating}</span>
              <span className="text-[#8C7A6B]">({product.shop.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-sm sm:text-base text-[#24140E] group-hover:text-[#9E3F24] transition-colors line-clamp-2 leading-snug cursor-pointer font-medium"
          >
            {product.title}
          </h3>
        </div>

        {/* Pricing & Shipping Information */}
        <div className="pt-2 mt-auto border-t border-dashed border-[#24140E]/15">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="tag-handmade-yellow px-2 py-0.5 text-sm tabular-nums inline-block">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-[11px] text-[#8C7A6B] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <span className={`text-[10px] font-mono ${product.freeShipping ? "text-[#2E4A3D] font-bold" : "text-[#7A6A5C]"}`}>
              {product.freeShipping ? '✓ FREE shipping' : '+ ₱120 shipping'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[10px] text-[#7A6A5C] font-mono truncate">
              📍 {product.originLocation.split(',')[0]}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              className="btn-handmade-dark text-[11px] font-mono uppercase tracking-wider py-1 px-2.5 shrink-0 flex items-center gap-1 shadow-[2px_2px_0px_#9E3F24]"
            >
              <ShoppingBag size={11} />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
