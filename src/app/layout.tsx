import "./globals.css";
import SideNav from '@/app/ui/sidenav';
import Footer from '@/app/ui/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
        <SideNav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
