/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { PartialBook } from "../../types_variables/types"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import "./UpdateBook.css"

export const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [book, setBook] = useState<PartialBook>(initialBookstate)
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { items: genres } = useSelector((state: RootState) => state.genre)
  const handleSubmit = () => {
    book.id = unique_id
    dispatch(addBook(book))
  }
  return (
    <div>
      <Box sx={{ paddingBottom: "20em", color: "#323232" }}>
        <Typography
          variant="h4"
          sx={{
            paddingBottom: "1em",
            textAlign: "center",
            paddingTop: "2em",
            color: "#323232",
            fontWeight: "200",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
          }}
        >
          Create Book
        </Typography>
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="isbn"
              fullWidth
              autoComplete="isbn"
              required={true}
              value={book.isbn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBook({ ...book, isbn: e.target.value })
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="title"
              type="text"
              fullWidth
              autoComplete="title"
              autoFocus
              required
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="authors-label">Author</InputLabel>
              <Box mb={2}>
                <Select
                  labelId="authors-label"
                  id="authors-select"
                  value={book.authorId}
                  label="author"
                  onChange={(e) => {
                    setBook({ ...book, authorId: e.target.value })
                  }}
                  sx={{
                    pb: 0.15,
                    pl: 10,
                    width: "100%",
                    color: "#323232",
                    textAlign: "center",
                    fontWeight: "300"
                  }}
                >
                  {authors.map((author) => (
                    <MenuItem value={author.id} key={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="genres-label">Genre</InputLabel>
              <Select
                labelId="genres-label"
                id="genres-select"
                value={book.genreId}
                label="Genre"
                onChange={(e) => {
                  setBook({ ...book, genreId: e.target.value })
                }}
                sx={{
                  pb: 0.15,
                  pl: 10,
                  width: "100%",
                  color: "#323232",
                  textAlign: "center",
                  fontWeight: "300"
                }}
              >
                {genres.map((genre) => (
                  <MenuItem value={genre.id} key={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="publisher"
              fullWidth
              autoComplete="publisher"
              autoFocus
              type="text"
              required
              value={book.publisher}
              onChange={(e) =>
                setBook({
                  ...book,
                  publisher: e.target.value
                })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="description"
              fullWidth
              autoComplete="description"
              autoFocus
              type="text"
              required
              value={book.description}
              onChange={(e) =>
                setBook({
                  ...book,
                  description: e.target.value
                })
              }
            />
          </Box>
          <Box>
            <TextField
              type="date"
              name="publishDate"
              id="publish-date-edit"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setBook({ ...book, publishedDate: e.target.value })
              }
              value={book?.publishedDate}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="cover"
              fullWidth
              autoComplete="cover"
              autoFocus
              type="text"
              required
              value={book.cover}
              onChange={(e) =>
                setBook({
                  ...book,
                  cover: e.target.value
                })
              }
            />
          </Box>
          <Button
            type="submit"
            variant="filled"
            color="primary"
            fullWidth
            onClick={() => {
              handleSubmit()
            }}
            sx={{ bgcolor: "#DDD0C8", color: "btn.text" }}
          >
            Create Book
          </Button>
        </Card>
      </Box>
    </div>
  )
}
