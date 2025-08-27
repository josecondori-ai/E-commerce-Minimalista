import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CartPageClient } from "./cart-page-client"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/products" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Seguir Comprando
              </Link>
            </Button>
            <h1 className="font-heading text-3xl font-bold text-foreground">Tu Carrito</h1>
          </div>
        </div>

        <CartPageClient />
      </div>
    </div>
  )
}
