"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import SkillGlobe from "@/components/SkillGlobe"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const skills: Record<string, string[]> = {
  languages: ["Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Swift", "SQL"],
  web: ["HTML", "CSS", "React", "Tailwind", "Vite", "Node.js", "ASP.NET", "FastAPI", "REST"],
  databases: ["MySQL", "PostgreSQL", "MS SQL Server", "MongoDB", "Supabase"],
  ml_ai: ["PyTorch", "scikit-learn", "NumPy", "giotto-tda", "Jupyter", "Explainable AI", "Deep Learning"],
  cloud_devops: ["Vercel", "MongoDB Atlas", "Git", "GitHub", "Docker"],
  data_tools: ["Power BI", "MATLAB", "Power Automate", "Power Apps"],
}

const workExperience = [
  {
    hash: "b3e7d10",
    branch: "beavercreek",
    position: "Senior Software Engineering Intern",
    company: "Beavercreek Marketing",
    dates: "Jun 2026 – Present",
    promoted: true,
    responsibilities: [
      "Rebuilt the distributed video rendering platform architecture using Cloudflare Workers and JavaScript — cutting rendering time by 40%, enabling dead-letter recovery, and scaling to 5,000+ msg/sec throughput.",
      "Owned a multi-process Mac Mini render farm orchestrating After Effects and FFmpeg — eliminating race conditions across automated branded video pipelines for 3,000+ financial institutions.",
      "Built an internal admin portal and B2B client portal with React, Cloudflare Workers AI caption integration, and real-time monitoring.",
      "Mentored an incoming intern through codebase onboarding and contribution workflows.",
    ],
  },
  {
    hash: "a1f9c2e",
    branch: "beavercreek",
    position: "Software Developer Intern",
    company: "Beavercreek Marketing",
    dates: "Feb 2026 – Jun 2026",
    responsibilities: [
      "Built and optimized automated video rendering pipelines using Node.js.",
      "Developed full-stack tools for job submission and queue monitoring with JavaScript/React.",
      "Refactored legacy systems with asynchronous processing, logging, and error handling.",
    ],
  },
  {
    hash: "f5c1a93",
    branch: "research",
    position: "Undergraduate Researcher",
    company: "UNL — School of Computing",
    dates: "Oct 2025 – Present",
    responsibilities: [
      "Conducting research on Explainable AI using Topological Laplacians with PyTorch, giotto-tda, NumPy, scikit-learn, and Jupyter.",
      "Built and evaluated deep learning pipelines on 3+ benchmark datasets, integrating persistent Laplacians and persistence-diagram vectorization to analyze latent feature representations.",
      "Improving the transparency and interpretability of deep learning models through topological data analysis.",
    ],
  },
  {
    hash: "7d4b0aa",
    branch: "kzvalve-it",
    position: "IT Desktop Support Analyst Intern",
    company: "KZValve",
    dates: "Sep 2025 – Feb 2026",
    promoted: true,
    responsibilities: [
      "Designed AI-powered automation solutions using Power Automate, Power Apps, Power BI, and MS SQL, reducing manual work by 40% and improving cross-team efficiency.",
      "Automated report generation for 10,000+ records weekly, speeding up insights and decision-making by 35%.",
      "Built automated workflows to track data changes and errors, send real-time alerts, and reduce reporting time by 50%, improving operational visibility across teams.",
    ],
  },
  {
    hash: "3c8e15f",
    branch: "kzvalve-sys",
    position: "IT System Support Intern",
    company: "KZValve",
    dates: "May 2025 – Sep 2025",
    responsibilities: [
      "Resolved 100+ hardware and software issues, improving ticket resolution speed by 35%.",
      "Deployed and configured Dell PowerStore storage systems, expanding capacity from 2TB to 22TB per server and enabling scalable, high-speed data access across servers and virtual machines.",
      "Strengthened system security by remediating vulnerabilities using Rapid7, reducing risk exposure by 31%.",
      "Supported IT infrastructure by managing user access with Adaxes and configuring VoIP systems.",
      "Installed and deployed Windows 11 on laptops and desktop towers, ensuring proper drivers, system updates, and user readiness.",
    ],
  },
  {
    hash: "e02a9b1",
    branch: "unl-soc",
    position: "Learning Assistant",
    company: "UNL — School of Computing",
    dates: "Jan 2025 – Present",
    responsibilities: [
      "Provided individualized support to 60+ students via one-on-one sessions and CampusWire.",
      "Evaluated and graded assignments on CSE servers (Handin, Web-grader).",
      "Oversaw computer lab sessions for 30+ students.",
    ],
  },
  {
    hash: "9a2d4c7",
    branch: "nest",
    position: "Learning Consultant",
    company: "UNL — College of Engineering (NEST)",
    dates: "Sep 2024 – May 2026",
    responsibilities: [
      "Tutored MATH courses — Calculus I/II/III, Linear Algebra, and Differential Equations — for the Nebraska Engineering Support and Tutoring (NEST) program.",
      "Helped students strengthen problem-solving skills and conceptual understanding through one-on-one and group support.",
    ],
  },
  {
    hash: "1b8f602",
    branch: "ets",
    position: "Coding & Robotics Teaching Assistant",
    company: "Educational Talent Search",
    dates: "May 2024 – Jun 2024",
    responsibilities: [
      "Facilitated hands-on JavaScript programming and Sphero robotics learning for middle-school scholars.",
      "Integrated JavaScript and Sphero Bolt technologies into curriculum activities for interactive, engaging sessions.",
      "Helped students apply JavaScript coding and the Sphero app to explore robotics and programming concepts.",
    ],
  },
]

