/* eslint-disable prettier/prettier */
import { Box, Typography } from "@mui/material"
import { useState } from "react"
/* import { makeStyles } from "@mui/styles" */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAuthorById } from "../../redux/middlewares/authorThunk"

import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState } from "../../types_variables/constants"
import { Author } from "../../types_variables/types"
import { FormAuthor } from "./FormAuthor"

export const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: authors } = useSelector((state: RootState) => state.author)
  const { authorId } = useParams()
  const [uAuthor, setUAuthor] = useState<Author>(initialAuthorState)
  const navigate = useNavigate()
  const author = authors.find((au) => authorId === au.id)
  const label = "Update Author"

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (uAuthor.id) {
      dispatch(updateAuthorById(uAuthor))
      setTimeout(() => {
        navigate("/authors")
      }, 1000)
    }
  }
  return (
    <div>
      <Box sx={{ paddingBottom: "2rem", color: "text.primary" }}>
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
      </Box>
      {author && (
        <FormAuthor
          author={author}
          setAuthor={setUAuthor}
          handleSubmit={handleSubmit}
          label={label}
        ></FormAuthor>
      )}
    </div>
  )
}
