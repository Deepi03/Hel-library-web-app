/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { Book, BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: undefined,
  isBorrowed: false
}

const bookSlice = createSlice({
  name: "booksReducer",
  initialState: initialState,
  reducers: {
    addBook(state, action) {
      const book: Book = action.payload
      state.items = [book, ...state.items]
    },
    updateBook(state, action) {
      const {
        id,
        isbn,
        title,
        cover,
        authors,
        description,
        publisher,
        publishedDate
      } = action.payload
      return {
        ...state,
        items: [...state.items].map((book) => {
          if (id !== book.id) {
            return book
          }
          return {
            ...book,
            isbn: isbn,
            title: title,
            cover: cover,
            description: description,
            publisher: publisher,
            authors: {
              id: book.authors.id,
              name: authors.name
            },
            publishedDate: publishedDate
          }
        })
      }
    },
    singleBookFilter(state, action) {
      const id = action.payload
      return {
        ...state,
        items: [...state.items].filter((book) => {
          if (book.id === id) return book
        })
      }
    },
    borrowBook(state, action): BookState {
      const { id } = action.payload.book
      const { bDateString, rDateString, unique_id, userEmail } = action.payload
      return {
        ...state,
        items: [...state.items].map((book) => {
          if (book.id !== id) return book
          return {
            ...book,
            status: false,
            borrowDate: bDateString,
            returnDate: rDateString,
            borrowId: unique_id,
            userMail: userEmail
          }
        })
      }
    },
    returnBook(state, action) {
      const { id } = action.payload
      return {
        ...state,
        items: [...state.items].map((book) => {
          if (book.id !== id) return book
          console.log({
            ...book,
            status: true,
            borrowDate: null,
            returnDate: null,
            borrowId: null,
            userMail: undefined
          })
          return {
            ...book,
            status: true,
            borrowDate: null,
            returnDate: null,
            borrowId: null,
            userMail: ""
          }
        })
      }
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
export const {
  addBook,
  updateBook,
  borrowBook,
  searchBook,
  returnBook,
  deleteBook,
  singleBookFilter
} = bookSlice.actions
