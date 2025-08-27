export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface User {
  id: string
  email: string
  name: string
}
