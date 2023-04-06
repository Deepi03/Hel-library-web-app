import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { Author, AuthorState } from "../../types_variables/types"
import { fetchAuthors } from "../middlewares/fetchAuthors"

const initialState: AuthorState = {
  items: [],
  isLoading: false,
  error: ""
}
const authorSlice = createSlice({
  name: "authorReducer",
  initialState: initialState,
  reducers: {
    addAuthor(state, action) {
      const author: Author = action.payload
      state.items.push(author)
      toast.success(" Author Added ", {
        position: "bottom-right"
      })
    },
    updateAuthor(state, action) {
      const { id, name, info, image } = action.payload
      return {
        ...state,
        items: [...state.items].map((author) => {
          if (id !== author.id) {
            return author
          }
          toast.success("Author Updated", {
            position: "bottom-right"
          })
          return {
            ...author,
            name: name,
            info: info,
            image: image
          }
        })
      }
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
export const { addAuthor, updateAuthor, deleteAuthor, sortAuthorByName } =
  authorSlice.actions
