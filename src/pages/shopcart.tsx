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
import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [loading, setLoading] = useState(false)

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

  if (products.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center mt-10 p-10 bg-base-card rounded w-full text-center">
        <h1 className="text-2xl leading-10 text-violet-600">
          Ainda não há produtos selecionados
        </h1>
        <Link
          href="/"
          className="text-base-title capitalize transition-all duration-300 hover:text-violet-600 hover:underline"
        >
          voltar
        </Link>
      </main>
    )
  }

  async function onSubmit(data: FormProps) {
    dispatch(createAddress(data))
    setLoading(true)

    try {
      const productsList = products.map((product) => {
        return { price: product.defaultPriceId, quantity: product.quantity }
      })

      const response = await axios.post('/api/checkout', { productsList })

      window.location.href = response.data.checkoutUrl
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const { zipCode, city, complements, houseNumber, neighborhood, street, uf } =
    watch()

  async function getData() {
    if (zipCode.length !== 8) {
      return toast.warning('Preencha os 8 dígitos(apenas números)', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    )
    if (response.status !== 200) {
      return toast.error('CEP inválido', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    setValue('zipCode', response.data.cep)
    setValue('city', response.data.localidade)
    setValue('street', response.data.logradouro)
    setValue('uf', response.data.uf)
    setValue('neighborhood', response.data.bairro)
  }

  return (
    <main className="mt-10 px-10 flex flex-col gap-8  md:flex-row">
      <section>
        <h2 className="text-lg font-bold text-base-sub-title ">
          Complete seu pedido
        </h2>
        <aside className="bg-base-card p-10 mt-4 rounded-md ">
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
          <form id="address" className="flex flex-col gap-4 justify-between ">
            <div
              id="zipCode"
              className="flex flex-col md:flex-row md:items-center gap-2 "
            >
              <label
                htmlFor="zipCode"
                className="flex flex-col justify-center gap-1 "
              >
                <input
                  required
                  type="text"
                  placeholder="CEP"
                  className="text-sm md:text-base p-3 rounded bg-base-input border border-solid border-base-button focus:outline-violet-600 focus:outline-1"
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
              <button
                onClick={getData}
                type="button"
                className=" bg-yellow-500 md:bg-transparent p-2 rounded w-full md:w-10 flex justify-center md:justify-start"
              >
                <MagnifyingGlass
                  weight="bold"
                  className="text-sm md:text-2xl text-white md:text-yellow-500 md:hover:text-yellow-400"
                />
                {errors.zipCode && <span className="h-12"> </span>}
              </button>
              <ToastContainer autoClose={1000} />
            </div>
            <div id="street">
              <label htmlFor="street" className="flex flex-col gap-1">
                <input
                  required
                  type="text"
                  placeholder="Rua"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
            <div
              id="number-complements"
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <label htmlFor="number" className="flex flex-col gap-1">
                <input
                  required
                  type="text"
                  placeholder="Numero"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
                  placeholder="Complemento(opcional)"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
            <div
              id="address-information"
              className="grid grid-cols-1 gap-3 md:grid-cols-3"
            >
              <label htmlFor="neighborhood" className="flex flex-col gap-1">
                <input
                  required
                  type="text"
                  placeholder="Bairro"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
                  required
                  type="text"
                  placeholder="Cidade"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
                  required
                  type="text"
                  placeholder="UF"
                  className="p-3 text-sm md:text-base rounded bg-base-input border border-solid border-base-button w-full focus:outline-violet-600 focus:outline-1  "
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
          <aside className="bg-base-card rounded-md rounded-tr-3xl rounded-bl-3xl p-10 mt-4 ">
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

              <p className="flex justify-between text-base-sub-title text-xl leading-4">
                Total:
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalQuantity)}
                </span>
              </p>
            </div>
            <button
              className="mt-6 w-full uppercase transition-all duration-300 bg-yellow-500 hover:bg-yellow-400 text-white p-3 rounded leading-5 text-sm font-bold disabled:cursor-wait disabled:bg-yellow-900"
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={!!loading}
            >
              confirmar pedido
            </button>
          </aside>
        </h2>
      </section>
    </main>
  )
}
