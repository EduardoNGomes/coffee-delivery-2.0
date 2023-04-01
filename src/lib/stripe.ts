import Stripe from 'stripe'

export const stripe = new Stripe(
  'sk_test_51MlFQLHxD3JQhIZlSPlCAjO1JKzHYEGzKxMfYUTUaYvGrvysmYz5W9mjQnT6IkpXSfIijWZzCOErl8CaSnbWX7LQ00CDtGId5j',
  {
    apiVersion: '2022-11-15',
  },
)
