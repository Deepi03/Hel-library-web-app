/* eslint-disable prettier/prettier */
import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import {
  bDateString,
  rDateString,
  unique_id
} from "../../types_variables/constants"
import { Book } from "../../types_variables/types"
import "./SingleBook.css"

export const SingleBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn, item } = useSelector((state: RootState) => state.user)
  const userEmail = item?.email

  const singleBook = useSelector((state: RootState) =>
    state.book.items.find((book) => book.id === bookId)
  )

  console.log("single book", singleBook)
  const handleBorrowBook = (book: Book) => {
    dispatch(
      borrowBook({ book, bDateString, rDateString, unique_id, userEmail })
    )
  }

  return (
    <section className="single-book">
      {
        singleBook && (
          <section className="single-book-container">
            <aside className="cover-borrow">
              <img src={singleBook.cover} alt="book cover" />
              {isLoggedIn ? (
                <button
                  onClick={() => handleBorrowBook(singleBook)}
                  disabled={!singleBook.status}
                >
                  Borrow
                </button>
              ) : (
                <p>Login to Borrow</p>
              )}
            </aside>
            <div className="second-half">
              <div className="title-author">
                <h1>
                  {singleBook.title} <small className="by">by</small>{" "}
                  <small className="author">{singleBook.authors.name}</small>
                </h1>
              </div>
              <div className="publisher">
                <div className="publisher-isbn">
                  <i>ISBN</i>
                  <span>{singleBook.isbn}</span>
                </div>
                <div className="publisher-name">
                  <i>Publisher</i>
                  <span>{singleBook.publisher}</span>
                </div>
                <div className="publisher-date">
                  <i>Published Date</i>
                  <span>{singleBook.publishedDate}</span>
                </div>
              </div>
              <div className="description">
                <p className="description-p">{singleBook.description}</p>
              </div>
            </div>
          </section>
        ) /* : (
        <Box sx={{ paddingBottom: "20em", color: "#323232" }}>
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
            Book Not found
          </Typography>
        </Box> */
      }
    </section>
  )
}
