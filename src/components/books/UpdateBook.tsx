import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material"
/* import { makeStyles } from "@mui/styles" */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialBookstate } from "../../types_variables/constants"
import { PartialBook } from "../../types_variables/types"
import "./UpdateBook.css"

export const UpdateBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: books } = useSelector((state: RootState) => state.book)
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { bookId } = useParams()
  const [uBook, setUBook] = useState<PartialBook>(initialBookstate)
  const book = books.find((bo) => bookId === bo.id)
  const handleSubmit = () => {
    dispatch(updateBook(uBook))
  }

  return (
    <div>
      <Box sx={{ paddingBottom: "20em", color: "text.primary" }}>
        <Typography
          variant="h4"
          sx={{
            paddingBottom: "1em",
            textAlign: "center",
            paddingTop: "2em",
            color: "#323232",
            fontWeight: "200"
          }}
        >
          Update Book
        </Typography>
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="isbn"
              fullWidth
              autoComplete="isbn"
              required
              defaultValue={book?.isbn}
              onChange={(e) => {
                setUBook({ ...book, isbn: e.target.value })
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="title"
              type="text"
              fullWidth
              defaultValue={book?.title}
              autoComplete="title"
              autoFocus
              required
              onChange={(e) => setUBook({ ...book, title: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={book?.authorId}
              label="author"
              onChange={(e) => {
                setUBook({ ...book, authorId: e.target.value })
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
                console.log({
                  ...book,
                  publisher: e.target.value
                })
              }
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
                setUBook({
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
            sx={{ bgcolor: "#DDD0C8", color: "#323232" }}
          >
            Update Book
          </Button>
        </Card>
      </Box>

      <p>{book?.title}</p>
    </div>
  )
}
