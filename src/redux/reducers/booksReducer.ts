/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { Book, BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  singleBook: undefined,
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
      console.log("book before pushing", book.title, book.authorId)
      state.items = [book, ...state.items]
      console.log(
        "book after pushing",
        state.items.map((b) => b.authorId)
      )
      toast.success("Book Added", {
        position: "bottom-right"
      })
    },
    updateBook(state, action) {
      const { id, isbn, title, cover, description, publisher, authorId } =
        action.payload

      const stateWithUpdatedBook = {
        ...state,
        items: [...state.items].map((book) => {
          if (id !== book.id) {
            return book
          }
          const bookToBeUpdate = {
            ...book,
            isbn: isbn,
            title: title,
            cover: cover,
            description: description,
            publisher: publisher,
            authorId: authorId
          }
          toast.info("Book Updated", {
            position: "bottom-right"
          })
          return bookToBeUpdate
        })
      }
      console.log(stateWithUpdatedBook.items.map((b) => b.authorId))
      return stateWithUpdatedBook
    },

    singleBookFilter(state, action) {
      const id = action.payload
      const filteredBook = [...state.items].find((item) => {
        if (item.id === id) return item
      })
      return {
        ...state,
        singleBook: filteredBook
      }
    },
    borrowBook(state, action): BookState {
      const { id } = action.payload.book
      const { bDateString, rDateString, unique_id, userEmail } = action.payload
      return {
        ...state,
        items: [...state.items].map((book) => {
          if (book.id !== id) return book
          toast.info("Book Borrowed", {
            position: "bottom-right"
          })
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
          toast.info("Book Returned", {
            position: "bottom-right"
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
      toast.warning("Book Deleted", {
        position: "bottom-right"
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
