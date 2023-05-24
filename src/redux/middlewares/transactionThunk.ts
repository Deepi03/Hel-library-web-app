/* eslint-disable prettier/prettier */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BorrowDto, Transaction, User } from "../../types_variables/types"
import { fetchBooks } from "./bookThunk"

export const borrowBook = createAsyncThunk(
  "borrowBook",
  async (borrow: BorrowDto, { dispatch }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `http://localhost:8080/api/v1/transactions/borrow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(borrow)
        }
      )
      const createdBorrow = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      dispatch(fetchBooks())
      return createdBorrow
    } catch (error) {
      return error
    }
  }
)

export const returnBook = createAsyncThunk(
  "returnBook",
  async (
    {
      filteredTransaction,
      user
    }: { filteredTransaction: Transaction; user: User },
    { dispatch }
  ) => {
    try {
      const token = localStorage.getItem("token")
      const transactionId = filteredTransaction.id
      const userId = user.id
      const res = await fetch(
        `http://localhost:8080/api/v1/transactions/return/${transactionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      const message = await res
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      if (userId) {
        dispatch(transactionsOfUser(userId))
      }
      return message
    } catch (error) {
      return error
    }
  }
)

export const transactionsOfUser = createAsyncThunk(
  "transactionsOfUser",
  async (userId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `http://localhost:8080/api/v1/transactions/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )

      const transactions: Transaction[] = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      return transactions
    } catch (error) {
      return error
    }
  }
)

export const allTransactions = createAsyncThunk("allTransactions", async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(
      `http://localhost:8080/api/v1/admin/allTransactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    const transactions: Transaction[] = await res.json()
    return transactions
  } catch (error) {
    return error
  }
})

export const deleteTransactionById = createAsyncThunk(
  "deleteTransactionById",
  async (transactionId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `http://localhost:8080/api/v1/admin/deleteTransaction/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!res.ok) {
        const resposne = await res.json()
        return resposne
      }
      return { transactionId }
    } catch (error) {
      return error
    }
  }
)
