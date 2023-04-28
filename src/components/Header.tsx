import Image from 'next/image'
import Logo from '../assets/logo.svg'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import Link from 'next/link'
import { selectorTotalProductsQuantity } from '@/redux/reduxFeatures/cart/cartSelector'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Header() {
  const [neighborhood, setNeighborhood] = useState('Brasil')
  const [uf, setUf] = useState('BR')

  const totalQuantityItem = useAppSelector((state) =>
    selectorTotalProductsQuantity(state),
  )

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(showPosition)
      async function showPosition(position: any) {
        const res = await axios.get(
          'https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ&location=' +
            position.coords.latitude +
            '%2C' +
            position.coords.longitude +
            '&outFormat=json&thumbMaps=false',
        )
        if (res.status === 200) {
          setNeighborhood(res.data.results[0].locations[0].adminArea6)
          setUf(res.data.results[0].locations[0].adminArea3)
        }
      }
    } catch (error) {
      console.log('Cannot get your location', error)
    }
  }, [])

  return (
    <header className="flex justify-between p-2  max-w-6xl mt-0 mx-auto">
      <Link href="/" replace>
        <Image alt="coffee delivery logo" src={Logo} width={84} height={40} />
      </Link>
      <div className="flex gap-3">
        <div className="h-10 bg-purple-100 p-2 rounded-md">
          <p className="flex gap-1 justify-center align-middle text-purple-700 font-normal text-sm ">
            <span>
              <MapPin weight="fill" className="text-violet-800 text-xl" />
            </span>
            {neighborhood},{uf}
          </p>
        </div>
        <Link href="/shopcart" replace>
          <button className="bg-yellow-200 p-2 rounded-md h-10 relative transition-all duration-300 hover:bg-yellow-500">
            <span>
              <ShoppingCart
                weight="fill"
                className="text-yellow-800 text-xl  "
              />
            </span>
            <span
              data-testid="allProductsQuantity"
              className=" bg-yellow-800 text-white text-xs  w-4 h-4  rounded-full absolute -top-1 -right-1 flex justify-center items-center"
            >
              {totalQuantityItem}
            </span>
          </button>
        </Link>
      </div>
    </header>
  )
}
