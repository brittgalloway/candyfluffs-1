import React from 'react';
import Link from 'next/link';

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', text : 'tumblr'},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', text: 'insta'},
  {href: 'https://x.com/candy_fluffs', label: 'Link to Candy Fluffs\' X', text: 'X'},
];

export function Footer() {
  const isMobile = true;
  return(
    <footer>
          <div className="social-links">
            {
              isMobile ? null : <p>Connect With Me</p>
            }
            <div>
              {socialMedia.map((link) => (
                <a key={link.text} href={link.href} aria-label={link.label}>{link.text}</a>
              ))}
            </div>
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