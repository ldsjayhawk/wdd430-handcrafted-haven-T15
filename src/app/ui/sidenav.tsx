'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import { useSession, signOut } from 'next-auth/react';


import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import MobileNav from "@/app/ui/mobile-nav";

export default function SideNav() {
  const { data: session } = useSession();
  return (
    <header className="top-nav">
      <div className="left-section">
        <Link href="/" className="logo">Handcrafted Haven</Link>

            <div className="right-section">
                <span className="icon-placeholder">🛒</span>
                <Link href="/login" className="icon-placeholder">
                    👤
                </Link>
            </div>

      <div className="right-section">
        <span className="icon-placeholder">🛒</span>

          {session ? (
          <button
            className="icon-placeholder"
            onClick={() => signOut()}
          >
            🚪
          </button>
        ) : (
          <Link href="/login" className="icon-placeholder">👤</Link>
        )}
      </div>
    </header>
  );
}
