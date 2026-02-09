"use client"

import * as React from "react"
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  HeartHandshake,
} from "lucide-react"
import Link from "next/link"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { calAI } from "@/lib/cal-ai"
import { EASE_OUT, revealBlurUp, transition, viewportOnce } from "@/lib/motion"
import { useHeroIntro } from "@/components/landing/use-hero-intro"

const revealBlurByScrollDir = {
  hidden: (dir: number) => ({
    opacity: 0,
    y: dir < 0 ? -28 : 28,
    filter: "blur(12px)",
  }),
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  const reduce = useReducedMotion()
  return (
    <div className="text-center space-y-4 pb-10 mx-auto">
      {reduce ? (
        <h2 className="text-sm text-primary text-balance font-mono font-semibold tracking-wider uppercase">
          {eyebrow}
        </h2>
      ) : (
        <motion.h2
          className="text-sm text-primary text-balance font-mono font-semibold tracking-wider uppercase"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealBlurUp}
          transition={transition(0.6)}
          style={{ willChange: "opacity, transform, filter" }}
        >
          {eyebrow}
        </motion.h2>
      )}

      {reduce ? (
        <h3 className="mx-0 mt-4 max-w-lg text-5xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tighter text-foreground lowercase">
          {title}
        </h3>
      ) : (
        <motion.h3
          className="mx-0 mt-4 max-w-lg text-5xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tighter text-foreground lowercase"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealBlurUp}
          transition={transition(0.6, 0.05)}
          style={{ willChange: "opacity, transform, filter" }}
        >
          {title}
        </motion.h3>
      )}
    </div>
  )
}

function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/web-logo.svg"
      alt=""
      aria-hidden="true"
      className={cn("w-auto", className)}
      width={24}
      height={24}
      draggable={false}
    />
  )
}

function Header() {
  const reduce = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const lastYRef = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const last = lastYRef.current
    lastYRef.current = latest

    setScrolled(latest > 2)
    if (reduce) return

    // Hide on scroll down, show on scroll up.
    const delta = latest - last
    if (latest < 10) {
      setHidden(false)
      return
    }
    if (delta > 6 && latest > 80) setHidden(true)
    if (delta < -6) setHidden(false)
  })

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 p-0 bg-background/60 backdrop-blur",
        scrolled ? "border-b border-border/40" : "border-b border-transparent"
      )}
      initial={false}
      animate={reduce ? { y: 0 } : { y: hidden ? "-110%" : "0%" }}
      transition={reduce ? undefined : { duration: 0.35, ease: EASE_OUT }}
    >
      <div className="flex justify-between items-center container mx-auto p-2">
        <Link
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
          href="/"
        >
          <BrandMark />
          <span className="font-bold text-xl">{calAI.name}</span>
        </Link>
        <div className="hidden lg:block">
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 px-4 py-2 h-8 text-white rounded-full group"
            href="#"
          >
            {calAI.cta}
          </a>
        </div>

        <div className="mt-2 cursor-pointer block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-2xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <div className="flex items-center gap-2">
                <BrandMark />
                <span className="font-bold text-xl">{calAI.name}</span>
              </div>
              <nav className="mt-6 flex flex-col gap-3 text-sm font-medium">
                <a href="#features" className="hover:underline underline-offset-4">
                  Features
                </a>
                <a href="#pricing" className="hover:underline underline-offset-4">
                  Pricing
                </a>
                <a href="#faq" className="hover:underline underline-offset-4">
                  FAQ
                </a>
              </nav>
              <div className="mt-8">
                <a
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 px-4 py-2 h-10 text-white rounded-full group w-full"
                  href="#"
                >
                  {calAI.cta}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <motion.hr
        className="absolute w-full bottom-0"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        style={{ willChange: "opacity" }}
      />
    </motion.header>
  )
}

