"use client"

import type React from "react"
import { ExternalLink, ArrowDownRight, ArrowUpRight, ArrowUp } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useRef } from "react"
import TechMarquee from "@/components/TechMarquee"


const skills = {
  "Programming Languages": ["Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Swift", "SQL"],
  "Web & Software Development": ["HTML", "CSS", "React", "Tailwind CSS", "Vite", "Node.js", "ASP.NET", "FastAPI", "REST APIs"],
  "Databases": ["MySQL", "PostgreSQL", "MS SQL Server", "MongoDB", "Supabase"],
  "Machine Learning & AI": ["PyTorch", "scikit-learn", "NumPy", "giotto-tda", "Jupyter Notebook", "Explainable AI", "Deep Learning"],
  "Cloud & DevOps": ["Vercel", "MongoDB Atlas"],
  "Data & Automation Tools": ["Power BI", "MATLAB", "Power Automate", "Power Apps"],
  "Developer Tools": ["Git", "GitHub", "Visual Studio Code", "Eclipse"],
}

const workExperience = [
  {
    position: "Software Developer Intern",
    company: "Beavercreek Marketing",
    dates: "Feb 2026 – Present",
    responsibilities: [
      "Built and optimized automated video rendering pipelines using Node.js.",
      "Developed full-stack tools for job submission and queue monitoring with JavaScript/React.",
      "Refactored legacy systems with asynchronous processing, logging, and error handling."
    ]
  },
  {
    position: "IT Desktop Support Analyst Intern",
    company: "KZValve",
    dates: "September 2025 - Feb 2026",
    responsibilities: [
      "Designed AI-powered automation solutions using Power Automate, Power Apps, Power BI, and MS SQL.",
      "Automated report generation for 10000+ records weekly.",
      "Built automated workflows to track data changes and errors, send real-time alerts."
    ]
  },
  {
    position: "IT System Support Intern",
    company: "KZValve",
    dates: "May 2025 - September 2025",
    responsibilities: [
      "Resolved 100+ hardware and software issues, improving ticket resolution speed by 35%.",
      "Deployed and configured Dell PowerStore storage systems, expanding capacity from 2TB to 22TB.",
      "Strengthened system security by remediating vulnerabilities using Rapid7."
    ]
  },
  {
    position: "Learning Assistant",
    company: "UNL - School of Computing",
    dates: "Jan 2025 - Present",
    responsibilities: [
      "Provided individualized support to over 60 students through one-on-one sessions and CampusWire.",
      "Evaluated and graded student assignments on CSE servers (Handin, Web-grader).",
      "Oversaw computer lab sessions for 30+ students."
    ]
  }
];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    image: "/ecommerce.png",
    github: "https://github.com/Datquangbui1011/CSCE-361"
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with a modern design.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio.png",
    github: "https://github.com/Datquangbui1011/Portfolio",
  },
  {
    title: "Sidequest",
    description: "A web app for students to prepare for internships with small projects.",
    technologies: ["React", "TypeScript", "Tailwind", "FastAPI"],
    github: "https://github.com/Datquangbui1011/Cornhack-Project",
    image: "/sidequest.png",
  },
  {
    title: "DB CINEMA",
    description: "A full-stack cinema ticketing platform with user authentication, movie booking, and payment processing.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/Datquangbui1011/DB-cinema",
    demo: "https://db-cinema-n6zt.vercel.app/",
    image: "/dbcinema.png",
  }
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [availableDate, setAvailableDate] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          company: (form.elements.namedItem("company") as HTMLInputElement).value,
          note: (form.elements.namedItem("note") as HTMLTextAreaElement).value,
        }),
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const { scrollY, scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  // Smooth top scroll-progress indicator
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const experienceRef = useRef<HTMLElement>(null);

  const worksRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"]
  });
  // As user scrolls DOWN past the section: full size → narrow + rounded + slide up
  const aboutScale = useTransform(aboutScrollProgress, [0, 1], [1, 0.85]);
  const aboutBorderRadius = useTransform(aboutScrollProgress, [0, 1], [0, 60]);
  const aboutY = useTransform(aboutScrollProgress, [0, 1], [0, -80]);

  useEffect(() => {
    // Generate current dynamic date: e.g. "MAR'26"
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear().toString().slice(-2);
    setAvailableDate(`${month}'${year}`);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "works", "about", "contact"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavColor = () => {
    if (["experience", "works", "about", "contact"].includes(activeSection)) return "text-white";
    return "text-dark";
  };

  return (
    <div className="min-h-screen bg-beige font-sans selection:bg-gold selection:text-dark transition-colors duration-700">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[60] origin-left"
      />

      {/* Navigation */}
      <motion.nav
        style={{ opacity: heroOpacity, y: heroY }}
        className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-colors duration-500 ${getNavColor()}`}
      >
        <div className="overflow-hidden">
          <motion.a
            href="#hero"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-sm md:text-lg font-medium tracking-tight group"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="group-hover:text-gold transition-colors">Full-Stack Software Engineer</span>
          </motion.a>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-bold overflow-hidden">
          {["experience", "works", "about", "contact"].map((item, i) => (
            <div key={item} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={`#${item}`} className="relative capitalize transition-colors hover:text-gold">
                  {item}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-gold transition-all duration-300 ${activeSection === item ? "w-full" : "w-0"}`}
                  />
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.nav>

{/* Hero Section */}
<motion.section
  id="hero"
  style={{ opacity: heroOpacity, y: heroY }}
  className="grain bg-beige min-h-screen flex flex-col justify-between relative pt-24 pb-12 px-6 md:px-12 overflow-hidden text-dark"
>
  {/* Animated aurora backdrop */}
  <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
    <div className="aurora-blob absolute -top-1/4 -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gold/25 blur-[120px]" />
    <div className="aurora-blob absolute top-1/3 right-[-10%] w-[45vw] h-[45vw] rounded-full bg-olive/30 blur-[130px]" style={{ animationDelay: "-6s" }} />
    <div className="aurora-blob absolute bottom-[-15%] left-1/4 w-[40vw] h-[40vw] rounded-full bg-gold-soft/20 blur-[110px]" style={{ animationDelay: "-12s" }} />
  </div>

  {/* BIG NAME — masked slide-up reveal */}
  <div className="relative z-10 w-full overflow-hidden">
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');`}</style>
      <h1
        style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1rem, 14.5vw, 19rem)", lineHeight: 0.9, letterSpacing: "-0.01em" }}
        className="font-bold text-dark whitespace-nowrap w-full"
      >
        DAT BUI
      </h1>
    </motion.div>
  </div>

  {/* Bottom 3-col layout */}
  <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12 mt-8">
    {/* Left — description + CTA */}
    <div className="flex flex-col gap-6 max-w-xs">
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowDownRight className="w-10 h-10 text-dark/40" />
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg leading-relaxed text-dark/80 font-medium tracking-tight">
            I build fast, modern applications that help businesses grow, available for work worldwide.
          </p>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#contact" className="inline-flex items-center gap-2 bg-dark text-beige px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform w-fit">
            CONTACT <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>

    {/* Center — photo */}
    <div className="flex justify-center overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-48 h-60 md:w-72 md:h-[22rem] relative overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700 rounded-lg flex-shrink-0">
          <img src="/Dat.jpeg" alt="Dat Bui" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </div>

    {/* Right — available for work */}
    <div className="text-right">
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.2em] text-dark/60 mb-1">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Available for work
          </div>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-5xl md:text-6xl font-black tracking-tight">
            {availableDate.split("'")[0]}
            <span className="text-gold">'{availableDate.split("'")[1]}</span>
          </div>
        </motion.div>
      </div>
    </div>
  </div>

  {/* Scroll cue */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 1 }}
    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
  >
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark/40">Scroll</span>
    <div className="w-[1px] h-12 bg-dark/20 overflow-hidden">
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="w-full h-1/2 bg-gold"
      />
    </div>
  </motion.div>
