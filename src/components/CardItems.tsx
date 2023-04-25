import Image from 'next/image'
import { ProductProps } from '@/types/ProductProps'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react'

import { useAppDispatch } from '@/redux/hooks'
import { increaseItem } from '@/redux/reduxFeatures/cart/cartSlice'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

interface CardItemProps {
  product: ProductProps
}

export default function CardItem({ product }: CardItemProps) {
  const dispatch = useAppDispatch()

  const [quantity, setQuantity] = useState(1)

  function handleDecreaseQuantity() {
    if (quantity === 1) {
      return toast.error('Quantidade mínima atingida')
    }
    setQuantity((prevState) => prevState - 1)
  }

  function handleIncreaseQuantity() {
    setQuantity((prevState) => prevState + 1)
  }

  function handleAddProduct() {
    dispatch(increaseItem({ ...product, quantity }))
    toast.success('Produto adicionado ao carrinho')
  }

  return (
    <div className="bg-base-card rounded-md rounded-tr-3xl rounded-bl-3xl relative flex flex-col gap-6 items-center p-5">
      <Image
        src={product.image}
        alt=""
        width={120}
        height={120}
        className="-mt-10"
        priority
      />
      <div className="flex flex-col gap-2 flex-1">
        <h3
          data-testid="h3"
          className="text-center font-bold text-xl text-base-sub-title"
        >
          {product.name}
        </h3>
        <p className="text-center font-normal text-base text-base-label">
          {product.description}
        </p>
      </div>

      <div className="flex gap-2 items-center ">
        <p className="mr-3 text-base-text text-lg font-extrabold">
          {product.formatPrice}
        </p>
        <div className="flex items-center justify-around p-1 w-16 h-10 bg-base-button rounded-lg">
          <button
            className="text-base text-violet-700 p-1 transition-all duration-300 hover:text-black"
            onClick={handleDecreaseQuantity}
          >
            <Minus />
          </button>
          <span data-testid="span" className="text-base text-base-title">
            {quantity}
          </span>
          <button
            className="text-base text-violet-700 p-1 transition-all duration-300 hover:text-black"
            onClick={handleIncreaseQuantity}
          >
            <Plus />
          </button>
        </div>

        <div>
          <button
            className="bg-violet-800 rounded-md w-9 h-9 flex justify-center items-center transition-all duration-300 hover:bg-violet-500"
            onClick={handleAddProduct}
          >
            <ShoppingCart weight="fill" className="text-white text-xl" />
          </button>
          <ToastContainer autoClose={1000} />
        </div>
      </div>
    </div>
  )
}
