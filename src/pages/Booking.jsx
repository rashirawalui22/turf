import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTurfById } from "../data/turfs";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { BookingSummary } from "../components/booking/BookingSummary";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { validateBookingCustomer } from "../utils/validation";
import { ImageWithFallback } from "../components/common/ImageWithFallback";

export function Booking() {
  const { id } = useParams();
  const turf = getTurfById(id);
  const { draft, updateDraft, priceBreakdown, confirmBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    accepted: false,
  });
  const [errors, setErrors] = useState({});

  const pricing = useMemo(() => (turf ? priceBreakdown(turf, draft) : null), [turf, draft, priceBreakdown]);

  if (!turf) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState title="Booking unavailable" text="Unknown turf id." action={<Button to="/turfs">Explore turfs</Button>} />
      </div>
    );
  }

  if (draft.turfId !== turf.id || !draft.start || !draft.date) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          title="Select a slot first"
          text="Open the turf page, pick a date and time, then continue."
          action={<Button to={`/turfs/${turf.id}`}>Back to {turf.name}</Button>}
        />
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    const next = validateBookingCustomer(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    const result = confirmBooking(form);
    if (result.ok) navigate("/booking-success");
  };

  return (
    <div className="bg-offwhite py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="rounded-[18px] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Demo checkout</p>
          <h1 className="mt-1 font-heading text-3xl font-extrabold">Confirm your booking</h1>
          <p className="mt-2 text-sm text-muted">
            No payment is collected. Confirming saves a simulated reservation in this browser.
          </p>
          <div className="mt-6 flex gap-3 rounded-2xl bg-offwhite p-3">
            <ImageWithFallback src={turf.image} alt="" className="h-20 w-28 rounded-xl object-cover" />
            <div>
              <p className="font-heading font-bold">{turf.name}</p>
              <p className="text-sm text-muted">{turf.area} · {turf.sport}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}>
              <input
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Field>
            <Field label="Coupon">
              <input
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
                value={draft.coupon}
                onChange={(e) => updateDraft({ coupon: e.target.value })}
                placeholder="TURF10"
              />
            </Field>
          </div>
          <label className="mt-5 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.accepted}
              onChange={(e) => setForm({ ...form, accepted: e.target.checked })}
              className="mt-1"
            />
            <span>
              I understand this is a demo booking, not a confirmed reservation with a real venue, and I have read the sample cancellation note.
            </span>
          </label>
          {errors.accepted ? <p className="mt-1 text-xs text-red-700">{errors.accepted}</p> : null}
          <Button type="submit" className="mt-6 w-full py-3">
            Confirm Booking
          </Button>
        </form>
        <BookingSummary turf={turf} draft={draft} pricing={pricing} />
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
