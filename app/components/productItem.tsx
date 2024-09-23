import Link from "next/link";
import Image from "next/image";

export function ProductItem({id, title, slug, url, alt, price}: 
  {id: string, title: string, slug: string, url: string, alt: string, price: number}) {

  const formatedPrice = price.toLocaleString("en-US", { style: "currency", currency: "USD" })
  return(
    <Link href={`products/${slug}`} id={id} className="product-item">
      <div className="overlay" />
      <Image 
        src={url}
        alt={alt}
        width={250}
        height={250}
        />
        <p className="product-title">{title}</p>
        <p className="product-price">{formatedPrice}</p>
        <div className="soldOut">
          <p>Sold Out</p>
        </div>
    </Link>
  )
}