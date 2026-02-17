import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
