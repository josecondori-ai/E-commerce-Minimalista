"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string | null) => void
  selectedCategory: string | null
  searchTerm: string
}

export function ProductFilters({
  categories,
  onSearchChange,
  onCategoryChange,
  selectedCategory,
  searchTerm,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => onCategoryChange(null)}
          >
            Todas
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
