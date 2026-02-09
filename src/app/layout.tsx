import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UFFF AI",
  description: "Smart scheduling powered by AI.",
  authors: [{ name: "UFFF AI", url: "http://localhost:3000" }],
  keywords: ["AI Calendar", "Smart Scheduling", "Productivity", "Time Management"],
  other: {
    "color-scheme": "light",
  },
  openGraph: {
    title: "UFFF AI | Smart scheduling powered by AI.",
    description: "Smart scheduling powered by AI.",
    url: "http://localhost:3000",
    siteName: "UFFF AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "http://localhost:3000/og",
        width: 1200,
        height: 630,
        alt: "UFFF AI | Smart scheduling powered by AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UFFF AI | Smart scheduling powered by AI.",
    description: "Smart scheduling powered by AI.",
    images: [
      {
        url: "http://localhost:3000/og",
        width: 1200,
        height: 630,
        alt: "UFFF AI | Smart scheduling powered by AI.",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
