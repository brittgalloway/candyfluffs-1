'use client';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, faTumblr, faBluesky,
  faCcVisa, faCcMastercard, faCcPaypal
 } from '@fortawesome/free-brands-svg-icons';
 import '@/app/style/footer.scss';

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', icon: faTumblr},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', icon: faInstagram},
  {href: 'https://bsky.app/profile/candyfluffs.bsky.social', label: 'Link to Candy Fluffs\' Bluesky', icon: faBluesky},
];
const paymentMethods = [
  {alt: 'Visa card logo', icon: faCcVisa},
  {alt: 'Mastercard card logo', icon: faCcMastercard},
  {alt: 'Paypal logo', icon: faCcPaypal},
];

export function Footer() {

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return(
    <footer>
      <div className="social-links">
        {
          isMobile ? null : <p>Connect With Me</p>
        }
          {socialMedia.map((link) => (
            <a key={link?.href} href={link?.href} aria-label={link?.label}><FontAwesomeIcon icon={link?.icon} size="lg"/></a>
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
          <span key={paymethod?.alt} title={paymethod?.alt}><FontAwesomeIcon icon={paymethod?.icon} size="lg"/></span>
        ))}
      </div>
    </footer>
  )
}