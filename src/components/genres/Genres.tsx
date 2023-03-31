/* eslint-disable prettier/prettier */

import { Box, Container, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useAdmin } from "../../hook/useAdmin"

import { RootState } from "../../redux/store"
import { GenreCards } from "./GenreCards"

export const Genres = () => {
  const { items: genres, filteredGenres } = useSelector(
    (state: RootState) => state.genre
  )

  const isAdmin = useAdmin()

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
            align="center"
            color="text.primary"
            gutterBottom
          >
            Hel Library
          </Typography>

          {isAdmin ? (
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Hel Library provides you very smooth and impressive journey.
              <b>Admin</b>,you can also borrow books and return books when
              authenticated via Google,Also User can see your borrow and return
              date of books you borrowed in your profile.In addition to that
              other users borrow informations also be displayed. <b>Admin</b>
              ,you are special so you can create,update,delete books and
              authors.
            </Typography>
          ) : (
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Hel Library provides you very smooth and impressive journey.One
              can borrow books and return books when authenticated via
              Google,Also User can see borrow and return date of borrowed books
              in their profile.You can find plenty of books from different
              genres and even Authors information and written books
            </Typography>
          )}
        </Container>
      </Box>
      {filteredGenres.length > 0 ? (
        <GenreCards genres={filteredGenres} />
      ) : (
        <GenreCards genres={genres} />
      )}
    </div>
  )
}