const projects = [
  {
    title: "Foody",
    file: "foody/",
    image: "/foody.jpeg",
    fit: "contain",
    incoming: true,
    description: "An upcoming food-discovery app — currently in active development. Stay tuned.",
    technologies: ["React", "TypeScript", "Next.js"],
    github: "https://github.com/Datquangbui1011",
  },
  {
    title: "E-Commerce Platform",
    file: "ecommerce/",
    image: "/ecommerce.png",
    description: "A full-featured e-commerce platform with product management, cart, and payment processing.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Stripe"],
    github: "https://github.com/Datquangbui1011/CSCE-361",
  },
  {
    title: "Portfolio Website",
    file: "portfolio/",
    image: "/portfolio.png",
    description: "A responsive portfolio site showcasing projects and skills with a modern design.",
    technologies: ["Next.js", "React", "Tailwind", "Framer Motion"],
    github: "https://github.com/Datquangbui1011/Portfolio",
  },
  {
    title: "Sidequest",
    file: "sidequest/",
    image: "/sidequest.png",
    description: "A web app for students to prep for internships through small, focused projects.",
    technologies: ["React", "TypeScript", "Tailwind", "FastAPI"],
    github: "https://github.com/Datquangbui1011/Cornhack-Project",
  },
  {
    title: "DB Cinema",
    file: "db-cinema/",
    image: "/dbcinema.png",
    description: "A full-stack cinema ticketing platform with auth, movie booking, and payments.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/Datquangbui1011/DB-cinema",
    demo: "https://db-cinema-n6zt.vercel.app/",
  },
]

