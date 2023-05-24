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

import {
  singleBookFilter,
  sortBookByAvailable,
  sortBookByTitle
} from "../../redux/slices/bookSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { BookDto, Days } from "../../types_variables/types"
import "./Books.css"
import { deleteBookById } from "../../redux/middlewares/bookThunk"
import { LoginButton } from "../LoginButton"
import { borrowBook } from "../../redux/middlewares/transactionThunk"
import { toast } from "react-toastify"

export const BooksTable = ({ books }: { books: BookDto[] }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { item: user } = useSelector((state: RootState) => state.user)
  const { error } = useSelector((state: RootState) => state.book)
  const handleUpdate = (id: string) => {
    navigate(`/${id}/updateBook`)
  }
  const handleDelete = (book: BookDto) => {
    if (book.id) {
      dispatch(deleteBookById(book.id))
    }
  }
  const handleBorrowBook = (bookId: string | undefined) => {
    const userId = user?.id
    const day = Days.THIRTY
    if (userId && bookId) {
      dispatch(borrowBook({ bookId, userId, day }))
    }
  }

  const handleDisplaySingleBook = (book: BookDto) => {
    navigate(`${book.id}`)
    dispatch(singleBookFilter(book.id))
  }
  const handleAddBook = () => {
    navigate("/addBook")
  }
  const handleSortByTitle = () => {
    dispatch(sortBookByTitle())
  }
  const handleSortByAvailable = () => {
    dispatch(sortBookByAvailable())
  }
  return (
    <div className="books-table">
      {user?.role === "ADMIN" && (
        <button className="add-btn" onClick={() => handleAddBook()}>
          Add Book
        </button>
      )}

      <table id="books">
        <thead>
          <tr>
            <th>Cover</th>
            <th>ISBN</th>

            <th onClick={() => handleSortByTitle()}>
              Title <SortIcon />
            </th>
            <th>Author</th>
            <th onClick={() => handleSortByAvailable()}>
              Available <SortIcon />
            </th>
            <th>Borrow</th>
            <th>Detail</th>
            {user?.role === "ADMIN" && <th>Update</th>}
            {user?.role === "ADMIN" && <th>Delete</th>}
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
                {authors.find((author) => author.id === book.author)?.name}
              </td>
              <td>{book.available ? "Yes" : "No"}</td>
              {user ? (
                <td>
                  {book.available ? (
                    <IconButton>
                      <AutoStoriesIcon
                        sx={{
                          color: "#323232",
                          "&:hover": {
                            boxShadow: "none",
                            color: "blue"
                          }
                        }}
                        onClick={() => handleBorrowBook(book.id)}
                      ></AutoStoriesIcon>
                    </IconButton>
                  ) : (
                    <BlockIcon
                      sx={{ color: "#323232", textAlign: "center" }}
                    ></BlockIcon>
                  )}
                </td>
              ) : (
                <div style={{ marginTop: "2rem" }}>
                  <LoginButton />
                </div>
              )}

              <td>
                <IconButton>
                  <ReadMoreIcon
                    sx={{
                      color: "#323232",
                      "&:hover": {
                        boxShadow: "none",
                        color: "#9C28B0"
                      }
                    }}
                    onClick={() => handleDisplaySingleBook(book)}
                  ></ReadMoreIcon>
                </IconButton>
              </td>
              {user?.role === "ADMIN" && (
                <td>
                  <IconButton>
                    <UpdateIcon
                      sx={{
                        color: "#323232",
                        "&:hover": {
                          boxShadow: "none",
                          color: "green"
                        }
                      }}
                      onClick={() => {
                        if (book.id) {
                          handleUpdate(book.id)
                        }
                      }}
                    ></UpdateIcon>
                  </IconButton>
                </td>
              )}
              {user?.role === "ADMIN" && (
                <td>
                  <IconButton>
                    <DeleteIcon
                      sx={{
                        color: "#323232",
                        "&:hover": {
                          boxShadow: "none",
                          color: "red"
                        }
                      }}
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
      {error &&
        toast.error(<div>{error}</div>, {
          position: "bottom-right"
        })}
    </div>
  )
}
