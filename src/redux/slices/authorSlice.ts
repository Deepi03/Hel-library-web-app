/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { AuthorState } from "../../types_variables/types"
import {
  createAuthor,
  deleteAuthorById,
  fetchAuthorById,
  fetchAuthors,
  updateAuthorById
} from "../middlewares/authorThunk"

const initialState: AuthorState = {
  items: [],
  isLoading: false,
  error: "",
  item: null
}
const authorSlice = createSlice({
  name: "authorsReducer",
  initialState: initialState,
  reducers: {
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.isLoading = false
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
      state.isLoading = false
      state.item = action.payload
    })
    builder.addCase(fetchAuthorById.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(createAuthor.fulfilled, (state, action) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        state.isLoading = false
        state.items = [...state.items, action.payload]
        toast.success("Author Created", {
          position: "bottom-right"
        })
      }
    })
    builder.addCase(updateAuthorById.fulfilled, (state, action) => {
      state.isLoading = false
      console.log("update author", action.payload)
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        const updatedAuthor = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
        state.items = updatedAuthor
        toast.success("Author Updated", {
          position: "bottom-right"
        })
      }
    })

    builder.addCase(deleteAuthorById.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(deleteAuthorById.fulfilled, (state, action: any) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
      } else {
        state.isLoading = false
        const { id } = action.payload
        state.items = state.items.filter((author) => author.id !== id)
        toast.warning("Author Deleted", {
          position: "bottom-right"
        })
      }
    })
  }
})

export const authorsReducer = authorSlice.reducer
export const { sortAuthorByName } = authorSlice.actions
