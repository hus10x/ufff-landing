export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const revealBlurUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

export const viewportOnce = { once: true, amount: 0.5 } as const

export function transition(duration = 0.6, delay = 0) {
  return { duration, ease: EASE_OUT, delay }
}

