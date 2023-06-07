/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types_variables/types"

export const signup = createAsyncThunk("signup", async (user: User) => {
  try {
    const res = await fetch(
      `https://hel-library-web-service.onrender.com/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
    /* const res = await fetch(`http://localhost:8080/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }) */
    const response = await res.json()
    if (!res.ok) {
      return response
    }
    return response
  } catch (error) {
    return error
  }
})

export const signin = createAsyncThunk("signin", async (user: User) => {
  try {
    const res = await fetch(
      `https://hel-library-web-service.onrender.com/api/v1/users/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
    /*   const res = await fetch(`http://localhost:8080/api/v1/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }) */
    const response = await res.json()
    if (!res.ok) {
      return response
    }
    return response
  } catch (error) {
    return error
  }
})

export const allUsers = createAsyncThunk("allUsers", async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(
      `https://hel-library-web-service.onrender.com/api/v1/admin/users`,
      {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
    /*  const res = await fetch(`http://localhost:8080/api/v1/admin/users`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }) */

    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    const users: User[] = await res.json()
    return users
  } catch (error) {
    return error
  }
})
