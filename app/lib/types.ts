export type Product = {
  id: string, 
  title: string, 
  price: number, 
  slug: string, 
  image: [
    { 
      url: string, 
      alt: string 
    }
  ]
}

export type Pageinate = {
  numberOfProducts: number;
  currentPage: number;
  maxItems: number;
}

export type SearchParams = {
  searchParams: {
    page?:string
  }
}

