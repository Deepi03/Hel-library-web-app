import { useDispatch, useSelector } from "react-redux"
import { InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { search } from "../../redux/reducers/booksReducer"

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { author, genre } = useSelector((state: RootState) => state)
  const authors = author.items
  const genres = genre.items
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(search({ searchTerm, authors, genres }))
  }, [searchTerm])

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 900,
        mt: "4rem",
        ml: "auto",
        mr: "auto",
        borderRadius: "0.9rem",
        border: "1px solid #323232"
      }}
    >
      <InputBase
        sx={{
          flex: 1
        }}
        placeholder="Search genres,books and authors"
        inputProps={{ "aria-label": "Search" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon sx={{ p: "10px", fontSize: "32px" }} />
    </Paper>
  )
}
