/* eslint-disable prettier/prettier */
import { Box, Typography } from "@mui/material"
import { useState } from "react"
/* import { makeStyles } from "@mui/styles" */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { updateAuthor } from "../../redux/reducers/authorsReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"
import { FormAuthor } from "./FormAuthor"

export const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: authors } = useSelector((state: RootState) => state.author)
  const label = "Update Author"
  const { authorId } = useParams()
  const [uAuthor, setUAuthor] = useState<PartialAuthor>(initialAuthorState)
  const author = authors.find((au) => authorId === au.id)
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateAuthor(uAuthor))
    setTimeout(() => {
      navigate("/authors")
    }, 300)
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
          Update Author
        </Typography>
      </Box>
      <FormAuthor
        author={author}
        setAuthor={setUAuthor}
        handleSubmit={handleSubmit}
        label={label}
      ></FormAuthor>
    </div>
  )
}
