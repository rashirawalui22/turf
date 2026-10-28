import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { validateAuth } from "../utils/validation";

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const next = validateAuth({ ...form, isSignup: true });
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    const result = signup(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="mx-auto max-w-md px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Simulated sign-up</p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold">Create a demo account</h1>
      <p className="mt-2 text-sm text-muted">Passwords are stored in localStorage on this device. Do not use a real password you use elsewhere.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm">
          Name
          <input className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name ? <span className="text-xs text-red-700">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          Email
          <input type="email" className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email ? <span className="text-xs text-red-700">{errors.email}</span> : null}
        </label>
        <label className="block text-sm">
          Password
          <span className="relative mt-1 block">
            <input
              type={show ? "text" : "password"}
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 pr-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </span>
          {errors.password ? <span className="text-xs text-red-700">{errors.password}</span> : null}
        </label>
        {formError ? <p className="text-sm text-red-700">{formError}</p> : null}
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-forest">
          Log in
        </Link>
      </p>
    </div>
  );
}
