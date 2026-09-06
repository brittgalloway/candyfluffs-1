export type Product = {
  _id: string;
  title: string;
  price: number;
  slug: { current: string };
  fandoms?: string;
  productImages: Array<{
    _type: 'image' | 'file';
    asset: { _ref?: string; url?: string };
    alt?: string;
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
  _id: string;
  image: {
    asset: { _ref: string };
    alt: string;
  };
  link: string;
}

export type Link = {
  _id: string;
  url: string;
  label: string;
}

export type LiveEvent = {
  _id: string;
  eventName: string;
  startDate: string;
  endDate: string;
  website: string;
  address: string;
}