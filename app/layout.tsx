import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vernonthedev | Full-Stack Developer",
  description: "Portfolio of Vernon - Laravel, Flutter, and Full-Stack Developer. Building modern web and mobile applications.",
  keywords: ["vernonthedev", "Laravel", "Flutter", "Full-Stack", "Developer", "Portfolio"],
  authors: [{ name: "vernonthedev" }],
  creator: "vernonthedev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vernonthedev.com",
    title: "vernonthedev | Full-Stack Developer",
    description: "Portfolio of Vernon - Laravel, Flutter, and Full-Stack Developer",
    siteName: "vernonthedev",
  },
  twitter: {
    card: "summary_large_image",
    title: "vernonthedev | Full-Stack Developer",
    description: "Portfolio of Vernon - Laravel, Flutter, and Full-Stack Developer",
    creator: "@vernonthedev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "vernonthedev",
  jobTitle: "Full-Stack Developer",
  url: "https://vernonthedev.com",
  sameAs: [
    "https://github.com/vernonthedev",
    "https://youtube.com/@vernonthedev",
    "https://twitter.com/vernonthedev",
    "https://linkedin.com/in/vernonthedev",
  ],
  knowsAbout: [
    "Laravel",
    "Flutter",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "PHP",
    "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
