/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"

import { addBooks, updateBook } from "../../redux/reducers/bookReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialBookstate, PartialBook } from "../../types/types"

export const UpdateBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book)
  const unique_id = uuid()
  const { bookId } = useParams()
  const [uBook, setUBook] = useState<PartialBook>(initialBookstate)
  const book = books.items.find((bo) => bookId === bo.id)

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
    </div>
  )
}
