import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAuthors = createAsyncThunk("fetchAuthors", async () => {
  try {
    const res = await fetch("assets/authors.json")
    const authors = await res.json()
    if (!res.ok) {
      throw authors
    }
    return authors
  } catch (error) {
    return error
  }
})
