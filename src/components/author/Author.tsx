import { Box, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../hook/useAdmin"
import { fetchAuthors } from "../../redux/middlewares/fetchAuthors"
import { deleteAuthor } from "../../redux/reducers/authorReducer"

import { AppDispatch, RootState } from "../../redux/store"
import { Author } from "../../types_variables/types"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

export const Authors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState("")
  const isAdmin = useAdmin()
  const handleOpen = (author: Author) => {
    if (author.info) {
      setInfo(author.info)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const handleUpdate = (id: string) => {
    navigate(`${id}/updateAuthor`)
  }
  const handleClose = () => setOpen(false)

  const handleDelete = (author: Author) => {
    dispatch(deleteAuthor(author))
  }

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [])
  return (
    <div>
      <table id="books">
        <thead>
          <tr>
            <th>Name</th>
            <th>Books</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>
                {author?.books?.map((book) => (
                  <li key={book}>{book}</li>
                ))}
              </td>
              <td>
                <button onClick={() => handleOpen(author)}>Info</button>
              </td>
              <td>
                {isAdmin && (
                  <button
                    onClick={() => {
                      handleUpdate(author.id)
                    }}
                  >
                    Update
                  </button>
                )}
              </td>
              <td>
                {isAdmin && (
                  <button
                    onClick={() => {
                      handleDelete(author)
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Author Info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {info}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
