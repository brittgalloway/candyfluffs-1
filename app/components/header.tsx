import Link from "next/link";
import { Nav } from "./nav";
import Image from "next/image";
import Logo from "../../public/logo.jpg";

const socialMedia = [
  {href: 'https://candy-fluffs.tumblr.com/', label: 'Link to Candy Fluffs\' Tumblr', text : 'tumblr'},
  {href: 'http://instagram.com/candy_fluffs', label: 'Link to Candy Fluffs\' Instagram', text: 'insta'},
  {href: 'https://x.com/candy_fluffs', label: 'Link to Candy Fluffs\' X', text: 'X'},
];
export function Header() {
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
       <Link href='/'>
        <Image
          src={Logo}
          alt="Candy Fluffs logo with cotton candy next to the text."
          width={300}
          height={177}
        />
       </Link>
      </div>
      {isMobile ? null : (
        <div>
          account, checkout, search
        </div>
      )}
      <p>
        Just a girl who likes to draw manga (ㆁᴗㆁ✿)
      </p>
      <Nav/>
    </header>
  )
}