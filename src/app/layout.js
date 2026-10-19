import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PlatformProvider } from '@/context/PlatformContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalModals from '@/components/GlobalModals';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Ekeconstruct Nigeria | Civil & Structural Engineering, Building Plans & Turnkey Construction',
  description:
    'Ekeconstruct Nigeria (ekeconstruct.africa) is a COREN-certified Civil & Structural Engineering and Turnkey Construction firm offering pre-engineered building structures, architectural plans, BOQ cost estimation, deep foundations, and EPC construction across Nigeria.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A1628] antialiased">
        <PlatformProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <GlobalModals />
          <Footer />
        </PlatformProvider>
      </body>
    </html>
  );
}
