import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { headers as nextHeaders } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await nextHeaders();
  const requestUrl = headersList.get("x-url");

  let pathname = "";

  if (requestUrl) {
    try {
      const url = new URL(requestUrl);
      pathname = url.pathname;
    } catch {
      pathname = "";
    }
  }
  // If no pathname is derived from x-pathname or referer, it remains ""

  // Check if we should hide navigation on admin and login pages
  const shouldHideNavigation = pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme') || 'system';
                let theme = saved;
                if (saved === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {!shouldHideNavigation && <Navigation />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
