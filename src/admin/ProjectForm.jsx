import { useEffect, useState } from "react";

const empty = {
  title: "",
  href: "",
  desc: "",
  tags: "",
  points: "",
};

export default function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(empty);

  // load project info if editing
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        href: initial.href || "",
        desc: initial.desc || "",
        tags: Array.isArray(initial.tags)
          ? initial.tags.join(", ")
          : initial.tags || "",
        points: Array.isArray(initial.points)
          ? initial.points.join("\n")
          : initial.points || "",
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      href: form.href.trim(),
      desc: form.desc.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      points: form.points
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      {/* Title */}
      <div className="grid gap-1">
        <label className="text-sm">Title</label>
        <input
          className="input"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Link */}
      <div className="grid gap-1">
        <label className="text-sm">Link (href)</label>
        <input
          className="input"
          name="href"
          value={form.href}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      {/* Description */}
      <div className="grid gap-1">
        <label className="text-sm">Description</label>
        <textarea
          className="input"
          rows={3}
          name="desc"
          value={form.desc}
          onChange={handleChange}
        />
      </div>

      {/* Tags */}
      <div className="grid gap-1">
        <label className="text-sm">Tags (comma-separated)</label>
        <input
          className="input"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="HTML, CSS, JavaScript"
        />
      </div>

      {/* Bullet Points */}
      <div className="grid gap-1">
        <label className="text-sm">Bullet Points (one per line)</label>
        <textarea
          className="input"
          rows={4}
          name="points"
          value={form.points}
          onChange={handleChange}
          placeholder={"Improved performance\nAdded new features"}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          className="btn btn-outline"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
