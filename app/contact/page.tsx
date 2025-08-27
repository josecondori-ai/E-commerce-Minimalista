import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Contacto
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-6">¿Necesitas Ayuda?</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Nombre
                  </label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-foreground mb-2 block">
                  Asunto
                </label>
                <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                  Mensaje
                </label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={6} />
              </div>
              <Button className="w-full">Enviar Mensaje</Button>
              <div className="pt-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Ubicación de la tienda</h3>
                <div className="rounded-lg overflow-hidden border bg-muted/10">
                  <iframe
                    title="Ubicación de la tienda"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.847719908684!2d-3.70853022343757!3d40.41536395541696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287c5f9d7b37%3A0x8c4a2e9b1d2c90b2!2sPlaza%20Mayor%2C%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm mb-2">Responderemos a tu email en menos de 24 horas</p>
                    <a href="mailto:hola@minimalstore.com" className="text-primary hover:underline">
                      hola@minimalstore.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Teléfono</h3>
                    <p className="text-muted-foreground text-sm mb-2">Lunes a Viernes de 9:00 a 18:00</p>
                    <a href="tel:+34900123456" className="text-primary hover:underline">
                      +34 900 123 456
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Oficina</h3>
                    <p className="text-muted-foreground text-sm mb-2">Visítanos en nuestras oficinas</p>
                    <p className="text-foreground">
                      Calle Gran Vía, 123
                      <br />
                      28013 Madrid, España
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Horarios</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Lunes - Viernes: 9:00 - 18:00</p>
                      <p>Sábado: 10:00 - 14:00</p>
                      <p>Domingo: Cerrado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
