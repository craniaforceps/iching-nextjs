import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Lazy-load do Stripe
let StripeSDK: Stripe | null = null
function getStripe() {
  if (!StripeSDK) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Stripe key não definida')
    StripeSDK = new Stripe(key, { apiVersion: '2025-10-29.clover' })
  }
  return StripeSDK
}

// Handler da rota
export async function POST(req: Request) {
  const stripe = getStripe() // pega a instância do Stripe
  const { amount } = await req.json()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: 'Doação ao projeto I Ching' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}/cancel`,
  })

  return NextResponse.json({ url: session.url })
}
