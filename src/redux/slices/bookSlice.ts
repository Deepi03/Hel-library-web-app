/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { Author, Book, BookState, Genre } from "../../types_variables/types"
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
  error: undefined,
  isBorrowed: false
}

const bookSlice = createSlice({
  name: "booksReducer",
  initialState: initialState,
  reducers: {
    /* addBook(state, action) {
      const book: Book = action.payload
      state.items = [book, ...state.items]
      
    }, */
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
        items: state.items.map((book) => {
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
          return bookToBeUpdate
        })
      }

      return stateWithUpdatedBook
    },

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
    borrowBook(state, action): BookState {
      const { book, userId, days } = action.payload
      const rDate = new Date()
      return {
        ...state,
        items: state.items.map((b) => {
          if (b.id !== book.id) {
            return b
          } else {
            if (userId !== undefined) {
              toast.info("Book Borrowed", {
                position: "bottom-right"
              })
            }
            if (days === 10) {
              rDate.setDate(new Date().getDate() + 10)
            } else if (days === 20) {
              rDate.setDate(new Date().getDate() + 20)
            } else {
              rDate.setDate(new Date().getDate() + 30)
            }
            const rDateString = rDate.toDateString()

            return {
              ...b,
              status: false,
              borrowDate: new Date().toDateString(),
              returnDate: rDateString,
              borrowerId: userId
            }
          }
        })
      }
    },
    returnBook(state, action) {
      const { id } = action.payload
      return {
        ...state,
        items: state.items.map((book) => {
          if (book.id !== id) return book
          toast.info("Book Returned", {
            position: "bottom-right"
          })
          return {
            ...book,
            status: true,
            borrowDate: null,
            returnDate: null,
            borrowerId: null
          }
        })
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
    builder.addCase(fetchBooks.fulfilled, (state, action: any) => {
      state.items = action.payload
      state.isLoading = false
    })

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = [...state.items, action.payload]
      toast.success("Book Created", {
        position: "bottom-right"
      })
    })
    builder.addCase(booksByAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(updateBookById.fulfilled, (state, action) => {
      //console.log("update reducer", action.payload)
      state.isLoading = false
      const updatedBook = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.items = updatedBook
      console.log("updated book", updatedBook)
      toast.success("Book Updated", {
        position: "bottom-right"
      })
    })
    builder.addCase(deleteBookById.fulfilled, (state, action: any) => {
      state.isLoading = false
      const { id } = action.payload
      state.items = state.items.filter((book) => book.id !== id)
    })
  }
})

export const booksReducer = bookSlice.reducer
export const {
  updateBook,
  borrowBook,
  search,
  returnBook,
  deleteBook,
  singleBookFilter,
  sortBookByTitle,
  filterBooksByGenre,
  sortBookByAvailable
} = bookSlice.actions