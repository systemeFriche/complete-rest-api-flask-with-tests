import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { authReducer } from './reducer/authSlice'
import { usersReducer } from './reducer/usersSlice'

const mainReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
})

export const store = configureStore({
  reducer: mainReducer
})

export const store = configureStore({
  reducer: mainReducer
})