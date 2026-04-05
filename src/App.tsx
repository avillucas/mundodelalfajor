import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Star, 
  Clock, 
  Truck, 
  Instagram, 
  Facebook,
  Menu,
  Search,
  Filter,
  Globe,
  DollarSign,
  Info
} from 'lucide-react';
import { PRODUCTS, Product, CartItem, Category, Flavor, LidType } from './types';
import { cn } from './lib/utils';

const CURRENCIES = {
  ARS: { symbol: '$', rate: 1, label: 'Peso Argentino' },
  USD: { symbol: 'u$s', rate: 0.001, label: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.0009, label: 'Euro' }
};

type CurrencyCode = keyof typeof CURRENCIES;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('ARS');
  
  // Filters
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeBrand, setActiveBrand] = useState<string | 'all'>('all');
  const [activeFlavor, setActiveFlavor] = useState<Flavor | 'all'>('all');
  const [activeLid, setActiveLid] = useState<LidType | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  // Shipping Calculator State
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingEstimate, setShippingEstimate] = useState<number | null>(null);

  const brands = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.brand))).sort(), []);
  const flavors = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.flavor))).sort(), []);
  const lids = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.lidType))).sort(), []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchBrand = activeBrand === 'all' || p.brand === activeBrand;
      const matchFlavor = activeFlavor === 'all' || p.flavor === activeFlavor;
      const matchLid = activeLid === 'all' || p.lidType === activeLid;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchBrand && matchFlavor && matchLid && matchPrice;
    });
  }, [activeCategory, activeBrand, activeFlavor, activeLid, priceRange]);

  const formatPrice = (price: number) => {
    const converted = price * CURRENCIES[currency].rate;
    return `${CURRENCIES[currency].symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: currency === 'ARS' ? 0 : 2, maximumFractionDigits: 2 })}`;
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const calculateShipping = () => {
    if (!shippingCountry) return;
    // Mock logic: $25 USD flat for international
    const baseShippingARS = 25000;
    setShippingEstimate(baseShippingARS);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-brand-50">
      {/* Top Bar - Currency & Info */}
      <div className="bg-brand-900 text-brand-100 py-2 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Globe size={12} /> Global Shipping</span>
            <span className="hidden sm:flex items-center gap-1"><Truck size={12} /> Free over $50 USD</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-brand-700 pr-4">
              {Object.keys(CURRENCIES).map((code) => (
                <button 
                  key={code}
                  onClick={() => setCurrency(code as CurrencyCode)}
                  className={cn(
                    "hover:text-white transition-colors",
                    currency === code ? "text-white underline underline-offset-4" : "text-brand-400"
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
            <a href="#" className="hover:text-white transition-colors">Track Order</a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden p-2 text-brand-800"
              >
                <Filter size={24} />
              </button>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tighter text-brand-900 uppercase">El Mundo del Alfajor</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-semibold -mt-1">Argentine Export Quality</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-700">
              <a href="#productos" className="hover:text-brand-900 transition-colors">Catálogo</a>
              <a href="#marcas" className="hover:text-brand-900 transition-colors">Marcas</a>
              <a href="#shipping" className="hover:text-brand-900 transition-colors">Envíos</a>
              <a href="#" className="hover:text-brand-900 transition-colors">Contacto</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-brand-800 hover:bg-brand-100 rounded-full transition-colors">
                <Search size={20} />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-brand-800 hover:bg-brand-100 rounded-full transition-colors"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=2000" 
              alt="Alfajores Argentinos"
              className="w-full h-full object-cover brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 via-transparent to-brand-50" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-brand-800/80 backdrop-blur-sm text-xs font-bold mb-6 border border-brand-700 uppercase tracking-widest">
                Worldwide Shipping • Envíos a todo el mundo
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
                El Sabor Argentino <br /> <span className="text-brand-300 italic">en tu puerta</span>
              </h1>
              <p className="text-lg md:text-2xl text-brand-50/90 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
                Exportamos la mayor variedad de alfajores de Argentina. Desde los clásicos de siempre hasta las joyas artesanales más exclusivas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brand Selector (Horizontal) */}
        <section id="marcas" className="py-12 bg-white border-b border-brand-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-8 text-center">Nuestras Marcas</h3>
            <div className="flex overflow-x-auto pb-4 gap-8 no-scrollbar items-center justify-start sm:justify-center">
              {['all', ...brands].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm font-serif italic transition-all",
                    activeBrand === brand 
                      ? "text-brand-900 font-bold scale-110 underline decoration-brand-300 underline-offset-8" 
                      : "text-brand-400 hover:text-brand-600"
                  )}
                >
                  {brand === 'all' ? 'Todas las Marcas' : brand}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Catalog Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-900 mb-6 flex items-center gap-2">
                <Filter size={14} /> Categorías
              </h4>
              <div className="space-y-3">
                {['all', 'Clásicos', 'Premium', 'Artesanales', 'Triples', 'Especiales'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={cn(
                      "block w-full text-left text-sm transition-colors",
                      activeCategory === cat ? "text-brand-900 font-bold" : "text-brand-500 hover:text-brand-700"
                    )}
                  >
                    {cat === 'all' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-900 mb-6">Sabores</h4>
              <div className="space-y-3">
                {['all', ...flavors].map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setActiveFlavor(flavor as any)}
                    className={cn(
                      "block w-full text-left text-sm transition-colors",
                      activeFlavor === flavor ? "text-brand-900 font-bold" : "text-brand-500 hover:text-brand-700"
                    )}
                  >
                    {flavor === 'all' ? 'Todos los sabores' : flavor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-900 mb-6">Tipo de Tapa</h4>
              <div className="space-y-3">
                {['all', ...lids].map((lid) => (
                  <button
                    key={lid}
                    onClick={() => setActiveLid(lid as any)}
                    className={cn(
                      "block w-full text-left text-sm transition-colors",
                      activeLid === lid ? "text-brand-900 font-bold" : "text-brand-500 hover:text-brand-700"
                    )}
                  >
                    {lid === 'all' ? 'Todas las tapas' : lid}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-900 mb-6">Rango de Precio</h4>
              <input 
                type="range" 
                min="0" 
                max="20000" 
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-brand-900"
              />
              <div className="flex justify-between text-[10px] font-bold text-brand-400 mt-2">
                <span>$0</span>
                <span>Hasta {formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-brand-900">Catálogo ({filteredProducts.length})</h2>
              <div className="flex items-center gap-2 text-xs text-brand-500">
                <span>Ordenar por:</span>
                <select className="bg-transparent font-bold text-brand-900 outline-none">
                  <option>Relevancia</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-100"
                  >
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-brand-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                        <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {product.flavor}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">{product.brand}</p>
                          <h3 className="text-xl font-serif font-bold text-brand-900">{product.name}</h3>
                        </div>
                        <span className="text-[10px] font-mono text-brand-400">{product.sku}</span>
                      </div>
                      <p className="text-sm text-brand-600 font-light mb-6 line-clamp-2">
                        {product.description}
                      </p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/10"
                      >
                        <Plus size={18} /> Agregar al Carrito
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Shipping Calculator Section */}
        <section id="shipping" className="py-24 bg-white border-t border-brand-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-800 mx-auto mb-8">
              <Truck size={40} />
            </div>
            <h2 className="text-4xl font-serif font-bold text-brand-900 mb-6">Calculador de Envíos</h2>
            <p className="text-brand-600 mb-10 font-light">
              Ingresa tu país para estimar el costo de envío internacional. Utilizamos logística express para que tus alfajores lleguen frescos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="País de destino (ej: España, USA, Chile)"
                className="flex-grow px-6 py-4 rounded-2xl border border-brand-200 focus:border-brand-800 outline-none transition-colors"
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              />
              <button 
                onClick={calculateShipping}
                className="px-8 py-4 bg-brand-900 text-white rounded-2xl font-bold hover:bg-brand-800 transition-all"
              >
                Calcular
              </button>
            </div>
            {shippingEstimate !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-brand-50 rounded-3xl border border-brand-100"
              >
                <p className="text-sm text-brand-600 mb-2">Costo estimado de envío a <span className="font-bold text-brand-900">{shippingCountry}</span>:</p>
                <p className="text-3xl font-serif font-bold text-brand-900">{formatPrice(shippingEstimate)}</p>
                <p className="text-[10px] text-brand-400 mt-4 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Info size={12} /> Tiempo estimado: 5-7 días hábiles
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-serif font-bold block mb-6 tracking-tighter uppercase">El Mundo del Alfajor</span>
              <p className="text-brand-300 text-sm font-light leading-relaxed">
                Especialistas en la exportación de cultura argentina. Llevamos los sabores más icónicos de nuestra tierra a cualquier rincón del planeta.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-brand-400">Marcas Icónicas</h4>
              <ul className="space-y-4 text-sm text-brand-300">
                {brands.slice(0, 5).map(b => (
                  <li key={b}><a href="#" className="hover:text-white transition-colors">{b}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-brand-400">Exportación</h4>
              <ul className="space-y-4 text-sm text-brand-300">
                <li><a href="#" className="hover:text-white transition-colors">Envíos Internacionales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Venta Mayorista</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aduana y Logística</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-brand-400">Contacto Global</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
              <p className="text-xs text-brand-400">Buenos Aires, Argentina <br /> export@elmundodelalfajor.com</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-[10px] text-brand-500 uppercase tracking-[0.3em]">
            © 2026 El Mundo del Alfajor • Argentine Export Quality
          </div>
        </div>
      </footer>

      {/* Cart Sidebar Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-brand-100 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-brand-900">Tu Carrito</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-brand-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag size={64} className="mb-4" />
                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-brand-800 font-bold underline"
                    >
                      Empezar a comprar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-bold text-brand-900">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-brand-400 hover:text-red-500">
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-brand-500 mb-3">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-brand-200 flex items-center justify-center hover:bg-brand-50"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-brand-200 flex items-center justify-center hover:bg-brand-50"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-brand-100 bg-brand-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-brand-600">Subtotal</span>
                    <span className="text-2xl font-serif font-bold text-brand-900">{formatPrice(cartTotal)}</span>
                  </div>
                  <button className="w-full py-4 bg-brand-900 text-white rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/20">
                    Finalizar Compra
                  </button>
                  <p className="text-center text-[10px] text-brand-400 mt-4 uppercase tracking-widest">
                    Envío calculado al finalizar
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-6 border-b border-brand-100 flex justify-between items-center">
                <h2 className="text-xl font-serif font-bold text-brand-900">Filtros</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-6 space-y-8">
                {/* Mobile filters content (same as desktop sidebar) */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-900 mb-4">Categorías</h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Clásicos', 'Premium', 'Artesanales', 'Triples', 'Especiales'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as any)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs border",
                          activeCategory === cat ? "bg-brand-900 text-white border-brand-900" : "bg-white text-brand-500 border-brand-200"
                        )}
                      >
                        {cat === 'all' ? 'Todos' : cat}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Add other filters here for mobile if needed */}
              </div>
              <div className="p-6 border-t border-brand-100">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-brand-900 text-white rounded-xl font-bold"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
