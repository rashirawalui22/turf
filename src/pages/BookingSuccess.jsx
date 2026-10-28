import { CheckCircle2 } from "lucide-react";
import { Button } from "../components/common/Button";
import { useBooking } from "../context/BookingContext";
import { EmptyState } from "../components/common/EmptyState";
import { formatDate, formatINR } from "../utils/format";
import { formatSlotLabel } from "../utils/slots";

export function BookingSuccess() {
  const { lastConfirmedId, getBooking } = useBooking();
  const booking = lastConfirmedId ? getBooking(lastConfirmedId) : null;

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          title="No confirmation to show"
          text="Complete a demo checkout to see a booking reference."
          action={<Button to="/turfs">Find a turf</Button>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center">
      <CheckCircle2 className="mx-auto text-forest" size={48} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">Simulated booking</p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold">You are booked in — on this demo</h1>
      <p className="mt-3 rounded-full bg-card px-4 py-2 font-mono text-sm">{booking.id}</p>
      <dl className="mt-8 space-y-2 rounded-[16px] bg-offwhite p-6 text-left text-sm">
        <Row k="Turf" v={booking.turfName} />
        <Row k="Date" v={formatDate(booking.date)} />
        <Row k="Time" v={`${formatSlotLabel(booking.start)} – ${formatSlotLabel(booking.end)}`} />
        <Row k="Duration" v={`${booking.duration} hour${booking.duration > 1 ? "s" : ""}`} />
        <Row k="Amount (demo)" v={formatINR(booking.pricing.total)} />
        <Row k="Name" v={booking.customer.name} />
        <Row k="Email" v={booking.customer.email} />
        <Row k="Phone" v={booking.customer.phone} />
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button to="/my-bookings">View My Bookings</Button>
        <Button variant="outline" to="/">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
