/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { addBook } from "../../redux/reducers/booksReducer"
import { AppDispatch } from "../../redux/store"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import { PartialBook } from "../../types_variables/types"

export const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [book, setBook] = useState<PartialBook>(initialBookstate)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    book.id = unique_id
    dispatch(addBook(book))
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="isbn">Isbn</label>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, isbn: e.target.value })
          }}
          required
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          required
          value={book.authors?.name}
          onChange={(e) =>
            setBook({
              ...book,
              authors: { id: unique_id, name: e.target.value }
            })
          }
        />
        <label htmlFor="publisher">Publisher</label>
        <input
          type="text"
          name="publisher"
          required
          value={book.publisher}
          onChange={(e) =>
            setBook({
              ...book,
              publisher: e.target.value
            })
          }
        />
        <label htmlFor="publisher">Description</label>
        <input
          type="text-area"
          name="description"
          required
          value={book.description}
          onChange={(e) =>
            setBook({
              ...book,
              description: e.target.value
            })
          }
        />
        <label htmlFor="publishedDate">Published Date</label>
        <input
          type="date"
          name="publishedDate"
          required
          pattern="\d{4}-\d{2}-\d{2}"
          value={book.publishedDate}
          onChange={(e) =>
            setBook({
              ...book,
              publishedDate: String(e.target.value)
            })
          }
        />
        <label htmlFor="cover">Cover</label>
        <input
          type="text"
          name="cover"
          required
          value={book.cover}
          onChange={(e) =>
            setBook({
              ...book,
              cover: e.target.value
            })
          }
        />
        <input type="submit" value={"submit"} />
      </form>
    </div>
  )
}