function HeroPhone({
  src,
  offsetY,
  introX,
  introY,
  opacity,
  alignT,
  reduce,
}: {
  src: string
  offsetY: number
  introX: MotionValue<number>
  introY: MotionValue<number>
  opacity: MotionValue<number>
  alignT: MotionValue<number>
  reduce: boolean
}) {
  // Middle phone has offsetY=0, so it stays fixed vertically; others rise to align.
  const y = useTransform(alignT, (t) => offsetY * (1 - t))

  return (
    <motion.div
      className="flex-shrink-0"
      style={{ y: reduce ? 0 : y, willChange: "transform" }}
    >
      <motion.img
        src={src}
        alt="iPhone"
        className="w-40 sm:w-64 h-[333px] sm:h-[500px] flex-shrink-0"
        style={{
          opacity,
          x: reduce ? 0 : introX,
          y: reduce ? 0 : introY,
          willChange: "opacity, transform",
        }}
        draggable={false}
      />
    </motion.div>
  )
}

function Hero() {
  const reduce = useReducedMotion() ?? false
  const heroRef = React.useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const intro = useHeroIntro()

  const alignT = useSpring(useTransform(scrollYProgress, [0, 0.28], [0, 1]), {
    stiffness: 80,
    damping: 30,
  })

  const nameFilter = useTransform(intro.nameBlur, (v) => `blur(${v}px)`)
  const headlineFilter = useTransform(intro.headlineBlur, (v) => `blur(${v}px)`)
  const subFilter = useTransform(intro.subBlur, (v) => `blur(${v}px)`)
  const ctaFilter = useTransform(intro.ctaBlur, (v) => `blur(${v}px)`)

  const phoneOffsets = React.useMemo(
    () => [
      { y: 100, src: "/Device-1.png" },
      { y: 50, src: "/Device-2.png" },
      { y: 0, src: "/Device-3.png" },
      { y: 50, src: "/Device-4.png" },
      { y: 100, src: "/Device-5.png" },
    ],
    []
  )

  // Baseline "down" offset. Keep small enough that phones never clip at the viewport bottom.
  return (
    <section id="hero" ref={heroRef}>
      <div className="h-[100svh] w-full overflow-visible">
        <main className="relative mx-auto h-full px-4 pt-24 sm:pt-28 md:pt-32 flex flex-col items-center text-center">
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <motion.div
              className="relative z-10"
              style={{
                scale: reduce ? 1 : intro.iconScale,
                y: reduce ? 0 : intro.iconY,
                transformOrigin: "center",
                willChange: "transform",
              }}
            >
              <div className="bg-primary text-white text-xl font-bold p-4 h-20 w-20 flex items-center justify-center rounded-3xl mx-auto shadow-md">
                <BrandMark className="h-[40px]" />
              </div>
            </motion.div>

            <motion.div
              className="mt-3 text-sm font-medium text-foreground/80"
              style={{
                opacity: intro.nameOpacity,
                y: intro.nameY,
                filter: nameFilter,
                willChange: "transform, opacity, filter",
              }}
            >
              {calAI.name}
            </motion.div>

            <div className="max-w-5xl mx-auto mt-10">
              <motion.h1
                className="text-5xl font-bold mb-4 tracking-tighter"
                style={{
                  opacity: intro.headlineOpacity,
                  y: intro.headlineY,
                  filter: headlineFilter,
                  willChange: "opacity, transform, filter",
                }}
              >
                Smart shopping powered by AI.
              </motion.h1>
              <motion.p
                className="max-w-2xl mx-auto text-xl mb-8 font-medium text-balance"
                style={{
                  opacity: intro.subOpacity,
                  y: intro.subY,
                  filter: subFilter,
                  willChange: "opacity, transform, filter",
                }}
              >
                {calAI.name} transforms your speech into text instantly. Perfect for
                quick note-taking, content creation, and capturing ideas on-the-go.
              </motion.p>
              <motion.div
                className="flex justify-center mb-10"
                style={{
                  opacity: intro.ctaOpacity,
                  y: intro.ctaY,
                  filter: ctaFilter,
                  willChange: "opacity, transform, filter",
                }}
              >
                <img
                  src="/download-black.svg"
                  alt="Download"
                  className="w-40 flex-shrink-0 dark:hidden block"
                  draggable={false}
                />
                <img
                  src="/download-white.svg"
                  alt="Download"
                  className="w-40 flex-shrink-0 hidden dark:block"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-[-160px] sm:bottom-[-280px] select-none pointer-events-none z-0">
            <div className="flex flex-nowrap items-end justify-center gap-4 sm:gap-8">
              {phoneOffsets.map((d, idx) => {
                return (
                  <HeroPhone
                    key={d.src}
                    src={d.src}
                    offsetY={d.y}
                    introX={intro.phonesX[idx]}
                    introY={intro.phonesY[idx]}
                    opacity={intro.phonesOpacity[idx]}
                    alignT={alignT}
                    reduce={reduce}
                  />
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

function BentoCard({
  reduce,
  title,
  content,
  imageSrc,
  imageAlt,
  fullWidth,
  viewportAmount,
  delay,
  direction,
}: {
  reduce: boolean
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  fullWidth: boolean
  viewportAmount: number
  delay: number
  direction: 1 | -1
}) {
  return (
    <motion.div
      className={cn(
        "bg-muted p-4 sm:p-6 !pb-0 rounded-3xl grid grid-rows-1",
        fullWidth && "md:col-span-2"
      )}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: false, amount: viewportAmount }}
      variants={revealBlurByScrollDir}
      custom={direction}
      transition={transition(0.9, delay)}
      style={{ willChange: "opacity, transform, filter" }}
    >
      <div className="flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-foreground mb-4">
          {content}
        </p>
      </div>
      <div className={cn("flex justify-center", fullWidth && "sm:space-x-4")}>
        <img
          alt={imageAlt}
          className="w-full h-64 sm:h-96 rounded-xl object-cover object-top"
          src={imageSrc}
          draggable={false}
        />
      </div>
    </motion.div>
  )
}

function FeatureScroll() {
  const reduce = useReducedMotion() ?? false
  const padLeft = 90

  return (
    <section id="feature-scroll">
      <div className="py-12 sm:py-20 pt-[200px] sm:pt-[320px] lg:pt-[360px] pb-16 sm:pb-24 container px-4 sm:px-10 mx-auto max-w-[var(--max-container-width)]">
        <SectionHeading eyebrow="Experience" title="An app unlike any other" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-auto select-none">
          <div className="flex justify-center" style={{ paddingTop: padLeft }}>
            <img
              src="/Device-6.png"
              alt="iPhone 1"
              className="w-full h-auto -z-10 max-w-[250px] sm:max-w-[300px]"
              draggable={false}
            />
          </div>

          <motion.div
            className="flex justify-center"
            initial={reduce ? false : { paddingTop: 130 }}
            whileInView={reduce ? undefined : { paddingTop: padLeft }}
            viewport={{ once: false, amount: 0.35 }}
            transition={reduce ? undefined : { duration: 1.05, ease: EASE_OUT }}
            style={{
              paddingTop: reduce ? padLeft : undefined,
              willChange: "padding-top",
            }}
          >
            <img
              src="/Device-7.png"
              alt="iPhone 2"
              className="w-full h-auto -z-10 max-w-[250px] sm:max-w-[300px]"
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={reduce ? false : { paddingTop: 170 }}
            whileInView={reduce ? undefined : { paddingTop: padLeft }}
            viewport={{ once: false, amount: 0.62 }}
            transition={reduce ? undefined : { duration: 1.05, ease: EASE_OUT }}
            style={{
              paddingTop: reduce ? padLeft : undefined,
              willChange: "padding-top",
            }}
          >
            <img
              src="/Device-8.png"
              alt="iPhone 3"
              className="w-full h-auto -z-10 max-w-[250px] sm:max-w-[300px]"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeatureHighlight() {
  const reduce = useReducedMotion() ?? false
  return (
    <section id="feature-highlight">
      <div className="sm:py-20 py-12 container px-10 mx-auto max-w-[var(--max-container-width)]">
        <SectionHeading eyebrow="Features" title="Powerful features" />

        {calAI.featureHighlight.map((f) => {
          const isRTL = f.direction === "rtl"
          return (
            <div
              key={f.title}
              className={cn(
                "flex flex-col items-center justify-between pb-10 transition-all duration-500 ease-out",
                isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              <motion.div
                className={cn(
                  "w-full lg:w-1/2 mb-10 lg:mb-0",
                  isRTL ? "lg:pl-8" : "lg:pr-8"
                )}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: isRTL ? 20 : -20 }
                }
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                style={{ willChange: "opacity, transform" }}
              >
                <div className="flex flex-col gap-4 max-w-sm text-center lg:text-left mx-auto">
                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, x: isRTL ? 10 : -10 }
                    }
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
                    style={{ willChange: "opacity, transform" }}
                  >
                    {f.title}
                  </motion.h2>
                  <motion.p
                    className="text-xl md:text-2xl"
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, x: isRTL ? 10 : -10 }
                    }
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                    style={{ willChange: "opacity, transform" }}
                  >
                    {f.description}
                  </motion.p>
                  <motion.div
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, x: isRTL ? 10 : -10 }
                    }
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
                    style={{ willChange: "opacity, transform" }}
                  >
                    <a
                      className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-11 px-8 text-white rounded-full group text-lg mx-auto lg:mx-0"
                      href="#"
                    >
                      {calAI.cta}
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2">
                <img
                  src={f.imageSrc}
                  alt={f.title}
                  className="w-full max-w-[300px] mx-auto"
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Bento() {
  const reduce = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const directionRef = React.useRef<1 | -1>(1)
  const lastYRef = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const last = lastYRef.current
    lastYRef.current = latest

    const delta = latest - last
    if (Math.abs(delta) < 1) return
    const nextDir: 1 | -1 = delta > 0 ? 1 : -1
    if (nextDir !== directionRef.current) {
      directionRef.current = nextDir
      setDirection(nextDir)
    }
  })

  return (
    <section id="bento">
      <div className="sm:py-20 py-12 mx-auto max-w-screen-md px-10">
        <SectionHeading eyebrow="Benefits" title="It does a lot of things" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calAI.bento.map((b, idx) => {
            // Bento order: 0=full-width, 1=Smart Time Blocking, 2=Intelligent Reminders, 3=full-width.
            // We intentionally invert the reveal order when scrolling up:
            // down: Smart Time Blocking -> Intelligent Reminders
            // up:   Intelligent Reminders -> Smart Time Blocking
            const isDown = direction === 1
            const viewportAmount =
              idx === 1 ? (isDown ? 0.25 : 0.52) : idx === 2 ? (isDown ? 0.52 : 0.25) : 0.35
            const delay =
              idx === 1 ? (isDown ? 0.02 : 0.12) : idx === 2 ? (isDown ? 0.12 : 0.02) : 0
            return (
              <BentoCard
                key={b.title}
                reduce={reduce}
                title={b.title}
                content={b.content}
                imageSrc={b.imageSrc}
                imageAlt={b.imageAlt}
                fullWidth={b.fullWidth}
                viewportAmount={viewportAmount}
                delay={delay}
                direction={direction}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const targetEl: HTMLDivElement = el

    function onWheel(e: WheelEvent) {
      // Allow vertical page scrolling even when hovering the horizontal carousel.
      // Some browsers (notably Safari) will "steal" vertical wheel/trackpad deltas
      // to scroll overflow-x containers, which makes the page feel stuck.
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      const horizontalIntent = e.shiftKey || absX > absY
      if (horizontalIntent) {
        // Mouse shift+wheel often reports horizontal intent via deltaY.
        if (e.shiftKey && absX < 1 && absY > 0) {
          e.preventDefault()
          targetEl.scrollLeft += e.deltaY
        }
        return
      }

      if (absY > 0) {
        e.preventDefault()
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" })
      }
    }

    targetEl.addEventListener("wheel", onWheel, { passive: false })
    return () => targetEl.removeEventListener("wheel", onWheel)
  }, [])

  function scrollByDir(dir: "prev" | "next") {
    const el = scrollerRef.current
    if (!el) return
    const slides = Array.from(
      el.querySelectorAll<HTMLElement>("[data-benefit-slide]")
    )
    if (!slides.length) return

    const elCenter = el.scrollLeft + el.clientWidth / 2
    let currentIdx = 0
    let best = Number.POSITIVE_INFINITY
    for (let i = 0; i < slides.length; i += 1) {
      const c = slides[i].offsetLeft + slides[i].offsetWidth / 2
      const d = Math.abs(c - elCenter)
      if (d < best) {
        best = d
        currentIdx = i
      }
    }

    const nextIdx =
      dir === "next"
        ? Math.min(slides.length - 1, currentIdx + 1)
        : Math.max(0, currentIdx - 1)

    const next = slides[nextIdx]
    const nextCenter = next.offsetLeft + next.offsetWidth / 2
    const targetLeft = Math.max(0, Math.round(nextCenter - el.clientWidth / 2))
    el.scrollTo({ left: targetLeft, behavior: "smooth" })
  }

  return (
    <section id="benefits">
      <div className="sm:py-20 py-12 bg-muted relative max-w-screen">
        <SectionHeading eyebrow="Benefits" title="What you can do with Cal AI" />

        <div
          ref={scrollerRef}
          className="flex overflow-x-auto overflow-y-hidden overscroll-y-none snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            aria-hidden="true"
            className="hidden md:block flex-shrink-0 w-[calc(90%-1rem)] md:w-1/3 lg:w-1/3 xl:w-1/4 snap-start select-none px-4"
          />

          {calAI.benefits.map((b, idx) => (
            <div
              key={b.id}
              data-benefit-slide
              className="flex-shrink-0 w-[calc(90%-1rem)] md:w-1/3 lg:w-1/3 xl:w-1/4 snap-center md:snap-start select-none px-4"
            >
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={revealBlurUp}
                transition={transition(0.7, idx * 0.06)}
                style={{ willChange: "opacity, transform, filter" }}
              >
                <div className="h-[500px] relative rounded-xl overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.text}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out object-[0px_10px] hover:object-top"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-muted to-transparent pointer-events-none" />
                </div>
                <div className="mt-4">
                  <h2 className="text-balance text-xl tracking-tight font-semibold leading-[1.25] text-left text-foreground/80 dark:text-foreground/90">
                    {b.text}
                  </h2>
                </div>
              </motion.div>
            </div>
          ))}

          <div
            aria-hidden="true"
            className="hidden md:block flex-shrink-0 w-1/3 lg:w-1/3 xl:w-1/4 snap-start"
          />
        </div>

        <div className="flex justify-center md:justify-end mt-4 md:mt-8 md:pr-32">
          <div className="flex gap-4">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8 rounded-full"
              onClick={() => scrollByDir("prev")}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8 rounded-full"
              onClick={() => scrollByDir("next")}
              type="button"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  const reduce = useReducedMotion()
  return (
    <section id="features">
      <div className="sm:py-20 py-12 max-w-screen-lg mx-auto container px-10">
        <SectionHeading eyebrow="Features" title="Powerful features" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calAI.features.map((f, idx) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.name}
                className="rounded-lg overflow-hidden bg-card p-6 flex flex-col items-center text-center"
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.35 }}
                variants={revealBlurUp}
                transition={transition(0.7, idx * 0.04)}
                style={{ willChange: "opacity, transform, filter" }}
              >
                <div className="flex flex-col items-center gap-y-4 mb-4">
                  <div className="bg-gradient-to-b from-primary to-primary/80 p-2 rounded-lg text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    {f.name}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {f.description}
                </p>
                <a className="text-sm text-primary hover:underline" href="#">
                  Learn more &gt;
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reduce = useReducedMotion()
  return (
    <section id="testimonials">
      <div className="sm:py-20 py-12 container px-10 mx-auto">
        <SectionHeading eyebrow="Testimonials" title="What our users say" />

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 py-10">
          {calAI.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              className="bg-muted/60 overflow-hidden rounded-3xl flex flex-col h-fit"
              style={{ gridRow: "span 2" }}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.4 }}
              variants={revealBlurUp}
              transition={transition(0.7, idx * 0.04)}
            >
              <div className="px-4 py-5 sm:p-6 flex-grow">
                <div className="flex items-center mb-4">
                  <img
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    src={t.image}
                    draggable={false}
                  />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-foreground">
                      {t.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: t.text }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const reduce = useReducedMotion()
  return (
    <section id="pricing">
      <div className="sm:py-20 py-12 container px-10 mx-auto max-w-[var(--max-container-width)]">
        <SectionHeading eyebrow="Pricing" title="simple pricing" />

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto py-10">
          {calAI.pricing.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className="bg-muted/60 p-6 rounded-3xl grid grid-rows-[auto_auto_1fr_auto]"
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.3 }}
              variants={revealBlurUp}
              transition={transition(0.7, idx * 0.04)}
              style={{ willChange: "opacity, transform, filter" }}
            >
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <div className="text-4xl font-bold text-primary mb-2">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  / {plan.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {plan.description}
              </p>
              <div className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-primary" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 px-3 rounded-full text-white">
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq">
      <div className="sm:py-20 py-12 container px-10 mx-auto max-w-[var(--max-container-width)]">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto py-10"
        >
          {calAI.faqs.map((f, idx) => (
            <AccordionPrimitive.Item
              key={f.question}
              value={`item-${idx}`}
              className="border-b"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 text-left hover:no-underline">
                  {f.question}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-4 text-muted-foreground">{f.answer}</div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}

function MarqueeRow({
  cards,
  reverse,
}: {
  cards: { name: string; handle: string; avatar: string; quote: string }[]
  reverse?: boolean
}) {
  return (
    <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:20s]">
      {Array.from({ length: 3 }).map((_, cloneIdx) => (
        <div
          key={cloneIdx}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {cards.map((c) => (
            <figure
              key={`${cloneIdx}-${c.handle}`}
              className="relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="rounded-full"
                  width="32"
                  height="32"
                  alt=""
                  src={c.avatar}
                  draggable={false}
                />
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {c.name}
                  </figcaption>
                  <p className="text-xs font-medium dark:text-white/40">
                    {c.handle}
                  </p>
                </div>
              </div>
              <blockquote className="mt-2 text-sm">{c.quote}</blockquote>
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}

function Cta() {
  const rows = [
    { cards: calAI.ctaMarqueeA, reverse: false },
    { cards: calAI.ctaMarqueeB, reverse: true },
    { cards: calAI.ctaMarqueeA, reverse: false },
    { cards: calAI.ctaMarqueeB, reverse: true },
    { cards: calAI.ctaMarqueeA, reverse: false },
    { cards: calAI.ctaMarqueeB, reverse: true },
  ]

  return (
    <section id="cta">
      <div className="py-14">
        <div className="container flex w-full flex-col items-center justify-center p-4 mx-auto max-w-[var(--max-container-width)]">
          <div className="relative flex w-full max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
            <div className="absolute rotate-[35deg]">
              {rows.map((r, idx) => (
                <MarqueeRow
                  key={idx}
                  cards={r.cards}
                  reverse={r.reverse}
                />
              ))}
            </div>

            <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
              <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Stop wasting time on design.
              </h1>
              <p className="mt-2">
                Start your 7-day free trial. No credit card required.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 group mt-4 rounded-[2rem] px-6"
              >
                {calAI.cta}
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10 container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <BrandMark className="h-5 w-5" />
          <h2 className="text-lg font-bold text-foreground">{calAI.name}</h2>
        </div>
        <div className="flex gap-x-2">
          <a
            href="#"
            className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            aria-label="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            aria-label="Instagram"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.9091 12.909C13.2365 12.5817 13.4918 12.1895 13.6588 11.7577C13.8195 11.3443 13.9294 10.8718 13.961 10.1799C13.9926 9.48665 14.0001 9.26529 14.0001 7.50001C14.0001 5.73473 13.9926 5.51328 13.961 4.82008C13.9294 4.12821 13.8195 3.65573 13.6588 3.24228C13.4956 2.80857 13.2398 2.41567 12.9091 2.091C12.5844 1.76028 12.1915 1.50437 11.7578 1.34113C11.3443 1.18056 10.8718 1.0707 10.1799 1.03924C9.48675 1.00748 9.26537 1 7.50006 1C5.73476 1 5.51333 1.00748 4.82014 1.03912C4.12826 1.0707 3.65578 1.18056 3.24233 1.34125C2.80862 1.50447 2.41573 1.76032 2.09105 2.09098C1.76032 2.41563 1.5044 2.80852 1.34113 3.24225C1.18056 3.65573 1.0707 4.12821 1.03924 4.82008C1.00748 5.51328 1 5.73471 1 7.50001C1 9.26532 1.00748 9.48675 1.03924 10.1799C1.07083 10.8718 1.18069 11.3443 1.34138 11.7577C1.5046 12.1915 1.76045 12.5843 2.09111 12.909C2.41578 13.2397 2.80867 13.4955 3.24238 13.6587C3.65586 13.8194 4.12834 13.9293 4.82019 13.9609C5.51348 13.9925 5.73483 14 7.50012 14C9.2654 14 9.48685 13.9925 10.18 13.9609C10.8719 13.9293 11.3444 13.8194 11.7578 13.6587C12.1896 13.4917 12.5818 13.2364 12.9091 12.909ZM1.99949 6.73496C1.99974 6.94524 2.00005 7.19543 2.00005 7.50002C2.00005 7.80461 1.99974 8.0548 1.99949 8.26507C1.99849 9.08596 1.99824 9.29856 2.01963 9.7655C2.04625 10.3509 2.07823 10.7811 2.17588 11.1053C2.26976 11.417 2.37505 11.7342 2.7188 12.1171C3.06255 12.4999 3.39411 12.6733 3.81645 12.8007C4.23879 12.928 4.7696 12.9554 5.23052 12.9764C5.75332 13.0003 5.96052 13.0002 7.05714 12.9999L7.50006 12.9999C7.79304 12.9999 8.03569 13.0001 8.2409 13.0004C9.08195 13.0013 9.29425 13.0015 9.76575 12.9799C10.3512 12.9533 10.7814 12.9213 11.1056 12.8237C11.4173 12.7298 11.7345 12.6245 12.1173 12.2807C12.5001 11.937 12.6735 11.6054 12.8009 11.1831C12.9283 10.7607 12.9557 10.2299 12.9767 9.76902C13.0005 9.24689 13.0004 9.04027 13.0002 7.94749V7.94738L13.0001 7.50039L13.0001 7.05747C13.0004 5.96085 13.0005 5.75365 12.9766 5.23085C12.9556 4.76993 12.9282 4.23912 12.8009 3.81678C12.6735 3.39445 12.5001 3.06288 12.1173 2.71913C11.7345 2.37538 11.4172 2.27009 11.1056 2.17621C10.7813 2.07856 10.3511 2.04658 9.76571 2.01996C9.29421 1.99836 9.08194 1.99859 8.24092 1.99951H8.24092C8.0357 1.99974 7.79305 2.00001 7.50006 2.00001L7.05704 1.99993C5.96051 1.99964 5.75331 1.99958 5.23052 2.02343C4.7696 2.04446 4.23879 2.07183 3.81645 2.19921C3.39411 2.32659 3.06255 2.49999 2.7188 2.88281C2.37505 3.26562 2.26976 3.58286 2.17588 3.89453C2.07823 4.21874 2.04625 4.64894 2.01963 5.23437C1.99824 5.70131 1.99849 5.91401 1.99949 6.73496ZM7.49996 5.25015C6.25741 5.25015 5.25012 6.25744 5.25012 7.49999C5.25012 8.74254 6.25741 9.74983 7.49996 9.74983C8.74251 9.74983 9.7498 8.74254 9.7498 7.49999C9.7498 6.25744 8.74251 5.25015 7.49996 5.25015ZM4.25012 7.49999C4.25012 5.70515 5.70512 4.25015 7.49996 4.25015C9.2948 4.25015 10.7498 5.70515 10.7498 7.49999C10.7498 9.29483 9.2948 10.7498 7.49996 10.7498C5.70512 10.7498 4.25012 9.29483 4.25012 7.49999ZM10.9697 4.7803C11.3839 4.7803 11.7197 4.44452 11.7197 4.0303C11.7197 3.61609 11.3839 3.2803 10.9697 3.2803C10.5555 3.2803 10.2197 3.61609 10.2197 4.0303C10.2197 4.44452 10.5555 4.7803 10.9697 4.7803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            aria-label="Twitter"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.23336 4.69629C7.23336 2.96884 8.63335 1.56857 10.36 1.56857C11.3736 1.56857 12.183 2.04804 12.7254 2.74385C13.3079 2.62467 13.8557 2.40913 14.3513 2.11508C14.1559 2.72598 13.7424 3.2396 13.2033 3.56463C13.2038 3.56568 13.2042 3.56674 13.2047 3.56779C13.7334 3.50361 14.2364 3.36302 14.7048 3.15546L14.7037 3.15715C14.3667 3.66183 13.9431 4.10736 13.4561 4.47034C13.4823 4.64672 13.4956 4.82427 13.4956 5.00079C13.4956 8.6871 10.6873 12.9746 5.52122 12.9746C3.93906 12.9746 2.46544 12.511 1.22505 11.7152C0.992632 11.5661 0.925108 11.2568 1.07423 11.0244C1.0874 11.0038 1.10183 10.9846 1.11734 10.9666C1.20582 10.8202 1.37438 10.7309 1.5554 10.7522C2.47066 10.8601 3.38568 10.7485 4.19219 10.3962C3.39226 10.0434 2.77129 9.35975 2.50204 8.51974C2.45359 8.3686 2.48835 8.20311 2.59351 8.08422C2.59716 8.0801 2.60087 8.07606 2.60464 8.0721C1.96391 7.50819 1.55973 6.68208 1.55973 5.76143V5.72759C1.55973 5.56814 1.64411 5.42059 1.78155 5.33974C1.82671 5.31317 1.87537 5.29511 1.92532 5.28558C1.70549 4.86154 1.58116 4.37984 1.58116 3.86958C1.58116 3.40165 1.58384 2.81192 1.91332 2.28081C1.98718 2.16175 2.10758 2.08915 2.2364 2.07195C2.42588 2.01237 2.64087 2.06969 2.77406 2.23302C3.86536 3.57126 5.44066 4.49583 7.23366 4.73961L7.23336 4.69629ZM5.52122 11.9746C4.73387 11.9746 3.97781 11.8435 3.27248 11.6023C4.13012 11.4538 4.95307 11.1159 5.66218 10.5602C5.81211 10.4427 5.87182 10.2435 5.81126 10.0629C5.7507 9.88234 5.583 9.75943 5.39255 9.75607C4.68968 9.74366 4.06712 9.39716 3.67793 8.86845C3.86828 8.85306 4.05428 8.82039 4.23445 8.77167C4.43603 8.71716 4.57363 8.53114 4.56674 8.32243C4.55985 8.11372 4.41029 7.93718 4.20555 7.89607C3.42694 7.73977 2.79883 7.16764 2.56169 6.42174C2.76255 6.47025 2.97102 6.4991 3.18482 6.5061C3.38563 6.51267 3.56646 6.38533 3.62795 6.19405C3.68943 6.00277 3.61666 5.79391 3.44963 5.68224C2.86523 5.29155 2.48116 4.62464 2.48116 3.86958C2.48116 3.70213 2.48352 3.55268 2.49355 3.41719C3.85115 4.79913 5.70873 5.68931 7.77588 5.79338C7.93225 5.80126 8.08328 5.73543 8.18395 5.61553C8.28463 5.49562 8.32332 5.33548 8.28851 5.18284C8.25255 5.02517 8.23336 4.86284 8.23336 4.69629C8.23336 3.52085 9.18591 2.56857 10.36 2.56857C11.5943 2.56857 12.4956 3.71208 12.4956 5.00079C12.4956 8.25709 10.0202 11.9746 5.52122 11.9746Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          <li className="text-[15px]/normal font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4">
            <a href="#">Pricing</a>
          </li>
          <li className="text-[15px]/normal font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4">
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-muted-foreground">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureScroll />
      <FeatureHighlight />
      <Bento />
      <Benefits />
      <FeaturesGrid />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}
