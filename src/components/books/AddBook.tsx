/* eslint-disable prettier/prettier */

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { AppDispatch, RootState } from "../../redux/store"
import { BookDto } from "../../types_variables/types"
import { initialBookstate } from "../../types_variables/constants"
import "./UpdateBook.css"
import { BookForm } from "./BookForm"
import { Typography } from "@mui/material"
import { createBook } from "../../redux/middlewares/bookThunk"

export const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [book, setBook] = useState<BookDto>(initialBookstate)
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { items: genres } = useSelector((state: RootState) => state.genre)
  const navigate = useNavigate()

  const label = "Create Book"
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (book) {
      dispatch(createBook(book))
    }
    setTimeout(() => {
      navigate("/books")
    }, 300)
  }

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          paddingBottom: "1em",
          textAlign: "center",
          paddingTop: "2em",
          color: "#323232",
          fontWeight: "200",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
        }}
      >
        Create Book
      </Typography>
      <BookForm
        book={book}
        authors={authors}
        genres={genres}
        handleSubmit={handleSubmit}
        setBook={setBook}
        label={label}
      ></BookForm>
    </div>
  )
}
