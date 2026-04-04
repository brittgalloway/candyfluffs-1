'use client';
import Link from 'next/link';
import { FaChevronDown } from '@/lib/icon-svg';
import '@/style/dropdown.scss';

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
  return(
    <nav id='category-menu' 
      aria-label='Click to open and filter by subject category instead.'>
      <button
        onClick={handleClick} 
        tabIndex={0} >
          Categories <FaChevronDown/>
      </button>
      <ul id="category" hidden>
        {fandomList.map((fandom) => (
          <li key={fandom}>
            <Link href={`/${type}/${fandom.replace(' ','-')}`}>
              {fandom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}