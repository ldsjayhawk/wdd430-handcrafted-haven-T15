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

      <div className="search-bar">
        <span className="icon-placeholder">🔍</span>
        <input type="text" placeholder="Search products..." />
      </div>

      <div className="right-section">
        <span className="icon-placeholder">🛒</span>
        <span className="icon-placeholder">👤</span>
      </div>
    </header>
  );
}