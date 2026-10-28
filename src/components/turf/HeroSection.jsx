import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../data/images";
import { cities, sportNames } from "../../data/sports";
import { Button } from "../common/Button";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { todayISO } from "../../utils/format";

export function HeroSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: "",
    sport: "",
    date: todayISO(),
    players: "10",
  });

  const search = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.location) params.set("area", form.location);
    if (form.sport) params.set("sport", form.sport);
    navigate(`/turfs?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-stadium text-white">
      <ImageWithFallback
        src={IMAGES.heroStadium}
        alt="Night-time football stadium with floodlights"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,22,0.88)_0%,rgba(5,46,32,0.62)_48%,rgba(3,29,22,0.35)_100%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-36">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-lime">
            Jaipur sports grounds · sample listings
          </p>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Choose Your Turf.
            <br />
            Play Your Game.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Find the perfect ground, book your slot, and bring your game to life.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/turfs" className="px-7 py-3">
              Book a Turf
            </Button>
            <Button variant="secondary" to="/turfs" className="px-7 py-3">
              Explore Turfs
            </Button>
          </div>
        </div>
        <form
          onSubmit={search}
          className="rounded-[18px] border border-white/15 bg-white/10 p-5 backdrop-blur-md"
        >
          <p className="font-heading text-lg font-bold">Quick search</p>
          <p className="mb-4 text-xs text-white/70">Demo filters — no live availability.</p>
          <div className="grid gap-3">
            <label className="text-xs uppercase tracking-wide text-white/70">
              Location
              <select
                className="mt-1 w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-ink"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              >
                <option value="">All Jaipur areas</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-wide text-white/70">
              Sport
              <select
                className="mt-1 w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-ink"
                value={form.sport}
                onChange={(e) => setForm({ ...form, sport: e.target.value })}
              >
                <option value="">Any sport</option>
                {sportNames.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs uppercase tracking-wide text-white/70">
                Date
                <input
                  type="date"
                  min={todayISO()}
                  className="mt-1 w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-ink"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label className="text-xs uppercase tracking-wide text-white/70">
                Players
                <input
                  type="number"
                  min="2"
                  max="22"
                  className="mt-1 w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-ink"
                  value={form.players}
                  onChange={(e) => setForm({ ...form, players: e.target.value })}
                />
              </label>
            </div>
            <Button type="submit" className="mt-1 w-full py-3">
              Find grounds
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
