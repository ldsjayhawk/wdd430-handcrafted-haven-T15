import "./globals.css";
import SideNav from '@/app/ui/sidenav';
import Footer from '@/app/ui/footer';
import { kameron, lovers } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${kameron.className} ${lovers.variable}`}>
        <SideNav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
