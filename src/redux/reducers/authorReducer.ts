import { createSlice } from "@reduxjs/toolkit"
import { Author } from "../../types/types"
import { fetchAuthors } from "../middlewares/fetchAuthors"

export type AuthorState = {
  items: Author[]
}
const initialState: AuthorState = {
  items: []
}

const authorSlice = createSlice({
  name: "authorReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items = action.payload
    })
  }
})

export const authorReducer = authorSlice.reducer
