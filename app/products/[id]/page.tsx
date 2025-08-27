import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import products from "@/lib/products.json"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-card">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <AddToCartButton product={product} size="lg" className="w-full" />

              {product.stock > 0 && (
                <p className="text-xs text-muted-foreground text-center">Envío gratuito en pedidos superiores a €50</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {relatedProduct.category}
                        </Badge>
                        <span className="font-heading text-sm font-semibold">{formatPrice(relatedProduct.price)}</span>
                      </div>
                      <Link href={`/products/${relatedProduct.id}`}>
                        <h3 className="font-heading text-lg font-semibold hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
