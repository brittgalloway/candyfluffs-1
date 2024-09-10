import { performRequest } from '@/app/lib/datocms';
import { ProductItem } from '@/app/components/productItem';


export default async function ProductsByType({ params }: any) {
  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allProducts(filter: {productType: {eq: "${params.productType}"}}) {
        id
        title
        fandoms
        price
        slug
        image {
          alt
          url
        }
      }
    }
  `;
  const { data: { allProducts } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <section className="products">
      {allProducts.map((product: { id: string, title: string, price: number, slug: string, 
        image: [{ url: string, alt: string }] }) => (
        <ProductItem
          key={product?.id}
          id={product?.id}
          title={product?.title}
          slug={product?.slug}
          url={product?.image[0]?.url}
          alt={product?.image[0]?.alt}
          price={product?.price}
        />
      ))}
    </section>
  );
}
