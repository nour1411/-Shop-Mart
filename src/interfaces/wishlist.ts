export interface WishlistItem {
  _id: string
  title: string
  price: number
  imageCover: string
  category: {
    _id: string
    name: string
  }
  brand: {
    _id: string
    name: string
  }
}
export interface WishlistResponse {
  status: string
  count: number
  data: WishlistItem[]
}
