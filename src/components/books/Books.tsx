/* eslint-disable prettier/prettier */
import { Avatar, IconButton } from "@mui/material"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import UpdateIcon from "@mui/icons-material/Update"
import DeleteIcon from "@mui/icons-material/Delete"
import BlockIcon from "@mui/icons-material/Block"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../hook/useAdmin"

import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook, deleteBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Book } from "../../types_variables/types"
import { Search } from "../search/Search"
import "./Books.css"
import {
  bDateString,
  rDateString,
  unique_id
} from "../../types_variables/constants"
import { userBorrowBook } from "../../redux/reducers/userReducer"

export const Books = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)

  const isAdmin = useAdmin()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])
  const handleUpdate = (id: string) => {
    navigate(`${id}/updateBook`)
  }
  const handleDelete = (book: Book) => {
    dispatch(deleteBook(book))
  }
  const handleBorrowBook = (book: Book) => {
    dispatch(borrowBook({ book, bDateString, rDateString, unique_id }))
    book = {
      ...book,
      borrowDate: bDateString,
      returnDate: rDateString,
      borrowId: unique_id
    }
    dispatch(userBorrowBook(book))
  }

  const handleDisplaySingleBook = (book: Book) => {
    navigate(`${book.id}/book`)
  }

  return (
    <div className="books-table">
      {" "}
      <Search></Search>
      <h2>Books</h2>
      <table id="books">
        <thead>
          <tr>
            <th>Cover</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Available</th>
            <th>Borrow</th>
            <th>Detail</th>
            {isAdmin && <th>Update</th>}
            {isAdmin && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <Avatar
                  src={book.cover}
                  variant="square"
                  sx={{ width: 70, height: 70 }}
                />
              </td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>

              <td>{book.status ? "Yes" : "No"}</td>
              {isLoggedIn ? (
                <td>
                  {book.status ? (
                    <IconButton onClick={() => handleBorrowBook(book)}>
                      <AutoStoriesIcon
                        sx={{ color: "#323232" }}
                      ></AutoStoriesIcon>
                    </IconButton>
                  ) : (
                    <BlockIcon
                      sx={{ color: "#323232", textAlign: "center" }}
                    ></BlockIcon>
                  )}
                </td>
              ) : (
                <td>
                  <span>Login to Borrow</span>
                </td>
              )}
              <td>
                <IconButton>
                  <ReadMoreIcon
                    sx={{ color: "#323232" }}
                    onClick={() => handleDisplaySingleBook(book)}
                  ></ReadMoreIcon>
                </IconButton>
              </td>
              {isAdmin && (
                <td>
                  <IconButton>
                    <UpdateIcon
                      sx={{ color: "#323232" }}
                      onClick={() => {
                        handleUpdate(book.id)
                      }}
                    ></UpdateIcon>
                  </IconButton>
                </td>
              )}
              {isAdmin && (
                <td>
                  <IconButton>
                    <DeleteIcon
                      sx={{ color: "#323232" }}
                      onClick={() => {
                        handleDelete(book)
                      }}
                    ></DeleteIcon>
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
