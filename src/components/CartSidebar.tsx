import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-surface rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="text-lg">Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 bg-surface rounded-lg p-3">
                    <img src={item.product.image} alt={item.product.title} className="w-20 h-24 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {item.selectedSize} {item.selectedFrame && `• ${item.selectedFrame}`}
                      </p>
                      <p className="text-sm font-bold text-gold mt-1">₹{item.totalPrice}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 rounded bg-background hover:bg-border transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 rounded bg-background hover:bg-border transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold">₹{totalPrice}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-lg text-center hover:opacity-90 transition-opacity shine"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
