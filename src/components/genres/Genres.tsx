/* eslint-disable prettier/prettier */

import { Box, Container, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { getUserByToken } from "../../hook/getToken"
import { RootState } from "../../redux/store"
import { GenreCards } from "./GenreCards"

export const Genres = () => {
  const { items: genres } = useSelector((state: RootState) => state.genre)
  const { filteredGenres } = useSelector((state: RootState) => state.book)

  const { item: user } = useSelector((state: RootState) => state.user)

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
            sx={{ marginLeft: "-2rem", marginRight: "-10rem" }}
          >
            Welcome to Hel Library
          </Typography>
          <hr />
          <hr style={{ marginBottom: "2rem" }} />

          <Typography
            variant="h5"
            sx={{ marginLeft: "-20rem", marginRight: "-20rem" }}
            color="text.secondary"
            paragraph
          >
            Hel Library provides you very smooth and impressive journey.One can
            borrow books and return books when authenticated,Also User can see
            borrow and return date of borrowed books in their profile.You can
            find plenty of books from different genres and even Authors
            information and written books.In addition to that other users borrow
            informations also be displayed. <b>Admin</b>
            ,you are special so you can create,update,delete books and authors.
          </Typography>
        </Container>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          color: "#323232",
          fontWeight: "200",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
        }}
      >
        Books By Genre
      </Typography>
      {filteredGenres.length > 0 ? (
        <GenreCards genres={filteredGenres} />
      ) : (
        <GenreCards genres={genres} />
      )}
    </div>
  )
}
