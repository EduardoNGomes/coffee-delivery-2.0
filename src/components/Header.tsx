import Image from 'next/image'
import Logo from '../assets/logo.svg'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import Link from 'next/link'
import { selectorTotalProductsQuantity } from '@/redux/reduxFeatures/cart/cartSelector'
import { useAppSelector } from '@/redux/hooks'

export default function Header() {
  const totalQuantityItem = useAppSelector((state) =>
    selectorTotalProductsQuantity(state),
  )

  return (
    <header className="flex justify-between ">
      <Link href="/" replace>
        <Image alt="coffee delivery logo" src={Logo} width={84} height={40} />
      </Link>
      <div className="flex gap-3">
        <div className="h-10 bg-purple-100 p-2 rounded-md">
          <p className="flex gap-1 justify-center align-middle text-purple-700 font-normal text-sm ">
            <span>
              <MapPin weight="fill" className="text-violet-800 text-xl" />
            </span>
            Porto Alegre,RS
          </p>
        </div>
        <Link href="/shopcart" replace>
          <button className="bg-yellow-100 p-2 rounded-md h-10 relative">
            <span>
              <ShoppingCart weight="fill" className="text-yellow-800 text-xl" />
            </span>
            <span className=" bg-yellow-800 text-white text-xs  px-1  rounded-full absolute -top-1 -right-1">
              {totalQuantityItem}
            </span>
          </button>
        </Link>
      </div>
    </header>
  )
}
