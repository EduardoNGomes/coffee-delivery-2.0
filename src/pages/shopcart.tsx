import ShopCartCard from '@/components/ShopCartCard'
import { MagnifyingGlass, MapPinLine } from '@phosphor-icons/react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectorTotalValue } from '@/redux/reduxFeatures/cart/cartSelector'

import { useForm } from 'react-hook-form'

import Link from 'next/link'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { createAddress } from '@/redux/reduxFeatures/address/addressSlice'

const FormSchema = z.object({
  zipCode: z
    .string()
    .min(1, 'Campo obrigatorio')
    .max(9, 'Padrao de email: XXXXX-XXX')
    .refine((value: any) => /^\d{2}\d{3}[-]\d{3}$/gm.test(value)),
  street: z.string().min(1, 'Campo obrigatorio'),
  houseNumber: z.string().min(1, 'Campo obrigatorio'),
  complements: z.string(),
  neighborhood: z.string().min(1, 'Campo obrigatorio'),
  city: z.string().min(1, 'Campo obrigatorio'),
  uf: z.string().min(1, 'Campo obrigatorio'),
})

type FormProps = z.infer<typeof FormSchema>

export default function ShopCart() {
  const { products } = useAppSelector((state) => state.cartReducer)
  const totalQuantity = useAppSelector((state) => selectorTotalValue(state))

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zipCode: '',
      city: '',
      complements: '',
      houseNumber: '',
      neighborhood: '',
      street: '',
      uf: '',
    },
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

  async function onSubmit(data: FormProps) {
    dispatch(createAddress(data))

    try {
      const productsList = products.map((product) => {
        return { price: product.defaultPriceId, quantity: product.quantity }
      })

      const response = await axios.post('/api/checkout', { productsList })

      window.location.href = response.data.checkoutUrl
    } catch (error) {
      console.log(error)
    }
  }

  const { zipCode, city, complements, houseNumber, neighborhood, street, uf } =
    watch()

  async function getData() {
    if (zipCode.length !== 8) {
      return alert('cep invalid')
    }
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    )
    if (response.status !== 200) {
      return alert('cep invalid')
    }

    setValue('zipCode', response.data.cep)
    setValue('city', response.data.localidade)
    setValue('street', response.data.logradouro)
    setValue('uf', response.data.uf)
    setValue('neighborhood', response.data.bairro)
  }

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
                  value={zipCode}
                  onChange={(e) => setValue('zipCode', e.target.value)}
                />
                {errors.zipCode && (
                  <span className="text-sm text-red-600 ml-2 ">
                    {errors.zipCode.message}
                  </span>
                )}
              </label>
              <button onClick={getData} type="button">
                <MagnifyingGlass size={32} weight="bold" />
              </button>
            </div>
            <div id="street">
              <label htmlFor="street" className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Rua"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                  {...register('street')}
                  value={street}
                  onChange={(e) => setValue('street', e.target.value)}
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
                  value={houseNumber}
                  onChange={(e) => setValue('houseNumber', e.target.value)}
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
                  value={complements}
                  onChange={(e) => setValue('complements', e.target.value)}
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
                  value={neighborhood}
                  onChange={(e) => setValue('neighborhood', e.target.value)}
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
                  value={city}
                  onChange={(e) => setValue('city', e.target.value)}
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
                  value={uf}
                  onChange={(e) => setValue('uf', e.target.value)}
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
