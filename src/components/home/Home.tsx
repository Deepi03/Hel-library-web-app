/* eslint-disable prettier/prettier */
import { Box } from "@mui/material"
import { Genres } from "../genres/Genres"
import { Search } from "../search/Search"

export const Home = () => {
  return (
    <div>
      <Box sx={{ marginTop: "4rem", marginRight: "1rem" }}>
        {/* <Search></Search> */}
      </Box>
      <Genres></Genres>
    </div>
  )
}
