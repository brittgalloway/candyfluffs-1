import { performRequest } from '@/app/lib/datocms';
import Link from 'next/link';


  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allProducts(orderBy: fandoms_ASC, skip: "6", first: "70") {
          fandoms
        }
    }
  `;
export default async function Dropdown() {
  const { data: { allProducts } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  let fandomList:string[] = []
  allProducts.forEach((fandom:any) => {
    if (!fandomList.includes(fandom.fandoms)) {
      fandomList.push(fandom.fandoms);
    }
  })

  return(
    <nav aria-label='Click to open and filter by subject category instead.'>
      <div>Categories</div>
      <ul id="category">
        {fandomList.map((fandom:string) => (
          <li key={fandom}>
            <Link href={`/${fandom}`}>
              {fandom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}