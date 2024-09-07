import React from 'react';
import Link from 'next/link';

const nav = [
  {href: '/Book', label: 'Books'},
  {href: '/Print', label: 'Prints'},
  {href: '/Scroll', label: 'Scrolls'},
  {href: '/Charm', label: 'Charms'},
  {href: '/Button', label: 'Buttons'},
  {href: '/Sticker', label: 'Stickers'},
  {href: '/2heroes', label: 'Nechual'},
];
const navMobile = [
  {href: '#', label: 'Account'},
  {href: '/about', label: 'About Me'},
  {href: '/events', label: 'Conventions/Expos'},
];

export function Nav() {
  const isMobile = true;
  return(
    <nav>
      <ul>
        {nav.map((link) => (
          <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
        ))}
        {isMobile ?
          (<>
            {navMobile.map((link) => (
              <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </>) :
          null }
      </ul>
    </nav>
  )
}