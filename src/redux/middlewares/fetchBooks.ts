import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    const res = await fetch("assets/books.json")
    const books = await res.json()
    if (!res.ok) {
      throw new Error("fetch")
    }
    return books
  } catch (error) {
    console.log("err", error)
  }
})
