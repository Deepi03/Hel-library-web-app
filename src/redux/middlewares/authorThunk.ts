/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Author } from "../../types_variables/types"

export const fetchAuthors = createAsyncThunk("fetchAuthors", async () => {
  try {
    const res = await fetch("http://localhost:8080/api/v1/authors")
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

export const createAuthor = createAsyncThunk(
  "createAuthor",
  async (author: Partial<Author>) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
      })
      const createdAuthor = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      return createdAuthor
    } catch (error) {
      return error
    }
  }
)

export const updateAuthorById = createAsyncThunk(
  "updateAuthorById",
  async (author: Author) => {
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

export const deleteAuthorById = createAsyncThunk(
  "deleteAuthorById",
  async (id: string) => {
    console.log("async thunk", id)

    try {
      const res = await fetch(`http://localhost:8080/api/v1/authors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        throw new Error("something went wrong")
      }
      return { id }
    } catch (error) {
      return error
    }
  }
)
