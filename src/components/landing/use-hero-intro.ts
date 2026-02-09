"use client"

import * as React from "react"
import { animate, useMotionValue, useReducedMotion } from "framer-motion"

import { EASE_OUT } from "@/lib/motion"

export function useHeroIntro() {
  const reduce = useReducedMotion() ?? false

  // Avoid React dev strict-effects double-play (effect -> cleanup -> effect).
  const playedRef = React.useRef(false)

  const iconScale = useMotionValue(reduce ? 1 : 4.5)
  const iconY = useMotionValue(reduce ? 0 : 140)

  const nameOpacity = useMotionValue(reduce ? 1 : 0)
  const nameY = useMotionValue(reduce ? 0 : 10)
  const nameBlur = useMotionValue(reduce ? 0 : 10)

  const headlineOpacity = useMotionValue(reduce ? 1 : 0)
  const headlineY = useMotionValue(reduce ? 0 : 24)
  const headlineBlur = useMotionValue(reduce ? 0 : 16)

  const subOpacity = useMotionValue(reduce ? 1 : 0)
  const subY = useMotionValue(reduce ? 0 : 24)
  const subBlur = useMotionValue(reduce ? 0 : 16)

  const ctaOpacity = useMotionValue(reduce ? 1 : 0)
  const ctaY = useMotionValue(reduce ? 0 : 24)
  const ctaBlur = useMotionValue(reduce ? 0 : 16)

  // Hero phones intro translation (one-time on page load).
  const x0 = useMotionValue(reduce ? 0 : -90)
  const x1 = useMotionValue(reduce ? 0 : -45)
  const x2 = useMotionValue(0)
  const x3 = useMotionValue(reduce ? 0 : 45)
  const x4 = useMotionValue(reduce ? 0 : 90)
  const phonesX = React.useMemo(() => [x0, x1, x2, x3, x4], [x0, x1, x2, x3, x4])

  const y0 = useMotionValue(0)
  const y1 = useMotionValue(0)
  const y2 = useMotionValue(reduce ? 0 : 40) // center phone fades in "up"
  const y3 = useMotionValue(0)
  const y4 = useMotionValue(0)
  const phonesY = React.useMemo(() => [y0, y1, y2, y3, y4], [y0, y1, y2, y3, y4])

  // Just reveal timing; scroll owns final positioning.
  const p0 = useMotionValue(reduce ? 1 : 0)
  const p1 = useMotionValue(reduce ? 1 : 0)
  const p2 = useMotionValue(reduce ? 1 : 0)
  const p3 = useMotionValue(reduce ? 1 : 0)
  const p4 = useMotionValue(reduce ? 1 : 0)
  const phonesOpacity = React.useMemo(() => [p0, p1, p2, p3, p4], [p0, p1, p2, p3, p4])

  React.useLayoutEffect(() => {
    if (reduce) return
    if (playedRef.current) return
    playedRef.current = true

    // Reset to initial (in case of HMR).
    iconScale.set(4.5)
    iconY.set(140)
    nameOpacity.set(0)
    nameY.set(10)
    nameBlur.set(10)
    headlineOpacity.set(0)
    headlineY.set(24)
    headlineBlur.set(16)
    subOpacity.set(0)
    subY.set(24)
    subBlur.set(16)
    ctaOpacity.set(0)
    ctaY.set(24)
    ctaBlur.set(16)
    phonesX[0].set(-90)
    phonesX[1].set(-45)
    phonesX[2].set(0)
    phonesX[3].set(45)
    phonesX[4].set(90)
    phonesY[0].set(0)
    phonesY[1].set(0)
    phonesY[2].set(40)
    phonesY[3].set(0)
    phonesY[4].set(0)
    phonesOpacity.forEach((p) => p.set(0))

    // Icon shrink + lift (single smooth tween).
    animate(iconScale, 1.0, { duration: 1.6, ease: EASE_OUT })
    animate(iconY, 0, { duration: 1.6, ease: EASE_OUT })

    // Text blur-up reveals (starts immediately with icon).
    animate(nameOpacity, 1, { duration: 0.7, delay: 0.25, ease: EASE_OUT })
    animate(nameY, 0, { duration: 0.7, delay: 0.25, ease: EASE_OUT })
    animate(nameBlur, 0, { duration: 0.7, delay: 0.25, ease: EASE_OUT })

    animate(headlineOpacity, 1, { duration: 0.9, delay: 0.3, ease: EASE_OUT })
    animate(headlineY, 0, { duration: 0.9, delay: 0.3, ease: EASE_OUT })
    animate(headlineBlur, 0, { duration: 0.9, delay: 0.3, ease: EASE_OUT })

    animate(subOpacity, 1, { duration: 0.9, delay: 0.42, ease: EASE_OUT })
    animate(subY, 0, { duration: 0.9, delay: 0.42, ease: EASE_OUT })
    animate(subBlur, 0, { duration: 0.9, delay: 0.42, ease: EASE_OUT })

    animate(ctaOpacity, 1, { duration: 0.8, delay: 0.58, ease: EASE_OUT })
    animate(ctaY, 0, { duration: 0.8, delay: 0.58, ease: EASE_OUT })
    animate(ctaBlur, 0, { duration: 0.8, delay: 0.58, ease: EASE_OUT })

    // Phones fade/slide in horizontally from the sides (center phone fades in up).
    const phoneDelays = [0.62, 0.55, 0.48, 0.55, 0.62]
    phonesOpacity.forEach((p, idx) => {
      animate(p, 1, { duration: 1.1, delay: phoneDelays[idx] ?? 0.55, ease: EASE_OUT })
      animate(phonesX[idx], 0, { duration: 1.2, delay: phoneDelays[idx] ?? 0.55, ease: EASE_OUT })
      animate(phonesY[idx], 0, { duration: 1.2, delay: phoneDelays[idx] ?? 0.55, ease: EASE_OUT })
    })

    // No cleanup: keeps dev strict-effects from stopping animations mid-flight.
  }, [
    reduce,
    iconScale,
    iconY,
    nameOpacity,
    nameY,
    nameBlur,
    headlineOpacity,
    headlineY,
    headlineBlur,
    subOpacity,
    subY,
    subBlur,
    ctaOpacity,
    ctaY,
    ctaBlur,
    phonesX,
    phonesY,
    phonesOpacity,
  ])

  return {
    iconScale,
    iconY,
    nameOpacity,
    nameY,
    nameBlur,
    headlineOpacity,
    headlineY,
    headlineBlur,
    subOpacity,
    subY,
    subBlur,
    ctaOpacity,
    ctaY,
    ctaBlur,
    phonesX,
    phonesY,
    phonesOpacity,
  }
}
