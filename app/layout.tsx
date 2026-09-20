import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "How to Hackathon!! — Nibble Computer Society",
  description:
    "Register for How to Hackathon!! — presented by NCS. Unite with creative thinkers, learn hackathon dynamics, and compete for glory.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "How to Hackathon!! — NCS",
    description: "Register now for the How to Hackathon!! event by Nibble Computer Society.",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
