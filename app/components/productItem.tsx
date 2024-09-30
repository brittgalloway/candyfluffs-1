import Link from 'next/link';
import Image from 'next/image';
import '@/app/style/product-item.scss';

type ProductData = {
  id: string, 
  title: string, 
  slug: string, 
  url: string, 
  alt: string, 
  price: number
}
export async function ProductItem({id, title, slug, url, alt, price}: ProductData) {
  
  const formatedPrice = price.toLocaleString('en-US', { style: 'currency', currency: "USD" })
  
  const apiUrl = `https://app.snipcart.com/api/products/${id}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.BASE64_ENCODED_SECRET_API_KEY}`,
      'content-type': 'application/json'
    }
  };
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  
  const isSoldOut = data.totalStock == 0 ?  true : false;

  return(
    <>
    { isSoldOut ?  (
      <div id={id} className="product-item">
        <div id="soldOut">
          <p>Sold Out</p>
        </div>
        <div className="overlay" />
        <Image 
          src={url}
          alt={alt}
          width={250}
          height={250}
        />
        <p className="product-title">{title}</p>
        <p className="product-price">{formatedPrice}</p>
      </div>
      ) : (
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
        </Link>
      )}
    </>
  )
}