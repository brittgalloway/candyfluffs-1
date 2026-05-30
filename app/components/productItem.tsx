import Link from 'next/link';
import Image from 'next/image';
import '@/style/product-item.scss';

type ProductData = {
  id: string;
  title: string;
  slug: string;
  url: string;
  alt: string;
  price: number;
}

function ProductMedia({ url, alt }: { url: string; alt: string }) {
  if (url.endsWith('.webm') || url.endsWith('.gif')) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        width={250}
        height={250}
        aria-label={alt}
      />
    );
  }
  return (
    <Image
      src={url}
      alt={alt}
      width={250}
      height={250}
    />
  );
}

export async function ProductItem({ id, title, slug, url, alt, price }: ProductData) {
  const formatedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const apiUrl = `https://app.snipcart.com/api/products/${id}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.BASE64_ENCODED_SECRET_API_KEY}`,
      'content-type': 'application/json',
    },
  };
  const response = await fetch(apiUrl, options);
  const data = response.status === 200 ? await response.json() : null;
  const isSoldOut = data?.totalStock === 0;

  return (
    <>
      {isSoldOut ? (
        <div id={id} className="product-item">
          <div id="soldOut">
            <p>Sold Out</p>
          </div>
          <div className="overlay" />
          <ProductMedia url={url} alt={alt} />
          <p className="product-title">{title}</p>
          <p className="product-price">{formatedPrice}</p>
        </div>
      ) : (
        <Link href={`/products/${slug}`} id={id} className="product-item">
          <div className="overlay" />
          <ProductMedia url={url} alt={alt} />
          <p className="product-title">{title}</p>
          <p className="product-price">{formatedPrice}</p>
        </Link>
      )}
    </>
  );
}