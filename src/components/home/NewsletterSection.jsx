import { useState } from "react";
import { Button } from "../common/Button";
import { isEmail } from "../../utils/validation";
import { STORAGE_KEYS, storage } from "../../utils/storage";
import { useUI } from "../../context/UIContext";

export function NewsletterSection() {
  const { pushToast } = useUI();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    const list = storage.get(STORAGE_KEYS.newsletter, []);
    storage.set(STORAGE_KEYS.newsletter, [...list, email]);
    setEmail("");
    setError("");
    pushToast({ title: "Subscribed", message: "Saved locally. No emails are sent in this demo." });
  };

  return (
    <section className="bg-forest-dark py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-heading text-3xl font-extrabold">Get match-day updates</h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Join the Turf list for sample product notes. This form stores your email in the browser only.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-lg flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border-0 px-5 py-3 text-sm text-ink"
          />
          <Button type="submit" className="px-6 py-3">
            Subscribe
          </Button>
        </form>
      </div>
      {error ? <p className="mx-auto mt-3 max-w-6xl px-5 text-sm text-lime">{error}</p> : null}
    </section>
  );
}
