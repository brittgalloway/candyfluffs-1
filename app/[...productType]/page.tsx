import { performRequest, limit } from '@/app/lib/datocms';
import { Product } from '@/app/lib/types';
import { ProductItem } from '@/app/components/productItem';
import Dropdown from '@/app/components/dropdown';
import Pagination from '@/app/components/pagination';

type ParamTypes = {
  params: Promise<{ productType: string[] }>
  searchParams: Promise<{ page?: string }>
}

export default async function ProductsByType({ params, searchParams }: ParamTypes) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const { productType } = await params;
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;
    const productTypes = ['Book', 'Print', 'Scroll', 'Charm', 'Button', 'Sticker'];

    let productTypeParam: string;
    let category: string;

    if (productType.length > 1) {
      productTypeParam = productType[0];
      category = productType[1].replace('-', ' ');
    } else if (productTypes.includes(productType[0])) {
      productTypeParam = productType[0];
      category = '';
    } else {
      productTypeParam = '';
      category = productType[0].replace('-', ' ');
    }

    const PAGE_CONTENT_QUERY = `
      query ProductsQuery($category: String!, $productTypeParam: String!, $limit: IntType!, $skip: IntType!) {
        allProducts(
          filter: {
            fandoms: { matches: { pattern: $category } }
            productType: { matches: { pattern: $productTypeParam } }
          }
          first: $limit
          skip: $skip
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
            fandoms: { matches: { pattern: $category } }
            productType: { matches: { pattern: $productTypeParam } }
            _status: { eq: published }
          }
        ) {
          count
        }
      }
    `;

    const { data: { allProducts, _allProductsMeta } } = await performRequest({
      query: PAGE_CONTENT_QUERY,
      variables: { category, productTypeParam, limit, skip },
    });

    const productCount = _allProductsMeta.count;
    const fandomList: string[] = [];
    allProducts.forEach((fandom: any) => {
      if (!fandomList.includes(fandom.fandoms)) {
        fandomList.push(fandom.fandoms);
      }
    });

    return (
      <>
        <div className="products" id="products">
          {productType.length > 1 || !productTypes.includes(productType[0]) ? null : (
            <Dropdown
              type={productTypeParam}
              fandomList={fandomList}
            />
          )}
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
  } catch {
    return (
      <div>
        <h2 id="errorH2">Taking a Short break!</h2>
        <p id="errorMessage">Check back soon!</p>
      </div>
    );
  }
}