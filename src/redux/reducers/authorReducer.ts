import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { Author, AuthorState } from "../../types_variables/types"
import { fetchAuthors } from "../middlewares/fetchAuthors"

const initialState: AuthorState = {
  items: [],
  filteredAuthors: [],
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
      const { id, name, info } = action.payload
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
            info: info
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
    searchByAuthorName(state, action) {
      const authors = state.items.filter((author) => {
        return author.name.toLowerCase().includes(action.payload)
      })

      return {
        ...state,
        filteredAuthors: action.payload.length > 0 ? authors : [...state.items]
      }
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
  }
})

export const authorReducer = authorSlice.reducer
export const {
  addAuthor,
  updateAuthor,
  deleteAuthor,
  sortAuthorByName,
  searchByAuthorName
} = authorSlice.actions
