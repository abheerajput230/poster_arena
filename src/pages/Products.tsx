import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const searchQuery = searchParams.get('search');

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const allSubcategories = [...categories.Frames, ...categories.Posters];

  const filtered = useMemo(() => {
    let result = [...products];

    if (filterParam === 'new') result = result.filter(p => p.isNew);
    if (filterParam === 'bestseller') result = result.filter(p => p.isBestSeller);
    if (filterParam === 'offers') result = result.filter(p => p.originalPrice);

    if (selectedCategory) {
      result = result.filter(p => p.subcategory === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [filterParam, selectedCategory, searchQuery, priceRange, sortBy]);

  const title = filterParam === 'new' ? 'New Arrivals' : filterParam === 'bestseller' ? 'Best Sellers' : filterParam === 'offers' ? 'Special Offers' : selectedCategory || 'All Products';

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 border border-border rounded-lg hover:bg-surface transition-colors"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-40 bg-card p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 lg:shrink-0`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h3 className="font-display text-xl font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X size={24} /></button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-semibold text-sm text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-gold/10 text-gold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  All
                </button>
                {allSubcategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                    className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-gold/10 text-gold' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Price Range</h4>
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl mb-2">No products found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
