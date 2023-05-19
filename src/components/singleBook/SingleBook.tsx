/* eslint-disable prettier/prettier */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserByToken } from "../../hook/getToken"
import { borrowBook } from "../../redux/middlewares/transactionThunk"
import { AppDispatch, RootState } from "../../redux/store"
import { Days } from "../../types_variables/types"
import { Login } from "../login/Login"
import "./SingleBook.css"

export const SingleBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const user = getUserByToken()
  const singleBook = useSelector((state: RootState) =>
    state.book.items.find((book) => book.id === bookId)
  )
  const { items: authors } = useSelector((state: RootState) => state.author)
  const [day, setDays] = useState<Days>(Days.THIRTY)
  const handleBorrowBook = (bookId: string | undefined) => {
    const userId = user?.id
    if (userId && bookId) {
      dispatch(borrowBook({ bookId, userId, day }))
    }
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
                    authors.find((author) => author.id === singleBook.author)
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
                <span>{singleBook.publishedDate.substring(0, 10)}</span>
              </div>
            </div>
            <div className="description">
              <p className="description-p">{singleBook.description}</p>
            </div>
            {user ? (
              <div style={{ display: "flex", gap: "2rem" }}>
                {singleBook.available && (
                  <Box mb={2} sx={{ mt: "2rem", ml: "2rem" }}>
                    <FormControl fullWidth>
                      <InputLabel id="days">No. of days</InputLabel>
                      <Select
                        labelId="days"
                        id="days-select"
                        value={day}
                        label="Genre"
                        onChange={(e) => {
                          setDays(e.target.value as Days)
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
                        <MenuItem value={"TEN"}>Ten</MenuItem>
                        <MenuItem value={"TWENTY"}>Twenty</MenuItem>
                        <MenuItem value={"THIRTY"}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
                <button
                  className="borrow-book-btn"
                  onClick={() => handleBorrowBook(singleBook.id)}
                  disabled={!singleBook.available}
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
