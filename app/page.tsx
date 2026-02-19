"use client"

// Import necessary libraries and components
import type React from "react"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

import TechMarquee from "@/components/TechMarquee"
import Modal from "@/components/Modal"
import Spline from "@splinetool/react-spline"

// Define types for data
interface Experience {
  position: string
  company: string
  dates: string
  responsibilities: string[]
}

// Main Portfolio component
// This component renders the entire portfolio page, including navigation, hero, and sections.
export default function Portfolio() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Contact Pill */}
          <Link href="mailto:quangdatbui10112004@gmail.com">
            <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-2 hover:bg-zinc-800 transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-300 text-sm">quangdatbui10112004@gmail.com</span>
            </div>
          </Link>

          {/* Center: Logo */}
          <Link href="/" className="text-2xl font-bold text-white absolute left-1/2 transform -translate-x-1/2">
            Portfolio
          </Link>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
            {[
              { href: "https://github.com/Datquangbui1011", icon: <Github className="w-4 h-4" /> },
              { href: "https://www.linkedin.com/in/datbui1011/", icon: <Linkedin className="w-4 h-4" /> },
              { href: "mailto:quangdatbui10112004@gmail.com", icon: <Mail className="w-4 h-4" /> },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 w-full bg-black relative overflow-hidden">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/2WpB7nRQMkqUS30m/scene.splinecode" />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 mt-20 pointer-events-none">

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative pointer-events-auto"
          >
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <img src="/Dat.jpeg" alt="Dat Bui" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight pointer-events-auto"
          >
            Dat Bui
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-gray-500 mb-12 pointer-events-auto"
          >
            Software Engineer Student
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-32 h-1 bg-white/10 rounded-full mb-12"
          />

          {/* Stats */}
          <div className="flex gap-16 md:gap-32 pointer-events-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">Junior</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">University of Nebraska–Lincoln</div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">2+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Years of experience</div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Section */}
      {/* Section describing personal background and experience */}
      {/* Tech Marquee */}
      <TechMarquee />

      {/* About Section */}
      <section id="about" className="py-32 bg-black w-full">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col gap-12 items-start">

            {/* Top: Pill Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <span className="text-white font-medium">?</span>
                <span className="text-white font-medium">About</span>
              </div>
            </div>

            {/* Bottom: Content */}
            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src="/Dat.jpeg" alt="Dat Bui" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-gray-400 leading-relaxed">
                    I&apos;m a Junior student at the University of Nebraska–Lincoln, pursuing a bachelor&apos;s degree in Computer Science with a minor in Mathematics. I grew up in Bien Hoa, Vietnam, and have lived in Lincoln for 4 years.
                  </p>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    I have a diverse work background, starting in food customer service, teaching assistant, IT experience and transitioning into software development. I&apos;m passionate about software engineering and eager to continue gaining hands-on experience across different areas of computing.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* Section showcasing technical skills */}
      {/* Skills Section */}
      <AnimatedSection id="skills" className="min-w-screen py-32 md:py-32 container mx-auto px-4 bg-black relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-12">
            {/* Pill Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <span className="text-white font-medium">⚡</span>
                <span className="text-white font-medium">Skills</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-8 hover:bg-zinc-900 transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skillList.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-full text-sm border border-white/5 transition-colors"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* Work Experience Section */}
      <AnimatedSection id="work-experience" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-12">
            {/* Pill Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <span className="text-white font-medium">💼</span>
                <span className="text-white font-medium">Experience</span>
              </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="space-y-4">
                {workExperience.map((experience, index) => (
                  <ExperienceCard
                    key={index}
                    experience={experience}
                    index={index}
                    onClick={() => setSelectedExperience(experience)}
                  />
                ))}
              </div>
            </div>

            {/* Work Experience Modal */}
            <Modal
              isOpen={!!selectedExperience}
              onClose={() => setSelectedExperience(null)}
              title={selectedExperience?.position}
            >
              {selectedExperience && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-6 border-b border-white/10">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">{selectedExperience.company}</h4>
                    </div>
                    <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 whitespace-nowrap">
                      {selectedExperience.dates}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-lg font-medium text-white">Key Responsibilities</h5>
                    <ul className="space-y-3">
                      {selectedExperience.responsibilities.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section - Bento Grid */}
      <AnimatedSection id="projects" className="min-w-screen py-32 md:py-32 container mx-auto px-4 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-12">
            {/* Pill Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <span className="text-white font-medium">🚀</span>
                <span className="text-white font-medium">Selected Works</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-500 ${index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"
                    }`}
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 max-w-md">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {project.demo && (
                          <Link
                            href={project.demo}
                            className="bg-blue-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                        )}
                        <Link
                          href={project.github}
                          className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-col gap-12">
            {/* Pill Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <span className="text-white font-medium">📬</span>
                <span className="text-white font-medium">Contact</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <motion.h3
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold mb-4 text-white "
                >
                  Get In Touch
                </motion.h3>
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-200 mb-6"
                >
                  I&apos;m currently open to new opportunities and collaborations. Whether you have a question or just want to
                  say hi, I&apos;ll try my best to get back to you!
                </motion.p>
                <div className="space-y-4">
                  {[
                    { icon: <Mail className="text-white w-5 h-5" />, text: "quangdatbui10112004@gmail.com" },
                    { icon: <Linkedin className="text-white w-5 h-5" />, text: "https://www.linkedin.com/in/datbui1011/" },
                    { icon: <Github className="text-white w-5 h-5" />, text: "https://github.com/Datquangbui1011" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      {item.icon}
                      <span className="text-gray-100">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-8 bg-black border-t border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-cyan-200">
                Portfolio
              </Link>
            </div>
            <div className="flex space-x-6">
              {[
                { href: "https://github.com/Datquangbui1011", icon: <Github className="w-5 h-5" /> },
                { href: "https://www.linkedin.com/in/datbui1011/", icon: <Linkedin className="w-5 h-5" /> },
                { href: "mailto:quangdatbui10112004@gmail.com", icon: <Mail className="w-5 h-5" /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href={item.href} className="text-gray-200 hover:text-blue-200">
                    {item.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} Dat Bui. All rights reserved.
          </div>
        </div>
      </motion.footer>

    </div>
  )
}

// Experience Card Component with Hover-to-Open Logic
function ExperienceCard({ experience, index, onClick }: { experience: Experience; index: number; onClick: () => void }) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onClick()
    }, 500)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onClick()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group cursor-pointer bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/20 rounded-[1.5rem] p-6 transition-all duration-300 flex items-center justify-between"
    >
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <span className="text-xl font-bold text-white/50 group-hover:text-white transition-colors">
            {experience.company.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {experience.position}
          </h3>
          <p className="text-gray-400">{experience.company}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden md:block">{experience.dates}</span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// Animated Section Component
function AnimatedSection({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// Typing Effect Component


// Sample data
const skills = {
  "Programming Languages": ["Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Swift", "SQL"],
  "Web & Software Development": ["HTML", "CSS", "React", "Tailwind CSS", "Vite", "Node.js", "ASP.NET", "FastAPI", "REST APIs"],
  Databases: ["MySQL", "PostgreSQL", "MS SQL Server", "MongoDB", "Supabase"],
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
      "Built and optimized automated video rendering pipelines using Node.js, improving scalability and reducing manual processing.",
      "Developed full-stack tools for job submission and queue monitoring with JavaScript/React, streamlining content production workflows.",
      "Refactored legacy systems with asynchronous processing, logging, and error handling, increasing reliability of render operations."
    ]
  },
  {
    position: "IT Desktop Support Analyst Intern",
    company: "KZValve",
    dates: "September 2025 - Feb 2026",
    responsibilities: [
      "Designed AI-powered automation solutions using Power Automate, Power Apps, Power BI, and MS SQL, reducing manual work by 40% and improving cross-team efficiency.",
      "Automated report generation for 10000+ records weekly, speeding up insights and decision-making by 35%.",
      "Built automated workflows to track data changes and errors, send real-time alerts, and reduce reporting time by 50%, improving operational visibility across teams."
    ]
  },
  {
    position: "IT System Support Intern",
    company: "KZValve",
    dates: "May 2025 - September 2025",
    responsibilities: [
      "Resolved 100+ hardware and software issues, improving ticket resolution speed by 35%.",
      "Deployed and configured Dell PowerStore storage systems, expanding capacity from 2TB to 22TB per server and enabling scalable, high-speed data access across servers and virtual machines.",
      "Strengthened system security by remediating vulnerabilities using Rapid7, reducing risk exposure by 31%.",
      "Supported IT infrastructure by managing user access with Adaxes and configuring VoIP systems.",
      "Installed and deployed Windows 11 on laptops and desktop towers, ensuring proper drivers, system updates, and user readiness."
    ]
  },
  {
    position: "Learning Assistant",
    company: "University of Nebraska-Lincoln - School of Computing",
    dates: "Jan 2025 - Present",
    responsibilities: [
      "Provided individualized support to over 60 students through one-on-one sessions and online platforms (CampusWire), leveraging technical expertise and effective communication skills.",
      "Evaluated and graded student assignments on CSE servers (Handin, Web-grader).",
      "Oversaw computer lab sessions for 30+ students, offering guidance and fostering a productive learning environment"

    ]
  },

  {
    position: "Learning Consultant",
    company: "University of Nebraska-Lincoln - College of Engineering",
    dates: "Sep 2024 - Present",
    responsibilities: [
      "Provided effective tutoring and academic support in Calculus I, II, and III as part of the Nebraska Engineering Support and Tutoring (NEST) program",
      "Collaborated with the Engineering Student Services team to enhance student success, leveraging in-depth knowledge of engineering courses",
    ]
  },
  {
    position: "Student Worker(Dinning Service)",
    company: "University of Nebraska-Lincoln",
    dates: "Sep 2023 - Present",
    responsibilities: [
      "Managed work areas effectively by following recipes and maintaining excellent customer service standards",
      "Resolved operational challenges to ensure smooth dining hall functionality.",
      "Collaborated with supervisors and managers to uphold dining hall quality through clear communication and attention to detail"
    ]
  },
  {
    position: "Coding & Robotics Teacher Assistant",
    company: "Educational Search",
    dates: "May 2024 - June 2024",
    responsibilities: [
      "Assisted over 15 students in understanding and applying JavaScript coding and utilizing the Sphero robots app",
      "Supported integrating JavaScript and Sphero Bolt technologies into curriculum activities, promoting interactive educational sessions.",
    ]
  }
];



const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Docker", "C#", "Framer Motion"],
    image: "/ecommerce.png",
    github: "https://github.com/Datquangbui1011/CSCE-361"
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with a modern design.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/portfolio.png",
    github: "https://github.com/Datquangbui1011/Portfolio",
  },
  {
    title: "Sidequest",
    description: "A web app for students to prepare for internships with small projects.",
    technologies: ["React", "TypeScript", "Tailwind", "FastAPI", "Python"],
    github: "https://github.com/Datquangbui1011/Cornhack-Project",
    image: "/sidequest.png", // <-- your image path here
  },
  {
    title: "DB CINEMA",
    description: "A full-stack cinema ticketing platform with user authentication, movie booking, and payment processing.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Vite"],
    github: "https://github.com/Datquangbui1011/DB-cinema",
    demo: "https://db-cinema-n6zt.vercel.app/",
    image: "/dbcinema.png", // <-- your image path here
  }


]
