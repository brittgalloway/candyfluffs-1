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
  const pageNumber = Number.parseInt(searchParams?.page ?? '1');
  
  const skip = pageNumber > 1 ? limit : 0;
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
      <div className="products">
        { params.productType.length > 1 || !productTypes.includes(params.productType[0]) ? null:
          <Dropdown
            type={productType}
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
