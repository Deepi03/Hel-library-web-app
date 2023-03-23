import { createSlice } from "@reduxjs/toolkit"
import { GoogleLoggedInUser, googleUserInitialState } from "../../types/types"
import { fetchData } from "../middlewares/googleLogin"

export type UsersState = {
  items: GoogleLoggedInUser
  currentUser: boolean
}
const initialState: UsersState = {
  items: googleUserInitialState,
  currentUser: false
}

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.currentUser = false
      console.log("logout after", state.currentUser)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log("user reducer", action.payload)
      state.items = action.payload
      console.log("user reducer after", action.payload)
      if (state.items) state.currentUser = true
      console.log("current user", state.currentUser)
    })
  }
})

export const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
