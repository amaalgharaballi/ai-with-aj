import type { Metadata, Viewport } from "next";
import {
  Cairo,
  Tajawal,
  IBM_Plex_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import DotGrid from "@/components/texture/DotGrid";
import FilmGrain from "@/components/texture/FilmGrain";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-arabic-display",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-arabic-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
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
      className={`${cairo.variable} ${tajawal.variable} ${plexMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <DotGrid />
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
