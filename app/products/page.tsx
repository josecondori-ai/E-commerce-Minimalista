"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import products from "@/lib/products.json"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === null || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Nuestros Productos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explora nuestra cuidada selección de productos diseñados para mejorar tu vida diaria con estilo y
            funcionalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductFilters
                categories={categories}
                onSearchChange={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-muted-foreground mb-4">Intenta ajustar tus filtros o términos de búsqueda.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="text-primary hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