</motion.section>

{/* Tech marquee — animated logo strip */}
<TechMarquee />

      {/* Experience Section */}
      <section 
        id="experience" 
        className="bg-dark text-beige relative transition-colors duration-700"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 px-6 md:px-12 pt-24 md:pt-32 pb-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 z-0 bg-dark w-full border-b border-beige/10">
          <h2 className="text-4xl md:text-6xl font-black shrink-0 tracking-tighter">EXPERIENCE <span className="text-gold">/</span></h2>
          <p className="max-w-md text-lg md:text-xl leading-relaxed font-medium text-beige/80 tracking-tight">
            {/* A background in technical support, software engineering, and teaching, blending problem solving with practical application. */}
          </p>
        </div>
        
        {/* Pinned Cards Container */}
        <div className="relative pb-32">
          {workExperience.slice(0, 4).map((exp, i) => (
            <div 
              key={i} 
              // Each card is sticky and takes up the full screen height
              // The top padding offsets the card below the sticky header (approx header height)
              className="sticky top-[20vh] md:top-[25vh] w-full flex items-start justify-center bg-dark min-h-[80vh] md:min-h-[75vh]"
              style={{ zIndex: i + 10 }}
            >
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 border-t border-beige/20 pt-8 md:pt-16 bg-dark shadow-[-10px_-20px_40px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start pb-24">
                  
                  {/* Big Number */}
                  <div className="text-6xl md:text-[8rem] font-medium font-mono leading-none flex-shrink-0">
                    <span className="text-beige/20">0</span><span className="text-gold">{i+1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-start w-full">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                      <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-beige leading-tight">{exp.position}</h3>
                      <p className="text-lg md:text-xl font-medium tracking-tight text-beige/80 whitespace-nowrap bg-beige/10 px-4 py-2 rounded-full">{exp.company}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-base md:text-lg font-medium text-beige/60 tracking-tight mb-8 font-mono">{exp.dates}</p>
                      <span className="text-sm font-bold uppercase tracking-widest text-beige/40">Responsibilities</span>
                      <ul className="space-y-4 max-w-2xl mt-4">
                        {exp.responsibilities.map((r,idx) => (
                          <li key={idx} className="text-base md:text-lg text-beige/80 flex items-start gap-4">
                            <div className="w-2 h-2 rounded-full bg-beige mt-2.5 flex-shrink-0" />
                            <span className="leading-relaxed font-medium">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="bg-dark text-beige pt-32 pb-16 transition-colors duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-6 md:px-12 md:border-b border-beige/10 pb-12 gap-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">SELECTED WORKS <span className="text-gold">/</span></h2>
          <span className="uppercase text-sm font-bold tracking-[0.2em] text-beige/50">({projects.length.toString().padStart(2, "0")} PROJECTS)</span>
        </div>
        
        <div ref={worksRef} className="flex flex-col md:flex-row relative max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Left Column: Sticky Number Odometer */}
          <div className="hidden md:flex w-1/3 sticky top-0 h-screen items-center overflow-hidden">
            <div className="text-[12rem] lg:text-[18rem] font-medium font-mono leading-none tracking-tighter flex items-start h-[12rem] lg:h-[18rem] overflow-hidden text-beige -ml-4">
              <span className="h-full flex items-center justify-center text-beige/25">0</span>
              <motion.div
                animate={{ y: `-${activeProject * (100 / projects.length)}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {projects.map((_, i) => (
                  <span key={i} className="h-[12rem] lg:h-[18rem] flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Column: Scrolling Projects */}
          <div className="w-full md:w-2/3 flex flex-col py-12 md:py-32 gap-32">
            {projects.map((proj, i) => (
              <motion.div 
                key={i} 
                onViewportEnter={() => setActiveProject(i)}
                viewport={{ margin: "-45% 0px -45% 0px", amount: 0 }}
                className="flex flex-col gap-8 md:gap-12 group"
              >
                {/* Mobile number display */}
                <div className="md:hidden text-6xl font-medium text-beige/20 font-mono mb-4">0{i+1}</div>
                
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-beige/10 group-hover:border-gold/40 bg-dark group-hover:shadow-[0_0_60px_rgba(216,166,78,0.18)] transition-all duration-700">
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" />
                  
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 md:gap-6 z-20 backdrop-blur-sm">
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="bg-beige text-dark px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:scale-105 transition-transform text-sm md:text-base tracking-widest uppercase shadow-lg">
                        View Demo
                      </a>
                    )}
                    <a href={proj.github} target="_blank" rel="noreferrer" className="bg-beige text-dark px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:scale-105 transition-transform text-sm md:text-base tracking-widest uppercase shadow-lg">
                      Source
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter transition-colors group-hover:text-gold">{proj.title}</h3>
                  <p className="text-beige/60 mb-8 text-lg leading-relaxed font-medium">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map(t => (
                      <span key={t} className="text-xs font-bold uppercase tracking-widest border border-beige/20 px-3 py-1.5 rounded-full text-beige/80 hover:border-gold/60 hover:text-gold transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="relative z-10">
        <motion.div 
          ref={aboutRef}
          style={{ scale: aboutScale, borderRadius: aboutBorderRadius, y: aboutY }}
          className="grain bg-olive text-beige py-32 px-6 md:px-12 origin-top overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-24 max-w-7xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">ABOUT ME <span className="text-gold">/</span></h2>
              <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-beige/80 font-medium tracking-tight">
                <p>I'm a Junior student at the University of Nebraska–Lincoln, pursuing a bachelor's degree in Computer Science with a minor in Mathematics.</p>
                <p>I grew up in Bien Hoa, Vietnam, and have lived in Lincoln for 4 years.</p>
                <p>I have a diverse work background, starting in food customer service, teaching assistant, IT experience and transitioning into software development. I'm passionate about software engineering and eager to continue gaining hands-on experience across different areas of computing.</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tighter">TECHNICAL SKILLS</h2>
              <div className="space-y-12">
                {Object.entries(skills).map(([category, list]) => (
                  <div key={category}>
                    <h3 className="uppercase font-bold tracking-[0.2em] text-sm text-beige/50 mb-6">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {list.map(s => (
                        <span key={s} className="bg-beige/10 px-4 py-2 text-sm font-medium rounded-md hover:bg-gold hover:text-dark transition-colors cursor-default">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" className="grain bg-dark text-beige py-24 px-6 md:px-12 relative overflow-hidden">
        {/* soft gold glow */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 mb-24">
            {/* Left: Heading */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-beige/50 mb-6 border border-beige/20 px-4 py-1.5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> Got a project?
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">LET'S WORK<br/><span className="text-gold">TOGETHER</span></h2>
              <a href="mailto:quangdatbui10112004@gmail.com" className="text-beige/60 hover:text-gold transition-colors font-medium text-lg flex items-center gap-2 group w-fit">
                quangdatbui10112004@gmail.com
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
              </a>
            </div>

            {/* Right: Form */}
            <div className="md:w-1/2">
              <form className="flex flex-col gap-6" onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.2em] text-beige/50 mb-2 block">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-beige/20 py-3 text-lg font-medium text-beige placeholder:text-beige/30 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="text-xs font-bold uppercase tracking-[0.2em] text-beige/50 mb-2 block">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your company"
                    className="w-full bg-transparent border-b border-beige/20 py-3 text-lg font-medium text-beige placeholder:text-beige/30 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="note" className="text-xs font-bold uppercase tracking-[0.2em] text-beige/50 mb-2 block">Note</label>
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b border-beige/20 py-3 text-lg font-medium text-beige placeholder:text-beige/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  className="mt-4 bg-beige text-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gold hover:scale-105 transition-all w-fit self-start disabled:opacity-70 disabled:hover:scale-100"
                >
                  {formStatus === "sending" && "Sending..."}
                  {formStatus === "sent" && "✓ Sent!"}
                  {formStatus === "error" && "Failed — Try Again"}
                  {formStatus === "idle" && "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-beige/10 pt-12 text-beige/50 text-sm font-bold tracking-widest gap-8">
            <div className="flex gap-8">
              <a href="https://github.com/Datquangbui1011" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">GITHUB</a>
              <a href="https://www.linkedin.com/in/datbui1011/" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">LINKEDIN</a>
            </div>
            <div>© {new Date().getFullYear()} DAT BUI</div>
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-gold transition-colors flex items-center gap-2">
              BACK TO TOP <ArrowUp className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
