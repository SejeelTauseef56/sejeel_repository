import React, { useEffect, useMemo, useState } from "react";

// keep your existing data files
import {
  personalInfo,
  navLinks,
  aboutContent,
  contactInfo,
  footerInfo,
  projects as fallbackProjects,
  skills as skillsData,
} from "./data/index";

// contentful + emailjs setup
import useContentful from "./data/useContentful";
import env from "./data/env";
import emailjs from "@emailjs/browser";

import heroicon from "../src/assets/hero_icon.png";
import abouticon from "../src/assets/software_icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

/* --------------------------------- helpers -------------------------------- */

const cx = (...a) => a.filter(Boolean).join(" ");

const Container = ({ className = "", children }) => (
  <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
    {children}
  </div>
);

const cleanText = (htmlish) =>
  String(htmlish ?? "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const safeUrl = (u) => {
  if (!u) return "";
  if (u.startsWith("//")) return `https:${u}`;
  return u;
};

/* --------------------------- spacing + section rhythm --------------------------- */

const Section = ({ id, className = "", children }) => (
  <section id={id} className={cx("scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-18", className)}>
    <Container>{children}</Container>
  </section>
);

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-2xl">
    {eyebrow ? (
      <p className="text-sm font-semibold tracking-wide text-white/55">{eyebrow}</p>
    ) : null}
    <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
      {title}
    </h2>
    {subtitle ? (
      <p className="mt-3 text-base sm:text-lg text-white/70 leading-relaxed">{subtitle}</p>
    ) : null}
  </div>
);

/* ----------------------------- badge colors (global) ----------------------------- */

const TAG_STYLES = {
  React: "bg-cyan-500/14 text-cyan-100 border-cyan-300/20",
  "Vue.js": "bg-emerald-500/14 text-emerald-100 border-emerald-300/20",
  Vue: "bg-emerald-500/14 text-emerald-100 border-emerald-300/20",
  "Next.js": "bg-slate-500/14 text-slate-100 border-slate-300/20",
  JavaScript: "bg-amber-500/14 text-amber-100 border-amber-300/20",
  HTML5: "bg-orange-500/14 text-orange-100 border-orange-300/20",
  CSS3: "bg-sky-500/14 text-sky-100 border-sky-300/20",
  Tailwind: "bg-cyan-500/14 text-cyan-100 border-cyan-300/20",
  "Tailwind CSS": "bg-cyan-500/14 text-cyan-100 border-cyan-300/20",
  ThreeJS: "bg-violet-500/14 text-violet-100 border-violet-300/20",
  "Three.js": "bg-violet-500/14 text-violet-100 border-violet-300/20",
  PHP: "bg-indigo-500/14 text-indigo-100 border-indigo-300/20",
  Laravel: "bg-rose-500/14 text-rose-100 border-rose-300/20",
  "Node.js": "bg-lime-500/14 text-lime-100 border-lime-300/20",
  Node: "bg-lime-500/14 text-lime-100 border-lime-300/20",
  MongoDB: "bg-emerald-500/14 text-emerald-100 border-emerald-300/20",
  MySQL: "bg-blue-500/14 text-blue-100 border-blue-300/20",
  PostgreSQL: "bg-sky-500/14 text-sky-100 border-sky-300/20",
  "REST APIs": "bg-slate-500/14 text-slate-100 border-slate-300/20",
  API: "bg-slate-500/14 text-slate-100 border-slate-300/20",
  OpenAI: "bg-fuchsia-500/14 text-fuchsia-100 border-fuchsia-300/20",
  Docker: "bg-sky-500/14 text-sky-100 border-sky-300/20",
  AWS: "bg-amber-500/14 text-amber-100 border-amber-300/20",
  Git: "bg-slate-500/14 text-slate-100 border-slate-300/20",
  Cypress: "bg-emerald-500/14 text-emerald-100 border-emerald-300/20",
  Figma: "bg-pink-500/14 text-pink-100 border-pink-300/20",
  WordPress: "bg-sky-500/14 text-sky-100 border-sky-300/20",
  Wordpress: "bg-sky-500/14 text-sky-100 border-sky-300/20",
  Elementor: "bg-fuchsia-500/14 text-fuchsia-100 border-fuchsia-300/20",
  Contentful: "bg-violet-500/14 text-violet-100 border-violet-300/20",
  Inertia: "bg-violet-500/14 text-violet-100 border-violet-300/20",
};

