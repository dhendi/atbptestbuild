import React, { useState } from 'react';
import { Product, ProductCategory, ProductCondition, SellerShop } from '../types';
import { Store, PlusCircle, CheckCircle2, Package, Sparkles, Image as ImageIcon, MapPin, DollarSign } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface SellerStudioViewProps {
  onPublishProduct: (product: Product) => void;
  userProducts: Product[];
  savedProductIds: Set<string>;
  onToggleSave: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const SellerStudioView: React.FC<SellerStudioViewProps> = ({
  onPublishProduct,
  userProducts,
  savedProductIds,
  onToggleSave,
  onAddToCart,
  onSelectProduct,
}) => {
  const [shopName, setShopName] = useState('Katutubo Home Studio');
  const [ownerName, setOwnerName] = useState('Dhen Pagdanganan');
  const [location, setLocation] = useState('Poblacion, Makati');
  const [bio, setBio] = useState('Handcrafted Filipino lifestyle goods, ceramics, and sustainable woven home accessories.');

  // New Listing Form State
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('POTTERY_CERAMICS');
  const [price, setPrice] = useState('1650');
  const [condition, setCondition] = useState<ProductCondition>('BRAND_NEW_HANDMADE');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('Terracotta Clay, Natural Mineral Glaze');
  const [dimensions, setDimensions] = useState('20cm x 15cm');
  const [freeShipping, setFreeShipping] = useState(true);
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState<string>(
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'
  );
  const [publishSuccess, setPublishSuccess] = useState(false);

  const photoPresets = [
    { label: 'Ceramics / Pottery', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Woven Inabel Textile', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Handcrafted Leather', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Vintage Clothing', url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Botanical Candle', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rattan & Woodcraft', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const userShop: SellerShop = {
      id: `shop_user_${Date.now()}`,
      name: shopName,
      handle: shopName.toLowerCase().replace(/\s+/g, ''),
      ownerName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bannerImage: selectedPhotoPreset,
      location,
      region: 'Metro Manila',
      bio,
      badge: 'TOP_ARTISAN',
      rating: 5.0,
      reviewCount: 1,
      salesCount: 1,
      yearEstablished: 2026,
      processingTime: '1-3 business days',
    };

    const newProd: Product = {
      id: `prod_${Date.now()}`,
      title,
      category,
      price: Number(price) || 1200,
      condition,
      originLocation: location,
      shop: userShop,
      images: [selectedPhotoPreset],
      description: description || 'Carefully handcrafted by our studio team using sustainable and natural materials.',
      materials: materials.split(',').map((m) => m.trim()),
      dimensions,
      processingDays: 'Ships in 1-3 business days',
      favoritesCount: 1,
      isBestseller: false,
      isEditorsPick: true,
      freeShipping,
      stock: 5,
      tags: ['Handmade', 'Local Shop', category],
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    onPublishProduct(newProd);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setIsListingOpen(false);
      setTitle('');
      setDescription('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Studio Header & Intro */}
      <div className="border-b-2 border-[#24140E] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9E3F24] uppercase tracking-wider font-bold mb-1">
            <Store size={14} />
            <span>ATBP SELLER STUDIO · SMALL BUSINESS HUB</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#24140E]">
            Sell Your Products on ATBP
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1 max-w-xl">
            Join thousands of independent Philippine makers, craft cooperatives, and vintage curators. Open your shop in minutes and reach conscious buyers nationwide.
          </p>
        </div>

        <button
          onClick={() => setIsListingOpen(true)}
          className="btn-handmade-gold text-xs font-mono uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle size={15} className="text-[#24140E]" />
          <span>Add New Product Listing</span>
        </button>
      </div>

      {/* Shop Profile Banner / Manager */}
      <div className="card-handmade bg-[#FFFDF8] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#24140E]/15 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#EFE8DD] border-2 border-[#24140E] shadow-[2px_2px_0px_#24140E] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt={shopName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-[#24140E]">{shopName}</h2>
                <span className="tag-handmade-yellow text-[10px] px-1.5 py-0.2 uppercase font-mono">
                  ★ Verified Shop
                </span>
              </div>
              <p className="text-xs text-[#7A6A5C] font-mono mt-0.5">
                Managed by {ownerName} · 📍 {location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="text-center">
              <span className="text-[#7A6A5C] block text-[10px] uppercase font-bold">Active Items</span>
              <strong className="text-base text-[#24140E]">{userProducts.length}</strong>
            </div>
            <div className="text-center">
              <span className="text-[#7A6A5C] block text-[10px] uppercase font-bold">Store Rating</span>
              <strong className="text-base text-[#2E4A3D]">5.0 ★</strong>
            </div>
            <div className="text-center">
              <span className="text-[#7A6A5C] block text-[10px] uppercase font-bold">Payout Escrow</span>
              <strong className="text-base text-[#24140E]">Active</strong>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#5C4A3E] italic max-w-2xl font-serif">
          "{bio}"
        </p>
      </div>

      {/* Listing Form Modal / Drawer */}
      {isListingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FAF7EE] text-[#24140E] rounded-[16px_8px_14px_10px] max-w-2xl w-full border-2 border-[#24140E] shadow-[8px_8px_0px_#24140E] p-6 relative my-6">
            
            <button
              onClick={() => setIsListingOpen(false)}
              className="btn-handmade-paper absolute top-4 right-4 p-1.5 shadow-[2px_2px_0px_#24140E]"
            >
              ✕
            </button>

            <div className="border-b-2 border-[#24140E] pb-3 mb-4">
              <span className="font-mono text-xs text-[#9E3F24] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FAB900] inline-block" />
                NEW LISTING STUDIO
              </span>
              <h3 className="font-serif text-2xl text-[#24140E] mt-0.5">
                List a Product to Your Shop
              </h3>
              <p className="text-xs text-[#5C4A3E]">
                Provide accurate photos, descriptions, and pricing for your customers.
              </p>
            </div>

            {publishSuccess ? (
              <div className="card-handmade bg-[#FFFDF8] py-12 text-center space-y-3">
                <CheckCircle2 size={48} className="text-[#2E4A3D] mx-auto animate-bounce" />
                <h4 className="font-serif text-2xl text-[#24140E]">Product Published!</h4>
                <p className="text-xs text-[#5C4A3E] font-mono">
                  Your product is now live on the ATBP marketplace and can be found by buyers nationwide.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-mono">
                
                <div>
                  <label className="block font-bold text-[#24140E] mb-1">
                    Listing Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wheel-Thrown Stoneware Pour-Over Dripper"
                    className="w-full bg-[#FFFDF8] border-2 border-[#24140E] rounded p-2 text-xs text-[#24140E] font-sans shadow-[2px_2px_0px_#24140E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1E1B18] mb-1">Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-xs text-[#1E1B18]"
                    >
                      <option value="POTTERY_CERAMICS">Pottery & Ceramics</option>
                      <option value="WOVEN_TEXTILES">Woven Textiles & Looms</option>
                      <option value="LEATHER_BAGS">Marikina Leather</option>
                      <option value="VINTAGE_UKAY">Vintage & Ukay</option>
                      <option value="JEWELRY_ACCESSORIES">Handmade Jewelry</option>
                      <option value="CANDLES_HOME">Candles & Home Fragrance</option>
                      <option value="WOOD_RATTAN">Wood & Rattan Solihiya</option>
                      <option value="PANTRY_COFFEE">Coffee & Philippine Pantry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1E1B18] mb-1">Price (₱):</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="1650"
                      className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-xs text-[#1E1B18] font-mono"
                    />
                  </div>
                </div>

                {/* Photo Preset Selector */}
                <div>
                  <label className="block font-medium text-[#1E1B18] mb-1.5">
                    Select Product Photography (Studio Standard):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {photoPresets.map((photo) => (
                      <button
                        key={photo.label}
                        type="button"
                        onClick={() => setSelectedPhotoPreset(photo.url)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedPhotoPreset === photo.url
                            ? 'border-[#9E432A] ring-2 ring-[#9E432A]/20'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-end p-1 text-[9px] text-white font-medium">
                          {photo.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1E1B18] mb-1">Materials:</label>
                    <input
                      type="text"
                      value={materials}
                      onChange={(e) => setMaterials(e.target.value)}
                      placeholder="e.g. Stoneware, Volcanic Ash Glaze"
                      className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1E1B18] mb-1">Dimensions / Size:</label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="e.g. 15cm height x 10cm diameter"
                      className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1E1B18] mb-1">Description & Craft Notes:</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe how it was made, its origin, care instructions, and what makes it special..."
                    className="w-full bg-white border border-[#2C2622]/20 rounded p-2 text-xs text-[#1E1B18]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="freeShip"
                    checked={freeShipping}
                    onChange={(e) => setFreeShipping(e.target.checked)}
                    className="accent-[#9E432A]"
                  />
                  <label htmlFor="freeShip" className="font-bold text-[#24140E] cursor-pointer">
                    Offer FREE Nationwide Shipping on this item
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t-2 border-dashed border-[#24140E]/20">
                  <button
                    type="button"
                    onClick={() => setIsListingOpen(false)}
                    className="btn-handmade-paper px-4 py-2 text-xs font-mono uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-handmade-gold px-5 py-2 text-xs font-mono uppercase tracking-wider"
                  >
                    Publish to Marketplace
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Your Shop's Active Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#24140E] pb-2">
          <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#7A6A5C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FAB900] border border-[#24140E] inline-block rounded-xs" />
            Your Active Shop Listings ({userProducts.length})
          </h3>
          <span className="text-xs text-[#2E4A3D] font-mono font-bold">✓ Visible to all buyers nationwide</span>
        </div>

        {userProducts.length === 0 ? (
          <div className="card-handmade bg-[#FFFDF8] p-12 text-center space-y-3">
            <Package size={36} className="text-[#8C7A6B] mx-auto" />
            <h4 className="font-serif text-lg text-[#24140E] font-bold">No products listed yet</h4>
            <p className="text-xs text-[#5C4A3E] font-mono">
              Click "Add New Product Listing" above to publish your first craft or vintage find.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userProducts.map((prod) => (
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
        )}
      </div>

    </div>
  );
};
