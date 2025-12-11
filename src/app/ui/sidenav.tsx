'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';



export default function SideNav() {
  return (
    <header className="top-nav">
      <div className="left-section">
        <Link href="/" className="logo">Handcrafted Haven</Link>

        <nav className="nav-section">
          <NavLinks />
        </nav>
      </div>

      <div className="right-section">
        <span className="icon-placeholder">🛒</span>
        <Link href="/login" className="icon-placeholder">👤</Link>
      </div>
    </header>
  );
}