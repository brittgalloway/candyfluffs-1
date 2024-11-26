'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, faBluesky, faTumblr
} from '@fortawesome/free-brands-svg-icons';
import { Nav } from './nav';
import Logo from '@/public/logo.jpg';
import '@/app/style/header.scss';

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', icon: faTumblr},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', icon: faInstagram},
  {href: 'https://bsky.app/profile/candyfluffs.bsky.social', label: 'Link to Candy Fluffs\' Bluesky', icon: faBluesky},
];
export function Header() {

  const isMobile = useMediaQuery({
    query: '(max-width: 549px)',
  });

  return(
    <header suppressHydrationWarning={true}>
      <Link href='/' className={`logo`}>
      <Image
        src={Logo}
        alt="Candy Fluffs logo with cotton candy next to the text."
        width={300}
        height={177}
      />
      </Link>
      {isMobile ? null : (
        <>
        <div className={`social-links desktop`}>
          {socialMedia.map((link) => (
            <a key={link.href} href={link.href} aria-label={link.label}><FontAwesomeIcon icon={link?.icon} size="lg"/></a>
          ))}
        </div>
        <div className={`shop-icons desktop`}>
          <button tabIndex={0} className="snipcart-customer-signin" aria-label='Your Account'>
            <FontAwesomeIcon icon={faUser}/>
          </button>
          <button tabIndex={0} className="snipcart-checkout shopping-icon" aria-label='Checkout'>
            <span className="snipcart-items-count"></span>
            <FontAwesomeIcon icon={faBagShopping}/>
          </button>
        </div>
        </>
      )}
      <p className={'tagline'}>
        Just a girl who likes to draw manga (ㆁᴗㆁ✿)
      </p>
      <Nav/>
    </header>
  )
}