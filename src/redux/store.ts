import { configureStore } from '@reduxjs/toolkit'
import cartReducer  from './slices/cartSlice'
import  productReducer from './slices/productSlice'
import  userReducer from './slices/userSlice'
import  orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    carts:cartReducer,
    products:productReducer,
    user:userReducer,
    order:orderReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch