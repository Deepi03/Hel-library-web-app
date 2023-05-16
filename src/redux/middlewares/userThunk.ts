/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types_variables/types"

export const signUp = createAsyncThunk("signUp", async (user: User) => {
  try {
    console.log("thunk", user.username)
    const res = await fetch(`http://localhost:8080/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const message = await res.status
    console.log("messages", message)
    if (message !== 201) {
      throw new Error("Something went wrong")
    }
    console.log("response", res)
    return message
  } catch (error) {
    return error
  }
})

export const signin = createAsyncThunk("signin", async (user: User) => {
  try {
    console.log("thunk", user.username)
    const res = await fetch(`http://localhost:8080/api/v1/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const response = await res.json()
    console.log("messages", response)
    /* if (message !== 201) {
      throw new Error("Something went wrong")
    } */
    console.log("response", response)
    return response
  } catch (error) {
    return error
  }
})
