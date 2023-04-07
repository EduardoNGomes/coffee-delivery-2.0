import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reduxFeatures/cart/cartSlice'
import userReducer from './reduxFeatures/address/addressSlice'

export const store = configureStore({
  reducer: {
    cartReducer,
    userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
