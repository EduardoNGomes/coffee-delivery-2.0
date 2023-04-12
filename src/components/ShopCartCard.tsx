import Image from 'next/image'
import { Minus, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { ProductProps } from '../types/ProductProps'

import { useAppDispatch } from '@/redux/hooks'

import {
  increaseItemQuantity,
  decreaseItem,
  decreaseItemQuantity,
} from '@/redux/reduxFeatures/cart/cartSlice'

interface ShopCartCardProds {
  product: ProductProps
}

export default function ShopCartCard({ product }: ShopCartCardProds) {
  const [quantity, setQuantity] = useState(product.quantity)

  const dispatch = useAppDispatch()

  function handleQuantityDecrease() {
    if (quantity === 1) {
      return alert('Quantidade minima atendida')
    }
    setQuantity((prevState) => prevState! - 1)
    dispatch(decreaseItemQuantity(product))
  }
  function handleQuantityIncrease() {
    setQuantity((prevState) => prevState! + 1)
    dispatch(increaseItemQuantity(product))
  }
  function handleRemoveItem() {
    dispatch(decreaseItem(product))
  }

  return (
    <div
      id="item"
      className="flex flex-col items-center gap-5 border-b-2 pb-6 mt-4 md:w-96 md:flex-row md:items-start"
    >
      <Image
        src={product.image}
        alt="Coffee's image"
        width={100}
        height={100}
      />
      <div id="information" className="flex flex-col gap-2">
        <h3 className="text-base-sub-title text-base leading-4 capitalize">
          {product.name}
        </h3>
        <div id="increase-decrease" className=" flex gap-2">
          <div className="flex items-center gap-2 bg-base-button p-1 px-2 rounded">
            <button onClick={handleQuantityDecrease}>
              <Minus
                weight="bold"
                className="text-violet-800 text-base transition-all duration-300 hover:text-black"
              />
            </button>
            <span className="text-sm">{quantity}</span>
            <button onClick={handleQuantityIncrease}>
              <Plus
                weight="bold"
                className="text-violet-800 text-base transition-all duration-300 hover:text-black"
              />
            </button>
          </div>
          <div
            id="remove"
            className="rounded bg-base-button transition-all duration-300 hover:bg-base-hover"
          >
            <button
              onClick={handleRemoveItem}
              className="flex items-center gap-1 text-sm text-base-text uppercase p-1 px-2 "
            >
              <Trash weight="bold" className="text-violet-800 " />
              remover
            </button>
          </div>
        </div>
      </div>
      <div className="price">
        <h4 className="text-base-text text-base leading-4 whitespace-nowrap">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price * product.quantity!)}
        </h4>
      </div>
    </div>
  )
}
