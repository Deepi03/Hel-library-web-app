import { createSlice } from "@reduxjs/toolkit"
import { Book } from "../../types/types"
import { fetchBooks } from "../middlewares/fetchBooks"

export type BookState = {
  items: Book[]
}
const initialState: BookState = {
  items: []
}

const bookSlice = createSlice({
  name: "bookReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = action.payload
    })
  }
})

export const bookReducer = bookSlice.reducer
