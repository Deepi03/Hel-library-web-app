/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAuthors = createAsyncThunk("fetchAuthors", async () => {
  try {
    /* const res = await fetch("http://localhost:5173/assets/authors.json") */
    const res = await fetch(
      "https://hel-library-web-app.netlify.app/assets/authors.json"
    )
    const authors = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return authors
  } catch (error) {
    return error
  }
})
