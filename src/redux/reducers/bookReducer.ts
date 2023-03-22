import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

import { Book } from "../../types/types"
import { fetchBooks } from "../middlewares/fetchBooks"

export type BookState = {
  items: Book[]
}
const initialState: BookState = {
  items: []
}
const unique_id = uuid()

const bookSlice = createSlice({
  name: "bookReducer",
  initialState: initialState,
  reducers: {
    addBooks(state, action) {
      action.payload.id = unique_id
      state.items.push(action.payload)
      console.log("book reducer", action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = action.payload
    })
  }
})

export const bookReducer = bookSlice.reducer
export const { addBooks } = bookSlice.actions
