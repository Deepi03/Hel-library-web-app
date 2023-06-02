/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"

import { BookDto } from "../../types_variables/types"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    const res = await fetch(
      "https://hel-library-web-service.onrender.com/api/v1/books/"
    )
    /* const res = await fetch("http://localhost:8080/api/v1/books/") */
    const books: BookDto[] = await res.json()
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
        `https://hel-library-web-service.onrender.com/api/v1/books/${id}`
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
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(book)
        }
      )
      /*   const res = await fetch(`http://localhost:8080/api/v1/admin/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book)
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

export const updateBookById = createAsyncThunk(
  "updateBookById",
  async (book: BookDto) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/books/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(book)
        }
      )
      /* const res = await fetch(
        `http://localhost:8080/api/v1/admin/books/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(book)
        }
      ) */
      const resposne = await res.json()
      if (!res.ok) {
        return resposne
      }
      return resposne
    } catch (error) {
      return error
    }
  }
)

export const deleteBookById = createAsyncThunk(
  "deleteBookById",
  async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `https://hel-library-web-service.onrender.com/api/v1/admin/books/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      /*  const res = await fetch(
        `http://localhost:8080/api/v1/admin/books/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ) */
      if (!res.ok) {
        const resposne = await res.json()
        return resposne
      }
      return { id }
    } catch (error) {
      return error
    }
  }
)
