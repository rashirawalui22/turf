import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { validateAuth } from "../utils/validation";
import { IMAGES } from "../data/images";
import { ImageWithFallback } from "../components/common/ImageWithFallback";

export function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const next = validateAuth({ ...form, isSignup: false });
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    const result = login(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <ImageWithFallback src={IMAGES.footballNight} alt="Floodlit football turf at night" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-stadium/50" />
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-5 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Simulated sign-in</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Accounts live in localStorage. This is not production-secure authentication.
        </p>
        {user ? <p className="mt-3 text-sm">You are already signed in as {user.email}.</p> : null}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
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
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
            {errors.password ? <span className="text-xs text-red-700">{errors.password}</span> : null}
          </label>
          {formError ? <p className="text-sm text-red-700">{formError}</p> : null}
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <p className="mt-4 text-sm">
          Need an account?{" "}
          <Link to="/signup" className="font-semibold text-forest">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
