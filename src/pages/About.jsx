import { IMAGES } from "../data/images";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";

export function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <ImageWithFallback src={IMAGES.aboutHero} alt="Football on a green turf field" className="h-[380px] w-full object-cover" />
        <div className="absolute inset-0 bg-stadium/70" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-5 pb-12 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-lime">About Turf</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold">Built so finding a ground feels simple</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-8 px-5 py-14">
        <div>
          <h2 className="font-heading text-2xl font-bold">Why Turf exists</h2>
          <p className="mt-3 leading-7 text-ink/80">
            Evening games in Indian cities still start with scattered WhatsApp messages. Turf is a product demo for a
            calmer path: see the ground, the hourly rate in rupees, and a clear slot before you commit.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold">Our mission</h2>
          <p className="mt-3 leading-7 text-ink/80">
            Make recreational sport easier to organise. This website uses sample Jaipur listings so you can try search,
            filters, and checkout without a live operations team.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold">How the platform works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
            <li>Browse sample turfs by sport and neighbourhood.</li>
            <li>Pick a date, duration, and time on the details page.</li>
            <li>Confirm a demo booking stored only in your browser.</li>
          </ol>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[16px] bg-offwhite p-5">
            <h3 className="font-heading text-lg font-bold">For players</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Compare lights, indoor vs outdoor, and price before you message the group. Keep a personal list of demo bookings.
            </p>
          </div>
          <div className="rounded-[16px] bg-offwhite p-5">
            <h3 className="font-heading text-lg font-bold">For turf owners</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              A future version could publish hours, photos, and blocked slots. This demo does not onboard real venues.
            </p>
          </div>
        </div>
        <ImageWithFallback src={IMAGES.training} alt="Athletes training" className="h-64 w-full rounded-[18px] object-cover" />
        <Button to="/turfs">Explore turfs</Button>
      </section>
    </div>
  );
}
