import React from 'react';
import Link from 'next/link';

export function Footer() {
  const isMobile = false;
  return(
    <footer>
          <div className="social-links">
            {
              isMobile ? null : <p>Connect With Me</p>
            }
            <div>
              <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr">tumblr</a>
              <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram">insta</a>
              <a href="https://x.com/candy_fluffs" aria-label="Candy Fluffs Twitter">twitter</a> 
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