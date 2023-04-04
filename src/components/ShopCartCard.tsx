import Image from 'next/image'
import { Minus, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { ProductProps } from '../types/ProductProps'

interface ShopCartCardProds {
  product: ProductProps
}

export default function ShopCartCard({ product }: ShopCartCardProds) {
  const [quantity, setQuantity] = useState(product.quantity)

  return (
    <div id="item" className="w-96 flex gap-5 border-b-2 pb-6 mt-4">
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
            <button>
              <Minus weight="bold" className="text-violet-800 text-base" />
            </button>
            <span className="text-sm">{quantity}</span>
            <button>
              <Plus weight="bold" className="text-violet-800 text-base" />
            </button>
          </div>
          <div
            id="remove"
            className="flex items-center gap-1 p-1 px-2 rounded bg-base-button"
          >
            <Trash weight="bold" className="text-violet-800 " />
            <button className="text-xs text-base-text uppercase">
              remover
            </button>
          </div>
        </div>
      </div>
      <div className="price">
        <h4 className="text-base-text text-base leading-4 ml-10 whitespace-nowrap">
          {product.price}
        </h4>
      </div>
    </div>
  )
}
