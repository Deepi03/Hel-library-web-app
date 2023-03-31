/* eslint-disable prettier/prettier */
import { Box, Button, Card, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { addAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch } from "../../redux/store"
import { initialAuthorState, unique_id } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"

export const AddAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [author, setAuthor] = useState<PartialAuthor>(initialAuthorState)

  const handleSubmit = () => {
    author.id = unique_id
    dispatch(addAuthor(author))
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
          Create Author
        </Typography>
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="name"
              fullWidth
              autoComplete="name"
              required
              value={author.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAuthor({ ...author, name: e.target.value })
              }}
              /*  className={classes.root} */
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              /* className={classes.root} */
              placeholder="info"
              type="text"
              fullWidth
              autoComplete="info"
              autoFocus
              required
              value={author.info}
              onChange={(e) => setAuthor({ ...author, info: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="Image"
              fullWidth
              autoComplete="Image"
              autoFocus
              type="text"
              required
              value={author.image}
              onChange={(e) =>
                setAuthor({
                  ...author,
                  image: e.target.value
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
            Create Author
          </Button>
        </Card>
      </Box>
    </div>
  )
}
