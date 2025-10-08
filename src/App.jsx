import React, { useEffect, useState } from "react";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return [dark, setDark];
}

function Nav() {
  const [, setDark] = useDarkMode();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/60 dark:border-slate-600/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <nav className="container-x flex items-center justify-between py-3" aria-label="Primary">
        <a href="#home" className="font-extrabold tracking-tight">William Win</a>
        <ul className="hidden sm:flex gap-4">
          {sections.map(s => (
            <li key={s.id}>
              <a className="hover:underline" href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            onClick={() => setDark(d => !d)}
            className="btn btn-ghost"
          >🌗</button>
          <a className="btn btn-primary" href="/public/resume.pdf" target="_blank" rel="noreferrer">⬇ Resume</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative py-18 md:py-20">
      {/* background grid + blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="fx-grid absolute inset-0" />
        <div className="fx-blob a" />
        <div className="fx-blob b" />
      </div>

      <div className="container-x grid md:grid-cols-[1.1fr_.9fr] gap-6 items-center">
        <div>
          <h1 className="title">William Win</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
            Information Systems • Networking &amp; Help Desk
          </p>
          <p className="mt-3">
            I’m an Information Systems student with hands-on experience in networking, programming, and system configuration. 
            My focus is on building secure networks, streamlining processes with databases and automation, and creating responsive web applications
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a href="#projects" className="btn btn-primary">🚀 See Projects</a>
            <a href="https://github.com/will1433" className="btn btn-outline" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/william-win" className="btn btn-outline" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <ul className="flex flex-wrap gap-3 text-slate-500 dark:text-slate-400 mt-3 text-sm">
            <li>📍 Maryland, USA</li>
            <li><a className="hover:underline" href="mailto:williamwin094@gmail.com.com">✉ williamwin094@gmail.com</a></li>
            <li><a className="hover:underline" href="tel:+1(443)-425-4375">📞 +1 (443) 425-4375</a></li>
          </ul>
        </div>

        <article className="relative h-[280px] w-full p-[3px] rounded-2xl animate-gradient-border">
  <div className="grid place-items-center text-center p-7 h-full rounded-2xl bg-gray-900">
    <div className="h-14 w-14 grid place-items-center rounded-xl border border-slate-300/60 dark:border-slate-600/80 text-white">
      {`{ }`}
    </div>
    <p className="mt-3 text-gray-300">
      Networking (OSPF, STP, ACL), PL/SQL automation, UX redesigns.  
      Simplifying complex systems into clean, simple products.
    </p>
  </div>
</article>


      </div>
    </section>
  );
}

function SectionTitle({ children, right }) {
  return (
    <div className="container-x flex items-center justify-between">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-1">{children}</h2>
      {right}
    </div>
  );
}
function Card({ children }) {
  return <article className="card"><div className="p-4 md:p-5">{children}</div></article>;
}

function Projects() {
  const items = [
    {
      title: "OfferUp.com Redesign",
      href: "https://wwin1.net/offerup",
      desc: "Responsive marketplace UI with image slider, search filters, and fast navigation.",
      tags: ["HTML", "CSS", "JS"],
      points: [
        "Cut critical CSS and optimized images for faster LCP.",
        "Improved search clarity with location + category chips.",
      ],
    },
    {
      title: "Pizza Store Online Mgmt System",
      href: "https://github.com/wwin1/pizza-system",
      desc: "Oracle PL/SQL backend with triggers, sequences, and role-based inventory & scheduling.",
      tags: ["Oracle", "PL/SQL"],
      points: [
        "Wrote triggers to enforce stock constraints.",
        "Designed ERD and procedures for scheduling.",
      ],
    },
    {
      title: "Hearts for the Homeless",
      href: "https://wwin1.net/h4h",
      desc: "Brochure + microsite with QR flows and clear CTA, optimized for mobile.",
      tags: ["Figma", "HTML", "CSS"],
      points: [
        "Rewrote content for clarity; improved conversion path.",
        "Mobile-first layout with large tap targets.",
      ],
    },
    {
      title: "Network Labs & Diagrams",
      href: "https://github.com/wwin1/net-labs",
      desc: "CCNA-style labs: VLAN trunking, STP, OSPF. Diagrams + configs documented.",
      tags: ["Cisco", "Meraki", "draw.io"],
      points: [
        "Simulated multi-VLAN campus network in Packet Tracer.",
        "Documented configs/runbooks for repeatable setups.",
      ],
    },
  ];
  return (
    <section id="projects" className="py-18 md:py-20">
      <SectionTitle right={<a className="text-brand hover:underline" href="https://github.com/wwin1" target="_blank" rel="noreferrer">View on GitHub ↗</a>}>
        Projects
      </SectionTitle>
      <div className="container-x grid md:grid-cols-2 gap-4 mt-4">
        {items.map(p => (
          <Card key={p.title}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <a className="text-brand hover:underline" href={p.href} target="_blank" rel="noreferrer">Open →</a>
            </div>
            <p className="mt-2">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {p.points.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-18 md:py-20">
      <div className="container-x">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">Experience</h2>
        <div className="grid gap-4 mt-3">
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Network/VoIP Student Technician · UMBC DoIT (Telecom)</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">2025 — Present</span>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Install/configure Cisco switches and APs; assist VoIP migration.</li>
              <li>Tier-1 support for wired/wireless; escalate to engineers.</li>
              <li>Document runbooks and streamline ticket triage.</li>
            </ul>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Team Lead · Pizza Hut</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">2022 — 2024</span>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Coordinated 40-person, 4-dept operation under time pressure.</li>
              <li>Standardized inventory/safety checklists; reduced waste.</li>
              <li>Mentored new hires on tools and workflows.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const Tile = ({ title, tags }) => (
    <Card>
      <h3 className="font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </Card>
  );
  return (
    <section id="skills" className="py-18 md:py-20">
      <div className="container-x">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">Skills</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">Always learning.</span>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-4">
          <Tile title="Networking" tags={["VLANs","STP","OSPF","ACLs","DHCP","Cisco IOS","Ubiquiti"]} />
          <Tile title="Programming" tags={["Python","Java","PL/SQL","Bash"]} />
          <Tile title="Web/UX" tags={["HTML","CSS","Accessibility"]} />
          <Tile title="Tools" tags={["Git/GitHub","Wireshark","Postman","Docker"]} />
        </div>
      </div>
    </section>
  );
}

function AboutContact() {
  return (
    <section id="about" className="py-18 md:py-20">
      <div className="container-x grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">About</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Short and sweet—what you focus on.</p>
          <p className="mt-3">
            I enjoy building simple, reliable tools and networks. Recent work spans marketplace UI,
            PL/SQL automation, and campus network labs. I like diagrams, runbooks, and making things easy to use.
          </p>
        </div>
        <article id="contact" className="card">
          <div className="p-4 md:p-5">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">Contact</h2>
            <form onSubmit={(e)=>e.preventDefault()} className="grid gap-3 mt-2" aria-label="Contact form">
              <input className="input" placeholder="Your name" required />
              <input className="input" type="email" placeholder="Email" required />
              <input className="input" placeholder="Subject" />
              <textarea className="input" rows={6} placeholder="Message" />
              <div className="flex justify-end">
                <button className="btn btn-primary" type="submit">Send</button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Front-end demo • Connect Formspree/EmailJS later.
              </p>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-300/60 dark:border-slate-600/80 py-8">
      <div className="container-x flex items-center justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Open to internships • Maryland, USA</span>
        <div className="flex gap-4">
          <a className="hover:underline" href="https://github.com/wwin1">GitHub</a>
          <a className="hover:underline" href="https://www.linkedin.com/in/william-win">LinkedIn</a>
          <a className="hover:underline" href="mailto:william@example.com">Email</a>
        </div>
        <span className="text-slate-500 dark:text-slate-400">© {year} William Win</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <AboutContact />
      <Footer />
    </div>
  );
}
