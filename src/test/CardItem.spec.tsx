import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CardItem from '../components/CardItems'
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
describe('Render CardItem component and test functions', () => {
  it('should render cardItem ', () => {
    render(
      <Provider store={store}>
        <CardItem product={product} />
      </Provider>,
    )
    expect(screen.getByTestId('h3')).toHaveTextContent(product.name)
  })
  it('should increase quantity', async () => {
    render(
      <Provider store={store}>
        <CardItem product={product} />
      </Provider>,
    )

    const buttons = screen.getAllByRole('button')
    // const button = getByTestId('buttonAdd')
    const span = screen.getByTestId('span')
    // buttons[0] == removeButton
    // buttons[1] == addButton
    // buttons[2] == buyButton
    expect(span).toHaveTextContent('1')
    await user.click(buttons[1])
    expect(span).toHaveTextContent('2')
  })
  it('should not decrease quantity when quantity is 1', async () => {
    render(
      <Provider store={store}>
        <CardItem product={product} />
      </Provider>,
    )

    const buttons = screen.getAllByRole('button')
    // const button = getByTestId('buttonAdd')
    const span = screen.getByTestId('span')
    // buttons[0] == removeButton
    // buttons[1] == addButton
    // buttons[2] == buyButton
    expect(span).toHaveTextContent('1')
    await user.click(buttons[0])
    expect(span).toHaveTextContent('1')
  })
  it('should decrease quantity', async () => {
    render(
      <Provider store={store}>
        <CardItem product={product} />
      </Provider>,
    )

    const buttons = screen.getAllByRole('button')
    const span = screen.getByTestId('span')
    // buttons[0] == removeButton
    // buttons[1] == addButton
    // buttons[2] == buyButton
    expect(span).toHaveTextContent('1')
    await user.click(buttons[1])
    expect(span).toHaveTextContent('2')
    await user.click(buttons[0])
    expect(span).toHaveTextContent('1')
  })
})
