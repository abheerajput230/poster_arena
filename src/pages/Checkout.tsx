import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', pincode: '', state: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-muted-foreground mb-8">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          <a href="/" className="inline-flex px-8 py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Continue Shopping
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', full: false },
                  { key: 'phone', label: 'Phone Number', full: false },
                  { key: 'email', label: 'Email', full: true },
                  { key: 'address', label: 'Address', full: true },
                  { key: 'city', label: 'City', full: false },
                  { key: 'pincode', label: 'PIN Code', full: false },
                  { key: 'state', label: 'State', full: true },
                ].map(field => (
                  <div key={field.key} className={field.full ? 'md:col-span-2' : ''}>
                    <label className="block text-sm text-muted-foreground mb-1">{field.label}</label>
                    <input
                      type="text"
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: 'upi', label: 'UPI (GPay, PhonePe, Paytm)' },
                  { value: 'card', label: 'Credit / Debit Card' },
                  { value: 'cod', label: 'Cash on Delivery' },
                ].map(method => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === method.value ? 'border-gold bg-gold/5' : 'border-border hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="accent-gold"
                    />
                    <span className="text-sm">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shine text-lg"
            >
              Place Order — ₹{totalPrice}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">
                    {item.product.title} × {item.quantity}
                  </span>
                  <span className="shrink-0">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-gold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-gold">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
