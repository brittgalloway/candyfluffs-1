'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pageinate } from '@/app/lib/types';

export default function Pagination({ numberOfProducts, currentPage, maxItems }: Pageinate) {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pageItems = [];

  function exportQueryParameters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  }

  for (let i = 1; i <= numberOfProducts; i += maxItems) {
    const pageNumber = (i - 1) / maxItems + 1;
    const isSelected = pageNumber === currentPage;
    pageItems.push(
      <button key={pageNumber}
        type="button"
        aria-current="page"
        className={`${
          isSelected ? 'selected' : ''
        }`}
        onClick={() => {
          exportQueryParameters('page', pageNumber.toString());
        }}
      >
        {pageNumber}
      </button>,
    );
  }

  const firstProductIndex = 1 + (currentPage - 1) * maxItems;
  const lastProductIndex =
    1 + currentPage * maxItems < numberOfProducts
      ? 1 + currentPage * maxItems
      : numberOfProducts;
  return (
    <div className={``}>
        <p className="">
          Showing <span className="font-medium">{firstProductIndex}</span> to
          <span className="font-medium"> {lastProductIndex}</span> of
          <span className="font-medium"> {numberOfProducts}</span> results
        </p>
        <nav
          className=""
          aria-label="Pagination"
        >
          {currentPage !== 1 && (
            <button key={"decrease"}
              type="button"
              onClick={() => {
                exportQueryParameters('page', (currentPage - 1).toString());
              }}
              className=""
            >
              <span className="">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
          )}
          {pageItems.map((item) => {
            return item;
          })}
          {!(lastProductIndex === numberOfProducts) && (
            <button key={"increase"}
              type="button"
              onClick={() => {
                exportQueryParameters('page', (currentPage + 1).toString());
              }}
              className=""
            >
              <span className="">Next</span>
              <FontAwesomeIcon icon={faChevronRight}/>
            </button>
          )}
        </nav>
    </div>
  );
};
