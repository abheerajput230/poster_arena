import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <>
      <Hero />

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-2">
                Trending Now
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold">
                Best Sellers
              </motion.h2>
            </div>
            <Link to="/products?filter=bestseller" className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
              View All <ArrowRight size={16} />            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-surface border border-border p-12 md:p-20 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
            <div className="relative">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Limited Time</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Flat 40% Off</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">On all framed posters. Use code FRAME40 at checkout.</p>
              <Link to="/products?filter=offers" className="inline-flex items-center px-8 py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shine">
                Shop Offers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-2">
                Just Dropped
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold">
                New Arrivals
              </motion.h2>
            </div>
            <Link to="/products?filter=new" className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-surface">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Movie', 'Marvel', 'WWE', 'Gaming', 'Anime', 'Sports'].map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat + ' Posters')}`}
                  className="block p-6 bg-surface border border-border rounded-xl text-center hover:border-gold/30 hover:bg-surface-hover transition-all duration-300 group"
                >
                  <p className="font-medium group-hover:text-gold transition-colors">{cat}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
