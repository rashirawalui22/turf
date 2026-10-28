import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";
import { DEMO_COUPONS, GST_RATE, getTurfById } from "../data/turfs";
import { createBookingRef } from "../utils/bookingId";
import { getSlotEnd } from "../utils/slots";
import { useUI } from "./UIContext";

const BookingContext = createContext(null);

const emptyDraft = {
  turfId: null,
  date: "",
  start: "",
  duration: 1,
  players: 10,
  coupon: "",
};

export function BookingProvider({ children }) {
  const { pushToast } = useUI();
  const [bookings, setBookings] = useLocalStorage(STORAGE_KEYS.bookings, []);
  const [draft, setDraft] = useState(emptyDraft);
  const [lastConfirmedId, setLastConfirmedId] = useState(null);

  const updateDraft = useCallback((patch) => {
    setDraft((d) => ({ ...d, ...patch }));
  }, []);

  const resetDraft = useCallback(() => setDraft(emptyDraft), []);

  const bookedStartsFor = useCallback(
    (turfId, date) => {
      const turf = getTurfById(turfId);
      const fromTurf = turf?.bookedSlots?.default || [];
      const fromUser = bookings
        .filter((b) => b.turfId === turfId && b.date === date && b.status !== "cancelled")
        .flatMap((b) => {
          const starts = [];
          for (let i = 0; i < b.duration; i += 1) {
            const [h, m] = b.start.split(":").map(Number);
            const mins = h * 60 + m + i * 60;
            const hh = String(Math.floor(mins / 60)).padStart(2, "0");
            const mm = String(mins % 60).padStart(2, "0");
            starts.push(`${hh}:${mm}`);
          }
          return starts;
        });
      return [...new Set([...fromTurf, ...fromUser])];
    },
    [bookings]
  );

  const priceBreakdown = useCallback((turf, { duration, coupon }) => {
    const base = turf.pricePerHour * duration;
    const code = String(coupon || "")
      .trim()
      .toUpperCase();
    const offer = DEMO_COUPONS[code];
    let discount = 0;
    if (offer?.type === "percent") discount = Math.round((base * offer.value) / 100);
    if (offer?.type === "flat") discount = Math.min(offer.value, base);
    const taxable = Math.max(base - discount, 0);
    const tax = Math.round(taxable * GST_RATE);
    return {
      base,
      discount,
      coupon: offer ? offer.label : code || "",
      couponValid: Boolean(offer),
      tax,
      taxLabel: "GST 18% (demo estimate)",
      total: taxable + tax,
    };
  }, []);

  const confirmBooking = useCallback(
    (customer) => {
      const turf = getTurfById(draft.turfId);
      if (!turf || !draft.date || !draft.start) {
        return { ok: false, error: "Select a turf, date, and time slot first." };
      }
      const pricing = priceBreakdown(turf, draft);
      const booking = {
        id: createBookingRef(),
        turfId: turf.id,
        turfName: turf.name,
        turfImage: turf.image,
        area: turf.area,
        date: draft.date,
        start: draft.start,
        end: getSlotEnd(draft.start, draft.duration),
        duration: draft.duration,
        players: draft.players,
        pricing,
        customer,
        status: "upcoming",
        demo: true,
        createdAt: new Date().toISOString(),
      };
      setBookings((list) => [booking, ...list]);
      setLastConfirmedId(booking.id);
      pushToast({ title: "Demo booking saved", message: booking.id });
      return { ok: true, booking };
    },
    [draft, priceBreakdown, pushToast, setBookings]
  );

  const cancelBooking = useCallback(
    (id) => {
      setBookings((list) =>
        list.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
      pushToast({ title: "Booking cancelled", message: "Updated in this browser only.", type: "info" });
    },
    [pushToast, setBookings]
  );

  const getBooking = useCallback((id) => bookings.find((b) => b.id === id), [bookings]);

  const value = useMemo(
    () => ({
      bookings,
      draft,
      updateDraft,
      resetDraft,
      lastConfirmedId,
      bookedStartsFor,
      priceBreakdown,
      confirmBooking,
      cancelBooking,
      getBooking,
    }),
    [
      bookings,
      draft,
      updateDraft,
      resetDraft,
      lastConfirmedId,
      bookedStartsFor,
      priceBreakdown,
      confirmBooking,
      cancelBooking,
      getBooking,
    ]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
