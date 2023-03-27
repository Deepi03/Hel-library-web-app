import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateBook } from "../../redux/reducers/booksReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import { PartialBook } from "../../types_variables/types"
import "./UpdateBookMui.css"

const useStyles = makeStyles({
  root: {
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#323232"
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#323232"
      }
    }
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(",")
  }
})

export const UpdateBook = () => {
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)

  const { bookId } = useParams()
  const [uBook, setUBook] = useState<PartialBook>(initialBookstate)
  const book = books.find((bo) => bookId === bo.id)
  const handleSubmit = () => {
    dispatch(updateBook(uBook))
  }
  const classes = useStyles()
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
          className={classes.typography}
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
              className={classes.root}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              className={classes.root}
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
            <TextField
              variant="outlined"
              className={classes.root}
              placeholder="author"
              fullWidth
              type="text"
              defaultValue={book?.authors.name}
              autoComplete="author"
              autoFocus
              required
              onChange={(e) =>
                setUBook({
                  ...book,
                  authors: { id: unique_id, name: e.target.value }
                })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              className={classes.root}
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
              className={classes.root}
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
          {/* <Box mb={2}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </Box> */}
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
            Update Book
          </Button>
        </Card>
      </Box>

      <p>{book?.title}</p>
    </div>
  )
}
