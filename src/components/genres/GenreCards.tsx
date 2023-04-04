/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography
} from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { filterBooksByGenre } from "../../redux/reducers/booksReducer"

import { AppDispatch, RootState } from "../../redux/store"
import { Genre } from "../../types_variables/types"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}
export const GenreCards = ({ genres }: { genres: Genre[] }) => {
  const dispatch = useDispatch<AppDispatch>()

  const { filteredBooks: books } = useSelector((state: RootState) => state.book)
  const [open, setOpen] = useState(false)

  const handleOpen = (genreId: string) => {
    if (genreId) {
      dispatch(filterBooksByGenre(genreId))
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {genres.map((genre) => (
            <Grid item key={genre.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "20"
                  }}
                  image={genre.cover}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{
                      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
                    }}
                  >
                    {genre.name.toUpperCase()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: [
                        "Roboto",
                        "Helvetica",
                        "Arial",
                        "sans-serif"
                      ],
                      fontWeight: "1.8rem"
                    }}
                  >
                    {genre.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    onClick={() => handleOpen(genre.id)}
                    sx={{ mr: "2rem", color: "#9C28B0" }}
                  >
                    View Books
                  </Button>
                  {/* <Button size="small">Edit</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal container */}
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Books
            </Typography>
            <List sx={{ textDecoration: "none" }}>
              {books.map((book) => (
                <ListItem disablePadding key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <ListItemText>{book.title}</ListItemText>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Container>
    </div>
  )
}
