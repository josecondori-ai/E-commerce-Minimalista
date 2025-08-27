import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import products from "@/lib/products.json"

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0,3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-card/50 py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            Nuevo en MinimalStore
          </Badge>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
            Diseño Minimalista
            <br />
            <span className="text-primary">Funcionalidad Máxima</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Descubre productos cuidadosamente seleccionados que combinan elegancia, simplicidad y la más alta calidad
            para transformar tu espacio y rutina diaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="text-lg px-8 group">
              <Link href="/products" className="flex items-center gap-2">
                Explorar Productos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/about">Conocer Más</Link>
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Calidad Premium</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Productos seleccionados por su excepcional calidad y diseño atemporal.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Entrega gratuita en 24-48h para pedidos superiores a €50.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Garantía Total</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                2 años de garantía en todos nuestros productos. Satisfacción garantizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Productos Destacados
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Lo Mejor de Nuestra Colección
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Una selección de nuestros productos más populares, elegidos por su calidad excepcional y diseño
              minimalista que se adapta a cualquier estilo de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-card to-muted/20">
                    <img
                      src={product.image || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {product.category}
                      </Badge>
                      <span className="font-heading text-xl font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <Button asChild className="w-full group/btn">
                      <Link href={`/products/${product.id}`} className="flex items-center justify-center gap-2">
                        Ver Detalles
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/products" className="flex items-center gap-2">
                Ver Todos los Productos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Listo para Transformar tu Espacio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Únete a miles de clientes satisfechos que han elegido la calidad y el diseño minimalista de MinimalStore.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/products">Comenzar a Comprar</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