const Tag = ({ children, className = "" }) => {
  const key = String(children ?? "").trim();
  const style = TAG_STYLES[key] ?? "bg-white/8 text-white/75 border-white/12";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold max-w-full",
        style,
        className
      )}
    >
      <span className="truncate">{children}</span>
    </span>
  );
};

/* ------------------------ Hero-only grid/gradient bg ------------------------ */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0b1224]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.62),transparent_55%),radial-gradient(circle_at_52%_46%,rgba(99,102,241,0.28),transparent_62%),radial-gradient(circle_at_86%_35%,rgba(245,158,11,0.28),transparent_58%),radial-gradient(circle_at_82%_80%,rgba(236,72,153,0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-amber-500/10" />
      <div className="absolute inset-0 opacity-[0.28] bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.24)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#0f172a]" />
    </div>
  );
}

/* -------------------------------- components -------------------------------- */

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const first = personalInfo?.name?.split(" ")[0] ?? "Sejeel";
  const last = personalInfo?.name?.split(" ")[1] ?? "Tauseef";
  const initials = `${first?.[0] ?? "S"}${last?.[0] ?? "T"}`.toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
    } else {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        "pt-[env(safe-area-inset-top)]",
        scrolled
          ? "bg-[#0b1224]/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <Container className="h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 min-w-0" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-2xl bg-white/6 border border-white/12 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.32),transparent_55%),radial-gradient(circle_at_70%_90%,rgba(245,158,11,0.22),transparent_60%)] flex items-center justify-center">
              <span className="text-white font-black tracking-tight">{initials}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-white font-semibold tracking-tight truncate">{first}</span>
            <span className="text-white/70 font-semibold tracking-tight truncate">{last}</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 hover:text-white transition"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full bg-white/10 hover:bg-white/14 border border-white/12 px-4 py-2 text-sm font-semibold text-white transition"
          >
            Let’s talk
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/8 border border-white/12 ring-1 ring-white/10 active:scale-[0.98] transition"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="absolute left-0 right-0 top-[calc(env(safe-area-inset-top)+64px)] border-t border-white/10 bg-[#0b1224]/90 backdrop-blur-xl">
            <Container className="py-4 flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-3 text-white/85 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  {l.name}
                </a>
              ))}

              <a
                href="#contact"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-white text-[#0b1224] px-4 py-3 text-sm font-semibold hover:opacity-90 transition"
                onClick={() => setIsOpen(false)}
              >
                Let’s talk
              </a>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const bio = cleanText(personalInfo?.bio);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-transparent min-h-[calc(100svh-64px)] sm:min-h-[calc(100vh-64px)]"
    >
      <HeroBackground />

      <div className="relative z-10">
        <Container className="pt-6 sm:pt-10 lg:pt-12 pb-14 sm:pb-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center pt-8 sm:pt-10">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/12 px-4 py-2 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for freelance & contracts
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                  {personalInfo?.name?.split(" ")[0] ?? "Sejeel"}
                </span>
                .
              </h1>

              <p className="mt-4 text-lg text-white/78 leading-relaxed max-w-xl">
                {bio}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={personalInfo?.social?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-[#0b1224] px-5 py-3 font-semibold hover:opacity-90 transition"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                  LinkedIn
                </a>

                <a
                  href={personalInfo?.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 border border-white/12 px-5 py-3 font-semibold text-white hover:bg-white/14 transition"
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                  CV
                </a>

                <a
                  href={personalInfo?.social?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 border border-white/12 px-5 py-3 font-semibold text-white hover:bg-white/14 transition"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  GitHub
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                {["PHP", "Laravel", "Vue.js", "React", "WordPress"].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <p className="mt-5 text-sm text-white/60">
                <span>{personalInfo?.location ?? "Greater Manchester, UK"}</span>
                <span className="mx-2 text-white/35">•</span>
                <span>Full-Stack Software Developer</span>
              </p>
            </div>

            <div className="relative min-w-0">
              <div className="relative mx-auto max-w-[560px]">
                <img
                  src={heroicon}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  alt="3D illustration hero"
                  className="w-full max-w-full h-[280px] sm:h-[420px] lg:h-[520px] object-contain select-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function About() {
  const paragraphs = useMemo(() => {
    const d = aboutContent?.description ?? "";
    return d
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }, []);

  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 overflow-visible">
          <div className="relative">
            <div className="absolute -inset-8 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(236,72,153,0.12),transparent_62%)] blur-2xl" />
            <div className="relative">
              <img
                src={abouticon}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                alt="3D illustration about"
                className="w-full max-w-full h-[320px] sm:h-[380px] object-contain select-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title={aboutContent?.title ?? "About Me"}
            subtitle={aboutContent?.subtitle ?? ""}
          />

          <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  const skills = skillsData ?? {
    title: "My Skills",
    description: "Technologies and tools I work with regularly:",
    categories: [],
  };

  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title={skills.title} subtitle={skills.description} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.categories.map((cat) => (
          <div
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 min-w-0"
            key={cat.title}
          >
            <h3 className="text-white font-semibold text-lg">{cat.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const { getProjects } = useContentful();

  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const normalizeFallback = (p) => {
    if (!p) return null;
    return {
      title: p.title ?? "Project",
      description: p.description ?? "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      imageUrl: p.imageUrl ?? "",
      images: p.imageUrl ? [p.imageUrl] : [],
      liveUrl: p.liveUrl ?? "",
      githubUrl: p.githubUrl ?? "",
    };
  };

  const normalizeContentful = (p) => {
    if (!p) return null;

    const title = p.name ?? p.projectName ?? "Project";
    const description = p.description ?? "";
    const tags = Array.isArray(p.tags) ? p.tags : [];

    const front = safeUrl(p.image?.url);
    const gallery = Array.isArray(p.images)
      ? p.images.map((x) => safeUrl(x?.url)).filter(Boolean)
      : [];

    const images = [...(front ? [front] : []), ...gallery];
    const imageUrl = images[0] ?? "";

    return {
      title,
      description,
      tags,
      imageUrl,
      images,
      liveUrl: "",
      githubUrl: p.projectUrl ? safeUrl(p.projectUrl) : "",
    };
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await getProjects?.();
        if (!mounted) return;

        if (Array.isArray(res) && res.length) {
          const mapped = res.map(normalizeContentful).filter(Boolean);
          const hasReal = mapped.some((x) => x.title !== "Project" || x.description || x.imageUrl);
          if (hasReal) {
            setProjects(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching projects from Contentful:", err);
      }

      const fb = (fallbackProjects ?? []).map(normalizeFallback).filter(Boolean);
      setProjects(fb);
    };

    load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openProject = (p) => {
    setSelected(p);
    setImgIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelected(null);
    setImgIndex(0);
    document.body.style.overflow = "";
  };

  const nextImg = () => {
    if (!selected?.images?.length) return;
    setImgIndex((i) => (i + 1) % selected.images.length);
  };

  const prevImg = () => {
    if (!selected?.images?.length) return;
    setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length);
  };

  const Placeholder = ({ title }) => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.30),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.16),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="border border-white/12 bg-white/10 px-4 py-2 text-white/80 text-sm font-semibold">
            {title?.slice(0, 1) ?? "P"}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section id="projects">
      <SectionHeading eyebrow="Work" title="Personal Projects" subtitle="A selection of things I’ve built." />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((p) => (
          <button key={p.title} onClick={() => openProject(p)} className="text-left h-full min-w-0">
            <div className="h-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden">
              <div className="h-44 bg-black/20 border-b border-white/10 overflow-hidden flex-shrink-0">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <Placeholder title={p.title} />
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 min-h-0 min-w-0">
                <h3 className="text-white font-semibold text-lg truncate">{p.title}</h3>

                <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-4">
                  {p.description || "No description yet."}
                </p>

                <div className="flex-1" />

                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.tags || []).slice(0, 6).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[999] bg-black/65 backdrop-blur-sm overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeProject();
          }}
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-24 pb-10">
            <div className="border border-white/12 bg-[#0b1224]/70 backdrop-blur-xl shadow-[0_20px_90px_rgba(0,0,0,0.45)] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-white text-2xl font-extrabold tracking-tight">
                    {selected.title}
                  </h3>
                  <p className="mt-2 text-white/70">{selected.description}</p>
                </div>

                <button
                  onClick={closeProject}
                  className="shrink-0 rounded-xl border border-white/12 bg-white/10 hover:bg-white/14 px-3 py-2 text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 border border-white/10 bg-black/20 overflow-hidden">
                {selected.images?.length ? (
                  <img
                    src={selected.images[imgIndex]}
                    alt={selected.title}
                    className="w-full h-[320px] sm:h-[460px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-[320px] sm:h-[460px]">
                    <Placeholder title={selected.title} />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevImg}
                    disabled={!selected.images?.length || selected.images.length < 2}
                    className="rounded-xl border border-white/12 bg-white/10 hover:bg-white/14 disabled:opacity-40 px-3 py-2 text-white"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImg}
                    disabled={!selected.images?.length || selected.images.length < 2}
                    className="rounded-xl border border-white/12 bg-white/10 hover:bg-white/14 disabled:opacity-40 px-3 py-2 text-white"
                  >
                    →
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {selected.githubUrl ? (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/12 bg-white/10 hover:bg-white/14 px-4 py-2 text-sm font-semibold text-white"
                    >
                      GitHub
                    </a>
                  ) : null}

                  {selected.liveUrl ? (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-white text-[#0b1224] px-4 py-2 text-sm font-semibold hover:opacity-90"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(selected.tags || []).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        env.EMAILJS_SERVICE_ID,
        env.EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        env.EMAILJS_USER_ID
      );

      setSubmitStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contact"
            title={contactInfo?.title ?? "Get In Touch"}
            subtitle={contactInfo?.description ?? ""}
          />

          <p className="mt-6 text-white/75">
            Prefer email?{" "}
            <a
              className="text-white font-semibold underline underline-offset-4 decoration-white/30 hover:decoration-white break-words"
              href={`mailto:${contactInfo?.email ?? personalInfo?.email}`}
            >
              {contactInfo?.email ?? personalInfo?.email}
            </a>
          </p>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-white/70">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full bg-black/20 border border-white/12 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-white/20 rounded-xl"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/70">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                    className="mt-2 w-full bg-black/20 border border-white/12 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-white/20 rounded-xl"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/70">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full bg-black/20 border border-white/12 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-white/20 rounded-xl"
                  placeholder="Project / role / question"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/70">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 w-full bg-black/20 border border-white/12 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-white/20 rounded-xl"
                  placeholder="Tell me what you’re building…"
                />
              </div>

              {submitStatus ? (
                <div
                  className={cx(
                    "border px-4 py-3 text-sm rounded-xl",
                    submitStatus.type === "success"
                      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-100"
                      : "bg-rose-500/10 border-rose-400/20 text-rose-100"
                  )}
                >
                  {submitStatus.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-white text-[#0b1224] px-6 py-3 font-semibold hover:opacity-90 disabled:opacity-60 transition"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-white/60">{footerInfo?.text ?? ""}</p>
      </Container>
    </footer>
  );
}

/* ---------------------------------- App ---------------------------------- */

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.scrollBehavior = "";
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#0f172a] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <Header />

      <main className="pt-16 overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
