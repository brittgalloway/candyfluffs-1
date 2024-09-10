'use client'
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';
import Burger from '@/public/hamburger.svg';

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
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to track if the menu is open

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  // Toggle the menu open/close state
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) {
    return null; // Prevent server-side rendering issues by rendering null initially
  } 
  return(
    <nav>
      {isOpen ? 
        (<ul>
          {nav.map((link) => (
            <li onClick={handleMenuToggle} key={link.label}><Link href={link.href}>{link.label}</Link></li>
          ))}
          {isMobile ? 
            (<>
              {navMobile.map((link) => (
                <li onClick={handleMenuToggle} onKeyDown={handleMenuToggle} key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </>) :
            null }
        </ul>) : null
      }
      {isMobile ? (
        <div className='mobile-menu'>
          <Image
            src={Burger}
            alt='3 horizontal lines to represent a hamburger menu trigger'
            width={37}
            height={24}
            aria-label='Click here to open the navigation menu.'
            onClick={handleMenuToggle}
            onKeyDown={handleMenuToggle}
            tabIndex={1}
            />
          <span>Search</span>
          <span>ChkOut</span>
        </div>
        ) : null}
    </nav>
  )
}