import { createSlice } from "@reduxjs/toolkit"

import { Genre, GenreState } from "../../types_variables/types"
import { fetchGenres } from "../middlewares/fetchGenres"

const initialState: GenreState = {
  items: [],
  filteredGenres: [],
  isLoading: false,
  error: ""
}
const genreSlice = createSlice({
  name: "genreReducer",
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
    },
    searchByGenre(state, action) {
      const genres: Genre[] = state.items.filter((genre) =>
        genre.name.toLowerCase().includes(action.payload.toLowerCase())
      )
      console.log(action.payload.length)
      console.log(genres)

      return {
        ...state,
        filteredGenres: action.payload.length > 0 ? genres : [...state.items]
      }
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

export const genreReducer = genreSlice.reducer
export const { sortGenreByName, searchByGenre } = genreSlice.actions
