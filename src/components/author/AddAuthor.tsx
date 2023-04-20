/* eslint-disable prettier/prettier */
import { Box, Button, Card, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addAuthor } from "../../redux/reducers/authorsReducer"
import { AppDispatch } from "../../redux/store"
import { initialAuthorState, unique_id } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"

export const AddAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [author, setAuthor] = useState<PartialAuthor>(initialAuthorState)
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    author.id = unique_id
    dispatch(addAuthor(author))
    setTimeout(() => {
      navigate("/authors")
    }, 300)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            Create Author
          </Typography>
          <Card className="main-card-login">
            <Box mb={2}>
              <TextField
                variant="outlined"
                type="text"
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
                type="text"
                variant="outlined"
                placeholder="Image"
                fullWidth
                autoComplete="Image"
                autoFocus
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
              Create Author
            </Button>
          </Card>
        </Box>
      </form>
    </div>
  )
}
