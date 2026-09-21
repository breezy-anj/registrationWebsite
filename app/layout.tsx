import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
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
    <html lang="en" className={fontSans.variable} data-theme="dark">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
