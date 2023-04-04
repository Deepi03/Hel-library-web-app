/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { Book, BookState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/fetchBooks"

const initialState: BookState = {
  items: [],
  filteredBooks: [],
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
      toast.success("Book Added", {
        position: "bottom-right"
      })
    },
    updateBook(state, action) {
      const {
        id,
        isbn,
        title,
        cover,
        description,
        publisher,
        authorId,
        genreId,
        publishedDate
      } = action.payload

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
            authorId: authorId,
            genreId: genreId,
            publishedDate: publishedDate
          }
          toast.info("Book Updated", {
            position: "bottom-right"
          })
          console.log("update", bookToBeUpdate)
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
    searchByBookTitle(state, action) {
      const booksFiltered = state.items.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      )

      return {
        ...state,
        filteredBooks:
          action.payload.length > 0 ? booksFiltered : [...state.items]
      }
    },
    sortBookByTitle(state) {
      state.items = state.items.slice().sort((a, b) => {
        const bookA = a.title.toLowerCase()
        const bookB = b.title.toLowerCase()
        if (bookA < bookB) {
          return -1
        }
        if (bookA > bookB) {
          return 1
        }
        return 0
      })
    },
    filterBooksByGenre(state, action) {
      const genreId = action.payload
      console.log(genreId)
      state.filteredBooks = state.items.filter(
        (item) => item.genreId === genreId
      )
      console.log("filterbygenre", state.filteredBooks)
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
  searchByBookTitle,
  returnBook,
  deleteBook,
  singleBookFilter,
  sortBookByTitle,
  filterBooksByGenre
} = bookSlice.actions
