/* eslint-disable prettier/prettier */
import { Box, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createAuthor } from "../../redux/middlewares/authorThunk"

import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState, unique_id } from "../../types_variables/constants"
import { Author } from "../../types_variables/types"
import { FormAuthor } from "./FormAuthor"

export const AddAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [author, setAuthor] = useState<Author>(initialAuthorState)
  const navigate = useNavigate()
  const label = "Create Author"

  const handleSubmit = (e: any) => {
    e.preventDefault()
    author.id = unique_id
    if (author) {
      dispatch(createAuthor(author))
      setTimeout(() => {
        navigate("/authors")
      }, 300)
    }
  }
  return (
    <div>
      <Box sx={{ paddingBottom: "2em", color: "#323232" }}>
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
      </Box>
      <FormAuthor
        author={author}
        setAuthor={setAuthor}
        handleSubmit={handleSubmit}
        label={label}
      ></FormAuthor>
    </div>
  )
}
