import Image from 'next/image'
import { ProductProps } from '@/types/ProductProps'

import { useState } from 'react'
import { ShoppingCart } from '@phosphor-icons/react'

interface CardItemProps {
  product: ProductProps
}

export default function CardItem({ product }: CardItemProps) {
  const [quantity, setQuantity] = useState(1)

  function handleDecreaseQuantity() {
    if (quantity === 1) {
      return alert('Quantidade minina')
    }
    setQuantity((prevState) => prevState - 1)
  }

  function handleIncreaseQuantity() {
    setQuantity((prevState) => prevState + 1)
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
      <div className="flex flex-col gap-2">
        <h3 className="text-center font-bold text-xl text-base-sub-title">
          {product.name}
        </h3>
        <p className="text-center font-normal text-base text-base-label">
          {product.description}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <p className="mr-3 text-base-text text-lg font-extrabold">
          {product.price}
        </p>
        <div className="flex items-center justify-around p-1 w-16 h-10 bg-base-button rounded-lg">
          <button
            className="text-base text-violet-700 p-1"
            onClick={handleDecreaseQuantity}
          >
            &minus;
          </button>
          <span className="text-base text-base-title">{quantity}</span>
          <button
            className="text-base text-violet-700 p-1"
            onClick={handleIncreaseQuantity}
          >
            &#43;
          </button>
        </div>

        <button className="bg-violet-800 rounded-md w-9 h-9 flex justify-center items-center">
          <ShoppingCart weight="fill" className="text-white text-xl" />
        </button>
      </div>
    </div>
  )
}