// Logos for the interactive skill globe (Simple Icons slugs).
const skillLogos = [
  { name: "Python", slug: "python" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "HTML5", slug: "html5" },
  { name: "C++", slug: "cplusplus" },
  { name: "Swift", slug: "swift" },
  { name: "MySQL", slug: "mysql" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Supabase", slug: "supabase" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "NumPy", slug: "numpy" },
  { name: "Jupyter", slug: "jupyter" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Docker", slug: "docker" },
  { name: "Vercel", slug: "vercel" },
  { name: "Linux", slug: "linux" },
]

const navItems = ["home", "about", "skills", "experience", "projects", "contact"]

/* ------------------------------------------------------------------ */
/*  Boot sequence (typed)                                              */
/* ------------------------------------------------------------------ */

const bootLines: { text: string; className?: string; delay?: number }[] = [
  { text: "$ ssh dat@portfolio.dev", className: "text-term-text" },
  { text: "Connecting to portfolio.dev:22 ...", className: "text-term-dim" },
  { text: "Authenticating public key ............ [ OK ]", className: "text-term-dim" },
  { text: "Loading kernel modules ............... [ OK ]", className: "text-term-dim" },
  { text: "SYSTEM.KERNEL :: v4.8.0 ONLINE", className: "text-term-green term-glow" },
  { text: "", },
  { text: "> role    : AI, Machine Learning & Full-Stack Software Engineer", className: "text-term-text" },
  { text: "> status  : available for work", className: "text-term-text" },
  { text: "> loc     : Lincoln, NE", className: "text-term-text" },
  { text: "> while (alive) { code(); learn(); ship(); }", className: "text-term-cyan" },
]

function useTypedLines(lines: typeof bootLines, charSpeed = 14, lineGap = 120) {
  const [done, setDone] = useState<string[]>([])
  const [current, setCurrent] = useState("")
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0

    const tick = () => {
      if (cancelled) return
      if (lineIdx >= lines.length) {
        setFinished(true)
        return
      }
      const full = lines[lineIdx].text
      if (charIdx <= full.length) {
        setCurrent(full.slice(0, charIdx))
        charIdx++
        setTimeout(tick, full.length === 0 ? 60 : charSpeed)
      } else {
        setDone((d) => [...d, full])
        setCurrent("")
        lineIdx++
        charIdx = 0
        setTimeout(tick, lineGap)
      }
    }
    const start = setTimeout(tick, 400)
    return () => {
      cancelled = true
      clearTimeout(start)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { done, current, finished }
}

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-term-border bg-term-panel/80">
      <span className="w-3 h-3 rounded-full bg-term-red/80" />
      <span className="w-3 h-3 rounded-full bg-term-amber/80" />
      <span className="w-3 h-3 rounded-full bg-term-green/80" />
      <span className="ml-3 text-xs text-term-dim tracking-wide">{title}</span>
    </div>
  )
}

/** Cycles random characters at high speed, then resolves to the real word.
 *  Plays on mount (optionally delayed) and replays on hover. */
function ScrambleText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/<>-_\\[]{}=+*#"

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text)
      return
    }
    const total = text.length
    let iteration = 0
    const step = () => {
      const revealed = iteration / 14 // reveal one real char every ~7 frames (slower)
      let out = ""
      for (let i = 0; i < total; i++) {
        out += i < revealed ? text[i] : CHARS[(Math.random() * CHARS.length) | 0]
      }
      setDisplay(out)
      if (revealed < total) {
        iteration++
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(text)
        rafRef.current = null
      }
    }
    step()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    const t = setTimeout(scramble, startDelay)
    return () => {
      clearTimeout(t)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scramble, startDelay])

  return (
    <span onMouseEnter={scramble} className="inline-block tabular-nums">
      {display}
    </span>
  )
}

