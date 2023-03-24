import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
import { borrowInitialState } from "../../types_variables/constants"

import { Book, BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: undefined,
  user: undefined,
  borrowedBooks: []
}

const unique_id = uuid()

const bookSlice = createSlice({
  name: "bookReducer",
  initialState: initialState,
  reducers: {
    addBook(state, action) {
      const book: Book = action.payload
      state.items.push({ ...book, id: unique_id })
    },
    updateBook(state, action) {
      state.items.find((book) => {
        if (action.payload == book.id) {
          book = {
            ...book,
            ...action.payload.update
          }

          return book
        }
      })
    },
    borrowBook(state, action) {
      state.items.filter((book) => {
        if (book.id === action.payload.book.id) {
          book.status = false
        }
      })
      state.user = action.payload.user
      state.borrowedBooks.push(action.payload.book)

      console.log("book reducer : user", state.user)
      console.log(
        "book reducer : book",
        state.borrowedBooks.map((b) => b.title)
      )
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
export const { addBook, updateBook, borrowBook } = bookSlice.actions
