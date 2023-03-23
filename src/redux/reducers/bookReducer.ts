import { createSlice } from "@reduxjs/toolkit"

import { Book } from "../../types/types"
import { fetchBooks } from "../middlewares/fetchBooks"

export type BookState = {
  items: Book[]
}
const initialState: BookState = {
  items: []
}

const bookSlice = createSlice({
  name: "bookReducer",
  initialState: initialState,
  reducers: {
    addBook(state, action) {
      console.log(action.payload)
      state.items.push(action.payload)
    },
    updateBook(state, action) {
      console.log("update book reducer", action.payload)
      state.items.filter((book) => {
        if (action.payload == book.id) {
          console.log(book.id)
          book = {
            ...book,
            ...action.payload.update
          }

          return book
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      console.log("inside extra reducers")
      state.items = action.payload
    })
  }
})

export const bookReducer = bookSlice.reducer
export const { addBook, updateBook } = bookSlice.actions
