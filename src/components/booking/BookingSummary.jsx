import { PriceDisplay } from "../common/PriceDisplay";
import { formatDate, formatINR } from "../../utils/format";
import { formatSlotLabel, getSlotEnd } from "../../utils/slots";

export function BookingSummary({ turf, draft, pricing }) {
  if (!turf) return null;
  return (
    <aside className="rounded-[16px] border border-black/5 bg-offwhite p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Demo booking summary</p>
      <h3 className="mt-1 font-heading text-xl font-bold">{turf.name}</h3>
      <p className="text-sm text-muted">
        {turf.area}, Jaipur · {turf.sport}
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Date</dt>
          <dd>{draft.date ? formatDate(draft.date) : "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Time</dt>
          <dd>
            {draft.start
              ? `${formatSlotLabel(draft.start)} – ${formatSlotLabel(getSlotEnd(draft.start, draft.duration))}`
              : "—"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Duration</dt>
          <dd>
            {draft.duration} hour{draft.duration > 1 ? "s" : ""}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Players</dt>
          <dd>{draft.players}</dd>
        </div>
      </dl>
      {pricing ? (
        <div className="mt-4 space-y-1 border-t border-black/10 pt-4 text-sm">
          <div className="flex justify-between">
            <span>Base ({formatINR(turf.pricePerHour)} × {draft.duration})</span>
            <span>{formatINR(pricing.base)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount {pricing.couponValid ? `(${pricing.coupon})` : ""}</span>
            <span>{pricing.discount ? `−${formatINR(pricing.discount)}` : formatINR(0)}</span>
          </div>
          <div className="flex justify-between">
            <span>{pricing.taxLabel}</span>
            <span>{formatINR(pricing.tax)}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold">Total</span>
            <PriceDisplay amount={pricing.total} suffix="" size="lg" />
          </div>
        </div>
      ) : null}
    </aside>
  );
}
