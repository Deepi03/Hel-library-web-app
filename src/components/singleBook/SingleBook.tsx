/* eslint-disable prettier/prettier */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook, singleBookFilter } from "../../redux/reducers/booksReducer"
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
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.isLoggedIn
  })
  const userEmail = useSelector((state: RootState) => state.user.item?.email)

  useEffect(() => {
    dispatch(singleBookFilter(bookId))
  }, [bookId])
  const books = useSelector((state: RootState) => state.book.items)
  const handleBorrowBook = (book: Book) => {
    console.log("book", book.id)
    dispatch(
      borrowBook({ book, bDateString, rDateString, unique_id, userEmail })
    )
  }
  return (
    <section className="single-book">
      {books && (
        <section className="single-book-container">
          <aside className="cover-borrow">
            <img src={books[0].cover} alt="book cover" />
            {isLoggedIn ? (
              <button
                onClick={() => handleBorrowBook(books[0])}
                disabled={!books[0].status}
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
                {books[0].title} <small className="by">by</small>{" "}
                <small className="author">{books[0].authors.name}</small>
              </h1>
            </div>
            <div className="publisher">
              <div className="publisher-isbn">
                <i>ISBN</i>
                <span>{books[0].isbn}</span>
              </div>
              <div className="publisher-name">
                <i>Publisher</i>
                <span>{books[0].publisher}</span>
              </div>
              <div className="publisher-date">
                <i>Published Date</i>
                <span>{books[0].publishedDate}</span>
              </div>
            </div>
            <div className="description">
              <p className="description-p">{books[0].description}</p>
            </div>
          </div>
        </section>
      )}
      <p>Single</p>
    </section>
  )
}
