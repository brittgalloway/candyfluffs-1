'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { FaBagShopping, FaUser, FaInstagram, FaBluesky, FaTumblr } from './icons';
import { Nav } from './nav';
import Logo from 'p/logo.jpg';
import '@/style/header.scss';

const socialMedia = [
  { href: 'https://candy-fluffs.tumblr.com/', label: "Link to Candy Fluffs' Tumblr", Icon: FaTumblr },
  { href: 'https://instagram.com/candy_fluffs', label: "Link to Candy Fluffs' Instagram", Icon: FaInstagram },
  { href: 'https://bsky.app/profile/candyfluffs.bsky.social', label: "Link to Candy Fluffs' Bluesky", Icon: FaBluesky },
];

export function Header() {
  const isMobile = useMediaQuery({ query: '(max-width: 549px)' });

  return (
    <header suppressHydrationWarning={true}>
      <Link href='/' className='logo'>
        <Image
          src={Logo}
          alt="Candy Fluffs logo with cotton candy next to the text."
          width={300}
          height={177}
        />
      </Link>
      {isMobile ? null : (
        <>
          <div className='social-links desktop'>
            {socialMedia.map((link) => (
              <a key={link.href} href={link.href} aria-label={link.label}>
                <link.Icon size={26} />
              </a>
            ))}
          </div>
          <div className='shop-icons desktop'>
            <button className="snipcart-customer-signin" aria-label='Your Account'>
              <FaUser size={26} />
            </button>
            <button className="snipcart-checkout shopping-icon" aria-label='Checkout'>
              <span className="snipcart-items-count"></span>
              <FaBagShopping size={26} />
            </button>
          </div>
        </>
      )}
      <p className='tagline'>
        Just a girl who likes to draw manga (ㆁᴗㆁ✿)
      </p>
      <Nav />
    </header>
  );
}