/* eslint-disable prettier/prettier */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../hook/useAdmin"

import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook, displayBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Book, GoogleLoggedInUser } from "../../types_variables/types"
import { SingleBook } from "../singleBook/SingleBook"
import { Search } from "../search/search"
import "./Books.scss"

export const Books = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)

  const isAdmin = useAdmin()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  const user = useSelector((state: RootState) => state.user.items)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])
  const handleUpdate = (id: string) => {
    navigate(`${id}/updateBook`)
  }
  const handleBorrowBook = (book: Book) => {
    dispatch(borrowBook(book))
  }

  const handleDisplaySingleBook = (book: Book) => {
    navigate(`${book.id}/book`)
  }

  return (
    <div>
      <h1>Books</h1>
      <Search></Search>
      <table id="books">
        <thead>
          <tr>
            <th>Cover</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Available</th>
            <th>Borrow</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <img src={book.cover} alt="" width={50} />
              </td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>

              <td>{book.status ? "Yes" : "No"}</td>
              {isLoggedIn ? (
                <td>
                  <button
                    onClick={() => handleBorrowBook(book)}
                    disabled={!book.status}
                  >
                    Borrow
                  </button>
                </td>
              ) : (
                <td>
                  <p>
                    <b>Login to Borrow</b>
                  </p>
                </td>
              )}
              <td>
                {isAdmin && (
                  <button
                    onClick={() => {
                      handleUpdate(book.id)
                    }}
                  >
                    Update
                  </button>
                )}
              </td>
              <td>
                {" "}
                <button onClick={() => handleDisplaySingleBook(book)}>
                  more
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
