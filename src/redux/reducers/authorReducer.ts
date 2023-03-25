import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

import { Author, AuthorState } from "../../types_variables/types"
import { fetchAuthors } from "../middlewares/fetchAuthors"

const initialState: AuthorState = {
  items: [],
  isLoading: false,
  error: ""
}
const unique_id = uuid()
const authorSlice = createSlice({
  name: "authorReducer",
  initialState: initialState,
  reducers: {
    addAuthor(state, action) {
      const author: Author = action.payload
      state.items.push({ ...author, id: unique_id })
    },
    updateAuthor(state, action) {
      state.items.find((author) => {
        if (action.payload.id == author.id) {
          console.log("updated author", { ...author, ...action.payload })
          return { ...author, ...action.payload }
        }
      })
    },
    deleteAuthor(state, action) {
      state.items = state.items.filter((author) => {
        return author.id !== action.payload.id
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
  }
})

export const authorReducer = authorSlice.reducer
export const { addAuthor, updateAuthor, deleteAuthor } = authorSlice.actions
