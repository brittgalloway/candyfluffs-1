import { performRequest, limit } from '@/lib/datocms';
import { Product } from '@/lib/types';
import { ProductItem } from '@/components/productItem';
import Dropdown from '@/components/dropdown';
import Pagination from '@/components/pagination';

type ParamTypes = {
  params: Promise<{ productType: string[] }>
  searchParams: Promise<{ page?: string }>
}

const productTypes = ['Book', 'Print', 'Scroll', 'Charm', 'Button', 'Sticker'];

export default async function ProductsByType({ params, searchParams }: ParamTypes) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const { productType } = await params;
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    // Determine productTypeParam and active fandom filter from URL
    let productTypeParam: string;
    let category: string;

    if (productType.length > 1) {
      // e.g. /Print/My-Hero-Academia
      productTypeParam = productType[0];
      category = productType[1].replaceAll('-', ' ');
    } else if (productTypes.includes(productType[0])) {
      // e.g. /Print
      productTypeParam = productType[0];
      category = '';
    } else {
      // e.g. /My-Hero-Academia (fandom only, no type)
      productTypeParam = '';
      category = productType[0].replaceAll('-', ' ');
    }

    const isTypePage = productTypes.includes(productType[0]);

    // Fetch filtered products and ALL fandoms for this type in parallel
    const PRODUCTS_QUERY = `
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
          image { alt url }
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

    // Fetch all products for this type (unfiltered) to build the full fandom list
    const ALL_FANDOMS_QUERY = `
      query AllFandomsQuery($productTypeParam: String!) {
        allProducts(
          filter: { productType: { matches: { pattern: $productTypeParam } } }
          first: 100
        ) {
          fandoms
        }
      }
    `;

    const [productsResult, fandomsResult] = await Promise.all([
      performRequest({ query: PRODUCTS_QUERY, variables: { category, productTypeParam, limit, skip } }),
      isTypePage
        ? performRequest({ query: ALL_FANDOMS_QUERY, variables: { productTypeParam } })
        : Promise.resolve(null),
    ]);

    const { allProducts, _allProductsMeta } = productsResult.data;
    const productCount = _allProductsMeta.count;

    // Build deduplicated fandom list from unfiltered results
    const fandomList: string[] = [];
    if (fandomsResult) {
      fandomsResult.data.allProducts.forEach((item: { fandoms: string }) => {
        if (item.fandoms && !fandomList.includes(item.fandoms)) {
          fandomList.push(item.fandoms);
        }
      });
    }

    return (
      <>
        {isTypePage && (
          <Dropdown
            type={productTypeParam}
            fandomList={fandomList}
            activeCategory={category}
          />
        )}
        <div className="products" id="products">
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