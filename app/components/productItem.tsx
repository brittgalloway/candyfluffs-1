import Link from "next/link";
import Image from "next/image";

export function ProductItem({id, title, slug, url, alt, price}: 
  {id: string, title: string, slug: string, url: string, alt: string, price: number}) {
  const isMobile = true;
  return(
    <Link href={`${slug}`} id={id} className="product-item">
      <Image 
        src={url}
        alt={alt}
        width={250}
        height={250}
      />
      <p>{title}</p>
      <p>{price}</p>

    </Link>
  )
}