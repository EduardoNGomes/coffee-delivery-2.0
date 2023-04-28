import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../pages/index'
import Header from '@/components/Header'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const user = userEvent.setup()

const product = {
  id: '1',
  name: 'Cafe',
  description: 'Cafe com acucar',
  image: '/cafe',
  price: 32,
  formatPrice: 'R$9,90',
  defaultPriceId: 'price',
}

describe('Render Home page with Products and test shopButton ', () => {
  it('should render', async () => {
    render(
      <Provider store={store}>
        <Header />
        <Home productsResponse={[product]} />
      </Provider>,
    )

    const shopButton = screen.getByTestId('shopButton')
    await user.click(shopButton)
    const allProductsQuantity = screen.getByTestId('allProductsQuantity')

    expect(allProductsQuantity).toHaveTextContent('1')
  })
})
