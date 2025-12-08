// 'use server'
'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
// import LoginButton from '@/app/ui/components/sign-in';
import { login, logout } from '@/lib/actions/auth';



export default function SideNav() {
  // const { data: session } = useSession();
  return (
    <header className="top-nav">
      <div className="left-section">
        <Link href="/" className="logo">Handcrafted Haven</Link>

        <nav className="nav-section">
          <NavLinks />
        </nav>
      </div>

      <div className="search-bar">
        <span className="icon-placeholder">🔍</span>
        <input type="text" placeholder="Search products..." />
      </div>

      <div className="right-section">
        <span className="icon-placeholder">🛒</span>
        <form action={login}>
            <button className="icon-placeholder" type="submit">👤</button>
        </form>      
      </div>
    </header>
  );
}