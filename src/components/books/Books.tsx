/* eslint-disable prettier/prettier */
import { Avatar, IconButton } from "@mui/material"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import UpdateIcon from "@mui/icons-material/Update"
import DeleteIcon from "@mui/icons-material/Delete"
import BlockIcon from "@mui/icons-material/Block"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import SortIcon from "@mui/icons-material/Sort"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useAdmin } from "../../hook/useAdmin"
import {
  borrowBook,
  deleteBook,
  singleBookFilter,
  sortBookByTitle
} from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Book } from "../../types_variables/types"
import { Search } from "../search/Search"
import "./Books.css"
import {
  bDateString,
  rDateString,
  unique_id
} from "../../types_variables/constants"

export const Books = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items: books } = useSelector((state: RootState) => state.book)
  const { items: authors } = useSelector((state: RootState) => state.author)

  const isAdmin = useAdmin()
  const { isLoggedIn, item } = useSelector((state: RootState) => state.user)
  const userEmail = item?.email
  const handleUpdate = (id: string) => {
    navigate(`/${id}/updateBook`)
  }
  const handleDelete = (book: Book) => {
    dispatch(deleteBook(book))
  }
  const handleBorrowBook = (book: Book) => {
    dispatch(
      borrowBook({ book, bDateString, rDateString, unique_id, userEmail })
    )
  }

  const handleDisplaySingleBook = (book: Book) => {
    navigate(`${book.id}`)
    dispatch(singleBookFilter(book.id))
  }
  const handleAddBook = () => {
    navigate("/addBook")
  }

  const handleSort = () => {
    dispatch(sortBookByTitle())
  }

  return (
    <div className="books-table">
      <Search></Search>
      {isAdmin && (
        <button className="add-btn" onClick={() => handleAddBook()}>
          Add Book
        </button>
      )}
      <h2>Books</h2>
      <table id="books">
        <thead>
          <tr>
            <th>Cover</th>
            <th>ISBN</th>

            <th onClick={() => handleSort()}>
              Title <SortIcon />
            </th>
            <th>Author</th>
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
              <td>
                {authors.find((author) => author.id === book.authorId)?.name}
              </td>
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
      {/*  <button onClick={() => handleSort()}>sort</button> */}
    </div>
  )
}
