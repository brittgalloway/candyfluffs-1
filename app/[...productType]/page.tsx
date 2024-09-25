import { performRequest } from '@/app/lib/datocms';
import { ProductItem } from '@/app/components/productItem';
import Dropdown from '@/app/components/dropdown';


export default async function ProductsByType({ params }: any) {
  const productTypes = [
    'Book',
    'Print',
    'Scroll',
    'Charm',
    'Button',
    'Sticker'
  ];
  if( params.productType.length > 1 ) {
    var productType = params.productType[0];
    var category = params.productType[1];
      } else if(productTypes.includes(params.productType[0])) {
    productType = params.productType[0];
    category = "";
  } else {
    productType = "";
    category = params.productType[0];
  }
  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allProducts(
          filter: {fandoms: {matches: {pattern: "${category}"}}, 
          productType: {matches: {pattern: "${productType}"}}}
        ) {
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
  let fandomList:string[] = []
  allProducts.forEach((fandom:any) => {
    if (!fandomList.includes(fandom.fandoms)) {
      fandomList.push(fandom.fandoms);
    }
  })
  return (
    <section className="products">
      <Dropdown
        type={productType}
        fandomList={fandomList}
      />
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
