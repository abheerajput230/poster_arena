import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div className="relative bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300">
        {/* Image */}
        <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 bg-gradient-gold text-primary-foreground text-xs font-bold rounded">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-1 bg-gold-dark text-primary-foreground text-xs font-bold rounded">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
          >
            <Heart size={18} className={liked ? 'fill-destructive text-destructive' : 'text-foreground'} />
          </button>
        </Link>

        {/* Info */}
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-foreground text-sm mb-1 truncate hover:text-gold transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3">{product.subcategory}</p>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gold">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => addItem(product, 'A4')}
              className="p-2 rounded-lg bg-surface hover:bg-gold hover:text-primary-foreground transition-all duration-200"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
