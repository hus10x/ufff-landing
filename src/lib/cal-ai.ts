import type { LucideIcon } from "lucide-react"
import {
  Bell,
  Brain,
  Calendar,
  Clock,
  Cloud,
  Users,
} from "lucide-react"

export type Feature = {
  name: string
  description: string
  icon: LucideIcon
}

export type FeatureHighlight = {
  title: string
  description: string
  imageSrc: string
  direction: "ltr" | "rtl"
}

export type BentoItem = {
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  fullWidth: boolean
}

export type BenefitItem = {
  id: number
  text: string
  image: string
}

export type PricingPlan = {
  name: string
  href: string
  price: string
  period: string
  yearlyPrice: string
  features: string[]
  description: string
  buttonText: string
  isPopular: boolean
}

export type FaqItem = {
  question: string
  answer: string
}

export type Testimonial = {
  id: number
  text: string
  name: string
  role: string
  image: string
}

export type MarqueeCard = {
  name: string
  handle: string
  avatar: string
  quote: string
}

export const calAI = {
  name: "UFFF AI",
  description: "Smart shopping powered by AI.",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["AI Calendar", "Smart Shopping", "Productivity", "Time Management"],
  links: {
    email: "support@calai.app",
    twitter: "https://twitter.com/calaiapp",
    discord: "https://discord.gg/calaiapp",
    github: "https://github.com/calaiapp",
    instagram: "https://instagram.com/calaiapp",
  },
  features: [
    {
      name: "AI-Powered Shopping",
      description: "Intelligent shopping that learns your preferences and optimizes your time.",
      icon: Brain,
    },
    {
      name: "Smart Time Blocking",
      description: "Automatically block time for focused work and personal activities.",
      icon: Clock,
    },
    {
      name: "Predictive Event Planning",
      description: "AI suggests optimal times for meetings and events based on your habits.",
      icon: Calendar,
    },
    {
      name: "Cloud Sync",
      description: "Access your schedule across all devices in real-time.",
      icon: Cloud,
    },
    {
      name: "Team Collaboration",
      description: "Easily coordinate schedules with team members and clients.",
      icon: Users,
    },
    {
      name: "Smart Reminders",
      description: "Contextual notifications that adapt to your schedule and priorities.",
      icon: Bell,
    },
  ] satisfies Feature[],
  featureHighlight: [
    {
      title: "AI-Powered Shopping",
      description: "Intelligent shopping that learns your preferences and optimizes your time.",
      imageSrc: "/Device-2.png",
      direction: "rtl",
    },
    {
      title: "Smart Time Blocking",
      description: "Automatically block time for focused work and personal activities.",
      imageSrc: "/Device-3.png",
      direction: "ltr",
    },
    {
      title: "Predictive Event Planning",
      description: "AI suggests optimal times for meetings and events based on your habits.",
      imageSrc: "/Device-4.png",
      direction: "rtl",
    },
  ] satisfies FeatureHighlight[],
  bento: [
    {
      title: "AI-Powered Shopping",
      content:
        "Our app uses advanced AI to optimize your calendar, suggesting the best times for meetings and tasks based on your preferences and habits.",
      imageSrc: "/Device-1.png",
      imageAlt: "AI shopping illustration",
      fullWidth: true,
    },
    {
      title: "Smart Time Blocking",
      content:
        "Automatically block out time for focused work, breaks, and personal activities to maintain a balanced and productive schedule.",
      imageSrc: "/Device-2.png",
      imageAlt: "Time blocking illustration",
      fullWidth: false,
    },
    {
      title: "Intelligent Reminders",
      content:
        "Receive context-aware notifications that adapt to your schedule, ensuring you never miss important events or deadlines.",
      imageSrc: "/Device-3.png",
      imageAlt: "Smart reminders illustration",
      fullWidth: false,
    },
    {
      title: "Team Collaboration",
      content:
        "Effortlessly coordinate schedules with team members and clients, finding optimal meeting times across different time zones.",
      imageSrc: "/Device-4.png",
      imageAlt: "Team collaboration illustration",
      fullWidth: true,
    },
  ] satisfies BentoItem[],
  benefits: [
    { id: 1, text: "Save hours each week with AI-optimized shopping.", image: "/Device-6.png" },
    { id: 2, text: "Reduce shopping conflicts and double-bookings.", image: "/Device-7.png" },
    { id: 3, text: "Improve work-life balance with smart time allocation.", image: "/Device-8.png" },
    { id: 4, text: "Increase productivity with AI-driven time management insights.", image: "/Device-1.png" },
  ] satisfies BenefitItem[],
  pricing: [
    {
      name: "Basic",
      href: "#",
      price: "$0",
      period: "month",
      yearlyPrice: "$0",
      features: [
        "AI-powered shopping (up to 10 events/month)",
        "Basic time blocking",
        "Cloud sync for 1 device",
        "Email reminders",
      ],
      description: "Perfect for individual users",
      buttonText: "Start Free",
      isPopular: false,
    },
    {
      name: "Pro",
      href: "#",
      price: "$12",
      period: "month",
      yearlyPrice: "$120",
      features: [
        "Unlimited AI-powered shopping",
        "Advanced time blocking and analysis",
        "Cloud sync for unlimited devices",
        "Smart notifications across all devices",
        "Team collaboration features",
      ],
      description: "Ideal for professionals and small teams",
      buttonText: "Upgrade to Pro",
      isPopular: true,
    },
  ] satisfies PricingPlan[],
  faqs: [
    {
      question: "How does AI improve my shopping?",
      answer:
        "Our AI analyzes your shopping patterns, preferences, and productivity data to suggest optimal times for tasks and meetings. It learns from your behavior to continuously improve its recommendations.",
    },
    {
      question: "Can I integrate UFFF AI with other apps?",
      answer:
        "Yes, UFFF AI integrates with popular productivity tools and calendar apps. You can sync with Google Calendar, Outlook, and more to centralize your shopping.",
    },
    {
      question: "How does the team collaboration feature work?",
      answer:
        "Team collaboration allows you to share availability, schedule group meetings, and coordinate tasks. The AI considers everyone's schedules to find the best times for team activities.",
    },
    {
      question: "Is my data secure with UFFF AI?",
      answer:
        "We take data security seriously. All your calendar data is encrypted end-to-end and stored securely in the cloud. We never share your personal information or shopping data with third parties.",
    },
    {
      question: "Can I use UFFF AI offline?",
      answer:
        "While full functionality requires an internet connection, you can view your schedule and add events offline. The app will sync and apply AI optimizations when you're back online.",
    },
  ] satisfies FaqItem[],
  testimonials: [
    {
      id: 1,
      text: "UFFF AI has revolutionized how I manage my time. It&apos;s like having a personal assistant.",
      name: "Alice Johnson",
      role: "Freelance Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "The AI-powered shopping has significantly reduced conflicts in our team&apos;s calendar.",
      name: "Bob Brown",
      role: "Project Manager, Tech Innovations",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "The smart time blocking feature has helped me maintain a better work-life balance.",
      name: "Charlie Davis",
      role: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "UFFF AI's predictive planning has made my workweek so much more efficient.",
      name: "Diana Evans",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "The team collaboration features have streamlined our project management process.",
      name: "Ethan Ford",
      role: "Software Team Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "UFFF AI has helped me balance my work and personal commitments effortlessly.",
      name: "Fiona Grant",
      role: "HR Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "The AI-driven insights have helped me optimize my daily routines significantly.",
      name: "George Harris",
      role: "Productivity Coach",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "UFFF AI's integration with my other tools has created a seamless workflow.",
      name: "Hannah Irving",
      role: "Digital Nomad",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 9,
      text: "The smart reminders have drastically reduced my missed appointments.",
      name: "Ian Johnson",
      role: "Sales Executive",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 10,
      text: "UFFF AI's ability to learn my preferences has made shopping a breeze.",
      name: "Julia Kim",
      role: "Researcher",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 11,
      text: "The AI-suggested meeting times have improved our team's productivity.",
      name: "Kevin Lee",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 12,
      text: "UFFF AI's travel time estimations have made my commute planning much easier.",
      name: "Laura Martinez",
      role: "Urban Planner",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 13,
      text: "The AI-powered task prioritization has helped me focus on what's truly important.",
      name: "Michael Nelson",
      role: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 14,
      text: "UFFF AI's habit tracking feature has helped me build better routines.",
      name: "Natalie Owens",
      role: "Personal Trainer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 15,
      text: "The AI suggestions for breaks have improved my work-from-home productivity.",
      name: "Oscar Parker",
      role: "Remote Worker",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 16,
      text: "UFFF AI's integration with my smart home devices has streamlined my mornings.",
      name: "Patricia Quinn",
      role: "Tech Enthusiast",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 17,
      text: "The AI-driven energy level tracking has helped me schedule tasks more effectively.",
      name: "Quincy Roberts",
      role: "Productivity Consultant",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 18,
      text: "UFFF AI's goal-setting features have kept me accountable and on track.",
      name: "Rachel Stevens",
      role: "Life Coach",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 19,
      text: "The AI-suggested focus times have dramatically improved my deep work sessions.",
      name: "Samuel Thompson",
      role: "Writer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 20,
      text: "UFFF AI's team availability feature has made cross-timezone shopping effortless.",
      name: "Tina Upton",
      role: "Global Project Coordinator",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 21,
      text: "The AI-powered meeting summarizer has saved me hours of note-taking.",
      name: "Ulysses Vaughn",
      role: "Executive Assistant",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 22,
      text: "UFFF AI's personalized productivity insights have been eye-opening.",
      name: "Victoria White",
      role: "Business Analyst",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 23,
      text: "The AI-suggested networking opportunities have expanded my professional circle.",
      name: "William Xavier",
      role: "Startup Founder",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 24,
      text: "UFFF AI's integration with my fitness tracker has helped me maintain a healthier lifestyle.",
      name: "Xena Yates",
      role: "Wellness Coach",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 25,
      text: "The AI-driven project timeline suggestions have kept our team ahead of deadlines.",
      name: "Yannick Zimmerman",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ] satisfies Testimonial[],
  ctaMarqueeA: [
    {
      name: "Jack",
      handle: "@jack",
      avatar: "https://avatar.vercel.sh/jack",
      quote: "I've never seen anything like this before. It's amazing. I love it.",
    },
    {
      name: "Jill",
      handle: "@jill",
      avatar: "https://avatar.vercel.sh/jill",
      quote: "I don't know what to say. I'm speechless. This is amazing.",
    },
    {
      name: "John",
      handle: "@john",
      avatar: "https://avatar.vercel.sh/john",
      quote: "I'm at a loss for words. This is amazing. I love it.",
    },
  ] satisfies MarqueeCard[],
  ctaMarqueeB: [
    {
      name: "Jane",
      handle: "@jane",
      avatar: "https://avatar.vercel.sh/jane",
      quote: "I'm at a loss for words. This is amazing. I love it.",
    },
    {
      name: "Jenny",
      handle: "@jenny",
      avatar: "https://avatar.vercel.sh/jenny",
      quote: "I'm at a loss for words. This is amazing. I love it.",
    },
    {
      name: "James",
      handle: "@james",
      avatar: "https://avatar.vercel.sh/james",
      quote: "I'm at a loss for words. This is amazing. I love it.",
    },
  ] satisfies MarqueeCard[],
} as const

