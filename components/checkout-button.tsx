"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { stripePromise } from "@/lib/stripe"
import { useToast } from "@/hooks/use-toast"

interface CheckoutButtonProps {
  disabled?: boolean
  className?: string
}

export function CheckoutButton({ disabled, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { cart } = useCart()
  const { toast } = useToast()

  const handleCheckout = async () => {
    if (cart.items.length === 0) return

    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            description: item.description,
          })),
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error en el pago",
        description: "Hubo un problema al procesar tu pago. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading || cart.items.length === 0}
      className={className}
      size="lg"
    >
      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CreditCard className="h-4 w-4 mr-2" />}
      {isLoading ? "Procesando..." : "Pagar con Stripe"}
    </Button>
  )
}
