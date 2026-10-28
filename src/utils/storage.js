export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

export const STORAGE_KEYS = {
  bookings: "turf.demo.bookings",
  cart: "turf.demo.cart",
  users: "turf.demo.users",
  session: "turf.demo.session",
  newsletter: "turf.demo.newsletter",
  preferences: "turf.demo.preferences",
};
