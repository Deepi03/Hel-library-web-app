import { createSlice } from "@reduxjs/toolkit"

import { GenreState } from "../../types_variables/types"
import { fetchGenres } from "../middlewares/fetchGenres"

const initialState: GenreState = {
  items: [],
  isLoading: false,
  error: ""
}
const genreSlice = createSlice({
  name: "genresReducer",
  initialState: initialState,
  reducers: {
    sortGenreByName(state) {
      state.items = state.items.slice().sort((a, b) => {
        const genreA = a.name.toLowerCase()
        const gnereB = b.name.toLowerCase()
        if (genreA < gnereB) {
          return -1
        }
        if (genreA > gnereB) {
          return 1
        }
        return 0
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const genresReducer = genreSlice.reducer
export const { sortGenreByName } = genreSlice.actions
