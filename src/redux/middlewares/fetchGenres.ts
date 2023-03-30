import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGenres = createAsyncThunk("fetchGenres", async () => {
  try {
    const res = await fetch("http://localhost:5173/assets/genres.json")
    const genres = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return genres
  } catch (error) {
    return error
  }
})
