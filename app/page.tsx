import Image from "next/image";
import { VoiceAgent } from "@/components/VoiceAgent";
import { ZoomableImage } from "@/components/ZoomableImage";
import {
  profile,
  metrics,
  skillGroups,
  experiences,
  projects,
  education,
  certificates,
  achievements,
  languages,
  type ExperienceCategory,
} from "@/content/resume";

const categoryStyles: Record<ExperienceCategory, { dot: string; chip: string; label: string }> = {
  aiops: { dot: "bg-sky-400", chip: "border-sky-400/30 bg-sky-400/10 text-sky-200", label: "AIOps" },
  ai: { dot: "bg-indigo-400", chip: "border-indigo-400/30 bg-indigo-400/10 text-indigo-200", label: "AI / Agents" },
  ml: { dot: "bg-violet-400", chip: "border-violet-400/30 bg-violet-400/10 text-violet-200", label: "ML" },
  data: { dot: "bg-emerald-400", chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200", label: "Data" },
  devops: { dot: "bg-amber-400", chip: "border-amber-400/30 bg-amber-400/10 text-amber-200", label: "Full-Stack / DevOps" },
  platform: { dot: "bg-rose-400", chip: "border-rose-400/30 bg-rose-400/10 text-rose-200", label: "Platform" },
};

const experienceImages = [
  { src: "/MunichRE.jpg", alt: "Munich Re" },
  { src: "/BMW.jpeg", alt: "BMW" },
  { src: "/ZEISS.jpeg", alt: "ZEISS" },
  { src: "/Max_planck.png", alt: "Max Planck" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
      {/* Subtle professional background: grid + soft glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.14),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-sky-400 to-indigo-500 text-[11px] font-bold text-slate-950">
              PK
            </span>
            <span className="hidden sm:inline">Pavan Kumar</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#experience" className="transition hover:text-white">Experience</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#education" className="transition hover:text-white">Education</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
            Download CV
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-screen-2xl px-6 pb-28 lg:px-10">
        <VoiceAgent autoOpen={false} autoWelcome />

        {/* ================= HERO ================= */}
        <section className="relative mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-sky-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
              </span>
              Available for roles · {profile.location}
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              {profile.name}.
            </h1>
            <p className="text-2xl font-medium leading-snug text-slate-200 md:text-3xl">
              {profile.title}. {profile.headline}
            </p>
            <p className="max-w-xl text-base leading-7 text-slate-400 md:text-lg md:leading-8">
              {profile.summary}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={profile.cvPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
              >
                Download CV
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                View experience
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-400/20 via-indigo-500/20 to-transparent blur-2xl" />
              <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/60 md:h-72 md:w-72">
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Pavan Kumar"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= METRICS ================= */}
        <section className="mt-14 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur md:grid-cols-4 md:gap-6 md:p-6">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-start gap-1 px-2">
              <span className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                {m.value}
              </span>
              <span className="text-sm font-medium text-slate-400 md:text-base">{m.label}</span>
            </div>
          ))}
        </section>

        {/* ================= SKILLS ================= */}
        <section id="skills" className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Stack</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">Skills & tooling</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <p className="text-sm font-semibold text-white">{g.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 bg-slate-900/60 px-2 py-1 text-[11px] font-medium text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="mt-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Career</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">Experience</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              From DevOps and full-stack platforms to agentic AI and MLOps. A timeline of what I&apos;ve shipped.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-start">
            <div className="relative space-y-5 border-l border-white/10 pl-6">
              {experiences.map((e) => {
                const cat = categoryStyles[e.category];
                return (
                  <article
                    key={`${e.org}-${e.start}`}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] md:p-6"
                  >
                    <span className={`absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-slate-900 ${cat.dot}`} />
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium tracking-wide text-slate-400">
                          {e.start} to {e.end} · {e.location}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white md:text-xl">
                          {e.role} <span className="text-slate-400">·</span>{" "}
                          <span className="text-slate-200">{e.org}</span>
                        </h3>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cat.chip}`}>
                        {cat.label}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-slate-900/60 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-300">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <aside className="hidden flex-col gap-3 md:flex">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Field notes</p>
              {experienceImages.map((img) => (
                <div
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  <ZoomableImage
                    src={img.src}
                    alt={img.alt}
                    width={900}
                    height={600}
                    className="h-32 w-full object-cover transition hover:scale-[1.02]"
                  />
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section id="projects" className="mt-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Selected work</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">Projects</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
              >
                {p.image ? (
                  <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                    <Image
                      src={p.image}
                      alt={p.imageAlt || p.name}
                      width={1200}
                      height={700}
                      className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-400">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-slate-900/60 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                    >
                      GitHub →
                    </a>
                  ) : null}
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Live demo →
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= EDUCATION ================= */}
        <section id="education" className="mt-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Academics</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">Education</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((ed) => (
              <div
                key={ed.degree}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <p className="text-xs font-medium text-slate-400">
                  {ed.start} to {ed.end} · {ed.location}
                </p>
                <h3 className="mt-1 text-base font-semibold text-white">{ed.degree}</h3>
                <p className="mt-1 text-sm font-medium text-slate-300">{ed.org}</p>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  <span className="font-semibold text-slate-300">Coursework:</span> {ed.coursework}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= ACHIEVEMENTS + LANGUAGES ================= */}
        <section className="mt-20 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Highlights</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Achievements</h3>
            <ul className="mt-3 space-y-2">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Communication</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Languages</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="rounded-md border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300"
                >
                  {l.name} <span className="text-slate-500">· {l.level}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CERTIFICATES ================= */}
        <section id="certificates" className="mt-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Credentials</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">Certificates</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {certificates.map((c) => (
              <article
                key={`${c.name}-${c.year}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <div className="mt-2 inline-flex rounded-md border border-white/10 bg-slate-900/60 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                  {c.issuer}
                </div>
                <p className="mt-2 text-xs text-slate-500">{c.year}</p>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-200 transition hover:border-sky-400/50 hover:bg-sky-400/20"
                  >
                    View certificate →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-8 md:p-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_60%)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Let&apos;s talk</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Have a product idea that needs a Full-Stack AI Engineer?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              I&apos;m currently open to AI/ML Engineer, Full-Stack AI/AIOps, Co-founder/Founder-associate and similar roles in Munich or remote (EU).
              The quickest way to reach me:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 transition hover:-translate-y-0.5 hover:border-rose-400/60 hover:bg-rose-500/20 hover:text-rose-100 hover:shadow-lg hover:shadow-rose-500/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7L12 13 2 7" />
                </svg>
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-200 transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:bg-sky-500/20 hover:text-sky-100 hover:shadow-lg hover:shadow-sky-500/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-black hover:shadow-lg hover:shadow-slate-950/40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.75.09-.73.09-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.83 2.81 1.3 3.5.99.1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0012 .3" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-slate-500 md:flex-row">
            <span>© {new Date().getFullYear()} {profile.name}. Built with Next.js & deployed on Vercel.</span>
            <span>{profile.location}</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
