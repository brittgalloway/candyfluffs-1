import { sanityClient, urlFor, limit } from '@/lib/sanity';
import { Product } from '@/lib/types';
import { ProductItem } from '@/components/productItem';
import Dropdown from '@/components/dropdown';
import Pagination from '@/components/pagination';
import ErrorFallback from '@/components/errorFallback';

type ParamTypes = {
  params: Promise<{ productType: string[] }>;
  searchParams: Promise<{ page?: string }>;
}

const productTypes = ['Book', 'Print', 'Scroll', 'Charm', 'Button', 'Sticker'];

export default async function ProductsByType({ params, searchParams }: ParamTypes) {
  try {
    const { page } = await searchParams;
    const pageNumber = Number.parseInt(page ?? '1');
    const { productType } = await params;
    const skip = pageNumber > 1 ? limit * (pageNumber - 1) : 0;

    let productTypeParam: string;
    let category: string;

    if (productType.length > 1) {
      productTypeParam = productType[0];
      category = productType[1].replaceAll('-', ' ');
    } else if (productTypes.includes(productType[0])) {
      productTypeParam = productType[0];
      category = '';
    } else {
      productTypeParam = '';
      category = productType[0].replaceAll('-', ' ');
    }

    const isTypePage = productTypes.includes(productType[0]);

    // Build GROQ filters
    const typeFilter = productTypeParam ? `productType == "${productTypeParam}"` : '';
    const categoryFilter = category ? `fandoms == "${category}"` : '';
    const filters = [typeFilter, categoryFilter].filter(Boolean).join(' && ');
    const where = filters ? `&& ${filters}` : '';

    const [products, total, allFandomProducts] = await Promise.all([
      sanityClient.fetch<Product[]>(`
        *[_type == "product" ${where}] | order(_createdAt desc) [$skip...$end] {
          _id, title, price, slug, fandoms,
          image[]{ asset, alt }
        }
      `, { skip, end: skip + limit }),

      sanityClient.fetch<number>(`count(*[_type == "product" ${where}])`),

      isTypePage
        ? sanityClient.fetch<Array<{ fandoms: string }>>(`
            *[_type == "product" && productType == $productTypeParam] {
              fandoms
            }
          `, { productTypeParam })
        : Promise.resolve([]),
    ]);

    // Build deduplicated fandom list
    const fandomList: string[] = [];
    allFandomProducts.forEach((item) => {
      if (item.fandoms && !fandomList.includes(item.fandoms)) {
        fandomList.push(item.fandoms);
      }
    });

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
          {products.map((product: Product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              title={product.title}
              slug={product.slug.current}
              url={urlFor(product.image[0].asset).width(500).url()}
              alt={product.image[0].alt}
              price={product.price}
            />
          ))}
        </div>
        <Pagination
          numberOfProducts={total}
          currentPage={pageNumber}
          maxItems={limit}
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return <ErrorFallback />;
  }
}