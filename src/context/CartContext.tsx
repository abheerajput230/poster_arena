import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, frame?: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getItemPrice = (product: Product, size: string, frame?: string) => {
    const sizePrice = product.sizes.find(s => s.label === size)?.price || 0;
    const framePrice = frame ? (product.frameTypes?.find(f => f.label === frame)?.price || 0) : 0;
    return product.price + sizePrice + framePrice;
  };

  const addItem = useCallback((product: Product, size: string, frame?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.selectedSize === size && i.selectedFrame === frame);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedSize === size && i.selectedFrame === frame
            ? { ...i, quantity: i.quantity + 1, totalPrice: getItemPrice(product, size, frame) * (i.quantity + 1) }
            : i
        );
      }
      const price = getItemPrice(product, size, frame);
      return [...prev, { product, quantity: 1, selectedSize: size, selectedFrame: frame, totalPrice: price }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.selectedSize === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems(prev => prev.map(i =>
      i.product.id === productId && i.selectedSize === size
        ? { ...i, quantity, totalPrice: (i.totalPrice / i.quantity) * quantity }
        : i
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.totalPrice, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
