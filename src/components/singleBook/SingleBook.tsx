/* eslint-disable prettier/prettier */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Book } from "../../types_variables/types"

export const SingleBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)
  const singlebook = books.find((book) => book.id === bookId)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  const handleBorrowBook = (book: Book) => {
    dispatch(borrowBook(book))
  }
  return (
    <div>
      {singlebook && (
        <div>
          <div>
            <img src={singlebook.cover} alt="book cover" />
            <i>Available</i>{" "}
            {singlebook.status ? <span>yes</span> : <span>No</span>}
            <button
              onClick={() => handleBorrowBook(singlebook)}
              disabled={!singlebook.status}
            >
              Borrow
            </button>
          </div>
          <div>
            <h4>{singlebook.title}</h4>
            <i>by</i>
            <h6>{singlebook.authors.name}</h6>
          </div>
          <div>
            <div>
              <i>Published Date</i>
              <span>{singlebook.publishedDate}</span>
            </div>
            <div>
              <i>Publisher</i>
              <span>{singlebook.publisher}</span>
            </div>
            <div>
              <i>ISBN</i>
              <span>{singlebook.isbn}</span>
            </div>
          </div>
          <div>
            <p>{singlebook.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
