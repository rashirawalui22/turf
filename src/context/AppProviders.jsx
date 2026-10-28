import { AuthProvider } from "./AuthContext";
import { BookingProvider } from "./BookingContext";
import { CartProvider } from "./CartContext";
import { UIProvider } from "./UIContext";

export function AppProviders({ children }) {
  return (
    <UIProvider>
      <AuthProvider>
        <CartProvider>
          <BookingProvider>{children}</BookingProvider>
        </CartProvider>
      </AuthProvider>
    </UIProvider>
  );
}
