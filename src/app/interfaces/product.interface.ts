export interface Product {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface ProductUrl {
  products: Product[]
  url: string
}