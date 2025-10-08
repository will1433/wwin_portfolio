import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

/* --------- Inline form used by the modal --------- */
function ExpForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    role: "",
    org: "",
    start: "",
    end: "",
    bullets: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        role: initial.role || "",
        org: initial.org || "",
        start: initial.start || "",
        end: initial.end || "",
        bullets: Array.isArray(initial.bullets)
          ? initial.bullets.join("\n")
          : initial.bullets || "",
      });
    }
  }, [initial]);

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      role: form.role.trim(),
      org: form.org.trim(),
      start: form.start.trim(),
      end: form.end.trim(),
      bullets: form.bullets
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid md:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm">Role</span>
          <input
            className="input"
            name="role"
            value={form.role}
            onChange={change}
            required
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Organization</span>
          <input
            className="input"
            name="org"
            value={form.org}
            onChange={change}
            required
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Start</span>
          <input
            className="input"
            name="start"
            value={form.start}
            onChange={change}
            placeholder="2024 — Present"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">End</span>
          <input
            className="input"
            name="end"
            value={form.end}
            onChange={change}
            placeholder="2023"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm">Bullets (one per line)</span>
        <textarea
          className="input"
          rows={5}
          name="bullets"
          value={form.bullets}
          onChange={change}
        />
      </label>

      <div className="flex justify-end gap-2">
        <button className="btn btn-outline" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

/* ----------------- Admin Experience page ----------------- */
export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [show, setShow] = useState(false);

  const col = collection(db, "experiences");

  useEffect(() => {
    (async () => {
      try {
        const q = query(col, orderBy("start", "desc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const create = async (data) => {
    const ref = await addDoc(col, data);
    setItems((prev) => [{ id: ref.id, ...data }, ...prev]);
    setShow(false);
  };

  const update = async (id, data) => {
    await updateDoc(doc(db, "experiences", id), data);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    setEditing(null);
    setShow(false);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "experiences", id));
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl md:text-2xl font-extrabold">
          Experience
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setShow(true);
          }}
        >
          + Add
        </button>
      </div>

      <div className="grid gap-4 mt-4">
        {loading ? (
          <div>Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-slate-500 dark:text-slate-400">No items yet.</div>
        ) : (
          items.map((x) => (
            <article key={x.id} className="card">
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {x.role} · {x.org}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setEditing(x);
                        setShow(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => remove(x.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {x.start}
                  {x.end ? ` — ${x.end}` : ""}
                </div>
                {Array.isArray(x.bullets) && x.bullets.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {x.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="card w-full max-w-2xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">
                  {editing ? "Edit Experience" : "Add Experience"}
                </h3>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setShow(false);
                    setEditing(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <ExpForm
                initial={editing}
                onCancel={() => {
                  setShow(false);
                  setEditing(null);
                }}
                onSave={(data) =>
                  editing ? update(editing.id, data) : create(data)
                }
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
