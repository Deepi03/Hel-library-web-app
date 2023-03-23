import { createSlice } from "@reduxjs/toolkit"
import { GoogleLoggedInUser, googleUserInitialState } from "../../types/types"
import { fetchData } from "../middlewares/googleLogin"

export type UsersState = {
  items: GoogleLoggedInUser | undefined
  isLoggedIn: boolean
}
const initialState: UsersState = {
  items: googleUserInitialState,
  isLoggedIn: false
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
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload
      if (state.items) state.isLoggedIn = true
    })
  }
})

export const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
