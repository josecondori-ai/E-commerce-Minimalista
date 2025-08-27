"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())

  useEffect(() => {
    // Clear cart after successful payment
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center shadow-lg">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="font-heading text-2xl text-green-600 dark:text-green-400">¡Pago Exitoso!</CardTitle>
            <p className="text-muted-foreground mt-2">Tu pedido ha sido procesado correctamente</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-semibold">Número de Pedido</span>
              </div>
              <p className="font-mono text-lg font-bold text-primary">#{orderNumber}</p>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✅ Pago procesado exitosamente</p>
              <p>📧 Recibirás un email de confirmación en breve</p>
              <p>📦 Tu pedido será enviado en 2-3 días hábiles</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/products">Seguir Comprando</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Inicio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
