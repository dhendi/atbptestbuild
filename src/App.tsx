import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ExploreView } from './components/ExploreView';
import { TrendingView } from './components/TrendingView';
import { DealsView } from './components/DealsView';
import { LocalView } from './components/LocalView';
import { CollectionsView } from './components/CollectionsView';
import { SellerStudioView } from './components/SellerStudioView';
import { CartDrawer } from './components/CartDrawer';
import { SavedDrawer } from './components/SavedDrawer';
import { LocationModal } from './components/LocationModal';
import { Footer } from './components/Footer';

import { Product, ProductCategory, CartItem, SellerShop, PageView } from './types';
import { PRODUCTS, SHOPS, CURATED_COLLECTIONS } from './data/mockData';
import { Check, Star, ArrowRight, Store, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Navigation & Catalog State
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Data State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [shops, setShops] = useState<SellerShop[]>(SHOPS);
  
  // User Commerce State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set(['prod_1', 'prod_4']));
  const [currentLocation, setCurrentLocation] = useState<string>('Poblacion, Makati');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, shippingOption: 'standard' }];
    });
    showToast(`Added "${product.title.slice(0, 24)}..." to your cart!`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from favorites.');
      } else {
        next.add(productId);
        showToast('Saved to your favorites!');
      }
      return next;
    });
  };

  // Publish new product from Seller Studio
  const handlePublishProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Success! Your item "${newProduct.title.slice(0, 20)}..." is now listed.`);
  };

  // Saved products list
  const savedProductsList = useMemo(() => {
    return products.filter((p) => savedProductIds.has(p.id));
  }, [products, savedProductIds]);

  // When searching, switch to explore page
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim() && currentPage === 'HOME') {
      setCurrentPage('EXPLORE');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18] antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1B18] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check size={14} className="text-[#D4A359]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat !== 'ALL') setCurrentPage('EXPLORE');
        }}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        savedCount={savedProductIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        currentLocation={currentLocation}
      />

      {/* Body Content Router */}
      <main className="flex-1">
        
        {currentPage === 'HOME' && (
          <div className="space-y-14 pb-16">
            
            {/* Hero Banner with Etsy Category Bubbles */}
            <Hero
              onSearch={(q) => {
                setSearchQuery(q);
                setCurrentPage('EXPLORE');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage('EXPLORE');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreAll={() => {
                setSelectedCategory('ALL');
                setCurrentPage('EXPLORE');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenStudio={() => {
                setCurrentPage('STUDIO');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Editors' Picks & Popular Right Now */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
              <div className="flex items-end justify-between border-b-2 border-[#24140E] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#9E3F24] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-[#FAB900] border border-[#24140E] inline-block" />
                    CURATED BY ATBP EDITORS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#24140E] mt-0.5">
                    Popular Items Right Now
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setCurrentPage('EXPLORE');
                  }}
                  className="btn-handmade-paper text-xs font-mono px-3.5 py-1.5 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <span>See more finds</span>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isSaved={savedProductIds.has(prod.id)}
                    onToggleSave={handleToggleSave}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Small Business Spotlight / Shops We Love with Real Product Previews */}
            <section className="bg-[#FAF7EE] border-y-2 border-[#24140E] py-14 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-dashed border-[#24140E]/25 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#7A6A5C] uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#9E3F24] inline-block rounded-xs" />
                      INDEPENDENT STUDIOS & COOPERATIVES
                    </span>
                    <h2 className="font-serif text-2xl sm:text-4xl text-[#24140E] mt-0.5">
                      Shops We Love in the Philippines
                    </h2>
                  </div>
                  <p className="text-xs text-[#5C4A3E] font-mono">
                    ✦ Every purchase directly supports authentic local craft studios.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {shops.slice(0, 3).map((shop) => (
                    <div
                      key={shop.id}
                      className="card-handmade bg-[#FFFDF8] p-5 flex flex-col justify-between"
                    >
                      <div>
                        {/* Shop Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={shop.avatar}
                              alt={shop.name}
                              className="w-13 h-13 rounded-full object-cover border-2 border-[#24140E] shadow-[2px_2px_0px_#24140E]"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="font-serif text-base font-bold text-[#24140E]">
                                  {shop.name}
                                </h3>
                                {shop.badge && (
                                  <span className="tag-handmade-yellow text-[9px] px-1.5 py-0.2 uppercase font-mono">
                                    ★ Star Seller
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#7A6A5C] font-mono mt-0.5">
                                📍 {shop.location}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] text-[#5C4A3E] font-mono mt-0.5">
                                <span className="flex items-center gap-0.5 text-[#24140E] font-bold">
                                  <Star size={11} className="fill-[#FAB900] text-[#24140E]" /> {shop.rating}
                                </span>
                                <span>·</span>
                                <span>{shop.reviewCount} reviews</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setShops((prev) =>
                                prev.map((s) =>
                                  s.id === shop.id ? { ...s, isFollowing: !s.isFollowing } : s
                                )
                              );
                              showToast(shop.isFollowing ? `Unfollowed ${shop.name}` : `Following ${shop.name}!`);
                            }}
                            className={`text-xs px-3 py-1 font-mono uppercase tracking-wider cursor-pointer shrink-0 ${
                              shop.isFollowing
                                ? 'btn-handmade-dark text-xs py-1 px-3'
                                : 'btn-handmade-paper text-xs py-1 px-3'
                            }`}
                          >
                            {shop.isFollowing ? 'Following' : '+ Follow'}
                          </button>
                        </div>

                        <p className="text-xs text-[#5C4A3E] leading-relaxed line-clamp-2 mb-4">
                          {shop.bio}
                        </p>

                        {/* Actual Products from this Shop (Preview Gallery on the Page) */}
                        <div className="space-y-2 pt-3 border-t border-dashed border-[#24140E]/20">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A6A5C] font-bold block">
                            Shop's Featured Products:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {(shop.previewProducts || []).map((item) => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  const found = products.find((p) => p.id === item.id) || products[0];
                                  setSelectedProduct(found);
                                }}
                                className="group/item cursor-pointer bg-[#FAF7EE] rounded-[6px] border-1.5 border-[#24140E] overflow-hidden shadow-[2px_2px_0px_#24140E] hover:shadow-[3px_3px_0px_#FAB900] transition-all"
                              >
                                <div className="aspect-square w-full bg-[#EFE8DD] overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover/item:scale-108 transition-transform duration-300"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="p-1.5 bg-[#FFFDF8]">
                                  <div className="text-[10px] text-[#24140E] font-medium truncate leading-tight">
                                    {item.title}
                                  </div>
                                  <div className="font-mono text-[10px] font-bold text-[#9E3F24] mt-0.5">
                                    ₱{item.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t-2 border-dashed border-[#24140E]/15 flex items-center justify-between text-xs mt-4">
                        <span className="text-[11px] text-[#7A6A5C] font-mono">
                          {shop.salesCount} verified sales
                        </span>
                        <button
                          onClick={() => {
                            setSelectedCategory('ALL');
                            setCurrentPage('EXPLORE');
                          }}
                          className="btn-handmade-stitch text-[11px] font-mono px-2.5 py-1 text-[#24140E] hover:text-[#9E3F24] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Visit shop</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* More Handpicked Finds */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
              <div className="flex items-end justify-between border-b-2 border-[#24140E] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#7A6A5C] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-[#2E4A3D] border border-[#24140E] inline-block" />
                    FRESH FROM PHILIPPINE WORKBENCHES
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#24140E] mt-0.5">
                    Newly Added Finds
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setCurrentPage('EXPLORE');
                  }}
                  className="btn-handmade-paper text-xs font-mono px-3.5 py-1.5 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore all</span>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(4, 8).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isSaved={savedProductIds.has(prod.id)}
                    onToggleSave={handleToggleSave}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Sell on ATBP Callout Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="bg-[#24140E] text-[#FAF7EE] border-2 border-[#24140E] shadow-[5px_5px_0px_#FAB900] rounded-[16px_8px_14px_10px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl text-center md:text-left">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#FAB900] font-bold flex items-center gap-1.5 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-[#FAB900] inline-block" />
                    FOR INDEPENDENT BUSINESSES & MAKERS
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7EE]">
                    Got something to sell? Open your shop on ATBP.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1C3B4] leading-relaxed">
                    Join an artisan marketplace built specifically for independent Philippine small businesses, weavers, ceramists, and vintage curators.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage('STUDIO');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-handmade-gold px-7 py-3.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
                >
                  <Store size={16} />
                  <span>Open Your ATBP Shop</span>
                </button>
              </div>
            </section>

          </div>
        )}

        {currentPage === 'EXPLORE' && (
          <ExploreView
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'TRENDING' && (
          <TrendingView
            products={products}
            shops={shops}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'DEALS' && (
          <DealsView
            products={products}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'LOCAL' && (
          <LocalView
            products={products}
            shops={shops}
            currentLocation={currentLocation}
            onOpenLocationModal={() => setIsLocationOpen(true)}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'COLLECTIONS' && (
          <CollectionsView
            collections={CURATED_COLLECTIONS}
            products={products}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'STUDIO' && (
          <SellerStudioView
            onPublishProduct={handlePublishProduct}
            userProducts={products.filter((p) => p.shop.name.includes('Studio') || p.shop.name.includes('Dhen'))}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

      </main>

      {/* Product Details Modal (Full Listing View) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isSaved={selectedProduct ? savedProductIds.has(selectedProduct.id) : false}
        onToggleSave={handleToggleSave}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onBuyNow={handleBuyNow}
      />

      {/* Cart / Bayong Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Saved / Favorites Drawer */}
      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedProducts={savedProductsList}
        onRemoveSaved={handleToggleSave}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          showToast(`Delivery location set to ${loc}`);
        }}
      />

      {/* Editorial Marketplace Footer */}
      <Footer
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage('EXPLORE');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLocation={() => setIsLocationOpen(true)}
        currentLocation={currentLocation}
      />

    </div>
  );
}
