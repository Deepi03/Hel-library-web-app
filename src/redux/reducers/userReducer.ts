import { createSlice } from "@reduxjs/toolkit"

import { googleUserInitialState } from "../../types_variables/constants"
import { UsersState } from "../../types_variables/types"
import { fetchUserDetails } from "../middlewares/googleLogin"

const initialState: UsersState = {
  items: googleUserInitialState,
  isLoading: false,
  isLoggedIn: false,
  error: ""
}

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false
      state.items = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoggedIn = false
      state.isLoading = true
    })
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
      if (state.items) state.isLoggedIn = true
    })
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
      state.isLoggedIn = false
      state.items = undefined
    })
  }
})

export const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
