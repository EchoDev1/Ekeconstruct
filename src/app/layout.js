import './globals.css';
import { PlatformProvider } from '@/context/PlatformContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalModals from '@/components/GlobalModals';

export const metadata = {
  title: 'Ekeconstruct Nigeria | Civil & Structural Engineering, Building Plans & Turnkey Construction',
  description:
    'Ekeconstruct Nigeria (ekeconstruct.africa) is a COREN-certified Civil & Structural Engineering and Turnkey Construction firm offering pre-engineered building structures, architectural plans, BOQ cost estimation, deep foundations, and EPC construction across Nigeria.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
