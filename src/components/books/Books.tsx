/* eslint-disable prettier/prettier */

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { BooksTable } from "./BooksTable"

export const Books = () => {
  const { items: books, filteredBooks } = useSelector(
    (state: RootState) => state.book
  )
  return (
    <div className="books-table">
      {filteredBooks.length > 0 ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksTable books={books} />
      )}
    </div>
  )
}
