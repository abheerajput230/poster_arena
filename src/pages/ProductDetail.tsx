import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState('A4');
  const [selectedFrame, setSelectedFrame] = useState('No Frame');
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const sizePrice = product.sizes.find(s => s.label === selectedSize)?.price || 0;
  const framePrice = product.frameTypes?.find(f => f.label === selectedFrame)?.price || 0;
  const totalPrice = (product.price + sizePrice + framePrice) * quantity;

  const related = products.filter(p => p.id !== product.id && p.subcategory === product.subcategory).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedFrame);
    }
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-2">{product.subcategory}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted-foreground'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-bold text-gold">₹{totalPrice}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Size */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size.label
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-border hover:border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {size.label}
                    {size.price > 0 && <span className="block text-xs mt-0.5">+₹{size.price}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame */}
            {product.frameTypes && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3">Frame Type</h3>
                <div className="flex flex-wrap gap-3">
                  {product.frameTypes.map(frame => (
                    <button
                      key={frame.label}
                      onClick={() => setSelectedFrame(frame.label)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                        selectedFrame === frame.label
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border hover:border-muted-foreground text-muted-foreground'
                      }`}
                    >
                      {frame.label}
                      {frame.price > 0 && <span className="ml-1 text-xs">+₹{frame.price}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-sm font-semibold">Quantity</h3>
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-surface transition-colors">
                  <Minus size={16} />
                </button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-surface transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shine"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-4 border rounded-lg transition-all ${liked ? 'border-destructive bg-destructive/10' : 'border-border hover:bg-surface'}`}
              >
                <Heart size={20} className={liked ? 'fill-destructive text-destructive' : ''} />
              </button>
            </div>

            {/* Buy Now */}
            <Link
              to="/checkout"
              onClick={handleAddToCart}
              className="block w-full py-4 border border-gold text-gold font-semibold rounded-lg text-center hover:bg-gold/10 transition-colors mb-8"
            >
              Buy Now
            </Link>

            {/* Description */}
            <div className="border-t border-border pt-8">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Reviews */}
            <div className="border-t border-border pt-8 mt-8">
              <h3 className="font-semibold mb-4">Reviews ({product.reviews})</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rahul S.', rating: 5, text: 'Absolutely stunning quality! The print is vibrant and the frame is solid.' },
                  { name: 'Priya M.', rating: 4, text: 'Beautiful poster, looks great on my wall. Delivery was fast too.' },
                ].map((review, i) => (
                  <div key={i} className="bg-surface rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={12} className={j < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground'} />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
