/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit"
import { TransactionState } from "../../types_variables/types"
import {
  borrowBook,
  returnBook,
  transactionsOfUser
} from "../middlewares/transactionThunk"

const initialState: TransactionState = {
  items: [],
  isLoading: false,
  error: undefined,
  message: ""
}

const transactionSlice = createSlice({
  name: "transactionsReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(borrowBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(borrowBook.fulfilled, (state, action: any) => {
      console.log("transaction slice", action.payload)
      //state.item = action.payload
      state.isLoading = false
    })

    builder.addCase(borrowBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(returnBook.fulfilled, (state, action: any) => {
      console.log("transaction slice", action.payload)
      state.message = action.payload
      state.isLoading = false
    })
    builder.addCase(transactionsOfUser.fulfilled, (state, action: any) => {
      /*  state.items = [...state.items, action.payload.] */
      console.log("transaction slice", action.payload)
      state.items = action.payload
      state.isLoading = false
    })
  }
})

export const transactionReducer = transactionSlice.reducer
