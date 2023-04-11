/* eslint-disable prettier/prettier */
import React, { useState } from "react"
/* import { makeStyles } from "@mui/styles" */
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { updateAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"
import { Box, Button, Card, TextField, Typography } from "@mui/material"

export const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: authors } = useSelector((state: RootState) => state.author)

  const { authorId } = useParams()
  const [uAuthor, setUAuthor] = useState<PartialAuthor>(initialAuthorState)
  const author = authors.find((au) => authorId === au.id)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateAuthor(uAuthor))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            Update Author
          </Typography>
          <Card className="main-card-login">
            <Box mb={2}>
              <TextField
                variant="outlined"
                placeholder="name"
                fullWidth
                autoComplete="name"
                defaultValue={author?.name}
                onChange={(e) => {
                  setUAuthor({ ...author, name: e.target.value })
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                placeholder="info"
                type="text"
                fullWidth
                defaultValue={author?.info}
                autoComplete="info"
                autoFocus
                onChange={(e) =>
                  setUAuthor({ ...author, info: e.target.value })
                }
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                placeholder="image"
                fullWidth
                autoComplete="image"
                autoFocus
                type="text"
                defaultValue={author?.image}
                onChange={(e) =>
                  setUAuthor({
                    ...author,
                    image: e.target.value
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
              Update Author
            </Button>
          </Card>
        </Box>
      </form>
    </div>
  )
}
