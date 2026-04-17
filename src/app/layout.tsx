import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import DotGrid from "@/components/texture/DotGrid";
import FilmGrain from "@/components/texture/FilmGrain";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.with.aj"),
  title: "AI with AJ — دورة صناعة المحتوى والدعايات بالذكاء الاصطناعي",
  description:
    "ورشة ٣ أيام في الكويت مع م. عبداللطيف الغربللي — تعلم تصنع صور وفيديوهات ودعايات بأحدث أدوات الذكاء الاصطناعي.",
  openGraph: {
    title: "AI with AJ — الورشة",
    description:
      "٣ أيام. ٩ ساعات. ١٢ أداة ذكاء اصطناعي. شهادة معتمدة من ٥ جهات.",
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
      className={`${plexArabic.variable} ${plexMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <DotGrid />
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
