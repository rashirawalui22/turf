import { todayISO } from "../../utils/format";

export function BookingCalendar({ value, onChange }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">Date</span>
      <input
        type="date"
        min={todayISO()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm"
      />
    </label>
  );
}
