import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const res = await fetch("assets/users.json")
    const users = await res.json()
    console.log(res)
    if (!res.ok) {
      console.log(users)
      throw new Error("fetch")
    }
    return users
  } catch (error) {
    console.log("err", error)
  }
})
