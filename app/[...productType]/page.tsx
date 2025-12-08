import { performRequest, limit } from '@/app/lib/datocms';
import { Product } from '@/app/lib/types';
import { ProductItem } from '@/app/components/productItem';
import Dropdown from '@/app/components/dropdown';
import Pagination from '@/app/components/pagination';

type ParamTypes ={
  params: {
    productType:string[]
  }
  searchParams: {
    page?:string
  }
}

export default async function ProductsByType({ params, searchParams }: ParamTypes) {
  const {page} = await searchParams;
  const pageNumber = Number.parseInt(page ?? '1');
  const {productType} = await params;
  const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;
  const productTypes = [
    'Book',
    'Print',
    'Scroll',
    'Charm',
    'Button',
    'Sticker'
  ];
  if( productType.length > 1 ) {
    var productTypeParam = productType[0];
    var category = productType[1].replace('-',' ');
      } else if(productTypes.includes(productType[0])) {
    productTypeParam = productType[0];
    category = "";
  } else {
    productTypeParam = "";
    category = productType[0].replace('-',' ');
  }
  const PAGE_CONTENT_QUERY = `
    query ProductsQuery {
      allProducts(
          filter: {fandoms: {matches: {pattern: "${category}"}}, 
          productType: {matches: {pattern: "${productType}"}}},
          first:${limit}, skip:${skip}
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
      _allProductsMeta(
          filter: {
            fandoms: {matches: {pattern: "${category}"}}, 
            productType: {matches: {pattern: "${productType}"}},
            _status: {eq: published}
          }
          ) {
            count
          }
    }
  `;
  const { data: { allProducts, _allProductsMeta } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const productCount = _allProductsMeta.count;
  let fandomList:string[] = []
  allProducts.forEach((fandom:any) => {
    if (!fandomList.includes(fandom.fandoms)) {
      fandomList.push(fandom.fandoms);
    }
  })

  return (
    <>
      <div className="products" id="products">
        { productType.length > 1 || !productTypes.includes(productType[0]) ? null:
          <Dropdown
            type={productTypeParam}
            fandomList={fandomList}
          />
        }
        {allProducts.map((product: Product) => (
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
      </div>
      <Pagination
          numberOfProducts={productCount}
          currentPage={pageNumber}
          maxItems={limit}
          />
    </>
  );
}
