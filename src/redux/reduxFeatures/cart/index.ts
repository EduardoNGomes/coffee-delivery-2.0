import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ProductProps } from '../../../types/ProductProps'

interface CartState {
  products: ProductProps[]
}

const initialState: CartState = {
  products: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseItem: (state, action: PayloadAction<ProductProps>) => {
      const productExist = state.products.findIndex(
        (product) => product.id === action.payload.id,
      )
      if (productExist > -1) {
        const newProduct = state.products.splice(0, productExist)
        state.products = [...newProduct, { ...action.payload }]
      } else {
        state.products = [...state.products, { ...action.payload }]
      }
    },

    decreaseItem: (state, action: PayloadAction<ProductProps>) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== String(action.payload),
      )
      state.products = filteredProducts
    },
  },
})

export const { increaseItem, decreaseItem } = cartSlice.actions

export default cartSlice.reducer
