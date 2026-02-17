import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-white">
      {/* Background Image with Light Overlays */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Premium posters and frames collection"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Soft white gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-semibold tracking-[0.2em] uppercase text-xs mb-4"
          >
            The Minimalist Series
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-6xl md:text-8xl font-light tracking-tight text-slate-900 leading-[1.1] mb-8"
          >
            Art that <br /> 
            <span className="font-serif italic text-slate-400">breathes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-slate-600 mb-10 max-w-sm leading-relaxed"
          >
            Experience a curated selection of museum-quality prints designed for modern living spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-5"
          >
            <Link
              to="/products"
              className="px-10 py-4 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all duration-300 shadow-sm"
            >
              Shop Collection
            </Link>
            <Link
              to="/products?filter=new"
              className="px-10 py-4 border border-slate-200 text-slate-900 font-medium rounded-full hover:bg-slate-50 transition-all duration-300"
            >
              View Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll</span>
        <div className="w-[1px] h-12 bg-slate-200 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-full h-1/3 bg-slate-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;