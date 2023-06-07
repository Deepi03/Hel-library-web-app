/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Author } from "../../types_variables/types"

export const fetchAuthors = createAsyncThunk("fetchAuthors", async () => {
  try {
    const res = await fetch(
      "https://hel-library-web-service.onrender.com/api/v1/authors/"
    )
    //const res = await fetch("http://localhost:8080/api/v1/authors/")
    const authors = await res.json()
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
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/authors/${id}`
      )
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
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/authors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(author)
        }
      )
      /* const res = await fetch(`http://localhost:8080/api/v1/admin/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(author)
      }) */
      const response = await res.json()
      if (!res.ok) {
        return response
      }
      return response
    } catch (error) {
      return error
    }
  }
)

export const updateAuthorById = createAsyncThunk(
  "updateAuthorById",
  async (author: Author) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/authors/${author.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(author)
        }
      )
      /*  const res = await fetch(
        `http://localhost:8080/api/v1/admin/authors/${author.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(author)
        }
      ) */

      const response = await res.json()
      if (!res.ok) {
        return response
      }
      return response
    } catch (error) {
      console.log("inisde catch  error ")
      return error
    }
  }
)

export const deleteAuthorById = createAsyncThunk(
  "deleteAuthorById",
  async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/authors/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      /*   const res = await fetch(
        `http://localhost:8080/api/v1/admin/authors/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ) */
      if (!res.ok) {
        const response = await res.json()
        return response
      }
      return { id }
    } catch (error) {
      return error
    }
  }
)
