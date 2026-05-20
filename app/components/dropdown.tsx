import Link from 'next/link';
import { FaChevronDown } from './icons';
import '@/style/dropdown.scss';

type Filters = {
  type: string;
  fandomList: string[];
  activeCategory?: string;
};

export default function Dropdown({ type, fandomList, activeCategory }: Filters) {
  return (
    <nav id='category-menu' aria-label='Filter by subject category'>
      <button popoverTarget="category" id="category-trigger">
        {activeCategory ? activeCategory : 'Categories'}
        <FaChevronDown size={14} />
      </button>
      <ul id="category" popover="auto">
        {activeCategory && (
          <li key="clear">
            <Link href={`/${type}`}>All</Link>
          </li>
        )}
        {fandomList.map((fandom) => (
          <li key={fandom} aria-current={fandom === activeCategory ? 'true' : undefined}>
            <Link href={`/${type}/${fandom.replaceAll(' ', '-')}`}>
              {fandom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}