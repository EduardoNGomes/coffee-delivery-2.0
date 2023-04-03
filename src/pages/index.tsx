import Image from 'next/image'
import mainImage from '../assets/main-image.svg'
import CardItem from '@/components/CardItems'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { ProductProps } from '@/types/ProductProps'
import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'

interface HomeProps {
  productsResponse: ProductProps[]
}

export default function Home({ productsResponse }: HomeProps) {
  return (
    <main>
      <section className="flex mt-28 gap-16 items-center">
        <div>
          <div className="flex flex-col gap-3">
            <h1 className="font-extrabold text-5xl text-base-title leading-tight">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className="text-base-sub-title text-xl font-normal font-">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </div>
          <div>
            <ul className="mt-20 grid grid-cols-2 gap-6">
              <li className="flex items-center gap-3 text-base-text text-base font-normal">
                <div className="w-8 h-8 bg-yellow-700 flex items-center justify-center rounded-full">
                  <ShoppingCart weight="fill" className="text-white" />
                </div>
                Compra simples e segura
              </li>
              <li className="flex items-center gap-3 text-base-text text-base font-normal">
                <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full">
                  <Timer weight="fill" className="text-white" />
                </div>
                Entrega rápida e rastreada
              </li>
              <li className="flex items-center gap-3 text-base-text text-base font-normal">
                <div className="w-8 h-8 bg-base-text flex items-center justify-center rounded-full">
                  <Package weight="fill" className="text-white" />
                </div>
                Embalagem mantém o café intacto
              </li>
              <li className="flex items-center gap-3 text-base-text text-base font-normal">
                <div className="w-8 h-8 bg-violet-800 flex items-center justify-center rounded-full">
                  <Coffee weight="fill" className="text-white" />
                </div>
                O café chega fresquinho até você
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={mainImage}
          alt="A big cup of coffee"
          width={476}
          height={360}
        />
      </section>
      <section className="mt-40">
        <h2 className="font-bold text-4xl text-base-sub-title">Nossos cafés</h2>
        <div className="mt-14 grid grid-cols-4 gap-5">
          {productsResponse.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    limit: 20,
    expand: ['data.default_price'],
  })

  const productsResponse = response.data.map((product) => {
    const price = product.default_price! as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      productsResponse,
    },
  }
}
