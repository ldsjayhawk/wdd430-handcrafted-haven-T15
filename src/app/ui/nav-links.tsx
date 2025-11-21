'use client';

import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Artisans', href: '/artisans' },
];

export default function NavLinks() {

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
