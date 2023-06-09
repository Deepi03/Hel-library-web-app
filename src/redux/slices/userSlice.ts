/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getUserByToken } from "../../hook/getToken"

import { UsersState } from "../../types_variables/types"
import { allUsers, signin, signup } from "../middlewares/userThunk"

const initialState: UsersState = {
  items: [],
  item: undefined,
  isLoading: false,
  error: "",
  status: ""
}

const userSlice = createSlice({
  name: "usersReducer",
  initialState: initialState,
  reducers: {
    getUserFromStorage(state) {
      const user = getUserByToken()
      if (user) {
        state.item = user
      }
    },
    logout(state) {
      state.item = undefined
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signup.fulfilled, (state, action: any) => {
      if (action.payload.statusCode === 400) {
        state.error = action.payload.message
        toast.error(state.error, {
          position: "bottom-right"
        })
      } else {
        state.status = action.payload.message
        toast.success("User Created", {
          position: "bottom-right"
        })
      }
    })
    builder.addCase(signin.fulfilled, (state, action: any) => {
      console.log("ac", action.payload)
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token)
        const user = getUserByToken()
        state.item = user
        toast.success("User loggedIn", {
          position: "bottom-right"
        })
      } else {
        state.error = action.payload.message
        toast.error(state.error, {
          position: "bottom-right"
        })
      }
    })
    builder.addCase(signup.rejected, (state, action) => {
      console.log("state error", action.payload)
      state.isLoading = false
      state.error = action.error.message
      state.item = undefined
    })
    builder.addCase(allUsers.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.items = action.payload
    })
  }
})

export const usersReducer = userSlice.reducer
export const { logout, getUserFromStorage } = userSlice.actions
