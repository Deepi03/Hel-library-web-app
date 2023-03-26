/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { updateBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import { PartialBook } from "../../types_variables/types"

export const UpdateBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)

  const { bookId } = useParams()
  const [uBook, setUBook] = useState<PartialBook>(initialBookstate)
  const book = books.find((bo) => bookId === bo.id)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateBook(uBook))
  }
  return (
    <div>
      {book && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="isbn">Isbn</label>
          <input
            type="text"
            name="isbn"
            defaultValue={book.isbn}
            disabled={false}
            onChange={(e) => {
              setUBook({ ...book, isbn: e.target.value })
            }}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={book.title}
            onChange={(e) => setUBook({ ...book, title: e.target.value })}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            defaultValue={book.authors?.name}
            onChange={(e) =>
              setUBook({
                ...book,
                authors: { id: unique_id, name: e.target.value }
              })
            }
          />
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            name="publisher"
            defaultValue={book.publisher}
            onChange={(e) =>
              setUBook({
                ...book,
                publisher: e.target.value
              })
            }
          />
          <label htmlFor="publishedDate">Published Date</label>
          <input
            type="date"
            name="publishedDate"
            pattern="\d{4}-\d{2}-\d{2}"
            defaultValue={book.publishedDate}
            onChange={(e) =>
              setUBook({
                ...book,
                publishedDate: String(e.target.value)
              })
            }
          />
          <label htmlFor="cover">Cover</label>
          <input
            type="text"
            name="cover"
            defaultValue={book.cover}
            onChange={(e) =>
              setUBook({
                ...book,
                cover: e.target.value
              })
            }
          />
          <input type="submit" value={"submit"} />
        </form>
      )}
      {/* <p>{book && book.isbn}</p>
      <p>{book?.authors.name}</p>
      <p>{book?.title}</p>
      <p>{book?.description}</p>
      <p>{book?.publishedDate}</p> */}
    </div>
  )
}
