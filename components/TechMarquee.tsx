"use client"

import { motion } from "framer-motion"

const technologies = [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Python", slug: "python" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Git", slug: "git" },
    { name: "Docker", slug: "docker" },
    // { name: "AWS", slug: "amazonwebservices" },
    { name: "C++", slug: "cplusplus" },
    { name: "Swift", slug: "swift" },
    { name: "Linux", slug: "linux" },
]

export default function TechMarquee() {
    return (
        <div className="w-full py-10 bg-black overflow-hidden border-y border-white/5">
            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    className="flex gap-16 py-4 whitespace-nowrap"
                    animate={{
                        x: [0, -1035], // Adjust based on content width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-16 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                        >
                            <img
                                src={`https://cdn.simpleicons.org/${tech.slug}/white`}
                                alt={tech.name}
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            </div>
        </div>
    )
}
