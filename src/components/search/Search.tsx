import { useDispatch } from "react-redux"
import { InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { AppDispatch } from "../../redux/store"
import { searchByBookTitle } from "../../redux/reducers/booksReducer"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSearch = (e: any) => {
    if (e.target.value.length > 0) {
      dispatch(searchByBookTitle(e.target.value))
    } else {
      dispatch(fetchBooks())
    }
  }
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mt: "4rem",
          ml: "auto",
          mr: "auto"
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
          onChange={handleSearch}
        />
        <SearchIcon sx={{ p: "10px" }} />
      </Paper>
    </div>
  )
}
