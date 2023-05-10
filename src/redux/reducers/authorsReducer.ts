/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { Author, AuthorState } from "../../types_variables/types"
import {
  booksByAuthor,
  fetchAuthorById,
  fetchAuthors,
  updateAuthorById
} from "../middlewares/authorThunk"

const initialState: AuthorState = {
  items: [],
  books: [],
  isLoading: false,
  error: "",
  item: null
}
const authorSlice = createSlice({
  name: "authorsReducer",
  initialState: initialState,
  reducers: {
    addAuthor(state, action) {
      const author: Author = action.payload
      state.items.push(author)
      toast.success(" Author Added ", {
        position: "bottom-right"
      })
    },
    sortAuthorByName(state) {
      state.items = state.items.slice().sort((a, b) => {
        const bookA = a.name.toLowerCase()
        const bookB = b.name.toLowerCase()
        if (bookA < bookB) {
          return -1
        }
        if (bookA > bookB) {
          return 1
        }
        return 0
      })
    },
    deleteAuthor(state, action) {
      state.items = state.items.filter((author) => {
        return author.id !== action.payload.id
      })
      toast.warning("Author Deleted", {
        position: "bottom-right"
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(fetchAuthors.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchAuthorById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuthorById.fulfilled, (state, action) => {
      state.item = action.payload
    })
    builder.addCase(fetchAuthorById.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(updateAuthorById.fulfilled, (state, action) => {
      const updatedAuthor = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.items = updatedAuthor
    })
    builder.addCase(booksByAuthor.fulfilled, (state, action) => {
      state.books = action.payload
    })
  }
})

export const authorsReducer = authorSlice.reducer
export const { addAuthor, deleteAuthor, sortAuthorByName } = authorSlice.actions
