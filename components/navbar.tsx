"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Menu, X, Store } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/contexts/cart-context"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/products" },
  { name: "Sobre Nosotros", href: "/about" },
  { name: "Contacto", href: "/contact" },
]

export function Navbar() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">MinimalStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Button */}
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cart.itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <Store className="h-6 w-6 text-primary" />
                      <span className="font-heading text-xl font-bold">MinimalStore</span>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-4 py-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto py-4">
                    <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Ver Carrito ({cart.itemCount})
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
