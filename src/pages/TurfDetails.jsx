import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getSimilarTurfs, getTurfById, turfReviews } from "../data/turfs";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { RatingStars } from "../components/common/RatingStars";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { TurfCard } from "../components/turf/TurfCard";
import { BookingCalendar } from "../components/booking/BookingCalendar";
import { TimeSlotSelector } from "../components/booking/TimeSlotSelector";
import { BookingSummary } from "../components/booking/BookingSummary";
import { useBooking } from "../context/BookingContext";
import { todayISO } from "../utils/format";
import { useUI } from "../context/UIContext";

export function TurfDetails() {
  const { id } = useParams();
  const turf = getTurfById(id);
  const { draft, updateDraft, bookedStartsFor, priceBreakdown } = useBooking();
  const { pushToast } = useUI();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    if (!turf) return;
    updateDraft({
      turfId: turf.id,
      date: draft.date || todayISO(),
      duration: draft.duration || 1,
      players: draft.players || 10,
    });
    setPhoto(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turf?.id]);

  const booked = useMemo(
    () => (turf ? bookedStartsFor(turf.id, draft.date) : []),
    [turf, bookedStartsFor, draft.date]
  );
  const pricing = turf ? priceBreakdown(turf, draft) : null;
  const reviews = turfReviews[id] || [];

  if (!turf) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          title="Turf not found"
          text="That listing is not in the sample catalogue."
          action={<Button to="/turfs">Back to Explore Turfs</Button>}
        />
      </div>
    );
  }

  const continueBooking = () => {
    if (!draft.date || !draft.start) {
      pushToast({ type: "info", title: "Choose a slot", message: "Select a date and available time first." });
      return;
    }
    navigate(`/booking/${turf.id}`);
  };

  return (
    <div className="bg-white pb-16">
      <div className="bg-offwhite">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <ImageWithFallback
              src={turf.gallery[photo] || turf.image}
              alt={`${turf.name} photo ${photo + 1}`}
              className="h-[360px] w-full rounded-[18px] object-cover sm:h-[440px]"
            />
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {turf.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={`h-16 w-24 overflow-hidden rounded-xl border-2 ${i === photo ? "border-forest" : "border-transparent"}`}
                >
                  <ImageWithFallback src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] border border-black/5 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-muted">Sample listing</p>
            <h1 className="mt-1 font-heading text-3xl font-extrabold">{turf.name}</h1>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted">
              <MapPin size={14} /> {turf.address}
            </p>
            <div className="mt-3">
              <RatingStars value={turf.rating} count={turf.reviewCount} />
            </div>
            <p className="mt-3 text-sm">
              {turf.sport} · {turf.surface} · {turf.setting}
            </p>
            <div className="mt-4">
              <PriceDisplay amount={turf.pricePerHour} size="lg" />
            </div>
            <BookingCalendar value={draft.date} onChange={(date) => updateDraft({ date, start: "" })} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="text-sm">
                <span className="mb-1 block font-medium">Duration</span>
                <select
                  className="w-full rounded-xl border border-black/10 px-3 py-2.5"
                  value={draft.duration}
                  onChange={(e) => updateDraft({ duration: Number(e.target.value), start: "" })}
                >
                  {[1, 2, 3].map((h) => (
                    <option key={h} value={h}>
                      {h} hour{h > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium">Players</span>
                <input
                  type="number"
                  min="2"
                  max="22"
                  className="w-full rounded-xl border border-black/10 px-3 py-2.5"
                  value={draft.players}
                  onChange={(e) => updateDraft({ players: Number(e.target.value) })}
                />
              </label>
            </div>
            <div className="mt-4">
              <TimeSlotSelector
                turf={turf}
                date={draft.date}
                start={draft.start}
                duration={draft.duration}
                bookedStarts={booked}
                onSelect={(start) => updateDraft({ start })}
              />
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1 block font-medium">Coupon (optional)</span>
              <input
                className="w-full rounded-xl border border-black/10 px-3 py-2.5"
                placeholder="TURF10 or PLAY200"
                value={draft.coupon}
                onChange={(e) => updateDraft({ coupon: e.target.value })}
              />
            </label>
            {pricing ? (
              <p className="mt-3 text-sm">
                Estimated total <strong>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(pricing.total)}</strong>{" "}
                including demo GST.
              </p>
            ) : null}
            <Button className="mt-5 w-full py-3" onClick={continueBooking}>
              Continue to booking
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-2xl font-bold">About this ground</h2>
            <p className="mt-3 leading-7 text-ink/80">{turf.description}</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-bold">Facilities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {turf.facilities.map((f) => (
                <span key={f} className="rounded-full bg-card px-3 py-1.5 text-sm">
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Hours: {turf.opensAt} – {turf.closesAt}
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-bold">Rules and cancellation</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
              {turf.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">{turf.cancellation}</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-bold">Map</h2>
            <iframe
              title={`Map of ${turf.area}`}
              className="mt-3 h-64 w-full rounded-[16px] border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(turf.mapQuery)}&z=13&output=embed`}
            />
            <p className="mt-2 text-xs text-muted">Approximate area embed — not a verified venue pin.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-bold">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No written sample reviews yet. Rating is illustrative.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {reviews.map((r) => (
                  <div key={r.name} className="rounded-2xl bg-offwhite p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{r.name}</p>
                      <RatingStars value={r.rating} />
                    </div>
                    <p className="mt-2 text-sm text-ink/80">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        <BookingSummary turf={turf} draft={draft} pricing={pricing} />
      </div>
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-4 font-heading text-2xl font-bold">Similar turfs</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {getSimilarTurfs(turf).map((t) => (
            <TurfCard key={t.id} turf={t} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link to="/turfs" className="font-semibold text-forest">
            Back to all grounds
          </Link>
        </p>
      </div>
    </div>
  );
}
