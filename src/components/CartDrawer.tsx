import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  
  // Checkout simulator state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'GCASH' | 'MAYA' | 'COD'>('GCASH');
  const [customerName, setCustomerName] = useState('Dhen Pagdanganan');
  const [shippingAddress, setShippingAddress] = useState('Unit 4B, Soliman St., Brgy. Poblacion, Makati City');
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  const shippingCost = shippingMethod === 'standard' ? 120 : shippingMethod === 'express' ? 220 : 0;
  
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const clean = couponCode.trim().toUpperCase();

    if (clean === 'SALAMAT10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount({ code: 'SALAMAT10', amount: disc });
    } else if (clean === 'UNANGPILI') {
      setAppliedDiscount({ code: 'UNANGPILI', amount: 150 });
    } else {
      setCouponError('Hindi kilala ang coupon code. Subukan ang SALAMAT10 o UNANGPILI.');
    }
  };

  const handleCompleteOrder = () => {
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setIsCheckingOut(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF7EE] text-[#24140E] w-full max-w-md h-full flex flex-col border-l-2 border-[#24140E] shadow-2xl relative animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#24140E] flex items-center justify-between bg-[#FFFDF8]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#9E3F24]" />
            <div>
              <h2 className="font-serif text-xl font-bold text-[#24140E]">Iyong Bayong</h2>
              <span className="font-mono text-[10px] tag-handmade-yellow px-1.5 py-0.2 uppercase">
                {items.length} {items.length === 1 ? 'likha' : 'mga likha'}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {orderComplete ? (
            <div className="py-16 text-center space-y-3">
              <CheckCircle2 size={48} className="text-[#2E4A3D] mx-auto animate-bounce" />
              <h3 className="font-serif text-2xl text-[#1E1B18]">Maraming Salamat!</h3>
              <p className="text-xs text-[#5C5248] max-w-xs mx-auto">
                Ang iyong order ay matagumpay na natanggap. Inabisuhan na ang atelier upang ihanda ang iyong bayong para sa pagpapadala.
              </p>
              <div className="font-mono text-xs bg-[#F3ECE1] p-2.5 rounded max-w-xs mx-auto">
                Order Reference: ATBP-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout View */
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#2C2622]/10 pb-2">
                <span className="font-mono font-bold text-[#8C2D19] uppercase">Checkout & Bayad</span>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-[#6F645A] hover:underline cursor-pointer"
                >
                  ← Bumalik sa Bayong
                </button>
              </div>

              <div>
                <label className="block font-medium text-[#1E1B18] mb-1">Pangalan ng Tatanggap:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1E1B18] mb-1">Address ng Paghahatiran:</label>
                <textarea
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1E1B18] mb-1.5">Paraan ng Pagbabayad:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['GCASH', 'MAYA', 'COD'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded border text-center font-mono font-bold cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'bg-[#24201D] text-white border-[#24201D]'
                          : 'bg-white text-[#4A423B] border-[#2C2622]/15 hover:border-[#8C2D19]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF3E8] border border-[#C89D56]/40 p-3 rounded text-[11px] text-[#5C5248]">
                ✓ Kasama ang ATBP Buyer Protection. Direktang makakarating ang bayad sa may-akda pagkatanggap ng gamit.
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 bg-[#F3ECE1] rounded-full flex items-center justify-center mx-auto text-[#7A6E63]">
                <ShoppingBag size={28} />
              </div>
              <p className="font-serif text-lg text-[#1E1B18]">Walang laman ang iyong bayong.</p>
              <p className="text-xs text-[#7A6E63] max-w-xs mx-auto">
                Tuklasin ang aming mga handwoven textiles, Marikina leather, at vintage finds.
              </p>
            </div>
          ) : (
            /* Item list */
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
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

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded bg-[#FAF7EE] border-1.5 border-[#24140E] text-xs font-mono font-bold flex items-center justify-center hover:bg-[#FAB900] shadow-[1px_1px_0px_#24140E] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs w-5 text-center font-bold text-[#24140E]">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 rounded bg-[#FAF7EE] border-1.5 border-[#24140E] text-xs font-mono font-bold flex items-center justify-center hover:bg-[#FAB900] shadow-[1px_1px_0px_#24140E] cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="p-1 text-[#8C7A6B] hover:text-[#9E3F24] cursor-pointer ml-1"
                      title="Alisin"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery Option Selector */}
              <div className="pt-3 border-t-2 border-dashed border-[#24140E]/20 space-y-2">
                <span className="text-xs font-bold text-[#24140E] block font-mono">
                  Paraan ng Pagpapadala (Courier):
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('standard')}
                    className={`p-2 rounded border-2 text-left cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900]'
                        : 'bg-[#FFFDF8] border-[#24140E]/30 text-[#4A3B32]'
                    }`}
                  >
                    <div className="font-semibold text-[11px] font-mono">J&T Express</div>
                    <div className="font-mono text-[10px]">₱120 (3-5 d)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('express')}
                    className={`p-2 rounded border-2 text-left cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900]'
                        : 'bg-[#FFFDF8] border-[#24140E]/30 text-[#4A3B32]'
                    }`}
                  >
                    <div className="font-semibold text-[11px] font-mono">Lalamove</div>
                    <div className="font-mono text-[10px]">₱220 (Same-day)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('pickup')}
                    className={`p-2 rounded border-2 text-left cursor-pointer transition-all ${
                      shippingMethod === 'pickup'
                        ? 'bg-[#24140E] text-[#FAF7EE] border-[#24140E] shadow-[2px_2px_0px_#FAB900]'
                        : 'bg-[#FFFDF8] border-[#24140E]/30 text-[#4A3B32]'
                    }`}
                  >
                    <div className="font-semibold text-[11px] font-mono">Kanto Pickup</div>
                    <div className="font-mono text-[10px]">LIBRE (Atelier)</div>
                  </button>
                </div>
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon: SALAMAT10 o UNANGPILI"
                    className="flex-1 bg-[#FFFDF8] border-2 border-[#24140E] rounded px-2.5 py-1.5 text-xs text-[#24140E] font-mono uppercase focus:outline-none shadow-[2px_2px_0px_#24140E]"
                  />
                  <button
                    type="submit"
                    className="btn-handmade-paper px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-bold"
                  >
                    Gamitin
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-[#9E3F24] mt-1 font-mono font-bold">{couponError}</p>}
                {appliedDiscount && (
                  <p className="text-[11px] text-[#2E4A3D] mt-1 font-mono font-bold">
                    ✓ Na-apply ang {appliedDiscount.code}: -{formatPrice(appliedDiscount.amount)}
                  </p>
                )}
              </form>
            </div>
          )}

        </div>

        {/* Footer Summary & Checkout Trigger */}
        {items.length > 0 && !orderComplete && (
          <div className="p-4 sm:p-5 border-t-2 border-[#24140E] bg-[#FFFDF8] space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#5C4A3E]">
                <span>Halaga ng Likha:</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5C4A3E]">
                <span>Paghahatid:</span>
                <span className="tabular-nums">{formatPrice(shippingCost)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#2E4A3D] font-bold">
                  <span>Diskwento:</span>
                  <span className="tabular-nums">-{formatPrice(appliedDiscount.amount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#24140E] font-bold text-base pt-2 border-t-2 border-dashed border-[#24140E]/20">
                <span>Kabuuang Halaga:</span>
                <span className="tabular-nums text-[#9E3F24] font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {isCheckingOut ? (
              <button
                onClick={handleCompleteOrder}
                className="btn-handmade-dark w-full py-3 px-4 font-mono uppercase tracking-wider text-xs"
              >
                <CheckCircle2 size={16} />
                <span>Kumpirmahin at Bayaran · {formatPrice(total)}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="btn-handmade-gold w-full py-3 px-4 font-mono uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <span>Magpatuloy sa Pagbili (Checkout)</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
