/* eslint-disable prettier/prettier */

import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateBookById } from "../../redux/middlewares/bookThunk"

import { AppDispatch, RootState } from "../../redux/store"
import { initialBookstate } from "../../types_variables/constants"
import { BookDto } from "../../types_variables/types"
import { BookForm } from "./BookForm"
import "./UpdateBook.css"

export const UpdateBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: books } = useSelector((state: RootState) => state.book)
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { items: genres } = useSelector((state: RootState) => state.genre)
  const { bookId } = useParams()
  const [uBook, setUBook] = useState<BookDto>(initialBookstate)
  const navigate = useNavigate()
  const book: BookDto | undefined = books.find((bo) => bookId === bo.id)
  const label = "Update Book"

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (uBook) {
      dispatch(updateBookById(uBook))
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
        Update Book
      </Typography>
      {book && (
        <BookForm
          book={book}
          authors={authors}
          genres={genres}
          handleSubmit={handleSubmit}
          setBook={setUBook}
          label={label}
        ></BookForm>
      )}
    </div>
  )
}
