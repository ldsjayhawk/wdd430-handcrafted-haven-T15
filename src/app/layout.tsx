import "./globals.css";
import SideNav from '@/app/ui/sidenav';
import Footer from '@/app/ui/footer';
import { kameron, lovers, sourceSans, inter, nunito, paris} from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'Discover Unique Handcrafted Treasures',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${inter.className} ${paris.variable}`}>
        <SideNav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
