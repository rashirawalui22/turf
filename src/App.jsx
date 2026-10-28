import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { ExploreTurfs } from "./pages/ExploreTurfs";
import { TurfDetails } from "./pages/TurfDetails";
import { Booking } from "./pages/Booking";
import { BookingSuccess } from "./pages/BookingSuccess";
import { MyBookings } from "./pages/MyBookings";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/turfs" element={<ExploreTurfs />} />
        <Route path="/turfs/:id" element={<TurfDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
