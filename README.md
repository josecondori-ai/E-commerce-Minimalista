## E-commerce Minimalista – Next.js, Stripe API, Tailwind

Una tienda online minimalista construida con Next.js 14 (App Router), Tailwind CSS 4, componentes accesibles (Radix UI) y pagos con Stripe Checkout. Incluye catálogo, carrito persistente en `localStorage`, filtros básicos y flujo de pago con cálculo de envío.

### Características
- **UI minimalista** con Tailwind y componentes reutilizables.
- **Catálogo** desde `lib/products.json` con productos destacados.
- **Carrito de compras** con contexto (`contexts/cart-context.tsx`), persistencia y control de stock.
- **Checkout con Stripe** usando Checkout Session en `app/api/checkout/route.ts`.
- **Regla de envío**: si el subtotal es ≤ €50, se añade un ítem de envío de €5.99.
- **Páginas principales**: inicio, productos, detalle de producto, carrito, éxito, contacto y acerca de.

### Stack técnico
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 4** y `tailwindcss-animate`
- **Radix UI + shadcn/ui** (botones, tarjetas, menús, etc.)
- **Stripe** (`stripe` en servidor, `@stripe/stripe-js` en cliente)
- **Zod**, `react-hook-form`, `date-fns`, `embla-carousel-react`, `recharts`, `lucide-react`

### Estructura del proyecto
- `app/` páginas, rutas y API (App Router)
  - `api/checkout/route.ts`: crea la sesión de Stripe Checkout
  - `products/`, `cart/`, `success/`, etc.
- `components/` componentes UI y de dominio
- `contexts/cart-context.tsx` contexto de carrito
- `lib/`
  - `products.json` datos de ejemplo
  - `stripe.ts` carga de Stripe en cliente
  - `types.ts`, `utils.ts`
- `public/` imágenes

### Requisitos previos
- Node.js 18+
- Cuenta de Stripe y claves API

### Variables de entorno
Crea un archivo `.env.local` en la raíz con:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
Notas:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` se usa en cliente (`lib/stripe.ts`).
- `STRIPE_SECRET_KEY` se usa en servidor (`app/api/checkout/route.ts`).
- La moneda configurada es **EUR**.

### Instalación
Usa el gestor que prefieras.
```bash
# con npm
npm install

# con pnpm
pnpm install
```

### Scripts
```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
npm run start   # iniciar servidor de producción
npm run lint    # (lint deshabilitado durante build en next.config)
```

### Flujo de compra (resumen)
1. El usuario añade productos al carrito desde listado o detalle.
2. En `Cart`, el botón de checkout envía `items` a `POST /api/checkout`.
3. El endpoint crea `line_items` (incluye envío si aplica) y devuelve `sessionId`.
4. El cliente redirige a Stripe Checkout; tras pagar, vuelve a `/success`.

### Personalización rápida
- Edita productos en `lib/products.json` (precio, stock, imagen, categoría, destacado).
- Ajusta la regla de envío en `app/api/checkout/route.ts` (umbral y coste).
- Cambia estilos en `app/globals.css` o utilidades Tailwind.

### Despliegue
- Compatible con Vercel y plataformas Node. Asegura variables de entorno en el proveedor.
- En `next.config.mjs` se ignoran errores de ESLint/TypeScript en build y `images.unoptimized: true`.

### Seguridad
- No expongas `STRIPE_SECRET_KEY`. Solo en servidor (API Route).
- Valida entrada si integras datos dinámicos (actualmente el catálogo es local).

### Licencia
Uso educativo/demostrativo. Adapta o agrega una licencia si lo vas a publicar.
