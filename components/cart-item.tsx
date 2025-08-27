"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-card">
              <Image
                src={product.image || "/placeholder.svg?height=80&width=80"}
                alt={product.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground truncate">{product.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1">
                  {product.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(product.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-medium text-foreground w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="font-heading text-lg font-bold text-foreground">
                  {formatPrice(product.price * quantity)}
                </div>
                {quantity > 1 && <div className="text-xs text-muted-foreground">{formatPrice(product.price)} c/u</div>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
