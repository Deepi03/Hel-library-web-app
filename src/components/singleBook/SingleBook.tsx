/* eslint-disable prettier/prettier */
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { borrowBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import {
  bDate,
  bDateString,
  rDate,
  unique_id
} from "../../types_variables/constants"
import { Book } from "../../types_variables/types"
import { Login } from "../login/Login"
import "./SingleBook.css"

export const SingleBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn, item } = useSelector((state: RootState) => state.user)
  const userId = item?.id

  const singleBook = useSelector((state: RootState) =>
    state.book.items.find((book) => book.id === bookId)
  )
  const { items: authors } = useSelector((state: RootState) => state.author)

  const [days, setDays] = useState(30)

  const handleBorrowBook = (book: Book) => {
    dispatch(borrowBook({ book, unique_id, userId, days }))
  }

  return (
    <section className="single-book">
      {singleBook ? (
        <section className="single-book-container">
          <aside className="cover-borrow">
            <img src={singleBook.cover} alt="book cover" />
          </aside>
          <div className="second-half">
            <div className="title-author">
              <h1>
                {singleBook.title} <small className="by">by</small>{" "}
                <small className="author">
                  {
                    authors.find((author) => author.id === singleBook.authorId)
                      ?.name
                  }
                </small>
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
            {isLoggedIn ? (
              <div style={{ display: "flex", gap: "2rem" }}>
                {singleBook.status && (
                  <Box mb={2} sx={{ mt: "2rem", ml: "2rem" }}>
                    <FormControl fullWidth>
                      <InputLabel id="days">No. of days</InputLabel>
                      <Select
                        labelId="days"
                        id="days-select"
                        value={days}
                        label="Genre"
                        onChange={(e) => {
                          setDays(e.target.value as number)
                        }}
                        sx={{
                          pb: 0.15,
                          pl: 10,
                          width: "100%",
                          color: "#323232",
                          textAlign: "center",
                          fontWeight: "300"
                        }}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
                <button
                  className="borrow-book-btn"
                  onClick={() => handleBorrowBook(singleBook)}
                  disabled={!singleBook.status}
                >
                  Borrow
                </button>
              </div>
            ) : (
              <Login></Login>
            )}
          </div>
        </section>
      ) : (
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
        </Box>
      )}
    </section>
  )
}
