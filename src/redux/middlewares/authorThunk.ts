/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Author } from "../../types_variables/types"

export const fetchAuthors = createAsyncThunk("fetchAuthors", async () => {
  try {
    const res = await fetch("http://localhost:8080/api/v1/authors")
    /*  const res = await fetch(
      "https://hel-library-web-app.netlify.app/assets/authors.json"
    ) */
    const authors = await res.json()
    console.log("authors", res)
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return authors
  } catch (error) {
    return error
  }
})

export const fetchAuthorById = createAsyncThunk(
  "fetchAuthorById",
  async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/authors/${id}`)

      const author = await res.json()

      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      return author
    } catch (error) {
      return error
    }
  }
)

export const updateAuthorById = createAsyncThunk(
  "updateAuthorById",
  async (author: Partial<Author>) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/authors/${author.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(author)
        }
      )
      const updatedAuthor = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      return updatedAuthor
    } catch (error) {
      return error
    }
  }
)

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
