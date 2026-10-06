import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, MapPin, Truck, Store, Check, Share2 } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isSaved,
  onToggleSave,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7EE] text-[#24140E] rounded-[16px_8px_14px_10px] max-w-4xl w-full border-2 border-[#24140E] shadow-[8px_8px_0px_#24140E] overflow-hidden relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Sticky Modal Header Bar */}
        <div className="p-3 sm:p-4 border-b-2 border-[#24140E] flex items-center justify-between bg-[#FFFDF8] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7A6A5C] font-mono">
            <span className="font-bold text-[#24140E]">{product.shop.name}</span>
            <span aria-hidden="true">·</span>
            <span>📍 {product.originLocation}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="btn-handmade-paper text-xs py-1 px-2.5 font-mono flex items-center gap-1 shadow-[2px_2px_0px_#24140E]"
              title="Share listing"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="btn-handmade-paper p-1.5 shadow-[2px_2px_0px_#24140E]"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-[#FAF7EE]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Gallery Column (md: 7 cols) */}
            <div className="md:col-span-7 space-y-4">
              {/* Main Photo View */}
              <div className="relative aspect-4/3 w-full rounded-[10px] overflow-hidden bg-[#EFE8DD] border-2 border-[#24140E] shadow-[4px_4px_0px_#24140E]">
                <div className="washi-tape-strip absolute -top-1 left-8 w-20 h-4 rotate-[-3deg] z-10 border-t border-b border-[#24140E]/20" />
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-[6px] overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImageIndex === idx ? 'border-[#24140E] shadow-[3px_3px_0px_#FAB900]' : 'border-[#24140E]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Shop Guarantee & Buyer Protection Box */}
              <div className="card-handmade p-4 bg-[#FFFDF8] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#2E4A3D] font-bold font-mono">
                  <ShieldCheck size={16} />
                  <span>ATBP Purchase Protection</span>
                </div>
                <p className="text-[#5C4A3E] leading-relaxed text-[11px]">
                  Shop with confidence. Get a full refund if your item doesn't arrive, arrives damaged, or differs from the description.
                </p>
              </div>

              {/* Customer Reviews Preview */}
              <div className="card-handmade p-4 bg-[#FFFDF8] space-y-3">
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#24140E]/15 pb-2">
                  <h4 className="font-serif text-base font-bold text-[#24140E]">
                    Reviews for this shop ({product.shop.reviewCount})
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-bold font-mono">
                    <Star size={13} className="fill-[#FAB900] text-[#24140E]" />
                    <span>{product.shop.rating} / 5</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-[#7A6A5C] font-mono">
                          <span className="font-bold text-[#24140E]">{rev.author}</span>
                          <span>{rev.date}</span>
                        </div>
                        <div className="flex text-[#24140E]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={11} className="fill-[#FAB900] text-[#24140E]" />
                          ))}
                        </div>
                        <p className="text-[#5C4A3E] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#7A6A5C] italic font-mono">No reviews yet for this specific item.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Details & Purchase Column (md: 5 cols) */}
            <div className="md:col-span-5 space-y-5">
              
              {/* Shop Badge Card */}
              <div className="card-handmade flex items-center gap-3 p-3 bg-[#FFFDF8]">
                <img
                  src={product.shop.avatar}
                  alt={product.shop.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#24140E] shadow-[1.5px_1.5px_0px_#24140E]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-[#24140E] truncate font-mono">{product.shop.name}</h4>
                    {product.shop.badge && (
                      <span className="tag-handmade-yellow text-[9px] px-1.5 py-0.2 uppercase font-mono">
                        ★ Star Seller
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#7A6A5C] font-mono truncate mt-0.5">
                    📍 {product.shop.location} · {product.shop.salesCount} sales
                  </p>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#24140E] leading-tight font-medium">
                  {product.title}
                </h1>

                <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
                  <span className="tag-handmade-yellow text-xl font-bold px-2.5 py-0.5 inline-block tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-[#8C7A6B] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.freeShipping && (
                    <span className="text-[11px] font-mono font-bold text-[#2E4A3D] bg-[#2E4A3D]/10 px-2 py-0.5 rounded border border-[#2E4A3D]/30">
                      ✓ FREE Shipping
                    </span>
                  )}
                </div>
              </div>

              {/* Overview Specs */}
              <div className="card-handmade p-3.5 bg-[#FFFDF8] space-y-2 text-xs text-[#5C4A3E] font-mono">
                <div>
                  <strong className="text-[#24140E]">Condition: </strong>
                  <span>{product.condition.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <strong className="text-[#24140E]">Materials: </strong>
                  <span>{product.materials.join(', ')}</span>
                </div>
                {product.dimensions && (
                  <div>
                    <strong className="text-[#24140E]">Dimensions: </strong>
                    <span>{product.dimensions}</span>
                  </div>
                )}
                <div>
                  <strong className="text-[#24140E]">Ships from: </strong>
                  <span>{product.originLocation}</span>
                </div>
                <div>
                  <strong className="text-[#24140E]">Dispatch time: </strong>
                  <span>{product.processingDays}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-xs text-[#4A3B32]">
                <strong className="text-[#24140E] block font-mono uppercase tracking-wider text-[11px] font-bold">
                  Description
                </strong>
                <p className="leading-relaxed whitespace-pre-line text-[#5C4A3E]">
                  {product.description}
                </p>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono font-bold text-[#24140E]">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-[#FFFDF8] border-2 border-[#24140E] rounded-[6px] px-3 py-1.5 text-xs text-[#24140E] font-mono font-bold cursor-pointer shadow-[2px_2px_0px_#24140E]"
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                  <span className="text-[11px] text-[#7A6A5C] font-mono">
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleSave(product.id)}
                    className="btn-handmade-paper p-3 shadow-[2.5px_2.5px_0px_#24140E]"
                    title={isSaved ? "Saved" : "Save to Favorites"}
                  >
                    <Heart size={18} className={isSaved ? "fill-[#9E3F24] text-[#9E3F24]" : ""} />
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="btn-handmade-dark flex-1 py-3 px-4 font-mono uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart · {formatPrice(product.price * quantity)}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onBuyNow(product, quantity);
                    onClose();
                  }}
                  className="btn-handmade-gold w-full py-3 px-4 font-mono uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                >
                  <span>Buy It Now</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
