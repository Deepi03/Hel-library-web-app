/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getToken, getUserByToken } from "../../hook/getToken"

import { UsersState } from "../../types_variables/types"
import { signin, signUp } from "../middlewares/userThunk"

const initialState: UsersState = {
  item: undefined,
  isLoading: false,
  error: "",
  status: ""
}

const userSlice = createSlice({
  name: "usersReducer",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.item = undefined
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUp.fulfilled, (state, action: any) => {
      state.status = action.payload
      toast.success("User SingUped", {
        position: "bottom-right"
      })
    })
    builder.addCase(signin.fulfilled, (state, action: any) => {
      state.item = action.payload.user
      localStorage.setItem("token", action.payload.token)
      const user = getUserByToken()
      if (user) {
        state.item = user
      }
      toast.success("User loggedIn", {
        position: "bottom-right"
      })
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
      state.item = undefined
    })
  }
})

export const usersReducer = userSlice.reducer
export const { logout } = userSlice.actions
