/* eslint-disable prettier/prettier */

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { PartialBook } from "../../types_variables/types"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import "./UpdateBook.css"
import { BookForm } from "./BookForm"
import { Typography } from "@mui/material"

export const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [book, setBook] = useState<PartialBook>(initialBookstate)
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { items: genres } = useSelector((state: RootState) => state.genre)
  const label = "Create Book"
  const navigate = useNavigate()
  const handleSubmit = (e: any) => {
    e.preventDefault()
    book.id = unique_id
    dispatch(addBook(book))
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
