import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { productsList } = req.body

  if (req.method !== `POST`) {
    return res.status(405).json({ error: `method not allowed` })
  }
  if (!productsList) {
    return res.status(400).json({ error: `productsList not found` })
  }

  const successUrl = 'http://localhost:3000/success'
  const cancelUrl = 'http://localhost:3000/'

  const session = await stripe.checkout.sessions.create({
    line_items: productsList,
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
  })

  return res.status(201).json({
    checkoutUrl: session.url,
  })
}
