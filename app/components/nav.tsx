'use client';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
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
  {href: '/about', label: 'About Me'},
  {href: '/events', label: 'Conventions/Expos'},
];

export function Nav() {

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });


  const handleMenuToggle = () => {
    const $navToggle = document.getElementById("navToggle");
    $navToggle?.toggleAttribute('hidden');
  };

  return(
    <nav>
      <ul id="navToggle" hidden>
        {nav.map((link) => (
          <li onClick={handleMenuToggle} key={link.label}><Link href={link.href}>{link.label}</Link></li>
        ))}
        {isMobile ? 
          (<>
            <li onClick={handleMenuToggle} onKeyDown={handleMenuToggle} className="snipcart-customer-signin">Account</li>
            {navMobile.map((link) => (
              <li onClick={handleMenuToggle} onKeyDown={handleMenuToggle} key={link.label}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </>) :
          null }
      </ul>
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
          <span className="snipcart-checkout shopping-icon">
            <FontAwesomeIcon icon={faBagShopping}/>
            <span className="snipcart-items-count"></span>
          </span>
        </div>
        ) : 
        null}
    </nav>
  )
}