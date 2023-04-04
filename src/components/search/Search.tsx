import { useDispatch } from "react-redux"
import { InputBase, Paper, styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { AppDispatch } from "../../redux/store"
import { useEffect, useState } from "react"
import { searchByBookTitle } from "../../redux/reducers/booksReducer"
import { searchByGenre } from "../../redux/reducers/genresReducer"
import { searchByAuthorName } from "../../redux/reducers/authorReducer"

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(searchByBookTitle(searchTerm))
    dispatch(searchByGenre(searchTerm))
    dispatch(searchByAuthorName(searchTerm))
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
        sx={{ flex: 1, textAlign: "center" }}
        placeholder="Search genres,books and authors"
        inputProps={{ "aria-label": "Search" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon sx={{ p: "10px", fontSize: "32px" }} />
    </Paper>
  )
}
