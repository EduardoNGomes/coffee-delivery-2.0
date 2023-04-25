import { render } from '@testing-library/react'
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
describe('CardItem component ', () => {
  it('should render cardItem', async () => {
    const { getAllByRole, getByTestId } = render(
      <Provider store={store}>
        <CardItem product={product} />
      </Provider>,
    )

    const buttons = getAllByRole('button')
    // const button = getByTestId('buttonAdd')

    const span = getByTestId('span')
    // buttons[0] == removeButton
    // buttons[1] == addButton
    // buttons[2] == buyButton
    expect(span).toHaveTextContent('1')
    await user.click(buttons[1])
    expect(span).toHaveTextContent('2')
  })
})
