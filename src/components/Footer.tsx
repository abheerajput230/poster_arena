import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">FRAMEHAUS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium posters and frames to transform your space. Curated art for the modern aesthetic.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-surface hover:bg-gold hover:text-primary-foreground transition-all duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <div className="space-y-3">
              {['Posters', 'Frames', 'New Arrivals', 'Best Sellers', 'Offers'].map(item => (
                <Link key={item} to="/products" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <div className="space-y-3">
              {['Shipping Policy', 'Returns & Exchange', 'FAQ', 'Track Order'].map(item => (
                <a key={item} href="#" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <div className="space-y-3">
              {['About Us', 'Contact', 'Blog', 'Careers'].map(item => (
                <a key={item} href="#" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 FRAMEHAUS. All rights reserved.</p>
        </div> 
      </div>
    </footer>
  );
};
export default Footer;