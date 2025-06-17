"use client";

import Footer from "@/components/Footer";
import LanguageMetadata from "@/components/LanguageMetadata";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { Saira } from "next/font/google";
import "../globals.css";

const saira = Saira({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <LanguageProvider>
      <LanguageMetadata />
      <Navigation />
      <main className={`${saira.className} antialiased`}>
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}
