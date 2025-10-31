// app/api/donation/create-checkout-session/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  // ✅ Instanciamos o Stripe dentro do handler, garantindo que a variável de ambiente
  // só é lida em runtime e não quebra o build
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!stripeSecret || !baseUrl) {
    console.error(
      'Erro: variáveis de ambiente STRIPE_SECRET_KEY ou NEXT_PUBLIC_BASE_URL não definidas'
    )
    return NextResponse.json(
      { error: 'Configuração do servidor incorreta' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2025-10-29.clover',
  })

  try {
    const { amount } = await req.json()

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Valor inválido' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Doação ao projeto I Ching',
            },
            unit_amount: Math.round(amount * 100), // cêntimos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Erro Stripe:', error)
    return NextResponse.json({ error: 'Erro ao criar sessão' }, { status: 500 })
  }
}
