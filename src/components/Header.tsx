import Image from 'next/image'
import Logo from '../assets/logo.svg'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'

export default function Header() {
  return (
    <header className="flex justify-between ">
      <Image alt="coffee delivery logo" src={Logo} width={84} height={40} />
      <div className="flex gap-3">
        <div className="h-10 bg-purple-100 p-2 rounded-md">
          <p className="flex gap-1 justify-center align-middle text-purple-700 font-normal text-sm ">
            <span>
              <MapPin weight="fill" className="text-violet-800 text-xl" />
            </span>
            Porto Alegre,RS
          </p>
        </div>
        <button className="bg-yellow-100 p-2 rounded-md h-10">
          <span>
            <ShoppingCart weight="fill" className="text-yellow-800 text-xl" />
          </span>
        </button>
      </div>
    </header>
  )
}
