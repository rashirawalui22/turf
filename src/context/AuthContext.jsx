import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { STORAGE_KEYS, storage } from "../utils/storage";
import { useUI } from "./UIContext";

const AuthContext = createContext(null);

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  notifyBookings: true,
  notifyOffers: false,
};

export function AuthProvider({ children }) {
  const { pushToast } = useUI();
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.session, null));

  const persistSession = (next) => {
    setUser(next);
    if (next) storage.set(STORAGE_KEYS.session, next);
    else storage.remove(STORAGE_KEYS.session);
  };

  const signup = useCallback(
    ({ name, email, password }) => {
      const users = storage.get(STORAGE_KEYS.users, []);
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: "An account with this email already exists in this browser." };
      }
      const record = {
        id: crypto.randomUUID?.() || String(Date.now()),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: "",
        password,
        notifyBookings: true,
        notifyOffers: false,
      };
      storage.set(STORAGE_KEYS.users, [...users, record]);
      const session = { ...emptyProfile, ...record };
      delete session.password;
      persistSession(session);
      pushToast({ title: "Demo account created", message: "Saved only in this browser." });
      return { ok: true };
    },
    [pushToast]
  );

  const login = useCallback(
    ({ email, password }) => {
      const users = storage.get(STORAGE_KEYS.users, []);
      const match = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (!match) {
        return { ok: false, error: "Email or password does not match a demo account in this browser." };
      }
      const session = { ...emptyProfile, ...match };
      delete session.password;
      persistSession(session);
      pushToast({ title: "Signed in", message: "Demo session stored locally. Not production-secure." });
      return { ok: true };
    },
    [pushToast]
  );

  const logout = useCallback(() => {
    persistSession(null);
    pushToast({ title: "Signed out", message: "Local demo session cleared." });
  }, [pushToast]);

  const updateProfile = useCallback(
    (patch) => {
      if (!user) return;
      const next = { ...user, ...patch };
      persistSession(next);
      const users = storage.get(STORAGE_KEYS.users, []);
      storage.set(
        STORAGE_KEYS.users,
        users.map((u) => (u.email === user.email ? { ...u, ...patch } : u))
      );
      pushToast({ title: "Profile updated", message: "Changes saved in this browser only." });
    },
    [user, pushToast]
  );

  const value = useMemo(
    () => ({ user, signup, login, logout, updateProfile }),
    [user, signup, login, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
