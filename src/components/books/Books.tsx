import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"

import { AppDispatch, RootState } from "../../redux/store"
import "./Books.scss"

export const Books = () => {
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])
  console.log(books.items.map((book) => book.title))
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
