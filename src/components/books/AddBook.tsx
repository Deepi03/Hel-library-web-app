/* eslint-disable prettier/prettier */
import { Box, Button, Card, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { addBook } from "../../redux/reducers/booksReducer"
import { AppDispatch } from "../../redux/store"
/* import { makeStyles } from "@mui/styles" */
import { styled } from "@mui/material/styles"
import { PartialBook } from "../../types_variables/types"
import { initialBookstate, unique_id } from "../../types_variables/constants"
import "./UpdateBook.css"

export const AddBook = () => {
  /* const useStyles = makeStyles({
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
  }) */

  /* const classes = useStyles() */
  const dispatch = useDispatch<AppDispatch>()
  const [book, setBook] = useState<PartialBook>(initialBookstate)

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
          /* className={classes.typography} */
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
              required
              value={book.isbn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBook({ ...book, isbn: e.target.value })
              }}
              /*  className={classes.root} */
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              /* className={classes.root} */
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
          <Box mb={2}>
            <TextField
              variant="outlined"
              /* className={classes.root} */
              placeholder="author"
              fullWidth
              type="text"
              autoComplete="author"
              autoFocus
              required
              value={book.authors?.name}
              onChange={(e) =>
                setBook({
                  ...book,
                  authors: { id: unique_id, name: e.target.value }
                })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              /* className={classes.root} */
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
              /*  className={classes.root} */
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
          <Box mb={2}>
            <TextField
              variant="outlined"
              /* className={classes.root} */
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
