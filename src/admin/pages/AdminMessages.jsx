import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const col = collection(db, "messages");

  const load = async () => {
    const q = query(col, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const mark = async (id, status) => {
    await updateDoc(doc(db, "messages", id), { status });
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "messages", id));
    setItems((prev) => prev.filter((m) => m.id !== id));
  };

  const fmtDate = (ts) => {
    if (!ts) return "—";
    // Firestore Timestamp: { seconds, nanoseconds }
    const ms =
      typeof ts === "object" && "seconds" in ts ? ts.seconds * 1000 : ts;
    return new Date(ms).toLocaleString();
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl md:text-2xl font-extrabold">
          Messages
        </h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {items.length} total
        </span>
      </div>

      <div className="grid gap-4 mt-4">
        {loading ? (
          <div>Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-slate-500 dark:text-slate-400">
            No messages yet.
          </div>
        ) : (
          items.map((m) => (
            <article key={m.id} className="card">
              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">
                      {m.name || "Anonymous"}{" "}
                      <span className="text-slate-500 dark:text-slate-400">
                        · {m.email || "no email"}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {fmtDate(m.createdAt)}
                    </div>
                    {m.subject && (
                      <div className="mt-2 font-medium break-words">
                        {m.subject}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={
                        "px-2 py-0.5 rounded-full text-xs " +
                        (m.status === "read"
                          ? "bg-slate-200 dark:bg-slate-700"
                          : "bg-brand/15 text-brand")
                      }
                    >
                      {m.status === "read" ? "read" : "new"}
                    </span>
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        mark(m.id, m.status === "read" ? "new" : "read")
                      }
                    >
                      {m.status === "read" ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => remove(m.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {m.message && (
                  <p className="mt-3 whitespace-pre-wrap break-words">
                    {m.message}
                  </p>
                )}

                {m.email && (
                  <div className="mt-3">
                    <a
                      className="text-brand hover:underline text-sm"
                      href={`mailto:${encodeURIComponent(m.email)}${
                        m.subject ? `?subject=${encodeURIComponent(m.subject)}` : ""
                      }`}
                    >
                      Reply via Email →
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
