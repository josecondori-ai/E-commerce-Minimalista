import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping if applicable
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    if (subtotal <= 50) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Envío",
            description: "Gastos de envío",
          },
          unit_amount: 599, // €5.99 in cents
        },
        quantity: 1,
      })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      automatic_tax: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ["ES", "FR", "DE", "IT", "PT"],
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}
