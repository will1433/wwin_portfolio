import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminAbout() {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const ref = doc(db, "site", "about");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) setBio(snap.data().bio || "");
      } catch (e) {
        console.error(e);
        alert("Failed to load About: " + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await setDoc(ref, { bio }, { merge: true });
      alert("About saved!");
    } catch (e) {
      alert("Failed to save: " + e.message);
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-extrabold mb-3">About</h2>
      <form onSubmit={save} className="grid gap-3">
        <textarea
          className="input"
          rows={8}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write your About section here…"
        />
        <div className="flex justify-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </section>
  );
}
