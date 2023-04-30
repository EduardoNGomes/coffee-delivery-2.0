import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ShopCartCard from '@/components/ShopCartCard'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const user = userEvent.setup()

const mockProduct = {
  id: '123',
  name: 'Cafe',
  description: 'Cafe com acucar',
  image: '/cafe',
  price: 9.9,
  quantity: 1,
  formatPrice: 'R$ 9,90',
  defaultPriceId: 'MockPrice',
}
// data-testid="buttonIncrease"
// data-testid="allPrice"
// data-testid="quantity"
// data-testid="buttonDecrease"

describe('Test ShopCartCard  ', () => {
  it('should verify quantity in component', () => {
    render(
      <Provider store={store}>
        <ShopCartCard product={mockProduct} />
      </Provider>,
    )
    const quantity = screen.getByTestId('quantity')
    expect(quantity).toHaveTextContent('1')
  })
  it('should increase quantity', async () => {
    render(
      <Provider store={store}>
        <ShopCartCard product={mockProduct} />
      </Provider>,
    )

    const quantity = screen.getByTestId('quantity')
    const buttonIncrease = screen.getByTestId('buttonIncrease')
    await user.click(buttonIncrease)
    expect(quantity).toHaveTextContent('2')
  })
  it('should decrease quantity', async () => {
    render(
      <Provider store={store}>
        <ShopCartCard product={mockProduct} />
      </Provider>,
    )

    const buttonIncrease = screen.getByTestId('buttonIncrease')
    await user.click(buttonIncrease)

    const buttonDecrease = screen.getByTestId('buttonDecrease')
    await user.click(buttonDecrease)

    const quantity = screen.getByTestId('quantity')
    expect(quantity).toHaveTextContent('1')
  })
  it('should not decrease quantity', async () => {
    render(
      <Provider store={store}>
        <ShopCartCard product={mockProduct} />
      </Provider>,
    )

    const quantity = screen.getByTestId('quantity')
    const buttonDecrease = screen.getByTestId('buttonDecrease')
    await user.click(buttonDecrease)
    expect(quantity).toHaveTextContent('1')
  })
  it('should not decrease quantity', async () => {
    render(
      <Provider store={store}>
        <ShopCartCard product={mockProduct} />
      </Provider>,
    )

    const allPrice = screen.getByTestId('allPrice')
    expect(allPrice).toHaveTextContent('R$ 9,90')

    const buttonIncrease = screen.getByTestId('buttonIncrease')

    await user.click(buttonIncrease)

    setInterval(() => {
      expect(allPrice).toHaveTextContent('R$ 19,80')
    }, 1)
  })
})
