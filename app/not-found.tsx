import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Ir al Inicio
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ver Productos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
