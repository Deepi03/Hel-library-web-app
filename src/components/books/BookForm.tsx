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
import { FormEventHandler } from "react"
import { Author, Book, Genre, PartialBook } from "../../types_variables/types"

type Props = {
  book: PartialBook | Book | undefined
  authors: Author[]
  genres: Genre[]
  handleSubmit: FormEventHandler<HTMLFormElement>
  setBook: React.Dispatch<React.SetStateAction<Partial<Book>>>
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
  return (
    <form onSubmit={handleSubmit}>
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
                  defaultValue={book?.authorId}
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
                required
                labelId="genres-label"
                id="genres-select"
                defaultValue={book?.genreId}
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
          <Box>
            <TextField
              required
              type="date"
              name="publishDate"
              id="publish-date-edit"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setBook({ ...book, publishedDate: e.target.value })
              }
              defaultValue={book?.publishedDate}
              fullWidth
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
              defaultValue={book?.cover}
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
    </form>
  )
}
