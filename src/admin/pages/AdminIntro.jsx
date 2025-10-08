import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminIntro() {
  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    tagline: "",
    location: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    resumeURL: "/resume.pdf", // put your resume in /public as resume.pdf
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const ref = doc(db, "site", "intro");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setForm((f) => ({ ...f, ...snap.data() }));
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load Intro: " + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(ref, form, { merge: true });
      alert("Intro saved!");
    } catch (e) {
      alert("Failed to save: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-extrabold mb-3">
        Intro
      </h2>

      <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
        {[
          ["name", "Name"],
          ["subtitle", "Subtitle"],
          ["tagline", "Tagline"],
          ["location", "Location"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["github", "GitHub URL"],
          ["linkedin", "LinkedIn URL"],
          ["resumeURL", "Resume URL (/resume.pdf)"],
        ].map(([key, label]) => (
          <label key={key} className="grid gap-1">
            <span className="text-sm">{label}</span>
            <input
              className="input"
              name={key}
              value={form[key] || ""}
              onChange={onChange}
              {...(key === "name" || key === "email" ? { required: true } : {})}
            />
          </label>
        ))}

        <div className="md:col-span-2 flex justify-end">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
