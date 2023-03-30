import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    const res = await fetch("http://localhost:5173/assets/books.json")
    const books = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return books
  } catch (error) {
    return error
  }
})
