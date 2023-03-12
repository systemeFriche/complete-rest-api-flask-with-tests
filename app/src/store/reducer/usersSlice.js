import { createSlice } from '@reduxjs/toolkit'

// void, pending, resolved, rejected, updating
// juste void, resolved, rejected

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'void',
    data: [],
    error: null

  },
  reducers: {
    usersResolved: (state, action) => {
      // This "mutating" code is okay inside of createSlice!
      state.error = null
      state.status = 'resolved'
      state.data = action.payload
    },
    usersRejected: (state, action) => {
      state.error = action.payload
      state.status = 'rejected'
      state.data = []
    },
    addUserResolved: (state, action) => {
      state.data.push(action.payload)
    }
  }
})

// TODO : changer users en selectUsers ?

export const { usersResolved, usersRejected, addUserResolved, addUserRejected } = usersSlice.actions
export const selectUsers = state => state.users
export const selectFetchUsersError = state => state.users.error
export const selectFetchUsersStatus = state => state.users.status
export const users = state => state.users.data
export const usersReducer = usersSlice.reducer
