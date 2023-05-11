/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Book, BookDto } from "../../types_variables/types"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    /* const res = await fetch(
      "https://hel-library-web-app.netlify.app/assets/books.json"
    ) */
    const res = await fetch("http://localhost:8080/api/v1/books")
    const books = await res.json()
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return books
  } catch (error) {
    return error
  }
})

export const booksByAuthor = createAsyncThunk(
  "booksByAuthor",
  async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/books/authors/${id}`
      )
      const books = await res.json()
      if (!res.ok) {
        throw new Error("something went wrong")
      }
      return books
    } catch (error) {
      return error
    }
  }
)
export const createBook = createAsyncThunk(
  "createBook",
  async (book: BookDto) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      })
      const createdBook = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      console.log("res", res.json())
      return createdBook
    } catch (error) {
      return error
    }
  }
)
