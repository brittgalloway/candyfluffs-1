'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from './icons';
import '@/app/style/dropdown.scss';

type Filters = {
  type: string;
  fandomList: string[];
};

export default function Dropdown({ type, fandomList }: Filters) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id='category-menu' aria-label='Filter by subject category'>
      <button onClick={() => setIsOpen(prev => !prev)}>
        Categories <FaChevronDown size={14} />
      </button>
      <ul id="category" hidden={!isOpen}>
        {fandomList.map((fandom) => (
          <li key={fandom}>
            <Link href={`/${type}/${fandom.replaceAll(' ', '-')}`}>
              {fandom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}