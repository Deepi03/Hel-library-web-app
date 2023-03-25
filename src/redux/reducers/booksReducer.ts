/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

import { Book, BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: undefined,
  user: undefined,
  isBorrowed: false
}

const unique_id = uuid()

const bookSlice = createSlice({
  name: "booksReducer",
  initialState: initialState,
  reducers: {
    addBook(state, action) {
      const book: Book = action.payload
      state.items.push({ ...book, id: unique_id })
      console.log("add boo", state.items.length)
    },
    updateBook(state, action) {
      state.items.find((book) => {
        if (action.payload.id == book.id) {
          console.log("updated book", { ...book, ...action.payload })
          return { ...book, ...action.payload }
        }
      })
    },
    borrowBook(state, action) {
      const bDate = new Date()
      const rDate = new Date()
      rDate.setDate(bDate.getDate() + 30)
      state.items.filter((book) => {
        if (book.id == action.payload.id) {
          ;(book.status = false),
            (book.borrowDate = bDate.toDateString()),
            (book.returnDate = rDate.toDateString())
        }
      })
      console.log(
        "b",
        state.items.map((b) => b.returnDate)
      )
    },
    returnBook(state, action) {
      state.items.filter((book) => {
        if (book.id == action.payload.id) {
          ;(book.status = true),
            (book.returnDate = null),
            (book.borrowDate = null)
        }
      })
    },
    searchBook(state, action) {
      state.items = state.items.filter((book) => {
        return book.title.toLowerCase().includes(action.payload)
      })
    },
    deleteBook(state, action) {
      state.items = state.items.filter((book) => {
        return book.id !== action.payload.id
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

export const booksReducer = bookSlice.reducer
export const { addBook, updateBook, borrowBook, searchBook, deleteBook } =
  bookSlice.actions
