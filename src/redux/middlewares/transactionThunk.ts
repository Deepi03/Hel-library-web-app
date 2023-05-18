/* eslint-disable prettier/prettier */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Transaction } from "mongodb"
import { getToken } from "../../hook/getToken"
import { BorrowDto } from "../../types_variables/types"

export const borrowBook = createAsyncThunk(
  "borrowBook",
  async (borrow: BorrowDto) => {
    try {
      const token = getToken()
      console.log("borrow", borrow)
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
      console.log("book borrow thunk", createdBorrow)
      return createdBorrow
    } catch (error) {
      return error
    }
  }
)

export const returnBook = createAsyncThunk(
  "returnBook",
  async (transactionId: string) => {
    try {
      const token = getToken()
      console.log("borrow", transactionId)
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
      console.log("book borrow thunk", message)
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
      const token = getToken()
      console.log("borrow", userId)
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
      console.log("transaction lala", transactions)

      if (!res.ok) {
        throw new Error("Something went wrong")
      }

      return transactions
    } catch (error) {
      return error
    }
  }
)
