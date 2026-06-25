import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Mario Guerra | AI Architect & Technical Product Leader",
    template: "%s | Mario Guerra",
  },
  description: "Principal Technical Product Leader specializing in AI-enhanced engineering, API design, scalable developer tools, and systems architecture. Over 15 years of driving DX innovation.",
  keywords: ["AI Architect", "AI Integration", "API Design", "TypeSpec", "Developer Experience", "Principal Product Manager", "LLMOps", "RAG architectures", "Mario Guerra"],
  metadataBase: new URL("https://marioguerra.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marioguerra.xyz",
    title: "Mario Guerra | AI Architect & Technical Product Leader",
    description: "Principal Technical Product Leader specializing in AI-enhanced engineering, API design, and scalable developer tools.",
    siteName: "Mario Guerra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Guerra | AI Architect",
    description: "AI-enhanced engineering and API design.",
    creator: "@_marioguerra_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/mario-initial.svg',
    shortcut: '/mario-initial.svg',
    apple: '/mario-initial.svg',
  },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mario Guerra",
              "jobTitle": "Principal AI Architect & Technical Product Leader",
              "url": "https://marioguerra.xyz",
              "sameAs": [
                "https://linkedin.com/in/mario-guerra",
                "https://github.com/mario-guerra",
                "https://x.com/_marioguerra_"
              ],
              "knowsAbout": [
                "Artificial Intelligence", "API Design", "TypeSpec",
                "Developer Experience", "Systems Architecture", "RAG",
                "LLMOps", "Distributed Systems"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col relative">
            <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
