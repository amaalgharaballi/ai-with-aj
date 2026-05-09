import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Mono,
  Noto_Kufi_Arabic,
} from "next/font/google";
import DotGrid from "@/components/texture/DotGrid";
import FilmGrain from "@/components/texture/FilmGrain";
import "./globals.css";

const plexArabicBody = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const kufiArabicDisplay = Noto_Kufi_Arabic({
  variable: "--font-arabic-display",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.with.aj"),
  title: "AI with AJ — مدرسة صناعة المحتوى والبرمجة بالذكاء الاصطناعي",
  description:
    "AI with AJ workshops in Kuwait 2026: Claude Code & Film Making Bootcamp, and AI Content & Ads Workshop.",
  openGraph: {
    title: "AI with AJ — الورش",
    description: "بوتكامب Claude Code وصناعة الأفلام · دورة صناعة المحتوى بالذكاء الاصطناعي.",
    locale: "ar_KW",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabicBody.variable} ${kufiArabicDisplay.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <DotGrid />
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
