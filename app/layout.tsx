import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'How to Hackathon. | From Ideas. To Prototype.',
  description: 'Join the premier hackathon experience. Learn ideation, competition dynamics, and rapid prototyping.',
  keywords: ['Hackathon', 'Coding Challenge', 'Tech Workshop', 'Prototype', 'Innovation', 'Student Competition'],
  openGraph: {
    title: 'How to Hackathon. | From Ideas. To Prototype.',
    description: 'Learn the dynamics of tech competitions, networking, and modern trends. Register now for the hackathon.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
      }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
