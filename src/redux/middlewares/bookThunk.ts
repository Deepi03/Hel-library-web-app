/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"

import { BookDto } from "../../types_variables/types"

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  try {
    const res = await fetch("http://localhost:8080/api/v1/books/")
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
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:8080/api/v1/admin/addBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book)
      })
      const createdBook = await res.json()
      if (!res.ok) {
        throw new Error("Something went wrong")
      }
      return createdBook
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
        `http://localhost:8080/api/v1/admin/updateBook/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(book)
        }
      )
      const updatedBook = await res.json()
      if (!res.ok) {
        throw new Error("Something went wromgh")
      }
      return updatedBook
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
        `http://localhost:8080/api/v1/admin/deleteBook/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!res.ok) {
        throw new Error("something went wrong")
      }
      return { id }
    } catch (error) {
      return error
    }
  }
)
