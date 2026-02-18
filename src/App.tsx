import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";

import AllPosters from "@/components/AllPosters";
import CustomFrame from "@/components/CustomFrame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Home */}
            <Route path="/" element={<CustomFrame />} />

            {/* All Posters */}
            <Route path="/all-posters" element={<AllPosters />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
