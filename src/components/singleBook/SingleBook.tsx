/* eslint-disable prettier/prettier */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { borrowBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Book } from "../../types_variables/types"
import "./SingleBook.css"

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
    <section className="single-book">
      {singlebook && (
        <section className="single-book-container">
          <aside className="cover-borrow">
            <img src={singlebook.cover} alt="book cover" />
            {/* <i>Available</i>{" "}
            {singlebook.status ? <span>yes</span> : <span>No</span>} */}
            <button
              onClick={() => handleBorrowBook(singlebook)}
              disabled={!singlebook.status}
            >
              Borrow
            </button>
          </aside>
          <div className="second-half">
            <div className="title-author">
              <h1>
                {singlebook.title} <small className="by">by</small>{" "}
                <small className="author">{singlebook.authors.name}</small>
              </h1>
            </div>
            <div className="publisher">
              <div className="publisher-isbn">
                <i>ISBN</i>
                <span>{singlebook.isbn}</span>
              </div>
              <div className="publisher-name">
                <i>Publisher</i>
                <span>{singlebook.publisher}</span>
              </div>
              <div className="publisher-date">
                <i>Published Date</i>
                <span>{singlebook.publishedDate}</span>
              </div>
            </div>
            <div className="description">
              <p className="description-p">{singlebook.description}</p>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}
