import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/common/Button";
import { isPhone } from "../utils/validation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";

export function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [prefs, setPrefs] = useLocalStorage(STORAGE_KEYS.preferences, { units: "metric" });
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" replace />;

  const save = (e) => {
    e.preventDefault();
    if (phone && !isPhone(phone)) {
      setError("Enter a 10-digit Indian mobile number, or leave phone blank.");
      return;
    }
    setError("");
    updateProfile({ name, phone, notifyBookings: user.notifyBookings, notifyOffers: user.notifyOffers });
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-heading text-3xl font-extrabold">Profile</h1>
      <p className="mt-2 text-sm text-muted">Demo profile stored in this browser. Not a secure account system.</p>
      <form onSubmit={save} className="mt-6 space-y-4 rounded-[16px] bg-offwhite p-5">
        <label className="block text-sm">
          Name
          <input className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block text-sm">
          Email
          <input className="mt-1 w-full rounded-xl border border-black/10 bg-card px-3 py-2.5" value={user.email} disabled />
        </label>
        <label className="block text-sm">
          Phone
          <input className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <fieldset className="space-y-2 text-sm">
          <legend className="font-semibold">Preferences</legend>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={user.notifyBookings}
              onChange={(e) => updateProfile({ notifyBookings: e.target.checked })}
            />
            Booking reminders (local flag only)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={user.notifyOffers}
              onChange={(e) => updateProfile({ notifyOffers: e.target.checked })}
            />
            Product notes (local flag only)
          </label>
          <label className="block">
            Distance display
            <select
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2"
              value={prefs.units}
              onChange={(e) => setPrefs({ ...prefs, units: e.target.value })}
            >
              <option value="metric">Kilometres</option>
              <option value="note">Hidden on cards (preference only)</option>
            </select>
          </label>
        </fieldset>
        <Button type="submit">Save profile</Button>
      </form>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" to="/my-bookings">
          My Bookings
        </Button>
        <Button variant="dark" onClick={logout}>
          Log out
        </Button>
      </div>
      <p className="mt-4 text-sm">
        <Link to="/" className="text-forest">
          Home
        </Link>
      </p>
    </div>
  );
}
