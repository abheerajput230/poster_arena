import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

const Navbar = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();
  const menuTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMenuEnter = (menu: string) => {
    clearTimeout(menuTimeout.current);
    setMegaMenuOpen(menu);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setMegaMenuOpen(null), 200);
  };

  useEffect(() => () => clearTimeout(menuTimeout.current), []);

  const navItems = [
    { label: 'Frames', key: 'Frames' },
    { label: 'Posters', key: 'Posters' },
    { label: 'New Arrivals', key: 'new', link: '/products?filter=new' },
    { label: 'Best Sellers', key: 'best', link: '/products?filter=best' },
    { label: 'Offers', key: 'offers', link: '/products?filter=offers' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-slate-900 p-2">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="font-display text-xl lg:text-2xl font-bold tracking-tighter text-slate-900">
              FRAME<span className="font-light text-slate-400">HAUS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map(item => (
                <div
                  key={item.key}
                  onMouseEnter={() => (item.key === 'Frames' || item.key === 'Posters' ? handleMenuEnter(item.key) : setMegaMenuOpen(null))}
                  onMouseLeave={handleMenuLeave}
                  className="relative py-2"
                >
                  {item.link ? (
                    <Link to={item.link} className="text-[13px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <button className="text-[13px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
                      {item.label} <ChevronDown size={12} className={`transition-transform duration-300 ${megaMenuOpen === item.key ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                  {/* Underline effect */}
                  <motion.div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: megaMenuOpen === item.key ? 1 : 0 }} />
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link to="/all-posters" className="hidden md:block px-4 py-2 text-[13px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                See All
              </Link>
              <Link to="/custom-frame" className="hidden md:block px-4 py-2 text-[13px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                Custom Frame
              </Link>
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="p-2 text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                <Heart size={20} strokeWidth={1.5} />
              </Link>
              <button onClick={() => setIsOpen(true)} className="p-2 text-slate-500 hover:text-slate-900 transition-colors relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {(megaMenuOpen === 'Frames' || megaMenuOpen === 'Posters') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-white border-b border-slate-100 shadow-xl shadow-slate-200/20"
              onMouseEnter={() => handleMenuEnter(megaMenuOpen)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {categories[megaMenuOpen as keyof typeof categories].map(sub => (
                    <Link
                      key={sub}
                      to={`/products?category=${encodeURIComponent(sub)}`}
                      className="group"
                      onClick={() => setMegaMenuOpen(null)}
                    >
                      <p className="text-sm font-medium text-slate-400 group-hover:text-slate-900 transition-colors mb-1">Explore</p>
                      <p className="text-base font-semibold text-slate-900">{sub}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-full bg-white border-b border-slate-100 px-6 py-8"
            >
              <div className="container mx-auto relative max-w-3xl">
                <input
                  type="text"
                  placeholder="Search our collection..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-full pl-14 pr-6 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  autoFocus
                />
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <button onClick={() => setSearchOpen(false)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-full max-w-sm h-full bg-white p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <span className="font-display font-bold text-xl">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="p-2"><X size={24} /></button>
              </div>
              <div className="space-y-8">
                {navItems.map(item => (
                  <div key={item.key}>
                    {item.link ? (
                      <Link to={item.link} onClick={() => setMobileOpen(false)} className="text-2xl font-semibold text-slate-900">
                        {item.label}
                      </Link>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">{item.label}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {categories[item.key as keyof typeof categories]?.map(sub => (
                            <Link
                              key={sub}
                              to={`/products?category=${encodeURIComponent(sub)}`}
                              onClick={() => setMobileOpen(false)}
                              className="text-lg text-slate-700 hover:text-slate-900"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;