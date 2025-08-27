"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/contexts/cart-context"

export function CartPageClient() {
  const { cart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestros productos y encuentra algo que
          te guste!
        </p>
        <Button asChild size="lg">
          <Link href="/products">Explorar Productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
