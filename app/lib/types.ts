export type Product = {
  id: string;
  title: string;
  price: number;
  slug: string;
  image: Array<{
    url: string;
    alt: string;
  }>;
}

export type Pageinate = {
  numberOfProducts: number;
  currentPage: number;
  maxItems: number;
}

export type SearchParams = {
  searchParams: Promise<{
    page?: string;
  }>;
}

export type Banner = {
  link: {
    value: {
      document: {
        children: Array<{
          children: Array<{ url: string }>;
        }>;
      };
    };
  };
  banner: Array<{
    id: string;
    alt: string;
    responsiveImage: {
      src: string;
      width: number;
      height: number;
    };
  }>;
}

export type Link = {
  id: string;
  url: string;
  label: string;
}