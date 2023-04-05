/* eslint-disable prettier/prettier */

import { Box } from "@mui/material"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { Search } from "../search/Search"
import { AuthorsTable } from "./AuthorsTable"

export const Authors = () => {
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { filteredAuthors } = useSelector((state: RootState) => state.book)

  return (
    <div>
      <Box sx={{ marginTop: "4rem", marginRight: "1rem" }}>
        <Search></Search>
      </Box>
      {filteredAuthors.length > 0 ? (
        <AuthorsTable authors={filteredAuthors} />
      ) : (
        <AuthorsTable authors={authors} />
      )}
    </div>
  )
}
