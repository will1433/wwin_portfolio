import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminSkills() {
  const [form, setForm] = useState({
    networking: ["VLANs", "STP", "OSPF", "ACLs", "DHCP", "Cisco IOS", "Ubiquiti"],
    programming: ["Python", "Java", "PL/SQL", "Bash"],
    webux: ["HTML", "CSS", "Accessibility"],
    tools: ["Git/GitHub", "Wireshark", "Postman", "Docker"],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const ref = doc(db, "site", "skills");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setForm((prev) => ({ ...prev, ...snap.data() }));
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load Skills: " + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toArray = (v) =>
    Array.isArray(v) ? v : String(v).split(",").map((x) => x.trim()).filter(Boolean);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(
        ref,
        {
          networking: toArray(form.networking),
          programming: toArray(form.programming),
          webux: toArray(form.webux),
          tools: toArray(form.tools),
        },
        { merge: true }
      );
      alert("Skills saved!");
    } catch (e) {
      alert("Failed to save Skills: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading…</div>;

  const fields = [
    ["networking", "Networking"],
    ["programming", "Programming"],
    ["webux", "Web / UX"],
    ["tools", "Tools"],
  ];

  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-extrabold mb-3">Skills</h2>
      <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
        {fields.map(([key, label]) => (
          <label key={key} className="grid gap-1">
            <span className="text-sm">{label} (comma-separated)</span>
            <input
              className="input"
              value={Array.isArray(form[key]) ? form[key].join(", ") : form[key] || ""}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={
                key === "networking"
                  ? "VLANs, STP, OSPF, ACLs"
                  : key === "programming"
                  ? "Python, Java, PL/SQL"
                  : key === "webux"
                  ? "HTML, CSS, Accessibility"
                  : "Git/GitHub, Wireshark, Postman"
              }
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
