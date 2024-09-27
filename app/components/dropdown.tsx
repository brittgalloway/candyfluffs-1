'use client'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Filters = {
  type: string,
  fandomList: string[]
}
export default function Dropdown(
  {type, fandomList}: Filters) 
  {
    function handleClick() {
      const $categoryList = document.getElementById("category");
      $categoryList?.toggleAttribute('hidden');
    }
    const fandomSlugs = fandomList.map((fandom) =>{
      fandom.replace(' ', '-');
    })
  return(
    <nav id='category-menu' 
      aria-label='Click to open and filter by subject category instead.'>
      <button
        onClick={handleClick} 
        tabIndex={0} >
          Categories <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <ul id="category" hidden>
        {fandomList.map((fandom) => (
          <li key={fandom}>
            <Link href={`/${type}/${fandom}`}>
              {fandom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}