import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', icon: faTumblr},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', icon: faInstagram},
  {href: 'https://x.com/candy_fluffs', label: 'Link to Candy Fluffs\' X', icon: faXTwitter},
];

export function Footer() {
  const isMobile = true;
  return(
    <footer>
          <div className="social-links">
            {
              isMobile ? null : <p>Connect With Me</p>
            }
              {socialMedia.map((link) => (
                <a key={link.href} href={link.href} aria-label={link.label}><FontAwesomeIcon icon={link.icon} size="lg"/></a>
              ))}
          </div>
          {isMobile ? null :
            (
              <>
                <ul>
                  <li><Link href="/contact">Contact Me</Link></li>
                </ul>
                <ul>
                  <li><Link href="/about">About Me</Link></li>
                  <li><Link href="/events">Conventions/Expos</Link></li>
                </ul>
              </>
            )}

    </footer>
  )
}