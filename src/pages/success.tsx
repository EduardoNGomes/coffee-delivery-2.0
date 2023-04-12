import Image from 'next/image'
import successImage from '../assets/Illustration.png'
import { MapPin, Timer } from '@phosphor-icons/react'
import { AddressProps } from '@/types/AddressProps'
import { useEffect, useState } from 'react'

export default function Success() {
  const [address, setAddress] = useState<AddressProps>({
    city: '',
    complements: '',
    houseNumber: '',
    street: '',
    neighborhood: '',
    uf: '',
    zipCode: '',
  })

  useEffect(() => {
    const addressString = localStorage.getItem('@coffee-delivery-address')
    setAddress(JSON.parse(addressString!))
  }, [])

  return (
    <main className="flex flex-col md:flex-row justify-between items-center p-10 md:mt-40 ">
      <section>
        <h1 className="text-yellow-700 font-extrabold text-4xl mb-2">
          Uhu! pedido confirmado
        </h1>
        <p className="mb-10 text-xl left-7 text-base-sub-title">
          Agora é só aguardar que logo o café chegará até você
        </p>

        <div className="rounded-md rounded-tr-3xl rounded-bl-3xl  border-solid border border-violet-900 p-10">
          <ul className="flex flex-col gap-8">
            <li className="flex gap-3 items-center text-base text-base-text leading-4">
              <span className="p-2 rounded-full bg-violet-700 text-white text-base">
                <MapPin weight="fill" />
              </span>
              <div className="flex flex-col">
                <p className="">
                  Entrega em{' '}
                  <span className="font-bold">
                    {address && address.street},{' '}
                    {address && address.houseNumber}
                  </span>
                </p>
                <p>
                  {address && address.neighborhood} - {address && address.city},{' '}
                  {address && address.uf}
                </p>
              </div>
            </li>
            <li className="flex gap-2 items-center text-base text-base-text leading-4">
              <span className="p-2 rounded-full bg-yellow-500 text-white text-base">
                <Timer weight="fill" />
              </span>
              <div className="flex flex-col">
                <p>Previsão de entrega </p>
                <p className="font-bold">20 min - 30 min </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <Image
          src={successImage}
          width={492}
          height={293}
          alt="Man above motorcycle"
        />
      </section>
    </main>
  )
}
