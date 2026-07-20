import type { Metadata } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "UB Studio — Turdukulov Ulukbek",
  description:
      "UB Studio — фронтенд-разработка на React и Next.js. Портфолио Улукбека Турдукулова.",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="ru" className="overflow-x-hidden">
      <body
          className={`${display.variable} ${body.variable} ${mono.variable} font-body text-fog antialiased min-h-screen w-full overflow-x-hidden`}
      >
      <div className="noise" />
      <CustomCursor />
      <GradientBackground />
      <Navbar />
      <main className="relative w-full overflow-x-hidden">{children}</main>
      <Footer />
      </body>
      </html>
  );
}