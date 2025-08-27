import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { CheckoutButton } from "./checkout-button"

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { cart } = useCart()

  const subtotal = cart.total
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <Card className="sticky top-8 shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-heading text-xl flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({cart.itemCount} productos)</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Envío
            </span>
            <span className="font-medium">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
          </div>
          {shipping === 0 && subtotal > 0 && (
            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">¡Envío gratuito aplicado!</p>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-heading text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>

        {showCheckoutButton && <CheckoutButton className="w-full" disabled={cart.items.length === 0} />}

        {subtotal > 0 && subtotal < 50 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
            <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
              Añade <span className="font-semibold">{formatPrice(50 - subtotal)}</span> más para envío gratuito
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
