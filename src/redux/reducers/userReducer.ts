import { createSlice } from "@reduxjs/toolkit"

import { googleUserInitialState } from "../../types_variables/constants"
import { Book, UsersState } from "../../types_variables/types"
import { fetchUserDetails } from "../middlewares/googleLogin"

const initialState: UsersState = {
  item: googleUserInitialState,
  isLoading: false,
  isLoggedIn: false,
  error: "",
  books: []
}

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false
      state.item = undefined
    },
    userBorrowBook(state, action) {
      /* state.books.push(action.payload) */
      console.log("action in userReducer", action.payload)
      const book: Book = action.payload
      state.books = [book, ...state.books]
      console.log("after adding", Array.isArray(state.books))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoggedIn = false
      state.isLoading = true
    })
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.item = action.payload

      state.isLoading = false
      if (state.item) state.isLoggedIn = true
    })
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
      state.isLoggedIn = false
      state.item = undefined
    })
  }
})

export const userReducer = userSlice.reducer
export const { logout, userBorrowBook } = userSlice.actions
