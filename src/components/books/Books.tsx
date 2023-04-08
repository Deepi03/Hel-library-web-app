/* eslint-disable prettier/prettier */

import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Search } from "../search/Search"
import { BooksTable } from "./BooksTable"

export const Books = () => {
  const { items: books, filteredBooks } = useSelector(
    (state: RootState) => state.book
  )

  return (
    <div className="books-table">
      <Box sx={{ marginTop: "4rem", marginRight: "1rem" }}>
        {/* <Search></Search> */}
      </Box>
      {filteredBooks.length > 0 ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksTable books={books} />
      )}
    </div>
  )
}
