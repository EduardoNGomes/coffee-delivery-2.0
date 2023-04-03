import Image from 'next/image'
import imgTest from '../assets/Type=Americano.png'
import { Minus, Plus, Trash } from '@phosphor-icons/react'

export default function ShopCartCard() {
  return (
    <div id="item" className="w-96 flex gap-5 border-b-2 pb-6">
      <Image src={imgTest} alt="Coffee's image" className="w-16 h-16" />
      <div id="information" className="flex flex-col gap-2">
        <h3 className="text-base-sub-title text-base leading-4 capitalize">
          expresso tradicional
        </h3>
        <div id="increase-decrease" className=" flex gap-2">
          <div className="flex items-center gap-2 bg-base-button p-1 px-2 rounded">
            <button>
              <Minus weight="bold" className="text-violet-800 text-base" />
            </button>
            <span className="text-sm">1</span>
            <button>
              <Plus weight="bold" className="text-violet-800 text-base" />
            </button>
          </div>
          <div
            id="remove"
            className="flex items-center gap-1 p-1 px-2 rounded bg-base-button"
          >
            <Trash weight="bold" className="text-violet-800 " />
            <button className="text-xs text-base-text">remover</button>
          </div>
        </div>
      </div>
      <div className="price">
        <h4 className="text-base-text text-base leading-4 ml-10 whitespace-nowrap">
          RS 9,90
        </h4>
      </div>
    </div>
  )
}
