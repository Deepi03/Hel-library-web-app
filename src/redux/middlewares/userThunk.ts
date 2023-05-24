/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types_variables/types"

export const signup = createAsyncThunk("signup", async (user: User) => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const message = await res.status
    if (message !== 201) {
      throw new Error("Something went wrong")
    }
    console.log("message", message)
    return message
  } catch (error) {
    console.log("signup error", error)
    return error
  }
})

export const signin = createAsyncThunk("signin", async (user: User) => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    if (!res.ok) {
      throw res.status
    }
    const response = await res.json()
    console.log("response signin", response)
    return response
  } catch (error) {
    console.log("response error", error)
    return error
  }
})

export const allUsers = createAsyncThunk("allUsers", async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:8080/api/v1/admin/users`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    const users: User[] = await res.json()
    return users
  } catch (error) {
    return error
  }
})

export const userById = createAsyncThunk("signup", async (userId: string) => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    const response = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return response
  } catch (error) {
    return error
  }
})
