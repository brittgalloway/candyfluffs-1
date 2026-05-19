'use client';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { FaInstagram, FaTumblr, FaBluesky, FaCcVisa, FaCcMastercard, FaCcPaypal } from './icons';
import { Kofi } from './kofi';
import '@/app/style/footer.scss';

const socialMedia = [
  { href: 'https://candy-fluffs.tumblr.com/', label: "Link to Candy Fluffs' Tumblr", Icon: FaTumblr },
  { href: 'https://instagram.com/candy_fluffs', label: "Link to Candy Fluffs' Instagram", Icon: FaInstagram },
  { href: 'https://bsky.app/profile/candyfluffs.bsky.social', label: "Link to Candy Fluffs' Bluesky", Icon: FaBluesky },
];

const paymentMethods = [
  { label: 'Visa', Icon: FaCcVisa },
  { label: 'Mastercard', Icon: FaCcMastercard },
  { label: 'PayPal', Icon: FaCcPaypal },
];

export function Footer() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <footer>
      <Kofi />
      <div className="social-links">
        {isMobile ? null : <p>Connect With Me</p>}
        {socialMedia.map((link) => (
          <a key={link.href} href={link.href} aria-label={link.label}>
            <link.Icon size={26} />
          </a>
        ))}
      </div>
      {isMobile ? null : (
        <>
          <ul className='contact'>
            <li><Link href="/contact">Contact Me</Link></li>
          </ul>
          <ul className='extra-links'>
            <li><Link href="/about">About Me</Link></li>
            <li><Link href="/events">Conventions/Expos</Link></li>
          </ul>
        </>
      )}
      <div className='payment-methods' aria-label="Accepted payment methods">
        {paymentMethods.map((method) => (
          <span key={method.label} title={method.label}>
            <method.Icon size={50} />
          </span>
        ))}
      </div>
    </footer>
  );
}