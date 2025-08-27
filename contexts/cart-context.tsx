"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product, CartItem, Cart } from "@/lib/types"
import { calculateTotal } from "@/lib/utils"

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_TO_CART"; product: Product; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; cart: Cart }

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.product.id === action.product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: Math.min(item.quantity + action.quantity, action.product.stock) }
            : item,
        )
      } else {
        newItems = [
          ...state.items,
          { product: action.product, quantity: Math.min(action.quantity, action.product.stock) },
        ]
      }

      const total = calculateTotal(newItems.map((item) => ({ price: item.product.price, quantity: item.quantity })))
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.product.id !== action.productId)
      const total = calculateTotal(newItems.map((item) => ({ price: item.product.price, quantity: item.quantity })))
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_FROM_CART", productId: action.productId })
      }

      const newItems = state.items.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: Math.min(action.quantity, item.product.stock) }
          : item,
      )

      const total = calculateTotal(newItems.map((item) => ({ price: item.product.price, quantity: item.quantity })))
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART":
      return action.cart

    default:
      return state
  }
}

const initialCart: Cart = { items: [], total: 0, itemCount: 0 }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", cart: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", product, quantity })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getItemQuantity = (productId: string) => {
    const item = cart.items.find((item) => item.product.id === productId)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
