/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { Author, BookState, Genre } from "../../types_variables/types"
import {
  booksByAuthor,
  createBook,
  deleteBookById,
  fetchBooks,
  updateBookById
} from "../middlewares/bookThunk"

const initialState: BookState = {
  items: [],
  filteredBooks: [],
  filterBooksByGenre: [],
  filteredGenres: [],
  filteredAuthors: [],
  isLoading: false,
  error: undefined
}

const bookSlice = createSlice({
  name: "booksReducer",
  initialState: initialState,
  reducers: {
    singleBookFilter(state, action) {
      const id = action.payload
      const filteredBook = state.items.find((item) => {
        if (item.id === id) return item
      })
      return {
        ...state,
        singleBook: filteredBook
      }
    },

    search(state, action) {
      const genres: Genre[] = action.payload.genres
      const authors: Author[] = action.payload.authors

      const genresFiltered: Genre[] = genres.filter((genre) =>
        genre.name
          .toLowerCase()
          .includes(action.payload.searchTerm.toLowerCase())
      )
      const booksFiltered = state.items.filter((item) =>
        item.title
          .toLowerCase()
          .includes(action.payload.searchTerm.toLowerCase())
      )

      const authorsFiltered = authors.filter((author) => {
        return author.name
          .toLowerCase()
          .includes(action.payload.searchTerm.toLowerCase())
      })
      return {
        ...state,
        filteredBooks:
          action.payload.searchTerm.length > 0 ? booksFiltered : state.items,
        filteredGenres:
          action.payload.searchTerm.length > 0 ? genresFiltered : genres,
        filteredAuthors:
          action.payload.searchTerm.length > 0 ? authorsFiltered : authors
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
    sortBookByAvailable(state) {
      if (state.items) {
        state.items = state.items.sort((a, b) => {
          const bookA = a.available
          const bookB = b.available
          if (bookA < bookB) {
            return 1
          }
          if (bookA > bookB) {
            return -1
          }
          return 0
        })
      }
    },
    filterBooksByGenre(state, action) {
      const genreId = action.payload
      state.filterBooksByGenre = state.items.filter(
        (item) => item.genre === genreId
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action: any) => {
      state.items = action.payload
      state.isLoading = false
    })

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(createBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createBook.fulfilled, (state, action) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        state.isLoading = false
        state.items = [...state.items, action.payload]
        toast.success("Book Created", {
          position: "bottom-right"
        })
      }
    })
    builder.addCase(createBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(booksByAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(updateBookById.fulfilled, (state, action) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        state.isLoading = false
        const updatedBook = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
        state.items = updatedBook
        toast.success("Book Updated", {
          position: "bottom-right"
        })
      }
    })
    builder.addCase(deleteBookById.fulfilled, (state, action: any) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        state.isLoading = false
        const { id } = action.payload
        state.items = state.items.filter((book) => book.id !== id)
        toast.warning("Book Deleted", {
          position: "bottom-right"
        })
      }
    })
  }
})

export const booksReducer = bookSlice.reducer
export const {
  search,
  singleBookFilter,
  sortBookByTitle,
  filterBooksByGenre,
  sortBookByAvailable
} = bookSlice.actions
