/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { TransactionState } from "../../types_variables/types"
import { fetchBooks } from "../middlewares/bookThunk"
import {
  allTransactions,
  borrowBook,
  deleteTransactionById,
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
      state.isLoading = false
      toast.success("Book Borrowed", {
        position: "bottom-right"
      })
    })
    builder.addCase(borrowBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(returnBook.fulfilled, (state, action: any) => {
      state.message = action.payload
      state.isLoading = false
      toast.success("Book Returned", {
        position: "bottom-right"
      })
    })
    builder.addCase(transactionsOfUser.fulfilled, (state, action: any) => {
      state.items = action.payload
      state.isLoading = false
    })
    builder.addCase(allTransactions.fulfilled, (state, action: any) => {
      state.items = action.payload
      state.isLoading = false
    })
    builder.addCase(deleteTransactionById.fulfilled, (state, action: any) => {
      if (
        action.payload.statusCode === 400 ||
        action.payload.statusCode === 404 ||
        action.payload.statusCode === 403
      ) {
        state.error = action.payload.message
        toast.error(state.error, {
          position: "bottom-right"
        })
      } else {
        state.isLoading = false
        const { id } = action.payload
        state.items = state.items.filter((transaction) => transaction.id !== id)
        toast.warning("Transaction Deleted", {
          position: "bottom-right"
        })
      }
    })
  }
})

export const transactionReducer = transactionSlice.reducer
