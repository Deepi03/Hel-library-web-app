/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { FormEventHandler } from "react"

import { Author, BookDto, Genre } from "../../types_variables/types"

type Props = {
  book: BookDto
  authors: Author[]
  genres: Genre[]
  handleSubmit: FormEventHandler<HTMLFormElement>
  setBook: React.Dispatch<React.SetStateAction<BookDto>>
  label: string
}

export const BookForm = ({
  book,
  authors,
  genres,
  handleSubmit,
  setBook,
  label
}: Props) => {
  const menuItems = [
    { id: "0", label: "Yes", value: "true" },
    { id: "2", label: "No", value: "false" }
  ]

  return (
    <form onSubmit={handleSubmit}>
      (
      <Box sx={{ paddingBottom: "20em", color: "#323232" }}>
        (
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="isbn"
              fullWidth
              autoComplete="isbn"
              required
              defaultValue={book?.isbn}
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
              defaultValue={book?.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="authors-label">Author</InputLabel>
              <Box mb={2}>
                <Select
                  required
                  labelId="authors-label"
                  id="authors-select"
                  defaultValue={book.author}
                  label="author"
                  onChange={(e) => {
                    setBook({
                      ...book,
                      author: e.target.value
                    })
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
                required
                labelId="genres-label"
                id="genres-select"
                defaultValue={book?.genre}
                label="Genre"
                onChange={(e) => {
                  setBook({ ...book, genre: e.target.value })
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
              defaultValue={book?.publisher}
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
              defaultValue={book?.description}
              onChange={(e) =>
                setBook({
                  ...book,
                  description: e.target.value
                })
              }
            />
          </Box>
          {/* <Box mb={2}>
            <TextField
              required
              type="date"
              name="publishDate"
              id="publish-date-edit"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setBook({
                  ...book,
                  publishedDate: e.target.value
                })
              }
              defaultValue={book?.publishedDate}
              fullWidth
              sx={{ mb: 4 }}
            /> */}
          <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs(book.publishedDate)}
                onChange={(newValue) =>
                  newValue &&
                  setBook({
                    ...book,
                    publishedDate: newValue.toString()
                  })
                }
              />
            </LocalizationProvider>
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
              defaultValue={book?.cover}
              onChange={(e) =>
                setBook({
                  ...book,
                  cover: e.target.value
                })
              }
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="available-label">Available</InputLabel>
              <Select
                required
                labelId="available-label"
                id="available-select"
                defaultValue={book?.available ? "true" : "false"}
                label="Available"
                onChange={(e: SelectChangeEvent<string>) => {
                  setBook({
                    ...book,
                    available: e.target.value === "true" ? true : false
                  })
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
                {menuItems.map((menu) => (
                  <MenuItem value={menu.value} key={menu.id}>
                    {menu.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              bgcolor: "#DDD0C8",
              color: "btn.text",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
            }}
          >
            {label}
          </Button>
        </Card>
        )
      </Box>
      )
    </form>
  )
}
