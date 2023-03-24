import { createSlice } from "@reduxjs/toolkit"

import { Author } from "../../types_variables/types"
import { fetchAuthors } from "../middlewares/fetchAuthors"

export type AuthorState = {
  items: Author[]
  isLoading: boolean
  error: string | undefined
}
const initialState: AuthorState = {
  items: [],
  isLoading: false,
  error: ""
}

const authorSlice = createSlice({
  name: "authorReducer",
  initialState: initialState,
  reducers: {},
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
