import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/common/Button";
import { validateContact } from "../utils/validation";
import { useUI } from "../context/UIContext";

const faqs = [
  {
    q: "Are these turfs actually available?",
    a: "No. Names, slots, and prices are sample data for this frontend demo.",
  },
  {
    q: "Will I be charged?",
    a: "No payments run on this site. Totals in INR are estimates for the interface.",
  },
  {
    q: "Where is my booking stored?",
    a: "In localStorage on this device. Clearing site data removes demo bookings and cart items.",
  },
  {
    q: "Can I contact a real venue from here?",
    a: "Contact details on this page are placeholders. Do not treat them as a company office.",
  },
];

export function Contact() {
  const { pushToast } = useUI();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = validateContact(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    pushToast({ title: "Message saved locally", message: "Nothing was emailed. Demo form only." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-offwhite py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="font-heading text-4xl font-extrabold">Contact</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Use the form to try validation. Submissions stay in this session and are not delivered to a mailbox.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> hello@example.com (placeholder)
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 00000 00000 (placeholder)
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Jaipur, Rajasthan (placeholder)
            </p>
          </div>
          <div className="mt-10 space-y-4">
            <h2 className="font-heading text-2xl font-bold">FAQ</h2>
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="rounded-[18px] bg-white p-6 shadow-sm">
          {sent ? <p className="mb-4 rounded-xl bg-card px-3 py-2 text-sm text-forest">Thanks — demo message recorded.</p> : null}
          {[
            ["name", "Name", "text"],
            ["email", "Email", "email"],
            ["subject", "Subject", "text"],
          ].map(([key, label, type]) => (
            <label key={key} className="mb-4 block text-sm">
              {label}
              <input
                type={type}
                className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              {errors[key] ? <span className="text-xs text-red-700">{errors[key]}</span> : null}
            </label>
          ))}
          <label className="mb-4 block text-sm">
            Message
            <textarea
              rows={5}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message ? <span className="text-xs text-red-700">{errors.message}</span> : null}
          </label>
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
