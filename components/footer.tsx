import Link from "next/link"
import { Store, Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  company: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Política de Privacidad", href: "/privacy" },
  ],
  support: [
    { name: "Centro de Ayuda", href: "/help" },
    { name: "Envíos y Devoluciones", href: "/shipping" },
    { name: "Guía de Tallas", href: "/size-guide" },
    { name: "FAQ", href: "/faq" },
  ],
  social: [
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">MinimalStore</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Productos cuidadosamente seleccionados con diseño minimalista y funcionalidad excepcional para mejorar tu
              vida diaria.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hola@minimalstore.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Soporte</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Síguenos</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2024 MinimalStore. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Hecho con</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Next.js</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Tailwind CSS</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
