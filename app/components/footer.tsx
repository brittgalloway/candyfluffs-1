'use client';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { 
  FaInstagram, FaTumblr, FaBluesky,
  FaCcVisa, FaCcMastercard, FaCcPaypal
 } from '@/app/lib/icon-svg';
 import {Kofi} from './kofi'
 import '@/app/style/footer.scss';

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', icon: <FaTumblr/>},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', icon: <FaInstagram/>},
  {href: 'https://bsky.app/profile/candyfluffs.bsky.social', label: 'Link to Candy Fluffs\' Bluesky', icon: <FaBluesky/>},
];
const paymentMethods = [
  {alt: 'Visa card logo', icon: <FaCcVisa/>},
  {alt: 'Mastercard card logo', icon: <FaCcMastercard/>},
  {alt: 'Paypal logo', icon: <FaCcPaypal/>},
];

export function Footer() {

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return(
    <footer>
      <Kofi/>
      <div className="social-links">
        {
          isMobile ? null : <p>Connect With Me</p>
        }
          {socialMedia.map((link) => (
            <a key={link?.href} href={link?.href} aria-label={link?.label}>{link?.icon}</a>
          ))}
      </div>
      {isMobile ? null :
        (
          <>
            <ul className={`contact`}>
              <li><Link href="/contact">Contact Me</Link></li>
            </ul>
            <ul className={`extra-links`}>
              <li><Link href="/about">About Me</Link></li>
              <li><Link href="/events">Conventions/Expos</Link></li>
            </ul>
          </>
        )}
      <div className='payment-methods' aria-label="A list of accepted payment methods.">
        {paymentMethods.map((paymethod) => (
          <span key={paymethod?.alt} title={paymethod?.alt}>{paymethod?.icon}</span>
        ))}
      </div>
    </footer>
  )
}