import { formatSlotLabel, generateSlots, isSlotRangeFree } from "../../utils/slots";

export function TimeSlotSelector({ turf, date, start, duration, bookedStarts, onSelect }) {
  const slots = generateSlots(turf.opensAt, turf.closesAt);
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Available time slots</p>
      <p className="mb-3 text-xs text-muted">
        Sample calendar for {date || "the selected date"}. Grey slots are marked unavailable in this demo.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const free = isSlotRangeFree(slot, duration, bookedStarts, turf.opensAt, turf.closesAt);
          const selected = start === slot;
          return (
            <button
              key={slot}
              type="button"
              disabled={!free}
              onClick={() => onSelect(slot)}
              className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                selected
                  ? "border-forest bg-forest text-white"
                  : free
                    ? "border-black/10 bg-white hover:border-forest"
                    : "cursor-not-allowed border-transparent bg-card text-muted line-through"
              }`}
            >
              {formatSlotLabel(slot)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
