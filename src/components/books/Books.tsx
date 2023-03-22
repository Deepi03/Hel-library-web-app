/* eslint-disable prettier/prettier */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { updateBook } from "../../redux/reducers/bookReducer"

import { AppDispatch, RootState } from "../../redux/store"
import "./Books.scss"
import { UpdateBook } from "./updateBook"

export const Books = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  const handleUpdate = (id: string) => {
    navigate(`${id}/updateBook`)
  }

  return (
    <div>
      <h1>Books</h1>
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
          {books.items.map((book) => (
            <tr key={book.id}>
              <td>
                <img src={book.cover} alt="" width={50} />
              </td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>

              <td>{book.status === true ? "Yes" : "No"}</td>
              <td>
                <button>Borrow</button>
              </td>
              <td>
                {
                  <button
                    onClick={() => {
                      handleUpdate(book.id)
                    }}
                  >
                    Update
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
