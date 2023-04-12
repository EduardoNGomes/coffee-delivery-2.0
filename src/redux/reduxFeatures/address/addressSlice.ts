import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AddressProps } from '@/types/AddressProps'

export interface AddressState {
  address: AddressProps
}

const initialState: AddressState = {
  address: {
    city: '',
    complements: '',
    houseNumber: '',
    neighborhood: '',
    street: '',
    uf: '',
    zipCode: '',
  },
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    createAddress: (state, action: PayloadAction<AddressProps>) => {
      state.address = { ...action.payload }
      localStorage.setItem(
        '@coffee-delivery-address',
        JSON.stringify(state.address),
      )
    },
  },
})

export const { createAddress } = addressSlice.actions

export default addressSlice.reducer
