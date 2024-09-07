import Link from "next/link";
import { Nav } from "./nav";

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', text : 'tumblr'},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', text: 'insta'},
  {href: 'https://x.com/candy_fluffs', label: 'Link to Candy Fluffs\' X', text: 'X'},
];
export function Header({tagline} : {tagline: string}) {
  const isMobile = true;
  return(
    <header>
      {isMobile ? null : (
        <div className="social-links">
          {socialMedia.map((link) => (
            <a key={link.text} href={link.href} aria-label={link.label}>{link.text}</a>
          ))}
        </div>
      )}
      <div>
       <Link href='/'>Candy fluffs logo</Link>
      </div>
      {isMobile ? null : (
        <div>
          account, checkout, search
        </div>
      )}
      <p>
        {tagline}
      </p>
      <Nav/>
    </header>
  )
}