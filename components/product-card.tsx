import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
}

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg bg-card">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {product.category}
            </Badge>
            <span className="font-heading text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
            </span>
            {showAddToCart && <AddToCartButton product={product} size="sm" showIcon={false} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
