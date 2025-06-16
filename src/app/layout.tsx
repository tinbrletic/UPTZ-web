import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://uptz.hr' : 'http://localhost:3000'),
  title: "UPTZ - Association of Technical Science | Maritime Engineering Innovation",
  description: "UPTZ (Udruga Primjenjenih Tehničkih Znanosti) is a Croatian association of engineers, students, and technology enthusiasts advancing maritime engineering through innovative electric boat projects. We develop sustainable vessels like Wilson, Malo Vitra, and Teredo Navalis for international competitions including Monaco Energy Boat Challenge and HydroContest. Founded in 2020 in Rijeka, Croatia, we promote technical sciences through education, research, and open-source collaboration.",
  keywords: [
    "UPTZ",
    "maritime engineering",
    "electric boats",
    "sustainable marine technology",
    "Wilson boat",
    "Malo Vitra",
    "Teredo Navalis",
    "Delta One",
    "Monaco Energy Boat Challenge",
    "HydroContest",
    "Adria Hydrofoil",
    "Croatia",
    "Rijeka",
    "renewable energy",
    "carbon fiber boats",
    "solar powered vessels",
    "technical education",
    "open source engineering"
  ],
  authors: [{ name: "UPTZ - Association of Technical Science" }],
  creator: "UPTZ",
  publisher: "UPTZ",
  robots: "index, follow",
  openGraph: {
    title: "UPTZ - Maritime Engineering Innovation from Croatia",
    description: "Croatian association advancing sustainable maritime technology through innovative electric boat projects and technical education. Creators of award-winning vessels Wilson, Malo Vitra, and Teredo Navalis.",
    url: "https://uptz.hr",
    siteName: "UPTZ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-slide-1.jpg",
        width: 1200,
        height: 630,
        alt: "UPTZ Maritime Engineering Projects"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "UPTZ - Maritime Engineering Innovation",
    description: "Croatian association advancing sustainable maritime technology through innovative electric boat projects and technical education.",
    images: ["/hero-slide-1.jpg"]
  },
  icons: {
    icon: "/adria_hydrofoil_navbar_logo.svg",
    apple: "/adria_hydrofoil_navbar_logo.svg",
    shortcut: "/adria_hydrofoil_navbar_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={saira.className}>
        {children}
      </body>
    </html>
  );
}
