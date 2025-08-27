import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, Users, Award, Truck } from "lucide-react"

const features = [
  {
    icon: Store,
    title: "Productos Cuidadosamente Seleccionados",
    description: "Cada producto en nuestra tienda ha sido elegido por su calidad excepcional y diseño minimalista.",
  },
  {
    icon: Users,
    title: "Experiencia Centrada en el Usuario",
    description: "Diseñamos cada interacción pensando en ofrecer la mejor experiencia de compra posible.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Trabajamos solo con marcas y proveedores que comparten nuestros estándares de calidad.",
  },
  {
    icon: Truck,
    title: "Envío Rápido y Seguro",
    description: "Envío gratuito en pedidos superiores a €50 y entrega en 24-48 horas.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Sobre Nosotros
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
            Redefiniendo el E-commerce Minimalista
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            En MinimalStore creemos que menos es más. Nuestra misión es ofrecer productos excepcionales con un diseño
            limpio y funcional que mejore tu vida diaria.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Nuestra Historia</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              MinimalStore nació de la frustración de encontrar productos de calidad en un mundo saturado de opciones.
              Fundada en 2024, nuestra tienda se centra en la curaduría cuidadosa de productos que combinan
              funcionalidad, diseño y sostenibilidad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cada producto en nuestra colección ha sido seleccionado por su capacidad de simplificar y mejorar la vida
              diaria, siguiendo los principios del diseño minimalista: simplicidad, funcionalidad y belleza atemporal.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">¿Por Qué Elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Simplicidad</h3>
              <p className="text-muted-foreground text-sm">
                Creemos en la belleza de lo simple y funcional, eliminando lo innecesario.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Calidad</h3>
              <p className="text-muted-foreground text-sm">
                Solo ofrecemos productos que nosotros mismos usaríamos y recomendaríamos.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Sostenibilidad</h3>
              <p className="text-muted-foreground text-sm">
                Priorizamos productos duraderos y de marcas comprometidas con el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
