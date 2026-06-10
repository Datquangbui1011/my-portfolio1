"use client"

import { useEffect, useRef } from "react"

export type Skill = { name: string; slug: string }

/**
 * Interactive 3D skill globe.
 * Logos are distributed on a sphere (Fibonacci lattice), connected to their
 * nearest neighbours by lines, and rendered to a canvas with perspective +
 * depth fading. Drag to spin; it auto-rotates and shows a label on hover.
 */
export default function SkillGlobe({ skills }: { skills: Skill[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const PERSP = 1.9
    const N = skills.length

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let radius = 0

    // Preload brand-coloured logos from Simple Icons.
    const imgs: (HTMLImageElement | null)[] = skills.map(() => null)
    skills.forEach((s, i) => {
      const im = new Image()
      im.crossOrigin = "anonymous"
      im.src = `https://cdn.simpleicons.org/${s.slug}`
      im.onload = () => (imgs[i] = im)
      im.onerror = () => (imgs[i] = null)
    })

    // Base points on a unit sphere (Fibonacci distribution).
    const base = skills.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      }
    })

    // Connect each node to its 3 nearest neighbours (constellation edges).
    const edges: [number, number][] = []
    const seen = new Set<string>()
    for (let i = 0; i < N; i++) {
      const near = base
        .map((p, j) => ({
          j,
          d: (p.x - base[i].x) ** 2 + (p.y - base[i].y) ** 2 + (p.z - base[i].z) ** 2,
        }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
      for (let k = 0; k < 3 && k < near.length; k++) {
        const j = near[k].j
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          edges.push([i, j])
        }
      }
    }

    let rotX = 0.3
    let rotY = 0
    let velX = 0
    let velY = 0.0018
    let dragging = false
    let lastX = 0
    let lastY = 0
    let pointerX = -1
    let pointerY = -1
    let hover = -1
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = width / 2
      cy = height / 2
      radius = Math.min(width, height) * 0.36
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = e.clientX - rect.left
      pointerY = e.clientY - rect.top
      if (dragging) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        rotY += dx * 0.006
        rotX += dy * 0.006
        velY = dx * 0.0006
        velX = dy * 0.0006
        lastX = e.clientX
        lastY = e.clientY
      }
    }
    const onUp = () => (dragging = false)
    const onLeave = () => {
      pointerX = -1
      pointerY = -1
    }
    canvas.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    canvas.addEventListener("pointerleave", onLeave)

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    let raf = 0
    const render = () => {
      rotX = Math.max(-1.2, Math.min(1.2, rotX))
      if (!dragging && !reduceMotion) {
        rotY += velY
        rotX += velX
        velX *= 0.92
        velY *= 0.95
        if (Math.abs(velY) < 0.0018) velY = velY < 0 ? -0.0018 : 0.0018
      }

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      const pts = base.map((p) => {
        const x1 = p.x * cosY - p.z * sinY
        let z1 = p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        z1 = p.y * sinX + z1 * cosX
        const scale = PERSP / (PERSP - z1)
        return { x: cx + x1 * radius * scale, y: cy + y1 * radius * scale, z: z1, scale }
      })

      ctx.clearRect(0, 0, width, height)

      // hover pick (nearest logo under the pointer)
      hover = -1
      if (pointerX >= 0 && !dragging) {
        let best = Infinity
        pts.forEach((p, i) => {
          const sz = 16 * p.scale
          const d = (p.x - pointerX) ** 2 + (p.y - pointerY) ** 2
          if (d < sz * sz && d < best) {
            best = d
            hover = i
          }
        })
      }

      // edges
      ctx.lineWidth = 1
      edges.forEach(([a, b]) => {
        const pa = pts[a]
        const pb = pts[b]
        const depth = (pa.z + pb.z) / 2
        const alpha = 0.05 + Math.max(0, (depth + 1) / 2) * 0.22
        const hot = hover === a || hover === b
        ctx.strokeStyle = hot ? "rgba(130,189,255,0.55)" : `rgba(77,155,255,${alpha})`
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      })

      // nodes, back to front
      const order = pts.map((p, i) => ({ p, i })).sort((u, v) => u.p.z - v.p.z)
      order.forEach(({ p, i }) => {
        const depth = (p.z + 1) / 2
        const isHot = hover === i
        const sz = (isHot ? 30 : 21) * p.scale
        ctx.globalAlpha = 0.4 + depth * 0.6
        if (isHot) {
          ctx.shadowColor = "rgba(77,155,255,0.9)"
          ctx.shadowBlur = 18
        }
        const img = imgs[i]
        if (img) {
          ctx.drawImage(img, p.x - sz / 2, p.y - sz / 2, sz, sz)
        } else {
          ctx.fillStyle = "#4d9bff"
          ctx.beginPath()
          ctx.arc(p.x, p.y, sz / 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      // hover label
      if (hover >= 0) {
        const p = pts[hover]
        const label = skills[hover].name
        ctx.font = "600 13px ui-monospace, monospace"
        const w = ctx.measureText(label).width
        const lx = p.x
        const ly = p.y - 21 * p.scale - 18
        roundRect(lx - w / 2 - 9, ly - 12, w + 18, 24, 6)
        ctx.fillStyle = "rgba(13,19,32,0.95)"
        ctx.fill()
        ctx.strokeStyle = "rgba(77,155,255,0.6)"
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = "#c2cde0"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(label, lx, ly)
        ctx.textAlign = "start"
      }

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointerleave", onLeave)
    }
  }, [skills])

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-square max-w-[34rem] mx-auto cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {/* accessible fallback list */}
      <ul className="sr-only">
        {skills.map((s) => (
          <li key={s.slug}>{s.name}</li>
        ))}
      </ul>
    </div>
  )
}
