import ShopCartCard from '@/components/ShopCartCard'
import { MagnifyingGlass, MapPinLine } from '@phosphor-icons/react'

import { useAppSelector } from '@/redux/hooks'
import { selectorTotalValue } from '@/redux/reduxFeatures/cart/cartSelector'

import { useForm } from 'react-hook-form'

import Link from 'next/link'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  zipCode: z
    .string()
    .min(1, 'Campo obrigatorio')
    .max(9, 'Padrao de email: XXXXX-XXX')
    .refine((value: any) => /^\d{2}\d{3}[-]\d{3}$/gm.test(value)),
  street: z.string().min(1, 'Campo obrigatorio'),
  houseNumber: z.string().min(1, 'Campo obrigatorio'),
  complements: z.string().min(1, 'Campo obrigatorio'),
  neighborhood: z.string().min(1, 'Campo obrigatorio'),
  city: z.string().min(1, 'Campo obrigatorio'),
  uf: z.string().min(1, 'Campo obrigatorio'),
})

type FormProps = z.infer<typeof FormSchema>

export default function ShopCart() {
  const { products } = useAppSelector((state) => state.cartReducer)
  const totalQuantity = useAppSelector((state) => selectorTotalValue(state))

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
  })

  const deliveryPrice = 5

  if (products.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center mt-10 p-10 bg-base-card rounded w-full text-center">
        <h1 className="text-2xl leading-10 text-violet-600">Carrinho vazio</h1>
        <Link href="/" className="text-base-title">
          voltar
        </Link>
      </main>
    )
  }

  function onSubmit(data: FormProps) {
    console.log(data)
  }

  const zip = watch('zipCode')
  return (
    <main className="mt-10 flex gap-8">
      <section>
        <h2 className="text-lg font-bold text-base-sub-title ">
          Complete seu pedido
        </h2>
        <aside className="bg-base-card p-10 mt-4 rounded-md">
          <div id="text" className="flex  gap-2 mb-8">
            <MapPinLine className="text-yellow-600 text-2xl" />
            <div>
              <h3 className="text-base-sub-title text-base leading-4">
                Endereco de entrega
              </h3>
              <p className="text-base-text text-sm leading-5">
                Informe o endereco aonde deseja receber seu produto
              </p>
            </div>
          </div>
          <form id="address" className="flex flex-col gap-4 justify-between">
            <div id="zipCode" className="flex items-center gap-2">
              <label htmlFor="zipCode" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="CEP"
                  className="p-3 rounded bg-base-input border border-solid border-base-button"
                  {...register('zipCode')}
                />
                {errors.zipCode && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.zipCode.message}
                  </span>
                )}
              </label>
              <button>
                <MagnifyingGlass size={32} weight="bold" />
              </button>
            </div>
            <div id="street">
              <label htmlFor="street" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Rua"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  // {...register('street')}
                  value={zip}
                  defaultValue=""
                />
                {errors.street && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.street.message}
                  </span>
                )}
              </label>
            </div>
            <div id="number-complements" className="grid grid-cols-2 gap-3">
              <label htmlFor="number" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Numero"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('houseNumber')}
                />
                {errors.houseNumber && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.houseNumber.message}
                  </span>
                )}
              </label>

              <label htmlFor="complements" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Complemento"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('complements')}
                />
                {errors.complements && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.complements.message}
                  </span>
                )}
              </label>
            </div>
            <div id="address-information" className="grid grid-cols-3 gap-3">
              <label htmlFor="neighborhood" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Bairro"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('neighborhood')}
                />
                {errors.neighborhood && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.neighborhood.message}
                  </span>
                )}
              </label>
              <label htmlFor="city" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Cidade"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('city')}
                />
                {errors.city && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.city.message}
                  </span>
                )}
              </label>
              <label htmlFor="uf" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="UF"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('uf')}
                />
                {errors.uf && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.uf.message}
                  </span>
                )}
              </label>
            </div>
          </form>
        </aside>
      </section>
      <section>
        <h2 className="text-lg font-bold text-base-sub-title ">
          Cafes selecionados
          <aside className="bg-base-card rounded-md rounded-tr-3xl rounded-bl-3xl p-10 mt-4">
            {products.map((product) => (
              <ShopCartCard key={product.id} product={product} />
            ))}

            <div id="prices" className="mt-6 flex flex-col gap-3">
              <p className="flex justify-between text-base-text text-sm leading-4">
                Total de itens:
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalQuantity)}
                </span>
              </p>
              <p className="flex justify-between text-base-text text-sm leading-4">
                Entrega:
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(deliveryPrice)}
                </span>
              </p>
              <p className="flex justify-between text-base-sub-title text-xl leading-4">
                Total:
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalQuantity + deliveryPrice)}
                </span>
              </p>
            </div>
            <button
              className="mt-6 w-full uppercase bg-yellow-500 text-white p-3 rounded leading-5 text-sm font-bold"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              confirmar pedido
            </button>
          </aside>
        </h2>
      </section>
    </main>
  )
}
