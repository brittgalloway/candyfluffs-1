import Link from 'next/link';

export default async function Dropdown(
  {type, fandomList}:{type:string, fandomList: string[]}) 
  {
  return(
    <nav aria-label='Click to open and filter by subject category instead.'>
      <div>Categories</div>
      <ul id="category">
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