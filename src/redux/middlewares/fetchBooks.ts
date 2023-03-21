import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    const res = await fetch("assets/books.json")
    const books = await res.json()
    console.log(res)
    if (!res.ok) {
      console.log(books)
      throw new Error("fetch")
    }
    return books
  } catch (error) {
    console.log("err", error)
  }
})
