import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div>Loading…</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-slate-300/60 dark:border-slate-600/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container-x flex items-center justify-between py-3">
          <strong>Admin</strong>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500 dark:text-slate-400">{user.email}</span>
            <button className="btn btn-outline" onClick={() => signOut(auth)}>
              Sign out
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
