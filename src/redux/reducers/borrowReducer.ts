import { createSlice } from "@reduxjs/toolkit"

import { Book, Borrow } from "../../types_variables/types"

const initialState: Borrow = {
  user: undefined,
  books: []
}

const borrowSlice = createSlice({
  name: "borrowReducer",
  initialState: initialState,
  reducers: {
    borrowBook(state, action) {
      const book: Book = action.payload.book
      state.books.push({
        ...book,
        borrowDate: new Date().toDateString(),
        status: false
      })
      state.user = action.payload.user
    }
  }
})

export const borrowReducer = borrowSlice.reducer
/* export const { borrowBook } = borrowSlice.actions */
