import ShopCartCard from '@/components/ShopCartCard'
import { useAppSelector } from '@/redux/hooks'
import { MapPinLine } from '@phosphor-icons/react'

export default function ShopCart() {
  const { products } = useAppSelector((state) => state.cartReducer)

  console.log(products)

  return (
    <main className="mt-10 flex gap-8">
      <section>
        <h2 className="text-lg font-bold text-base-sub-title ">
          Complete seu pedido
        </h2>
        <aside className="bg-base-card p-10 mt-4 rounded-md">
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
          <div id="address" className="flex flex-col gap-4">
            <div id="zid-code">
              <label htmlFor="zid-code" />
              <input
                type="text"
                name="zid-code"
                placeholder="CEP"
                className="p-3 rounded bg-base-input border border-solid border-base-button"
              />
            </div>
            <div id="street">
              <label htmlFor="street" />
              <input
                type="text"
                name="street"
                placeholder="Rua"
                className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
              />
            </div>
            <div id="number-complements" className="grid grid-cols-2 gap-3">
              <label htmlFor="number">
                <input
                  type="number"
                  name="number"
                  placeholder="Numero"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                />
              </label>
              <label htmlFor="complements">
                <input
                  type="street"
                  name="complements"
                  placeholder="Complemento"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                />
              </label>
            </div>
            <div id="address-information" className="grid grid-cols-3 gap-3">
              <label htmlFor="neighborhood">
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="Bairro"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                />
              </label>
              <label htmlFor="city">
                <input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                />
              </label>
              <label htmlFor="uf">
                <input
                  type="text"
                  name="uf"
                  placeholder="UF"
                  className="p-3 rounded bg-base-input border border-solid border-base-button w-full"
                />
              </label>
            </div>
          </div>
        </aside>
      </section>
      <section>
        <h2 className="text-lg font-bold text-base-sub-title ">
          Cafes selecionados
          <aside className="bg-base-card rounded-md rounded-tr-3xl rounded-bl-3xl p-10 mt-4">
            {products.map((product) => (
              <ShopCartCard key={product.id} product={product} />
            ))}

            <div id="prices" className="mt-6 flex flex-col gap-3">
              <p className="flex justify-between text-base-text text-sm leading-4">
                Total de itens <span>R$ 29,70</span>
              </p>
              <p className="flex justify-between text-base-text text-sm leading-4">
                Entrega <span>RS 5,00</span>
              </p>
              <p className="flex justify-between text-base-sub-title text-xl leading-4">
                Total <span>R$ 60,00</span>
              </p>
            </div>
            <button className="mt-6 w-full uppercase bg-yellow-500 text-white p-3 rounded leading-5 text-sm font-bold">
              confirmar pedido
            </button>
          </aside>
        </h2>
      </section>
    </main>
  )
}
