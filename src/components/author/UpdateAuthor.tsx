/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { updateAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"
import { Box, Button, Card, TextField, Typography } from "@mui/material"

export const UpdateAuthor = () => {
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
  const classes = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)

  const { authorId } = useParams()
  const [uAuthor, setUAuthor] = useState<PartialAuthor>(initialAuthorState)
  const author = authors.find((au) => authorId === au.id)

  const handleSubmit = () => {
    dispatch(updateAuthor(uAuthor))
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
          className={classes.typography}
        >
          Update Author
        </Typography>
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="name"
              fullWidth
              autoComplete="name"
              required
              defaultValue={author?.name}
              onChange={(e) => {
                setUAuthor({ ...author, name: e.target.value })
              }}
              className={classes.root}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              className={classes.root}
              placeholder="info"
              type="text"
              fullWidth
              defaultValue={author?.info}
              autoComplete="info"
              autoFocus
              required
              onChange={(e) => setUAuthor({ ...author, info: e.target.value })}
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
            Update Author
          </Button>
        </Card>
      </Box>
    </div>
  )
}
