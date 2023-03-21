import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/types"
import { fetchUsers } from "../middlewares/fetchUsers"

export type UsersState = {
  items: User[]
}
const initialState: UsersState = {
  items: []
}

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("user reducer", action.payload)
      state.items = action.payload
    })
  }
})

export const userReducer = userSlice.reducer
