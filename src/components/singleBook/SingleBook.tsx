import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"
import { AppDispatch, RootState } from "../../redux/store"

export const SingleBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)
  const singlebook = books.find((book) => book.id === bookId)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])
  return <div>{singlebook && <p>{singlebook.title}</p>}</div>
}