function SectionHeading({ cmd, comment }: { cmd: string; comment: string }) {
  return (
    <div className="mb-10">
      <div className="text-term-dim text-sm">
        <span className="text-term-green">dat@portfolio</span>
        <span className="text-term-dim">:</span>
        <span className="text-term-cyan">~</span>
        <span className="text-term-dim">$ </span>
        <span className="text-term-text">{cmd}</span>
      </div>
      <p className="mt-2 text-term-dim text-sm">{`// ${comment}`}</p>
    </div>
  )
}

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [active, setActive] = useState("home")
  const [clock, setClock] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const { done, current, finished } = useTypedLines(bootLines)

  // live clock in the status bar
  useEffect(() => {
    const t = setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-US", { hour12: false }) +
          " UTC" +
          (-new Date().getTimezoneOffset() / 60 >= 0 ? "+" : "") +
          -new Date().getTimezoneOffset() / 60,
      )
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // active section tracking
  useEffect(() => {
    const onScroll = () => {
      for (const id of navItems) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= window.innerHeight / 2 && r.bottom >= window.innerHeight / 2) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setFormStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          company: (form.elements.namedItem("company") as HTMLInputElement).value,
          note: (form.elements.namedItem("note") as HTMLTextAreaElement).value,
        }),
      })
      if (res.ok) {
        setFormStatus("sent")
        form.reset()
        setTimeout(() => setFormStatus("idle"), 3000)
      } else {
        setFormStatus("error")
        setTimeout(() => setFormStatus("idle"), 3000)
      }
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 3000)
    }
  }

  return (
    <div className="scanlines min-h-dvh bg-term-bg text-term-text selection:bg-term-green/30 selection:text-term-bright">
      {/* ---------------- Top nav ---------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-term-border bg-term-bg/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between text-sm">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-term-green term-glow">●</span>
            <span className="text-term-text group-hover:text-term-green transition-colors">~/dat-bui</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={`#${item}`}
                className={`px-3 py-1 rounded transition-colors ${
                  active === item
                    ? "text-term-green bg-term-green/10"
                    : "text-term-dim hover:text-term-text"
                }`}
              >
                <ScrambleText text={item} startDelay={900 + i * 110} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="md:hidden text-term-green border border-term-green/40 px-3 py-1 rounded"
          >
            contact
          </a>
        </div>
      </nav>

      {/* ---------------- Hero / boot ---------------- */}
      <section
        id="home"
        className="term-grid term-flicker min-h-dvh flex items-center px-4 md:px-6 pt-12"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="rounded-lg border border-term-border bg-term-panel/40 shadow-[0_0_60px_rgba(77,155,255,0.07)] overflow-hidden">
            <WindowChrome title="dat@portfolio: ~ — zsh — 96×32" />
            <div className="p-5 md:p-8 text-sm md:text-[15px] leading-relaxed min-h-[60vh]">
              {done.map((line, i) => (
                <pre key={i} className={`whitespace-pre-wrap break-words ${bootLines[i]?.className ?? "text-term-text"}`}>
                  {line || " "}
                </pre>
              ))}
              {!finished && (
                <pre className={`whitespace-pre-wrap break-words ${bootLines[done.length]?.className ?? "text-term-text"}`}>
                  {current}
                  <span className="term-cursor" />
                </pre>
              )}

              {finished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <pre className="text-term-green term-glow text-[10px] sm:text-sm md:text-base leading-tight overflow-x-auto">
{String.raw` ____    _  _____   ____  _   _ ___
|  _ \  / \|_   _| | __ )| | | |_ _|
| | | |/ _ \ | |   |  _ \| | | || |
| |_| / ___ \| |   | |_) | |_| || |
|____/_/   \_\_|   |____/ \___/|___|`}
                  </pre>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 bg-term-green text-term-bg px-4 py-2 rounded font-semibold hover:bg-term-bright transition-colors"
                    >
                      ./view-projects.sh
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 border border-term-green/40 text-term-green px-4 py-2 rounded hover:bg-term-green/10 transition-colors"
                    >
                      ./say-hi <span className="term-cursor !h-[0.9em]" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <p className="mt-3 text-xs text-term-dim text-center">
            tip: use the nav above or scroll to walk the filesystem ↓
          </p>
        </div>
      </section>

      {/* ---------------- about.system ---------------- */}
      <section id="about" className="px-4 md:px-6 py-24 border-t border-term-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeading cmd="cat about.system" comment="who is running this process" />
          <motion.div {...reveal} className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-5 text-term-text/90 leading-relaxed">
              <p>
                <span className="text-term-green">const</span> me ={" "}
                <span className="text-term-amber">"Dat Bui"</span> — a Senior at the University of
                Nebraska–Lincoln pursuing a B.S. in Computer Science with a minor in Mathematics.
              </p>
              <p>
                I grew up in Bien Hoa, Vietnam, and have lived in Lincoln for 4 years. My background
                spans customer service, teaching, and IT — and has since converged on software
                engineering.
              </p>
              <p>
                I build fast, modern applications, automate the boring parts, and I&apos;m always
                shipping something new. Always eager to gain hands-on experience across computing.
              </p>
            </div>
            <div className="space-y-5">
              {/* photo viewer */}
              <div className="group rounded-lg border border-term-border bg-term-panel/50 overflow-hidden hover:border-term-green/40 transition-colors">
                <div className="flex items-center justify-between px-3 py-2 border-b border-term-border text-xs">
                  <span className="text-term-dim">
                    <span className="text-term-green">$</span> open ~/dat.png
                  </span>
                  <span className="text-term-dim">1.2MB</span>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/Dat.png"
                    alt="Dat Bui"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-3 text-xs text-term-green term-glow">
                    ~/dat-bui <span className="term-cursor !h-[0.85em]" />
                  </div>
                </div>
              </div>

              {/* quick stats */}
              <div className="rounded-lg border border-term-border bg-term-panel/50 p-5 text-sm">
                <div className="text-term-dim mb-3">// quick stats</div>
                <ul className="space-y-2">
                  <li className="flex justify-between"><span className="text-term-dim">uptime</span><span className="text-term-text">4+ yrs in Lincoln</span></li>
                  <li className="flex justify-between"><span className="text-term-dim">focus</span><span className="text-term-green">AI, Machine learning, Full-stack</span></li>
                  <li className="flex justify-between"><span className="text-term-dim">edu</span><span className="text-term-text">CS @ UNL</span></li>
                  <li className="flex justify-between"><span className="text-term-dim">minor</span><span className="text-term-text">Mathematics</span></li>
                  <li className="flex justify-between"><span className="text-term-dim">status</span><span className="text-term-bright term-glow">● open</span></li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- skills.json ---------------- */}
      <section id="skills" className="px-4 md:px-6 py-24 border-t border-term-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeading cmd="./render skills.globe --interactive" comment="drag to explore the stack" />
          <motion.div
            {...reveal}
            className="rounded-lg border border-term-border bg-term-panel/40 overflow-hidden term-grid"
          >
            <WindowChrome title="skills.globe — drag to rotate · hover to inspect" />
            <div className="relative px-2 py-6 md:py-10">
              <SkillGlobe skills={skillLogos} />
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-term-dim flex items-center gap-2">
                <span className="text-term-green">$</span> drag to spin · hover a node
                <span className="term-cursor !h-[0.8em]" />
              </div>
            </div>
          </motion.div>

          {/* full categorized list */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {Object.entries(skills).map(([key, list]) => (
              <motion.div key={key} {...reveal}>
                <div className="text-xs text-term-cyan mb-2">
                  <span className="text-term-dim">&quot;</span>
                  {key}
                  <span className="text-term-dim">&quot;:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-term-text/80 border border-term-border rounded px-2 py-0.5 hover:border-term-green/40 hover:text-term-green transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- experience (git log) ---------------- */}
      <section id="experience" className="px-4 md:px-6 py-24 border-t border-term-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeading cmd="git log --oneline --career" comment="commit history of the journey" />
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-term-border md:left-[7px]" />
            <div className="space-y-10">
              {workExperience.map((exp) => (
                <motion.div key={exp.hash} {...reveal} className="relative pl-8">
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-term-green bg-term-bg" />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-term-amber">{exp.hash}</span>
                    <span className="text-term-dim">(</span>
                    <span className="text-term-cyan">{exp.branch}</span>
                    <span className="text-term-dim">)</span>
                    <span className="text-term-text font-semibold">{exp.position}</span>
                    {"promoted" in exp && exp.promoted && (
                      <span className="text-[10px] uppercase tracking-wider text-term-green border border-term-green/40 bg-term-green/10 rounded px-1.5 py-0.5">
                        ↑ promoted
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-term-dim">
                    @ {exp.company} · <span className="text-term-green">{exp.dates}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-term-text/85">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-term-green select-none">+</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- projects ---------------- */}
      <section id="projects" className="px-4 md:px-6 py-24 border-t border-term-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeading cmd="ls -la ~/projects" comment="selected works" />
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((proj) => (
              <motion.div
                {...reveal}
                key={proj.title}
                className="group rounded-lg border border-term-border bg-term-panel/50 overflow-hidden hover:border-term-green/40 hover:shadow-[0_0_40px_rgba(77,155,255,0.1)] transition-all"
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-term-border text-xs">
                  <span className="text-term-dim">
                    <span className="text-term-green">drwxr-xr-x</span> {proj.file}
                  </span>
                  <div className="flex gap-3">
                    {"incoming" in proj && proj.incoming ? (
                      <span className="text-term-amber">[wip · coming soon]</span>
                    ) : (
                      <>
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-term-dim hover:text-term-green transition-colors"
                        >
                          [source]
                        </a>
                        {proj.demo && (
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-term-cyan hover:text-term-bright transition-colors"
                          >
                            [live]
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* screenshot preview */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-term-border bg-term-bg term-grid">
                  <img
                    src={proj.image}
                    alt={`${proj.title} screenshot`}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                      "fit" in proj && proj.fit === "contain"
                        ? "object-contain object-center p-3"
                        : "object-cover object-top"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-term-panel/60 to-transparent pointer-events-none" />
                  {"incoming" in proj && proj.incoming && (
                    <span className="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-term-bg bg-term-amber font-semibold rounded px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-term-bg animate-pulse" /> incoming
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-term-text group-hover:text-term-green transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-sm text-term-text/75 leading-relaxed">{proj.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-term-cyan border border-term-border rounded px-2 py-0.5 group-hover:border-term-green/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- contact.exe ---------------- */}
      <section id="contact" className="px-4 md:px-6 py-24 border-t border-term-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeading cmd="./contact.exe --open-channel" comment="establish a secure connection" />
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div {...reveal} className="space-y-5">
              <p className="text-2xl font-semibold text-term-text">
                Let&apos;s build something. <span className="term-cursor align-middle" />
              </p>
              <p className="text-term-text/75 leading-relaxed">
                Open to internships, full-time roles, and collaborations. Drop a message — I usually
                reply within a day.
              </p>
              <div className="space-y-2 text-sm pt-2">
                <a
                  href="mailto:quangdatbui10112004@gmail.com"
                  className="flex items-center gap-3 text-term-dim hover:text-term-green transition-colors"
                >
                  <span className="text-term-green">$</span> mail quangdatbui10112004@gmail.com
                </a>
                <a
                  href="https://github.com/Datquangbui1011"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-term-dim hover:text-term-green transition-colors"
                >
                  <span className="text-term-green">$</span> open github.com/Datquangbui1011
                </a>
                <a
                  href="https://www.linkedin.com/in/datbui1011/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-term-dim hover:text-term-green transition-colors"
                >
                  <span className="text-term-green">$</span> open linkedin.com/in/datbui1011
                </a>
              </div>
            </motion.div>

            <motion.form {...reveal} onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "name", type: "text", required: true, placeholder: "your name" },
                { id: "company", label: "company", type: "text", required: false, placeholder: "optional" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs text-term-dim mb-1">
                    <span className="text-term-green">const</span> {f.label} =
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full bg-term-bg border border-term-border rounded px-3 py-2 text-sm text-term-text placeholder:text-term-dim focus:outline-none focus:border-term-green transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="note" className="block text-xs text-term-dim mb-1">
                  <span className="text-term-green">const</span> message =
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  required
                  placeholder="tell me about your project..."
                  className="w-full bg-term-bg border border-term-border rounded px-3 py-2 text-sm text-term-text placeholder:text-term-dim focus:outline-none focus:border-term-green transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending" || formStatus === "sent"}
                className="w-full bg-term-green text-term-bg font-semibold rounded px-4 py-2.5 hover:bg-term-bright transition-colors disabled:opacity-70"
              >
                {formStatus === "sending" && "sending... "}
                {formStatus === "sent" && "✓ message sent"}
                {formStatus === "error" && "✗ failed — retry"}
                {formStatus === "idle" && "$ ./send"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ---------------- status bar / footer ---------------- */}
      <footer className="border-t border-term-border px-4 md:px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-term-dim">
          <div className="flex items-center gap-2">
            <span className="text-term-green">●</span> all systems operational
          </div>
          <div>© {new Date().getFullYear()} Dat Bui — built with Next.js</div>
          <div className="font-mono-term tabular-nums">{clock || "--:--:--"}</div>
        </div>
      </footer>
    </div>
  )
}
