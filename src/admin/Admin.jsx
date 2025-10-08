import { useEffect, useState } from "react";
import AuthGate from "./AuthGate";
import AdminIntro from "./pages/AdminIntro";
import AdminAbout from "./pages/AdminAbout";
import AdminExperience from "./pages/AdminExperience";
import AdminSkills from "./pages/AdminSkills";
import AdminMessages from "./pages/AdminMessages";

import { db } from "../firebase";
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
  serverTimestamp, orderBy, query
} from "firebase/firestore";
import ProjectForm from "./ProjectForm";

/* ---- Inline Projects tab ---- */
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const colRef = collection(db, "projects");

  useEffect(() => {
    (async () => {
      try {
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const create = async (data) => {
    const payload = { ...data, createdAt: serverTimestamp() };
    const ref = await addDoc(colRef, payload);
    setProjects(prev => [{ id: ref.id, ...data }, ...prev]);
    setShowForm(false);
  };
  const update = async (id, data) => {
    await updateDoc(doc(db, "projects", id), data);
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...data } : p)));
    setEditing(null);
    setShowForm(false);
  };
  const remove = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl md:text-2xl font-extrabold">Projects</h2>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          + New Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {loading ? (
          <div>Loading…</div>
        ) : projects.length === 0 ? (
          <div className="text-slate-500 dark:text-slate-400">No projects yet.</div>
        ) : (
          projects.map(p => (
            <article key={p.id} className="card">
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <div className="flex gap-2">
                    <button className="btn btn-outline" onClick={() => { setEditing(p); setShowForm(true); }}>
                      Edit
                    </button>
                    <button className="btn btn-outline" onClick={() => remove(p.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                {p.desc && <p className="mt-2">{p.desc}</p>}
                {p.href && (
                  <a className="text-brand hover:underline text-sm" href={p.href} target="_blank" rel="noreferrer">
                    Open →
                  </a>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(p.tags) && p.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                {Array.isArray(p.points) && p.points.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {p.points.map((x, i) => <li key={i}>{x}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="card w-full max-w-2xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{editing ? "Edit Project" : "New Project"}</h3>
                <button className="btn btn-outline" onClick={() => { setShowForm(false); setEditing(null); }}>
                  ✕
                </button>
              </div>
              <ProjectForm
                initial={editing}
                onCancel={() => { setShowForm(false); setEditing(null); }}
                onSave={(data) => (editing ? update(editing.id, data) : create(data))}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---- Admin container with tabs ---- */
export default function Admin() {
  const [active, setActive] = useState("projects");

  const tabs = [
    { id: "intro", label: "Intro", el: <AdminIntro /> },
    { id: "projects", label: "Projects", el: <ProjectsTab /> }, // now inline ✅
    { id: "experience", label: "Experience", el: <AdminExperience /> },
    { id: "skills", label: "Skills", el: <AdminSkills /> },
    { id: "about", label: "About", el: <AdminAbout /> },
    { id: "messages", label: "Messages", el: <AdminMessages /> },
  ];

  return (
    <AuthGate>
      <main className="container-x py-6">
        <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Admin</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-300/60 dark:border-slate-600/80 pb-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={
                "px-3 py-1.5 rounded-xl text-sm " +
                (active === t.id ? "bg-brand text-white" : "btn btn-ghost border-slate-300/60 dark:border-slate-600/80")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tabs.find(t => t.id === active)?.el}
      </main>
    </AuthGate>
  );
}
