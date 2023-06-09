import { useDispatch, useSelector } from "react-redux"
import { InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { search } from "../../redux/slices/bookSlice"

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
        display: "flex",
        width: 400,
        ml: "auto",
        mr: "2rem",
        borderRadius: "0.5rem",
        border: "0.5px solid #323232"
      }}
    >
      <InputBase
        sx={{
          flex: 1,
          padding: "4px 10px 5px"
        }}
        placeholder="Search by Genre"
        inputProps={{ "aria-label": "Search" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon sx={{ p: "10px", fontSize: "20px" }} />
    </Paper>
  )
}
