import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ProductProps } from '../../../types/ProductProps'

export interface CartState {
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
        (product) => product.id !== String(action.payload.id),
      )
      state.products = filteredProducts
    },
    increaseItemQuantity: (state, action: PayloadAction<ProductProps>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity! + 1 }
          : product,
      )
    },
    decreaseItemQuantity: (state, action: PayloadAction<ProductProps>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity! - 1 }
          : product,
      )
    },
  },
})

export const {
  increaseItem,
  decreaseItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions

export default cartSlice.reducer
