import { createSlice } from "@reduxjs/toolkit"

import { BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: ""
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
      state.items.find((book) => {
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
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
    })

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const bookReducer = bookSlice.reducer
export const { addBook, updateBook } = bookSlice.actions
