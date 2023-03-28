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
          console.log({
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
          })

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
      const { bDateString, rDateString, unique_id } = action.payload
      return {
        ...state,
        items: [...state.items].map((book) => {
          console.log("idddd", id)
          if (book.id !== id) return book
          return {
            ...book,
            status: false,
            borrowDate: bDateString,
            returnDate: rDateString,
            borrowId: unique_id
          }
        })
      }
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
export const {
  addBook,
  updateBook,
  borrowBook,
  searchBook,
  deleteBook,
  singleBookFilter
} = bookSlice.actions
