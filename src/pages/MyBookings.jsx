import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { ConfirmationDialog } from "../components/common/ConfirmationDialog";
import { formatDate, formatINR } from "../utils/format";
import { formatSlotLabel } from "../utils/slots";
import { Modal } from "../components/common/Modal";

export function MyBookings() {
  const { bookings, cancelBooking } = useBooking();
  const [tab, setTab] = useState("upcoming");
  const [cancelId, setCancelId] = useState(null);
  const [detail, setDetail] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const list = useMemo(() => {
    return bookings.filter((b) => {
      const past = b.status === "cancelled" || b.date < today;
      return tab === "upcoming" ? !past && b.status === "upcoming" : past;
    });
  }, [bookings, tab, today]);

  return (
    <div className="bg-offwhite py-12">
      <div className="mx-auto max-w-4xl px-5">
        <h1 className="font-heading text-3xl font-extrabold">My Bookings</h1>
        <p className="mt-2 text-sm text-muted">
          These are simulated reservations stored in your browser, not confirmed slots with a real venue.
        </p>
        <div className="mt-6 flex gap-2">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-forest text-white" : "bg-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {list.length === 0 ? (
            <EmptyState
              icon={CalendarX}
              title={tab === "upcoming" ? "No upcoming demo bookings" : "No past bookings yet"}
              text="Book a sample turf to see it appear here after refresh as well."
              action={<Button to="/turfs">Explore turfs</Button>}
            />
          ) : (
            list.map((b) => (
              <article key={b.id} className="flex flex-col gap-4 rounded-[16px] bg-white p-4 sm:flex-row">
                <ImageWithFallback src={b.turfImage} alt="" className="h-32 w-full rounded-xl object-cover sm:w-44" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-heading text-xl font-bold">{b.turfName}</h2>
                    <span className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold capitalize text-forest">
                      {b.status === "cancelled" ? "cancelled (demo)" : tab === "past" ? "completed (demo)" : "upcoming (demo)"}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{b.area} · {b.id}</p>
                  <p className="mt-2 text-sm">
                    {formatDate(b.date)} · {formatSlotLabel(b.start)} · {b.duration}h · {formatINR(b.pricing.total)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" className="py-2" onClick={() => setDetail(b)}>
                      View Details
                    </Button>
                    {b.status === "upcoming" && tab === "upcoming" ? (
                      <Button variant="ghost" className="py-2" onClick={() => setCancelId(b.id)}>
                        Cancel Booking
                      </Button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
      <ConfirmationDialog
        open={Boolean(cancelId)}
        onClose={() => setCancelId(null)}
        title="Cancel this demo booking?"
        text="This only updates localStorage. No venue is notified."
        confirmLabel="Cancel booking"
        onConfirm={() => cancelBooking(cancelId)}
      />
      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title={detail?.turfName}>
        {detail ? (
          <div className="space-y-2 text-sm">
            <p>Reference: {detail.id}</p>
            <p>
              {formatDate(detail.date)} · {formatSlotLabel(detail.start)} ({detail.duration}h)
            </p>
            <p>Players: {detail.players}</p>
            <p>Amount: {formatINR(detail.pricing.total)} (demo, not paid)</p>
            <p>
              {detail.customer.name} · {detail.customer.email}
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
