"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  size?: "sm" | "default" | "lg"
  className?: string
  showIcon?: boolean
}

export function AddToCartButton({
  product,
  quantity = 1,
  size = "default",
  className = "",
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    addToCart(product, quantity)
    setIsLoading(false)
    setIsAdded(true)

    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido a tu carrito.`,
    })

    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.stock === 0 || isLoading || isAdded}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          Añadiendo...
        </>
      ) : isAdded ? (
        <>
          {showIcon && <Check className="h-4 w-4 mr-2" />}
          Añadido
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          {product.stock > 0 ? "Agregar al Carrito" : "Agotado"}
        </>
      )}
    </Button>
  )
}
